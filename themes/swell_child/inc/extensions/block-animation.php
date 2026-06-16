<?php
/**
 * Block Animation
 * ブロックアニメーション機能
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * 対象ブロック一覧
 */
define('FLAVOR_ANIMATION_ALLOWED_BLOCKS', [
	'outermost/icon-block',
	'core/image',
	'core/cover',
	'flavor/universal-block'
]);

/**
 * ブロック属性にcustomAnimationsとcustomAspectRatioを追加
 */
add_filter('register_block_type_args', function($args, $block_type) {
	if (!in_array($block_type, FLAVOR_ANIMATION_ALLOWED_BLOCKS)) {
		return $args;
	}

	if (!isset($args['attributes'])) {
		$args['attributes'] = [];
	}

	$args['attributes']['customAnimations'] = [
		'type' => 'array',
		'default' => []
	];

	$args['attributes']['customAspectRatio'] = [
		'type' => 'string',
		'default' => ''
	];

	return $args;
}, 10, 2);

/**
 * render_blockフィルターでアニメーション属性とaspect-ratioを追加
 */
add_filter('render_block', function($block_content, $block) {
	// 対象ブロックのみ処理
	if (!in_array($block['blockName'], FLAVOR_ANIMATION_ALLOWED_BLOCKS)) {
		return $block_content;
	}

	$has_animations = !empty($block['attrs']['customAnimations']);
	$has_aspect_ratio = !empty($block['attrs']['customAspectRatio']);

	// 処理対象がない場合はそのまま返す
	if (!$has_animations && !$has_aspect_ratio) {
		return $block_content;
	}

	$aspect_ratio = $has_aspect_ratio ? esc_attr($block['attrs']['customAspectRatio']) : '';

	$processor = new WP_HTML_Tag_Processor($block_content);
	if ($processor->next_tag()) {
		// アニメーション属性を追加
		if ($has_animations) {
			$animations = $block['attrs']['customAnimations'];
			$animations_json = wp_json_encode($animations);
			$processor->add_class('has-animation');
			$processor->set_attribute('data-animations', $animations_json);
		}

		// aspect-ratioをインラインスタイルに追加（figure要素）
		if ($has_aspect_ratio) {
			$existing_style = $processor->get_attribute('style') ?? '';
			$new_style = rtrim($existing_style, '; ');
			if ($new_style) {
				$new_style .= '; ';
			}
			$new_style .= 'aspect-ratio: ' . $aspect_ratio . ';';
			$processor->set_attribute('style', $new_style);
		}

		$updated_html = $processor->get_updated_html();

		// 画像ブロックの場合、img要素にもaspect-ratioを適用
		if ($block['blockName'] === 'core/image' && $has_aspect_ratio) {
			$img_processor = new WP_HTML_Tag_Processor($updated_html);
			if ($img_processor->next_tag('img')) {
				$img_existing_style = $img_processor->get_attribute('style') ?? '';
				$img_new_style = rtrim($img_existing_style, '; ');
				if ($img_new_style) {
					$img_new_style .= '; ';
				}
				$img_new_style .= 'aspect-ratio: ' . $aspect_ratio . '; object-fit: cover;';
				$img_processor->set_attribute('style', $img_new_style);
				return $img_processor->get_updated_html();
			}
		}

		return $updated_html;
	}

	return $block_content;
}, 10, 2);

/**
 * フロントエンド用CSS/JS読み込み
 */
add_action('wp_enqueue_scripts', function() {
	// CSS
	$css_path = get_stylesheet_directory() . '/assets/css/block-animations.css';
	if (file_exists($css_path)) {
		wp_enqueue_style(
			'flavor-flavor-block-animations',
			get_stylesheet_directory_uri() . '/assets/css/block-animations.css',
			[],
			filemtime($css_path)
		);
	}

	// JavaScript
	$js_path = get_stylesheet_directory() . '/assets/js/frontend/block-animation-frontend.js';
	if (file_exists($js_path)) {
		wp_enqueue_script(
			'flavor-flavor-block-animation-frontend',
			get_stylesheet_directory_uri() . '/assets/js/frontend/block-animation-frontend.js',
			[],
			filemtime($js_path),
			true
		);
	}
}, 11);

/**
 * エディタ用CSS読み込み（プレビュー用）
 */
add_action('enqueue_block_editor_assets', function() {
	$css_path = get_stylesheet_directory() . '/assets/css/block-animations.css';
	if (file_exists($css_path)) {
		wp_enqueue_style(
			'flavor-flavor-block-animations-editor',
			get_stylesheet_directory_uri() . '/assets/css/block-animations.css',
			[],
			filemtime($css_path)
		);
	}

	// 共通アニメーションUI
	$common_js = get_stylesheet_directory() . '/assets/js/editor/block-animation-editor-common.js';
	if (file_exists($common_js)) {
		wp_enqueue_script(
			'flavor-block-animation-editor-common',
			get_stylesheet_directory_uri() . '/assets/js/editor/block-animation-editor-common.js',
			['wp-element', 'wp-components', 'wp-i18n'],
			filemtime($common_js),
			true
		);
	}

	// アニメーションUI HOC extension
	$anim_editor_js = get_stylesheet_directory() . '/assets/js/editor/extensions/block-animation-editor.js';
	if (file_exists($anim_editor_js)) {
		wp_enqueue_script(
			'flavor-block-animation-editor',
			get_stylesheet_directory_uri() . '/assets/js/editor/extensions/block-animation-editor.js',
			['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-hooks', 'wp-compose', 'flavor-block-animation-editor-common'],
			filemtime($anim_editor_js),
			true
		);
		// 対象ブロック一覧をJSに渡す
		wp_localize_script('flavor-block-animation-editor', 'flavorAnimationAllowedBlocks', FLAVOR_ANIMATION_ALLOWED_BLOCKS);
	}
});
