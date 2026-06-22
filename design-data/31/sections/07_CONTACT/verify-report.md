# verify-report: CONTACT

- セクション: `.sec-about-contact`（loos/full-wide / index6・ページ最終セクション）
- ページ: post 31「私たちについて」 / ポート 8918 / 挿入モード: append
- 検証日: 2026-06-16
- セッション: about / ビューポート 1440×900

## 結果

**合格（収束）**。中央寄せレイアウト・テキスト・寸法・色・横罫すべて datapack 設計値と一致。修正ループ 0 回（tree.js 修正不要）。
残課題はすべて事前合意済みの「CSS待ち（既知）」項目（ボタン影・セクション上端 border-top）に加え、見出しの SWELL 既定ベタ塗り背景打ち消し（後述。トップページ page7 CONTACT と同一の既知パターン）。

挿入: 既存本文 47,996 bytes に CONTACT セクション 3,929 bytes を append → 合計 52,012 bytes（$wpdb 直接更新、`wp post update` 不使用）。

## isValid

ページ全体（105 ブロック）で `allValid: true` / `invalid: []`。
CONTACT セクションのブロック（loos/full-wide → flavor/universal-block ×3 → core/heading / core/paragraph ×2 / core/buttons → core/button）すべて妥当。

## 計測突合表（front-end `.sec-about-contact` @1440px）

| 項目 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション背景 | #1e2c5b（ネイビー） | rgb(30,44,91) = #1e2c5b | ✓ |
| セクション幅 | 1440（全幅） | 1440 | ✓ |
| 中央寄せ（要素中心） | 720（セクション中心） | h2 / divider / lead / btn すべて中心 720 | ✓ |
| 見出し文字 "CONTACT" | #c5a059 / Noto Serif JP 600 / 36px / 40px / 0.1em | rgb(197,160,89)=#c5a059 / 'Noto Serif JP' serif / 600 / 36px / 40px / 3.6px(=0.1em) | ✓ |
| サブラベル "お問い合わせ" | #ffffff / 12px | rgb(255,255,255) / 12px | ✓ |
| 横罫 | 40×2px / #c8a97e / 中央 | w40 h2 / rgb(200,169,126)=#c8a97e / 中心720 | ✓ |
| 本文 | "不動産に関するご相談は、お気軽にお問い合わせください。" / #d1d5db / 16px / w432 | rgb(209,213,219)=#d1d5db / 16px / w432 | ✓ |
| CTA ラベル | "無料相談はこちら　→" | "無料相談はこちら　→" | ✓ |
| CTA 背景 / 文字 | #c5a059 / #ffffff | rgb(197,160,89)=#c5a059 / rgb(255,255,255) | ✓ |
| CTA 角丸 / フォント | 0px / 14px | 0px / 14px（282×60） | ✓ |
| CTA リンク先 | /contact/ | href="/contact/" | ✓ |
| ボタン数 | 1 | 1 | ✓ |

数値・色・テキスト・幾何すべて一致。テキスト変更なし。

## 修正履歴

- 修正ループ: 0 回。初回シリアライズで isValid=true、計測突合も全項目一致。tree.js への変更なし。

## 残課題

### CSS待ち（既知）
1. **ボタン影** — `box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)`（shadow-lg）。core/button 属性に box-shadow なし。後段ページCSSで適用予定（不一致判定対象外）。
2. **セクション上端 border-top** — 1px solid #020c1b。loos/full-wide に上端border属性なし。padding は上下128で対称化済み、border 1px 分は後段ページCSSで適用予定（不一致判定対象外）。
3. **見出し SWELL 既定ベタ塗り背景の打ち消し** — h2（`wp-block-heading`）に SWELL の既定セレクタ `.post_content h2:where(:not([class^="swell-block-"]):not(.faq_q):not(.p-postList__title))` が `background: var(--color_htag)`（= #04384c）を当て、"CONTACT" 文字背後に濃ティールの帯が出る。これはトップページ page7 の CONTACT（`.sec-contact`）と**完全に同一の既知課題**であり、page7 は swell_meta_css の「6-c. 見出し(h2)の SWELL 既定ベタ塗り背景打ち消し（既知課題）」で `.sec-contact h2.wp-block-heading { background: none; }` ＋ ::before/::after 打ち消しにより解消している。本ページ31でも同様に `.sec-about-contact h2.wp-block-heading { background:none }` を後段ページCSSで適用予定。tree.js は page7 CONTACT と同一マークアップ（`is-style-section_ttl` 不使用・swell-block- 接頭辞なし）を踏襲しており、tree.js 側の修正は不要（属性ファーストの原則どおり、装飾打ち消しは page CSS の領分）。

### 参照
- 実機スクショ: `implemented.png`（フルページ）
- reference: page7 post_content `.sec-contact` CONTACT セクションと className 以外同一構造
