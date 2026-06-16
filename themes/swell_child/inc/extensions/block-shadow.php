<?php
/**
 * Block Extension: シャドウセクション
 * box-shadow / text-shadow プリセット / カスタム
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * シャドウ属性を登録
 */
function flavor_ext_shadow_register_attrs($prefix, $options = []) {
	$attrs = [];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$key = ($prefix ? $prefix . 'BoxShadow' : 'boxShadow') . $device;
		$attrs[$key] = ['type' => 'string', 'default' => ''];
		$key_text = ($prefix ? $prefix . 'TextShadow' : 'textShadow') . $device;
		$attrs[$key_text] = ['type' => 'string', 'default' => ''];
	}
	return $attrs;
}

/**
 * シャドウ属性が設定されているか判定
 */
function flavor_ext_shadow_has($attrs, $prefix) {
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$key = $prefix ? $prefix . 'BoxShadow' . $device : 'boxShadow' . $device;
		if (isset($attrs[$key]) && $attrs[$key] !== '') return true;
		$key_text = $prefix ? $prefix . 'TextShadow' . $device : 'textShadow' . $device;
		if (isset($attrs[$key_text]) && $attrs[$key_text] !== '') return true;
	}
	return false;
}

/**
 * 1デバイス分のシャドウCSS宣言を生成
 */
function flavor_ext_shadow_declarations($attrs, $suffix = '') {
	$declarations = [];

	$shadow = $attrs['boxShadow' . $suffix] ?? '';
	if ($shadow !== '') {
		$css_shadow = flavor_ub_get_shadow_css($shadow);
		if ($css_shadow !== '') {
			$declarations[] = "box-shadow: {$css_shadow}";
		}
	}

	$text_shadow = $attrs['textShadow' . $suffix] ?? '';
	if ($text_shadow !== '') {
		$css_text_shadow = flavor_ub_get_text_shadow_css($text_shadow);
		if ($css_text_shadow !== '') {
			$declarations[] = "text-shadow: {$css_text_shadow}";
		}
	}

	return implode('; ', $declarations);
}

/**
 * シャドウCSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_shadow_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_shadow_declarations');
}
