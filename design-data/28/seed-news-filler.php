<?php
/** ページネーション確認用の追加サンプル投稿（2023年・汎用）。冪等。 */
$cat = function( $slug ) { $t = get_term_by( 'slug', $slug, 'category' ); return $t ? [ $t->term_id ] : []; };
$fillers = [
	[ '2023-12-20', 'oshirase', '年末年始の営業時間のお知らせ' ],
	[ '2023-12-01', 'event',    '不動産売却セミナーを開催しました' ],
	[ '2023-11-15', 'press',    '地域貢献活動に関するお知らせ' ],
	[ '2023-10-30', 'oshirase', 'Webサイトメンテナンスのお知らせ' ],
	[ '2023-10-10', 'media',    '業界誌に当社の取り組みが紹介されました' ],
	[ '2023-09-20', 'oshirase', '秋季休業のお知らせ' ],
	[ '2023-09-01', 'event',    '住まいの相談会を開催しました' ],
	[ '2023-08-10', 'press',    'サービス品質向上の取り組みについて' ],
];
foreach ( $fillers as $p ) {
	list( $date, $slug, $title ) = $p;
	if ( get_page_by_title( $title, OBJECT, 'post' ) ) { echo "exists: $title\n"; continue; }
	$pid = wp_insert_post( [
		'post_type' => 'post', 'post_status' => 'publish', 'post_title' => $title,
		'post_date' => $date . ' 10:00:00',
		'post_content' => '<!-- wp:paragraph --><p>' . esc_html( $title ) . '（サンプル）。</p><!-- /wp:paragraph -->',
		'post_category' => $cat( $slug ),
	] );
	echo is_wp_error( $pid ) ? "ERR $title\n" : "created: $title #$pid\n";
}
echo "DONE\n";
