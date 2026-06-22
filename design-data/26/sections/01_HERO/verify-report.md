# verify-report: HERO (会社概要ヒーロー)

対象: `design-data/26/sections/01_HERO/tree.js` → ページID 26（会社概要）
環境: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート 8918 / セッション `asterrra-company`
挿入モード: `new`（ページ内容を全置換）／ デザイン幅 1440
検証日: 2026-06-16

---

## 結果

**合格（PASS）** — 1ラウンドで収束。tree.js の修正は不要だった。

- シリアライズ: 成功（`<!-- wp:` 始まり・6906 bytes・ブロックopenコメント17件）
- 挿入: 成功（`$wpdb->update()` 経由・DB 7140 bytes）
- isValid: **allValid: true**（17/17ブロック）
- 計測突合: ヒーロー帯・パンくず・H1・背景画像表示すべて設計値一致
- 残課題: HEROネイビー横グラデオーバーレイのみCSS待ち（既知・属性で表現不可）

---

## isValid

```json
{"total":17, "allValid":true, "invalid":[]}
```

全17ブロック（loos/full-wide ×2、flavor/universal-block 群、core/heading、core/paragraph 群）バリデーションエラーなし。

---

## 計測突合表（viewport 1440×900・フロントプレビュー）

| 対象 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| ヒーロー帯 `.sec-hero` 幅×高 | 1440 × 450 | 1440 × 450（x=0・全幅） | ✅ |
| ヒーロー帯 背景色（フォールバック地） | `#131C30`（rgb 19,28,48） | `rgb(19,28,48)` | ✅ |
| H1「会社概要」 テキスト | 会社概要 | 会社概要（innerText一致） | ✅ |
| H1 fontSize / lineHeight | 48px / 48px | 48px / 48px | ✅ |
| H1 color | `#ffffff`（白） | `rgb(255,255,255)` | ✅ |
| H1 左端x（コンテンツ左端） | ≈144px（外80+内64） | x=144 | ✅ |
| ヒーロー背景写真 表示 | hero-bg-city.jpg / cover / center | `::before` 擬似要素に `url(.../hero-bg-city.jpg)` / `background-size:cover` / `position:center` 出力。画像URL HTTP 200 (image/jpeg) | ✅ |
| パンくず `.sec-breadcrumb` 幅×高 | 1440全幅 / 白背景 | 1440 × 64・`rgb(255,255,255)` | ✅ |
| パンくず テキスト | HOME > 会社概要 | `HOME > 会社概要`（innerText） | ✅ |

### 背景画像の検証メモ（重要）

verify手順の `heroBgImg` は `.wp-block-flavor-universal-block` 要素自身の `backgroundImage` を読むが、**当プロジェクトの背景画像拡張（`inc/extensions/block-background-image.php`）は `::before` 擬似要素に背景画像を描画する設計**。そのため要素自身の computed `backgroundImage` は `none` が正常であり、`::before` 側に正しく画像が出力されていることを確認済み（false negative の回避）。

- 注入CSS（実機確認）: `.wp-block-flavor-universal-block[data-ub-id="ub-12cc325c"]::before { content:""; position:absolute; ...; background-image: url("http://localhost:8918/wp-content/uploads/2026/06/hero-bg-city.jpg"); background-repeat:no-repeat; background-size:cover; background-position:center; ... }`
- 画像URL: `http://localhost:8918/wp-content/uploads/2026/06/hero-bg-city.jpg` → HTTP 200 / image/jpeg
- スクショ（`implemented.png`）でも都市ビル写真が表示され、エヤブロウ/H1/ゴールドディバイダー/サブの縦積み左寄せ・パンくず「HOME > 会社概要」を視覚確認

### プレビューURLについて

`?page_id=26&preview=true` はページの pretty permalink `/company/?dev_login=1` へ301する（page 26 のまま・リダイレクト先も同一ページ）。front page ではないため内容置換は問題なく反映。

---

## 修正履歴

なし（1ラウンド目で isValid:true・計測全一致のため修正ループ未実施）。

---

## 残課題

- **CSS待ち（既知）: HEROネイビー横グラデオーバーレイ** — `linear-gradient(to right, rgba(19,28,48,0.9) 0%, rgba(19,28,48,0.6) 50%, rgba(19,28,48,0) 100%)`。backgroundImage拡張のOverlayColorは単色のみでグラデ非対応のため、tree.js（ブロック属性）では表現不可。後段でページCSS（`.sec-hero` の擬似要素等）として適用予定。本検証ではグラデの有無を不一致判定の対象外とした（datapack §4・要CSS項に準拠）。
  - 現状はオーバーレイ未適用のため背景写真が全面フルブライトで表示されるが、白文字の可読性は確保されている。グラデ適用後に左側がさらに濃くなる想定。
