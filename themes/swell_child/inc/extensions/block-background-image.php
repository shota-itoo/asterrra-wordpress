<?php
/**
 * Block Extension: 背景画像
 * 背景画像 + オーバーレイ（::before / ::after 擬似要素）
 *
 * 現在 flavor/universal-block のみ有効。
 * 他ブロックに拡張する場合は $prefix の本格適用が必要。
 * JS側の属性定義: block-custom-common.js generateBackgroundImageAttributes()
 */

if (!defined('ABSPATH')) {
	exit;
}

/** 許可リスト: background-size */
function flavor_ext_background_image_allowed_sizes() {
	return ['cover', 'contain', 'auto'];
}

/** 許可リスト: background-position */
function flavor_ext_background_image_allowed_positions() {
	return ['center', 'top', 'bottom', 'left', 'right', 'left top', 'right top', 'left bottom', 'right bottom'];
}

/**
 * 背景画像属性を登録
 *
 * 現在 $prefix は未使用（universal-block 限定のため）。
 * 将来他ブロックに拡張する場合は prefix を属性名に適用すること。
 */
function flavor_ext_background_image_register_attrs($prefix, $options = []) {
	$attrs = [];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$attrs['backgroundImageUrl' . $device]      = ['type' => 'string', 'default' => ''];
		$attrs['backgroundImageId' . $device]        = ['type' => 'number', 'default' => 0];
		$attrs['backgroundImageSize' . $device]      = ['type' => 'string', 'default' => ''];
		$attrs['backgroundImagePosition' . $device]  = ['type' => 'string', 'default' => ''];
		$attrs['backgroundOverlayColor' . $device]   = ['type' => 'string', 'default' => ''];
		$attrs['backgroundOverlayOpacity' . $device] = ['type' => 'string', 'default' => ''];
	}
	// PC のデフォルト値（他デバイスは空=PCを継承）
	$attrs['backgroundImageSize']['default'] = 'cover';
	$attrs['backgroundImagePosition']['default'] = 'center';
	$attrs['backgroundOverlayOpacity']['default'] = '70';
	return $attrs;
}

/**
 * 背景画像が設定されているか判定
 */
function flavor_ext_background_image_has($attrs, $prefix) {
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		if (!empty($attrs['backgroundImageUrl' . $device])) return true;
	}
	return false;
}

/**
 * 値をサニタイズしてCSS宣言を生成（1デバイス分）
 *
 * PC ($suffix === ''): URL必須。フル宣言を出力（image / repeat / size / position）
 * Tablet/Mobile: URL は任意。各プロパティ（Url/Size/Position）が設定されていれば
 *                その変更分のみ出力。未設定のプロパティは CSS カスケードで PC 値を継承。
 *                3 プロパティすべて未設定の場合は空文字を返し、メディアクエリが出力されない。
 */
function flavor_ext_background_image_declarations($attrs, $suffix = '') {
	if ($suffix === '') {
		// PC: URL必須、フル宣言
		$url = $attrs['backgroundImageUrl'] ?? '';
		if ($url === '') return '';

		$url = esc_url($url);
		$url = str_replace('"', '', $url);

		$decls = [];
		$decls[] = "background-image: url(\"{$url}\")";
		$decls[] = 'background-repeat: no-repeat';

		$size = $attrs['backgroundImageSize'] ?? '';
		if ($size !== '' && in_array($size, flavor_ext_background_image_allowed_sizes(), true)) {
			$decls[] = "background-size: {$size}";
		} else {
			$decls[] = 'background-size: cover';
		}

		$position = $attrs['backgroundImagePosition'] ?? '';
		if ($position !== '' && in_array($position, flavor_ext_background_image_allowed_positions(), true)) {
			$decls[] = "background-position: {$position}";
		} else {
			$decls[] = 'background-position: center';
		}

		return implode('; ', $decls);
	}

	// Tablet/Mobile: 設定されたプロパティのみ出力（PC からカスケード継承）
	$decls = [];

	// URL（任意。設定があれば差し替え + repeat 再宣言）
	$device_url = $attrs['backgroundImageUrl' . $suffix] ?? '';
	if ($device_url !== '') {
		$device_url = esc_url($device_url);
		$device_url = str_replace('"', '', $device_url);
		$decls[] = "background-image: url(\"{$device_url}\")";
		$decls[] = 'background-repeat: no-repeat';
	}

	// Size（任意）
	$size = $attrs['backgroundImageSize' . $suffix] ?? '';
	if ($size !== '' && in_array($size, flavor_ext_background_image_allowed_sizes(), true)) {
		$decls[] = "background-size: {$size}";
	}

	// Position（任意）
	$position = $attrs['backgroundImagePosition' . $suffix] ?? '';
	if ($position !== '' && in_array($position, flavor_ext_background_image_allowed_positions(), true)) {
		$decls[] = "background-position: {$position}";
	}

	return empty($decls) ? '' : implode('; ', $decls);
}

/**
 * オーバーレイの不透明度を解決する
 * 空文字の場合はPC値にフォールバック
 */
function flavor_ext_background_image_resolve_opacity($attrs, $suffix) {
	$raw = $attrs['backgroundOverlayOpacity' . $suffix] ?? '';
	if ($raw === '') {
		$raw = $attrs['backgroundOverlayOpacity'] ?? '70';
	}
	return max(0, min(100, intval($raw)));
}

/**
 * 背景画像CSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_background_image_generate_css($selector, $attrs) {
	$url = $attrs['backgroundImageUrl'] ?? '';
	if ($url === '') return '';

	$breakpoints = apply_filters('flavor_flavor_breakpoints', ['tablet' => 959, 'mobile' => 599]);
	$css = '';

	// position: relative（position extension が未設定の場合のみ）
	$has_position_ext = !empty($attrs['positionType']);
	if (!$has_position_ext) {
		$css .= "{$selector} { position: relative; }\n";
	}

	// overflow: hidden（layoutOverflow が未設定の場合のみ）
	$has_overflow = !empty($attrs['layoutOverflow']);
	if (!$has_overflow) {
		$css .= "{$selector} { overflow: hidden; }\n";
	}

	// ::before — 背景画像（PC）
	$pc_decl = flavor_ext_background_image_declarations($attrs, '');
	if ($pc_decl !== '') {
		$css .= "{$selector}::before { content: \"\"; position: absolute; top: 0; left: 0; width: 100%; height: 100%; {$pc_decl}; z-index: 0; border-radius: inherit; pointer-events: none; }\n";
	}

	// ::before — Tablet
	$tablet_decl = flavor_ext_background_image_declarations($attrs, 'Tablet');
	if ($tablet_decl !== '') {
		$css .= "@media (max-width: {$breakpoints['tablet']}px) { {$selector}::before { {$tablet_decl}; } }\n";
	}

	// ::before — Mobile
	$mobile_decl = flavor_ext_background_image_declarations($attrs, 'Mobile');
	if ($mobile_decl !== '') {
		$css .= "@media (max-width: {$breakpoints['mobile']}px) { {$selector}::before { {$mobile_decl}; } }\n";
	}

	// ::after — オーバーレイ（PC）
	$overlay_color = $attrs['backgroundOverlayColor'] ?? '';
	if ($overlay_color !== '' && preg_match('/^#[0-9a-fA-F]{3,6}$/', $overlay_color)) {
		$opacity = flavor_ext_background_image_resolve_opacity($attrs, '');
		$rgba = flavor_ub_hex_to_rgba($overlay_color, $opacity / 100);
		if ($rgba !== '') {
			$css .= "{$selector}::after { content: \"\"; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: {$rgba}; z-index: 1; border-radius: inherit; pointer-events: none; }\n";
		}
	}

	// Tablet オーバーレイ
	$overlay_color_tablet = $attrs['backgroundOverlayColorTablet'] ?? '';
	if ($overlay_color_tablet !== '' && preg_match('/^#[0-9a-fA-F]{3,6}$/', $overlay_color_tablet)) {
		$opacity_tablet = flavor_ext_background_image_resolve_opacity($attrs, 'Tablet');
		$rgba_tablet = flavor_ub_hex_to_rgba($overlay_color_tablet, $opacity_tablet / 100);
		if ($rgba_tablet !== '') {
			$css .= "@media (max-width: {$breakpoints['tablet']}px) { {$selector}::after { background-color: {$rgba_tablet}; } }\n";
		}
	}

	// Mobile オーバーレイ
	$overlay_color_mobile = $attrs['backgroundOverlayColorMobile'] ?? '';
	if ($overlay_color_mobile !== '' && preg_match('/^#[0-9a-fA-F]{3,6}$/', $overlay_color_mobile)) {
		$opacity_mobile = flavor_ext_background_image_resolve_opacity($attrs, 'Mobile');
		$rgba_mobile = flavor_ub_hex_to_rgba($overlay_color_mobile, $opacity_mobile / 100);
		if ($rgba_mobile !== '') {
			$css .= "@media (max-width: {$breakpoints['mobile']}px) { {$selector}::after { background-color: {$rgba_mobile}; } }\n";
		}
	}

	// 直下の子要素をオーバーレイの上に配置
	// インラインで z-index を明示的に指定した子要素はそのまま尊重
	$css .= "{$selector} > *:not([style*='z-index']) { position: relative; z-index: 2; }\n";

	return $css;
}
