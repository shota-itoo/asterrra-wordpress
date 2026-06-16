<?php
/**
 * Block Custom Common
 * 汎用ブロック・画像カスタム設定等の共通PHPユーティリティ
 */

if (!defined('ABSPATH')) {
	exit;
}

// ──── 汎用ユーティリティ ────

/**
 * スペーシング値を計算するヘルパー関数
 * プリセット値 or カスタム値を適切なCSS値に変換
 *
 * @param string|array $value スペーシング値
 * @param string $unit 単位タイプ ('preset' or 'custom')
 * @param string $custom_unit カスタム単位 (px, em, rem, %)
 * @return string CSS値
 */
function flavor_flavor_get_spacing_css_value($value, $unit = 'preset', $custom_unit = 'px') {
	if (empty($value) && $value !== '0' && $value !== 0) {
		return '';
	}

	// プリセットの場合（大文字小文字を区別しない）
	if ($unit === 'preset') {
		$presets = [
			'0' => '0',
			'2xs' => 'var(--wp--preset--spacing--5, 0.33rem)',
			'xs' => 'var(--wp--preset--spacing--10, 0.67rem)',
			's' => 'var(--wp--preset--spacing--20, 1rem)',
			'm' => 'var(--wp--preset--spacing--30, 1.5rem)',
			'l' => 'var(--wp--preset--spacing--40, 2rem)',
			'xl' => 'var(--wp--preset--spacing--50, 3rem)',
			'2xl' => 'var(--wp--preset--spacing--60, 5.06rem)',
		];
		$value_lower = strtolower($value);
		return $presets[$value_lower] ?? '';
	}

	// CSSキーワード値の場合は単位を付けない
	$keywords = ['auto', 'inherit', 'initial', 'unset', 'revert'];
	if (in_array($value, $keywords, true)) {
		return $value;
	}

	// カスタム値の場合
	return $value . ($custom_unit ?: 'px');
}

/**
 * Box型スペーシング（Padding/Margin）のCSS生成
 *
 * @param array $spacing_obj スペーシングオブジェクト { top, right, bottom, left }
 * @param string $unit 単位タイプ
 * @param string $custom_unit カスタム単位
 * @param string $property 'padding' or 'margin'
 * @param bool $important !importantを付与するか（レスポンシブ用）
 * @return string CSS宣言
 */
function flavor_flavor_get_box_spacing_css($spacing_obj, $unit = 'preset', $custom_unit = 'px', $property = 'padding', $important = false) {
	if (empty($spacing_obj) || !is_array($spacing_obj)) {
		return '';
	}

	$sides = ['top', 'right', 'bottom', 'left'];
	$css_parts = [];
	$important_str = $important ? ' !important' : '';

	foreach ($sides as $side) {
		if (isset($spacing_obj[$side]) && ($spacing_obj[$side] !== '' || $spacing_obj[$side] === '0')) {
			$value = flavor_flavor_get_spacing_css_value($spacing_obj[$side], $unit, $custom_unit);
			if ($value !== '') {
				$css_parts[] = "{$property}-{$side}: {$value}{$important_str}";
			}
		}
	}

	return implode('; ', $css_parts);
}

/**
 * プレフィックス付き属性をプレフィックスなしの属性名にリマップ
 *
 * @param array  $attrs  ブロック属性
 * @param string $prefix プレフィックス（例: 'img'）
 * @return array リマップ後の属性
 */
function flavor_block_remap_attrs($attrs, $prefix) {
	$remapped = [];
	$prefix_len = strlen($prefix);
	foreach ($attrs as $key => $value) {
		if (strpos($key, $prefix) === 0) {
			$remapped[lcfirst(substr($key, $prefix_len))] = $value;
		}
	}
	return $remapped;
}

// ──── 共通スタイルユーティリティ ────

/**
 * シャドウプリセット値 / custom: → CSS box-shadow値
 */
function flavor_ub_get_shadow_css($value) {
	if (empty($value)) return '';
	if (strpos($value, 'custom:') === 0) {
		return substr($value, 7);
	}
	$presets = [
		'xs'    => '0 1px 2px 0 rgba(0,0,0,.05)',
		's'     => '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)',
		'm'     => '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)',
		'l'     => '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)',
		'xl'    => '0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)',
		'2xl'   => '0 25px 50px -12px rgba(0,0,0,.25)',
		'inner' => 'inset 0 2px 4px 0 rgba(0,0,0,.06)',
	];
	return $presets[$value] ?? '';
}

/**
 * text-shadow プリセット値 or カスタム値 → CSS値
 */
function flavor_ub_get_text_shadow_css($value) {
	if (empty($value)) return '';
	if (strpos($value, 'custom:') === 0) {
		return substr($value, 7);
	}
	$presets = [
		's'             => '0 1px 2px rgba(0,0,0,.15)',
		'm'             => '0 2px 4px rgba(0,0,0,.2)',
		'l'             => '0 4px 8px rgba(0,0,0,.25)',
		'white-outline' => '0 0 8px rgba(255,255,255,.8), 0 0 16px rgba(255,255,255,.6)',
		'black-outline' => '0 0 8px rgba(0,0,0,.6), 0 0 16px rgba(0,0,0,.4)',
	];
	return $presets[$value] ?? '';
}

/**
 * ブロック属性から背景色を解決（インラインスタイル or プリセットスラッグ → HEX）
 */
function flavor_ub_resolve_bg_color($attrs) {
	$inline = $attrs['style']['color']['background'] ?? '';
	if ($inline !== '' && strpos($inline, '#') === 0) return $inline;

	$slug = $attrs['backgroundColor'] ?? '';
	if ($slug === '') return $inline; // 非HEXインライン値はそのまま返す

	$settings = wp_get_global_settings();
	$palettes = array_merge(
		$settings['color']['palette']['theme'] ?? [],
		$settings['color']['palette']['custom'] ?? [],
		$settings['color']['palette']['default'] ?? []
	);
	foreach ($palettes as $color) {
		if ($color['slug'] === $slug) return $color['color'];
	}
	return '';
}

/**
 * HEX色コード → RGBA変換
 */
function flavor_ub_hex_to_rgba($hex, $alpha) {
	$hex = ltrim($hex, '#');
	if (strlen($hex) === 3) {
		$hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
	}
	if (strlen($hex) !== 6) return '';
	$r = hexdec(substr($hex, 0, 2));
	$g = hexdec(substr($hex, 2, 2));
	$b = hexdec(substr($hex, 4, 2));
	return "rgba({$r},{$g},{$b},{$alpha})";
}

// ──── レスポンシブCSS生成ヘルパー ────

/**
 * レスポンシブCSS生成（PC / Tablet / Mobile）
 * 各セクションの declarations 関数を受け取り、メディアクエリ付きCSSを生成
 *
 * @param string   $selector       CSSセレクタ
 * @param array    $attrs          ブロック属性
 * @param callable $declaration_fn function($attrs, $suffix) → CSS宣言文字列
 * @return string CSS
 */
function flavor_ext_generate_responsive_css($selector, $attrs, $declaration_fn) {
	$breakpoints = apply_filters('flavor_flavor_breakpoints', ['tablet' => 959, 'mobile' => 599]);
	$css = '';
	$pc = $declaration_fn($attrs, '');
	if ($pc !== '') $css .= "{$selector} { {$pc}; }\n";
	$tablet = $declaration_fn($attrs, 'Tablet');
	if ($tablet !== '') $css .= "@media (max-width: {$breakpoints['tablet']}px) { {$selector} { {$tablet}; } }\n";
	$mobile = $declaration_fn($attrs, 'Mobile');
	if ($mobile !== '') $css .= "@media (max-width: {$breakpoints['mobile']}px) { {$selector} { {$mobile}; } }\n";
	return $css;
}

// ──── 共通JS読み込み ────

add_action('enqueue_block_editor_assets', function() {
	$js_path = get_stylesheet_directory() . '/assets/js/editor/block-custom-common.js';
	if (file_exists($js_path)) {
		wp_enqueue_script(
			'flavor-block-custom-common',
			get_stylesheet_directory_uri() . '/assets/js/editor/block-custom-common.js',
			['wp-element', 'wp-components', 'wp-hooks'],
			filemtime($js_path),
			true
		);
		// ブレイクポイントをJSに渡す
		$breakpoints = apply_filters('flavor_flavor_breakpoints', [
			'tablet' => 959, 'mobile' => 599,
		]);
		wp_localize_script('flavor-block-custom-common', 'flavorBlockCommonBreakpoints', $breakpoints);
	}
}, 9); // 優先度9: 他のブロックJSより先に読み込み

// ── エディタプレビュー調整 ──

// iframe 内のスクロールバーを非表示にしてコンテンツ幅を確保
add_action('enqueue_block_editor_assets', function() {
	// 親ページ CSS: iframe 幅調整
	// 注意: Gutenberg のプレビュー幅（360px / 780px）はハードコード値。
	// WordPress / Gutenberg のアップデートでこれらの値が変更された場合は要更新。
	// 確認バージョン: WordPress 6.9.4 / Gutenberg bundled
	$parent_css = <<<CSS
/* SP プレビュー幅を 375px に（Gutenberg デフォルト 360px + スクロールバー分加算） */
.editor-visual-editor iframe[style*="width: 360px"] { width: 390px !important; }
/* Tablet プレビューもスクロールバー分加算 */
.editor-visual-editor iframe[style*="width: 780px"] { width: 795px !important; }
CSS;
	wp_register_style('flavor-editor-preview-fix', false);
	wp_enqueue_style('flavor-editor-preview-fix');
	wp_add_inline_style('flavor-editor-preview-fix', $parent_css);
});
