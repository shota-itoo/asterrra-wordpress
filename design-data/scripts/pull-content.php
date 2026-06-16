<?php
/**
 * Pull WordPress post content + SWELL meta into design-data/{post_id}/.
 * DB → ローカル（編集前の同期用）。insert-content.php / set-meta-*.php の逆方向。
 *
 * 本番反映やバージョン差で DB が「正」になるため、既存ページを修正する前に
 * これを実行して design-data/{post_id}/ を DB の最新状態に同期してから編集する。
 *
 * Usage: WP_POST_ID=<id> wp eval-file pull-content.php --allow-root
 */
$post_id = intval( getenv( 'WP_POST_ID' ) );
if ( ! $post_id ) {
	WP_CLI::error( 'WP_POST_ID env var required.' );
}

$post = get_post( $post_id );
if ( ! $post ) {
	WP_CLI::error( "Post not found: $post_id" );
}

$base = '/var/www/html/wp-content/design-data/' . $post_id;
if ( ! is_dir( $base ) ) {
	mkdir( $base, 0775, true );
}

// 1. post_content → page-content.html（本文は常に書き出す）
file_put_contents( $base . '/page-content.html', $post->post_content );
WP_CLI::log( 'page-content.html : ' . strlen( $post->post_content ) . ' bytes' );

// 2. swell_meta_css → swell-meta-css.css（値があるときのみ）
$css = get_post_meta( $post_id, 'swell_meta_css', true );
if ( $css !== '' ) {
	file_put_contents( $base . '/swell-meta-css.css', $css );
	WP_CLI::log( 'swell-meta-css.css : ' . strlen( $css ) . ' bytes' );
}

// 3. swell_meta_js → swell-meta-js.js（値があるときのみ）
$js = get_post_meta( $post_id, 'swell_meta_js', true );
if ( $js !== '' ) {
	file_put_contents( $base . '/swell-meta-js.js', $js );
	WP_CLI::log( 'swell-meta-js.js : ' . strlen( $js ) . ' bytes' );
}

WP_CLI::success( "Pulled post $post_id into design-data/$post_id/." );
