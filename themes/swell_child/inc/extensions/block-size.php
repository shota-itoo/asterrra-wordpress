<?php
/**
 * Block Extension: サイズセクション
 * width, min-width, max-width, height, min-height, max-height, aspect-ratio, overflow
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * サイズ属性を登録
 */
function flavor_ext_size_register_attrs($prefix, $options = []) {
	$attrs = [];
	$props = ['SizeWidth', 'SizeWidthUnit', 'SizeMinWidth', 'SizeMinWidthUnit', 'SizeMaxWidth', 'SizeMaxWidthUnit', 'SizeHeight', 'SizeHeightUnit', 'SizeMinHeight', 'SizeMinHeightUnit', 'SizeMaxHeight', 'SizeMaxHeightUnit', 'SizeAspectRatio', 'LayoutOverflow'];
	$defaults = [
		'SizeWidth' => '', 'SizeWidthUnit' => 'px', 'SizeMinWidth' => '', 'SizeMinWidthUnit' => 'px',
		'SizeMaxWidth' => '', 'SizeMaxWidthUnit' => 'px', 'SizeHeight' => '', 'SizeHeightUnit' => 'px',
		'SizeMinHeight' => '', 'SizeMinHeightUnit' => 'px', 'SizeMaxHeight' => '', 'SizeMaxHeightUnit' => 'px',
		'SizeAspectRatio' => '', 'LayoutOverflow' => '',
	];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		foreach ($props as $prop) {
			$key = $prefix ? $prefix . $prop . $device : lcfirst($prop) . $device;
			$attrs[$key] = ['type' => 'string', 'default' => $defaults[$prop] ?? ''];
		}
	}
	return $attrs;
}

/**
 * サイズ属性が設定されているか判定
 */
function flavor_ext_size_has($attrs, $prefix) {
	$base_keys = [
		'SizeWidth', 'SizeMinWidth', 'SizeMaxWidth',
		'SizeHeight', 'SizeMinHeight', 'SizeMaxHeight',
		'SizeAspectRatio', 'LayoutOverflow',
	];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		foreach ($base_keys as $base) {
			$key = $prefix ? $prefix . $base . $device : lcfirst($base) . $device;
			if (isset($attrs[$key]) && $attrs[$key] !== '') return true;
		}
	}
	return false;
}

/**
 * 1デバイス分のサイズCSS宣言を生成
 */
function flavor_ext_size_declarations($attrs, $suffix = '') {
	$declarations = [];
	$properties = [
		'sizeWidth'     => 'width',
		'sizeMinWidth'  => 'min-width',
		'sizeMaxWidth'  => 'max-width',
		'sizeHeight'    => 'height',
		'sizeMinHeight' => 'min-height',
		'sizeMaxHeight' => 'max-height',
	];
	$size_keywords = ['auto', 'fit-content', 'max-content', 'min-content'];
	foreach ($properties as $attr_prefix => $css_prop) {
		$val  = $attrs[$attr_prefix . $suffix] ?? '';
		$unit = $attrs[$attr_prefix . 'Unit' . $suffix] ?? 'px';
		if ($val !== '') {
			if (in_array($val, $size_keywords, true)) {
				$declarations[] = "{$css_prop}: {$val}";
			} else {
				$declarations[] = "{$css_prop}: {$val}{$unit}";
			}
		}
	}
	$ar = $attrs['sizeAspectRatio' . $suffix] ?? '';
	if ($ar !== '' && preg_match('/^[\d.]+\/[\d.]+$/', $ar)) {
		$declarations[] = "aspect-ratio: {$ar}";
	}
	$ov = $attrs['layoutOverflow' . $suffix] ?? '';
	if ($ov !== '') {
		$declarations[] = "overflow: {$ov}";
	}
	return implode('; ', $declarations);
}

/**
 * サイズCSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_size_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_size_declarations');
}
