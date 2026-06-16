<?php
/**
 * Block Extensions オーケストレーター
 *
 * BLOCK_CONFIG で対象ブロック × セクションを管理。
 * 各セクション（size, flex, spacing, shadow, borderRadius, border, opacity）は
 * 個別ファイルに分割し、このファイルが統括する。
 */

if (!defined('ABSPATH')) {
	exit;
}

// ── セクションファイル読み込み ──
require_once __DIR__ . '/block-size.php';
require_once __DIR__ . '/block-flex.php';
require_once __DIR__ . '/block-spacing.php';
require_once __DIR__ . '/block-shadow.php';
require_once __DIR__ . '/block-border-radius.php';
require_once __DIR__ . '/block-border.php';
require_once __DIR__ . '/block-opacity.php';
require_once __DIR__ . '/block-position.php';
require_once __DIR__ . '/block-backdrop-filter.php';
require_once __DIR__ . '/block-background-image.php';

/**
 * ブロックごとの設定 config
 *
 * prefix         : 属性名のプレフィックス（'' = プレフィックスなし）
 * id_prefix      : ユニークID生成用（例: 'img-xxxxxxxx'）
 * id_regex       : ID注入先のHTML正規表現
 * size           : true = サイズ設定を追加
 * flex           : ['includeWrap' => bool] = Flex設定を追加
 * spacing        : ['gap' => bool, 'padding' => bool, 'margin' => bool]
 * shadow         : true = シャドウ設定を追加
 * borderRadius   : true = 角丸設定を追加
 * border         : true = ボーダー設定を追加
 * opacity        : true or ['includeBackgroundOpacity' => bool]
 * inner_selector : 内側セレクタ（icon用）
 * inner_box_sizing: 内側要素のbox-sizing
 */
function flavor_block_extensions_config() {
	return [
		'core/image' => [
			'prefix'        => 'img',
			'id_prefix'     => 'img',
			'id_regex'      => '/^(\s*<figure\b)([^>]*>)/i',
			'size'          => true,
			'size_inner_selector' => ' img',
			'flex'          => ['includeWrap' => false],
			'spacing'       => ['margin' => true],
			'shadow'        => true,
			'backdropFilter' => true,
			'borderRadius'  => true,
			'border'        => true,
			'opacity'       => true,
			'position'      => true,
		],
		'core/paragraph' => [
			'prefix'        => 'para',
			'id_prefix'     => 'para',
			'id_regex'      => '/(<p\b)([^>]*>)/i',
			'size'          => true,
			'flex'          => ['includeWrap' => false],
			'spacing'       => ['margin' => true],
			'shadow'        => true,
			'backdropFilter' => true,
			'borderRadius'  => true,
			'border'        => true,
			'opacity'       => true,
		],
		'core/heading' => [
			'prefix'        => 'heading',
			'id_prefix'     => 'hdg',
			'id_regex'      => '/(<h[1-6]\b)([^>]*>)/i',
			'size'          => true,
			'flex'          => ['includeWrap' => false],
			'spacing'       => ['margin' => true],
			'shadow'        => true,
			'backdropFilter' => true,
			'borderRadius'  => true,
			'border'        => true,
			'opacity'       => true,
		],
		'core/cover' => [
			'prefix'        => '',
			'id_prefix'     => 'cover',
			'id_regex'      => '/^(\s*<div\b)([^>]*>)/i',
			'size'          => true,
			'flex'          => ['includeWrap' => true],
			'spacing'       => ['gap' => true, 'padding' => true, 'margin' => true],
			'shadow'        => true,
			'backdropFilter' => true,
			'borderRadius'  => true,
			'border'        => true,
			'opacity'       => true,
		],
		'outermost/icon-block' => [
			'prefix'          => 'icon',
			'id_prefix'       => 'icon',
			'id_regex'        => '/^(\s*<div\b)([^>]*>)/i',
			'spacing'         => ['padding' => true, 'margin' => true],
			'shadow'          => true,
			'backdropFilter'  => true,
			'borderRadius'    => true,
			'border'          => true,
			'opacity'         => true,
			'inner_selector'  => ' .icon-container',
			'inner_box_sizing' => 'content-box',
		],
		'flavor/universal-block' => [
			'prefix'        => '',
			'id_prefix'     => 'ub',
			'id_regex'      => '/^(\s*<\w+)([\s>])/',
			'size'          => true,
			'flex'          => ['includeWrap' => true],
			'spacing'       => ['gap' => true, 'padding' => true, 'margin' => true],
			'shadow'        => true,
			'backdropFilter' => true,
			'borderRadius'  => true,
			'border'        => true,
			'opacity'       => ['includeBackgroundOpacity' => true],
			'position'      => true,
			'backgroundImage' => true,
		],
		'core/table' => [
			'prefix'        => 'table',
			'id_prefix'     => 'table',
			'id_regex'      => '/^(\s*<figure\b)([^>]*>)/i',
			'spacing'       => ['margin' => true],
			'shadow'        => true,
			'borderRadius'  => true,
			'border'        => true,
		],
		'core/list' => [
			'prefix'        => 'list',
			'id_prefix'     => 'list',
			'id_regex'      => '/(<[uo]l\b)([^>]*>)/i',
			'size'          => true,
			'spacing'       => ['padding' => true, 'margin' => true],
			'shadow'        => true,
			'borderRadius'  => true,
			'border'        => true,
			'opacity'       => true,
		],
		'loos/full-wide' => [
			'prefix'        => 'fullwide',
			'id_prefix'     => 'fullwide',
			'id_regex'      => '/^(\s*<div\b)([^>]*>)/i',
			'position'      => true,
		],
	];
}

/**
 * セクション名 → 関数名マッピング
 */
function flavor_block_extensions_sections() {
	return [
		'size'         => ['attrs' => 'flavor_ext_size_register_attrs',          'has' => 'flavor_ext_size_has',          'css' => 'flavor_ext_size_generate_css'],
		'flex'         => ['attrs' => 'flavor_ext_flex_register_attrs',          'has' => 'flavor_ext_flex_has',          'css' => 'flavor_ext_flex_generate_css'],
		'spacing'      => ['attrs' => 'flavor_ext_spacing_register_attrs',       'has' => 'flavor_ext_spacing_has',       'css' => 'flavor_ext_spacing_generate_css'],
		'shadow'       => ['attrs' => 'flavor_ext_shadow_register_attrs',        'has' => 'flavor_ext_shadow_has',        'css' => 'flavor_ext_shadow_generate_css'],
		'borderRadius' => ['attrs' => 'flavor_ext_border_radius_register_attrs', 'has' => 'flavor_ext_border_radius_has', 'css' => 'flavor_ext_border_radius_generate_css'],
		'border'       => ['attrs' => 'flavor_ext_border_register_attrs',        'has' => 'flavor_ext_border_has',        'css' => 'flavor_ext_border_generate_css'],
		'opacity'      => ['attrs' => 'flavor_ext_opacity_register_attrs',       'has' => 'flavor_ext_opacity_has',       'css' => 'flavor_ext_opacity_generate_css'],
		'position'     => ['attrs' => 'flavor_ext_position_register_attrs',     'has' => 'flavor_ext_position_has',     'css' => 'flavor_ext_position_generate_css'],
		'backdropFilter' => ['attrs' => 'flavor_ext_backdrop_filter_register_attrs', 'has' => 'flavor_ext_backdrop_filter_has', 'css' => 'flavor_ext_backdrop_filter_generate_css'],
		'backgroundImage' => ['attrs' => 'flavor_ext_background_image_register_attrs', 'has' => 'flavor_ext_background_image_has', 'css' => 'flavor_ext_background_image_generate_css'],
	];
}

// ── register_block_type_args: 各セクションの属性を一括登録 ──

add_filter('register_block_type_args', function($args, $block_type) {
	$config = flavor_block_extensions_config();
	if (!isset($config[$block_type])) return $args;

	$cfg = $config[$block_type];
	$prefix = $cfg['prefix'];
	$sections = flavor_block_extensions_sections();
	$block_attrs = [];

	foreach ($sections as $section => $fns) {
		if (empty($cfg[$section])) continue;
		$options = is_array($cfg[$section]) ? $cfg[$section] : [];
		$new_attrs = call_user_func($fns['attrs'], $prefix, $options);
		$block_attrs = array_merge($block_attrs, $new_attrs);
	}

	if (!isset($args['attributes'])) {
		$args['attributes'] = [];
	}
	$args['attributes'] = array_merge($args['attributes'], $block_attrs);

	return $args;
}, 10, 2);

// ── render_block: ID注入 → 各セクションのCSS生成 → <style>出力 ──

add_filter('render_block', function($block_content, $block) {
	$config = flavor_block_extensions_config();
	$block_name = $block['blockName'] ?? '';
	if (!isset($config[$block_name])) return $block_content;

	$cfg = $config[$block_name];
	$prefix = $cfg['prefix'];
	$attrs = $block['attrs'] ?? [];
	$sections = flavor_block_extensions_sections();

	// ── どのセクションが有効か判定 ──
	$active = [];
	foreach ($sections as $section => $fns) {
		if (!empty($cfg[$section]) && call_user_func($fns['has'], $attrs, $prefix)) {
			$active[$section] = $fns;
		}
	}

	if (empty($active)) return $block_content;

	// ── リマップ（プレフィックス付きの場合） ──
	$css_attrs = $prefix !== '' ? flavor_block_remap_attrs($attrs, $prefix) : $attrs;

	// ── data属性によるスコープ（id属性はアンカー用に解放） ──
	$scope_id = $cfg['id_prefix'] . '-' . substr(md5(serialize($attrs) . wp_unique_id()), 0, 8);
	$data_attr = 'data-' . $cfg['id_prefix'] . '-id';

	$block_content = preg_replace(
		$cfg['id_regex'],
		'$1 ' . $data_attr . '="' . esc_attr($scope_id) . '"$2',
		$block_content,
		1
	);

	// ブロッククラスを付与して specificity を 0,2,0 に引き上げ
	// SWELL の div.has-background (0,1,1) に勝つため
	// core/* ブロックは "core-" なしの wp-block-{name} がクラス名（WP標準仕様）
	$block_class = 'wp-block-' . str_replace('/', '-', $block_name);
	$block_class = preg_replace('/^wp-block-core-/', 'wp-block-', $block_class);

	// ブロッククラスが要素に存在しない場合は追加
	// （core/paragraph 等は条件次第で wp-block-* クラスを省略するため）
	if (strpos($block_content, $block_class) === false) {
		$replaced = preg_replace(
			'/class="/',
			'class="' . esc_attr($block_class) . ' ',
			$block_content,
			1,
			$count
		);
		if ($count > 0) {
			$block_content = $replaced;
		} else {
			// class 属性が存在しない場合、data属性の前に挿入
			$block_content = preg_replace(
				'/(' . preg_quote($data_attr, '/') . ')/',
				'class="' . esc_attr($block_class) . '" $1',
				$block_content,
				1
			);
		}
	}
	$selector = '.' . $block_class . '[' . $data_attr . '="' . $scope_id . '"]';
	// margin 用セレクタ: .post_content を祖先に追加して specificity を 0,3,0 に引き上げ
	// SWELL の .page .post_content h2 { margin: 0 } (0,3,0) に同等以上で勝つため
	// （インライン <style> が後から出力されるため同 specificity でも extension が勝つ）
	$margin_selector = '.post_content ' . $selector;
	$css = '';

	// ── icon ブロックの特殊処理（外側/内側セレクタ分離） ──
	if (isset($cfg['inner_selector'])) {
		$inner_selector = $selector . $cfg['inner_selector'];

		// margin → 外側セレクタ（$margin_selector で詳細度ブースト）
		if (isset($active['spacing']) && flavor_ext_margin_has($css_attrs, '')) {
			$css .= flavor_ext_margin_generate_css($margin_selector, $css_attrs);
		}

		// padding → 内側セレクタ（margin を除外）
		if (isset($active['spacing'])) {
			$inner_attrs = $css_attrs;
			foreach (['', 'Tablet', 'Mobile'] as $device) {
				unset($inner_attrs['spacingMargin' . $device]);
				unset($inner_attrs['spacingMarginUnit' . $device]);
				unset($inner_attrs['spacingMarginLinked' . $device]);
			}
			$inner_spacing_css = flavor_ext_spacing_generate_css($inner_selector, $inner_attrs);
			if ($inner_spacing_css !== '') {
				$css .= $inner_spacing_css;
				if (!empty($cfg['inner_box_sizing'])) {
					$css .= "{$inner_selector} { box-sizing: {$cfg['inner_box_sizing']}; }\n";
				}
			}
		}

		// shadow/borderRadius/border/opacity → 内側セレクタ
		$inner_sections = ['shadow', 'backdropFilter', 'borderRadius', 'border', 'opacity'];
		foreach ($inner_sections as $section) {
			if (isset($active[$section])) {
				$css .= call_user_func($active[$section]['css'], $inner_selector, $css_attrs);
			}
		}

		// position → 外側セレクタ
		if (isset($active['position'])) {
			$css .= flavor_ext_position_generate_css($selector, $css_attrs);
		}
	} else {
		// ── 通常ブロック ──
		if (isset($active['spacing'])) {
			$sp_cfg = $cfg['spacing'];
			$has_full_spacing = !empty($sp_cfg['gap']) || !empty($sp_cfg['padding']);
			if ($has_full_spacing) {
				// gap+padding → 基本セレクタ、margin → 詳細度ブースト付きセレクタ
				$non_margin_attrs = $css_attrs;
				foreach (['', 'Tablet', 'Mobile'] as $device) {
					unset($non_margin_attrs['spacingMargin' . $device]);
					unset($non_margin_attrs['spacingMarginUnit' . $device]);
					unset($non_margin_attrs['spacingMarginLinked' . $device]);
				}
				$css .= flavor_ext_spacing_generate_css($selector, $non_margin_attrs);
				if (flavor_ext_margin_has($css_attrs, '')) {
					$css .= flavor_ext_margin_generate_css($margin_selector, $css_attrs);
				}
			} else {
				// margin-only: $margin_selector で詳細度ブースト
				$css .= flavor_ext_margin_generate_css($margin_selector, $css_attrs);
			}
		}
		if (isset($active['size'])) {
			$size_selector = $selector;
			if (!empty($cfg['size_inner_selector'])) {
				$size_selector = $selector . ', ' . $selector . $cfg['size_inner_selector'];
			}
			$css .= flavor_ext_size_generate_css($size_selector, $css_attrs);
		}
		if (isset($active['flex'])) {
			$css .= flavor_ext_flex_generate_css($selector, $css_attrs);
		}
		if (isset($active['shadow'])) {
			$css .= flavor_ext_shadow_generate_css($selector, $css_attrs);
		}
		if (isset($active['borderRadius'])) {
			$css .= flavor_ext_border_radius_generate_css($selector, $css_attrs);
		}
		if (isset($active['border'])) {
			$css .= flavor_ext_border_generate_css($selector, $css_attrs);
		}
		if (isset($active['opacity'])) {
			$css .= flavor_ext_opacity_generate_css($selector, $css_attrs);
		}
		if (isset($active['backdropFilter'])) {
			$css .= flavor_ext_backdrop_filter_generate_css($selector, $css_attrs);
		}
		if (isset($active['position'])) {
			$css .= flavor_ext_position_generate_css($selector, $css_attrs);
		}
		if (isset($active['backgroundImage'])) {
			$css .= flavor_ext_background_image_generate_css($selector, $css_attrs);
		}
	}

	if ($css === '') return $block_content;

	return '<style>' . $css . '</style>' . $block_content;
}, 10, 2);

// ── enqueue_block_editor_assets: 各セクションJS + config ──

add_action('enqueue_block_editor_assets', function() {
	$base_dir = get_stylesheet_directory() . '/assets/js/editor/extensions/';
	$base_uri = get_stylesheet_directory_uri() . '/assets/js/editor/extensions/';
	$common_dep = ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-hooks', 'wp-compose', 'flavor-block-custom-common'];

	// 各セクションJSファイル
	$section_scripts = [
		'flavor-ext-size'           => 'block-size.js',
		'flavor-ext-flex'           => 'block-flex.js',
		'flavor-ext-spacing'        => 'block-spacing.js',
		'flavor-ext-shadow'         => 'block-shadow.js',
		'flavor-ext-border-radius'  => 'block-border-radius.js',
		'flavor-ext-border'         => 'block-border.js',
		'flavor-ext-opacity'        => 'block-opacity.js',
		'flavor-ext-position'       => 'block-position.js',
		'flavor-ext-backdrop-filter' => 'block-backdrop-filter.js',
		'flavor-ext-background-image' => 'block-background-image.js',
	];

	foreach ($section_scripts as $handle => $file) {
		$js_path = $base_dir . $file;
		if (file_exists($js_path)) {
			wp_enqueue_script(
				$handle,
				$base_uri . $file,
				$common_dep,
				filemtime($js_path),
				true
			);
		}
	}

	// プレビューHOC（全セクションJSの後に読み込む）
	$preview_deps = array_merge($common_dep, ['wp-data'], array_keys($section_scripts));
	$preview_path = $base_dir . 'block-extensions-preview.js';
	if (file_exists($preview_path)) {
		wp_enqueue_script(
			'flavor-ext-preview',
			$base_uri . 'block-extensions-preview.js',
			$preview_deps,
			filemtime($preview_path),
			true
		);
	}

	// BLOCK_CONFIG を JS に渡す（最初のセクションJSに添付）
	$config = flavor_block_extensions_config();
	$js_config = [];
	foreach ($config as $block_name => $cfg) {
		$js_cfg = ['prefix' => $cfg['prefix']];
		if (!empty($cfg['size']))          $js_cfg['size'] = true;
		if (!empty($cfg['flex']))          $js_cfg['flex'] = $cfg['flex'];
		if (!empty($cfg['spacing']))       $js_cfg['spacing'] = $cfg['spacing'];
		if (!empty($cfg['shadow']))        $js_cfg['shadow'] = true;
		if (!empty($cfg['borderRadius']))  $js_cfg['borderRadius'] = true;
		if (!empty($cfg['border']))        $js_cfg['border'] = true;
		if (!empty($cfg['opacity'])) {
			$js_cfg['opacity'] = is_array($cfg['opacity']) ? $cfg['opacity'] : true;
		}
		if (!empty($cfg['position']))     $js_cfg['position'] = true;
		if (!empty($cfg['backdropFilter'])) $js_cfg['backdropFilter'] = true;
		if (!empty($cfg['backgroundImage'])) $js_cfg['backgroundImage'] = true;
		if (!empty($cfg['inner_selector'])) {
			$js_cfg['innerSelector'] = $cfg['inner_selector'];
			$js_cfg['innerBoxSizing'] = $cfg['inner_box_sizing'] ?? '';
		}
		$js_config[$block_name] = $js_cfg;
	}
	wp_localize_script('flavor-ext-size', 'flavorBlockExtensions', $js_config);
});
