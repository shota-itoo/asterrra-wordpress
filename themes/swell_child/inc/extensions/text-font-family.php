<?php
/**
 * Text Block Font Family Extension
 * テキスト系ブロックにフォントファミリー設定を追加
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * プリセットフォント一覧
 */
function flavor_flavor_get_font_presets() {
	return apply_filters('flavor_flavor_font_presets', [
		// 日本語フォント
		'noto-sans-jp'     => '"Noto Sans JP", sans-serif',
		'noto-serif-jp'    => '"Noto Serif JP", serif',
		'yu-gothic'        => '"游ゴシック体", "Yu Gothic", YuGothic, sans-serif',
		'yu-mincho'        => '"游明朝体", "Yu Mincho", YuMincho, serif',
		'hiragino-kaku'    => '"Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif',
		'hiragino-mincho'  => '"Hiragino Mincho ProN", serif',
		'meiryo'           => 'Meiryo, "Meiryo UI", sans-serif',
		'biz-ud-gothic'    => '"BIZ UDGothic", sans-serif',
		'biz-ud-mincho'    => '"BIZ UDMincho", serif',
		'm-plus-1p'        => '"M PLUS 1p", sans-serif',
		'm-plus-rounded'   => '"M PLUS Rounded 1c", sans-serif',
		'zen-kaku-gothic'  => '"Zen Kaku Gothic New", sans-serif',
		'zen-old-mincho'   => '"Zen Old Mincho", serif',
		'kosugi-maru'      => '"Kosugi Maru", sans-serif',
		'sawarabi-mincho'  => '"Sawarabi Mincho", serif',
		'sawarabi-gothic'  => '"Sawarabi Gothic", sans-serif',
		// 欧文フォント
		'roboto'           => 'Roboto, sans-serif',
		'open-sans'        => '"Open Sans", sans-serif',
		'montserrat'       => 'Montserrat, sans-serif',
		'lato'             => 'Lato, sans-serif',
		'poppins'          => 'Poppins, sans-serif',
		'playfair-display' => '"Playfair Display", serif',
		'georgia'          => 'Georgia, serif',
	]);
}

/**
 * font-family属性値からCSS値を取得
 */
function flavor_flavor_get_font_family_css($value) {
	if (empty($value)) {
		return '';
	}

	// カスタム値
	if (strpos($value, 'custom:') === 0) {
		return substr($value, 7);
	}

	// プリセット値
	if (strpos($value, 'preset:') === 0) {
		$preset_key = substr($value, 7);
		$presets = flavor_flavor_get_font_presets();
		return isset($presets[$preset_key]) ? $presets[$preset_key] : '';
	}

	return '';
}

/**
 * ブロックエディタ用スクリプトの読み込み
 */
add_action('enqueue_block_editor_assets', function() {
	$js_path = get_stylesheet_directory() . '/assets/js/editor/extensions/text-font-family.js';
	if (file_exists($js_path)) {
		wp_enqueue_script(
			'flavor-flavor-text-font-family',
			get_stylesheet_directory_uri() . '/assets/js/editor/extensions/text-font-family.js',
			['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-i18n'],
			filemtime($js_path),
			true
		);

		// プリセット情報をJSに渡す
		$presets = flavor_flavor_get_font_presets();
		$preset_options = [];
		foreach ($presets as $key => $css) {
			$preset_options[] = [
				'value' => 'preset:' . $key,
				'label' => $key,
				'css'   => $css,
			];
		}
		wp_localize_script('flavor-flavor-text-font-family', 'flavorFlavorFontPresets', $preset_options);
	}
});

/**
 * テキスト系ブロックにフォントファミリー属性を登録
 */
add_filter('register_block_type_args', function($args, $name) {
	// 対象ブロック
	$allowed_blocks = ['core/paragraph', 'core/heading', 'core/list', 'core/quote'];

	if (!in_array($name, $allowed_blocks, true)) {
		return $args;
	}

	// カスタム属性を追加
	if (!isset($args['attributes'])) {
		$args['attributes'] = [];
	}

	$args['attributes']['customFontFamily'] = [
		'type'    => 'string',
		'default' => '',
	];

	return $args;
}, 10, 2);

/**
 * テキスト系ブロックにフォントファミリーのCSSを出力
 */
add_filter('render_block', function($block_content, $block) {
	// 対象ブロック
	$allowed_blocks = ['core/paragraph', 'core/heading', 'core/list', 'core/quote'];

	if (!in_array($block['blockName'] ?? '', $allowed_blocks, true)) {
		return $block_content;
	}

	$attrs = $block['attrs'] ?? [];

	// フォントファミリー設定を取得
	$font_family = $attrs['customFontFamily'] ?? '';

	// 設定がない場合は何もしない
	if (empty($font_family)) {
		return $block_content;
	}

	// CSS値を取得
	$font_css = flavor_flavor_get_font_family_css($font_family);

	if (empty($font_css)) {
		return $block_content;
	}

	// ユニークなクラス名を生成
	static $counter = 0;
	$counter++;
	$block_id = 'ff-font-' . $counter;

	// CSSを生成（styleタグ内なのでesc_attrは不要）
	$css = ".{$block_id} { font-family: " . $font_css . " !important; }";
	$style_tag = '<style>' . $css . '</style>';

	// ブロックタイプごとのタグパターン
	$tag_patterns = [
		'core/paragraph' => 'p',
		'core/heading'   => 'h[1-6]',
		'core/list'      => 'ul|ol',
		'core/quote'     => 'blockquote',
	];

	$tag = $tag_patterns[$block['blockName']] ?? 'div';

	// ブロックにクラスを追加
	$block_content = preg_replace(
		'/(<(?:' . $tag . ')[^>]*class=["\'])([^"\']*)(["\'])/',
		'$1$2 ' . $block_id . '$3',
		$block_content,
		1
	);

	// classがない場合は追加
	if (strpos($block_content, $block_id) === false) {
		$block_content = preg_replace(
			'/(<(?:' . $tag . '))([^>]*>)/',
			'$1 class="' . $block_id . '"$2',
			$block_content,
			1
		);
	}

	return $style_tag . $block_content;
}, 10, 2);
