# integration-report: ASTERRA トップページ (post_id 7)

**完了日:** 2026/6/16
**URL:** http://localhost:8918/ （フロントページ） / 編集: http://localhost:8918/wp-admin/post.php?post=7&action=edit&dev_login=1

## 結果: 合格

- **isValid: 149/149**（ページ全体・全ブロック valid）
- **テキスト忠実性: PASS**（全6セクションの主要テキストを原文どおり確認。「不動産<br>コンサルティング」等の改行もデザイン通り）
- **セクション: 6/6 実装**（上から FV / NEWS / SERVICE / ABOUT US / COMPANY / CONTACT、全て `.sec-*` フッククラス付き）
- **視覚: デザイン忠実**（final-full.png）

## 実装方式
- ブロックツリーJSON → 実機Gutenberg `wp.blocks.serialize()` → $wpdb直接挿入。手書きマークアップなし
- レイアウト・寸法・テキスト・色はブロック属性（loos/full-wide + flavor/universal-block + コアブロック）で表現
- 装飾（属性で不可なもの）はページ限定カスタムCSS `swell-meta-css.css`（172行）: FV背景グラデ＋text-shadow＋ロゴ絶対配置 / NEWS小画像影 / SERVICE外周枠 / ABOUTカード影 / COMPANY透かし文字＋小画像影 / CONTACTボタン影＋上端border / 見出しSWELL既定装飾の打ち消し（SERVICE・CONTACT）
- 全CSSセレクタは `.sec-*` 配下に限定（サイト全体・テーマ既定は無印で上書きせず）

## サイト設定変更（ユーザー承認済）
- `show_on_front=page` / `page_on_front=7`（トップページ化）
- functions.php に Google Fonts（Noto Serif JP / Noto Sans JP）enqueue ＋ preconnect
- ページ7メタ `swell_meta_show_sidebar=hide`（full-wide全幅化）
- loos_customizer `main_visual_type=none` / `show_post_slide=off`（SWELL既定MV・投稿スライダーをオフ＝ブロックFVを最上部に）

## リンク先（空の固定ページを作成しslug設定）
- /company/(ID26) /service/(ID27) /news/(ID28) /contact/(ID29)。ボタンは各slugにリンク

## スコープ外（別途対応）
- Header（ロゴ＋グローバルナビ）/ Footer … SWELL設定で別途実装予定（今回のページ本文変換からは除外）
- NEWS は静的ブロックで実装（投稿リスト動的化は後日の拡張候補）

## 後日の本番差し替え候補
- 画像（ChatGPT生成のプレースホルダ）→ 本番写真
- COMPANY定義リストの仮データ（代表者「田中 太郎」・免許「第123456号」等）→ クライアント確定情報
- 各CTAボタンの最終リンク先
