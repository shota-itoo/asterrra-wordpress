<?php
/**
 * Plugin Name: Dev Auto Login
 * Description: Development-only auto-login. Only works when WP_ENVIRONMENT_TYPE is 'local'.
 *
 * SECURITY: This plugin checks wp_get_environment_type() === 'local'.
 * In production environments, this plugin does nothing.
 * Additionally, the child theme's functions.php will forcefully delete this file
 * when the environment is not 'local'.
 * Safe to include in All-in-One WP Migration exports.
 *
 * Usage: Add ?dev_login=1 to any URL to auto-login as admin (user ID 1).
 * Deploy: .wp-env.json mappings ディレクトリに存在しなければ references/ からコピー
 */

if ( wp_get_environment_type() !== 'local' ) {
	return;
}

if ( isset( $_GET['dev_login'] ) ) {
	add_action( 'init', function () {
		if ( is_user_logged_in() ) {
			return;
		}
		wp_set_current_user( 1 );
		wp_set_auth_cookie( 1, true );
		wp_safe_redirect( remove_query_arg( 'dev_login' ) );
		exit;
	}, 1 );
}
