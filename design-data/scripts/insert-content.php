<?php
/**
 * Insert page-content.html into WordPress post.
 * Usage: WP_POST_ID=<id> wp eval-file insert-content.php --allow-root
 */
$post_id = intval( getenv( 'WP_POST_ID' ) );
if ( ! $post_id ) {
	WP_CLI::error( 'WP_POST_ID env var required.' );
}
$base = '/var/www/html/wp-content/design-data/' . $post_id;
$file = $base . '/page-content.html';
if ( ! file_exists( $file ) ) {
	WP_CLI::error( "File not found: $file" );
}
$content = file_get_contents( $file );
// wp_update_post() は内部で wp_unslash() するため、スラッシュ無しで渡すと
// ブロック属性JSONのエスケープ（\" や \n 等）が剥がれて壊れる。
// wp_slash() してから渡すことで round-trip し、原文のまま保存される。
$result  = wp_update_post( wp_slash( array(
	'ID'           => $post_id,
	'post_content' => $content,
) ), true );
if ( is_wp_error( $result ) ) {
	WP_CLI::error( $result->get_error_message() );
}
WP_CLI::success( "Content inserted into post $post_id." );
