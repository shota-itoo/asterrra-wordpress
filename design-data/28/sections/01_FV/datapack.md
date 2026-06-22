# 28 / 01_FV — NEWS一覧ページ 下層ヒーロー（FV）データパック

- **Figmaファイル**: `eZFYBaJDAN0PLLd7ITdvLR`
- **対象ページ**: NEWS（PC版） `1:4715`（1440×2453）
- **FVセクション高さ**: 450px（下層ページ小型ヒーロー）
- **デザイン幅**: 1440px / コンテンツ幅 1152px（中央寄せ・左右マージン 144px）
- **抽出日**: 2026-06-16

---

## 1. レイアウト骨格

下層ページ用の小型ヒーロー。背景写真の上に navy グラデーションオーバーレイを重ね、その上に左寄せのテキスト群を配置する3層構造。

| 層 | ノード | 役割 | 座標(x,y) | サイズ(W×H) |
|---|---|---|---|---|
| 背景 | `1:4790` FV | 建物写真（フルブリード） | 0, 0 | 1440 × 450 |
| 中間 | `1:4791` Overlay | navy グラデーション（vector・横方向） | 0, 0 | 1440 × 450 |
| 前面 | `1:4792` Container | テキスト群ラッパー | 80, 0 | 1280 × 450 |

### Container 内部（`1:4792`）

- ラッパー: `flex flex-col items-start justify-center`（縦中央寄せ・左揃え）、padding **top 40px / left・right 64px**
- 内側コンテンツ列の実効左端 = x80 + px64 = **x144**（ページ標準 左マージン 144px に一致）、実効幅 = 1280 − 64×2 = **1152px**（ページ標準コンテンツ幅に一致）
- 縦並び要素（上から）。各ブロックは margin（pb）で下方向に間隔を取る:

| 順 | ノード | 要素 | 座標(x,y) | サイズ | 下マージン(pb) |
|---|---|---|---|---|---|
| 1 | `1:4795` | ラベル「NEWS」 | 144, 150 | 1152 × 28 | 16px（親 `1:4793` Margin） |
| 2 | `1:4798` | H1「お知らせ」 | 144, 194 | 1152 × 48 | 24px（親 `1:4796` Heading 1:margin） |
| 3 | `1:4800` | 横罫（gold divider） | 144, 266 | 48 × 2 | 24px（親 `1:4799` Margin、ブロック高 26px） |
| 4 | `1:4802` | サブテキスト（2行） | 144, 292 | 1152 × 48 | — |

> 縦位置の解釈: Container は justify-center だが、上に pt40 があり、要素は y150 から始まる。コンテンツ総高 ≒ 150→340（テキスト下端）で 450px の中で視覚的に中央やや上に収まる。実装では「左マージン144px / 縦中央寄せ / pt40」で再現可能。

---

## 2. テキスト（一字一句・改変禁止）

| ノード | テキスト（正確） | 備考 |
|---|---|---|
| `1:4795` | `NEWS` | 英大文字ラベル |
| `1:4798` | `お知らせ` | H1 見出し |
| `1:4802` 1行目 | `ASTERRA Corporationからの` | ⏎（強制改行 `<br>`） |
| `1:4802` 2行目 | `最新情報をお届けします。` | 末尾に句点「。」あり |

- サブテキストは get_design_context 上で2つの `<p>`（`ASTERRA Corporationからの` / `最新情報をお届けします。`）に分かれており、**強制改行 ⏎（=`<br>`）** が入る。
  - 全文（改行を `⏎` 表記）: `ASTERRA Corporationからの⏎最新情報をお届けします。`
  - ※ レイヤー名 `1:4802` は「ASTERRA Corporationからの 最新情報をお届けします。」と半角スペース区切りで表示されるが、実レンダリングは改行。**実装は `<br>` を採用**。

---

## 3. スタイル

### ラベル「NEWS」 `1:4795`
- font-family: **Noto Serif JP**（Regular / font-2）
- font-weight: 400
- font-size: **20px**
- line-height: **28px**
- letter-spacing: **4px**
- color: **#c8a97e**（Tan / orange-64 = ゴールド系）
- text-align: left

### H1「お知らせ」 `1:4798`
- font-family: **Noto Serif JP**（Regular / font-2）
- font-weight: 400
- font-size: **48px**
- line-height: **48px**
- letter-spacing: **2.4px**
- color: **#ffffff**（white solid）
- text-align: left

### 横罫 `1:4800`（gold divider）
- width: **48px** / height: **2px**
- background-color: **#c8a97e**（orange-64 / ゴールド）

### サブテキスト `1:4802`
- font-family: **Noto Sans JP**（Light / font-1）
- font-weight: 300
- font-size: **16px**
- line-height: **24px**
- letter-spacing: **0.4px**
- color: **rgba(255,255,255,0.9)**（white 90% = #ffffff @ opacity 0.9）
- text-align: left

### 配色まとめ（このFVで実際に使われる色）
| 用途 | 値 | トークン名 |
|---|---|---|
| ラベル / 横罫 | `#c8a97e` | Tan / color/orange/64 |
| H1 | `#ffffff` | White solid |
| サブテキスト | `rgba(255,255,255,0.9)` | White 90% |
| オーバーレイ基色 | `#131c30` | color/azure/13 |

> 注: ページ標準ゴールドは `#c5a059` の指定だが、**このFVの実トークンは `#c8a97e`**（Figma変数 color/orange/64）。差異あり。実装はデザイン実値 `#c8a97e` を採用し、本ページ標準ゴールドとは別系統である旨を記録。
> 見出しフォントは仕様どおり Noto Serif JP、本文は Noto Sans JP で一致。

---

## 4. 装飾レイヤー

### オーバーレイ `1:4791`（vector・横方向グラデーション）
- 種別: 単色塗りではなく **navy の横方向グラデーション**（vector ノード）
- 基色: **#131c30**（ダークネイビー / color/azure/13）
- グラデーション停止点（Figma変数 color/azure/13 のアルファ違い 3点）:
  | 位置 | 色 | 不透明度 |
  |---|---|---|
  | 左端 | `#131c30` @ **0.90**（#131c30e5） | 90% |
  | 中間 | `#131c30` @ **0.60**（#131c3099） | 60% |
  | 右端 | `#131c30` @ **0.00**（#131c3000） | 0%（透明） |
- 方向: **左（濃）→ 右（透明）** の水平グラデーション（左にテキストがあるため左を暗く落として可読性を確保）
- CSS換算（参考）: `linear-gradient(to right, rgba(19,28,48,0.9) 0%, rgba(19,28,48,0.6) ~50%, rgba(19,28,48,0) 100%)`
  - ※ 中間点の正確な位置はFigmaの停止点座標未取得。スクショ観察では左1/3が濃く中央付近で0.6、右端で透明。実装時はスクショ（design.png）と突合して微調整。

### 横罫 `1:4800`
- セクション3に記載（gold 48×2px の装飾ライン、H1とサブテキストの区切り）

---

## 5. アセット（guid 確認済み）

WPメディア取込済み（コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / port 8918）。

| ID | ファイル名 | 実URL（guid・確認済み） | サイズ | 用途 |
|---|---|---|---|---|
| **66** | asterrra-news-fv-bg.png | `http://localhost:8918/wp-content/uploads/2026/06/asterrra-news-fv-bg.png` | 1440×450 | **FV背景写真（表示クロップ済み・推奨）** |
| 67 | asterrra-news-fv-bg-source.png | `http://localhost:8918/wp-content/uploads/2026/06/asterrra-news-fv-bg-source.png` | 1536×1024 | 高解像度オリジナル（再利用/Retina用） |

- ソース: Figma `1:4790` FV ノードの fill 画像（建物の外観写真・青空＋緑＋集合住宅）
- ID66 は FV ノードを表示寸法（1440×450）でエクスポートしたクロップ済みPNG。ヒーロー背景にそのまま使える（オーバーレイは未適用＝CSS側で重ねる）。
- ID67 は同写真のオリジナル全体（1536×1024）。トリミング自由度が必要な場合に使用。
- **オーバーレイ画像アセットは無し**（gradient は CSS で生成・セクション4参照）。

---

## 6. インタラクション台帳

- **このFVにインタラクションは無い。** 静的な下層ヒーロー（ホバー・クリック・アニメーション・リンクなし）。
- パンくず（`1:4716` Breadcrumb→Nav）はFV外（y474〜）の別セクションのため本データパック対象外。

---

## 7. 正規化記録（生値 → 正規値）

スナップ基準: 4/8px グリッド。生値が既に 4/8 の倍数のものは正規値=生値。

| 項目 | 生値（Figma） | 正規値 | 判定 |
|---|---|---|---|
| FV高さ | 450 | 450 | 一致（8の倍数でないが意図的な小型ヒーロー高） |
| Container x | 80 | 80 | 一致 |
| Container padding-top | 40 | 40 | 一致 |
| Container padding-left/right | 64 | 64 | 一致 |
| 実効左端（x144） | 144 | 144 | ページ標準 左マージン 144px に**一致** |
| 実効コンテンツ幅 | 1152 | 1152 | ページ標準コンテンツ幅に**一致** |
| ラベル下マージン | 16 | 16 | 一致 |
| H1 下マージン | 24 | 24 | 一致 |
| 横罫下マージン | 24 | 24 | 一致 |
| 横罫 W×H | 48×2 | 48×2 | 一致 |
| ラベル font-size | 20 | 20 | 一致 |
| ラベル letter-spacing | 4 | 4 | 一致 |
| ラベル line-height | 28 | 28 | 一致 |
| H1 font-size | 48 | 48 | 一致 |
| H1 letter-spacing | 2.4 | 2.4 | 一致（端数・意図的） |
| H1 line-height | 48 | 48 | 一致 |
| サブ font-size | 16 | 16 | 一致 |
| サブ letter-spacing | 0.4 | 0.4 | 一致（端数・意図的） |
| サブ line-height | 24 | 24 | 一致 |

- 縦座標（y150 / y194 / y266 / y292）は margin の積み上げ結果で、grid 丸め不要（margin 値が既に 4/8 系）。
- 色値はトークンの生値をそのまま採用（丸めなし）。

---

## 8. 要確認事項

1. **ゴールドの色差**: ページ標準 `#c5a059` に対し、このFVの実トークンは `#c8a97e`（color/orange/64）。実装はデザイン実値 `#c8a97e` を採用したが、サイト全体でゴールドを統一するか・FV固有色を尊重するか方針確認推奨。
2. **オーバーレイ グラデーション中間停止点の正確な位置**: Figma変数からアルファ3段階（0.9/0.6/0.0）は確定したが、各停止点の x 位置（%）は未取得。実装後 design.png と視覚突合して微調整が必要。
3. **サブテキストの改行**: `<br>` で2行に分割（レイヤー名のスペース区切りではなく実レンダリングの改行を採用）。

---

## 検証用設計値（tree.js 突合シート）

`tree.js` のブロック属性が下記設計値どおりかを後工程で機械突合するための一覧。

### ブロック構成（4要素 + ラッパー + ルート）

| 階層 | ブロック | metadata.name | 主要属性 |
|---|---|---|---|
| ルート | `loos/full-wide` | Sec.FV | bgColor `#131c30` / contentSize `full` / pcPadding `0` / spPadding `0` / className `sec-fv` |
| ラッパー | `flavor/universal-block` | FVラッパー | positionType `relative` / layoutDirection `column` / layoutJustify `center` / layoutAlign `flex-start` / sizeWidth `100%` / sizeMinHeight `450px` / padding {t40,r64,b0,l144}px / 背景画像 ID66 cover center |
| 1 | `core/paragraph` | ラベル_NEWS | content `NEWS` / margin-bottom `16px` |
| 2 | `core/heading` (level1) | 見出し_お知らせ(H1) | content `お知らせ` / className `is-style-section_ttl` / margin-bottom `24px` |
| 3 | `flavor/universal-block` | 横罫_gold_divider | sizeWidth `48px` / sizeHeight `2px` / background `#c8a97e` / margin-bottom `24px` |
| 4 | `core/paragraph` | サブテキスト | content `ASTERRA Corporationからの<br>最新情報をお届けします。` |

### タイポグラフィ実値（fontFamily / size / weight / lineHeight / letterSpacing）

| 要素 | fontFamily | size | weight | lineHeight | letterSpacing | color |
|---|---|---|---|---|---|---|
| ラベル NEWS | `'Noto Serif JP', serif` | 20px | 400 | 28px | `0.2em`（=4px/20） | `#c8a97e` |
| H1 お知らせ | `'Noto Serif JP', serif` | 48px | 400 | 48px | `0.05em`（=2.4px/48） | `#ffffff` |
| サブテキスト | `'Noto Sans JP', sans-serif` | 16px | 300 | 24px | `0.025em`（=0.4px/16） | `rgba(255,255,255,0.9)` |

### 色（実トークン）

| 用途 | 値 | 備考 |
|---|---|---|
| ラベル / 横罫（GOLD） | `#c8a97e` | color/orange/64。ページ標準 `#c5a059` とは別系統（FV固有・採用） |
| H1（WHITE） | `#ffffff` | — |
| サブテキスト（WHITE_90） | `rgba(255,255,255,0.9)` | — |
| ルート地 / オーバーレイ基色（NAVY） | `#131c30` | color/azure/13。fullwide bgColor=写真未読込フォールバック |

### tree.js に含めない（= 要CSS。ページ限定CSSで後対応）

| 項目 | 理由 |
|---|---|
| 背景オーバーレイ（左濃→右透明 navy グラデ） | backgroundImage 拡張の overlay は単色のみ。`linear-gradient(to right, rgba(19,28,48,.9) 0%, rgba(19,28,48,.6) ~50%, rgba(19,28,48,0) 100%)` は属性で表現不可 |
| 見出し / サブテキストの text-shadow | ブロック属性に text-shadow なし |

### 背景画像

- backgroundImageId `66` / URL `http://localhost:8918/wp-content/uploads/2026/06/asterrra-news-fv-bg.png`（1440×450・クロップ済み）/ size `cover` / position `center`
