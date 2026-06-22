<?php

/* 子テーマのfunctions.phpは、親テーマのfunctions.phpより先に読み込まれることに注意してください。 */

/**
 * 本番環境での開発用mu-plugin自動削除（セキュリティ防御）
 * dev-auto-login.php はローカル開発専用。本番に移行された場合はファイルごと削除する。
 */
if ( wp_get_environment_type() !== 'local' ) {
	$mu_file = WPMU_PLUGIN_DIR . '/dev-auto-login.php';
	if ( file_exists( $mu_file ) ) {
		unlink( $mu_file );
	}
}

/**
 * カスタム機能ファイルの読み込み
 */
require_once get_stylesheet_directory() . '/inc/block-custom-common.php';
require_once get_stylesheet_directory() . '/inc/extensions/block-link-common.php';
require_once get_stylesheet_directory() . '/inc/extensions/heading-responsive-font.php';
require_once get_stylesheet_directory() . '/inc/extensions/responsive-text-align.php';
require_once get_stylesheet_directory() . '/inc/extensions/text-font-family.php';
require_once get_stylesheet_directory() . '/inc/extensions/block-animation.php';
require_once get_stylesheet_directory() . '/inc/blocks/universal-block.php';
require_once get_stylesheet_directory() . '/inc/blocks/news-list.php';
require_once get_stylesheet_directory() . '/inc/extensions/block-device-visibility.php';
require_once get_stylesheet_directory() . '/inc/extensions/index.php';


/**
 * 親テーマのfunctions.phpのあとで読み込みたいコードはこの中に。
 */
// add_filter('after_setup_theme', function(){
// }, 11);


/**
 * 子テーマでのファイルの読み込み
 */
add_action('wp_enqueue_scripts', function() {

	$timestamp = date( 'Ymdgis', filemtime( get_stylesheet_directory() . '/style.css' ) );
	wp_enqueue_style( 'child_style', get_stylesheet_directory_uri() .'/style.css', [], $timestamp );

	/* その他の読み込みファイルはこの下に記述 */

	/**
	 * Google Fonts 読み込み（design-to-wp-swell / post_id:7 トップページ用に追加）
	 * - Noto Serif JP: 見出し（明朝） / Noto Sans JP: 本文（ゴシック）
	 * - Figma 変数 font family/Font 2=Noto Serif JP, Font 1=Noto Sans JP に対応
	 */
	wp_enqueue_style(
		'asterrra-google-fonts',
		'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;500;600;700&display=swap',
		[],
		null
	);

}, 11);

/**
 * Google Fonts 用 preconnect（design-to-wp-swell で追加・表示高速化）
 */
add_filter( 'wp_resource_hints', function( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = [ 'href' => 'https://fonts.googleapis.com' ];
		$urls[] = [ 'href' => 'https://fonts.gstatic.com', 'crossorigin' ];
	}
	return $urls;
}, 10, 2 );

/**
 * パンくずリスト用ショートコード（design-to-wp-swell / お知らせ一覧 post_id:28 用に追加）
 * SWELL の parts/breadcrumb.php（<div id="breadcrumb" class="p-breadcrumb">…）を
 * その場で出力させ、ob で取得して返す薄いラッパー。
 * デザイン上「FV直下・コンテンツ幅」にパンくずを置くため、本文内ブロックとして埋め込む。
 * [asterrra_breadcrumb]
 */
add_shortcode( 'asterrra_breadcrumb', function() {
	if ( ! class_exists( 'SWELL_Theme' ) ) {
		return '';
	}
	ob_start();
	// parts/breadcrumb.php はトップページ以外で「ホーム > （現在ページ）」を echo する
	SWELL_Theme::get_parts( 'parts/breadcrumb' );
	return ob_get_clean();
} );

/**
 * 【QA: h1重複の解消】固定ページ(is_page)では SWELL のページタイトル(.c-pageTitle)を
 * <h1> ではなく <p> で出力する。
 *
 * 当サイトの固定ページ(about/service/company/news/contact)は FV(ファーストビュー)の見出しが
 * 表示h1を担っており、SWELLが別途出力する .c-pageTitle は display:none の「隠れ重複h1」になっていた
 * （1ページにh1が2つ＝SEO上の問題）。
 * - 投稿(single)はタイトルが .c-postTitle__ttl で別出力のため本関数は無関係 → 影響なし。
 * - アーカイブ(category等)は .c-pageTitle が表示h1のため is_page()=false で <h1> を維持。
 * swl_parts__page_title は SWELL の pluggable 関数（親は ! function_exists でガード）。
 * 子テーマは親より先に読み込まれるため、ここで定義すると親側はスキップされ本定義が使われる。
 */
if ( ! function_exists( 'swl_parts__page_title' ) ) {
	function swl_parts__page_title( $args ) {
		$title     = $args['title'] ?? '';
		$subtitle  = $args['subtitle'] ?? '';
		$has_inner = $args['has_inner'] ?? false;
		$nowrap    = $args['nowrap'] ?? false;

		if ( $subtitle ) {
			$title .= '<small class="c-pageTitle__subTitle u-fz-14">– ' . $subtitle . ' –</small>';
		}
		if ( $nowrap ) {
			echo wp_kses( $title, \SWELL_Theme::$allowed_text_html );
			return;
		}
		$title = wp_kses( $title, \SWELL_Theme::$allowed_text_html );

		$title_style = '';
		if ( $has_inner ) {
			$title       = '<span class="c-pageTitle__inner">' . $title . '</span>';
			$title_style = is_archive() ? \SWELL_Theme::get_setting( 'archive_title_style' ) : \SWELL_Theme::get_setting( 'page_title_style' );
		}

		// 固定ページのみ h1→p（重複h1回避）。アーカイブ等は h1 維持。
		$tag = is_page() ? 'p' : 'h1';

		if ( $title_style ) {
			echo '<' . $tag . ' class="c-pageTitle" data-style="' . esc_attr( $title_style ) . '">' . $title . '</' . $tag . '>'; // phpcs:ignore
		} else {
			echo '<' . $tag . ' class="c-pageTitle">' . $title . '</' . $tag . '>'; // phpcs:ignore
		}
	}
}
