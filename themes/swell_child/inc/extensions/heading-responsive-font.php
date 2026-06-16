<?php
/**
 * Heading/Paragraph Block Responsive Font Size Extension
 * 見出し・段落ブロックにタブレット・モバイル時のフォントサイズ設定を追加
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * ブロックエディタ用スクリプトの読み込み
 */
add_action('enqueue_block_editor_assets', function() {
	$js_path = get_stylesheet_directory() . '/assets/js/editor/extensions/heading-responsive-font.js';
	if (file_exists($js_path)) {
		wp_enqueue_script(
			'flavor-flavor-heading-responsive-font',
			get_stylesheet_directory_uri() . '/assets/js/editor/extensions/heading-responsive-font.js',
			['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-i18n'],
			filemtime($js_path),
			true
		);
	}
});


/**
 * 見出し・段落ブロックにレスポンシブフォントサイズ属性を登録
 */
add_filter('register_block_type_args', function($args, $name) {
	// 対象ブロック
	$allowed_blocks = ['core/heading', 'core/paragraph'];

	if (!in_array($name, $allowed_blocks, true)) {
		return $args;
	}

	// カスタム属性を追加
	if (!isset($args['attributes'])) {
		$args['attributes'] = [];
	}

	$args['attributes']['tabletFontSize'] = [
		'type'    => 'string',
		'default' => '',
	];
	$args['attributes']['tabletFontSizeUnit'] = [
		'type'    => 'string',
		'default' => 'em',
	];
	$args['attributes']['mobileFontSize'] = [
		'type'    => 'string',
		'default' => '',
	];
	$args['attributes']['mobileFontSizeUnit'] = [
		'type'    => 'string',
		'default' => 'em',
	];

	return $args;
}, 10, 2);


/**
 * 見出し・段落ブロックにレスポンシブフォントサイズのCSSを出力
 */
add_filter('render_block', function($block_content, $block) {
	// 対象ブロック
	$allowed_blocks = ['core/heading', 'core/paragraph'];

	if (!in_array($block['blockName'] ?? '', $allowed_blocks, true)) {
		return $block_content;
	}

	$attrs = $block['attrs'] ?? [];

	// レスポンシブフォントサイズ設定を取得
	$tablet_font_size      = $attrs['tabletFontSize'] ?? '';
	$tablet_font_size_unit = $attrs['tabletFontSizeUnit'] ?? 'em';
	$mobile_font_size      = $attrs['mobileFontSize'] ?? '';
	$mobile_font_size_unit = $attrs['mobileFontSizeUnit'] ?? 'em';

	// 設定がない場合は何もしない
	if (empty($tablet_font_size) && empty($mobile_font_size)) {
		return $block_content;
	}

	// ユニークなクラス名を生成
	static $counter = 0;
	$counter++;
	$block_id = 'rsp-font-' . $counter;

	// CSSを生成
	$css = '';

	// タブレット用CSS (959px以下)
	if (!empty($tablet_font_size)) {
		$tablet_value = floatval($tablet_font_size) . esc_attr($tablet_font_size_unit);
		$css .= "@media (max-width: 959px) { .{$block_id} { font-size: {$tablet_value} !important; } }";
	}

	// モバイル用CSS (599px以下)
	if (!empty($mobile_font_size)) {
		$mobile_value = floatval($mobile_font_size) . esc_attr($mobile_font_size_unit);
		$css .= "@media (max-width: 599px) { .{$block_id} { font-size: {$mobile_value} !important; } }";
	}

	// CSSをstyleタグで出力（ブロックの前に挿入）
	$style_tag = '<style>' . $css . '</style>';

	// ブロックにクラスを追加
	// 見出しブロック: <h1〜h6>、段落ブロック: <p>
	$block_content = preg_replace(
		'/(<(?:h[1-6]|p)[^>]*class=["\'])([^"\']*)(["\'])/',
		'$1$2 ' . $block_id . '$3',
		$block_content,
		1
	);

	// classがない場合は追加
	if (strpos($block_content, $block_id) === false) {
		$block_content = preg_replace(
			'/(<(?:h[1-6]|p))([^>]*>)/',
			'$1 class="' . $block_id . '"$2',
			$block_content,
			1
		);
	}

	return $style_tag . $block_content;
}, 10, 2);
