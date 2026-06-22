# データパック — 01_FV (ABOUT US ヒーロー)

Figmaファイル: `eZFYBaJDAN0PLLd7ITdvLR`
対象ノード: `1:2153`(FV/背景) `1:2154`(Gradient) `1:2155`(Container/テキスト) `1:2165`(ロゴ2)
基準アートボード: 1440 × 900 px
抽出日: 2026-06-16

---

## 1. レイアウト骨格

FVは **背景写真 + グラデオーバーレイ + 左寄せテキスト群 + 右下装飾ロゴ** の二層構造。

```
FV (1:2153) ......... 1440 × 900   背景写真（集合写真）・最背面 / x=0  y=0
└ Gradient (1:2154) . 1440 × 900   navyグラデオーバーレイ        / x=0  y=-2
└ Container (1:2155) . 1120 × 491.6 左寄せテキスト群             / x=160 y=202
   ├ Heading 1 ...... 1040 × 76     ABOUT US                    / 内side-padding 40
   ├ Container ....... 1040 × 26     私たちについて
   ├ Heading 2 ...... 1040 × 166.6  メインコピー2行             / pt 43.9 pb 0.69
   ├ Container ....... 1040 × 143    サブコピー2行               / pt 30 pb 50
   └ Component 3 ..... 217 × 60      CTAボタン（会社概要を見る →）
└ ロゴ2 (1:2165) ..... 222.2 × 169.9 装飾ロゴ・最前面            / x=1113 y=634
```

### Container（テキストコンテナ）の配置
- 絶対座標: left **160px** / top **202px** （アートボード 1440×900 基準）
- 幅: **1120px**（= 1440 − 160×2、左右マージン160px で中央寄せ相当）
- 内側 horizontal padding: **40px**（左右）→ テキスト実描画幅 1040px
- 子要素は縦並び（flex-col / items-start = 左寄せ）
- 子要素間 gap: **5px**（item-spacing/5。ただし各見出しブロックが個別に pt/pb を持つので実間隔はそちらが支配的）

### 縦方向の積み上げ（Container内 y オフセット、実測）
| 要素 | y (Container内) | height | 備考 |
|---|---|---|---|
| Heading 1 (ABOUT US) | 0 | 76 | |
| 私たちについて | 81 | 26 | |
| Heading 2 (メインコピー) | 112 | 166.6 | テキスト実体は frame内 y=43.9（pt 43.9px）|
| サブコピー | 283.6 | 143 | テキスト実体は frame内 y=30（pt 30px）/ pb 50px |
| CTAボタン | 431.6 | 60 | |

---

## 2. テキスト（一字一句／改行 ⏎=<br>）

| 役割 | テキスト（正確） | ノード |
|---|---|---|
| 英語見出し | `ABOUT US` | 1:2157 |
| 日本語サブ見出し | `私たちについて` | 1:2159 |
| メインコピー(H2) | `お客様の人生に寄り添い、`⏎`未来をともに描くパートナーへ。` | 1:2161 |
| サブコピー | `変わりゆく時代に、`⏎`変わらぬ安心を。` | 1:2163 |
| CTAラベル | `会社概要を見る` | I1:2164;1:1996 |
| CTA矢印 | `→` | I1:2164;1:1998 |

改行位置（<br>）:
- メインコピー: 「お客様の人生に寄り添い、」の後で改行 → 「未来をともに描くパートナーへ。」
- サブコピー: 「変わりゆく時代に、」の後で改行 → 「変わらぬ安心を。」

---

## 3. スタイル

### フォント（family/weight）
- 見出し系（ABOUT US / メインコピー）: **Noto Serif JP Medium (500)**
- 本文系（私たちについて / サブコピー）: **Noto Sans JP Light (300)**
- CTA（ラベル・矢印）: **Noto Sans JP Regular (400)**

### 各テキストの実値（生値そのまま）

| 要素 | font | size | lineHeight | letterSpacing | color |
|---|---|---|---|---|---|
| ABOUT US | Noto Serif JP Medium 500 | 38px | 76px | 4.56px | `#c5a86d`（ゴールド/Laser）|
| 私たちについて | Noto Sans JP Light 300 | 13px | 26px | 1.3px | `rgba(255,255,255,0.8)`（白80%）|
| メインコピー(H2) | Noto Serif JP Medium 500 | 38px | 60.8px | 1.28px | `#ffffff`（白 solid）|
| サブコピー | Noto Sans JP Light 300 | 15px | 31.5px | 1.28px | `rgba(255,255,255,0.9)`（白90%）|
| CTAラベル | Noto Sans JP Regular 400 | 13px | 26px | 1.3px | `#ffffff` |
| CTA矢印 | Noto Sans JP Regular 400 | 11px | 22px | 1.3px | `#ffffff` |

> 注: プロンプト指定のゴールド `#c5a059` に対し、Figma実値は **`#C5A86D`**（design context の "Laser" / "color/orange/60"）。**実値 #C5A86D を採用**。

### CTAボタン（Component 3 / 1:2164）
- レイアウト: 横並び（label + 矢印）、gap **15px**、items-center
- padding: 上下 **17px** / 左右 **46px**
- border: **1px solid rgba(255,255,255,0.3)**（白30%の細枠）
- 背景: なし（透明・アウトライン型ボタン）
- 角丸: なし（0）
- ボックスサイズ: 217 × 60px

---

## 4. 装飾レイヤー

### グラデオーバーレイ（Gradient / 1:2154）
- 位置/サイズ: x=0 y=-2 / 1440 × 900（FV全面を覆う）
- fill: **左→右** の linear-gradient
  ```css
  linear-gradient(90.54deg,
    rgba(10,22,49,0.9) 1.22%,
    rgba(10,22,49,0.6) 47.62%,
    rgba(10,22,49,0.1) 99.71%);
  ```
  - ベース色 `rgba(10,22,49,*)` = ネイビー **#0a1631**（不透明度のみ左濃→右薄で変化）
  - 角度 ≈ **90.54deg**（ほぼ水平、左が濃く右が薄い）
  - 目的: 左側テキストの可読性確保（左を暗く、右の写真を見せる）

### 装飾ロゴ（ロゴ2 / 1:2165）
- 位置: left **1113px** / top **634px**（右下）
- サイズ: **222.24 × 169.87px**
- 内容: ASTERRA Corporation ロゴマーク（ビル＋四芒星）+ ロゴタイプ
- **表示色: 白**（Figmaでは白塗り(#ffffff)をロゴ形状でアルファマスクした描画 / 1:2167）
- ソースアセットは**ネイビー版**（#1a2a5e系・後述）。FV上での白表示は実装側で `filter: brightness(0) invert(1)` 等で対応する想定（要実装判断）
- 役割: 純装飾（リンクなし）

---

## 5. アセット（guid確認済み）

WPコンテナ: `wp-env-asterrra-wordpress-b07ac4e0-cli-1`（ポート8918）

| 用途 | ローカルファイル | 寸法 | WP ID | 実URL（guid確認済み） |
|---|---|---|---|---|
| FV背景写真（合成済み） | `fv-background.png` | 1440×900 | **35** | `http://localhost:8918/wp-content/uploads/2026/06/fv-background.png` |
| 装飾ロゴ（ネイビー版） | `logo2.png` | 1536×1024 | **36** | `http://localhost:8918/wp-content/uploads/2026/06/logo2.png` |

- `fv-background.png` = FV(1:2153)のエクスポート合成画像。スーツ姿の4人が建物模型のあるオフィスで肩を組む集合写真（1440×900にクロップ済み）。グラデ・ロゴは含まない素の写真。
- `logo2.png` = ロゴ2のラスタソース。**ネイビー色**のASTERRAロゴ（マーク＋ "ASTERRA Corporation"）。透過PNG。FV上では白表示なので実装時に色反転が必要。
- design.png = Container(1:2155)単独スクショ（白テキストが透明背景で見えず "ABOUT US" のゴールドのみ視認可）。レイアウト確認は design-bg.png（背景写真）と合わせて参照。
- design-bg.png = FV(1:2153)背景写真スクショ（= fv-background.png と同一内容）。

> 注: Figma download_assets ではFVに2枚のソース画像（ポートレート1024×1536 と 256×384 の別クロップ）が含まれていたが、最終FVに合致する**合成済みエクスポート(1440×900)**を本番採用としてWP取込した。

---

## 6. インタラクション台帳

| 要素 | アクション | リンク先 | 状態 |
|---|---|---|---|
| CTAボタン「会社概要を見る →」(1:2164) | クリック遷移（推定: 会社概要セクション/ページへのアンカーまたは固定ページ） | **未定義（Figmaにリンク設定なし）** | **要ユーザー確認** |
| ロゴ2(1:2165) | なし（純装飾） | — | リンクなし |

- CTAのリンク先はFigma上に定義されていない。「会社概要を見る」ラベルから推測すると会社概要セクション（同一ページ内アンカー `#about` 等）または会社概要ページが妥当だが、確定不能 → **要ユーザー確認**。

---

## 7. 正規化記録（生値 → 正規値、4/8pxグリッド）

スナップ正規化の方針: テキストのfontSize/letterSpacingは原則そのまま（タイポ実値）、レイアウトのpadding/gap/座標を4/8グリッドへ寄せる。

| 項目 | 生値 | 正規値 | 備考 |
|---|---|---|---|
| Container left | 160px | **160px** | そのまま（中央寄せ left/right margin 160）|
| Container top | 202px | **200px** | 202→200（2px丸め）|
| Container width | 1120px | **1120px** | そのまま |
| Container内 horizontal padding | 40px | **40px** | そのまま |
| 子要素 gap | 5px | **5px**（≈4 or 8 へ寄せ可） | 各ブロックのpt/pbが支配的のため実害小 |
| H1 lineHeight | 76px | **76px** | 38px×2.0 |
| H1 letterSpacing | 4.56px | **4.56px**（≈0.12em）| そのまま |
| サブ見出し lineHeight | 26px | **26px** | 13px×2.0 |
| H2 pt(上余白) | 43.9px | **44px** | 43.9→44 |
| H2 pb(下余白) | 0.69px | **0px** | 0.69→0（誤差吸収）|
| H2 lineHeight | 60.8px | **60.8px**（38px×1.6）| そのまま（行高は実値維持）|
| サブコピー pt | 30.01px | **30px** | 30.01→30 |
| サブコピー pb | 50px | **50px**（≈48 へ寄せ可）| ボタン上の余白 |
| サブコピー lineHeight | 31.5px | **31.5px**（15px×2.1）| そのまま |
| CTA padding 上下 | 17px | **17px**（≈16 へ寄せ可）| |
| CTA padding 左右 | 46px | **46px**（≈48 へ寄せ可）| |
| CTA gap | 15px | **15px**（≈16 へ寄せ可）| label↔矢印 |
| CTA border | 1px | **1px** | rgba(255,255,255,0.3) |
| Gradient top | -2px | **0px** | -2→0（はみ出し吸収）|
| ロゴ left | 1113px | **1113px** | 右下絶対配置 |
| ロゴ top | 634px | **634px** | |
| ロゴ size | 222.24×169.87 | **222×170** | 小数丸め |

### 配色実値（確定）
| 名称 | hex/rgba | 用途 |
|---|---|---|
| ゴールド(Laser) | `#C5A86D` | ABOUT US |
| 白 solid | `#FFFFFF` | メインコピー・CTA |
| 白80% | `rgba(255,255,255,0.8)` | 私たちについて |
| 白90% | `rgba(255,255,255,0.9)` | サブコピー |
| 白30% | `rgba(255,255,255,0.3)` | CTA枠線 |
| ネイビー(グラデ基色) | `#0A1631`（rgba(10,22,49,*)）| グラデオーバーレイ |

> プロンプト記載のネイビー候補 #0a192f / #1e2c5b に対し、グラデの実ベース色は **#0A1631 (rgba(10,22,49))**。実値を採用。

---

## 検証用設計値（tree.js 突合シート）

### ルート / ラッパー
| 対象 | 属性 | 値 |
|---|---|---|
| ルート | block | `loos/full-wide` |
| ルート | className | `sec-about-fv`（必須）|
| ルート | bgColor | `#0A1631`（写真未読込フォールバック地）|
| ルート | contentSize / pcPadding / spPadding | `full` / `0` / `0` |
| FVラッパー | block | `flavor/universal-block` |
| FVラッパー | positionType | `relative`（装飾ロゴ absolute の基準）|
| FVラッパー | layout | direction:column / justify:center / align:center |
| FVラッパー | sizeWidth / sizeMinHeight | `100%` / `900px` |
| FVラッパー | backgroundImage | url=fv-background.png / id=35 / size=cover / position=center |

### テキスト群（content / max1120・内側padding左右40・margin auto中央）
| 要素 | block | content | font | size/lh/ls | color | 余白 |
|---|---|---|---|---|---|---|
| H1 | core/heading lv1 + is-style-section_ttl | `ABOUT US` | Serif 500 | 38 / 76 / 0.12em | `#C5A86D` | — |
| サブ見出し | core/paragraph | `私たちについて` | Sans 300 | 13 / 26 / 0.1em | `rgba(255,255,255,0.8)` | — |
| メインコピー | core/heading lv2 + is-style-section_ttl | `お客様の人生に寄り添い、<br>未来をともに描くパートナーへ。` | Serif 500 | 38 / 60.8 / 0.034em | `#ffffff` | margin-top 44px |
| サブコピー | core/paragraph | `変わりゆく時代に、<br>変わらぬ安心を。` | Sans 300 | 15 / 31.5 / 0.085em | `rgba(255,255,255,0.9)` | margin-top 30px |
| CTA | core/buttons > core/button | `会社概要を見る　→` / url=/company/ | Sans 400 | 13 / 26 / 0.1em | text `#fff` / bg transparent | margin-top 50px |

- CTAボタン：border 1px solid `rgba(255,255,255,0.3)` / radius 0 / padding 上下17px 左右46px。
- letterSpacing は em 換算（生 px ÷ fontSize）。lineHeight は px 維持。

### 装飾ロゴ（core/image・absolute）
| 属性 | 値 | 備考 |
|---|---|---|
| id / url | 36 / logo2.png | ネイビー版ソース |
| width / height | 222px / 170px | |
| imgPositionType | absolute | 'img' プレフィックス必須 |
| imgPositionRight / imgPositionBottom | 105px / 96px | 1440×900基準 left1113/top634 を right/bottom 換算 |

### 要CSS（ブロック属性で表現不可・swell-meta-css で後段対応）
1. **左→右ネイビーグラデオーバーレイ**（要CSS: FVラッパー ::after / 理由: backgroundImage拡張の overlay は単色のみで `linear-gradient(90.54deg, rgba(10,22,49,.9)→.6→.1)` 非対応）。
2. **装飾ロゴの白色反転**（要CSS: 装飾_白ロゴ / 理由: ソース logo2.png はネイビー版。FV上は白表示が正で `filter: brightness(0) invert(1)` 相当が必要。色反転はブロック属性に存在しない）。
3. **ロゴ absolute の specificity 競合**（要CSS: 装飾_白ロゴ / 理由: 親 backgroundImage拡張の `> *:not([style*='z-index']){position:relative}` (0,3,0) が img の注入 absolute を打ち消す。ページ限定CSSで specificity を上げて absolute を確定させる。page7 01_FV と同一既知事象）。
4. **text-shadow**（datapack に明示指定なし → tree.js 不含。可読性補強で必要になればCSS。理由: text-shadow はブロック属性に存在しない）。

### 要スキーマ確認
- `core/image` の `imgPositionType / imgPositionRight / imgPositionBottom`（'img' プレフィックス）は page7 01_FV で実績あり。本案件 extension config で同プレフィックスが有効か実機シリアライズ時に確認。

