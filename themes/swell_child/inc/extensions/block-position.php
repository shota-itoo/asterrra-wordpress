<?php
/**
 * Block Extension: ポジションセクション
 * position, top, right, bottom, left, z-index
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * ポジション属性を登録
 */
function flavor_ext_position_register_attrs($prefix, $options = []) {
	$attrs = [];
	$props = [
		'PositionType', 'PositionTop', 'PositionTopUnit',
		'PositionRight', 'PositionRightUnit', 'PositionBottom', 'PositionBottomUnit',
		'PositionLeft', 'PositionLeftUnit', 'PositionZIndex', 'PositionTransform',
	];
	$defaults = [
		'PositionType' => '', 'PositionTop' => '', 'PositionTopUnit' => 'px',
		'PositionRight' => '', 'PositionRightUnit' => 'px',
		'PositionBottom' => '', 'PositionBottomUnit' => 'px',
		'PositionLeft' => '', 'PositionLeftUnit' => 'px',
		'PositionZIndex' => '', 'PositionTransform' => '',
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
 * ポジション属性が設定されているか判定
 */
function flavor_ext_position_has($attrs, $prefix) {
	$base_keys = ['PositionType', 'PositionTop', 'PositionRight', 'PositionBottom', 'PositionLeft', 'PositionZIndex', 'PositionTransform'];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		foreach ($base_keys as $base) {
			$key = $prefix ? $prefix . $base . $device : lcfirst($base) . $device;
			if (isset($attrs[$key]) && $attrs[$key] !== '') return true;
		}
	}
	return false;
}

/**
 * 1デバイス分のポジションCSS宣言を生成
 */
function flavor_ext_position_declarations($attrs, $suffix = '') {
	$declarations = [];
	$size_keywords = ['auto', 'inherit', 'initial', 'unset'];

	$type = $attrs['positionType' . $suffix] ?? '';
	if ($type !== '') {
		$declarations[] = "position: {$type}";
	}

	$offsets = [
		'positionTop'    => 'top',
		'positionRight'  => 'right',
		'positionBottom' => 'bottom',
		'positionLeft'   => 'left',
	];
	foreach ($offsets as $attr_prefix => $css_prop) {
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

	$zindex = $attrs['positionZIndex' . $suffix] ?? '';
	if ($zindex !== '') {
		$declarations[] = "z-index: {$zindex}";
	}

	$transform = $attrs['positionTransform' . $suffix] ?? '';
	if ($transform !== '') {
		$declarations[] = "transform: {$transform}";
	}

	return implode('; ', $declarations);
}

/**
 * ポジションCSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_position_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_position_declarations');
}
