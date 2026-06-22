# integration-report: お知らせ一覧ページ (post_id 28 /news/)

**完了日:** 2026/6/16
**URL:** http://localhost:8918/news/ ／ 編集: http://localhost:8918/wp-admin/post.php?post=28&action=edit&dev_login=1
**Figma:** node 1:4715「NEWS（PC版）」

## 結果: 合格（機能する動的一覧ページ）

- **isValid: 16/16**（ページ全体。FV静的ブロック群 + asterrra/news-list 動的ブロック + CONTACT静的ブロック群）
- **テキスト忠実: PASS**（FV・カテゴリタブ・CONTACT・ニュース投稿タイトル）
- **動的機能: 動作確認OK**
  - カテゴリ絞り込み: `?news_cat=oshirase|press|media|event` で実際に絞り込み
  - ページネーション: `?pg=2`（投稿16件・1ページ8件＝全2ページ）
  - カテゴリラベル色分け: お知らせ→濃紺#131C30 / 他→ゴールド#c8a97e

## 構成
| 区分 | 実装 |
|---|---|
| FV（下層ヒーロー450px） | 静的ブロック（背景写真＋横グラデ＋NEWS/お知らせ/横罫/2行サブ）。`.sec-fv` |
| カテゴリフィルタ＋ニュースリスト＋ページネーション | **動的カスタムブロック `asterrra/news-list`**（WP_Query＋?news_cat絞り込み＋?pgページ送り）。`.asterrra-news` |
| CONTACT | トップpage の 06_CONTACT ツリーを再利用。`.sec-contact` |

## 新規作成した資産
- **カスタムブロック `asterrra/news-list`**（子テーマ・再利用可）:
  - `themes/swell_child/inc/blocks/news-list.php`（render_callback / WP_Query / フィルタタブ / ページネーション）
  - `themes/swell_child/assets/js/editor/blocks/news-list.js`（IIFE / ServerSideRender）
  - `themes/swell_child/assets/css/news-list.css`（`.asterrra-news` 配下限定）
  - `functions.php` に require 1行追記
- **カテゴリ4種**: お知らせ(oshirase) / プレスリリース(press) / メディア掲載(media) / イベント・セミナー(event)
- **サンプル投稿16件**（#68-83。デザインの8件＋ページネーション確認用の汎用8件）。本番でクライアントの実投稿に差し替え

## ページ限定CSS
- `design-data/28/swell-meta-css.css`（70行）: FV背景グラデ＋text-shadow / CONTACTボタン影＋上端border。全て `.sec-fv` / `.sec-contact` 配下に限定

## ページ単位設定
- `swell_meta_show_sidebar=hide`（post meta）。グローバル設定（フォント・MV/スライダーオフ）はトップ実装分を流用

## スコープ外・後日
- Header / Footer / パンくず … SWELLテーマ側が出す（別途）
- サンプル投稿・カテゴリ → 本番のクライアント実コンテンツに差し替え
- FV背景写真（プレースホルダ）→ 本番写真
