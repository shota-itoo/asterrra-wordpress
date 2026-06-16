<?php
/**
 * Block Extension: Backdrop Filterセクション
 * backdrop-filter プリセット / カスタム
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * プリセット値 or custom: → CSS backdrop-filter値
 */
function flavor_ub_get_backdrop_filter_css($value) {
	if (empty($value)) return '';
	if (strpos($value, 'custom:') === 0) {
		return substr($value, 7);
	}
	$presets = [
		'blur-s'  => 'blur(4px)',
		'blur-m'  => 'blur(8px)',
		'blur-l'  => 'blur(16px)',
		'blur-xl' => 'blur(24px)',
	];
	return $presets[$value] ?? '';
}

/**
 * Backdrop Filter属性を登録
 */
function flavor_ext_backdrop_filter_register_attrs($prefix, $options = []) {
	$attrs = [];
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$key = ($prefix ? $prefix . 'BackdropFilter' : 'backdropFilter') . $device;
		$attrs[$key] = ['type' => 'string', 'default' => ''];
	}
	return $attrs;
}

/**
 * Backdrop Filter属性が設定されているか判定
 */
function flavor_ext_backdrop_filter_has($attrs, $prefix) {
	foreach (['', 'Tablet', 'Mobile'] as $device) {
		$key = $prefix ? $prefix . 'BackdropFilter' . $device : 'backdropFilter' . $device;
		if (isset($attrs[$key]) && $attrs[$key] !== '') return true;
	}
	return false;
}

/**
 * 1デバイス分のBackdrop Filter CSS宣言を生成
 */
function flavor_ext_backdrop_filter_declarations($attrs, $suffix = '') {
	$declarations = [];

	$value = $attrs['backdropFilter' . $suffix] ?? '';
	if ($value !== '') {
		$css_value = flavor_ub_get_backdrop_filter_css($value);
		if ($css_value !== '') {
			$declarations[] = "-webkit-backdrop-filter: {$css_value}";
			$declarations[] = "backdrop-filter: {$css_value}";
		}
	}

	return implode('; ', $declarations);
}

/**
 * Backdrop Filter CSS全体を生成（PC / Tablet / Mobile）
 */
function flavor_ext_backdrop_filter_generate_css($selector, $attrs) {
	return flavor_ext_generate_responsive_css($selector, $attrs, 'flavor_ext_backdrop_filter_declarations');
}
