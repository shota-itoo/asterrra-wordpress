<?php
/**
 * Block Extension: スペーシングセクション
 * gap, padding, margin（完全版） + margin only（簡易版）
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * スペーシング属性を登録
 */
function flavor_ext_spacing_register_attrs($prefix, $options = []) {
	$attrs = [];
	$include_gap     = $options['gap'] ?? false;
	$include_padding = $options['padding'] ?? false;
	$include_margin  = $options['margin'] ?? false;

	foreach (['', 'Tablet', 'Mobile'] as $device) {
		if ($include_gap) {
			$gap_prefix = $prefix ? $prefix . 'SpacingGap' : 'spacingGap';
			$attrs[$gap_prefix . $device] = ['type' => 'string', 'default' => ''];
			$attrs[$gap_prefix . 'Unit' . $device] = ['type' => 'string', 'default' => 'preset'];
			$attrs[$gap_prefix . 'Row' . $device] = ['type' => 'string', 'default' => ''];
			$attrs[$gap_prefix . 'RowUnit' . $device] = ['type' => 'string', 'default' => 'preset'];
			$attrs[$gap_prefix . 'Column' . $device] = ['type' => 'string', 'default' => ''];
			$attrs[$gap_prefix . 'ColumnUnit' . $device] = ['type' => 'string', 'default' => 'preset'];
			$attrs[$gap_prefix . 'Linked' . $device] = ['type' => 'boolean', 'default' => true];
		}
		if ($include_padding) {
			$pad_prefix = $prefix ? $prefix . 'SpacingPadding' : 'spacingPadding';
			$attrs[$pad_prefix . $device] = ['type' => 'object', 'default' => []];
			$attrs[$pad_prefix . 'Unit' . $device] = ['type' => 'string', 'default' => 'preset'];
			$attrs[$pad_prefix . 'Linked' . $device] = ['type' => 'boolean', 'default' => true];
		}
		if ($include_margin) {
			$margin_prefix = $prefix ? $prefix . 'SpacingMargin' : 'spacingMargin';
			$attrs[$margin_prefix . $device] = ['type' => 'object', 'default' => []];
			$attrs[$margin_prefix . 'Unit' . $device] = ['type' => 'string', 'default' => 'preset'];
			$attrs[$margin_prefix . 'Linked' . $device] = ['type' => 'boolean', 'default' => true];
		}
	}
	return $attrs;
}

/**
 * スペーシング属性が設定されているか判定
 */
function flavor_ext_spacing_has($attrs, $prefix) {
	$base_keys = ['SpacingGap', 'SpacingGapRow', 'SpacingGapColumn', 'SpacingPadding', 'SpacingMargin'];
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
 * 1デバイス分のスペーシングCSS宣言を生成（gap + padding + margin）
 */
function flavor_ext_spacing_declarations($attrs, $suffix = '') {
	$declarations = [];

	// Gap
	$gap_row_val  = $attrs['spacingGapRow' . $suffix] ?? '';
	$gap_row_unit = $attrs['spacingGapRowUnit' . $suffix] ?? 'preset';
	$gap_col_val  = $attrs['spacingGapColumn' . $suffix] ?? '';
	$gap_col_unit = $attrs['spacingGapColumnUnit' . $suffix] ?? 'preset';

	if ($gap_row_val !== '' || $gap_col_val !== '') {
		if ($gap_row_val !== '') {
			$css_val = flavor_flavor_get_spacing_css_value($gap_row_val, $gap_row_unit, $gap_row_unit === 'preset' ? '' : $gap_row_unit);
			if ($css_val !== '') $declarations[] = "row-gap: {$css_val}";
		}
		if ($gap_col_val !== '') {
			$css_val = flavor_flavor_get_spacing_css_value($gap_col_val, $gap_col_unit, $gap_col_unit === 'preset' ? '' : $gap_col_unit);
			if ($css_val !== '') $declarations[] = "column-gap: {$css_val}";
		}
	} else {
		$gap_val  = $attrs['spacingGap' . $suffix] ?? '';
		$gap_unit = $attrs['spacingGapUnit' . $suffix] ?? 'preset';
		if ($gap_val !== '') {
			$css_val = flavor_flavor_get_spacing_css_value($gap_val, $gap_unit, $gap_unit === 'preset' ? '' : $gap_unit);
			if ($css_val !== '') $declarations[] = "gap: {$css_val}";
		}
	}

	// Padding
	$padding     = $attrs['spacingPadding' . $suffix] ?? [];
	$padding_unit = $attrs['spacingPaddingUnit' . $suffix] ?? 'preset';
	if (!empty($padding) && is_array($padding)) {
		$padding_css = flavor_flavor_get_box_spacing_css($padding, $padding_unit, $padding_unit === 'preset' ? '' : $padding_unit, 'padding');
		if ($padding_css !== '') $declarations[] = $padding_css;
	}

	// Margin
	$margin      = $attrs['spacingMargin' . $suffix] ?? [];
	$margin_unit = $attrs['spacingMarginUnit' . $suffix] ?? 'preset';
	if (!empty($margin) && is_array($margin)) {
		$margin_css = flavor_flavor_get_box_spacing_css($margin, $margin_unit, $margin_unit === 'preset' ? '' : $margin_unit, 'margin');
		if ($margin_css !== '') $declarations[] = $margin_css;
	}

	return implode('; ', $declarations);
}

/**
 * スペーシングCSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_spacing_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_spacing_declarations');
}

/**
 * マージンのみCSS宣言を生成（1デバイス分）
 */
function flavor_ext_margin_declarations($attrs, $suffix = '') {
	$declarations = [];
	$margin = $attrs['spacingMargin' . $suffix] ?? [];
	$margin_unit = $attrs['spacingMarginUnit' . $suffix] ?? 'preset';
	if (!empty($margin) && is_array($margin)) {
		$margin_css = flavor_flavor_get_box_spacing_css($margin, $margin_unit, $margin_unit === 'preset' ? '' : $margin_unit, 'margin');
		if ($margin_css !== '') $declarations[] = $margin_css;
	}
	return implode('; ', $declarations);
}

/**
 * マージンのみCSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_margin_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_margin_declarations');
}

/**
 * マージン属性が設定されているか判定
 */
function flavor_ext_margin_has($attrs, $prefix) {
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$key = $prefix ? $prefix . 'SpacingMargin' . $device : 'spacingMargin' . $device;
		if (!isset($attrs[$key])) continue;
		$val = $attrs[$key];
		if (is_array($val) && !empty(array_filter($val, function($v) { return $v !== '' && $v !== null; }))) return true;
	}
	return false;
}
