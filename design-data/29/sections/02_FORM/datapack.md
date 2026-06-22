# 02_FORM データパック — Contact Form Section

- **Figma**: fileKey `eZFYBaJDAN0PLLd7ITdvLR` / nodeId `1:4019`（Contact Form Section）
- **デザイン幅**: 1152px（ページコンテンツ幅。デザイン全体幅1440 − 左右マージン144×2 = 1152）
- **スクショ**: `design.png`（1152×1109、Figmaレンダリング結果）
- **構成**: [リード文（中央寄せ）] ＋ [2カラム本体：左=フォームの器 / 右=連絡先情報カード（ネイビー）]
- **重要**: 左カラムは **器（白フォームカード）の寸法・背景・余白・角丸・影だけ** を記録。フォーム入力欄群は Snow Monkey Forms で別実装するため細部は抽出対象外。右カードは全テキスト・スタイルを一字一句／数値で記録。

---

## 1. レイアウト骨格

### セクション全体（`1:4019` Contact Form Section）
- 生座標: x=144, y=594, width=**1152**, height=1087（metadata）
- 内側パディング: 左右 `px-[64px]`（上下パディングなし）→ 内コンテンツ幅 = 1152 − 64×2 = **1024px**
- 子の並び: 縦 flex、`gap 64px`、`items-start`
  1. Lead Text（`1:4020`）
  2. Main Content: Form & Info（`1:4022`）

### リード文ブロック（`1:4020` Lead Text）
- width 1024（内コンテンツ全幅）、`items-center`（テキスト中央寄せ）
- 高さ 48px（2行 × line-height 24）

### 2カラム本体（`1:4022` Main Content: Form & Info）
- width **1024**、`min-height 975px`、横 flex、`gap 32px`、`items-start`
- **左カラム（器）**: width **660.5px**、`self-stretch`（高さは行の最大に伸張）
- **右カラム（カード）**: width **331.5px**、`self-stretch`
- 検算: 660.5 + 32(gap) + 331.5 = **1024** ✓（内コンテンツ幅と一致）
- カラム比率: 左 660.5 / 1024 ≈ **64.5%**、右 331.5 / 1024 ≈ **32.4%**（gap 32px = 3.1%）

> 注: スクショ高さ1109 と metadataフレーム高さ1087 に差があるが、レイアウトの正は metadata の `min-height 975`（本体）+ lead 48 + gap 64 = 1087。器自体の高さは内容により伸びる（self-stretch）。

---

## 2. テキスト（一字一句 / ⏎=改行）

### リード文（`1:4021`） ※フォーム上部・中央寄せ
```
下記のフォームに必要事項をご入力のうえ、送信してください。⏎
内容を確認のうえ、担当者より折り返しご連絡いたします。
```
（Figma上は2つの `<p>` で改行。1行目「下記のフォーム…送信してください。」/ 2行目「内容を確認のうえ…ご連絡いたします。」）

### 右：連絡先情報カード（ネイビー） — 全テキスト

#### ブロックA: 電話お問い合わせ（`1:4108`）
- 見出し（`1:4110`、中央寄せ）:
```
お電話でのお問い合わせ
```
- 電話番号（`1:4114`、中央寄せ、アイコン右）:
```
03 6912⏎
0000
```
（Figma上は2行に折り返し。実体は「03 6912 0000」。`tel:` 用は `0369120000` ＝ `tel:03-6912-0000` 想定だが市外局番は要確認）
- 受付時間（`1:4116`、中央寄せ）:
```
受付時間　9:00-18:00（土日祝休）
```
（「受付時間」と「9:00…」の間は **全角スペース** ＝ U+3000）

#### 区切り線（`1:4118`） — 下記「装飾レイヤー」参照

#### ブロックB: 会社情報（`1:4119`）
- 見出し H3（`1:4121`、左寄せ）:
```
会社情報
```
- 会社名（`1:4124`、Noto Serif JP Light、左寄せ）:
```
株式会社ASTERRA⏎
Corporation
```
（Figma上は2行折り返し。実体は「株式会社ASTERRA Corporation」）
- 会社名ヨミ（`1:4125`、Noto Serif JP Light 12px、左寄せ）:
```
（アステラコーポレーション）
```
- 住所（`1:4127`、Noto Sans JP Light、左寄せ）:
```
〒000-0000⏎
東京都豊島区東池袋0-0-0
```
（Figma上は2行折り返し。実体は「〒000-0000 東京都豊島区東池袋0-0-0」）
- TEL/FAX（`1:4129`、Noto Sans JP Light、左寄せ）:
```
TEL : 03 6912 0000⏎
FAX : 03 6912 0000
```
（「TEL」「:」「03…」の間に **半角スペース** あり。各2行折り返し）

---

## 3. スタイル

### 3-A. 左フォームカードの「器」（`1:4023` Left: Form） ★後工程はここにSMF埋め込みを差す
| 項目 | 生値 | 正規値（4/8pxスナップ） |
|---|---|---|
| 幅 | 660.5px | **660px**（または 64.5% 流動。器は左カラム全幅） |
| 高さ | self-stretch（行の高さに追従） | 内容依存（SMF高さ＋上下padding） |
| 背景色 | `#f8f9fa`（color/grey/98-5） | **#f8f9fa**（ごく薄いグレー） |
| ボーダー | `1px solid #f3f4f6`（color/grey/96-2） | **1px solid #f3f4f6** |
| 角丸 | 指定なし（rounded class 無し） | **0px（角丸なし）** ※スクショでも直角 |
| 影 | `drop-shadow(0px 1px 1px rgba(0,0,0,0.05))` | **box-shadow: 0 1px 1px rgba(0,0,0,0.05)**（ごく弱い） |
| 内側padding | `p-[65px]`（全方向65px） | **64px**（全方向。フォーム本体の周囲余白） |

> この器の内部に Snow Monkey Forms の出力（入力欄群）を配置する。入力欄個々のスタイルは抽出対象外（下記「参考：フォーム入力欄の意匠」に概要のみメモ）。

### 3-B. 右：連絡先情報カード（`1:4105` Right: Contact Info）
| 項目 | 生値 | 正規値 |
|---|---|---|
| 幅 | 331.5px | **332px**（または 32.4% 流動） |
| 高さ | self-stretch | 左カラムと同じ高さに伸張 |
| 背景色 | `#131c30`（color/azure/13 "Big Stone"） | **#131c30**（濃ネイビー。ページ標準ネイビー #0a192f/#1e2c5b とは別の独自トーン → そのまま使用） |
| 内側padding | `p-[48px]`（全方向48px） | **48px** |
| 角丸 | 指定なし | **0px** |
| 配置 | 縦flex / `items-start` / `justify-center`（内容を縦中央寄せ） | 〃 |
| 影 | shadow `0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`（`1:4106` 別レイヤー） | 下記「装飾レイヤー」 |

#### カード内テキストスタイル詳細
| 要素 | nodeId | font-family | weight | size | line-height | letter-spacing | color | align |
|---|---|---|---|---|---|---|---|---|
| 「お電話でのお問い合わせ」 | 1:4110 | Noto Serif JP | 400 Regular | 14px | 20px | 1.4px | #ffffff | center |
| 電話番号「03 6912 0000」 | 1:4114 | Noto Serif JP | 400 Regular | **30px** | 36px | 1.5px | **#c8a97e**（ゴールド） | center |
| 「受付時間　9:00-18:00（土日祝休）」 | 1:4116 | Noto Sans JP | 300 Light | 11px | 16.5px | 1.1px | #d1d5db（color/azure/84） | center |
| H3「会社情報」 | 1:4121 | Noto Serif JP | 400 Regular | 16px | 24px | 1.6px | #ffffff | left |
| 会社名「株式会社ASTERRA Corporation」 | 1:4124 | Noto Serif JP | 300 Light | 14px | 22.75px | 0.7px | #f3f4f6（color/grey/96-2） | left |
| ヨミ「（アステラコーポレーション）」 | 1:4125 | Noto Serif JP | 300 Light | 12px | 16px | 0.7px | #f3f4f6 | left |
| 住所「〒000-0000…」 | 1:4127 | Noto Sans JP | 300 Light | 14px | 28px | 0.7px | #f3f4f6 | left |
| TEL/FAX | 1:4129 | Noto Sans JP | 300 Light | 14px | 28px | 0.7px | #f3f4f6 | left |

#### カード内の縦方向構造・余白
- カード上部マージン: `justify-center` で内容を縦中央配置（上下に余白が自動分配）
- ブロックA「Margin」（`1:4107`）: 下に `pb-[48px]`（区切り線との間に48px）
  - A内 `gap 16px`（見出し / 電話番号 / 受付時間 の間）
  - 電話番号コンテナ（`1:4111`）: 上に `pt-[8px]`、`gap 12px`（アイコンと番号の間）、横並び中央寄せ
- 区切り線「Margin」（`1:4117`）: 高さ49px、下に `pb-[48px]`（区切り線→会社情報の間に48px）
- ブロックB「会社情報」（`1:4119`）: 左右 `px-[8px]`、`gap 23.375px`（H3と本文群の間）
  - B本文群（`1:4122`）: `gap 32px`（会社名ブロック / 住所 / TEL・FAX の3塊の間）
  - 会社名と「（アステラ…）」の間: gap 0（ほぼ密着、`gap-[0px]`）

### 3-C. リード文（`1:4021`）
| 項目 | 値 |
|---|---|
| font-family | Noto Serif JP |
| weight | 400 Regular |
| size | 16px |
| line-height | 24px |
| letter-spacing | 0.4px |
| color | #1f2937（color/azure/17 "Ebony Clay"） |
| align | center |

---

## 4. 装飾レイヤー

1. **右カードのドロップシャドウ**（`1:4106` "Right: Contact Info:shadow"、カード全面の absolute overlay）
   - `box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`
   - 透明オーバーレイ（bg rgba(255,255,255,0)）に影を載せる方式 → 実装ではカード本体に `box-shadow` を直接付与すればよい。
2. **左フォームカードの弱い影**（器自身、3-A）
   - `box-shadow: 0 1px 1px rgba(0,0,0,0.05)`（ほぼ平面。ごく弱い浮き）
3. **電話アイコン**（`1:4112` Component2 variant=2、ブロックA内）
   - ネイビーカード上のゴールド受話器グリフ。表示サイズ 約 **27.67×27.998px**（≈28px）。色 **#c8a97e**（ゴールド単色）。
   - Figmaエクスポートはフレーム外枠混入のため不採用。クリーンSVG化して採用（下記アセット）。
4. **水平区切り線**（`1:4118` Horizontal Divider、ブロックA→Bの間）
   - 高さ **1px**、幅100%（カード内幅 235.5px）、色 **rgba(255,255,255,0.2)**（白20%透過）。
5. （左フォーム内の意匠：必須バッジ＝ゴールド#c8a97e角丸2px・送信ボタン＝ゴールド#c8a97e。SMF実装側の参考。下記「参考」参照）

---

## 5. アセット

| 用途 | ファイル | WP取込 | 実URL |
|---|---|---|---|
| 電話アイコン（ゴールド受話器） | `assets/phone-icon-clean.svg`（手動クリーン版・28×28・fill #c8a97e） | media import 済 ID **65** | `http://localhost:8918/wp-content/uploads/2026/06/asterrra-phone-icon.svg` |

- 補足: Figma `download_assets` の生エクスポートは `assets/phone-icon.svg`（フレーム背景rect・巨大clip path混入のため不採用）。実体パスは line16 の `fill="#C8A97E"` の単一path。これを28×28 viewBoxに切り出したものが `phone-icon-clean.svg`＝WP取込版。
- 他のアイコン（select の▼ chevron `Component 2`、ボタン内「→」）はフォーム側意匠でSMF/テーマで対応。本セクション右カードのアセットは電話アイコン1点のみ。

**アセット数: 1点（電話アイコンSVG / WP media ID 65）**

---

## 6. インタラクション台帳

| 要素 | 種別 | 確定値 / 状態 |
|---|---|---|
| 電話番号「03 6912 0000」 | tel: リンク化 | `tel:0369120000`（推奨）。ただし番号はダミー（豊島区=03で市外局番整合）。**実番号は要ユーザー確認** |
| 受付時間 | 表示のみ | リンクなし |
| 住所 | 表示のみ | リンクなし（地図リンクは指定なし） |
| TEL/FAX | 表示のみ | Figma上はテキスト（tel:指定なし）。tel化要否は**要ユーザー確認** |
| 左カラム（器） | フォーム埋め込み | Snow Monkey Forms ブロックを差し込む（別実装） |

**要ユーザー確認事項**:
- 電話番号・FAX番号・郵便番号・住所はすべて **ダミー値**（000-0000 等）。本番値に差し替え要。
- 電話番号 / TEL / FAX を `tel:` リンクにするか（デザイン上は通常テキスト）。

---

## 7. 正規化記録（生値→正規値）

| 項目 | 生値 | 正規値 | 根拠 |
|---|---|---|---|
| セクション幅 | 1152 | 1152（コンテンツ幅・中央寄せ／左右マージン144） | ページ標準 |
| 内コンテンツ幅 | 1024（=1152−64×2） | 1024 | px-64 |
| カラム gap | 32 | 32（8グリッド） | item-spacing/m |
| 左器 幅 | 660.5 | 660（または流動64.5%） | 0.5端数→スナップ |
| 右カード 幅 | 331.5 | 332（または流動32.4%） | 0.5端数→スナップ |
| 左器 padding | 65 | 64（8グリッド） | p-65→64 |
| 右カード padding | 48 | 48 | そのまま |
| セクション縦gap（lead↔本体） | 64 | 64 | item-spacing/xl |
| カード内ブロック間 | 48 / 48 | 48 / 48 | pb-48 |
| 電話アイコン | 27.67×27.998 | 28×28 | 端数→28 |
| 会社名 line-height | 22.75 | 22.75（≈23、Serif 14px相応） | 維持 |
| 会社情報 gap | 23.375 | 24（8グリッド近似） | スナップ可 |
| 区切り線 | 1px / rgba(255,255,255,0.2) | 1px / rgba(255,255,255,0.2) | そのまま |

### 配色マッピング（このセクションで使用）
| 役割 | hex | Figmaトークン名 | ページ標準との関係 |
|---|---|---|---|
| 右カード背景（ネイビー） | **#131c30** | color/azure/13 "Big Stone" | ページ標準ネイビー(#0a192f/#1e2c5b)とは別の独自トーン。デザイン尊重しそのまま採用 |
| 電話番号・必須バッジ・ボタン（ゴールド） | **#c8a97e** | color/orange/64 "Tan" | ページ標準ゴールド #c5a059 に近い独自トーン。デザイン値 #c8a97e を採用 |
| 左器 背景 | #f8f9fa | color/grey/98-5 | 薄グレー |
| 左器 ボーダー | #f3f4f6 | color/grey/96-2 | グレー（ページ標準 #e5e7eb より薄い） |
| カード本文（白系） | #ffffff / #f3f4f6 / #d1d5db | white / grey/96-2 / azure/84 | 白〜淡グレー階調 |
| リード文 文字色 | #1f2937 | color/azure/17 "Ebony Clay" | 濃グレー |

> フォント: 見出し・電話番号・会社名・受付見出し = **Noto Serif JP**、住所・TEL/FAX・受付時間・必須/入力例 = **Noto Sans JP**（ページ標準: 見出しSerif / 本文Sans に一致）。

---

## 参考：左フォーム入力欄の意匠（SMF実装の参考メモ・本タスクの抽出対象外）
- 入力欄: 白背景 / `1px solid #e5e7eb`（color/grey/91） / padding 15px / 角丸なし
- ラベル（お名前・フリガナ等）: Noto Serif JP Medium 14px / #111827 / letter-spacing 1.4px / ラベル列幅192px
- 必須バッジ: ゴールド #c8a97e 背景 / 白文字 Noto Sans JP 10px / 角丸2px / padding 8px×2px
- プレースホルダ文字色: #9ca3af（color/azure/65）
- 送信ボタン「確認画面へ進む →」: ゴールド #c8a97e 背景 / 白文字 Noto Serif JP 14px / padding 64px×16px / 影あり
- プライバシー文言・チェックボックス・「確認画面へ進む」はSMF側で再現する

---

## 検証用設計値（tree.js 突合用）

### ルート / コンテナ
| 要素 | 属性値 |
|---|---|
| ルート `loos/full-wide` | bgColor `#ffffff` / contentSize `full` / pcPadding `0` / spPadding `0` / className `sec-form` |
| 内側コンテナ（FORM Inner） | column / align center / width 100% / maxWidth **1152** / padding `80/64/80/64` / margin `0/auto/0/auto` / gap **64** |

> 注: セクション左右padding64（px-[64px]）はコンテナpadding（left/right 64）で表現。maxWidth は内コンテンツ1024 ではなくページ標準1152を採用し、内側padding64でデザインの内コンテンツ幅1024（=1152−64×2）に一致させた。上下padding80はリード文上下の余白として付与（datapackは上下padding無指定のため最小限の節余白として80採用 → **要視覚確認**）。

### リード文（Lead Text）
| 要素 | 属性値 |
|---|---|
| コンテナ | column / align center / width 100% / gap 0 |
| 段落1・2 | Serif 16px / 400 / lineHeight 24px / letterSpacing 0.025em(≈0.4px) / color `#1f2937` / align center |

### 2カラム本体（Main: Form & Info）
| 要素 | 属性値 |
|---|---|
| コンテナ | row / align start / width 100% / gap **32** |
| 左カラム（Left: Form Card） | sizeWidth **660px** / padding `64`全方向 / bg `#f8f9fa` / border 1px `#f3f4f6` radius 0px |
| └ フォーム本体 | `snow-monkey-forms/snow-monkey-form` { formId: **63** } |
| 右カラム（Right: Contact Info） | column / justify center / align start / sizeWidth **331px** / padding `48`全方向 / bg `#131C30` |

### 右カード内テキスト（一字一句）
| 要素 | 内容 | font | size/lh | ls | color | align |
|---|---|---|---|---|---|---|
| 見出し | お電話でのお問い合わせ | Serif 400 | 14/20 | 0.1em(1.4px) | #ffffff | center |
| 電話番号 | 03 6912 0000 | Serif 400 | 30/36 | 0.05em(1.5px) | #C8A97E | center |
| 受付時間 | 受付時間　9:00-18:00（土日祝休）※全角スペースU+3000 | Sans 300 | 11/16.5 | 0.1em(1.1px) | #d1d5db | center |
| H3 | 会社情報（is-style-section_ttl中和） | Serif 400 | 16/24 | 0.1em(1.6px) | #ffffff | left |
| 会社名 | 株式会社ASTERRA Corporation | Serif 300 | 14/22.75 | 0.05em(0.7px) | #f3f4f6 | left |
| ヨミ | （アステラコーポレーション） | Serif 300 | 12/16 | 0.05em(0.7px) | #f3f4f6 | left |
| 住所 | 〒000-0000`<br>`東京都豊島区東池袋0-0-0 | Sans 300 | 14/28 | 0.05em(0.7px) | #f3f4f6 | left |
| TEL/FAX | TEL : 03 6912 0000`<br>`FAX : 03 6912 0000 | Sans 300 | 14/28 | 0.05em(0.7px) | #f3f4f6 | left |

### 右カード内構造・余白
| 要素 | 属性値 |
|---|---|
| ブロックA（Phone） | column / align center / width 100% / 下padding **48** / gap **16** |
| └ 電話番号コンテナ | row / justify center / align center / 上padding **8** / gap **12** |
| └ 電話アイコン | core/image id **65** / 28×28px / SVG（asterrra-phone-icon.svg） |
| 区切り線 | width 100% / height **1px** / bg `rgba(255,255,255,0.2)` / 下margin **48** |
| ブロックB（Company） | column / align start / width 100% / 左右padding **8** / gap **24**（H3↔本文群） |
| └ 本文群 | column / align start / gap **32**（社名/住所/TEL・FAX の3塊） |
| └└ 会社名ブロック | column / align start / gap **0**（社名↔ヨミ 密着） |

### letterSpacing px→em 換算根拠
- 14px×0.1em = 1.4px / 30px×0.05em = 1.5px / 11px×0.1em = 1.1px / 16px×0.1em = 1.6px / 14px×0.05em = 0.7px / 16px×0.025em = 0.4px（いずれもdatapack生値に一致）
