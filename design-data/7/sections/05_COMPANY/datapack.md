# データパック — 05 COMPANY (会社概要)

- **Figmaファイル**: `eZFYBaJDAN0PLLd7ITdvLR`
- **nodeId**: `1:1026`（name: `Section - COMPANY`）
- **デザイン幅**: 1440px（セクション高さ 784px）／コンテンツ幅 1152px・中央寄せ・左右マージン 144px
- **背景**: ダークネイビー `#0a192f`（Blue Zodiac）
- **概要**: ダークネイビー背景の会社概要セクション。背景に巨大な透かし文字「ASTERRA CORPORATION」。左カラムに「COMPANY / 会社概要」見出し＋会社概要の定義リスト（5項目）＋CTAボタン、右カラムにオフィス画像3枚（大1枚＋下端に重なる小2枚）。

---

## 1. レイアウト骨格

セクション（`1:1026`）: `flex-col`、`padding 128px 144px`（py 128 / px 144）、背景 `#0a192f`、size 1440×784。

```
Section 1:1026 (1440×784, bg #0a192f, padding 128/144)
├─ [装飾レイヤー] 透かし文字 ASTERRA CORPORATION（absolute / 後述）
└─ Container 1:1030  コンテンツ枠  max-width 1152 / w-full / px 32 / flex-col / gap 64
   ├─ Container 1:1031  見出しブロック  flex-col / gap 8 / w-full(=1088)
   │  ├─ Heading2 1:1032 → "COMPANY"（ゴールド）
   │  └─ Container 1:1034 → "会社概要"（グレー小）
   └─ Container 1:1036  2カラム行  flex(row) / gap 32 / w-full(=1088) / items-start
      ├─ 左カラム 1:1037  w 440.56(→440) / flex-col / justify-center / pr 32
      │  ├─ Descriptions:margin 1:1038  pb 40 / w-full
      │  │  └─ Descriptions 1:1039  flex-col / w 408.56(→408)
      │  │     ├─ 行 1:1040  flex(row) / py 12   会社名 : ...
      │  │     ├─ 行 1:1045  flex(row) / py 12   代表者 : ...
      │  │     ├─ 行 1:1050  flex(row) / py 12   所在地 : ...
      │  │     ├─ 行 1:1055  flex(row) / py 12   TEL    : ...
      │  │     └─ 行 1:1060  flex(row) / py 12   免許   : ...
      │  │        各行: Term(w 96) + Details(可変)
      │  └─ Container 1:1065  ボタン枠  w-full
      │     └─ Component1 1:1066  ボタン（ゴールド背景）
      └─ 右カラム 1:1067  w 615.44(→616) / min-h 400 / relative
         ├─ オフィス外観 1:1068  大画像（枠内 fill）615.44×400
         ├─ [装飾] Border 1:1069  オフィス内観 小画像（absolute / 後述）
         └─ [装飾] Border 1:1072  会議室 小画像（absolute / 後述）
```

### 寸法サマリ（生値 → 正規値）
| 要素 | 生値 | 正規値 | 備考 |
|---|---|---|---|
| セクション幅 | 1440 | 1440 | デザイン幅 |
| コンテンツ枠 max-width | 1152 | 1152 | 中央寄せ・左右マージン144 |
| コンテンツ枠 内側padding(px) | 32 | 32 | → 内側コンテンツ 1088 |
| 縦padding(py) | 128 | 128 | |
| 見出しブロック↔2カラム行 gap | 64 | 64 | item-spacing/xl |
| 2カラム gap | 32 | 32 | item-spacing/m |
| 左カラム幅 | 440.56 | 440 | pr 32 含む |
| 右カラム幅 | 615.44 | 616 | |
| 見出し COMPANY ↔ 会社概要 gap | 8 | 8 | item-spacing/8 |
| 定義リスト各行 padding(py) | 12 | 12 | |
| Term 幅 | 96 | 96 | |
| 定義リスト下 余白(pb) | 40 | 40 | ボタンとの間隔 |
| 右カラム min-height | 400 | 400 | 大画像の高さ |

---

## 2. テキスト（一字一句）

> term/detail は Figma 実コンテンツのまま。detail先頭の全角コロン「：」も原文どおり（マークアップ時に区切り記号として再現するか、装飾コロンに置換するかは実装側判断。原文は「：」で始まる）。

### 見出し
| ラベル | テキスト |
|---|---|
| 大見出し（英） | `COMPANY` |
| 小見出し（和） | `会社概要` |

### 定義リスト（term : detail）
| Term | Detail（原文ママ） |
|---|---|
| `会社名` | `：株式会社ASTERRA Corporation` |
| `代表者` | `：田中 太郎` |
| `所在地` | `：東京都港区南青山2丁目5-10-0` |
| `TEL` | `：03-5678-2000` |
| `免許` | `：東京都知事（1）第123456号` |

- 改行（`<br>`/⏎）: なし。各 detail は1行。
- 注記: detail はすべて全角コロン「：」始まり。`所在地` の行高だけ 22.75px（他は 20px）。`免許` の括弧は全角「（1）」。

### ボタン
| 要素 | テキスト |
|---|---|
| ボタンラベル | `会社概要を見る` |
| ボタン矢印 | `→`（U+2192、右矢印） |

> サンプルデータ（田中太郎 / 03-5678-2000 / 第123456号 等）はデザインのダミー値の可能性が高い。実値はクライアント確定情報で差し替える前提 → **要ユーザー確認**（後述インタラクション台帳）。

---

## 3. スタイル

### カラーパレット（このセクションで使用）
| 用途 | 生値（Figma） | 正規値 |
|---|---|---|
| セクション背景（ネイビー） | `#0a192f` (azure/11, Blue Zodiac) | `#0a192f` |
| 透かし文字 | `rgba(255,255,255,0.05)`（white/-5%） | `rgba(255,255,255,0.05)` |
| 大見出し COMPANY（ゴールド） | `#c5a059` (orange/56, Twine) | `#c5a059`（※ページ標準ゴールドは `#c2a24c`。本セクションは `#c5a059` で指定 → **要確認**） |
| 小見出し 会社概要 | `#9ca3af` (azure/65, Gray Chateau) | `#9ca3af` |
| Term / Detail テキスト | `#e5e7eb` (grey/91, Athens Gray) | `#e5e7eb` |
| ボタン背景 | `#c5a059` | `#c5a059` |
| ボタン文字 | `#ffffff` (white/solid) | `#ffffff` |
| 小画像枠 border | `rgba(255,255,255,0.1)`（white/-10%） | `rgba(255,255,255,0.1)`（1px solid） |
| 小画像 影 | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | 同左（shadow-xl相当） |

### タイポグラフィ
| 要素 | フォント | weight | size | line-height | letter-spacing | color | align |
|---|---|---|---|---|---|---|---|
| 透かし文字 ASTERRA CORPORATION | Noto Serif JP | 400 | 144px | 144px | 0 | rgba(255,255,255,.05) | 左／nowrap |
| 大見出し COMPANY | Noto Serif JP | 600 (SemiBold) | 36px | 40px | 3.6px | #c5a059 | 左 |
| 小見出し 会社概要 | Noto Sans JP | 400 | 12px | 16px | 1.2px | #9ca3af | 左 |
| Term（会社名等） | Noto Sans JP | 700 (Bold) | 14px | 20px | 0.7px | #e5e7eb | 左／nowrap |
| Detail（：…） | Noto Sans JP | 400 | 14px | 20px（所在地のみ 22.75px） | 0 | #e5e7eb | 左／nowrap |
| ボタンラベル 会社概要を見る | Noto Sans JP | 400 | 14px | 20px | 1.4px | #ffffff | center／nowrap |
| ボタン矢印 → | Noto Sans JP | 400 | 12px | 16px | 1.4px | #ffffff | — |

- ページ標準: 見出し=Noto Serif JP / 本文=Noto Sans JP。本セクションは見出し（透かし・COMPANY）が Serif、それ以外（会社概要小見出し・定義リスト・ボタン）が Sans で標準どおり。

### ボタン（Component 1 / `1:1066`）
- 背景: `#c5a059`、角丸なし（radius 0）
- padding: `16px 40px`（py 16 / px 40）
- レイアウト: flex(row) / `gap 16` / items-center / justify-center
- 中身: ラベル「会社概要を見る」+ 矢印「→」
- サイズ: 215×52（実測）

---

## 4. 装飾レイヤー

### (A) 背景透かし文字「ASTERRA CORPORATION」
- nodeId: `1:1029`（テキスト）。親 `1:1027`（x=176,y=120,1440×144）内の `1:1028`（x=-181.55,y=0,1803×144）に内包。
- **絶対座標（セクション 1:1026 基準）**:
  - x = 176 + (-181.55) = **-5.55px**（左端を約5.5pxはみ出す → 正規化 **-8px** に丸め可）
  - y = 120 + 0 = **120px**（セクション上端から120px）
  - サイズ: **1803 × 144px**（テキストは1803px幅・nowrap でセクション幅1440を大きく超える。右端は x=-5.55+1803=1797.45 まで伸び右へ357pxはみ出す）
- スタイル: Noto Serif JP / 400 / 144px / color `rgba(255,255,255,0.05)`。
- 重なり: コンテンツ（COMPANY見出し・定義リスト）の**背面**。見出しの「COMPANY」と透かしの「ASTERR…」が視覚的に重なる（design.png 参照）。
- 実装メモ: `position:absolute; overflow:hidden`（セクション）で左右はみ出しをクリップ。z-index でコンテンツより背面。pointer-events:none。

### (B) 大画像「オフィス外観」（1:1068）
- 右カラム `1:1067`（615.44×400）の枠内に fill（object-fit:cover 相当）。
- 装飾要素ではなくコンテンツ画像だが、下端で小画像2枚が重なる土台。

### (C) 小画像 左「オフィス内観」（Border 1:1069 + 画像 1:1071）
- right-col `1:1067` 基準の相対座標: x=**-77.56**, y=**310**, **276.94 × 150px**
- セクション基準 絶対座標: 右カラム左端 = 144(content) + 32(px) + 0 + 0... → コンテンツ内 x。**右カラム左上**を原点(0,0)とした相対で記録するのが安全:
  - 右カラム内 left = **-77.56px**（大画像の左端からさらに左へ77.56pxはみ出す）
  - 右カラム内 top = **310px**（大画像の下から90px地点。大画像下端400に対しbottom=460で60pxはみ出す → `bottom:-60px`）
- 枠: 1px solid `rgba(255,255,255,0.1)` + 影（shadow-xl）。内側に画像（1px インセット → 274.94×148）。
- 正規化: x **-80**, y **310**, size **277 × 150**。

### (D) 小画像 右「会議室」（Border 1:1072 + 画像 1:1074）
- right-col `1:1067` 基準の相対座標: x=**450.44**, y=**309**, **276.94 × 150px**
- 右カラム内 right端 = 450.44+276.94 = 727.38（右カラム幅615.44に対し右へ111.94pxはみ出す → `right:-18.19%`）。bottom = 309+150 = 459（大画像下端400に対し59pxはみ出す → `bottom:-59px`）。
- 枠/影: (C)と同一（1px solid rgba(255,255,255,0.1) + shadow-xl、画像1pxインセット）。
- 正規化: x **450**, y **309**（≒310）, size **277 × 150**。

### 画像3枚の重なり関係（design.png 準拠）
- 大画像（オフィス外観）が中央〜右に配置（615×400）。
- 小画像「オフィス内観」が大画像の**左下に重なり**、左へ約78pxはみ出し、下へ60pxはみ出す。
- 小画像「会議室」が大画像の**右下に重なり**、右へ約112pxはみ出し、下へ59pxはみ出す。
- 2枚の小画像は左右対称気味に大画像の底辺をまたいで配置され、白枠＋ドロップシャドウで浮いて見える。

---

## 5. アセット（guid確認済み）

WP取込先コンテナ: `wp-env-asterrra-wordpress-b07ac4e0-cli-1`（port 8918）。下記URLは `wp post list` で実取得（推測なし）。

| 役割 | ローカルファイル | 元(px) | 形式 | WP添付ID | 実URL（guid） |
|---|---|---|---|---|---|
| 大・オフィス外観（1:1068） | `company-office-exterior.jpg` | 1200×888 | jpeg | **23** | `http://localhost:8918/wp-content/uploads/2026/06/company-office-exterior.jpg` |
| 小・オフィス内観（1:1071） | `company-office-interior.png` | 600×401 | png | **24** | `http://localhost:8918/wp-content/uploads/2026/06/company-office-interior.png` |
| 小・会議室（1:1074） | `company-meeting-room.png` | 600×450 | png | **25** | `http://localhost:8918/wp-content/uploads/2026/06/company-meeting-room.png` |

- 外観画像は URL拡張子は .png だったが実体は JPEG だったため `.jpg` で保存・取込済み。
- 元レイヤー名（オフィス外観/オフィス内観/会議室）を alt 候補として記録。実 alt は要確認（ダミー画像のため本番差し替え想定）。

---

## 6. インタラクション台帳

| 要素 | 種別 | リンク先 / 挙動 |
|---|---|---|
| ボタン「会社概要を見る →」（1:1066） | リンクボタン | **リンク先 要ユーザー確認**（会社概要ページ等への遷移想定だが Figma にURL指定なし） |
| 大・小オフィス画像 | 画像 | リンクなし（静的表示） |
| 透かし文字 | 装飾 | 非インタラクティブ（pointer-events:none 推奨） |

### 要ユーザー確認まとめ
1. ボタン「会社概要を見る」のリンク先URL（未指定）。
2. 定義リストの値（会社名/代表者/所在地/TEL/免許）はダミーの可能性 → 本番値の有無。特に「株式会社ASTERRA Corporation」「田中 太郎」「03-5678-2000」「第123456号」。
3. 大見出しゴールドが `#c5a059`（本セクション指定）で、ページ標準ゴールド `#c2a24c` と微差。どちらに統一するか。
4. オフィス画像3枚は本番差し替え用の実写真の有無（現状はデザインのダミー）。

---

## 7. 正規化記録（生値 → 4/8pxグリッド正規値）

| 項目 | 生値 | 正規値 | 丸め根拠 |
|---|---|---|---|
| 左カラム幅 | 440.56 | 440 | 8px下丸め（pr32含む） |
| 右カラム幅 | 615.44 | 616 | 8px上丸め |
| 定義リスト幅 | 408.56 | 408 | 8px下丸め |
| 透かし x（絶対） | -5.55 | -8 | 4px下丸め（左はみ出し） |
| 透かし y（絶対） | 120 | 120 | グリッド一致 |
| 透かしサイズ | 1803×144 | 1804×144 | 幅は4pxへ／nowrap優先で実質可変 |
| 小画像 左 x（右カラム内） | -77.56 | -80 | 4/8px丸め |
| 小画像 左 y | 310 | 310 | 一致 |
| 小画像 右 x（右カラム内） | 450.44 | 450 | 下丸め |
| 小画像 右 y | 309 | 308 / 310 | ≒310（左と揃える） |
| 小画像サイズ | 276.94×150 | 277×150 | 上丸め |
| ボタンサイズ | 215×52 | — | padding16/40 起点で内容依存（固定不要） |
| 所在地 detail 行高 | 22.75 | 22.75 | 他行20px。原文どおり（任意で20pxに統一可・要判断） |

- 端数（.56 / .44 / .55）は Figma のオートレイアウト均等配分由来。コンテンツ枠 1088 = 440.56 + 32 + 615.44 が厳密一致するため、実装は **max-width 1152 / px32 / 2カラム gap32 / 左固定440・右flex** で再現可能（端数を直書きしない）。

---

## 検証用設計値（tree.js → フロント計測突合シート）

後工程はシリアライズ・挿入後、フロントの実測値を下記の属性数値と突合する。

### セクション骨格
| 要素 | 属性 | 期待値 |
|---|---|---|
| ルート loos/full-wide | bgColor | `#0a192f` |
| ルート | pcPadding / spPadding | `0` / `0` |
| コンテナ UB | max-width / width | 1152px / 100% |
| コンテナ UB | padding | top128 / right32 / bottom128 / left32 (px) |
| コンテナ UB | margin | 上0 / 右auto / 下0 / 左auto（中央寄せ） |
| コンテナ UB | gap（見出し↔2カラム） | 64px |
| コンテナ UB | position | relative（透かし基準・透かし自体は未配置） |

### 見出しブロック
| 要素 | 属性 | 期待値 |
|---|---|---|
| 見出しブロック UB | direction / gap | column / 8px |
| 大見出し COMPANY (h2) | content | `COMPANY` |
| 〃 | color.text / link.color | `#c5a059` / `#c5a059` |
| 〃 | font / weight / size / lh / ls | Noto Serif JP / 600 / 36px / 40px / 0.1em(=3.6px) |
| 〃 | className | `is-style-section_ttl`（SWELL装飾中和） |
| 小見出し 会社概要 (p) | content | `会社概要` |
| 〃 | color.text | `#9ca3af` |
| 〃 | font / weight / size / lh / ls | Noto Sans JP / 400 / 12px / 16px / 0.1em(=1.2px) |

### 2カラム行
| 要素 | 属性 | 期待値 |
|---|---|---|
| 2カラム行 UB | direction / justify / align / gap | row / flex-start / flex-start / 32px |
| 左カラム UB | width / justify / padding-right | 440px / center / 32px |
| 右カラム UB | width / min-height / position | 616px / 400px / relative |

### 定義リスト（左カラム内 / pb40 / w408 / gap0）
| 行 | term | detail（原文ママ） | detail lh |
|---|---|---|---|
| 1 | `会社名` | `：株式会社ASTERRA Corporation` | 20px |
| 2 | `代表者` | `：田中 太郎` | 20px |
| 3 | `所在地` | `：東京都港区南青山2丁目5-10-0` | **22.75px**（この行のみ） |
| 4 | `TEL` | `：03-5678-2000` | 20px |
| 5 | `免許` | `：東京都知事（1）第123456号` | 20px |

- 各行: row / py12 / gap0。Term UB = width96px固定 / Sans Bold 14/20 / ls0.05em(=0.7px) / `#e5e7eb`。Detail UB = flex1 / Sans Regular 14 / `#e5e7eb`。
- 定義リスト枠: width408px / column / gap0 / padding-bottom 40px。

### CTAボタン（core/buttons > core/button）
| 属性 | 期待値 |
|---|---|
| text | `会社概要を見る&nbsp;&nbsp;&nbsp;&nbsp;→`（ラベル+矢印、gap≈16px相当をnbsp4つで） |
| url | `/company/` |
| background / text | `#c5a059` / `#ffffff` |
| border.radius | `0px` |
| padding | py16 / px40 |
| font / weight / size / lh / ls | Noto Sans JP / 400 / 14px / 20px / 0.1em(=1.4px) |

### 右カラム画像（relative基準）
| 要素 | 属性 | 期待値 |
|---|---|---|
| 大画像 オフィス外観 | id / size / scale | 23 / 616×400px / cover |
| 小画像L オフィス内観(UB) | position | absolute / bottom -60px / left -78px |
| 〃 | size | 277×150px |
| 〃 内 core/image | id / scale / border | 24 / cover / 1px solid rgba(255,255,255,0.1) |
| 小画像R 会議室(UB) | position | absolute / bottom -59px / right -112px |
| 〃 | size | 277×150px |
| 〃 内 core/image | id / scale / border | 25 / cover / 1px solid rgba(255,255,255,0.1) |

### tree.js に含めなかった項目（要CSS）
1. **背景透かし文字「ASTERRA CORPORATION」** — コンテナ(max-width1152)外への breakout（セクション左端 -5.55px〜右へ約357pxはみ出し・1803px幅 nowrap）と overflow:hidden クリップが属性で表現不可。z-index背面・pointer-events:none も属性外。
2. **小画像2枚の box-shadow（shadow-xl: `0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)`）** — flavor の shadow Extension はあるが多重ドロップシャドウのカスタム値はフロントCSS未生成（白枠 1px のみ属性で実装済み）。

### 要ユーザー確認（datapack §6 既出・実装は Figma 値どおり）
- ボタンリンク先 `/company/`（FV/SERVICE と統一推定で仮置き。Figma未指定）。
- 定義リスト値はダミー（株式会社ASTERRA Corporation / 田中 太郎 / 03-5678-2000 / 第123456号）。
- ゴールド `#c5a059`（本セクション指定）vs ページ標準 `#c2a24c`。本実装は datapack 指定の `#c5a059` を採用。
