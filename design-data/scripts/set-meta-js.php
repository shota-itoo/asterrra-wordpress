<?php
/**
 * Set swell-meta-js.js as post meta (swell_meta_js).
 * Usage: WP_POST_ID=<id> wp eval-file set-meta-js.php --allow-root
 */
$post_id = intval( getenv( 'WP_POST_ID' ) );
if ( ! $post_id ) {
	WP_CLI::error( 'WP_POST_ID env var required.' );
}
$base = '/var/www/html/wp-content/design-data/' . $post_id;
$file = $base . '/swell-meta-js.js';
if ( ! file_exists( $file ) ) {
	WP_CLI::error( "File not found: $file" );
}
$js = file_get_contents( $file );
update_post_meta( $post_id, 'swell_meta_js', $js );
WP_CLI::success( "Custom JS set for post $post_id (" . strlen( $js ) . " bytes)." );
