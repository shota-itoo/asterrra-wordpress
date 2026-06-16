<?php
/**
 * Block Extension: ボーダーセクション
 * border-width, border-style, border-color（4辺独立対応）
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * ボーダー属性を登録
 */
function flavor_ext_border_register_attrs($prefix, $options = []) {
	$attrs = [];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$s = $prefix;
		$attrs[($s ? $s . 'CustomBorderWidth' : 'customBorderWidth') . $device] = ['type' => 'object', 'default' => []];
		$attrs[($s ? $s . 'CustomBorderWidthLinked' : 'customBorderWidthLinked') . $device] = ['type' => 'boolean', 'default' => true];
		$attrs[($s ? $s . 'CustomBorderStyle' : 'customBorderStyle') . $device] = ['type' => 'string', 'default' => ''];
		$attrs[($s ? $s . 'CustomBorderStyleSides' : 'customBorderStyleSides') . $device] = ['type' => 'object', 'default' => []];
		$attrs[($s ? $s . 'CustomBorderStyleLinked' : 'customBorderStyleLinked') . $device] = ['type' => 'boolean', 'default' => true];
		$attrs[($s ? $s . 'CustomBorderColor' : 'customBorderColor') . $device] = ['type' => 'string', 'default' => ''];
		$attrs[($s ? $s . 'CustomBorderColorSides' : 'customBorderColorSides') . $device] = ['type' => 'object', 'default' => []];
		$attrs[($s ? $s . 'CustomBorderColorLinked' : 'customBorderColorLinked') . $device] = ['type' => 'boolean', 'default' => true];
	}
	return $attrs;
}

/**
 * ボーダー属性が設定されているか判定
 */
function flavor_ext_border_has($attrs, $prefix) {
	$base_keys = ['CustomBorderWidth', 'CustomBorderStyle', 'CustomBorderColor', 'CustomBorderStyleSides', 'CustomBorderColorSides'];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		foreach ($base_keys as $base) {
			$key = $prefix ? $prefix . $base . $device : lcfirst($base) . $device;
			if (!isset($attrs[$key])) continue;
			$val = $attrs[$key];
			if (is_string($val) && $val !== '') return true;
			if (is_array($val) && !empty(array_filter($val, function($v) { return $v !== '' && $v !== null; }))) return true;
		}
	}
	return false;
}

/**
 * 1デバイス分のボーダーCSS宣言を生成
 */
function flavor_ext_border_declarations($attrs, $suffix = '') {
	$declarations = [];
	$border_width = $attrs['customBorderWidth' . $suffix] ?? [];
	$border_style = $attrs['customBorderStyle' . $suffix] ?? '';
	$border_color = $attrs['customBorderColor' . $suffix] ?? '';
	$style_sides  = $attrs['customBorderStyleSides' . $suffix] ?? [];
	$style_linked = $attrs['customBorderStyleLinked' . $suffix] ?? true;
	$color_sides  = $attrs['customBorderColorSides' . $suffix] ?? [];
	$color_linked = $attrs['customBorderColorLinked' . $suffix] ?? true;

	if (!empty($border_width) && is_array($border_width)) {
		$sides = ['top' => 'border-top', 'right' => 'border-right', 'bottom' => 'border-bottom', 'left' => 'border-left'];
		foreach ($sides as $key => $prop) {
			$val = $border_width[$key] ?? '';
			if ($val !== '') {
				$style_val = (!$style_linked && !empty($style_sides[$key])) ? $style_sides[$key] : ($border_style !== '' ? $border_style : 'solid');
				$color_val = (!$color_linked && !empty($color_sides[$key])) ? $color_sides[$key] : ($border_color !== '' ? $border_color : '#000');
				$declarations[] = "{$prop}: {$val}px {$style_val} {$color_val}";
			}
		}
	}

	return implode('; ', $declarations);
}

/**
 * ボーダーCSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_border_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_border_declarations');
}
