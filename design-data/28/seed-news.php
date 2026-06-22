<?php
/**
 * ASTERRA NEWS サンプルデータ投入（カテゴリ4 + 投稿8）。冪等。
 * 実行: docker exec <cli> wp eval-file /var/www/html/wp-content/design-data/28/seed-news.php --allow-root
 */
$cats = [
	'oshirase' => 'お知らせ',
	'press'    => 'プレスリリース',
	'media'    => 'メディア掲載',
	'event'    => 'イベント・セミナー',
];
$cat_ids = [];
foreach ( $cats as $slug => $name ) {
	$term = get_term_by( 'slug', $slug, 'category' );
	if ( ! $term ) {
		$res = wp_insert_term( $name, 'category', [ 'slug' => $slug ] );
		if ( is_wp_error( $res ) ) { echo "cat ERR $slug: " . $res->get_error_message() . "\n"; continue; }
		$cat_ids[ $slug ] = $res['term_id'];
		echo "cat created: $name ($slug) #{$res['term_id']}\n";
	} else {
		$cat_ids[ $slug ] = $term->term_id;
		echo "cat exists: $name ($slug) #{$term->term_id}\n";
	}
}

$posts = [
	[ '2024-05-20', 'oshirase', 'ホームページをリニューアルしました' ],
	[ '2024-05-10', 'press',    '新サービス「不動産コンサルティング」の提供を開始しました' ],
	[ '2024-04-25', 'oshirase', 'ゴールデンウィーク休業のお知らせ' ],
	[ '2024-04-15', 'media',    '不動産情報サイト「RELIFE」に当社インタビューが掲載されました' ],
	[ '2024-03-28', 'oshirase', '賃貸管理戸数が1,000戸を突破しました' ],
	[ '2024-03-05', 'event',    '不動産投資セミナー開催のお知らせ【2024年3月30日】' ],
	[ '2024-02-14', 'press',    '本社移転のお知らせ' ],
	[ '2024-01-20', 'oshirase', '新年のご挨拶' ],
];
foreach ( $posts as $p ) {
	list( $date, $cat_slug, $title ) = $p;
	$existing = get_page_by_title( $title, OBJECT, 'post' );
	if ( $existing ) { echo "post exists: $title #{$existing->ID}\n"; continue; }
	$pid = wp_insert_post( [
		'post_type'    => 'post',
		'post_status'  => 'publish',
		'post_title'   => $title,
		'post_date'    => $date . ' 10:00:00',
		'post_content' => '<!-- wp:paragraph --><p>' . esc_html( $title ) . 'に関するお知らせ本文（サンプル）。本番ではクライアントの実コンテンツに差し替えます。</p><!-- /wp:paragraph -->',
		'post_category'=> isset( $cat_ids[ $cat_slug ] ) ? [ $cat_ids[ $cat_slug ] ] : [],
	] );
	if ( is_wp_error( $pid ) ) { echo "post ERR $title: " . $pid->get_error_message() . "\n"; continue; }
	echo "post created: $title #$pid ($cat_slug $date)\n";
}
echo "DONE\n";
