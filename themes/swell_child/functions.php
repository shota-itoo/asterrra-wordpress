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
require_once get_stylesheet_directory() . '/inc/extensions/text-font-family.php';
require_once get_stylesheet_directory() . '/inc/extensions/block-animation.php';
require_once get_stylesheet_directory() . '/inc/blocks/universal-block.php';
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

}, 11);
