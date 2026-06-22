# verify-report: NEWS一覧ページ(post28)

- 対象: 固定ページ ID 28「お知らせ」/ ポート8918 / コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1`
- 構成: FV（静的tree）+ news-list（動的ブロック）+ CONTACT（静的tree）を1ページに連結
- 挿入モード: new（本文全置換・`$wpdb->update()` 直接更新）
- 検証日: 2026-06-16 / セッション `asterrra-news` / デザイン幅1440

## 結果

**PASS** — isValid 全合格、構成3部すべて描画・計測一致。残課題はCSS待ちの装飾のみ（既知・幾何/機能には影響なし）。

## isValid

- editor `getBlocks()` 走査: total **16ブロック**、`allValid: true`、invalid **0件**
- トップレベル構造: `[loos/full-wide, asterrra/news-list, loos/full-wide]`（= FV → news-list → CONTACT の順で意図通り）
- `asterrra/news-list` ブロック検出: あり（動的ブロックのため valid 扱い）

## 構成3部の確認

### 1. FV（.sec-fv / loos/full-wide・ネイビー地#131c30）
- H1「お知らせ」: 表示・色 #ffffff・font-size 48px ✓
- 背景写真: FVラッパー `::before` に `background-image: url(.../asterrra-news-fv-bg.png)`（attachment 66）描画確認 ✓
  （※ 計測初回は要素本体の `background-image` を見て none だったが、拡張は `::before` 擬似要素方式。`getComputedStyle(el,'::before')` で url 出力を確認し、注入 `<style>` 内に該当ルール実在を確認）
- min-height: 450px ✓
- 左寄せ: FVラッパー `align-items: flex-start`、H1/ラベルの実描画 x=144（datapack 実効左端144px）✓
  （H1 自体の `text-align:center` は SWELL `is-style-section_ttl` の既定。インラインブロック内の文字寄せで、ブロック位置はx=144で左端。左寄せ要件は満たす）
- 注入 `<style>`: padding 40/64/0/144・width100%・min-height450px を確認 ✓

### 2. news-list（.asterrra-news / 動的ブロック asterrra/news-list）
- 記事行（`.asterrra-news__row`）: **8件** ✓（公開投稿16件 / postsPerPage=8）
- カテゴリタブ（`.asterrra-news__filter`）: **5個**（すべて / お知らせ / プレスリリース / メディア掲載 / イベント・セミナー）✓
- カテゴリ色分け（`.asterrra-news__label` 背景色）: お知らせ=`rgb(19,28,48)`(#131C30 濃紺) / 他カテゴリ=`rgb(200,169,126)`(#c8a97e ゴールド) ✓（datapackルール一致）
- ページネーション（`.asterrra-news__pagination .asterrra-news__page`）: リンク3個（1[active] / 2 / next）、active=「1」✓（全2ページ）
- 行サンプル: 「ホームページをリニューアルしました」「新サービス『不動産コンサルティング』の提供を開始しました」

### 3. CONTACT（.sec-contact / loos/full-wide・ネイビー地#1e2c5b）
- 見出し H2「CONTACT」: 表示・色 `rgb(197,160,89)`(#c5a059 ゴールド)・font-size 36px ✓
- 小見出し「お問い合わせ」・横罫・リード文「不動産に関するご相談は、お気軽にお問い合わせください。」描画 ✓
- CTAボタン: **1個** ✓、href `/contact/`、テキスト「無料相談はこちら　→」✓

## 計測突合（front: /?page_id=28・viewport 1440×900）

| 項目 | 期待 | 実測 | 判定 |
|---|---|---|---|
| FV H1 文言/色/サイズ | お知らせ / #fff / 48px | お知らせ / rgb(255,255,255) / 48px | OK |
| FV 左端 x | 144 | 144（H1・ラベル共） | OK |
| FV 背景写真 | bg-66描画 | ::before に url(asterrra-news-fv-bg.png) | OK |
| FV min-height | ≈450 | 450 | OK |
| news 記事行数 | 8 | 8 | OK |
| news カテゴリタブ | 5（全+4） | 5 | OK |
| news カテゴリ色分け | oshirase濃紺/他金 | #131C30 / #c8a97e | OK |
| news ページャ | 2ページ・active1 | リンク3・active「1」 | OK |
| CONTACT H2 | CONTACT/#c5a059/36px | CONTACT/rgb(197,160,89)/36px | OK |
| CONTACT ボタン | 1・/contact/ | 1・/contact/ | OK |

## 修正履歴

- **ラウンド0（挿入前の事故回避）**: `/tmp/page-markup.html` が別プロセスにより別ページ（About系）内容で上書きされる競合を検知（node書込み6942B → 12秒後に29651Bへ変化）。組み立て先をプロジェクト内 `design-data/28/page-content.html`（コンテナマウント済み）へ変更し、`WP_MARKUP_FILE` をマウントパス直指定に切替。以降 `/tmp` 不使用。
- **ラウンド1（誤検知の自己訂正・tree修正なし）**: FV背景写真が初回計測で none に見えたが、背景画像拡張は `::before` 擬似要素方式のため要素本体の `background-image` には出ない仕様と判明。`getComputedStyle(el,'::before')` と注入`<style>`の実ルールで描画を確認し OK 判定。tree.js への修正は不要だった。
- ブロック属性（tree.js）への内容変更は一切なし。ページ28メタ `swell_meta_show_sidebar=hide` は変更せず。テキスト変更なし。

## 残課題

**CSS待ち（既知）** — ブロック属性で表現不可・後段ページCSSで適用予定。本検証の合否には不算入。

- FV: 左→右ネイビーグラデーションオーバーレイ / 見出し・サブテキストの text-shadow
- CONTACT: CTAボタンの drop-shadow / セクション上端 border

いずれも幾何・機能には影響せず、現状でレイアウト・動的描画・カテゴリ色分け・ページネーションは設計通り。
