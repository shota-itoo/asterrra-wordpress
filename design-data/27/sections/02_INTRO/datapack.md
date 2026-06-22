# 02_INTRO — Introduction セクション データパック

- **Figma**: file `eZFYBaJDAN0PLLd7ITdvLR` / node `1:3029`（"Introduction Section"）
- **デザイン幅**: 1440px（フレーム x=0, y=650, w=1440, h=592）
- **対象ページ**: サービス内容ページ（post_id 27）
- **WPコンテナ**: `wp-env-asterrra-wordpress-b07ac4e0-cli-1`（port 8918）
- **screenshot**: `design.png`（1440×592）

---

## 1. レイアウト骨格

セクション全体は「白背景のセクション」の中に、左寄せの **薄グレー背景パネル（装飾レイヤー）** が敷かれ、その上に左カラム（テキスト）＋右カラム（画像）の2カラムが乗る構造。

### 階層（Figma生座標 = フレーム1:3029内の相対座標）

```
Introduction Section (1:3029)         x=0   y=650(canvas) w=1440 h=592   bg=#ffffff  padding: 上下96px / 左右80px
├─ Background+Border (1:3030) 【装飾】 x=0   y=62   w=1180 h=465  ← セクション左上から敷かれる背景パネル
└─ Container (1:3031)                  x=80  y=96   w=1280 h=400   横並び・中央寄せ(align items center)
   │                                   gap=64px / 内側padding 左右64px / max-width 1280px
   ├─ 左 Container (1:3032)            x=64  y=11   w=544  h=378   縦積み(flex col) / flex:1 / gap=16px
   │  ├─ Container (1:3033)            x=0   y=0    w=544  h=16    ← ラベル行ラッパー
   │  │  └─ text INTRODUCTION (1:3034) x=0   y=0    w=544  h=16
   │  ├─ Heading 2 (1:3035)           x=0   y=32   w=544  h=44    pb=8px
   │  │  └─ text H2 (1:3036)          x=0   y=0    w=544  h=36
   │  ├─ Horizontal Divider (1:3037)  x=0   y=92   w=40   h=2     ← 横罫
   │  └─ Paragraph (1:3038)           x=0   y=110  w=544  h=268   縦積み / gap=28px / pt=16px
   │     ├─ text 段落1 (1:3039)       x=0   y=16   w=385  h=56
   │     ├─ text 段落2 (1:3040)       x=0   y=100  w=515  h=84
   │     └─ text 段落3 (1:3041)       x=0   y=212  w=429  h=56
   └─ 右 Container (1:3042)            x=672 y=0    w=544  h=400   flex:1
      └─ Modern Apartment Building     x=0   y=0    w=544  h=400   drop-shadow付き 画像ボックス
         (1:3043)
```

### カラム配置の要点

- 内側コンテナ 1:3031 は `max-width:1280px` + 横padding64px の中で、左右2カラムを `gap:64px` で並べ、`flex:1 0 0`（左右等幅 = 各544px）。
- 中身の有効幅 = 1280 − 64×2(padding) − 64(gap) = 1088 → 2分割で各544px。
- 左カラム内の縦リズム: ラベル → (16gap) → H2(下pb8) → (16gap) → 罫(40×2) → (16gap) → 本文ブロック(上pt16, 段落間28gap)。
- 右カラム画像は544×400、`object-fit:cover`相当でクロップ表示（元画像は縦長800×1067 → 表示枠で上下クロップ）。

---

## 2. テキスト（一字一句／get_design_context 実テキスト）

> 強制改行 = ⏎（= `<br>`）。下記の段落内 ⏎ は Figma 上でテキストが折り返し位置に入れている改行（whitespace-nowrap 指定 = 自動折返しでなく手動改行）。

### ラベル（1:3034）
```
INTRODUCTION
```

### 見出し H2（1:3036）
```
不動産は、未来をつくる資産。
```

### 本文 段落1（1:3039）
```
私たちは、不動産を単なる「物件」ではなく、⏎
お客様の未来を形づくる大切な資産であると考えています。
```

### 本文 段落2（1:3040）
```
住まいの購入や売却、資産形成、相続対策、賃貸経営など、⏎
さまざまな選択においてお客様一人ひとりの想いや将来設計に寄り添いながら、⏎
最適なご提案を行います。
```

### 本文 段落3（1:3041）
```
目先の利益だけではなく、⏎
その先にある未来を見据えた価値あるサポートを提供いたします。
```

注: 本文は段落間に1行空き（gap 28px）。⏎ は各段落内部の手動改行（3行 / 3行 / 2行）。

---

## 3. スタイル

### ラベル「INTRODUCTION」（1:3034）
| 項目 | 値 |
|---|---|
| font-family | Noto Serif JP（font 2）/ Regular |
| font-weight | 400 |
| font-size | 12px |
| line-height | 16px |
| letter-spacing | 2.4px |
| color | `#c8a97e`（ゴールド／タン）※ページ標準ゴールド `#c5a059` と差異あり → 正規化記録参照 |
| text-transform | デザイン上は全大文字（原文も大文字入力） |

### 見出し H2（1:3036）
| 項目 | 値 |
|---|---|
| font-family | Noto Serif JP（font 2）/ Regular |
| font-weight | 400 |
| font-size | 30px |
| line-height | 36px |
| letter-spacing | 0 |
| color | `#131c30`（Big Stone ネイビー）※ページ標準ネイビー `#0a192f`/`#1e2c5b` と差異あり |
| 下方向余白 | ラッパー Heading2 に pb=8px |

### 横罫 Horizontal Divider（1:3037）
| 項目 | 値 |
|---|---|
| width × height | 40 × 2 px |
| 形状 | rounded-rectangle（角丸矩形・実質バー） |
| 色（fill） | `#c8a97e`（ゴールド／タン、ラベルと同色） |

### 本文 Paragraph（1:3038 / 1:3039-1:3041）
| 項目 | 値 |
|---|---|
| font-family | Noto Sans JP（font 1）/ Light |
| font-weight | 300 |
| font-size | 14px |
| line-height | 28px |
| letter-spacing | 0.35px |
| color | `#1f2937`（Ebony Clay）※ページ標準グレー `#e5e7eb` ではなく濃いグレーネイビー本文色 |
| 段落間 gap | 28px |
| ブロック上 padding | 16px（pt-16） |

### セクション・コンテナ余白
| 対象 | 値 |
|---|---|
| セクション 1:3029 padding | 上下 96px / 左右 80px |
| セクション背景 | `#ffffff`（白） |
| コンテナ 1:3031 | max-width 1280px / 左右 padding 64px / gap 64px / align-items:center |
| 左右カラム gap | 64px |
| 左カラム内 gap | 16px |

---

## 4. 装飾レイヤー

### Background+Border（1:3030）
| 項目 | 値 |
|---|---|
| 役割 | セクション左側に敷かれる **背景パネル**（カードの下地）。テキスト＋画像の背後に位置 |
| 位置（セクション内相対） | x=0, y=62, w=1180, h=465 |
| 塗り（fill / bg） | `#f2f2f2`（Concrete・薄グレー） |
| ボーダー | solid 1px / 色 `#f2f2f2`（塗りと同色 = 実質枠線は視認されないフラットパネル） |
| 重なり | セクション左端から始まり右端には届かない（幅1180 < 1440）。右カラム画像はパネル右端をはみ出して前面に浮く（画像に drop-shadow） |
| z順 | テキスト・画像より背面（最初に配置 = 一番下） |

→ WP実装上は「セクション内に absolute 配置の背景矩形」または「左カラム側に背景色を持つラッパー」。**コンテンツ配置ではなく装飾**として扱う（座標・サイズ・色のみ記録、レイアウトはコンテンツ側で組む）。

### 右画像の drop-shadow（1:3043 に付与）
- `box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`（Tailwind `shadow-lg` 相当）

---

## 5. アセット（guid 確認済み）

| 用途 | ファイル | 寸法 | WP attachment ID | 実URL（guid・確認済み） |
|---|---|---|---|---|
| 右カラム メイン画像（Modern Apartment Building） | `intro-modern-apartment-building.png` | 544×400（表示クロップ後） | **33** | `http://localhost:8918/wp-content/uploads/2026/06/intro-modern-apartment-building.png` |

#### アセット処理メモ
- Figma node 1:3043 を `download_assets` で取得。
  - export 版（568×424・PNG）= ノード描画（drop-shadow のパディング込み）
  - raw 元画像（800×1067・PNG・縦長ポートレート）= 表示枠で上下クロップされる前のソース
- WP用には export からシャドウのパディング（各12px）を ffmpeg で `crop=544:400:12:12` し、**表示と同じ 544×400 クロップ**の `intro-modern-apartment-building.png` を生成 → これを import。
- `wp media import --porcelain` → ID=33 → `wp post list ... --fields=ID,guid` で実URL確認（推測なし）。
- 参考保存（import 対象外）: `intro_apartment_export.png`（568×424）, `intro_apartment_raw.png`（800×1067）も同フォルダに残置。

---

## 6. インタラクション台帳

| 要素 | 想定インタラクション | 確定状況 |
|---|---|---|
| セクション全体 | scroll reveal（フェードイン等）の有無 | **要ユーザー確認**（Figma静止デザインからは判別不能） |
| 右画像 | hover でのズーム/拡大の有無 | **要ユーザー確認**（drop-shadow は静的指定。hover演出は不明） |
| ラベル/見出し/本文/罫 | リンク・クリック挙動 | なし（プレーンテキスト＋装飾バー。リンク指定なし） |
| Background+Border パネル | 視差/スクロール連動 | **要ユーザー確認**（静止デザインでは判別不能） |

→ 動き・ホバー演出はデザインデータに含まれないため、実装時に方針を確認すること。

---

## 7. 正規化記録（スナップ / 生値 → 正規値）

### グリッドスナップ（4/8pxグリッド）
| 項目 | 生値(Figma) | 正規値 | メモ |
|---|---|---|---|
| セクション padding 上下 | 96 | 96 | 8の倍数 そのまま |
| セクション padding 左右 | 80 | 80 | 8の倍数 そのまま |
| コンテナ max-width | 1280 | 1280 | 8の倍数 |
| コンテナ内 padding 左右 | 64 | 64 | 8の倍数 |
| カラム gap | 64 | 64 | 8の倍数 |
| 左カラム内 gap | 16 | 16 | 8の倍数 |
| H2 下 pb | 8 | 8 | 8の倍数 |
| 本文ブロック上 pt | 16 | 16 | 8の倍数 |
| 段落間 gap | 28 | 28 | 4の倍数（8非整合だが原値維持） |
| 横罫 | 40×2 | 40×2 | 4/8の倍数 |
| 画像枠 | 544×400 | 544×400 | 8の倍数 |
| 背景パネル | 1180×465 | 1180×465 | w=8非整合(1180), h=465(奇数) → 装飾につき**原値維持** |
| 背景パネル top | 62 | 62 | 装飾オフセット → 原値維持 |

### コンテンツ幅とページ標準の関係
- ページ標準: コンテンツ幅 **1152px**（中央寄せ・左右144px・デザイン幅1440）。
- このセクションの実コンテンツ有効幅 = コンテナ1280 − padding64×2 = **1152px**（= 左右544 + gap64）。**ページ標準1152と一致**。
- ただしセクション自体の左右 padding は 80px（外枠）、その内側のコンテナが max-width1280 + padding64 で 1152 を作る入れ子構造。WP実装ではページ標準の1152コンテナに、左右544カラム + gap64 を落とし込めばよい。

### 配色: Figma実値 ⇔ ページ標準トークンの差異（実装時に要すり合わせ）
| 役割 | Figma実値 | ページ標準トークン | 判定 |
|---|---|---|---|
| ゴールド（ラベル・罫） | `#c8a97e` | `#c5a059` | 近いが別値。**要ユーザー確認**（どちらを正とするか） |
| ネイビー（H2） | `#131c30` | `#0a192f` / `#1e2c5b` | 別値（やや明るめネイビー）。要すり合わせ |
| 本文色 | `#1f2937` | （標準グレー `#e5e7eb` は罫/枠用） | 本文はグレーではなく濃色 `#1f2937` を使用 |
| 背景パネル | `#f2f2f2` | （標準に薄グレー面トークン未定義） | Concrete `#f2f2f2` |
| セクション背景 | `#ffffff` | 白 `#ffffff` | 一致 |

→ フォントはページ標準どおり：見出し Noto Serif JP / 本文 Noto Sans JP で一致。色はFigma実値が標準トークンと微差。**Figma実値を一次情報として記録**し、最終採用色は実装フェーズでユーザー確認推奨。

---

## 検証用設計値

`tree.js`（ルート `loos/full-wide` className=`sec-intro`）に落とした属性値の一覧。実機シリアライズ後の計測突合に使う。

### セクション / コンテナ
| 対象 | 属性 | 採用値 |
|---|---|---|
| セクション `loos/full-wide` | bgColor / contentSize / pcPadding / spPadding / className | `#ffffff` / `full` / `0` / `0` / `sec-intro` |
| コンテナ UB | layoutDirection / Justify / Align | `row` / `center` / `center` |
| コンテナ UB | sizeWidth / sizeMaxWidth | `100%` / `1152px` |
| コンテナ UB | spacingGap | `64px` |
| コンテナ UB | spacingPadding（py96 / px32※外枠80→1152コンテナ化のため左右はpx32） | `{96,32,96,32}px` Linked:false |
| コンテナ UB | spacingMargin | `{0,auto,0,auto}px` Linked:false |

> 補足: datapackのセクション外枠padding左右80px + 内側コンテナmax1280+padding64 の入れ子は、ページ標準どおり「max-width1152コンテナに左右544カラム+gap64」へ正規化（§7 一致記録に従う）。コンテナ左右paddingはページ標準の`px32`を採用。

### 左カラム（テキスト）
| 要素 | 属性 | 採用値 |
|---|---|---|
| 左カラム UB | direction / align / flexShorthand / gap | `column` / `flex-start` / `1`(=flex:1) / `16px` |
| ラベル `core/paragraph` | color / font / size / weight / lineHeight / letterSpacing | `#c8a97e` / Noto Serif JP / `12px` / `400` / `16px` / `0.2em`(2.4px) |
| H2 `core/heading`(is-style-section_ttl) | color / font / size / weight / lineHeight / letterSpacing / pb | `#131c30` / Noto Serif JP / `30px` / `400` / `36px` / `0` / padding-bottom`8px` |
| 横罫 UB | sizeWidth / sizeHeight / bg | `40px` / `2px` / `#c8a97e` |
| 本文ラッパー UB | direction / gap / pt | `column` / `28px` / padding-top`16px` |
| 本文 `core/paragraph`×3 | color / font / size / weight / lineHeight / letterSpacing | `#1f2937` / Noto Sans JP / `14px` / `300` / `28px` / `0.025em`(0.35px) |

本文の手動改行（`<br>`）: 段落1=2箇所(3行) / 段落2=2箇所(3行) / 段落3=1箇所(2行)。テキストはdatapack §2 一字一句。

### 右カラム（画像）
| 要素 | 属性 | 採用値 |
|---|---|---|
| 右カラム UB | direction / flexShorthand | `column` / `1`(=flex:1) |
| `core/image` | id / url / sizeSlug / width / height / scale | `33` / `…/intro-modern-apartment-building.png` / `full` / `544px` / `400px` / `cover` |

### 属性で表現せず CSS に回した項目（tree.js には含めない）
1. **Introパネル（Background+Border #f2f2f2・1180×465・左側背面）** → 要CSS。理由: パネル幅1180pxはコンテンツコンテナ1152pxを超え、かつセクション左端領域へ寄せて敷く**コンテナ外breakout**。中央寄せ1152コンテナ内のabsolute UBでは左端アンカー・幅超過・中央コンテンツ背面のz順を属性で正しく再現できない（misanchor／クリップする）。section全幅基準の擬似要素 or absolute背景矩形で実装。
2. **右画像 drop-shadow（box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1) / shadow-lg）** → 要CSS。理由: core/image にbox-shadow属性が無く、影は属性で出力不可。

### 要ユーザー確認（datapack §6/§7）
- 配色: ゴールド `#c8a97e`(Figma) vs ページ標準 `#c5a059` / ネイビー `#131c30`(Figma) vs 標準 `#0a192f`。本tree.jsは**Figma実値**を採用済み。最終採用色は要すり合わせ。
- インタラクション: セクションscroll reveal / 右画像hoverズーム / パネル視差 の有無（静止デザインからは判別不能）。
