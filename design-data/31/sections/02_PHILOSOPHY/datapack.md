# データパック — 01 Philosophy（Section - 01 Philosophy）

- Figmaファイル: `eZFYBaJDAN0PLLd7ITdvLR`
- nodeId: `1:2028`（Section - 01 Philosophy）
- design.png: 1440 × 810（同フォルダ）
- セクション生座標（ページ内）: x=0, y=900, width=1440, height=810
- 背景: 白 `#ffffff`
- 構成: 左に写真コンポジション（営業写真の縦長＋建物写真／家族写真の縦2分割。カードボックス外へ食い出す重なり装飾）、右にラベル「01 / Our Philosophy」＋H2＋横罫＋本文2段落

---

## 1. レイアウト骨格

セクション全体（`1:2028` Section - 01 Philosophy）
- 背景色: `#ffffff`（白）
- レイアウト: 縦積み（column）、左寄せ items-start
- パディング: 上下 `130px` / 左右 `160px`（`px-[160px] py-[130px]`）

内側ボックス（`1:2029` Background+Border）
- サイズ: `1280 × 550px`（生座標 x=160, y=130）
- 背景色: `#f2f2f2`（グレー95）、border `#f2f2f2` 1px
- この淡グレーのボックスが「右テキスト群を載せる地」かつ「左写真群が食い出す土台」になる
- 子要素は全て **絶対配置**（写真群・テキスト群とも `absolute`）

絶対配置の子（このボックス 1280×550 ローカル原点基準）:
1. 左・縦長写真コンテナ（`1:2030`）— left `-51px` / top `-74px`、`342 × 553px`、drop-shadow
2. 右・縦2分割写真コンテナ（`1:2034`）— left `298px` / top `-74px`、`342 × 552px`、drop-shadow
3. 右テキスト群コンテナ（`1:2037`）— left `711px` / top `58px`、`530.75 × 434.69px`（垂直中央寄せ）

※写真コンテナ2つは top `-74px` で **ボックス上端から74px上にはみ出す**。左写真は left `-51px` で **左端からも51px外に食い出す**。これが「白背景 → グレーボックスの上に写真が浮く」重なり装飾の核（詳細は §4）。

右テキスト群（`1:2037`）内部の縦積み順（gap `25px`・上寄せ items-start）:
1. ラベル行（`1:2038` Container）— `530.75 × 40px`
   - 「01」（`1:2039` Margin、右パディング `20px`、幅63px）+ 「Our Philosophy」（`1:2041`）が横並び items-center
2. H2見出し（`1:2043` Heading 2）— `530.75 × 96px`（2行）
3. 横罫（`1:2045` Horizontal Divider）— `40 × 1px`、ゴールド
4. 本文（`1:2046` Paragraph）— `530.75px` 幅、上パディング `8.935px`、段落間 gap `29.75px`

---

## 2. テキスト（一字一句・改行 ⏎=`<br>`）

### ラベル
- `01`（node `1:2040`）
- `Our Philosophy`（node `1:2042`、表示は大文字 `OUR PHILOSOPHY`、CSS uppercase。元テキストは "Our Philosophy"）

### H2見出し（node `1:2044`、2行）
```
一度のお取引で終わらない、⏎
信頼関係を大切に。
```

### 本文 第1段落（node `1:2047`、3行）
```
私たちは、お客様一人ひとりの人生に寄り添い、⏎
さまざまな課題やお悩みに対して最適な解決策をご提案できる⏎
存在でありたいと考えています。
```

### 本文 第2段落（node `1:2048`、3行）
```
そのため、一度のお取引で終わる関係ではなく、⏎
その先も長く信頼していただけるパートナーとして、⏎
お客様を支え続けることを大切にしております。
```

---

## 3. スタイル（色・フォント・サイズ・字間・行高）

### 配色（実値・正規化済み）
| 用途 | 値 |
|---|---|
| セクション背景 | `#ffffff`（白） |
| 写真土台ボックス背景 | `#f2f2f2`（グレー95、Figma変数 color/grey/95） |
| 写真土台ボックス border | `#f2f2f2` 1px |
| ラベル（01 / OUR PHILOSOPHY）ゴールド | `#c5a86d`（Figma変数 color/orange/60。指示の `#c5a059` ではなく実値） |
| H2見出し | `#333333`（Figma変数 color/grey/20） |
| 横罫 | `#c5a86d`（ゴールド） |
| 本文 | `#666666`（Figma変数 color/grey/40、グレー） |

### タイポグラフィ
| 要素 | フォント | ウェイト | サイズ | 行高 | 字間 |
|---|---|---|---|---|---|
| 01（数字） | Noto Serif JP Medium | 500 | 40px | 40px | 1.28px |
| Our Philosophy | Jost Medium（uppercase） | 500 | 13px | 26px | 1.95px |
| H2見出し | Noto Serif JP Medium | 500 | 32px | 48px | 1.28px |
| 本文（2段落とも） | Noto Sans JP Regular | 400 | 14.5px | 30.45px | 1.28px |

備考:
- 指示の「見出し=Noto Serif JP・本文=Noto Sans JP」に一致。
- ラベル「Our Philosophy」は **Jost**（欧文）であってNoto Sansではない（数字「01」は Noto Serif JP）。
- 横罫の指示「横罫」は実体 `40px × 1px` のゴールド塗り矩形（`bg-[#c5a86d] h-px w-[40px]`）。

---

## 4. 装飾レイヤー（写真コンポジション・絶対配置）

写真群はグレー土台ボックス（`1:2029`、1280×550）に対し **全て絶対配置**。
座標はこの土台ボックスのローカル原点（左上 0,0）基準。

### 配置サマリ
| レイヤー | node | left | top | width | height | drop-shadow |
|---|---|---|---|---|---|---|
| 左・営業写真コンテナ | `1:2030` | `-51px` | `-74px` | `342px` | `553px` | `-10px 10px 15px rgba(0,0,0,0.25)` |
| 右・縦2分割写真コンテナ | `1:2034` | `298px` | `-74px` | `342px` | `552px` | `-10px 10px 15px rgba(0,0,0,0.25)` |

※両コンテナとも top `-74px` で土台ボックス上端から **74px 上にはみ出す**。
※左コンテナは left `-51px` で土台ボックス左端から **51px 外に食い出す**。
※2コンテナの横間隔: 右コンテナ left 298 − 左コンテナ(left -51 + width 342 = 291) = **7px の隙間**（≒ gap 8px相当）。

### 左・営業写真コンテナ（`1:2030`）内部
- `1:2031` Container: 342×553、中央寄せ・overflow-clip（クリップ枠）
- `1:2032` 営業写真フレーム: 342×596（クリップ枠より縦に長い → 上下クリップ）、生座標 top `-21.5px`
  - `1:2033` 画像本体（営業写真PNG）: 436×596、left `-47px` top `0`（横方向にもクリップ・左右切り詰め）
- 表示結果: **縦長1枚（≒342×553でクリップ表示）の営業写真**

### 右・縦2分割写真コンテナ（`1:2034`）内部
縦積み（column）、item間 gap `8px`、幅342px:
- `1:2035` 建物写真: 342 × **273.41px**（aspect 369/295）、生座標 top `0`
- `1:2036` 家族写真: 342 × **272.49px**（aspect 369/294）、生座標 top `281.41px`（＝建物273.41 + gap 8 = 281.41）
- 各画像は object-cover相当（コンテナにフィットさせ余剰をクリップ）

### 重なり構造の要点（実装指針）
- 白セクション内にグレー(#f2f2f2)の土台ボックス（1280×550）を中央に置く
- その上に写真3枚を **負のtop/leftで上・左へ食い出す絶対配置**で浮かせ、強いドロップシャドウで浮遊感を出す
- 右側テキスト群は土台ボックスの右半分（left 711〜）に垂直中央で配置
- ブロック属性のみでは「セクションをまたぐ負方向の食い出し（top -74px / left -51px）＋ドロップシャドウ」は表現困難 → 実装時はカスタムCSS要否をユーザー確認（wordpress/CLAUDE.md「ブロック属性ファースト」ルール）

---

## 5. アセット（新規import済み・guid確認済み）

WP取込済み（コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート8918）。`wp post list` で guid 確認済み（推測なし）。
拡張子は download_assets の `format` 準拠で **png**。

| 役割 | node（fill） | メディアID | post_title | guid(URL) | 元画像寸法 |
|---|---|---|---|---|---|
| 営業写真（左・縦長） | `1:2033` | **37** | philosophy-sales-photo | `http://localhost:8918/wp-content/uploads/2026/06/philosophy-sales-photo.png` | 567 × 775（縦長） |
| 建物写真（右上） | `1:2035` | **38** | philosophy-building-photo | `http://localhost:8918/wp-content/uploads/2026/06/philosophy-building-photo.png` | 587 × 383（横長） |
| 家族写真（右下） | `1:2036` | **39** | philosophy-family-photo | `http://localhost:8918/wp-content/uploads/2026/06/philosophy-family-photo.png` | 584 × 384（横長） |

> 注: download_assets は計6枚（各写真の高解像度版＋低解像度版）を返した。本datapackは**高解像度版**を採用（営業=567×775 / 建物=587×383 / 家族=584×384）。低解像度版（営業284×388 / 建物294×192 / 家族292×192）は不使用。md5でいずれも別物だが視覚内容は各ペア同一。

---

## 6. インタラクション台帳

| 要素 | 種別 | 内容 |
|---|---|---|
| Philosophyセクション全体 | — | CTAボタン・リンク要素 **なし**（Figmaノード内に検出されず） |
| 写真群 | 装飾 | リンク・ホバー指定なし（静的装飾） |

> Philosophy ノード内に CTA／ボタン／リンク要素は存在しない。ホバー・アニメーション指定も Figma 上は無し（あればフロント実装側の追加要素 → 要ユーザー確認）。

---

## 7. 正規化記録（生値→正規値）

| 項目 | 生値（Figma実測） | 正規値 | 備考 |
|---|---|---|---|
| 土台ボックス | 1280 × 550 | 1280×550px | そのまま |
| セクション padding | 130 / 160 | 上下130px・左右160px | py-130 px-160 |
| 左写真コンテナ left/top | -51 / -74 | **left -51px / top -74px** | 負方向の食い出し（丸めず保持） |
| 右写真コンテナ left/top | 298 / -74 | left 298px / top -74px | 同上 |
| 写真コンテナ幅 | 342 | 342px | 共通 |
| 左写真コンテナ高 | 553 | 553px | |
| 右写真コンテナ高 | 552 | 552px | |
| 建物写真高 | 273.4146 | **273px**（≒aspect 369/295） | サブピクセル丸め |
| 家族写真高 | 272.4878 | **272px**（≒aspect 369/294） | サブピクセル丸め |
| 縦2分割の gap | 8（family top 281.41 − 建物273.41） | 8px | item-spacing/xs |
| 2コンテナ間の横隙間 | 7（298 − 291） | 7px（≒8px） | 微小ギャップ |
| ドロップシャドウ | -10px 10px 15px rgba(0,0,0,0.25) | 同左 | 両写真コンテナ共通 |
| テキスト群 left/top | 711 / 58 | left 711px / top 58px | 垂直中央寄せ -translate-y-1/2 |
| テキスト群 縦gap | 25 | 25px | item-spacing/25 |
| 本文段落間 gap | 29.75 | 29.75px | item-spacing/29_75 |
| 本文 上パディング | 8.935 | 8.935px（≒9px） | pt |
| ラベル「01」右パディング | 20 | 20px | pr |
| 横罫 | 40 × 1 | 40px × 1px | ゴールド塗り |
| ゴールド | color/orange/60 = #c5a86d | #c5a86d | 指示の #c5a059 ではなく実値採用 |
| H2サイズ | font-size/32 = 32px | 32px | 行高48px |
| 本文サイズ | font-size/14_5 = 14.5px | 14.5px | 行高30.45px |
| 本文色 | color/grey/40 = #666 | #666666 | |
| H2色 | color/grey/20 = #333 | #333333 | |

---

## 8. 要確認事項

1. **ゴールド色**: 実値 `#c5a86d`（Figma変数 color/orange/60）。指示の `#c5a059` と差異あり。サイト全体のゴールド統一値に合わせるか要確認（本datapackは実値 #c5a86d で記録。03_MISSION 等の兄弟セクションも #c5a86d）。
2. **写真の負方向食い出し＋ドロップシャドウ**: top -74px / left -51px の食い出しと drop-shadow は SWELLブロック属性のみでは困難。実装着手前にカスタムCSS可否をユーザー確認（wordpress/CLAUDE.md「ブロック属性ファースト」）。
3. **インタラクション**: Figma上はホバー・アニメ指定なし。写真の浮遊/フェードイン等の動きを付けるかは要ユーザー確認（design-data上は静的記録）。
4. **左営業写真のクリップ**: 元画像567×775を342×553枠に上下左右クリップ表示（生座標 frame top -21.5・image left -47）。実装は object-fit:cover + フォーカス位置調整で再現可。

---

## 検証用設計値（tree.js 突合シート）

| 要素 | 属性 | 設計値 |
|---|---|---|
| root loos/full-wide | className / bgColor / padding | sec-philosophy / #ffffff / pc=0 sp=0 |
| 内側コンテナ | maxWidth / padding | 1440px / 上下130px・左右160px（Linked:false） |
| 写真土台ボックス | size / bg / position | 1280×550px（maxWidth100%）/ #f2f2f2 / relative |
| 左・営業写真(id37) | position / size / shadow | absolute left -51px top -74px / 342×553px / box-shadow custom:-10px 10px 15px rgba(0,0,0,0.25) / scale cover |
| 右・縦2分割コンテナ | position / size / gap / shadow | absolute left 298px top -74px / 幅342px / column gap8px / box-shadow custom同上 |
| └ 建物写真(id38) | size | 342×273px / cover |
| └ 家族写真(id39) | size | 342×272px / cover |
| 右テキスト群 | position / width / gap | absolute left 711px top 58px transform translateY(-50%) / 530.75px / column gap25px |
| ラベル「01」 | font / 色 / 字間 | Noto Serif JP 500 / 40px / lh40 / ls1.28px / #c5a86d / 右隣と gap20px |
| ラベル「OUR PHILOSOPHY」 | font / 色 | Jost 500 13px uppercase / lh26 / ls1.95px / #c5a86d |
| H2見出し | font / 色 / 内容 | Noto Serif JP 500 32px / lh48 / ls1.28 / #333333 / 一度のお取引で終わらない、<br>信頼関係を大切に。 |
| 横罫 | size / 色 | UB 40×1px / bg #c5a86d |
| 本文第1段落 | font / 色 / pt | Noto Sans JP 400 14.5px / lh30.45 / ls1.28 / #666666 / padding-top 8.935px |
| 本文第2段落 | font / 色 / mt | 同上 / margin-top 29.75px（段落間gap） |

### 実装上の判断メモ
- 負方向食い出し（top -74px / left -51px）= position 拡張で負値文字列指定 → 属性で表現可（CSS不要）。
- drop-shadow = shadow 拡張の `boxShadow:'custom:...'` で box-shadow 生成 → 属性で表現可（Figma の drop-shadow と同パラメータ。CSS不要）。
- 垂直中央寄せ = `positionTransform:'translateY(-50%)'`（position 拡張対応）で表現。
- 本文段落間 gap 29.75px は 2段落目の `paraSpacingMargin.top` で表現（テキスト群の column gap25px と区別）。
- 営業写真の上下左右クリップ（frame/image オフセット）は `scale:'cover'` で近似。厳密な focal point（image left -47 等）は属性外 → 必要なら object-position の微調整を別途検討。
