# verify-report: Hero（お問い合わせページ タイトル帯＋パンくず）

- 対象: `design-data/29/sections/01_HERO/tree.js`
- 挿入先: ページID `29`（お問い合わせ）/ 挿入モード `new`（置換）
- 環境: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート `8918` / セッション `asterrra-c` / デザイン幅 `1440`
- 実行日: 2026-06-16

## 結果

**PASS**（修正ループ 0 回 / 一発収束）。isValid 全合格、計測突合は全項目一致。残課題は既知の「Hero背景グラデ（CSS待ち）」のみで、これは合否判定に含めない（属性表現不可・後段ページCSSで適用予定）。

- 2 つの full-wide（`.sec-hero` タイトル帯 / `.sec-breadcrumb` パンくず）が両方レンダリングされることを確認。
- 挿入バイト数: シリアライズ 6200 bytes → DB 反映 6462 bytes（wpautop/kses 後）。

## isValid（ページ全体）

```
{"total":15, "allValid":true, "invalid":[]}
```

全 15 ブロック有効。無効ブロックなし。

## 計測突合表（フロント `/contact/`・viewport 1440×900）

| 要素 | 項目 | datapack 設計値 | 実機計測値 | 判定 |
|---|---|---|---|---|
| `.sec-hero`（帯） | 幅 / 高さ | 全幅 / 450px | x=0, w=1440, h=450 | ✅ |
| `.sec-hero` | 背景フォールバック地 | #131C30（ネイビー） | `rgb(19,28,48)` | ✅ |
| heroWrapper | position | relative | relative | ✅ |
| heroWrapper | padding（上/左） | top40 / left144 | 40px / 144px | ✅ |
| heroWrapper | min-height | 450px | 450px | ✅ |
| Hero 背景写真 | 表示（::before疑似要素） | ID64 cover/center | `::before` abs 1440×450, z0, bg-size:cover, url=asterrra-contact-hero-bg.jpg（HTTP 200 / 333KB） | ✅ |
| CONTACT ラベル | size/色/font/トラッキング | 20px / #C8A97E / Noto Serif JP / 4px | 20px / `rgb(200,169,126)` / `"Noto Serif JP"` / 4px | ✅ |
| H1「お問い合わせ」 | 左端/幅/高/size/色 | left144 / 48px / #FFFFFF | x=144, w=302, h=48, fs=48px, lh=48px, color `rgb(255,255,255)` | ✅ |
| ゴールドディバイダー | 寸法 / 色 | 48×2px / #C8A97E | w=48, h=2, bg `rgb(200,169,126)` | ✅ |
| 本文リード | size/色/font/トラッキング | 16px / rgba(255,255,255,0.9) / Noto Sans JP / 0.4px | 16px / `rgba(255,255,255,0.9)` / `"Noto Sans JP"` / 0.4px | ✅ |
| 本文テキスト | 一字一句 | 不動産に関するご質問・ご相談など、/ お気軽にお問い合わせください。/ 担当者よりご連絡させていただきます。 | 全文一致（3行 `<br>` 区切り） | ✅ |
| `.sec-breadcrumb`（帯） | 幅 / 背景 | 全幅 / #ffffff | x=0, w=1440, h=64, bg `rgb(255,255,255)` | ✅ |
| パンくず テキスト | HOME > お問い合わせ | HOME / `>` / お問い合わせ（3段落） | `["HOME", ">", "お問い合わせ"]` | ✅ |

> 計測補足: 背景写真は backgroundImage 拡張が要素直書きでなく `::before` 疑似要素に
> `background-image: url(...asterrra-contact-hero-bg.jpg); background-size: cover` を生成する方式。
> 当初 `getComputedStyle(el).backgroundImage` が `none` に見えたのは疑似要素のため。
> `getComputedStyle(el, '::before')` で実体（abs 1440×450 / z-index:0 / cover / 正しいURL）を確認済み。
> 画像 URL は HTTP 200（333,959 bytes）で配信され、スクショ上も高層ビル写真が表示。

## 修正履歴

なし（ラウンド 0 / 一発合格）。tree.js への変更は行っていない。

## 残課題

- **CSS待ち（既知）: Hero背景グラデ** — 左→右ネイビー横グラデオーバーレイ
  （`linear-gradient(to right, rgba(19,28,48,0.9), rgba(19,28,48,0.6) 50%, rgba(19,28,48,0))`、
  datapack §4 / §検証用設計値「要CSS」）。backgroundImage 拡張の Overlay は単色のみでグラデ非対応のため
  ブロック属性で表現不可。左側テキスト可読性確保の機能的グラデで、後段のページCSS（`.sec-hero`）で適用予定。
  本検証ではグラデ有無を不一致判定に含めず、背景写真・タイトル・CONTACTラベル・横罫・本文・パンくずの
  レイアウト/テキスト/寸法/色の幾何一致に集中して合格判定とした。
- 参考（合否外）: フロント表示では SWELL の固定ページタイトルバー（「お問い合わせ」）が hero セクションの上に
  描画される（テーマ既定のページ見出し帯）。これは挿入ブロックとは別レイヤーで、ページ標準レイアウトに沿うもの。
  本セクション（hero 帯 y=334〜）の検証対象外。
