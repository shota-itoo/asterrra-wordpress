# 01_HERO データパック — 会社概要ページ ページヒーロー

対象ページ: 会社概要（page 26 / ASTERRA Corporation）
対象ノード: `1:3680`（Page Hero Section 帯）+ `1:3601`（Breadcrumb → Nav パンくず）
Figmaファイル: `eZFYBaJDAN0PLLd7ITdvLR`
スクショ: `design.png`（ヒーロー 1440×450）/ `design-breadcrumb.png`（パンくず 1024×16）

---

## 1. レイアウト骨格

ヒーローは「暗い都市ビル背景画像 + ネイビーの横方向グラデーションオーバーレイ + 左寄せテキスト群」。
その直下（ヒーローの外・白背景上）にパンくずが独立配置される。

### ヒーロー帯 `1:3680`（Page Hero Section）

| 項目 | 生値 | 正規値 | 備考 |
|---|---|---|---|
| 位置 | x=0, y=0 | 0, 0 | ビューポート左上原点 |
| サイズ | 1440 × 450 | 1440 × 450 | ビューポート全幅・固定高さ |
| レイアウト | flex column / items-start / justify-center | — | テキストは縦方向中央寄せ・左揃え |
| 左右パディング(外枠) | px 80 | 80px | section 直下の左右パディング |

内側コンテナ `1:3682`（Container）:
- `max-width: 1280px`（中央寄せ）、`width: 100%`
- 上パディング `pt: 40px`、左右パディング `px: 64px`
- → テキストブロックの実左端 = 80（外） + (1440−1280)/2=80 ではなく、外80pxパディング内で max1280 を左寄せ。実測のパンくず左端 x=208 と整合（80外 + 64内 + α）。**コンテンツ左端の実座標 ≈ 208px**（パンくず frame x=208 と一致）。

ヒーロー内テキスト群（上→下、`1:3682` 内・縦積み）:

| 順 | 要素 | ノード | 下マージン(margin pb) |
|---|---|---|---|
| 1 | 英字エヤブロウ「COMPANY」 | 1:3685 | pb 16px |
| 2 | 大見出し「会社概要」(H1) | 1:3688 | pb 24px |
| 3 | ゴールド水平ディバイダー(2px×48px) | 1:3690 | 親 pb 24px / 親高さ26px |
| 4 | 日本語サブ(2行) | 1:3692 | — |

### パンくず `1:3601`（Breadcrumb → Nav）

| 項目 | 生値 | 正規値 | 備考 |
|---|---|---|---|
| frame 位置 | x=208, y=474 | 208, 474 | ヒーロー(高さ450)直下の白背景帯。y=474 はヒーロー下端450 + 24px下 |
| frame サイズ | 1024 × 16 | 1024 × 16 | 高さは行高16px相当 |
| 左端 x=208 | — | 208 | ヒーローのコンテンツ左端と揃う |

パンくず子要素（横並び・左から）:

| 要素 | ノード | x(frame内) | width | 内容 |
|---|---|---|---|---|
| HOME（リンク） | 1:3602 (Component 1) | 0 | 36 | テキスト「HOME」。**アイコンなし**（子ノード無し・テキストのみ） |
| 区切り「>」 | 1:3603 | 46.66 | 7.17 | セパレータ |
| カレント「会社概要」 | 1:3604 | 64.63 | 49.16 | 現在地（リンクなし・濃色） |

> 注: タスク指示に「HOME（アイコン/リンク）」とあったが、実データの `Component 1` は子ノードを持たずテキスト「HOME」のみ。**アイコンは存在しない**（要確認事項参照）。

---

## 2. テキスト（一字一句・改変禁止）

ヒーロー:
- エヤブロウ（gold）: `COMPANY`
- 大見出し H1（白）: `会社概要`
- サブ1行目（白90%）: `お客様の信頼に応え、より良い未来を創造するために。`
- サブ2行目（白90%）: `ASTERRA Corporationの基本情報をご紹介します。`
  - ※ サブは2段落（`<p>`×2）。1行目末尾「。」の後で改行＝段落区切り（強制改行 ⏎ ではなく別`<p>`）。

パンくず:
- `HOME`
- `>`（半角不等号・セパレータ）
- `会社概要`

> 重要: タスク指示では「英語サブテキスト」とあったが、実データのサブは**日本語2行**。英語要素は見出し上の**エヤブロウ「COMPANY」のみ**。

---

## 3. スタイル

### タイポグラフィ

| 要素 | フォント | weight | size | lineHeight | letterSpacing | color |
|---|---|---|---|---|---|---|
| エヤブロウ COMPANY | Noto Serif JP (Regular) | 400 | 20px | 28px | 4px | `#C8A97E`(gold) |
| 大見出し 会社概要(H1) | Noto Serif JP (Regular) | 400 | 48px | 48px | 2.4px | `#FFFFFF`(白) |
| サブ本文(2行) | Noto Sans JP (Light) | 300 | 16px | 24px | 0.4px | `rgba(255,255,255,0.9)`(白90%) |
| パンくず HOME | Noto Sans JP (Regular) | 400 | 12px | 16px | 0.3px | `#6B7280`(グレー) |
| パンくず `>` | Noto Sans JP (Regular) | 400 | 12px | 16px | 0.3px | `#6B7280`(グレー) |
| パンくず 会社概要(現在地) | Noto Sans JP (Regular) | 400 | 12px | 16px | 0.3px | `#1F2937`(濃紺グレー) |

### カラーパレット（このセクションで使用）

| 用途 | hex / rgba | 名称(Figma) |
|---|---|---|
| ゴールド（エヤブロウ/ディバイダー） | `#C8A97E` | Tan / orange/64 |
| 白（見出し） | `#FFFFFF` | White / white/solid |
| 白90%（サブ本文） | `rgba(255,255,255,0.9)` | White 90% / white/-90% |
| パンくずグレー | `#6B7280` | Pale Sky / grey/46 |
| パンくず現在地 | `#1F2937` | Ebony Clay / azure/17 |
| オーバーレイ基色（ネイビー） | `rgb(19,28,48)` = `#131C30` | color/azure/13 |

> 注: プロジェクト標準のゴールドは `#c5a059` と聞いていたが、実データのゴールドは `#C8A97E`。本セクションは `#C8A97E` を採用（要確認事項参照）。

---

## 4. 装飾レイヤー（CSS化候補）

1. **背景画像** `1:3680` の背景: 都市ビル見上げ写真（JPEG）。
   - 表示: `position:absolute; inset:0; overflow:hidden`。img は `width:100%`、`height:213.33%`、`top:-56.67%`（縦方向に拡大しトリミング表示 ≒ background-size:cover 相当の縦オフセット）。
   - 実装目安: `background-size: cover; background-position: center`（上方やや切れ）。

2. **オーバーレイ** `1:3681`（Overlay）: 左→右の線形グラデーション（ネイビー）。
   - `linear-gradient(to right, rgba(19,28,48,0.9) 0%, rgba(19,28,48,0.6) 50%, rgba(19,28,48,0) 100%)`
   - 左ほど濃く（テキスト可読性確保）、右へ透明にフェード。`inset:0` 全面。

3. **ゴールド水平ディバイダー** `1:3690`: 幅48px・高さ2px・`#C8A97E`。見出しとサブの間の装飾線（要素として実体あり。CSS `::after` 等でも再現可）。

> いずれも装飾レイヤー。背景画像はアセット（下記）、オーバーレイ/ディバイダーは後工程でCSS化想定。

---

## 5. アセット（guid確認済み）

| アセット | 用途 | WP添付ID | 実URL（確認済み・推測禁止） | 元サイズ |
|---|---|---|---|---|
| hero-bg-city.jpg | ヒーロー背景（都市ビル写真） | **34** | `http://localhost:8918/wp-content/uploads/2026/06/hero-bg-city.jpg` | 1920×1280 JPEG |

- 取得元: `download_assets(1:3680)` の rawImages（format=jpeg）
- ローカル保管: `design-data/26/sections/01_HERO/hero-bg-city.jpg`
- WP取込: `docker cp` → `wp media import --porcelain` → ID=34 → `wp post list` で guid 確認済み。

---

## 6. インタラクション台帳

| 要素 | 種別 | 遷移先 / 挙動 | 確度 |
|---|---|---|---|
| パンくず「HOME」 | リンク | `/`（トップページ） | 慣例上ほぼ確実。Figmaにリンク属性の明示なし→慣例適用 |
| パンくず「会社概要」 | 現在地（非リンク） | リンクなし（カレント表示・濃色） | 確実 |
| パンくず「>」 | セパレータ | 非インタラクティブ | 確実 |
| ヒーロー本文・見出し | 静的 | インタラクションなし | 確実 |

---

## 7. 正規化記録（生値 → 正規値）

| 対象 | 生値 | 正規値 | スナップ根拠 |
|---|---|---|---|
| ヒーロー幅×高 | 1440×450 | 1440×450 | そのまま（8pxグリッド整合） |
| 外枠左右padding | 80 | 80 | 8の倍数 |
| 内コンテナ max-width | 1280 | 1280 | そのまま |
| 内コンテナ 左右padding | 64 | 64 | 8の倍数 |
| 内コンテナ 上padding | 40 | 40 | 8の倍数 |
| エヤブロウ下マージン | 16 | 16 | そのまま |
| 見出し下マージン | 24 | 24 | そのまま |
| ディバイダー 幅×高 | 48×2 | 48×2 | そのまま |
| ディバイダー親 下padding | 24 | 24 | そのまま |
| 見出し letterSpacing | 2.4px | 2.4px | フォント指定値（保持） |
| エヤブロウ letterSpacing | 4px | 4px | 保持 |
| サブ letterSpacing | 0.4px | 0.4px | 保持 |
| パンくず letterSpacing | 0.3px | 0.3px | 保持 |
| パンくず frame位置 | x=208, y=474 | 208, 474 | コンテンツ左端と整合（生座標で検算済み） |
| パンくず「>」x | 46.66 | ≈47 | 4pxグリッドへ丸め（実装は flex gap 推奨） |
| パンくず「会社概要」x | 64.63 | ≈65 | 同上 |

> 検算: get_metadata の生座標で frame=1440×450@(0,0)、breadcrumb frame=1024×16@(208,474) を確認。Component 1（HOME）は子ノードなし＝テキストのみ。

---

## 要ユーザー確認事項

1. **HOMEアイコンの有無**: タスク指示に「HOME（アイコン/リンク）」とあったが、実データの `Component 1` はテキスト「HOME」のみで**アイコンを持たない**。アイコン（家アイコン等）を追加するか、テキストのみで実装するか要確認。
2. **ゴールドの色値**: プロジェクト標準ゴールドは `#c5a059` と指定されていたが、本セクション実データのゴールドは `#C8A97E`。実装色をどちらに合わせるか要確認（本datapackは実データの `#C8A97E` で記録）。
3. **サブテキストの言語**: 指示は「英語サブテキスト」だったが実データは日本語2行（英語要素はエヤブロウ「COMPANY」のみ）。実データ準拠で確定でよいか確認。
4. **「HOME」リンク先**: `/`（トップ）と慣例で記載。Figmaにリンク属性の明示はないため最終確認。

---

## 検証用設計値

`tree.js` に投入した属性値の一覧（実機Gutenbergシリアライズ後の突合用）。letterSpacing は em換算（datapack §3 の px ÷ fontSize）。

### (A) sec-hero（loos/full-wide → flavor/universal-block ラッパー → コンテンツ群）

| 対象 | 属性 | 値 |
|---|---|---|
| full-wide(sec-hero) | bgColor / contentSize / pcPadding / spPadding | `#131C30`(写真未読込フォールバック) / full / 0 / 0 |
| ヒーローラッパー | layoutDirection / Justify / Align | column / center / flex-start |
| ヒーローラッパー | sizeWidth / sizeMinHeight | 100% / 450px |
| ヒーローラッパー | backgroundImageUrl / Id / Size / Position | localhost:8918/.../2026/06/hero-bg-city.jpg / 34 / cover / center |
| ヒーローラッパー | spacingPadding(px) | top40 / right80 / bottom0 / left144（外80+内64） |
| ヒーローラッパー | positionType | relative |
| コンテンツ群 | layoutDirection / sizeWidth / sizeMaxWidth | column・flex-start / 100% / 1280px |
| エヤブロウ COMPANY | font / size / weight / lineHeight / letterSpacing / color | Noto Serif JP / 20px / 400 / 28px / 0.2em(4px) / `#C8A97E` |
| エヤブロウ ラッパー | spacingPadding-bottom | 16px |
| 見出し 会社概要(H1) | level / className | 1 / is-style-section_ttl |
| 見出し 会社概要(H1) | font / size / weight / lineHeight / letterSpacing / color | Noto Serif JP / 48px / 400 / 48px / 0.05em(2.4px) / `#ffffff`(link同色) |
| 見出し ラッパー | spacingPadding-bottom | 24px |
| ゴールドディバイダー | sizeWidth / sizeHeight / background | 48px / 2px / `#C8A97E` |
| ディバイダー ラッパー | spacingPadding-bottom | 24px |
| サブ1/2行目 | font / size / weight / lineHeight / letterSpacing / color | Noto Sans JP / 16px / 300 / 24px / 0.025em(0.4px) / `rgba(255,255,255,0.9)` |
| サブ | 構造 | 別段落(core/paragraph)×2・縦積み |

### (B) sec-breadcrumb（loos/full-wide → flavor/universal-block 行）

| 対象 | 属性 | 値 |
|---|---|---|
| full-wide(sec-breadcrumb) | bgColor / contentSize / pcPadding / spPadding | `#ffffff` / full / 0 / 0 |
| パンくず行 | layoutDirection / Justify / Align | row / flex-start / center |
| パンくず行 | spacingGap / sizeWidth / sizeMaxWidth | 8px / 100% / 1024px |
| パンくず行 | spacingPadding / spacingMargin | top24・bottom24 / left:auto・right:auto(中央寄せ) |
| HOME | content / font / size / weight / lineHeight / letterSpacing / color | `<a href="/">HOME</a>` / Noto Sans JP / 12px / 400 / 16px / 0.025em(0.3px) / `#6B7280`(link同色) |
| 区切り | content / color | `&gt;` / `#6B7280` |
| 現在地 会社概要 | content / color | 会社概要(非リンク) / `#1F2937` |

### tree.js に含めなかったもの（要CSS）

- **HEROネイビー横グラデオーバーレイ** `linear-gradient(to right, rgba(19,28,48,0.9), 0.6, 0)` — backgroundImage拡張のOverlayColorは単色のみ＝グラデ不可。後工程CSSで `.sec-hero` の擬似要素として実装。
- **HOMEアイコン** — datapack §1 注の通り実データにアイコンなし。テキストのみで実装（追加要否はユーザー確認事項1）。

