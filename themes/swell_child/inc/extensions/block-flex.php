<?php
/**
 * Block Extension: Flexセクション
 * flex shorthand, flex-grow, flex-shrink, flex-basis, flex-wrap, order
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Flex属性を登録
 */
function flavor_ext_flex_register_attrs($prefix, $options = []) {
	$attrs = [];
	$include_wrap = $options['includeWrap'] ?? false;
	$props = ['FlexShorthand', 'FlexGrow', 'FlexShrink', 'FlexBasis', 'FlexBasisUnit', 'FlexOrder'];
	$defaults = [
		'FlexShorthand' => '', 'FlexGrow' => '', 'FlexShrink' => '',
		'FlexBasis' => '', 'FlexBasisUnit' => 'px', 'FlexOrder' => '',
	];
	if ($include_wrap) {
		$props[] = 'FlexWrap';
		$defaults['FlexWrap'] = '';
	}
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		foreach ($props as $prop) {
			$key = $prefix ? $prefix . $prop . $device : lcfirst($prop) . $device;
			$attrs[$key] = ['type' => 'string', 'default' => $defaults[$prop] ?? ''];
		}
	}
	return $attrs;
}

/**
 * Flex属性が設定されているか判定
 */
function flavor_ext_flex_has($attrs, $prefix) {
	$base_keys = ['FlexShorthand', 'FlexWrap', 'FlexGrow', 'FlexShrink', 'FlexBasis', 'FlexOrder'];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		foreach ($base_keys as $base) {
			$key = $prefix ? $prefix . $base . $device : lcfirst($base) . $device;
			if (isset($attrs[$key]) && $attrs[$key] !== '') return true;
		}
	}
	return false;
}

/**
 * 1デバイス分のFlexCSS宣言を生成
 */
function flavor_ext_flex_declarations($attrs, $suffix = '') {
	$declarations = [];
	$flex = $attrs['flexShorthand' . $suffix] ?? '';
	if ($flex !== '') $declarations[] = "flex: {$flex}";
	$wrap = $attrs['flexWrap' . $suffix] ?? '';
	if ($wrap !== '') $declarations[] = "flex-wrap: {$wrap}";
	$grow = $attrs['flexGrow' . $suffix] ?? '';
	if ($grow !== '') $declarations[] = "flex-grow: {$grow}";
	$shrink = $attrs['flexShrink' . $suffix] ?? '';
	if ($shrink !== '') $declarations[] = "flex-shrink: {$shrink}";
	$basis = $attrs['flexBasis' . $suffix] ?? '';
	$basis_unit = $attrs['flexBasisUnit' . $suffix] ?? 'px';
	if ($basis !== '') $declarations[] = "flex-basis: {$basis}{$basis_unit}";
	$order = $attrs['flexOrder' . $suffix] ?? '';
	if ($order !== '') $declarations[] = "order: {$order}";
	return implode('; ', $declarations);
}

/**
 * FlexCSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_flex_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_flex_declarations');
}
