# 06_MESSAGE — 代表メッセージ (Representative Message)

- Figmaファイル: `eZFYBaJDAN0PLLd7ITdvLR`
- nodeId: `1:2132`（Section - Representative Message）
- セクション原寸: 1440 × 712px（白背景）
- 抽出日: 2026-06-16

---

## 1. レイアウト骨格

白背景・1カラムのテキストブロック（左）＋写真2枚の重なり装飾（右）の左右構成。
テキスト群は左揃え、署名のみ右揃え。背面に巨大なゴーストタイポ「MESSAGE」。

```
Section 1440×712  bg=#FFFFFF
└ padding: top/bottom 130px, left 144px, right 160px
  └ Container(1:2133) max-width 1120 / 内側 pr 40 / 高さ500 / gap 80（左テキスト列と右ガミー列）
     ├ Container(1:2134) 左テキスト列 width 1120
     │  ├ "MESSAGE"（英字ラベル・ゴールド）……… 上端 y=0
     │  ├ "代表メッセージ"（小・グレー）……………… gap 5px下
     │  ├ 本文パラグラフ1（pt 28.89px）……………… 3行
     │  │   ├ 背面ゴーストタイポ "MESSAGE"（absolute, 200px, ネイビー5%）
     │  │   └ 建物写真（absolute）
     │  ├ 仲間の写真（absolute）
     │  ├ 本文パラグラフ2（pt 19.195px）…………… 2行
     │  └ 署名ブロック（pt 45px, width 552, gap 2px, 右揃え）
     │       ├ "代表取締役"（12px グレー 右揃え）
     │       └ "時田 和輝"（18px ダーク 右揃え）
     └ Container(1:2152) 右の空ガミー列 x=1200 / 512×500（写真の浮遊スペース確保用・中身なし）
```

- 縦方向の段組（左テキスト列 1:2134 の子）は flex-column。要素間の基本 gap=5px、各ブロックが個別に padding-top を持つ（下記スタイル参照）。
- 写真2枚は通常フローではなく **absolute 配置の装飾レイヤー**（テキストの行送りに影響しない）。右の空コンテナ 1:2152 が写真の置き場として右側の余白を確保している。

---

## 2. テキスト（一字一句）

### ラベル
- 英字: `MESSAGE`（大文字）
- 和: `代表メッセージ`

### 本文 段落1（1:2141・3行 / 各行ブラウザ折返しではなくデザイン上の改行 ⏎=<br>）
```
私たちは、お客様の人生に寄り添う企業として、信頼される存在でありたい
と考えています。 一人ひとりの想いや課題に真摯に向き合い、最適なご提案
とサポートを通じて、安心と豊かさを届けることが私たちの使命です。
```
※「と考えています。」の後ろは半角スペース＋全角の文。「最適なご提案」の後も改行。原文の句読点・スペースを保持。

### 本文 段落2（1:2146・2行）
```
これからも変化を恐れず、挑戦を続けながら、お客様とともに未来を創造
し、長く信頼していただけるパートナーであり続けます。
```

### 署名（右揃え）
- 役職: `代表取締役`
- 氏名: `時田 和輝`（「時田」と「和輝」の間は全角スペース1つ）
  - ⚠ **氏名はデザインのダミー値の可能性が高い**。デザイン通り正確に抽出済み。後でクライアント確定情報に差し替え前提。

### 背面ゴーストタイポ（装飾）
- `MESSAGE`（大文字・巨大・ネイビー半透明 5%）

---

## 3. スタイル

### 配色（実値→正規値）
| 用途 | 生値 | 正規値 |
|---|---|---|
| 背景 | #FFFFFF | 白 #FFFFFF |
| 英字ラベル "MESSAGE" | #C5A86D（Laser） | ゴールド #C5A86D ※指定の #c5a059 とは別。Figma実値は #C5A86D |
| 和ラベル/本文 | #666666（Dove Gray） | グレー #666666 |
| 署名 役職 | #666666 | グレー #666666 |
| 署名 氏名 | #333333（Mine Shaft） | ダークグレー #333333 |
| 背面ゴーストタイポ | rgba(30,44,91,0.05) | ネイビー #1E2C5B を 5% 不透明（≒ネイビー #0a192f系の薄）|

### タイポグラフィ
| 要素 | font-family | weight | size | line-height | letter-spacing | 装飾 | align |
|---|---|---|---|---|---|---|---|
| 英字ラベル "MESSAGE" | Noto Serif JP | 500 (Medium) | 26px | 52px | 3.9px | uppercase | left |
| 和ラベル "代表メッセージ" | Noto Sans JP | 400 (Regular) | 11px | 22px | 1.32px | — | left |
| 本文（段落1/2） | Noto Sans JP | 400 (Regular) | 14px | 29.4px | 1.28px | — | left |
| 署名 役職 "代表取締役" | Noto Sans JP | 400 (Regular) | 12px | 24px | 1.2px | — | right |
| 署名 氏名 "時田 和輝" | Noto Serif JP | 500 (Medium) | 18px | 36px | 3.6px | — | right |
| 背面ゴースト "MESSAGE" | Noto Serif JP | 600 (SemiBold) | 200px | 40px(行高) | 10px | whitespace-nowrap | left |

※見出し系＝Noto Serif JP、本文系＝Noto Sans JP の方針に合致。

### 余白（正規化）
| 箇所 | 値 |
|---|---|
| Section padding | top 130 / right 160 / bottom 130 / left 144 (px) |
| Container 内 右 padding | 40px |
| Container 左テキスト列⇔右ガミー列 gap | 80px（実体は写真が absolute のためテキスト幅には影響なし） |
| 段組 基本 gap | 5px |
| ラベル "代表メッセージ" 上 | 57px（前要素から） |
| 本文段落1 padding-top | 28.89px → 正規 ≒ 29px |
| 本文段落2 padding-top | 19.195px → 正規 ≒ 19px（下 padding 0.585px ≒ 0） |
| 署名ブロック padding-top | 45px |
| 署名ブロック width | 552px / 内 gap 2px |

### 主要寸法
- 左テキスト列 width: 1120px（本文の折返し基準幅。1120は実体ガミー、実際の可読幅は写真領域を避けて左約 600px 程度）
- 署名ブロック width: 552px（右揃えの基準幅）

---

## 4. 装飾レイヤー（重なり配置・座標記録）

座標はセクション原点（1440×712 の左上 0,0）基準のグローバル値。

| レイヤー | nodeId | グローバル x,y | サイズ | z 重なり | 備考 |
|---|---|---|---|---|---|
| 背面ゴーストタイポ "MESSAGE" | 1:2142 | x=303, y=142(中心基準・上端 ≒122) | 1041×40(描画枠) フォント200px | 最背面 | ネイビー rgba(30,44,91,0.05)。本文の背後に大きく敷く。letter-spacing 10px |
| 建物写真 | 1:2143 | x=795, y=207 | 346×231 | 中間（人物写真より背面） | object-fit: cover。角丸なし（rounded-rectangle だが radius 実質0） |
| 仲間の写真 | 1:2144 | x=953, y=376 | 436×240 | 最前面（建物写真の上に重なる） | overflow:hidden で内部 img をややクロップ（img 高さ121.25%・top -6.67%・左 -0.06%・幅100.11%）。実質中央やや上トリミング |

### 重なり関係
- 建物写真 x:795–1141 / y:207–438
- 仲間の写真 x:953–1389 / y:376–616
- **重なり領域**: x 953–1141 / y 376–438（建物写真の右下に仲間の写真の左上が被さる）。仲間の写真が前面。
- 両写真とも右側で 1440 セクション幅に近づき（仲間の写真 右端=1389）、ビューポート右端付近に張り出す配置。実装時は右側 breakout/オーバーフローの検討が必要（要ユーザー確認領域）。

---

## 5. アセット（WP取込済み・guid 確認済み）

| 用途 | ローカルファイル | Figmaソース | WP添付ID | 実URL（guid確認済み） | 原寸 |
|---|---|---|---|---|---|
| 建物写真 | message-building.png | 1:2143 fill | **40** | http://localhost:8918/wp-content/uploads/2026/06/message-building.png | 1536×1024 |
| 仲間の写真 | message-team.png | 1:2144 fill | **41** | http://localhost:8918/wp-content/uploads/2026/06/message-team.png | 1536×1024 |

- download_assets は4枚返したが、内2枚（384×256）は上記2枚の低解像度ダブり（同一被写体）。高解像度版（1536×1024）のみを WP に取込。
- format=png（Figma 報告通り）。拡張子 .png で保存・取込。
- URL は `wp post list --post__in=40,41` で実値確認済み（推測なし）。

---

## 6. インタラクション台帳

- ホバー/クリック/リンク: **なし**（テキスト・写真ともリンクや状態変化の指定なし。プロトタイプ遷移なし）。
- 写真の `pointer-events: none` 指定あり（装飾扱い・操作不可）。
- アニメーション指定: Figma 上には無し（スクロールリビール等は実装側の判断領域）。

---

## 7. 要確認

1. 署名氏名「時田 和輝」はダミーの可能性大。クライアント確定の代表者氏名・役職に差し替え要。
2. 英字ラベルのゴールドは Figma 実値 **#C5A86D**（指定の #c5a059 と微差）。どちらを採用するか確認。
3. 写真2枚の右側張り出し（ビューポート右端への breakout・重なり z-index）はブロック属性だけでは表現困難。実装方針（カスタムCSS要否）をユーザー確認。

---

## 検証用設計値（tree.js 突合シート）

### ルート / レイアウト
| 対象 | ブロック | 主要属性 |
|---|---|---|
| ルート | loos/full-wide | className:'sec-message' / bgColor:#ffffff / contentSize:full / pcPadding:0 / spPadding:0 |
| 内側ラッパー | flavor/universal-block | positionType:relative / direction:row / maxWidth:1120px / padding T130 R0 B130 L0 / margin auto中央寄せ |
| 左テキスト列 | flavor/universal-block | direction:column / align:flex-start / width:100% / padding 右40px（§3 Container内右padding） |
| 署名ブロック | flavor/universal-block | direction:column / align:flex-end（右揃え） / width:552px / gap:2px / marginTop:45px |

### テキスト（一字一句・正規値）
| 要素 | ブロック | content | color | font | size/lh/ls | margin-top |
|---|---|---|---|---|---|---|
| 英字ラベル | core/heading L2 (is-style-section_ttl) | MESSAGE | #C5A86D | Serif 500 | 26/52/0.15em + uppercase | — |
| 和ラベル | core/paragraph | 代表メッセージ | #666666 | Sans 400 | 11/22/0.12em | 5px |
| 本文1 | core/paragraph | （3行・`<br>`2つ・半角スペース保持） | #666666 | Sans 400 | 14/29.4/0.0914em | 29px |
| 本文2 | core/paragraph | （2行・`<br>`1つ） | #666666 | Sans 400 | 14/29.4/0.0914em | 19px |
| 署名役職 | core/paragraph align:right | 代表取締役 | #666666 | Sans 400 | 12/24/0.1em | 0 |
| 署名氏名(仮) | core/paragraph align:right | 時田　和輝（全角SP1つ） | #333333 | Serif 500 | 18/36/0.2em | 2px |

### 装飾写真（absolute・親relative基準ローカル座標）
| 写真 | ID | size | scale | left/top | z-index | radius/shadow |
|---|---|---|---|---|---|---|
| 建物写真 | 40 | 346×231 | cover | 651/77px（global 795,207 − padding144,130） | 1（背面） | radius0 / shadowなし |
| 仲間写真 | 41 | 436×240 | cover | 809/246px（global 953,376 − padding144,130） | 2（前面） | radius0 / shadowなし |

### letter-spacing 換算根拠（px→em）
- MESSAGE: 3.9/26=0.15em ／ 代表メッセージ: 1.32/11=0.12em ／ 本文: 1.28/14=0.0914em
- 役職: 1.2/12=0.1em ／ 氏名: 3.6/18=0.2em

### 属性で不可 → 要CSS（後述報告参照）
- 背面ゴーストタイポ「MESSAGE」（rgba(30,44,91,0.05)・200px・::before案件）
- 写真2枚のビューポート右端 breakout（max1120 コンテナ外への右張り出し）
