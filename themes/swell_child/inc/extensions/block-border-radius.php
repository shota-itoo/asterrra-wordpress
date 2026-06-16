<?php
/**
 * Block Extension: 角丸セクション
 * border-radius（4コーナー独立）
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * 角丸属性を登録
 */
function flavor_ext_border_radius_register_attrs($prefix, $options = []) {
	$attrs = [];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$s = $prefix;
		$attrs[($s ? $s . 'CustomBorderRadius' : 'customBorderRadius') . $device] = ['type' => 'object', 'default' => []];
		$attrs[($s ? $s . 'CustomBorderRadiusUnit' : 'customBorderRadiusUnit') . $device] = ['type' => 'string', 'default' => 'px'];
		$attrs[($s ? $s . 'CustomBorderRadiusLinked' : 'customBorderRadiusLinked') . $device] = ['type' => 'boolean', 'default' => true];
	}
	return $attrs;
}

/**
 * 角丸属性が設定されているか判定
 */
function flavor_ext_border_radius_has($attrs, $prefix) {
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$key = $prefix ? $prefix . 'CustomBorderRadius' . $device : 'customBorderRadius' . $device;
		if (!isset($attrs[$key])) continue;
		$val = $attrs[$key];
		if (is_array($val) && !empty(array_filter($val, function($v) { return $v !== '' && $v !== null; }))) return true;
	}
	return false;
}

/**
 * 1デバイス分の角丸CSS宣言を生成
 */
function flavor_ext_border_radius_declarations($attrs, $suffix = '') {
	$declarations = [];
	$radius = $attrs['customBorderRadius' . $suffix] ?? [];
	$radius_unit = $attrs['customBorderRadiusUnit' . $suffix] ?? 'px';
	if (!empty($radius) && is_array($radius)) {
		$corners = [
			'topLeft' => 'border-top-left-radius',
			'topRight' => 'border-top-right-radius',
			'bottomRight' => 'border-bottom-right-radius',
			'bottomLeft' => 'border-bottom-left-radius',
		];
		$has_radius = false;
		foreach ($corners as $key => $prop) {
			$val = $radius[$key] ?? '';
			if ($val !== '') {
				$declarations[] = "{$prop}: {$val}{$radius_unit}";
				$has_radius = true;
			}
		}
		if ($has_radius) {
			$declarations[] = 'overflow: hidden';
		}
	}
	return implode('; ', $declarations);
}

/**
 * 角丸CSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_border_radius_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_border_radius_declarations');
}
