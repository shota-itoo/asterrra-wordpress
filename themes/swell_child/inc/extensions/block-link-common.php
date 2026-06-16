<?php
/**
 * Block Link Common
 * ブロックリンク機能の共通処理
 * コアブロック + Universal Block で共有
 */

if (!defined('ABSPATH')) {
	exit;
}


/**
 * ブロックリンクのURLを構築
 *
 * @param array $attrs ブロック属性
 * @return string 構築済みURL
 */
function flavor_block_link_build_url($attrs) {
	$link_url = $attrs['blockLinkUrl'] ?? '';
	$post_id  = intval($attrs['blockLinkPostId'] ?? 0);

	if ($post_id > 0) {
		$permalink = get_permalink($post_id);
		if ($permalink) {
			$link_url = wp_make_link_relative($permalink);
		}
	}

	$link_url .= $attrs['blockLinkQuery'] ?? '';
	$link_url .= $attrs['blockLinkHash'] ?? '';

	return $link_url;
}


/**
 * ブロックリンクのdata属性文字列を構築
 *
 * @param string $link_url リンクURL
 * @param array  $attrs    ブロック属性
 * @return string data属性文字列
 */
function flavor_block_link_build_data_attrs($link_url, $attrs) {
	$link_target = $attrs['blockLinkTarget'] ?? '_self';
	$link_rel    = $attrs['blockLinkRel'] ?? '';

	if ('_blank' === $link_target && empty($link_rel)) {
		$link_rel = 'noopener noreferrer';
	}

	$data_attrs = sprintf(
		'data-block-link="%s" data-block-link-target="%s"',
		esc_attr($link_url),
		esc_attr($link_target)
	);
	if (!empty($link_rel)) {
		$data_attrs .= sprintf(' data-block-link-rel="%s"', esc_attr($link_rel));
	}

	return $data_attrs;
}


/**
 * HTMLの最初のタグにdata属性とhas-block-linkクラスを注入
 *
 * @param string $block_content ブロックHTML
 * @param string $data_attrs    data属性文字列
 * @return string 変更後のHTML
 */
function flavor_block_link_inject_attrs($block_content, $data_attrs) {
	// 1. data属性を最初のタグの閉じ > の前に挿入
	$block_content = preg_replace(
		'/(<(?:div|section|figure|aside|p)[^>]*)(>)/i',
		'$1 ' . $data_attrs . '$2',
		$block_content,
		1
	);

	// 2. クラスにhas-block-linkを追加
	if (preg_match('/<(?:div|section|figure|aside|p)[^>]*class="([^"]*)"/i', $block_content)) {
		$block_content = preg_replace(
			'/(<(?:div|section|figure|aside|p)[^>]*class=")([^"]*)(")/i',
			'$1$2 has-block-link$3',
			$block_content,
			1
		);
	} elseif (preg_match("/<(?:div|section|figure|aside|p)[^>]*class='([^']*)'/i", $block_content)) {
		$block_content = preg_replace(
			"/(<(?:div|section|figure|aside|p)[^>]*class=')([^']*)(')/i",
			'$1$2 has-block-link$3',
			$block_content,
			1
		);
	} else {
		$block_content = preg_replace(
			'/(<(?:div|section|figure|aside|p))(\s)/i',
			'$1 class="has-block-link"$2',
			$block_content,
			1
		);
	}

	return $block_content;
}


// ──── 対象ブロック向けブロックリンク ────

/**
 * 対象ブロック一覧
 */
function flavor_block_link_get_allowed_blocks() {
	return ['core/columns', 'core/column', 'core/cover', 'core/media-text', 'core/paragraph', 'flavor/universal-block'];
}

/**
 * 対象ブロックにリンク属性を登録
 */
add_filter('register_block_type_args', function($args, $name) {
	if (!in_array($name, flavor_block_link_get_allowed_blocks(), true)) {
		return $args;
	}

	if (!isset($args['attributes'])) {
		$args['attributes'] = [];
	}

	$args['attributes']['blockLinkUrl'] = [
		'type'    => 'string',
		'default' => '',
	];
	$args['attributes']['blockLinkTarget'] = [
		'type'    => 'string',
		'default' => '_self',
	];
	$args['attributes']['blockLinkRel'] = [
		'type'    => 'string',
		'default' => '',
	];
	$args['attributes']['blockLinkPostId'] = [
		'type'    => 'integer',
		'default' => 0,
	];
	$args['attributes']['blockLinkQuery'] = [
		'type'    => 'string',
		'default' => '',
	];
	$args['attributes']['blockLinkHash'] = [
		'type'    => 'string',
		'default' => '',
	];

	return $args;
}, 10, 2);


/**
 * 対象ブロックにリンク用data属性を出力
 */
add_filter('render_block', function($block_content, $block) {
	if (!in_array($block['blockName'] ?? '', flavor_block_link_get_allowed_blocks(), true)) {
		return $block_content;
	}

	$attrs = $block['attrs'] ?? [];
	$link_url = flavor_block_link_build_url($attrs);

	if (empty($link_url)) {
		return $block_content;
	}

	// save関数でdata属性が出力済みの場合（deprecated対応）はURLのみ動的に更新
	if (strpos($block_content, 'data-block-link=') !== false) {
		$post_id = intval($attrs['blockLinkPostId'] ?? 0);
		if ($post_id > 0) {
			$block_content = preg_replace(
				'/data-block-link="[^"]*"/',
				'data-block-link="' . esc_attr($link_url) . '"',
				$block_content,
				1
			);
		}
		return $block_content;
	}

	// data属性を新規注入
	$data_attrs = flavor_block_link_build_data_attrs($link_url, $attrs);
	return flavor_block_link_inject_attrs($block_content, $data_attrs);
}, 10, 2);


// ──── JS / CSS 読み込み ────

/**
 * ブロックエディタ用スクリプトの読み込み（コアブロック向け）
 */
add_action('enqueue_block_editor_assets', function() {
	$js_path = get_stylesheet_directory() . '/assets/js/editor/extensions/block-link-editor.js';
	if (file_exists($js_path)) {
		wp_enqueue_script(
			'flavor-block-link-editor',
			get_stylesheet_directory_uri() . '/assets/js/editor/extensions/block-link-editor.js',
			['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-i18n', 'wp-api-fetch'],
			filemtime($js_path),
			true
		);
	}
});

/**
 * フロントエンド用スクリプトの読み込み
 */
add_action('wp_enqueue_scripts', function() {
	$js_path = get_stylesheet_directory() . '/assets/js/frontend/block-link-frontend.js';
	if (file_exists($js_path)) {
		wp_enqueue_script(
			'flavor-block-link-frontend',
			get_stylesheet_directory_uri() . '/assets/js/frontend/block-link-frontend.js',
			[],
			filemtime($js_path),
			true
		);
	}
}, 11);
