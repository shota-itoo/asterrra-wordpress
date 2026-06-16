<?php
/**
 * Responsive Text Align Extension
 * core/paragraph・core/heading に Tablet / Mobile 時の text-align 切替を追加する。
 *
 * - PC の文字揃えは core 標準（ツールバーの align ＝ has-text-align-*）をそのまま使う。
 * - 本拡張は TB(≤959px) / SP(≤599px) の text-align を「上書き」する属性を追加する。
 *   ＝ 段落のブロック設定だけで PC / TB / SP を別々に指定できる（Gutenberg編集可）。
 *
 * 実装は heading-responsive-font.php と同じ自己完結パターン
 * （属性登録 → render_block で @media <style> 注入 → エディタJS enqueue）。
 */

if (!defined('ABSPATH')) {
	exit;
}

/** 対象ブロック */
function flavor_rsp_text_align_blocks() {
	return ['core/heading', 'core/paragraph'];
}

/** 許可する text-align 値（不正値はCSSに出さない） */
function flavor_rsp_text_align_valid() {
	return ['left', 'center', 'right', 'justify', 'start', 'end'];
}

/**
 * ブロックエディタ用スクリプトの読み込み
 */
add_action('enqueue_block_editor_assets', function() {
	$js_path = get_stylesheet_directory() . '/assets/js/editor/extensions/responsive-text-align.js';
	if (file_exists($js_path)) {
		wp_enqueue_script(
			'flavor-responsive-text-align',
			get_stylesheet_directory_uri() . '/assets/js/editor/extensions/responsive-text-align.js',
			['wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-i18n'],
			filemtime($js_path),
			true
		);
	}
});

/**
 * レスポンシブ text-align 属性を登録
 */
add_filter('register_block_type_args', function($args, $name) {
	if (!in_array($name, flavor_rsp_text_align_blocks(), true)) {
		return $args;
	}
	if (!isset($args['attributes'])) {
		$args['attributes'] = [];
	}
	$args['attributes']['tabletTextAlign'] = ['type' => 'string', 'default' => ''];
	$args['attributes']['mobileTextAlign'] = ['type' => 'string', 'default' => ''];
	return $args;
}, 10, 2);

/**
 * レスポンシブ text-align の CSS を @media で出力
 */
add_filter('render_block', function($block_content, $block) {
	if (!in_array($block['blockName'] ?? '', flavor_rsp_text_align_blocks(), true)) {
		return $block_content;
	}

	$attrs  = $block['attrs'] ?? [];
	$tablet = $attrs['tabletTextAlign'] ?? '';
	$mobile = $attrs['mobileTextAlign'] ?? '';

	if ($tablet === '' && $mobile === '') {
		return $block_content;
	}

	$valid = flavor_rsp_text_align_valid();
	$css   = '';

	// ユニークなクラス名（インスタンスごと）
	static $counter = 0;
	$counter++;
	$block_id = 'rsp-talign-' . $counter;

	// core の has-text-align-*（0,1,0）に勝つため !important で上書き。
	// インライン <style> はブロック直前に出力されるため @media 内で確実に適用される。
	if ($tablet !== '' && in_array($tablet, $valid, true)) {
		$css .= "@media (max-width: 959px) { .{$block_id} { text-align: " . esc_attr($tablet) . " !important; } }";
	}
	if ($mobile !== '' && in_array($mobile, $valid, true)) {
		$css .= "@media (max-width: 599px) { .{$block_id} { text-align: " . esc_attr($mobile) . " !important; } }";
	}

	if ($css === '') {
		return $block_content;
	}

	$style_tag = '<style>' . $css . '</style>';

	// 先頭の <p> または <h1〜6> の class にユニーククラスを追加
	$block_content = preg_replace(
		'/(<(?:h[1-6]|p)[^>]*class=["\'])([^"\']*)(["\'])/',
		'$1$2 ' . $block_id . '$3',
		$block_content,
		1
	);
	// class 属性が無い場合は新設
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
