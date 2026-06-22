# データパック — Section 04 Future（フォルダ名 05_FUTURE）

- Figma file: `eZFYBaJDAN0PLLd7ITdvLR`
- 構成ノード:
  - `1:2168`（name="04 写真"）= 全幅背景写真
  - `1:2169`（name="Overlay"）= ネイビー系オーバーレイ
  - `1:2170`（name="Container"）= テキストコンテンツ
- 抽出方針: レンダリング結果・テキスト・数値・アセットのみ採用。レイヤー名は信用しない。
- レンダリング: `design.png`（Container `1:2170` のみ。白文字＋透明背景のため本文/H2はこの画像に写らない＝get_design_context テキストが正）、`design-bg.png`（背景写真 `1:2168`）

---

## 1. レイアウト骨格

全幅（1440×660）の背景写真の上にネイビー系オーバーレイ（80%）を重ね、その上に左寄せのテキストコンテンツが乗る二層構成。テキストは「04 / Future」ラベル → H2 → 横罫（ゴールド）→ 本文2段落の縦積み。背景写真＋オーバーレイの上にテキストが乗る。

### 帰属・座標系（canvas絶対）

| ノード | 役割 | x | y | w | h |
|---|---|---|---|---|---|
| `1:2168` 04 写真 | 背景写真（全幅） | 0 | 3372 | 1440 | 660 |
| `1:2169` Overlay | ネイビーオーバーレイ | 0 | 3374 | 1440 | 660 |
| `1:2170` Container | テキストコンテンツ | 176 | 3512 | 1120 | 379.19 |

- セクション領域は背景写真 `1:2168` 基準で **y=3372〜4032（高さ660px・全幅1440px）**。
- オーバーレイ `1:2169` は写真より2px下（y=3374）開始だが、実質写真と同領域に全面被せる装飾。実装上は写真と同サイズ・同位置で重ねる。
- Container は左 x=176（= 1440基準で左右**176pxマージン**、内側コンテンツ幅1120px）。Container 内部にさらに `px-[40px]`（左右40px）があるため、テキスト本体の左端は絶対 x=216。
- 縦位置: Container top=3512 はセクション上端3372から **+140px**。Container 下端=3512+379.19=3891.19、セクション下端=4032 → 下に **140.81px**。→ テキストブロックはセクション内で**ほぼ上下中央**（上下とも約140px余白）。

### ネスト（生値・Container内相対）

```
Container 1:2170  (abs x176 y3512  w1120 h379.19)  flex-col gap25, items-start, px40
├ Container 1:2171 [ラベル行] (x40 y0  w1040 h40, flex-row items-center)
│  ├ Margin 1:2172 (w67 h40, pr20)
│  │  └ text 1:2173 "04" (x0 y0  w47 h40)
│  └ Container 1:2174 (x67 y7  w56 h26)
│     └ text 1:2175 "Future" (w56 h26, uppercase表示)
├ Heading2 1:2176 (x40 y65  w1040 h101, pb5)
│  └ text 1:2177 "変化を恐れず、 / 新たな価値を創造する。" (w1040 h96)
├ Divider 1:2178 [横罫] (x40 y191  w40 h1, bg #c5a86d)
└ Paragraph 1:2179 (x40 y217  w780 h162.19, flex-col gap30.31, pt9.22, max-w780)
   ├ text 1:2180 [本文1段落] (y9.22  w612 h61)
   └ text 1:2181 [本文2段落] (y100.53  w597 h61)
```

> 座標 x40 は Container の px-[40px] 由来。実装ではラベル/H2/罫/本文はすべて同じ左端（Container内40px、絶対216px）に揃う。

---

## 2. テキスト（一字一句・改行=<br>）

### ラベル
- `04`（数字）
- `Future`（元値 "Future"・CSS `uppercase` で表示 → 表示は **"FUTURE"**）

### H2（見出し / 2行・各行で改行）
```
変化を恐れず、<br>
新たな価値を創造する。
```

### 本文 第1段落（`1:2180`・2行・行末改行）
```
変化の激しい時代だからこそ、現状に満足することなく挑戦を続け、<br>
新たな価値を創造しながら、お客様とともに成長していく企業を目指してまいります。
```

### 本文 第2段落（`1:2181`・2行・行末改行）
```
そして、私たちの事業活動を通じて、お客様の豊かな未来の実現に貢献できるよう、<br>
社員一丸となって最良 of サポートを提供し続けて参ります。
```

> ⚠ **要確認（誤記疑い）**: 第2段落末尾「社員一丸となって**最良 of サポート**を提供し続けて参ります。」の「 of 」は Figma 原データそのままの値（get_design_context・get_metadata のレイヤー名どちらも一致）。日本語文脈として不自然で、本来「**最良のサポート**」（"の"の誤入力）と思われる。**抽出値は原文を保持**したが、実装前に正しい表記をユーザーへ要確認。
>
> 段落間は空き（gap 30.31px ≈ 30px）。各段落内は行末で改行（whitespace-nowrap で折り返さない設計＝意図した改行位置を <br> で再現する）。

---

## 3. スタイル（生値 → 正規値）

配色実値（指定パレット照合）: ネイビー #0a192f / #1e2c5b・ゴールド #c5a059・白・グレー #e5e7eb。
本セクションの抽出実値は以下（オーバーレイのネイビーは実測 #0a1631、ゴールドは実測 #c5a86d。いずれも**実測値を優先採用**）。

### 配色（実測）
| 用途 | 実測値 | 備考 |
|---|---|---|
| 背景オーバーレイ | `rgba(10,22,49,0.8)` = `#0a1631` @80% | ネイビー系（パレット #0a192f に近い実測。不透明度80%） |
| ラベル "04" / "FUTURE" / 横罫 | `#c5a86d` | ゴールド（パレット指定 #c5a059 に近い実測値） |
| H2 見出し | `#ffffff`（白） | 完全不透明の白 |
| 本文 | `rgba(255,255,255,0.85)` | 白85%（半透明白） |

### タイポグラフィ（生値 → 正規値）
| 要素 | フォント | size生 | →正規 | weight | line-height生→正規 | letter-spacing |
|---|---|---|---|---|---|---|
| "04" | Noto Serif JP / Medium | 40 | 40px | 500 | 40 → 40px | 1.28px |
| "Future" | Jost / Medium（uppercase） | 13 | 13px | 500 | 26 → 26px | 1.95px |
| H2 | Noto Serif JP / Medium | 32 | 32px | 500 | 48 → 48px | 1.28px |
| 本文 | Noto Sans JP / Regular | 14.5 | 14px or 15px ※ | 400 | 30.45 → 30px | 1.28px |

※ 本文 size 14.5px は端数。正規化すると 14px or 15px（sibling 03 Value と同一値・同方針）。見出し=Noto Serif JP・本文=Noto Sans JP の方針に一致。"Future" のみ Jost（欧文ラベル）。

### 間隔（生値 → 正規値）
| 箇所 | 生値 | 正規値 |
|---|---|---|
| Container 内 縦gap（ラベル⇄H2⇄罫⇄本文） | 25 | 25px |
| 段落間 gap（1段落⇄2段落） | 30.31 | 30px |
| 本文ブロック上 padding-top | 9.22 | 約9px（≒ライン調整分。実装では省略可） |
| Heading2 下 padding-bottom | 5 | 5px |
| ラベル "04" 右 padding | 20 | 20px |
| Container 左右 padding | 40 | 40px |
| セクション 左右マージン（Container 配置） | 176 | 176px（1440基準。内側コンテンツ幅1120） |
| 本文ブロック幅 | 780 | 780px（max-width 780px） |

### 横罫（divider）
- w=40px / h=1px / bg #c5a86d / rounded-rectangle（実質1pxライン）

---

## 4. 装飾レイヤー（背景写真＋オーバーレイ・横罫）

> 全幅背景写真＋ネイビーオーバーレイの上にテキストが乗る構成。装飾は座標で記録。

### 背景写真 `1:2168`（全幅・最背面）
- 配置: canvas絶対 x=0 / y=3372 / **w=1440 / h=660**（全幅フルブリード）
- 内容: 夕暮れの都市夜景（東京スカイライン・トワイライト）
- object-fit: cover 想定（660px 高に対し原画 1536×1024 をトリミング表示）
- アセット: 後述（WP ID 42）

### オーバーレイ `1:2169`（背景写真の上・テキストの下）
- 配置: canvas絶対 x=0 / y=3374 / w=1440 / h=660（写真と同領域に全面被せ）
- 塗り: `background: rgba(10,22,49,0.8)`（ネイビー #0a1631・不透明度80%）
- 役割: 写真上の白テキスト可読性を確保するスクリーンオーバーレイ。写真と同サイズで重ねる。

### 横罫 `1:2178`（コンテンツ内装飾）
- w=40px / h=1px / bg `#c5a86d`（ゴールド）。H2 と本文の間にゴールドの短い区切り線。

### 重なり順（z 下→上）
1. 背景写真 `1:2168`
2. ネイビーオーバーレイ `1:2169`（rgba(10,22,49,0.8)）
3. テキストコンテンツ `1:2170`（ラベル/H2/横罫/本文）

---

## 5. アセット（guid確認済み・WP取込）

WPコンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1`（port 8918）に import 済み。

| 用途 | ファイル(ローカル assets/) | 元解像度 | 表示サイズ | WP ID | 実URL（guid確認済み） |
|---|---|---|---|---|---|
| 背景写真（全幅・都市夜景） | `future-bg-cityscape.png` | 1536×1024 (RGB) | 1440×660 | **42** | `http://localhost:8918/wp-content/uploads/2026/06/future-bg-cityscape.png` |

- ローカル保存先: `05_FUTURE/assets/`（高解像度オリジナル source 画像を採用。Figma raw image 1536×1024 を import）
- format: png（Figma raw image の format=png 準拠）
- URL は `wp post list --post_type=attachment --post__in=42 --fields=ID,guid` で実値確認済み（推測なし）
- 注: Figma export（1440×660 にトリミング済み）ではなく、トリミング前の高解像度オリジナルを採用。表示時に object-fit:cover で 1440×660 にトリミングする想定。

---

## 6. インタラクション台帳

- リンク / ボタン / ホバー: **なし**（このセクションに CTA・遷移要素は無し。背景写真＋オーバーレイ＋テキストのみ）
- アニメーション: Figma静的データからは判定不可（スクロールreveal・背景パララックス等は実装側の設計事項）

---

## 7. 要確認・申し送り

1. **本文「最良 of サポート」**: Figma原データそのまま（"の" の誤入力疑い）。実装前に「最良のサポート」が正か、ユーザーへ要確認。**抽出値は原文保持**。
2. **本文フォントサイズ 14.5px** は端数。14px か 15px のどちらに正規化するか実装時に決定（sibling 03 Value と同一・物差しで突合）。
3. **全幅背景写真のフルブリード**: 1440幅フルブリード（ビューポート全幅張り出し）。SWELL full-wide 等で属性表現不可な breakout はカスタムCSS事前確認領域。
4. **オーバーレイ実装**: 背景写真の上に rgba(10,22,49,0.8) のネイビーレイヤーを全面重ね。`background-image` + `::before` オーバーレイ、または cover ブロックの dim 機能で実現可否を検討。
5. **テキスト縦位置**: セクション内で上下約140px余白の中央寄せ。背景写真高660px固定の中でテキストブロックを垂直中央に配置。

---

## 検証用設計値（tree.js 実装値・突合用）

ページID 31 / セクション「04 Future」/ root `loos/full-wide` className:`sec-future`。

### ブロックツリー構成
```
loos/full-wide  className:'sec-future'  bgColor #0a192f / contentSize:full / pcPadding,spPadding:0
└ flavor/universal-block [Futureラッパー]  width100% / min-height660px / column・justify:center・align:center
     backgroundImageUrl(ID42) / Size:cover / Position:center
     backgroundOverlayColor:#0a1631 / backgroundOverlayOpacity:80  → ::after rgba(10,22,49,0.8)
     padding top140/bottom140 px（左右0）
  └ flavor/universal-block [Futureテキスト群]  width100% / max-width1120px / margin左右auto（中央寄せ）
       padding 左右40px（実描画幅1040）/ column・左寄せ / blockGap25px
     ├ flavor/universal-block [ラベル行]  row・items-center / blockGap20px
     │   ├ core/paragraph "04"     GOLD #c5a86d / Serif40px/40px/500 / ls0.032em(1.28px)
     │   └ core/paragraph "FUTURE" GOLD #c5a86d / Sans13px/26px/500 / ls0.15em(1.95px)
     ├ core/heading(H2) is-style-section_ttl  "変化を恐れず、<br>新たな価値を創造する。"
     │   WHITE #ffffff / Serif32px/48px/500 / ls0.04em(1.28px)
     ├ flavor/universal-block [横罫]  width40px / height1px / bg GOLD #c5a86d
     └ flavor/universal-block [本文ブロック]  max-width780px / column / blockGap30px
         ├ core/paragraph 本文1  WHITE85% rgba(255,255,255,0.85) / Sans15px/30px/400 / ls0.085em
         └ core/paragraph 本文2  同上（"最良のサポート" 修正反映）
```

### 配色（実測値・上書き禁止）
| 用途 | 値 |
|---|---|
| full-wide フォールバック地 | `#0a192f` |
| 背景オーバーレイ | `backgroundOverlayColor:#0a1631` + `backgroundOverlayOpacity:80` → `rgba(10,22,49,0.8)` |
| ラベル "04"/"FUTURE" / 横罫 | `#c5a86d`（ゴールド） |
| H2 | `#ffffff`（白 solid） |
| 本文 | `rgba(255,255,255,0.85)`（白85%） |

### タイポgrafi（正規値）
| 要素 | フォント | size | weight | line-height | letter-spacing |
|---|---|---|---|---|---|
| "04" | Noto Serif JP | 40px | 500 | 40px | 0.032em |
| "FUTURE" | Noto Sans JP(※Jostフォールバック) | 13px | 500 | 26px | 0.15em |
| H2 | Noto Serif JP | 32px | 500 | 48px | 0.04em |
| 本文 | Noto Sans JP | 15px | 400 | 30px | 0.085em |

### 間隔（正規値）
| 箇所 | 値 |
|---|---|
| ラッパー上下padding（テキスト垂直中央化） | 140px / 140px |
| テキスト群 内側左右padding | 40px |
| テキスト群 子間 縦gap | 25px |
| ラベル "04"⇄"FUTURE" gap | 20px |
| 本文 段落間gap | 30px |
| 横罫 | w40px × h1px |
| 本文ブロック max-width | 780px |
| テキスト群 max-width / 中央寄せ | 1120px / margin左右auto |
| ラッパー min-height | 660px |

### 本文（実装文・⏎=<br>）
- 第1段落: `変化の激しい時代だからこそ、現状に満足することなく挑戦を続け、⏎新たな価値を創造しながら、お客様とともに成長していく企業を目指してまいります。`
- 第2段落: `そして、私たちの事業活動を通じて、お客様の豊かな未来の実現に貢献できるよう、⏎社員一丸となって最良のサポートを提供し続けて参ります。`（**ユーザー指示で "of"→"の" 修正反映**。他は原文どおり）

### 実装メモ
- **uppercase**: "Future"→"FUTURE" は表示文字列を直接記述して再現（text-transform 属性なし）。
- **Jost フォント**: 欧文ラベル "FUTURE" の Jost はサイト未読込のため Noto Sans JP にフォールバック。完全再現が必要なら要CSS/フォント追加。
- **オーバーレイ**: block-background-image 拡張の正式属性名は `backgroundOverlayColor`（hex）+ `backgroundOverlayOpacity`（0-100文字列）。PHP が hex→rgba 変換。`OverlayColor`/`OverlayOpacity`（接頭辞background無し）は誤り＝無効。
- **レイヤリング**: 拡張が `::before`(画像 z0) / `::after`(overlay z1) / 直下子要素(z2) と `position:relative` `overflow:hidden` を自動付与。手動 z-index 不要。
