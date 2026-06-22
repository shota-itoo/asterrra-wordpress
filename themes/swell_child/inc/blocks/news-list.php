<?php
/**
 * News List Block — asterrra/news-list
 *
 * NEWS一覧ページ（post_id 28）用の動的カスタムブロック。
 * カテゴリフィルタ + 投稿リスト + ページネーション を WP_Query で動的描画する。
 *
 * デザイン仕様: design-data/28/sections/02_NEWSLIST/datapack.md 厳守。
 * - 実コンテンツ幅 896px・中央寄せ / 3パーツ縦並び gap 64px
 * - フィルタタブ（すべて + 4カテゴリ）/ アクティブ=ゴールド #c8a97e 白文字
 * - 行: [日付+カテゴリラベル(320px)] | タイトル | chevron-right。行全体リンク
 * - カテゴリラベル: お知らせ(oshirase)=#131C30濃紺 / 他=#c8a97e ゴールド
 * - ページネーション: 40x40 / アクティブ=#131C30濃紺白文字
 *
 * サーバーサイドレンダリング（render_callback）。$_GET で絞り込み・ページ送り。
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * フィルタタブで使うカテゴリの並び順（slug）。datapack の順序に固定。
 */
function asterrra_news_list_filter_slugs() {
	return array( 'oshirase', 'press', 'media', 'event' );
}

/**
 * カテゴリラベルの背景色を返す。
 * datapack ルール: お知らせ(oshirase)=濃紺 / それ以外=ゴールド。
 *
 * @param string $slug カテゴリ slug
 * @return string hex color
 */
function asterrra_news_list_label_color( $slug ) {
	return ( 'oshirase' === $slug ) ? '#131C30' : '#c8a97e';
}

/**
 * chevron-right SVG（16x16）を返す。
 *
 * @param string $color stroke color
 * @return string SVG markup
 */
function asterrra_news_list_chevron( $color = '#9CA3AF' ) {
	return '<svg class="asterrra-news__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6 4l4 4-4 4" stroke="' . esc_attr( $color ) . '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/**
 * ブロックの render_callback。
 *
 * @param array $attributes ブロック属性
 * @return string HTML
 */
function asterrra_news_list_render( $attributes = array() ) {
	$posts_per_page = isset( $attributes['postsPerPage'] ) ? intval( $attributes['postsPerPage'] ) : 8;
	if ( $posts_per_page < 1 ) {
		$posts_per_page = 8;
	}

	// 現在の絞り込みカテゴリ・ページ番号（$_GET 駆動）
	$cur_cat = isset( $_GET['news_cat'] ) ? sanitize_key( wp_unslash( $_GET['news_cat'] ) ) : '';
	$paged   = isset( $_GET['pg'] ) ? max( 1, intval( $_GET['pg'] ) ) : 1;

	// 有効なフィルタ slug 以外は無視（全件表示扱い）
	$filter_slugs = asterrra_news_list_filter_slugs();
	if ( $cur_cat && ! in_array( $cur_cat, $filter_slugs, true ) ) {
		$cur_cat = '';
	}

	// ── WP_Query ──
	$query_args = array(
		'post_type'           => 'post',
		'post_status'         => 'publish',
		'posts_per_page'      => $posts_per_page,
		'paged'               => $paged,
		'orderby'             => 'date',
		'order'               => 'DESC',
		'ignore_sticky_posts' => true,
	);
	if ( $cur_cat ) {
		$query_args['category_name'] = $cur_cat;
	}
	$query = new WP_Query( $query_args );

	// 現在ページのベースURL（news_cat / pg を一旦除去）
	$base_url = remove_query_arg( array( 'news_cat', 'pg' ) );

	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'asterrra-news' ) );

	ob_start();
	?>
	<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
		<div class="asterrra-news__inner">

			<?php // ── 1. カテゴリフィルタ ── ?>
			<div class="asterrra-news__filters" role="tablist">
				<?php
				// 「すべて」= news_cat / pg を除去したURL
				$all_active = ( '' === $cur_cat );
				$all_url    = remove_query_arg( array( 'news_cat', 'pg' ), $base_url );
				?>
				<a class="asterrra-news__filter<?php echo $all_active ? ' is-active' : ''; ?>"
					href="<?php echo esc_url( $all_url ); ?>"<?php echo $all_active ? ' aria-current="true"' : ''; ?>>すべて</a>
				<?php
				$terms = get_terms(
					array(
						'taxonomy'   => 'category',
						'slug'       => $filter_slugs,
						'hide_empty' => false,
					)
				);
				// datapack 順（oshirase, press, media, event）に並べ替える
				$terms_by_slug = array();
				if ( ! is_wp_error( $terms ) ) {
					foreach ( $terms as $t ) {
						$terms_by_slug[ $t->slug ] = $t;
					}
				}
				foreach ( $filter_slugs as $slug ) {
					if ( empty( $terms_by_slug[ $slug ] ) ) {
						continue;
					}
					$term     = $terms_by_slug[ $slug ];
					$active   = ( $cur_cat === $slug );
					$tab_url  = add_query_arg( 'news_cat', $slug, remove_query_arg( 'pg', $base_url ) );
					?>
					<a class="asterrra-news__filter<?php echo $active ? ' is-active' : ''; ?>"
						href="<?php echo esc_url( $tab_url ); ?>"<?php echo $active ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $term->name ); ?></a>
					<?php
				}
				?>
			</div>

			<?php // ── 2. ニュースリスト ── ?>
			<?php if ( $query->have_posts() ) : ?>
				<div class="asterrra-news__list">
					<?php
					while ( $query->have_posts() ) :
						$query->the_post();

						// 先頭カテゴリ（フィルタ対象を優先）でラベル決定
						$cats        = get_the_category();
						$label_term  = null;
						if ( ! empty( $cats ) ) {
							foreach ( $cats as $c ) {
								if ( in_array( $c->slug, $filter_slugs, true ) ) {
									$label_term = $c;
									break;
								}
							}
							if ( ! $label_term ) {
								$label_term = $cats[0];
							}
						}
						$label_name = $label_term ? $label_term->name : '';
						$label_slug = $label_term ? $label_term->slug : '';
						$label_bg   = asterrra_news_list_label_color( $label_slug );
						?>
						<a class="asterrra-news__row" href="<?php the_permalink(); ?>">
							<span class="asterrra-news__meta">
								<time class="asterrra-news__date" datetime="<?php echo esc_attr( get_the_date( 'Y-m-d' ) ); ?>"><?php echo esc_html( get_the_date( 'Y.m.d' ) ); ?></time>
								<?php if ( $label_name ) : ?>
									<span class="asterrra-news__label" style="background-color:<?php echo esc_attr( $label_bg ); ?>"><?php echo esc_html( $label_name ); ?></span>
								<?php endif; ?>
							</span>
							<span class="asterrra-news__title"><?php the_title(); ?></span>
							<span class="asterrra-news__arrow"><?php echo asterrra_news_list_chevron(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
						</a>
						<?php
					endwhile;
					?>
				</div>
			<?php else : ?>
				<p class="asterrra-news__empty">お知らせはまだありません。</p>
			<?php endif; ?>

			<?php // ── 3. ページネーション ── ?>
			<?php
			$total_pages = (int) $query->max_num_pages;
			if ( $total_pages > 1 ) :
				$page_url = function ( $n ) use ( $cur_cat, $base_url ) {
					$args = array( 'pg' => $n );
					if ( $cur_cat ) {
						$args['news_cat'] = $cur_cat;
					}
					return add_query_arg( $args, $base_url );
				};

				// 表示するページ番号を算出（先頭・末尾・現在周辺 + 省略）
				$end_size = 1;
				$mid_size = 2;
				$dots     = false;
				?>
				<nav class="asterrra-news__pagination" aria-label="ページ送り">
					<?php
					if ( $paged > 1 ) :
						?>
						<a class="asterrra-news__page asterrra-news__page--prev" href="<?php echo esc_url( $page_url( $paged - 1 ) ); ?>" aria-label="前のページ"><?php echo asterrra_news_list_chevron(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
						<?php
					endif;

					for ( $n = 1; $n <= $total_pages; $n++ ) :
						$is_edge = ( $n <= $end_size || $n > $total_pages - $end_size );
						$is_near = ( $n >= $paged - $mid_size && $n <= $paged + $mid_size );
						if ( $is_edge || $is_near ) {
							$dots = true;
							if ( $n === $paged ) :
								?>
								<span class="asterrra-news__page is-active" aria-current="page"><?php echo esc_html( $n ); ?></span>
								<?php
							else :
								?>
								<a class="asterrra-news__page" href="<?php echo esc_url( $page_url( $n ) ); ?>"><?php echo esc_html( $n ); ?></a>
								<?php
							endif;
						} elseif ( $dots ) {
							$dots = false;
							?>
							<span class="asterrra-news__page asterrra-news__page--dots" aria-hidden="true">&hellip;</span>
							<?php
						}
					endfor;

					if ( $paged < $total_pages ) :
						?>
						<a class="asterrra-news__page asterrra-news__page--next" href="<?php echo esc_url( $page_url( $paged + 1 ) ); ?>" aria-label="次のページ"><?php echo asterrra_news_list_chevron(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
						<?php
					endif;
					?>
				</nav>
				<?php
			endif;
			?>

		</div>
	</div>
	<?php
	wp_reset_postdata();

	return ob_get_clean();
}

/**
 * ブロック登録（apiVersion 3 / render_callback でサーバーサイドレンダリング）。
 */
add_action( 'init', function () {
	$style_handle  = 'asterrra-news-list-style';
	$editor_handle = 'asterrra-news-list-editor';

	// フロント/エディタ共通のブロックCSS
	$css_path = get_stylesheet_directory() . '/assets/css/news-list.css';
	$css_uri  = get_stylesheet_directory_uri() . '/assets/css/news-list.css';
	$css_ver  = file_exists( $css_path ) ? filemtime( $css_path ) : false;
	wp_register_style( $style_handle, $css_uri, array(), $css_ver );

	// エディタ用 JS（ServerSideRender プレビュー）
	$js_path = get_stylesheet_directory() . '/assets/js/editor/blocks/news-list.js';
	$js_uri  = get_stylesheet_directory_uri() . '/assets/js/editor/blocks/news-list.js';
	if ( file_exists( $js_path ) ) {
		wp_register_script(
			$editor_handle,
			$js_uri,
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-server-side-render' ),
			filemtime( $js_path ),
			true
		);
	}

	register_block_type( 'asterrra/news-list', array(
		'api_version'     => 3,
		'title'           => 'お知らせ一覧（asterrra）',
		'category'        => 'design',
		'icon'            => 'list-view',
		'description'     => 'カテゴリフィルタ・ページネーション付きの動的お知らせ一覧（投稿を表示）。',
		'attributes'      => array(
			'postsPerPage' => array(
				'type'    => 'number',
				'default' => 8,
			),
		),
		'supports'        => array(
			'html'  => false,
			'align' => array( 'wide', 'full' ),
		),
		'render_callback' => 'asterrra_news_list_render',
		'editor_script'   => $editor_handle,
		'style'           => $style_handle,
		'editor_style'    => $style_handle,
	) );
} );

/**
 * 【トップページ NEWS欄】最新N件を動的表示するショートコード。
 * 旧実装はNewsItem(日付/タイトル/矢印)を3件ハードコードしていた＝実投稿を反映せず本番で破綻するため、
 * [asterrra_top_news count="3"] で最新の公開投稿を同じ見た目（日付128px/タイトル/矢印・行border）でリンク出力する。
 * 0件時は「現在、お知らせはありません。」を表示してレイアウトを崩さない（1件=1行で成立）。
 * インライン style はトップページの旧NewsItemの計測値を踏襲（flavor拡張に依存しない素のHTML）。
 */
function asterrra_top_news_shortcode( $atts ) {
	$atts  = shortcode_atts( array( 'count' => 3 ), $atts, 'asterrra_top_news' );
	$count = max( 1, intval( $atts['count'] ) );
	$q = new WP_Query( array(
		'post_type'           => 'post',
		'post_status'         => 'publish',
		'posts_per_page'      => $count,
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	) );

	ob_start();
	if ( $q->have_posts() ) {
		while ( $q->have_posts() ) {
			$q->the_post();
			$date  = esc_html( get_the_date( 'Y.m.d' ) );
			$title = esc_html( get_the_title() );
			$url   = esc_url( get_permalink() );
			echo '<a href="' . $url . '" class="atn-item" style="display:flex;align-items:center;padding:20px 0;border-bottom:1px solid #e5e7eb;text-decoration:none;">'
				. '<div style="flex:0 0 128px;width:128px;"><span style="color:#111827;font-family:\'Noto Serif JP\',serif;font-size:14px;font-weight:700;letter-spacing:0.1em;line-height:20px;">' . $date . '</span></div>'
				. '<div style="flex:1 1 auto;min-width:0;padding-right:16px;"><span style="display:block;color:#1f2937;font-family:\'Noto Sans JP\',sans-serif;font-size:14px;font-weight:400;line-height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' . $title . '</span></div>'
				. '<div style="flex:0 0 auto;"><span style="color:#9ca3af;font-family:\'Noto Sans JP\',sans-serif;font-size:12px;line-height:16px;">&rarr;</span></div>'
				. '</a>';
		}
		wp_reset_postdata();
	} else {
		echo '<p style="padding:20px 0;margin:0;color:#9ca3af;font-family:\'Noto Sans JP\',sans-serif;font-size:14px;line-height:20px;">現在、お知らせはありません。</p>';
	}
	return ob_get_clean();
}
add_shortcode( 'asterrra_top_news', 'asterrra_top_news_shortcode' );
