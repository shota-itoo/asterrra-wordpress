<?php
/**
 * Universal Block
 * SWELLの干渉を避ける汎用コンテナブロック
 * レスポンシブFlexboxレイアウト設定付き
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * レスポンシブレイアウト用CSSを生成
 *
 * @param array $breakpoints ブレイクポイント設定
 * @return string CSS文字列
 */
function flavor_universal_block_get_responsive_css($breakpoints) {
	$tablet = intval($breakpoints['tablet']);
	$mobile = intval($breakpoints['mobile']);

	$selector = '.wp-block-flavor-universal-block';

	// flex-direction の値一覧
	$directions = ['row', 'column', 'row-reverse', 'column-reverse'];

	// justify-content の値一覧
	$justifies = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'];

	// align-items の値一覧
	$aligns = ['flex-start', 'center', 'flex-end', 'stretch'];

	// align-self の値一覧
	$align_selfs = ['flex-start', 'center', 'flex-end', 'stretch'];

	// justify-self の値一覧
	$justify_selfs = ['flex-start', 'center', 'flex-end', 'stretch'];

	$css = '';

	// ──── 1. PC (base — メディアクエリなし) ────
	$css .= "/* Universal Block レスポンシブレイアウト — PC */\n";
	foreach ($directions as $val) {
		$css .= "{$selector}.has-ub-direction-{$val} { display: flex; flex-direction: {$val}; }\n";
	}
	foreach ($justifies as $val) {
		$css .= "{$selector}.has-ub-justify-{$val} { justify-content: {$val}; }\n";
	}
	foreach ($aligns as $val) {
		$css .= "{$selector}.has-ub-align-{$val} { align-items: {$val}; }\n";
	}
	foreach ($align_selfs as $val) {
		$css .= "{$selector}.has-ub-align-self-{$val} { align-self: {$val}; }\n";
	}
	foreach ($justify_selfs as $val) {
		$css .= "{$selector}.has-ub-justify-self-{$val} { justify-self: {$val}; }\n";
	}

	// ──── 2. Tablet (max-width: {tablet}px) ────
	$css .= "\n/* Universal Block レスポンシブレイアウト — タブレット ({$tablet}px以下) */\n";
	$css .= "@media (max-width: {$tablet}px) {\n";
	foreach ($directions as $val) {
		$css .= "\t{$selector}.has-ub-tablet-direction-{$val} { display: flex; flex-direction: {$val}; }\n";
	}
	foreach ($justifies as $val) {
		$css .= "\t{$selector}.has-ub-tablet-justify-{$val} { justify-content: {$val}; }\n";
	}
	foreach ($aligns as $val) {
		$css .= "\t{$selector}.has-ub-tablet-align-{$val} { align-items: {$val}; }\n";
	}
	foreach ($align_selfs as $val) {
		$css .= "\t{$selector}.has-ub-tablet-align-self-{$val} { align-self: {$val}; }\n";
	}
	foreach ($justify_selfs as $val) {
		$css .= "\t{$selector}.has-ub-tablet-justify-self-{$val} { justify-self: {$val}; }\n";
	}
	$css .= "}\n";

	// ──── 3. Mobile (max-width: {mobile}px) ────
	$css .= "\n/* Universal Block レスポンシブレイアウト — モバイル ({$mobile}px以下) */\n";
	$css .= "@media (max-width: {$mobile}px) {\n";
	foreach ($directions as $val) {
		$css .= "\t{$selector}.has-ub-mobile-direction-{$val} { display: flex; flex-direction: {$val}; }\n";
	}
	foreach ($justifies as $val) {
		$css .= "\t{$selector}.has-ub-mobile-justify-{$val} { justify-content: {$val}; }\n";
	}
	foreach ($aligns as $val) {
		$css .= "\t{$selector}.has-ub-mobile-align-{$val} { align-items: {$val}; }\n";
	}
	foreach ($align_selfs as $val) {
		$css .= "\t{$selector}.has-ub-mobile-align-self-{$val} { align-self: {$val}; }\n";
	}
	foreach ($justify_selfs as $val) {
		$css .= "\t{$selector}.has-ub-mobile-justify-self-{$val} { justify-self: {$val}; }\n";
	}
	$css .= "}\n";

	return $css;
}

/**
 * エディタ用CSSを生成（PC + Tablet/Mobile メディアクエリ付き）
 * Gutenberg のプレビューモード切替で iframe 幅が変わり、
 * media query が自動発火してレスポンシブプレビューを実現する。
 *
 * @return string CSS文字列
 */
function flavor_universal_block_get_editor_css() {
	$breakpoints = apply_filters('flavor_flavor_breakpoints', [
		'tablet' => 959, 'mobile' => 599,
	]);
	$tablet = intval($breakpoints['tablet']);
	$mobile = intval($breakpoints['mobile']);

	$selector = '.wp-block-flavor-universal-block';

	$directions = ['row', 'column', 'row-reverse', 'column-reverse'];
	$justifies = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'];
	$aligns = ['flex-start', 'center', 'flex-end', 'stretch'];
	$align_selfs = ['flex-start', 'center', 'flex-end', 'stretch'];
	$justify_selfs = ['flex-start', 'center', 'flex-end', 'stretch'];

	$css = "/* Universal Block エディタ用レイアウトCSS — PC */\n";

	// ──── PC (base) ────
	foreach ($directions as $val) {
		$css .= "{$selector}.has-ub-direction-{$val} { display: flex; flex-direction: {$val}; }\n";
	}
	foreach ($justifies as $val) {
		$css .= "{$selector}.has-ub-justify-{$val} { justify-content: {$val}; }\n";
	}
	foreach ($aligns as $val) {
		$css .= "{$selector}.has-ub-align-{$val} { align-items: {$val}; }\n";
	}
	foreach ($align_selfs as $val) {
		$css .= "{$selector}.has-ub-align-self-{$val} { align-self: {$val}; }\n";
	}
	foreach ($justify_selfs as $val) {
		$css .= "{$selector}.has-ub-justify-self-{$val} { justify-self: {$val}; }\n";
	}

	// ──── Tablet ────
	$css .= "\n/* Universal Block エディタ用レイアウトCSS — タブレット ({$tablet}px以下) */\n";
	$css .= "@media (max-width: {$tablet}px) {\n";
	foreach ($directions as $val) {
		$css .= "\t{$selector}.has-ub-tablet-direction-{$val} { display: flex; flex-direction: {$val}; }\n";
	}
	foreach ($justifies as $val) {
		$css .= "\t{$selector}.has-ub-tablet-justify-{$val} { justify-content: {$val}; }\n";
	}
	foreach ($aligns as $val) {
		$css .= "\t{$selector}.has-ub-tablet-align-{$val} { align-items: {$val}; }\n";
	}
	foreach ($align_selfs as $val) {
		$css .= "\t{$selector}.has-ub-tablet-align-self-{$val} { align-self: {$val}; }\n";
	}
	foreach ($justify_selfs as $val) {
		$css .= "\t{$selector}.has-ub-tablet-justify-self-{$val} { justify-self: {$val}; }\n";
	}
	$css .= "}\n";

	// ──── Mobile ────
	$css .= "\n/* Universal Block エディタ用レイアウトCSS — モバイル ({$mobile}px以下) */\n";
	$css .= "@media (max-width: {$mobile}px) {\n";
	foreach ($directions as $val) {
		$css .= "\t{$selector}.has-ub-mobile-direction-{$val} { display: flex; flex-direction: {$val}; }\n";
	}
	foreach ($justifies as $val) {
		$css .= "\t{$selector}.has-ub-mobile-justify-{$val} { justify-content: {$val}; }\n";
	}
	foreach ($aligns as $val) {
		$css .= "\t{$selector}.has-ub-mobile-align-{$val} { align-items: {$val}; }\n";
	}
	foreach ($align_selfs as $val) {
		$css .= "\t{$selector}.has-ub-mobile-align-self-{$val} { align-self: {$val}; }\n";
	}
	foreach ($justify_selfs as $val) {
		$css .= "\t{$selector}.has-ub-mobile-justify-self-{$val} { justify-self: {$val}; }\n";
	}
	$css .= "}\n";

	// エディタ子ブロック(.wp-block)のデフォルトスタイルをリセット
	$css .= "\n/* エディタ子ブロックのリセット — フロント表示と一致させる */\n";
	foreach ($directions as $val) {
		$css .= "{$selector}.has-ub-direction-{$val} > .wp-block { max-width: none; margin-left: 0; margin-right: 0; margin-top: 0; margin-bottom: 0; }\n";
	}
	// Tablet/Mobile レイアウトクラスでも子ブロックリセット
	$css .= "@media (max-width: {$tablet}px) {\n";
	foreach ($directions as $val) {
		$css .= "\t{$selector}.has-ub-tablet-direction-{$val} > .wp-block { max-width: none; margin-left: 0; margin-right: 0; margin-top: 0; margin-bottom: 0; }\n";
	}
	$css .= "}\n";
	$css .= "@media (max-width: {$mobile}px) {\n";
	foreach ($directions as $val) {
		$css .= "\t{$selector}.has-ub-mobile-direction-{$val} > .wp-block { max-width: none; margin-left: 0; margin-right: 0; margin-top: 0; margin-bottom: 0; }\n";
	}
	$css .= "}\n";

	// サイズ設定のエディタ反映（CSS変数 + !important でGutenberg/SWELLの上書きに対抗）
	$size_props = [
		'max-width'  => '--ub-max-width',
		'width'      => '--ub-width',
		'min-width'  => '--ub-min-width',
		'height'     => '--ub-height',
		'min-height' => '--ub-min-height',
		'max-height' => '--ub-max-height',
	];
	$css .= "\n/* エディタ用サイズ設定 — CSS変数経由で !important 適用 */\n";
	foreach ($size_props as $css_prop => $css_var) {
		$css .= ".wp-block{$selector}{$selector}{$selector}[style*=\"{$css_var}\"] { {$css_prop}: var({$css_var}) !important; }\n";
	}

	return $css;
}

/**
 * フロントエンド用CSS読み込み
 */
add_action('wp_enqueue_scripts', function() {
	$breakpoints = apply_filters('flavor_flavor_breakpoints', [
		'tablet' => 959,
		'mobile' => 599,
	]);

	wp_register_style('flavor-universal-block-responsive', false);
	wp_enqueue_style('flavor-universal-block-responsive');

	$responsive_css = flavor_universal_block_get_responsive_css($breakpoints);
	wp_add_inline_style('flavor-universal-block-responsive', $responsive_css);
}, 11);

/**
 * ブロックエディタ用スクリプト・スタイルの読み込み
 */
add_action('enqueue_block_editor_assets', function() {
	$js_path = get_stylesheet_directory() . '/assets/js/editor/blocks/universal-block.js';
	if (file_exists($js_path)) {
		wp_enqueue_script(
			'flavor-universal-block-editor',
			get_stylesheet_directory_uri() . '/assets/js/editor/blocks/universal-block.js',
			['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-hooks', 'wp-compose', 'wp-data', 'flavor-block-custom-common'],
			filemtime($js_path),
			true
		);

		// ブレイクポイントをJSに渡す
		$breakpoints = apply_filters('flavor_flavor_breakpoints', [
			'tablet' => 959,
			'mobile' => 599,
		]);
		wp_localize_script('flavor-universal-block-editor', 'flavorUniversalBlockBreakpoints', $breakpoints);
	}

	// エディタ用CSS（PC用クラスのみ）
	wp_register_style('flavor-universal-block-editor-style', false);
	wp_enqueue_style('flavor-universal-block-editor-style');

	$editor_css = flavor_universal_block_get_editor_css();
	wp_add_inline_style('flavor-universal-block-editor-style', $editor_css);
});

// render_block フィルター（スペーシング/サイズ/Flex/スタイルCSS生成）は
// extensions/index.php のオーケストレーターが処理
