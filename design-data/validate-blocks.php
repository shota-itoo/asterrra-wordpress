<?php
/**
 * WordPress Block Validation Checker
 *
 * Usage: VB_POST_ID=<post_id> wp eval-file /path/to/validate-blocks.php --allow-root
 *
 * Validates saved block markup against known rules to prevent
 * Gutenberg editor validation errors. Checks:
 * - Non-block HTML comment detection (Gutenberg save() never outputs HTML comments)
 * - Extension CSS not leaked into save HTML inline styles
 * - Required classes (has-custom-font-family, has-link-color, etc.)
 * - JSON/HTML attribute consistency
 * - extraProps filter classes (has-block-link, has-device-hide-*, has-custom-font-family, has-responsive-font)
 * - Class list reconstruction and comparison for loos/full-wide and flavor/universal-block
 */

// --- Argument parsing ---
$post_id = 0;
if ( ! empty( $args ) && is_numeric( $args[0] ) ) {
	$post_id = intval( $args[0] );
} elseif ( getenv( 'VB_POST_ID' ) ) {
	$post_id = intval( getenv( 'VB_POST_ID' ) );
}
if ( ! $post_id ) {
	WP_CLI::error( 'Usage: VB_POST_ID=<post_id> wp eval-file validate-blocks.php --allow-root' );
}

$post = get_post( $post_id );
if ( ! $post ) {
	WP_CLI::error( "Post not found: $post_id" );
}

$content = $post->post_content;
if ( empty( trim( $content ) ) ) {
	WP_CLI::warning( "Post $post_id has empty content." );
	exit( 0 );
}

$blocks = parse_blocks( $content );
$errors = array();

// --- Extension CSS properties that must NOT appear in save HTML inline style ---
$extension_css_patterns = array(
	'gap'            => '/(?:^|;)\s*(?:row-)?(?:column-)?gap\s*:/i',
	'padding'        => '/(?:^|;)\s*padding(?:-(?:top|right|bottom|left))?\s*:/i',
	'width'          => '/(?:^|;)\s*(?:min-|max-)?width\s*:/i',
	'height'         => '/(?:^|;)\s*(?:min-|max-)?height\s*:/i',
	'border-radius'  => '/(?:^|;)\s*border(?:-(?:top|bottom)-(?:left|right))?-radius\s*:/i',
	'box-shadow'     => '/(?:^|;)\s*box-shadow\s*:/i',
	'flex-wrap'      => '/(?:^|;)\s*flex-wrap\s*:/i',
	'opacity'        => '/(?:^|;)\s*opacity\s*:/i',
	'aspect-ratio'   => '/(?:^|;)\s*aspect-ratio\s*:/i',
);

// --- extraProps filter rules ---
// Maps child theme JS extraProps filters to expected classes
$extra_props_rules = array(
	'blockLinkUrl' => array(
		'class'  => 'has-block-link',
		'blocks' => array( 'flavor/universal-block', 'core/paragraph', 'core/columns', 'core/column', 'core/cover', 'core/media-text' ),
	),
	'deviceVisibility' => array(
		'class_map' => array( 'pc' => 'has-device-hide-pc', 'tablet' => 'has-device-hide-tablet', 'sp' => 'has-device-hide-sp' ),
		'blocks'    => array( 'flavor/universal-block', 'core/cover' ),
	),
	'customFontFamily' => array(
		'class'  => 'has-custom-font-family',
		'blocks' => array( 'core/paragraph', 'core/heading', 'core/list', 'core/quote' ),
	),
);

// --- Helper: extract class and style from opening tag ---
function vb_get_tag_attrs( $block ) {
	$inner = $block['innerContent'] ?? array();
	$first = '';
	foreach ( $inner as $part ) {
		if ( is_string( $part ) && ! empty( trim( $part ) ) ) {
			$first = $part;
			break;
		}
	}
	if ( empty( $first ) ) {
		$first = $block['innerHTML'] ?? '';
	}
	$class = '';
	$style = '';
	if ( preg_match( '/class="([^"]*)"/', $first, $m ) ) {
		$class = $m[1];
	}
	if ( preg_match( '/style="([^"]*)"/', $first, $m ) ) {
		$style = $m[1];
	}
	return array( $class, $style, $first );
}

// --- Helper: build block path for error messages ---
function vb_block_label( $name, $depth ) {
	$indent = str_repeat( '  ', $depth );
	return "{$indent}[{$name}]";
}

// --- Helper: compare class lists ---
function vb_compare_classes( $expected, $actual_string, $label ) {
	$errors   = array();
	$actual   = array_filter( preg_split( '/\s+/', trim( $actual_string ) ) );
	$expected = array_filter( $expected );

	foreach ( $expected as $ec ) {
		if ( ! in_array( $ec, $actual, true ) ) {
			$errors[] = "$label Missing expected class '$ec'";
		}
	}
	foreach ( $actual as $ac ) {
		if ( ! in_array( $ac, $expected, true ) ) {
			$errors[] = "$label Unexpected class '$ac' (not in expected list)";
		}
	}
	if ( ! empty( $expected ) && ! empty( $actual ) ) {
		if ( implode( ' ', $expected ) !== implode( ' ', $actual ) ) {
			$errors[] = "$label Class order mismatch: expected '" . implode( ' ', $expected ) . "', got '" . implode( ' ', $actual ) . "'";
		}
	}
	return $errors;
}

// --- Class reconstruction: loos/full-wide ---
function vb_build_fullwide_classes( $attrs ) {
	$classes = array( 'swell-block-fullWide' );
	$pc = $attrs['pcPadding'] ?? '';
	$sp = $attrs['spPadding'] ?? '';
	if ( $pc !== '' ) {
		$classes[] = 'pc-py-' . $pc;
	}
	if ( $sp !== '' ) {
		$classes[] = 'sp-py-' . $sp;
	}
	if ( ! empty( $attrs['bgImageUrl'] ) ) {
		$classes[] = 'has-bg-img';
		if ( ! empty( $attrs['isFixBg'] ) ) {
			$classes[] = '-fixbg';
		}
		if ( ! empty( $attrs['isParallax'] ) ) {
			$classes[] = '-parallax';
		}
	}
	$classes[] = 'alignfull';
	if ( ! empty( $attrs['bgImageUrl'] ) ) {
		$classes[] = 'lazyload';
	}
	// className comes after alignfull in SWELL's save() output
	if ( ! empty( $attrs['className'] ) ) {
		foreach ( preg_split( '/\s+/', $attrs['className'] ) as $c ) {
			if ( $c ) $classes[] = $c;
		}
	}
	return $classes;
}

// --- Class reconstruction: flavor/universal-block ---
function vb_build_ub_classes( $attrs ) {
	$classes = array( 'wp-block-flavor-universal-block' );
	if ( ! empty( $attrs['className'] ) ) {
		foreach ( preg_split( '/\s+/', $attrs['className'] ) as $c ) {
			if ( $c ) $classes[] = $c;
		}
	}
	// Layout classes - grouped by property (desktop → tablet → mobile) to match save() output order
	$layout_groups = array(
		array(
			array( 'layoutDirection', 'has-ub-direction-' ),
			array( 'layoutDirectionTablet', 'has-ub-tablet-direction-' ),
			array( 'layoutDirectionMobile', 'has-ub-mobile-direction-' ),
		),
		array(
			array( 'layoutJustify', 'has-ub-justify-' ),
			array( 'layoutJustifyTablet', 'has-ub-tablet-justify-' ),
			array( 'layoutJustifyMobile', 'has-ub-mobile-justify-' ),
		),
		array(
			array( 'layoutAlign', 'has-ub-align-' ),
			array( 'layoutAlignTablet', 'has-ub-tablet-align-' ),
			array( 'layoutAlignMobile', 'has-ub-mobile-align-' ),
		),
		array(
			array( 'layoutAlignSelf', 'has-ub-align-self-' ),
			array( 'layoutAlignSelfTablet', 'has-ub-tablet-align-self-' ),
			array( 'layoutAlignSelfMobile', 'has-ub-mobile-align-self-' ),
		),
		array(
			array( 'layoutJustifySelf', 'has-ub-justify-self-' ),
			array( 'layoutJustifySelfTablet', 'has-ub-tablet-justify-self-' ),
			array( 'layoutJustifySelfMobile', 'has-ub-mobile-justify-self-' ),
		),
	);
	foreach ( $layout_groups as $group ) {
		foreach ( $group as $item ) {
			$attr   = $item[0];
			$prefix = $item[1];
			if ( ! empty( $attrs[ $attr ] ) ) {
				$classes[] = $prefix . $attrs[ $attr ];
			}
		}
	}
	// WordPress core color support
	if ( ! empty( $attrs['style']['color']['background'] ) || ! empty( $attrs['backgroundColor'] ) ) {
		$classes[] = 'has-background';
	}
	if ( ! empty( $attrs['style']['color']['text'] ) || ! empty( $attrs['textColor'] ) ) {
		$classes[] = 'has-text-color';
	}
	// extraProps filter classes
	if ( ! empty( $attrs['blockLinkUrl'] ) ) {
		$classes[] = 'has-block-link';
	}
	if ( ! empty( $attrs['deviceVisibility'] ) && is_array( $attrs['deviceVisibility'] ) ) {
		foreach ( $attrs['deviceVisibility'] as $device ) {
			$classes[] = 'has-device-hide-' . $device;
		}
	}
	return $classes;
}

// --- Main validation function ---
function vb_validate_block( $block, &$errors, $extension_css_patterns, $extra_props_rules, $depth = 0 ) {
	if ( empty( $block['blockName'] ) ) {
		return;
	}

	$name  = $block['blockName'];
	$attrs = $block['attrs'] ?? array();
	$label = vb_block_label( $name, $depth );

	list( $tag_class, $tag_style, $first_content ) = vb_get_tag_attrs( $block );

	// ========================================
	// 0. Non-block HTML comment detection (ALL blocks)
	// ========================================
	$inner = $block['innerContent'] ?? array();
	foreach ( $inner as $fragment ) {
		if ( is_string( $fragment ) ) {
			if ( preg_match( '/<!--(?!\s*wp:|\s*\/wp:)/', $fragment ) ) {
				$comment_preview = substr( trim( $fragment ), 0, 80 );
				$errors[] = "$label Non-block HTML comment found in innerContent: '$comment_preview...' (Gutenberg save() never outputs HTML comments)";
			}
		}
	}

	// ========================================
	// 0b. extraProps filter class validation (ALL supported blocks)
	// ========================================
	foreach ( $extra_props_rules as $attr_name => $rule ) {
		if ( ! in_array( $name, $rule['blocks'], true ) ) {
			continue;
		}
		if ( 'deviceVisibility' === $attr_name ) {
			if ( ! empty( $attrs['deviceVisibility'] ) && is_array( $attrs['deviceVisibility'] ) ) {
				foreach ( $attrs['deviceVisibility'] as $device ) {
					$expected_class = $rule['class_map'][ $device ] ?? '';
					if ( $expected_class && false === strpos( $tag_class, $expected_class ) ) {
						$errors[] = "$label Missing '$expected_class' class (deviceVisibility contains '$device')";
					}
				}
			}
		} elseif ( ! empty( $attrs[ $attr_name ] ) ) {
			$expected_class = $rule['class'];
			if ( false === strpos( $tag_class, $expected_class ) ) {
				$errors[] = "$label Missing '$expected_class' class ($attr_name is set)";
			}
		}
	}

	// Responsive font check (heading/paragraph with tabletFontSize or mobileFontSize)
	if ( in_array( $name, array( 'core/heading', 'core/paragraph' ), true ) ) {
		if ( ! empty( $attrs['tabletFontSize'] ) || ! empty( $attrs['mobileFontSize'] ) ) {
			if ( false === strpos( $tag_class, 'has-responsive-font' ) ) {
				$errors[] = "$label Missing 'has-responsive-font' class (tabletFontSize/mobileFontSize is set)";
			}
		}
	}

	// ========================================
	// 1. flavor/universal-block checks
	// ========================================
	if ( 'flavor/universal-block' === $name ) {
		// 1a. Extension CSS must not be in inline style
		foreach ( $extension_css_patterns as $prop_name => $pattern ) {
			if ( preg_match( $pattern, $tag_style ) ) {
				$errors[] = "$label Extension CSS '$prop_name' found in inline style attribute. Extension CSS is rendered via <style> tag, not inline.";
			}
		}

		// 1b. Class list reconstruction and comparison
		$expected_classes = vb_build_ub_classes( $attrs );
		$class_errors     = vb_compare_classes( $expected_classes, $tag_class, $label );
		$errors           = array_merge( $errors, $class_errors );

		// 1c. Background color value consistency
		$has_bg = ! empty( $attrs['style']['color']['background'] );
		if ( $has_bg ) {
			$bg_val   = $attrs['style']['color']['background'];
			$expected = "background-color:$bg_val";
			$has_inline_bg = ( false !== strpos( $tag_style, $expected ) )
				|| ( false !== strpos( $tag_style, "background-color: $bg_val" ) );
			if ( ! $has_inline_bg ) {
				$errors[] = "$label Inline style missing or mismatched background-color. Expected: $expected";
			}
		}
	}

	// ========================================
	// 2. core/heading checks
	// ========================================
	if ( 'core/heading' === $name ) {
		$has_text_color  = ! empty( $attrs['style']['color']['text'] );
		$has_text_align  = ! empty( $attrs['textAlign'] );
		$has_bg          = ! empty( $attrs['style']['color']['background'] );

		if ( $has_text_color ) {
			if ( false === strpos( $tag_class, 'has-text-color' ) ) {
				$errors[] = "$label Missing 'has-text-color' class.";
			}
			if ( false === strpos( $tag_class, 'has-link-color' ) ) {
				$errors[] = "$label Missing 'has-link-color' class (required when text color is set).";
			}
			if ( empty( $attrs['style']['elements']['link']['color']['text'] ) ) {
				$errors[] = "$label Missing style.elements.link.color.text in JSON attributes.";
			}
			$color_val = $attrs['style']['color']['text'];
			if ( false === strpos( $tag_style, "color:$color_val" ) && false === strpos( $tag_style, "color: $color_val" ) ) {
				$errors[] = "$label Inline style color doesn't match JSON text color ($color_val).";
			}
		}

		if ( $has_text_align ) {
			$expected = 'has-text-align-' . $attrs['textAlign'];
			if ( false === strpos( $tag_class, $expected ) ) {
				$errors[] = "$label Missing '$expected' class.";
			}
		}

		if ( $has_bg && false === strpos( $tag_class, 'has-background' ) ) {
			$errors[] = "$label Missing 'has-background' class.";
		}
	}

	// ========================================
	// 3. core/paragraph checks
	// ========================================
	if ( 'core/paragraph' === $name ) {
		$has_text_color = ! empty( $attrs['style']['color']['text'] );
		$has_align      = ! empty( $attrs['align'] );
		$has_bg         = ! empty( $attrs['style']['color']['background'] );

		if ( $has_text_color ) {
			if ( false === strpos( $tag_class, 'has-text-color' ) ) {
				$errors[] = "$label Missing 'has-text-color' class.";
			}
			if ( false === strpos( $tag_class, 'has-link-color' ) ) {
				$errors[] = "$label Missing 'has-link-color' class.";
			}
			if ( false === strpos( $tag_class, 'has-custom-font-family' ) ) {
				$errors[] = "$label Missing 'has-custom-font-family' class (required by SWELL textFontFamily extension).";
			}
			if ( empty( $attrs['style']['elements']['link']['color']['text'] ) ) {
				$errors[] = "$label Missing style.elements.link.color.text in JSON attributes.";
			}
		}

		if ( $has_align ) {
			$expected = 'has-text-align-' . $attrs['align'];
			if ( false === strpos( $tag_class, $expected ) ) {
				$errors[] = "$label Missing '$expected' class.";
			}
		}

		if ( $has_bg && false === strpos( $tag_class, 'has-background' ) ) {
			$errors[] = "$label Missing 'has-background' class.";
		}
	}

	// ========================================
	// 4. loos/full-wide checks (class reconstruction)
	// ========================================
	if ( 'loos/full-wide' === $name ) {
		// 4a. Background color consistency
		$bg = $attrs['bgColor'] ?? '';
		if ( $bg ) {
			if ( false === strpos( $tag_style, "background-color:$bg" ) && false === strpos( $tag_style, "background-color: $bg" ) ) {
				$errors[] = "$label Background color mismatch. JSON bgColor=$bg not found in inline style.";
			}
		}

		// 4b. Class list reconstruction and comparison
		$expected_classes = vb_build_fullwide_classes( $attrs );
		$class_errors     = vb_compare_classes( $expected_classes, $tag_class, $label );
		$errors           = array_merge( $errors, $class_errors );
	}

	// ========================================
	// 5. Recurse into inner blocks
	// ========================================
	if ( ! empty( $block['innerBlocks'] ) ) {
		foreach ( $block['innerBlocks'] as $inner_block ) {
			vb_validate_block( $inner_block, $errors, $extension_css_patterns, $extra_props_rules, $depth + 1 );
		}
	}
}

// --- Run validation ---
function vb_count_blocks( $blocks ) {
	$count = 0;
	foreach ( $blocks as $b ) {
		if ( ! empty( $b['blockName'] ) ) {
			$count++;
			if ( ! empty( $b['innerBlocks'] ) ) {
				$count += vb_count_blocks( $b['innerBlocks'] );
			}
		}
	}
	return $count;
}
$total_blocks = vb_count_blocks( $blocks );

foreach ( $blocks as $block ) {
	vb_validate_block( $block, $errors, $extension_css_patterns, $extra_props_rules );
}

// --- Output ---
WP_CLI::line( '' );
WP_CLI::line( "=== Block Validation Report ===" );
WP_CLI::line( "Post ID: $post_id" );
WP_CLI::line( "Title: " . $post->post_title );
WP_CLI::line( "Total blocks: $total_blocks" );
WP_CLI::line( '' );

if ( empty( $errors ) ) {
	WP_CLI::success( "All $total_blocks blocks passed validation. No errors found." );
} else {
	WP_CLI::warning( 'Found ' . count( $errors ) . ' validation error(s):' );
	WP_CLI::line( '' );
	foreach ( $errors as $i => $error ) {
		$num = $i + 1;
		WP_CLI::line( "  $num. $error" );
	}
	WP_CLI::line( '' );
	WP_CLI::error( 'Validation failed. Fix the errors above and re-run.' );
}
