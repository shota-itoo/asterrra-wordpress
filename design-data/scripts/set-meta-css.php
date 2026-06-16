<?php
/**
 * Set swell-meta-css.css as post meta (swell_meta_css).
 * Usage: WP_POST_ID=<id> wp eval-file set-meta-css.php --allow-root
 */
$post_id = intval( getenv( 'WP_POST_ID' ) );
if ( ! $post_id ) {
	WP_CLI::error( 'WP_POST_ID env var required.' );
}
$base = '/var/www/html/wp-content/design-data/' . $post_id;
$file = $base . '/swell-meta-css.css';
if ( ! file_exists( $file ) ) {
	WP_CLI::error( "File not found: $file" );
}
$css = file_get_contents( $file );
update_post_meta( $post_id, 'swell_meta_css', $css );
WP_CLI::success( "Custom CSS set for post $post_id (" . strlen( $css ) . " bytes)." );
