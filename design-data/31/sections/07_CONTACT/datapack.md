# データパック: CONTACT（お問い合わせ）

- Figma file: `eZFYBaJDAN0PLLd7ITdvLR`
- nodeId: `1:2183`（name: "Section - CONTACT"）
- セクション natural size: 1440 × 521（canvas y=4744）
- スクショ: `design.png`（1440×521）
- 構成: トップページ CONTACT と同型 / 中央寄せ / ネイビー背景 / フォームなし

---

## レイアウト骨格

セクション全幅（1440px）。内側コンテナ最大幅 896px を水平中央配置し、その中の全要素を縦積み・中央寄せ。

```
Section - CONTACT (1440×521, bg ネイビー #1e2c5b, border-top 1px #020c1b)
└─ padding: top 129px / bottom 128px / 左右 272px
   └─ Container (max-width 896px, width 100%)
      └─ inner（display:flex column / align-items:center / gap 8px / px 16px）
         ├─ Heading 2 ── "CONTACT"（ゴールド見出し, h=40）
         ├─ Container ── "お問い合わせ"（白サブラベル, h=34）
         ├─ Horizontal Divider ── 横罫 40×2px（ゴールド #c8a97e）
         ├─ Container ── 本文（pt 32px / pb 40px）
         │     "不動産に関するご相談は、お気軽にお問い合わせください。"
         └─ Component 7 ── CTAボタン（278×60, bg ゴールド #c5a059）
```

### 寸法・座標（生値 from get_metadata, Container基準の相対座標）

| 要素 | nodeId | x | y | w | h |
|---|---|---|---|---|---|
| Section | 1:2183 | 0 | 4744(canvas) | 1440 | 521 |
| Container | 1:2184 | 272 | 129 | 896 | 264 |
| Heading 2（CONTACT枠） | 1:2185 | 16 | 0 | 864 | 40 |
| └ "CONTACT" text | 1:2186 | 331.5 | 0 | 201 | 40 |
| Container（お問い合わせ枠） | 1:2187 | 16 | 48 | 864 | 34 |
| └ "お問い合わせ" text | 1:2188 | 393 | 0 | 78 | 16 |
| Horizontal Divider 横罫 | 1:2189 | 428 | 90 | 40 | 2 |
| Container（本文枠） | 1:2190 | 16 | 100 | 864 | 96 |
| └ 本文 text | 1:2191 | 216 | 32 | 432 | 24 |
| Component 7（CTAボタン） | 1:2192 | 309 | 204 | 278 | 60 |

縦の積み: gap=8px（要素間）。本文枠は内部に pt32/pb40 を持つため、見た目の上下余白がここで稼がれる。
※ pt 129px / pb 128px の 1px 差は border-top 1px ぶん。実装上は上下 128px + border-top 1px として扱ってよい（正規化記録参照）。

---

## テキスト（一字一句・改行なし）

| 役割 | テキスト |
|---|---|
| 見出し（英） | `CONTACT` |
| サブラベル（和） | `お問い合わせ` |
| 本文 | `不動産に関するご相談は、お気軽にお問い合わせください。` |
| CTAボタン ラベル | `無料相談はこちら` |
| CTAボタン 矢印 | `→` |

改行（`<br>`）は無し。すべて 1行（whitespace:nowrap）。

---

## スタイル

### 配色（実値）

| 用途 | HEX | 名称 |
|---|---|---|
| セクション背景 ネイビー | `#1e2c5b` | （ベタ指定。トークン経由でない実値） |
| セクション border-top | `#020c1b` | Blue Charcoal（azure/6）, 1px solid |
| 見出し CONTACT 文字 | `#c5a059` | ゴールド（orange/56 / Twine） |
| サブラベル お問い合わせ 文字 | `#ffffff` | 白（white/solid） |
| 横罫 | `#c8a97e` | Tan（orange/64）※見出しより薄いゴールド |
| 本文 文字 | `#d1d5db` | Mischka（azure/84）薄グレー寄りの白。スクショ上はほぼ白に見えるが実値は #d1d5db |
| CTAボタン 背景 | `#c5a059` | ゴールド（Twine） |
| CTAボタン 文字（ラベル/矢印） | `#ffffff` | 白 |

### タイポグラフィ

| 要素 | font-family | weight | size | line-height | letter-spacing | text-align | transform |
|---|---|---|---|---|---|---|---|
| 見出し CONTACT | Noto Serif JP | 600 SemiBold | 36px | 40px | 3.6px | center | — |
| サブラベル お問い合わせ | Noto Sans JP | 400 Regular | 12px | 16px | 1.2px | center | uppercase（和文に影響なし） |
| 本文 | Noto Sans JP | 400 Regular | 16px | 24px | 0（normal） | center | — |
| CTAラベル 無料相談はこちら | Noto Sans JP | 700 Bold | 14px | 20px | 1.4px | center | — |
| CTA矢印 → | Noto Sans JP | 700 Bold | 12px | 16px | 1.4px | center | — |

※ 見出しのみ Noto Serif JP（明朝）、それ以外は Noto Sans JP（ゴシック）。指示通り。

### 余白（padding / gap）

| 箇所 | 値 |
|---|---|
| セクション padding | 上 128px（+border-top 1px）/ 下 128px / 左右 272px |
| Container 内側 px | 16px（左右） |
| 縦積み gap（見出し～サブ～罫～本文枠～ボタン） | 8px |
| 本文枠の内側 | padding-top 32px / padding-bottom 40px |
| CTAボタン padding | 上下 20px / 左右 64px |
| CTAボタン 内 gap（ラベル↔矢印） | 16px |

---

## 装飾レイヤー

1. **横罫（Horizontal Divider, 1:2189）** — 40×2px、塗り `#c8a97e`（Tan / 薄ゴールド）。見出しブロックと本文の区切り装飾。角丸 rounded-rectangle として定義されているが 2px 高なので実質ライン。
2. **CTAボタンの影（I1:2192;1:836 "Link:shadow"）** — ボタン全面に重なる absolute レイヤー。
   - box-shadow: `0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`（Tailwind shadow-lg 相当）
   - 背景: `rgba(255,255,255,0)`（透明オーバーレイ。実質ホバー用の白オーバーレイ枠）
3. セクション **border-top 1px solid `#020c1b`** — 上セクションとの境界線。

---

## アセット

**アセットなし**。背景画像・SVG・ロゴ等の埋め込み画像は存在しない（背景はベタ塗りネイビー、矢印はテキスト文字 `→`）。

---

## インタラクション台帳

| 要素 | ラベル | リンク先（想定） | 備考 |
|---|---|---|---|
| CTAボタン（Component 7） | 無料相談はこちら → | お問い合わせページ（`/contact/` 等、要確認） | Figma上にリンクURLの明示なし。"無料相談はこちら" の文脈からお問い合わせ導線。hover で白オーバーレイ（Link:shadow レイヤー）が想定される |

- フォーム要素なし（入力欄・送信ボタンは無し。CTAボタンのみ）。

---

## 正規化記録（生値 → 正規値）

| 項目 | 生値 | 正規値 | 根拠 |
|---|---|---|---|
| セクション padding-top | 129px | 128px + border-top 1px | 129 = 128 + border 1px。上下対称（128/128）が設計意図 |
| セクション padding-bottom | 128px | 128px | そのまま |
| 横罫 幅 | 40px | 40px | 指示の「横罫(40×2)」と一致 |
| 横罫 高さ | 2px | 2px | 指示と一致 |
| Container max-width | 896px | 896px | そのまま |
| CTAボタン 実寸 | 278×60 | padding由来（左右64/上下20）で自動 | テキスト幅依存。固定幅指定ではない |
| 本文色 | #d1d5db | #d1d5db（維持） | スクショでは白く見えるが design context 実値は Mischka #d1d5db。要確認候補 |
| ネイビー背景 | #1e2c5b | #1e2c5b | ベタ実値（トークン経由でなく直値） |

### 要確認ポイント

- **CTAリンク先**: Figma にURL定義なし。お問い合わせページ想定だがWP実装時に確定が必要。
- **本文色 #d1d5db**: スクショ上はほぼ白。トップページCONTACTと厳密に揃えるなら同色（#d1d5db）を踏襲。

---

## 検証用設計値

トップページ（page 7）CONTACT と同型。root `loos/full-wide` の `className` のみ `sec-about-contact`。

### ブロックツリー（5ブロック）

```
loos/full-wide  className:'sec-about-contact'  bgColor:#1e2c5b  contentSize:full  pcPadding/spPadding:0
└─ flavor/universal-block  column/center/center  width:100%  maxWidth:896
      padding T128/R16/B128/L16(unlinked)  margin auto(左右)  gap:8px
   ├─ core/heading  h2  is無し(textAlign:center)  "CONTACT"
   │     #c5a059(text+link)  Noto Serif JP 600  36/40  letter:0.1em
   ├─ core/paragraph  align:center  "お問い合わせ"
   │     #ffffff  Noto Sans JP 400  12/16  letter:0.1em  uppercase
   ├─ flavor/universal-block  Divider  justify:center  W40px H2px  bg:#c8a97e
   ├─ flavor/universal-block  Lead  column/center  width:100%  padding T32/B40(unlinked) gap:0
   │   └─ core/paragraph  align:center  "不動産に関するご相談は、お気軽にお問い合わせください。"
   │         #d1d5db  Noto Sans JP 400  16/24
   └─ core/buttons
       └─ core/button  text:"無料相談はこちら　→"  url:/contact/
             bg:#c5a059 / text:#ffffff  radius:0px  padding 20/64/20/64  Noto Sans JP 700  14/20  letter:0.1em
```

### 主要設計値マッピング

| 項目 | 値 | 出所 |
|---|---|---|
| セクション背景 | #1e2c5b | datapack配色（実値） |
| 内側コンテナ max-width | 896px | datapack骨格 |
| セクション padding 上下 | 128px / 128px | 正規化記録（129=128+border1px） |
| 縦積み gap | 8px | datapack余白 |
| 見出し色 / フォント | #c5a059 / Noto Serif JP 600 36/40 0.1em | datapackタイポ（letter 3.6px=0.1em@36px） |
| サブラベル色 / フォント | #ffffff / Noto Sans JP 400 12/16 0.1em uppercase | datapackタイポ（1.2px=0.1em@12px） |
| 横罫 | 40×2px #c8a97e 中央 | datapack装飾レイヤー1 |
| 本文枠 padding | 上32 / 下40 | datapack余白 |
| 本文色 / フォント | #d1d5db / Noto Sans JP 400 16/24 | datapackタイポ（白く見えるが実値踏襲） |
| CTA 背景 / 文字 | #c5a059 / #ffffff | datapack配色 |
| CTA padding / 角丸 | 20/64/20/64 / 0px | datapack余白 |
| CTA フォント | Noto Sans JP 700 14/20 0.1em | datapackタイポ（1.4px=0.1em@14px） |
| CTA リンク先 | /contact/ | 固有情報指定（datapackは要確認 → /contact/ で確定） |
| CTA ラベル | 無料相談はこちら　→ | ラベル+矢印を全角スペースで連結（gap16px相当） |

### 属性で表現不可（要CSS報告・このtree.jsには含めない）

1. **CTAボタンの影** — `box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)`（shadow-lg）。core/button 属性に box-shadow なし。
2. **セクション border-top 1px solid #020c1b** — loos/full-wide に上端border属性なし。padding は上下128で対称化済み（border 1px分は別途CSS）。
