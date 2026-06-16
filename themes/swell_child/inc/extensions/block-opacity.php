<?php
/**
 * Block Extension: 透過セクション
 * element opacity + background opacity（背景色rgba変換）
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * 透過属性を登録
 */
function flavor_ext_opacity_register_attrs($prefix, $options = []) {
	$attrs = [];
	$include_bg = $options['includeBackgroundOpacity'] ?? false;
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$key = ($prefix ? $prefix . 'ElementOpacity' : 'elementOpacity') . $device;
		$attrs[$key] = ['type' => 'string', 'default' => ''];
		if ($include_bg) {
			$bg_key = ($prefix ? $prefix . 'BackgroundOpacity' : 'backgroundOpacity') . $device;
			$attrs[$bg_key] = ['type' => 'string', 'default' => ''];
		}
	}
	return $attrs;
}

/**
 * 透過属性が設定されているか判定
 */
function flavor_ext_opacity_has($attrs, $prefix) {
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$key = $prefix ? $prefix . 'ElementOpacity' . $device : 'elementOpacity' . $device;
		if (isset($attrs[$key]) && $attrs[$key] !== '') return true;
		$bg_key = $prefix ? $prefix . 'BackgroundOpacity' . $device : 'backgroundOpacity' . $device;
		if (isset($attrs[$bg_key]) && $attrs[$bg_key] !== '') return true;
	}
	return false;
}

/**
 * 1デバイス分の透過CSS宣言を生成（element opacity のみ）
 */
function flavor_ext_opacity_declarations($attrs, $suffix = '') {
	$opacity = $attrs['elementOpacity' . $suffix] ?? '';
	if ($opacity === '') return '';
	$opacity_val = intval($opacity) / 100;
	return "opacity: {$opacity_val}";
}

/**
 * 透過CSS全体を生成（PC / Tablet / Mobile）
 * 背景透過は背景色をrgba変換して上書き
 */
function flavor_ext_opacity_generate_css($selector, $attrs) {
	$breakpoints = apply_filters('flavor_flavor_breakpoints', ['tablet' => 959, 'mobile' => 599]);
	$css = '';

	// Element opacity
	$css .= flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_opacity_declarations');

	// Background opacity
	$devices = ['' => null, 'Tablet' => $breakpoints['tablet'], 'Mobile' => $breakpoints['mobile']];
	foreach ($devices as $suffix => $max_width) {
		$bg_opacity = $attrs['backgroundOpacity' . $suffix] ?? '';
		if ($bg_opacity === '') continue;
		$bg_color = flavor_ub_resolve_bg_color($attrs);
		if ($bg_color === '') continue;
		$alpha = intval($bg_opacity) / 100;
		$rgba = flavor_ub_hex_to_rgba($bg_color, $alpha);
		if ($rgba === '') continue;
		if ($max_width === null) {
			$css .= "{$selector} { background-color: {$rgba} !important; }\n";
		} else {
			$css .= "@media (max-width: {$max_width}px) { {$selector} { background-color: {$rgba} !important; } }\n";
		}
	}

	return $css;
}
