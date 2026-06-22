# データパック — Section CONTACT (お問い合わせ)

- **Figma**: file `eZFYBaJDAN0PLLd7ITdvLR` / nodeId `1:995` / name `Section - CONTACT`
- **デザイン全体**: 幅1440px / セクション高さ521px / セクション原点 y=4012（フレーム内 x=0, y=4012）
- **設計方針**: フォームではなくCTAボタン1つ。中央寄せの背景セクション。

---

## レイアウト骨格

縦積み・中央寄せ（flex column / items-center）。背景はベタ塗りネイビーで、上端に薄い境界線。

```
Section - CONTACT (1:995)  1440×521  bg #1e2c5b / border-top 1px #020c1b
  padding: top 129 / bottom 128 / left 272 / right 272  (= 上下128px系・左右272px)
  └ Container (1:996)  幅896px(max-width 896) / 高さ264  ← セクション内 x=272, y=129
      内側 padding: 左右16px、gap 8px、items-center
      ├ Heading 2 (1:997)         幅864 / 高さ40   "CONTACT"
      ├ Container (1:999)         幅864 / 高さ34   "お問い合わせ"
      ├ Horizontal Divider (1:1001)  40×2  ゴールド横罫（gap8の流れ内・装飾レイヤー）
      ├ Container (1:1002)        幅864 / 高さ96   本文（padding top32 / bottom40）
      │    └ 本文テキスト (1:1003)  幅432 / 高さ24
      └ Component 7 (1:1004)      278×60  CTAボタン
```

- コンテナ幅: **max-width 896px**（このセクション固有。ページ標準コンテンツ幅1152pxより狭い中央カラム）。さらに内側 px=16px。
- 左右パディング272px は デザイン幅1440 における中央寄せ（1440 − 896 = 544 → 片側272px）。
- 要素間 gap: 8px（Heading群とDivider間など）。本文ブロックは前後に padding top32/bottom40 を持つ。Dividerと本文の上の間隔、本文とボタンの間隔はこのpaddingで作られている。

---

## テキスト（一字一句／改変禁止）

| node | 役割 | テキスト |
|---|---|---|
| 1:998 | 見出し（英） | `CONTACT` |
| 1:1000 | 小見出し（和） | `お問い合わせ` |
| 1:1003 | 本文 | `不動産に関するご相談は、お気軽にお問い合わせください。` |
| I1:1004;1:837 | ボタンラベル | `無料相談はこちら` |
| I1:1004;1:839 | ボタン矢印 | `→` |

- 強制改行（`<br>`）: なし。本文は1行（Figma上 whitespace-nowrap だが実機では折返し許容で可）。

---

## スタイル

### 背景・境界
- セクション背景色: **`#1e2c5b`**（ベタ塗り。背景画像なし）
- セクション上端境界線: **`border-top: 1px solid #020c1b`**（Blue Charcoal）。左右下のborderなし。

### 見出し「CONTACT」(1:998)
- font-family: **Noto Serif JP** / weight SemiBold(600)
- font-size: **36px**
- line-height: **40px**
- letter-spacing: **3.6px**
- color: **`#c5a059`**（ゴールド系・Twine）
- text-align: center

### 小見出し「お問い合わせ」(1:1000)
- font-family: **Noto Sans JP** / weight Regular(400)
- font-size: **12px**
- line-height: **16px**
- letter-spacing: **1.2px**
- text-transform: **uppercase**（CSS指定あり。和文には視覚影響なし）
- color: **`#ffffff`**（白）
- text-align: center
- 親コンテナ(1:999)高さ34px

### 本文 (1:1003)
- font-family: **Noto Sans JP** / weight Regular(400)
- font-size: **16px**
- line-height: **24px**
- letter-spacing: **0**
- color: **`#d1d5db`**（Mischka / グレー = ページ標準グレー#e5e7ebよりやや暗い実値）
- text-align: center
- 親コンテナ(1:1002): padding top 32px / bottom 40px

### CTAボタン Component 7 (1:1004)
- 背景色: **`#c5a059`**（ゴールド系）
- padding: **左右64px / 上下20px**
- gap（ラベル↔矢印）: **16px**
- レイアウト: flex row / items-center / justify-center
- box-shadow: **`0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`**（Tailwind shadow-lg相当。inset-0 のオーバーレイ層 `Link:shadow` 由来）
- 角丸: なし（rounded指定なし＝0）
- ボタン実寸: 278×60px
- ラベル「無料相談はこちら」: Noto Sans JP Bold(700) / 14px / line-height20px / letter-spacing1.4px / 白`#ffffff`
- 矢印「→」: Noto Sans JP Bold(700) / 12px / line-height16px / letter-spacing1.4px / 白`#ffffff`

---

## 装飾レイヤー

| 要素 | node | 座標(Container内) | サイズ | 色 | 備考 |
|---|---|---|---|---|---|
| Horizontal Divider（横罫） | 1:1001 | x=428, y=90 | 40×2px | `#c8a97e`（Tan / ゴールド薄め） | 中央寄せの短い横線。見出し群と本文の間。装飾レイヤー扱い |
| Link:shadow（ボタン影層） | I1:1004;1:836 | inset-0（ボタン全面） | ボタンと同寸 | rgba(255,255,255,0)（透明） | box-shadow担体。背景は透明、影のみ。CTAボタンの drop-shadow として再現 |
| セクション上端境界線 | 1:995 border | 上端全幅 | 1px | `#020c1b` | border-top のみ |

注: 横罫(1:1001)の色は `#c8a97e`（Tan）で、見出し色`#c5a059`とは別の値（薄いゴールド）。混同しないこと。

---

## アセット（guid確認済み）

**アセットなし。**
- 背景画像なし（セクション背景はベタ塗り `#1e2c5b`）。
- アイコン・写真・SVG画像なし（矢印「→」はテキスト文字）。
- download_assets 対象なし → WPメディア取込なし。

---

## インタラクション台帳

| 要素 | 種別 | リンク先 |
|---|---|---|
| CTAボタン「無料相談はこちら →」(1:1004) | リンクボタン | **要ユーザー確認**（Figmaにprototype/href未設定。お問い合わせページ or 無料相談フォームへの想定。実URL未確定） |

---

## 正規化記録（生値 → 正規値）

スナップ基準: 4/8pxグリッド。ページ標準: 見出しNoto Serif JP・本文Noto Sans JP / 配色 ネイビー#0a192f・ゴールド#c2a24c・白#ffffff・グレー#e5e7eb。

| 項目 | 生値（Figma） | 正規値 | 備考 |
|---|---|---|---|
| セクション padding top | 129px | **128px** | 8pxグリッドに丸め |
| セクション padding bottom | 128px | **128px** | グリッド一致 |
| セクション padding 左右 | 272px | **272px** | 中央寄せ計算値（1440−896)/2。実装は max-width 896 + 中央寄せで代替可 |
| コンテナ max-width | 896px | **896px** | 8pxグリッド一致。※ページ標準1152pxより狭い固有値 |
| コンテナ内側 padding 左右 | 16px | **16px** | グリッド一致 |
| 要素間 gap | 8px | **8px** | グリッド一致 |
| 本文ブロック padding top | 32px | **32px** | グリッド一致 |
| 本文ブロック padding bottom | 40px | **40px** | グリッド一致 |
| ボタン padding 左右 | 64px | **64px** | グリッド一致 |
| ボタン padding 上下 | 20px | **20px** | 4pxグリッド一致 |
| 横罫 | 40×2px | **40×2px** | グリッド一致 |
| 見出しサイズ | 36px / lh40 / ls3.6 | **36 / 40 / 3.6** | グリッド一致 |
| 本文サイズ | 16px / lh24 | **16 / 24** | グリッド一致 |

### 配色のページ標準との差異（実装時の判断ポイント）
| 用途 | このセクションの実値 | ページ標準 | 判断 |
|---|---|---|---|
| 背景ネイビー | `#1e2c5b` | `#0a192f` | **実値 #1e2c5b を採用**（明確に異なる明るめネイビー。標準色で塗ると別物になる） |
| 見出し/ボタン ゴールド | `#c5a059` | `#c2a24c` | 近似。実値 `#c5a059` を採用（誤差範囲だが指定値優先） |
| 横罫ゴールド | `#c8a97e` | `#c2a24c` | 別値（薄ゴールド Tan）。実値 `#c8a97e` を採用 |
| 本文グレー | `#d1d5db` | `#e5e7eb` | やや暗い実値 `#d1d5db` を採用 |
| 上端border | `#020c1b` | — | 標準なし。実値採用 |
| 白 | `#ffffff` | `#ffffff` | 一致 |

---

## 検証用設計値

後工程がフロント計測値と突合するための、tree.js に投入した属性の正規値一覧。

### セクション（loos/full-wide → 内側 UB）
| 項目 | 設計値 | 突合対象 |
|---|---|---|
| 背景色 | `#1e2c5b` | section background-color |
| 内側コンテナ max-width | 896px | inner UB max-width |
| 内側 padding | top 128 / right 16 / bottom 128 / left 16 (px) | inner UB padding |
| 左右中央寄せ | margin left/right auto | inner UB margin |
| 要素間 gap | 8px | inner UB gap |
| 中央寄せ | layoutJustify:center / layoutAlign:center | items-center |

### 見出し「CONTACT」(core/heading h2)
| 項目 | 設計値 |
|---|---|
| font-family | Noto Serif JP |
| font-size / line-height | 36px / 40px |
| font-weight | 600 |
| letter-spacing | 0.1em（=36px×0.1=3.6px） |
| color | `#c5a059` |
| text-align | center |

### 小見出し「お問い合わせ」(core/paragraph)
| 項目 | 設計値 |
|---|---|
| font-family | Noto Sans JP |
| font-size / line-height | 12px / 16px |
| font-weight | 400 |
| letter-spacing | 0.1em（=12px×0.1=1.2px） |
| text-transform | uppercase |
| color | `#ffffff` |
| text-align | center |

### 横罫 (flavor/universal-block)
| 項目 | 設計値 |
|---|---|
| width × height | 40px × 2px |
| background | `#c8a97e` |
| 配置 | layoutJustify:center（中央） |

### 本文 (core/paragraph、ラッパ UB)
| 項目 | 設計値 |
|---|---|
| ラッパ padding | top 32 / bottom 40 (px) |
| font-family | Noto Sans JP |
| font-size / line-height | 16px / 24px |
| font-weight | 400 |
| letter-spacing | 0（指定なし） |
| color | `#d1d5db` |
| text-align | center |

### CTAボタン (core/buttons > core/button)
| 項目 | 設計値 |
|---|---|
| ラベル | `無料相談はこちら　→`（ラベルと矢印を全角スペースgap相当で連結） |
| url | `/contact/` |
| background | `#c5a059` |
| color | `#ffffff` |
| border-radius | 0px |
| padding | top 20 / right 64 / bottom 20 / left 64 (px) |
| font-family | Noto Sans JP |
| font-size / line-height | 14px / 20px |
| font-weight | 700 |
| letter-spacing | 0.1em（=14px×0.1=1.4px） |
| box-shadow | **要CSS**（下記） |

### 要CSS（属性で表現不可・後工程でカスタムCSS対応が要る箇所）
1. **CTAボタン box-shadow** — `0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`（shadow-lg相当）。core/button に box-shadow 属性がないため tree.js には含めていない。フロント計測でボタン影が必要なら swell-meta-css.css で `.wp-block-button__link` に付与。
2. **セクション上端境界線** — `border-top: 1px solid #020c1b`。loos/full-wide にセクション全幅 border を出す属性が当ページの実装パターンに無いため tree.js 未反映。必要なら swell-meta-css.css でセクションに付与。

### 注記
- ラベル「無料相談はこちら」と矢印「→」は Figma上 gap16px の別 text node だが、core/button は子要素を持てないため単一 text に全角スペースで連結（NEWS の「全てを見る　→」と同方式）。厳密な16pxギャップが必要なら 要CSS。
- ボタン実寸 278×60px は内寸（文字幅＋padding 左右64・上下20）で自然に出る想定。固定 width は指定していない（hug幅）。
