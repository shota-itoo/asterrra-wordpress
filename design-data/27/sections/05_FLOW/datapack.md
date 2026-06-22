# データパック — Section FLOW (ご相談からご契約までの流れ・5ステップ)

- **Figma**: file `eZFYBaJDAN0PLLd7ITdvLR` / nodeId `1:3159` / name `Flow Section`
- **デザイン全体**: 幅1440px / セクション高さ610px / セクション原点 y=3329（フレーム内 x=0, y=3329）
- **設計方針**: 白背景。上部に「FLOW / ご相談からご契約までの流れ」見出し＋短い横罫。下に5ステップを横一列に並べ、ステップ間をゴールドの矢印（chevron）でつなぐ。各ステップ＝番号(01-05)＋円形バッジ(80×80・ネイビー・影付き、中に白線アイコン40×40)＋見出し(H3)＋2行説明文。

---

## レイアウト骨格

縦積み（見出しブロック → ステップ行）。ステップ行は横並び（flex row）。すべて中央寄せ系。

```
Flow Section (1:3159)  1440×610  bg #ffffff
  padding: top 96 / bottom 96 / left 80 / right 80
  └ Container (1:3160)  max-width 1280 / px 64 / gap 64（見出しブロック↔ステップ行）  ← セクション内 x=80, y=96
      実効コンテンツ幅 = 1280 − 64×2 = 1152px（外80+内64=片側144 ＝ ページ標準）
      ├ Section Title (1:3161)  幅1152 / 高さ90 / 縦積み gap12
      │   ├ Container (1:3162)→ text "FLOW" (1:3163)   幅1152 / 高さ16  英語アイブロウ
      │   ├ Heading 2 (1:3164)→ text (1:3165)          幅1152 / 高さ36（枠48・pb12）  和見出し
      │   └ Horizontal Divider (1:3166)                40×2  ゴールド横罫（装飾レイヤー）
      └ Flow Steps (1:3167)  幅1152 / 高さ236 / 横並び flex-row / gap16 / items-start
          ├ Step 01 (1:3168)  幅188.8 / 高さ236
          ├ Arrow  (1:3181)  20×128（内部に chevron 20×20 を上から54pxの位置）
          ├ Step 02 (1:3183)  幅188.81
          ├ Arrow  (1:3196)  20×128
          ├ Step 03 (1:3198)  幅188.8
          ├ Arrow  (1:3211)  20×128
          ├ Step 04 (1:3213)  幅188.8
          ├ Arrow  (1:3226)  20×128
          └ Step 05 (1:3228)  幅188.8
```

### ステップ内部構造（Step 01 = 1:3168 を代表に。全5ステップ同一）

縦積み・中央寄せ（flex column / items-center）。上から:

```
Step (188.8幅 / 236高)  flex-col items-center
  ├ Margin (1:3169)        番号ラッパ  pb16            ← 番号ブロック高 48（テキスト枠32 + pb16）
  │   └ Container (1:3170) → text "01" (1:3171)  lh32  ゴールド数字
  ├ Margin (1:3172)        バッジラッパ  h104 / pb24    ← バッジ80 + 下24
  │   └ Background (1:3173)  80×80 円  bg #131C30
  │       ├ Overlay+Shadow (1:3174)  80×80 円  影担体（透明地・shadow-md）
  │       └ Component 1 (1:3175)     40×40  白線アイコン（中央 inset 20,20）
  ├ Heading 3:margin (1:3176)  H3ラッパ  pb12
  │   └ Heading 3 (1:3177) → text (1:3178)  lh24  見出し
  └ Container (1:3179) → text (1:3180)  2行説明文  lh24
```

- ステップ幅 188.8px は **均等5分割の自然値**（1152 − 矢印4本×20 − gap8本×16）/5 = (1152−80−128)/5 = 188.8。固定指定ではなく flex 等分の結果。
- 矢印枠 (Arrow) は高さ128で、内部 chevron(20×20) は枠内 y=54（＝バッジ中心の高さに合わせて縦中央寄せ）。実質「番号(48) + バッジ上半分(40) ≒ y=54〜74」付近。実装上は**番号行の下・バッジの垂直中央**に矢印を置く。
- 要素間の縦間隔は各ブロックの `pb`（padding-bottom）で作る: 番号→バッジ間 pb16、バッジ→H3間 pb24、H3→説明文間 pb12。

---

## テキスト（一字一句／改変禁止）

### 見出しブロック

| node | 役割 | テキスト |
|---|---|---|
| 1:3163 | アイブロウ（英） | `FLOW` |
| 1:3165 | 見出し（和・H2） | `ご相談からご契約までの流れ` |

### 5ステップ（番号・見出し・説明文）

| Step | 番号 node | 番号 | 見出し node | 見出し | 説明 node | 説明文（⏎=`<br>`） |
|---|---|---|---|---|---|---|
| 01 | 1:3171 | `01` | 1:3178 | `お問い合わせ` | 1:3180 | `まずはお気軽に`⏎`お問い合わせください。` |
| 02 | 1:3186 | `02` | 1:3193 | `ヒアリング` | 1:3195 | `お客様のご希望や状況を`⏎`丁寧にお伺いします。` |
| 03 | 1:3201 | `03` | 1:3208 | `ご提案` | 1:3210 | `最適なプランや解決策を`⏎`ご提案いたします。` |
| 04 | 1:3216 | `04` | 1:3223 | `ご契約` | 1:3225 | `内容にご納得いただいた上で、`⏎`ご契約となります。` |
| 05 | 1:3231 | `05` | 1:3238 | `アフターフォロー` | 1:3240 | `ご契約後も長期的にサポート`⏎`いたします。` |

- **強制改行（`<br>`）**: 各ステップの説明文に1か所ずつ（計5か所）。上表の `⏎` 位置で必ず改行。Figma上は2つの `<p>`（1行目 mb0 / 2行目）として分割されており、明示的な改行（折返し依存ではない）。
- Step04 の説明1行目末尾は読点「、」付き（`内容にご納得いただいた上で、`）。他ステップの1行目に句読点なし。一字一句注意。
- 矢印（chevron）はテキストではなくSVGアイコン（後述アセット）。

---

## スタイル

### セクション背景
- セクション背景色: **`#ffffff`**（白ベタ。背景画像なし）
- セクション border: なし

### アイブロウ「FLOW」(1:3163)
- font-family: **Noto Serif JP** / weight Regular(400)
- font-size: **12px** / line-height: **16px**
- letter-spacing: **2.4px**
- color: **`#c8a97e`**（Tan / ゴールド薄め）
- text-align: left（左寄せ。見出しブロックは items-start）

### 見出し「ご相談からご契約までの流れ」(1:3165 / H2)
- font-family: **Noto Serif JP** / weight Regular(400)
- font-size: **30px** / line-height: **36px**
- letter-spacing: **0.75px**
- color: **`#131c30`**（Big Stone / ネイビー）
- text-align: left
- 親 Heading 2 (1:3164) に padding-bottom 12px

### 横罫 Horizontal Divider (1:3166)
- 40×2px / background **`#c8a97e`**（Tan）/ 左寄せ（装飾レイヤー）

### ステップ番号「01」〜「05」(1:3171 等)
- font-family: **Noto Serif JP** / weight Regular(400)
- font-size: **24px** / line-height: **32px**
- letter-spacing: **0**
- color: **`#c8a97e`**（Tan / ゴールド薄め）
- text-align: center

### 円形バッジ Background (1:3173 等)
- 形状: 円（border-radius 9999px / 完全な円）
- サイズ: **80×80px**
- 背景色: **`#131C30`**（Big Stone / ネイビー）
- box-shadow（Overlay+Shadow 1:3174 由来）: **`0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)`**（Tailwind shadow-md 相当）
- 内側アイコン: 40×40 / バッジ中央（inset 20,20）/ 白線アイコン（後述アセット）

### バッジ内アイコン (Component 1, 1:3175 等)
- サイズ: **40×40px**（viewBox 0 0 40 40）
- 描画: **白線アイコン**（stroke `#ffffff` / stroke-width 2 / round cap・join、塗りなし fill:none）
- 5ステップで絵柄が異なる（01封筒 / 02クリップボード / 03人物グループ / 04ペン / 05ハート）

### ステップ見出し H3 (1:3178 等)
- font-family: **Noto Sans JP** / weight Bold(700)
- font-size: **16px** / line-height: **24px**
- letter-spacing: **0.4px**
- color: **`#131c30`**（Big Stone / ネイビー）
- text-align: center

### ステップ説明文 (1:3180 等)
- font-family: **Noto Sans JP** / weight Regular(400)
- font-size: **12px** / line-height: **24px**
- letter-spacing: **0**
- color: **`#374151`**（Oxford Blue / グレー）
- text-align: center
- 2行（`<br>`で改行）

### 矢印 chevron (Arrow / Component 1, 1:3182 等)
- サイズ: **20×20px**（viewBox 0 0 20 20）
- 描画: chevron-right（`>` 形）/ stroke **`#C8A97E`**（Tan / ゴールド）/ stroke-width 1.66667 / round cap・join / fill:none
- 配置: ステップ間。枠は20×128で、内部 chevron はバッジの垂直中央（枠内 y=54付近）に縦中央寄せ

---

## 装飾レイヤー

| 要素 | node | 配置 | サイズ | 色 | 備考 |
|---|---|---|---|---|---|
| Horizontal Divider（横罫） | 1:3166 | 見出し下・左寄せ | 40×2px | `#c8a97e`（Tan） | 見出しブロック末尾の短い横線。装飾レイヤー扱い |
| Overlay+Shadow（バッジ影層） | 1:3174 ほか各ステップ | バッジ全面 inset-0 | 80×80円 | 地は `rgba(255,255,255,0)`（透明） | box-shadow 担体。背景透明・影のみ。バッジの drop-shadow として再現（shadow-md） |
| バッジ本体 Background | 1:3173 ほか | ステップ中央 | 80×80円 | `#131C30`（ネイビー） | 影の上に乗る本体。影は本体と同寸の別レイヤー |
| 矢印 chevron | 1:3182 ほか | ステップ間 | 20×20（枠20×128） | `#C8A97E`（Tan） | ステップを左→右につなぐ。装飾兼ナビゲーション |

注:
- バッジは「影レイヤー(1:3174・透明地)」＋「本体(1:3173・ネイビー)」の2枚構成だが、実装上は**1枚のネイビー円に box-shadow を付与**すれば等価に再現できる。
- 番号「01」とアイブロウ「FLOW」と横罫は同じ Tan `#c8a97e`。バッジ本体と見出し類は Big Stone `#131c30`。2色の使い分けに注意。

---

## アセット（guid確認済み）

WPメディアライブラリ取込済み（コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート8918）。**guidは実取得値（推測禁止・下記がそのまま）**。

| ファイル | 用途 | 形式 | サイズ | 色 | 添付ID | guid（実URL） |
|---|---|---|---|---|---|---|
| flow-icon-01-mail.svg | Step01 封筒（メール） | SVG | 40×40 | 白線 stroke #ffffff | **56** | `http://localhost:8918/wp-content/uploads/2026/06/flow-icon-01-mail.svg` |
| flow-icon-02-clipboard.svg | Step02 クリップボード（チェックリスト） | SVG | 40×40 | 白線 stroke #ffffff | **57** | `http://localhost:8918/wp-content/uploads/2026/06/flow-icon-02-clipboard.svg` |
| flow-icon-03-people.svg | Step03 人物グループ | SVG | 40×40 | 白線 stroke #ffffff | **58** | `http://localhost:8918/wp-content/uploads/2026/06/flow-icon-03-people.svg` |
| flow-icon-04-pen.svg | Step04 ペン（編集） | SVG | 40×40 | 白線 stroke #ffffff | **59** | `http://localhost:8918/wp-content/uploads/2026/06/flow-icon-04-pen.svg` |
| flow-icon-05-heart.svg | Step05 ハート | SVG | 40×40 | 白線 stroke #ffffff | **60** | `http://localhost:8918/wp-content/uploads/2026/06/flow-icon-05-heart.svg` |
| flow-arrow.svg | ステップ間 chevron（→） | SVG | 20×20 | ゴールド stroke #C8A97E | **61** | `http://localhost:8918/wp-content/uploads/2026/06/flow-arrow.svg` |

ローカル保存先: `design-data/27/sections/05_FLOW/assets/`（clean版・WP取込済みファイル）。
Figma生エクスポート（ページフレーム混入版）は `assets/raw/` に保管。

### アセット取込メモ（重要・後工程注意）
- Figma の `download_assets`（svg）は**ノード単体ではなくページフレーム全体を含むSVG**を吐く（巨大な off-canvas rect / `#F5F5F5` 地・`#5A5A5A` 枠が混入）。そのままでは使えないため、**各SVGの末尾 `<path id="Vector">`（実アイコンパス）だけを抽出して clean な単体SVGに作り直した**（viewBox 40×40 / 20×20、塗りなし、stroke指定のみ）。WP取込・実装にはこの clean 版を使うこと。
- この環境はデフォルトで **SVGアップロード不可**（`wp media import` が「このファイルタイプをアップロードする権限がありません」で拒否）。取込のため、コンテナ内 `wp-content/mu-plugins/tmp-allow-svg.php` に `upload_mimes` + `wp_check_filetype_and_ext` フィルタを追加して許可した（追加のみ・破壊操作なし）。**ホスト側 mu-plugins には未反映**（コンテナ内のみ）。本番/再構築時に SVG を再取込する場合は同フィルタが必要。

---

## インタラクション台帳

| 要素 | 種別 | 挙動 |
|---|---|---|
| ステップ全体（5枚） | 静的表示 | リンク・ホバー・アニメーション指定なし（Figmaに prototype 未設定）。**要ユーザー確認**: スクロールでの順次フェードイン等のアニメを付けるか |
| 矢印 chevron（4本） | 静的装飾 | ステップ間の視覚的つなぎ。リンクなし |
| 円形バッジ | 静的 | ホバー演出指定なし。**要ユーザー確認**: ホバーで色反転/拡大等を入れるか |

- 全体としてリンク・遷移は**なし**（このセクションは説明表示のみ）。
- アニメーション/ホバー演出の有無は Figma に情報がないため **要ユーザー確認**。

---

## 正規化記録（生値 → 正規値）

スナップ基準: 4/8pxグリッド。ページ標準: コンテンツ幅1152px(中央寄せ/左右144px・デザイン幅1440) / 見出しNoto Serif JP・本文Noto Sans JP / 配色 ネイビー#0a192f・#1e2c5b / ゴールド#c5a059 / 白#ffffff / グレー#e5e7eb。

| 項目 | 生値（Figma） | 正規値 | 備考 |
|---|---|---|---|
| セクション padding 上下 | 96px | **96px** | 8pxグリッド一致 |
| セクション padding 左右 | 80px | **80px** | 8pxグリッド一致。内側Container px64と合算で片側144（ページ標準余白） |
| Container max-width | 1280px | **1280px** | 内側px64で実効1152。ページ標準コンテンツ幅と一致 |
| Container 内 padding 左右 | 64px | **64px** | グリッド一致 |
| 見出しブロック↔ステップ行 gap | 64px | **64px** | グリッド一致 |
| 見出しブロック内 gap | 12px | **12px** | 4pxグリッド一致 |
| H2 padding-bottom | 12px | **12px** | グリッド一致 |
| ステップ間 gap | 16px | **16px** | グリッド一致 |
| ステップ幅 | 188.8px | **均等5分割（≒188.8）** | 固定でなく flex 等分。実装は flex:1 等分で再現 |
| 円形バッジ | 80×80 | **80×80** | グリッド一致 |
| バッジ内アイコン | 40×40 | **40×40** | グリッド一致 |
| 矢印アイコン | 20×20 | **20×20** | グリッド一致 |
| 番号→バッジ pb | 16px | **16px** | グリッド一致 |
| バッジ→H3 pb | 24px | **24px** | グリッド一致 |
| H3→説明文 pb | 12px | **12px** | グリッド一致 |
| 横罫 | 40×2px | **40×2px** | グリッド一致 |
| アイブロウ | 12/16 ls2.4 | **12 / 16 / 2.4** | グリッド一致 |
| H2見出し | 30/36 ls0.75 | **30 / 36 / 0.75** | グリッド一致 |
| 番号 | 24/32 | **24 / 32** | グリッド一致 |
| H3 | 16/24 ls0.4 | **16 / 24 / 0.4** | グリッド一致 |
| 説明文 | 12/24 | **12 / 24** | グリッド一致 |

### 配色のページ標準との差異（実装時の判断ポイント）
| 用途 | このセクションの実値 | ページ標準 | 判断 |
|---|---|---|---|
| ゴールド（アイブロウ/番号/横罫/矢印） | `#c8a97e`（Tan） | `#c5a059` | **実値 `#c8a97e` を採用**（薄め Tan。06_CONTACT の横罫と同値） |
| ネイビー（見出し/H3/バッジ） | `#131c30`（Big Stone） | `#0a192f` / `#1e2c5b` | **実値 `#131c30` を採用**（標準2色のいずれとも別の暗ネイビー） |
| 説明文グレー | `#374151`（Oxford Blue） | `#e5e7eb` | **実値 `#374151` を採用**（標準より大幅に暗い。白背景上の本文色） |
| 白背景 | `#ffffff` | `#ffffff` | 一致 |

---

## 検証用設計値

後工程がフロント計測値と突合するための正規値一覧。

### セクション（loos/full-wide → 内側 UB）
| 項目 | 設計値 | 突合対象 |
|---|---|---|
| 背景色 | `#ffffff` | section background-color |
| 内側コンテナ max-width | 1152px（実効） | inner UB max-width |
| 内側 padding | 上下96 / 左右（外80+内64で実効片側144） | section/inner padding |
| 見出しブロック↔ステップ行 gap | 64px | inner gap |

### アイブロウ「FLOW」(core/paragraph)
| 項目 | 設計値 |
|---|---|
| font-family / weight | Noto Serif JP / 400 |
| font-size / line-height | 12px / 16px |
| letter-spacing | 2.4px（=0.2em） |
| color | `#c8a97e` |
| text-align | left |

### 見出し (core/heading h2)
| 項目 | 設計値 |
|---|---|
| font-family / weight | Noto Serif JP / 400 |
| font-size / line-height | 30px / 36px |
| letter-spacing | 0.75px（=0.025em） |
| color | `#131c30` |
| text-align | left |

### 横罫 (flavor/universal-block)
| 項目 | 設計値 |
|---|---|
| width × height | 40px × 2px |
| background | `#c8a97e` |
| 配置 | 左寄せ（justify start） |

### ステップ（5枚・横並び flex 等分）
| 項目 | 設計値 |
|---|---|
| ステップ間 gap | 16px |
| ステップ幅 | flex 等分（≒188.8px・固定指定しない） |
| 縦並び | flex-col / items-center |

### ステップ番号 (core/paragraph or heading)
| 項目 | 設計値 |
|---|---|
| font-family / weight | Noto Serif JP / 400 |
| font-size / line-height | 24px / 32px |
| color | `#c8a97e` |
| text-align | center |
| 下余白 | padding-bottom 16px |

### 円形バッジ (flavor/universal-block + core/image アイコン)
| 項目 | 設計値 |
|---|---|
| サイズ | 80×80px |
| border-radius | 9999px（円） |
| background | `#131C30` |
| box-shadow | `0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)`（要CSS・下記） |
| 内側アイコン | 40×40 SVG（白線）/ 中央寄せ |
| 下余白 | padding-bottom 24px |

### ステップ見出し (core/heading h3)
| 項目 | 設計値 |
|---|---|
| font-family / weight | Noto Sans JP / 700 |
| font-size / line-height | 16px / 24px |
| letter-spacing | 0.4px（=0.025em） |
| color | `#131c30` |
| text-align | center |
| 下余白 | padding-bottom 12px |

### ステップ説明文 (core/paragraph)
| 項目 | 設計値 |
|---|---|
| font-family / weight | Noto Sans JP / 400 |
| font-size / line-height | 12px / 24px |
| letter-spacing | 0 |
| color | `#374151` |
| text-align | center |
| 改行 | `<br>` 1か所（上表「テキスト」の⏎位置） |

### 矢印 (core/image SVG)
| 項目 | 設計値 |
|---|---|
| サイズ | 20×20px |
| ソース | flow-arrow.svg（ID61） |
| 配置 | ステップ間・垂直中央（バッジ中心の高さ） |

### 要CSS（属性で表現不可・後工程でカスタムCSS対応が要る箇所）
1. **バッジ box-shadow** — `0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)`（shadow-md 相当）。flavor/universal-block の shadow Extension で再現できればそれを優先。Extensionで不可なら swell-meta-css.css で円バッジに付与。
2. **矢印の縦位置** — ステップ列とは独立に、矢印をバッジ中心の高さ（番号行の下）に縦中央寄せする必要がある。横並び flex で各列の高さが揃えば items-center で吸収可だが、番号〜説明文の縦リズムと矢印高さがずれる場合はCSSで top 調整。

### 注記
- アイコンは白線SVG・バッジはネイビー円。**SVGアップロードはこの環境では既定で不可**（取込のため mu-plugin で許可済み・コンテナ内のみ）。本番でも SVG を使うなら mime 許可が前提。
- ゴールドは2用途とも `#c8a97e`（Tan）で統一。ネイビーは `#131c30`（Big Stone）。ページ標準色（#c5a059 / #0a192f / #1e2c5b）とは別値なので**実値優先**。
- 説明文の改行は明示的（Figmaで2 `<p>`分割）。折返し任せにせず `<br>` を入れる。Step04 のみ1行目末尾に読点「、」あり。

---

## 検証用設計値（tree.js 構築記録 — 2026-06-16）

`05_FLOW/tree.js`（ブロックツリーJSON）構築時の属性マッピングと判断。

### ブロック構成（ルート className:'sec-flow'）
- `loos/full-wide`(className:'sec-flow' / bgColor:'#ffffff' / pcPadding:'0' / spPadding:'0')
  - `flavor/universal-block`「FLOW Inner」(column・center・maxWidth1152・padding上下96/左右16・margin auto・gap64)
    - 見出しブロック `flavor/universal-block`「Section Title」(column・items-start・gap12)
      - `core/paragraph` FLOW（アイブロウ）
      - `core/heading` h2 ご相談からご契約までの流れ
      - `flavor/universal-block`「Divider」(40×2・gold)
    - ステップ行 `flavor/universal-block`「Flow Steps」(row・justify center・items-start・gap16)
      - step×5（各：column・center・flexShorthand:'1'・sizeMinWidth:'0'）＝ 番号 `core/paragraph` / バッジラッパ `flavor/universal-block`(badge円) / `core/heading` h3 / 説明 `core/paragraph`
      - 矢印×4 `core/image`（ID61・flow-arrow.svg・marginTop:46px）をステップ間に挿入

### 円形バッジの属性マッピング
| 設計値 | 属性 |
|---|---|
| 80×80 | `sizeWidth:'80'px` / `sizeHeight:'80'px` |
| 円（border-radius） | `customBorderRadius:{topLeft:'40',topRight:'40',bottomRight:'40',bottomLeft:'40'}` / `customBorderRadiusUnit:'px'`（40px×4＝80px正円） |
| bg #131c30 | `style.color.background:'#131c30'` |
| box-shadow shadow-md | **`boxShadow:'m'`（属性で表現可）** |
| 中央アイコン40×40 | 子 `core/image`(width/height 40px・該当ID) |

### box-shadow は属性で表現可（要CSS不要）
- datapack要CSS#1の「shadow Extensionで再現できれば優先」に従い検証。
- `flavor/universal-block` の shadow Extension（`themes/swell_child/inc/extensions/block-shadow.php` → `flavor_ub_get_shadow_css`）のプリセット `'m'` = `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)` で、**datapack実値の shadow-md と完全一致**。
- よって `boxShadow:'m'` 属性で表現済み。**バッジ影は要CSS対象外**（プロンプト想定の「属性不可」は当環境では不成立）。

### letterSpacing 換算
- アイブロウ 2.4px → `0.2em`（12px基準）／H2 0.75px → `0.025em`（30px基準）／H3 0.4px → `0.025em`（16px基準）。

### 残課題・確認事項
- **要CSS（1件）: 矢印の縦位置** — 矢印を「番号行の下・バッジ垂直中央」に置くため `core/image` に `style.spacing.margin.top:'46px'` で暫定調整。番号(48)＋バッジ上半分(40)に対する近似値。フロント計測で番号フォントの実高さによりズレる場合は `swell-meta-css.css` で `.sec-flow` 内の矢印 margin-top 微調整が要る（属性で完結するなら不要）。
- **要スキーマ確認**: `core/image` の `style.spacing.margin.top` がこの環境の core/image で有効か（コア標準属性。サポート前提だが未検証）。無効なら矢印縦位置は要CSSへ降格。
- ステップ幅は `flexShorthand:'1'` + `sizeMinWidth:'0'` で5等分（固定188.8pxは指定しない＝datapack方針通り）。
