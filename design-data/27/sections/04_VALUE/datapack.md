# 04_VALUE データパック

サービス内容ページ「Value（ASTERRAが大切にしていること・3価値）」セクション
Figma: `eZFYBaJDAN0PLLd7ITdvLR` / nodeId `1:3124`（Value Section）
デザイン: `design.png`（1440×442）

---

## レイアウト骨格

デザイン全体幅 1440px。セクション高さ 442px。中身は中央寄せ。

| 階層 | nodeId | 役割 | 生サイズ(px) | 配置 |
|---|---|---|---|---|
| Value Section | 1:3124 | セクション枠 | 1440 × 442 | y=2887（ページ内絶対） |
| Overlay | 1:3125 | 暗色オーバーレイ背景 | 1440 × 442 | inset 0（全面） |
| Container（外） | 1:3126 | 内側コンテナ | 1280 × 250 | x=80, y=96（=section padding 96/80） |
| Section Title | 1:3127 | 見出しブロック | 1152 × 90 | x=64, y=0 |
| └ VALUE（小見出し） | 1:3129 | テキスト | 1152 × 16 | y=0 |
| └ Heading 2 枠 | 1:3130 | 見出し枠 | 1152 × 48 | y=28（pb=12 込み height48） |
| 　└ H2 テキスト | 1:3131 | テキスト | 1152 × 36 | y=0 |
| └ Horizontal Divider | 1:3132 | 横罫（ゴールド） | 40 × 2 | y=88 |
| Container（3価値行） | 1:3133 | 横並び行 | 1152 × 96 | x=64, y=154 |

### セクション内パディング（外コンテナ周り）
- Value Section の padding: 上下 **96px** / 左右 **80px**（生値 px=80/96 と一致）
- Container（1:3126）内に追加で左右 **64px** の padding（コンテンツ実効幅 = 1280 − 64×2 = **1152px**）
- → 実効コンテンツ幅 1152px はページ標準と一致。デザイン幅1440 − 左右(80+64)=144px ずつ ＝ 中央寄せ1152px

### 3価値 横並び（Container 1:3133 = flex row, gap 32px）
子要素5つ（gap=32pxを4箇所に適用）:

| 子 | nodeId | 幅(生px) | x(生px) |
|---|---|---|---|
| Value 1 | 1:3134 | 340.66 | 0 |
| Divider 1 | 1:3141 | 1 | 372.66 |
| Value 2 | 1:3143 | 340.67 | 405.66 |
| Divider 2 | 1:3150 | 1 | 778.33 |
| Value 3 | 1:3152 | 340.67 | 811.33 |

検算: 340.66 + 32 + 1 + 32 + 340.67 + 32 + 1 + 32 + 340.67 = **1151.98 ≒ 1152** ✅

### 各 Value 内部（横並び: アイコン + テキスト塊、gap 24px）
- アイコン(Component 1): 64 × 64、x=0
- テキストコンテナ: x=88（= 64 + gap24）、高さ96
  - Heading 3（価値名）: y=0, height=28
  - 説明文コンテナ: y=40, height=56（H3下端28 → 説明文上端40 ＝ 12px gap）
- Value内テキストコンテナ幅: V1=252.66 / V2=223 / V3=195（テキスト量で可変、`whitespace-nowrap`相当でテキスト幅に追従）

---

## テキスト（一字一句／⏎=強制改行=`<br>`）

### 小見出し
```
VALUE
```

### 見出し（H2）
```
ASTERRAが大切にしていること
```

### 価値1
- 見出し(H3): `お客様目線`
- 説明文:
```
お客様一人ひとりの状況や想いを理解⏎し、最適なご提案を行います。
```
（2行: 「お客様一人ひとりの状況や想いを理解」⏎「し、最適なご提案を行います。」）

### 価値2
- 見出し(H3): `誠実な対応`
- 説明文:
```
目先の利益ではなく、⏎長期的な信頼関係を大切にします。
```
（2行: 「目先の利益ではなく、」⏎「長期的な信頼関係を大切にします。」）

### 価値3
- 見出し(H3): `未来志向`
- 説明文:
```
将来を見据えた資産形成や⏎住まい選びをサポートします。
```
（2行: 「将来を見据えた資産形成や」⏎「住まい選びをサポートします。」）

注: 説明文の改行はFigmaの強制改行（段落2つ）。各行で `<br>` 相当。

---

## スタイル

### カラー（Figma変数値 — 実測優先）
| 用途 | 値 | 備考 |
|---|---|---|
| オーバーレイ背景 | `rgba(0,0,0,0.8)` | 黒80%（node 1:3125）。下地は白(#FFFFFF)→暗いチャコールに見える |
| 小見出し / H3 / 横罫（アクセント） | `#C8A97E`（Tan / orange-64） | **タスク指示の #c5a059 とは別値。Figma実測は #C8A97E** ⚠ |
| H2見出し / 説明文 | `#FFFFFF`（white-solid） | 白 |
| 縦区切り線 | `rgba(75,85,99,0.5)`（River Bed / azure-34 50%） | グレー#4B5563の50%透過 |
| アイコン線 | `#C8A97E`（stroke） | 価値アクセントと同色ゴールド |

### タイポグラフィ
| 要素 | フォント | weight | size | line-height | letter-spacing | color |
|---|---|---|---|---|---|---|
| VALUE（小見出し） | Noto Serif JP Regular | 400 | 12px | 16px | 2.4px | #C8A97E |
| H2 見出し | Noto Serif JP Regular | 400 | 30px | 36px | 0.75px | #FFFFFF |
| H3 価値名 | Noto Serif JP Regular | 400 | 18px | 28px | 0.45px | #C8A97E |
| 説明文 | Noto Sans JP Light | 300 | 14px | 28px | 0（指定なし） | #FFFFFF |

注: ページ標準は「見出しNoto Serif JP / 本文Noto Sans JP」。VALUE小見出しと価値名(H3)も**Serif**（Noto Serif JP）である点に注意。

### 余白・間隔
| 箇所 | 値 |
|---|---|
| セクション padding | 96px(上下) / 80px(左右) |
| 内コンテナ追加 padding | 64px(左右) |
| Section Title 内 縦gap | 12px（VALUE → H2 → 罫） |
| H2枠 下padding | 12px（罫との間隔。28+48=76, 罫y=88 → H2下端76→罫88で実gap12） |
| Section Title → 3価値行 | 64px（外コンテナの縦gap xl） |
| 3価値の列間 gap | 32px |
| アイコン ↔ テキスト gap | 24px |
| H3 ↔ 説明文 gap | 12px |

---

## 装飾レイヤー

### 1. オーバーレイ背景（1:3125）
- 役割: セクション全面の暗色背景。これがチャコール調の地色を作る
- サイズ: 1440×442 全面（inset 0）
- 色: `rgba(0,0,0,0.8)`（黒80%、下地白）
- 実装方針: セクション背景色として `#1a1a1a`〜`#2b2b2b` 相当の暗色を直接指定するか、白地＋黒80%オーバーレイで再現。ページ標準ネイビー(#0a192f/#1e2c5b)とは異なる**純黒系**である点に注意（要確認候補：背景はネイビーに寄せるか黒のままか）

### 2. 横罫（Horizontal Divider, 1:3132）
- 見出し下のゴールドの短い横線
- サイズ: 40 × 2px、色 `#C8A97E`
- 位置: Section Title 内、H2 の下 y=88

### 3. 縦の区切り線（Divider, 1:3142 / 1:3151）
- 各価値の間に縦線。2本（V1-V2間、V2-V3間）
- サイズ: 1 × 96px（行の高さいっぱい / align-stretch）
- 色: `rgba(75,85,99,0.5)`（グレー50%透過）
- ※タスク指示「縦の区切り線 1px×96」と一致 ✅

### 4. アイコン（Component 1, 64×64・線画）
3つとも**ゴールド(#C8A97E)の2.67px幅ストロークの線画アイコン**（fill無し、round cap/join）:
- 価値1: 人物グループ（3人）アイコン＝「お客様目線」
- 価値2: チェーン/リンク（鎖）アイコン＝「誠実な対応」
- 価値3: スマイル顔（円＋目2点＋口）アイコン＝「未来志向」
- viewBox 0 0 64 64、表示サイズ 64×64

---

## アセット（guid確認済み）

WPコンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1`（ポート8918）に media import 済み。
※ SVGアップロードはデフォルト不許可のため、一時 mu-plugin（upload_mimes + filetype許可）でimport→import後に一時mu-pluginを削除済み（dev-auto-login.phpのみ残存を確認）。本番/通常運用にSVG許可フィルタは**未追加**。実装時にSVGを使うなら別途SVG許可の恒久対応が要検討（要確認）。

| 価値 | ファイル | 添付ID | 実URL(guid・確認済み) |
|---|---|---|---|
| 価値1 お客様目線 | icon-value1-customer.svg | **53** | http://localhost:8918/wp-content/uploads/2026/06/icon-value1-customer.svg |
| 価値2 誠実な対応 | icon-value2-sincere.svg | **54** | http://localhost:8918/wp-content/uploads/2026/06/icon-value2-sincere.svg |
| 価値3 未来志向 | icon-value3-future.svg | **55** | http://localhost:8918/wp-content/uploads/2026/06/icon-value3-future.svg |

mime: 全て `image/svg+xml`。ローカルファイルは本フォルダ内に同名で保持。

注: Figma download_assets の生SVGはFigmaのページ背景フレーム（#F5F5F5/#5A5A5A/白/#F9FAFB の巨大rect）を含んでいたため、**アイコン本体のpath（stroke #C8A97E）のみ抽出**して 64×64 viewBox のクリーンSVGに整形して取込済み。背景rectをそのまま使うと暗色オーバーレイ上で白/グレーの矩形が乗ってしまうため除去が必須だった。

---

## インタラクション台帳

| 対象 | 挙動 | 確度 |
|---|---|---|
| 各価値（アイコン+テキスト） | 静的表示。リンク/ホバーは Figma上に定義なし | 静的（hover/clickは**要ユーザー確認**） |
| アイコン | 装飾。リンクなし | 静的 |
| スクロール時アニメ（フェードイン等） | Figmaに情報なし | **要ユーザー確認**（実装段でモーション付与するか） |

確定不能な点はすべて「要ユーザー確認」。

---

## 正規化記録（4/8pxグリッド・生値→正規値）

| 項目 | 生値 | 正規値 | 判定 |
|---|---|---|---|
| セクション padding 縦 | 96 | 96 | 8×12 一致 |
| セクション padding 横 | 80 | 80 | 8×10 一致 |
| 内コンテナ padding 横 | 64 | 64 | 8×8 一致 |
| コンテンツ実効幅 | 1152 | 1152 | ページ標準1152と一致 ✅ |
| 外コンテナ幅 | 1280 | 1280 | 8×160 |
| 列間 gap | 32 | 32 | 8×4 |
| アイコン↔テキスト gap | 24 | 24 | 8×3 |
| H3↔説明文 gap | 12 | 12 | 4×3 |
| Section Title 縦gap | 12 | 12 | 4×3 |
| Title→3価値 縦gap | 64 | 64 | 8×8 |
| アイコン | 64×64 | 64×64 | 一致 |
| 横罫 | 40×2 | 40×2 | 一致 |
| 縦区切り線 | 1×96 | 1×96 | 一致 |
| Value幅(各) | 340.66 / 340.67 | ≈340.67 | 端数。実装はflex等分（gap32の3列）で吸収 |
| テキストコンテナ幅 | 252.66 / 223 / 195 | — | テキスト量依存。固定不要（テキスト幅追従） |
| H2 size | 30 | 30 | 一致（タスク標準と差異なし） |
| 説明文 line-height | 28 | 28 | 8×3.5 |

### 要確認サマリ
1. **アクセントゴールド**: Figma実測 `#C8A97E`。タスク指示の `#c5a059` と不一致 → どちらを正とするか要確認（本データパックはFigma実測 #C8A97E を採用）
2. **背景色**: Figmaは黒80%オーバーレイ（純黒系チャコール）。ページ標準ネイビー(#0a192f等)と異なる → ネイビーに寄せるか黒のままか要確認
3. **SVG恒久許可**: import用の一時mu-pluginは削除済み。実装でSVGメディアを使う場合、SVG許可の恒久フィルタ追加が別途必要
4. **ホバー/スクロールモーション**: Figmaに定義なし、要確認

---

## 検証用設計値（tree.js 突合シート）

ルート: `loos/full-wide` className=`sec-value` / bgColor=`rgba(0,0,0,0.8)`（黒80%オーバーレイ）/ contentSize=full / pcPadding=0 / spPadding=0

| 要素 | ブロック | 主要属性（設計値） |
|---|---|---|
| 内コンテナ | flavor/universal-block | column / center / width100% / maxWidth1152 / padding 上下96・左右0 / margin auto(左右) / gap64 |
| Section Title枠 | flavor/universal-block | column / center / width100% / gap12 |
| 小見出し VALUE | core/paragraph(center) | Serif 12/16 / ls 0.2em(=2.4px) / `#c8a97e` |
| H2 見出し | core/heading L2(center) | Serif 30/36 / ls 0.025em(=0.75px) / `#ffffff`（link textも白） |
| 横罫 | flavor/universal-block | width40px / height2px / bg `#c8a97e` / justify center |
| 3価値行 | flavor/universal-block | row / center / width100% / gap32 |
| 各価値 | flavor/universal-block | row / align center / gap24 |
| アイコン | core/image | width64px / height64px / sizeSlug full / id 53/54/55 / alt='' |
| └ テキスト塊 | flavor/universal-block | column / align flex-start / gap12 |
| H3 価値名 | core/heading L3 `is-style-section_ttl` | Serif 18/28 / ls 0.025em(=0.45px) / `#c8a97e`（link textも） |
| 説明文 | core/paragraph | Sans 14/28 / weight300 / `#ffffff` / `<br>`で2行 |
| 縦区切り線 ×2 | flavor/universal-block | width1px / height96px / bg `rgba(75,85,99,0.5)` |

letter-spacing px→em換算（基準フォントサイズ割）: 2.4/12=0.2em、0.75/30=0.025em、0.45/18=0.025em。

テキスト（一字一句）:
- 価値1 お客様目線 / `お客様一人ひとりの状況や想いを理解<br>し、最適なご提案を行います。`
- 価値2 誠実な対応 / `目先の利益ではなく、<br>長期的な信頼関係を大切にします。`
- 価値3 未来志向 / `将来を見据えた資産形成や<br>住まい選びをサポートします。`
