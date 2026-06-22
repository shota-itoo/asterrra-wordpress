# データパック — 02 Mission（Section - 02 Mission）

- Figmaファイル: `eZFYBaJDAN0PLLd7ITdvLR`
- nodeId: `1:2049`（Section - 02 Mission）
- design.png: 1440 × 952（同フォルダ）
- 背景: ネイビー `#0a192f`
- ※4サービスカードはトップページSERVICEと同一デザイン。画像・アイコンはWP取込済みを再利用（新規importなし）

---

## 1. レイアウト骨格

セクション全体（`1:2049` Section - 02 Mission）
- 背景色: `#0a192f`（ネイビー）
- レイアウト: 縦積み（column）、左寄せ items-start
- パディング: 上下 `130px` / 左右 `160px`（`px-[160px] py-[130px]`）

内側コンテナ（`1:2050` Container）
- max-width: `1120px`、左右パディング `40px`、幅100%
- 中央寄せ（items-center）で縦積み

縦の積み順（上から）:
1. ラベル行（`1:2051` Margin → `1:2052`）— 下パディング `20px`
   - 「02」（ゴールド・大）+ 右に「OUR MISSION」（ゴールド・小・大文字）が横並び（items-center）
   - 「02」側の右パディング `20px`（`1:2053` Margin pr-[20px]）
2. H2見出し（`1:2058` Heading 2:margin → `1:2059`）— 下パディング `35px`
3. 本文（`1:2061` Margin → `1:2062`）— max-width `820px`、下パディング `75px`、中央寄せ
4. カードグリッド（`1:2064` カラム）

カードグリッド（`1:2064`）
- 生座標: x=16, y=353, width=1088, height=339
- 4カラム grid、列間gap `24px`（`gap-x-[24px] gap-y-[24px]`）
- グリッド総幅 `1088px`（254×4 + 24×3 = 1016+72 = 1088）
- 各カラム幅 `254px`
- 各カラム構成（縦積み・上下2ブロックを `gap` なしで重ねた縦レイアウト）:
  - 上: カード写真（`254 × 161.94px`、border `#d9d9d9` 1px）
  - 写真の下端から `160.06px`（カラム原点基準のカードボックスtop。写真高 161.94 + 約 0 重なり ≒ 写真直下から開始）にテキストカードボックス
  - テキストカードボックス: `254 × 178.94px`、背景 `#1e2c5b`、border `#d9d9d9` 1px、drop-shadow `0px 4px 10px rgba(0,0,0,0.05)`、内側パディング `33px`、中央寄せ
- カラム高さ合計: `338.99px`（写真 161.94 + テキストカード 178.94 ≒ 重なり/連結で 339）

テキストカード内部（共通）
- 見出しエリア（`Heading 4:margin`）: 高さ `56px`、下パディング `16px`、見出しテキスト行高 `40px`
- 本文エリア（`Container`）: 中央寄せ
- 右上にサービスアイコン（白塗りマスク）を絶対配置（後述「装飾レイヤー」）

---

## 2. テキスト（一字一句・改行 ⏎=`<br>`）

### ラベル
- `02`（node `1:2055`）
- `Our Mission`（node `1:2057`、表示は大文字 `OUR MISSION`、CSS uppercase。元テキストは "Our Mission"）

### H2見出し（node `1:2060`）
```
人生の大切な選択を、より良い未来へ導くために。
```
（改行なし・1行）

### 本文（node `1:2063`、4行）
```
人生には、資産形成、結婚、相続、住まいの購入や売却など、⏎
多くの選択と決断が求められる場面があります。⏎
私たちは常にお客様の立場に立ち、それぞれの状況や想いに真摯に向き合いながら、⏎
最善の選択ができるようサポートしてまいります。
```

### カード1: 不動産売買サポート
- 見出し（`1:2069`）: `不動産売買サポート`（1行）
- 本文（`1:2071`、3行）:
```
居住用不動産から投資用不動産まで、⏎
お客様のご希望に応じた⏎
最適なご提案を行います。
```

### カード2: 賃貸・管理サポート
- 見出し（`1:2082`）: `賃貸・管理サポート`（1行）
- 本文（`1:2084`、2行）:
```
賃貸の仲介から管理業務まで⏎
幅広くサポートいたします。
```

### カード3: リフォーム リノベーション（見出しは2行）
- 見出し（`1:2110`、2行）:
```
リフォーム⏎
リノベーション
```
- 本文（`1:2112`、3行）:
```
新たな価値を創造し、⏎
未来につながる住まいづくりを⏎
ご提案します。
```

### カード4: 不動産コンサルティング（見出しは2行）
- 見出し（`1:2097`、2行）:
```
不動産⏎
コンサルティング
```
- 本文（`1:2099`、3行）:
```
市場分析や相続対策など、⏎
幅広いご相談に⏎
対応いたします。
```

---

## 3. スタイル（色・フォント・サイズ・字間・行高）

### 配色（実値・正規化済み）
| 用途 | 値 |
|---|---|
| セクション背景（ネイビー濃） | `#0a192f` |
| テキストカード背景（ネイビー） | `#1e2c5b` |
| ラベル（02 / OUR MISSION）ゴールド | `#c5a86d`（Figma変数 color/orange/60。指示の `#c5a059` ではなく実値 `#c5a86d`） |
| H2見出し | `#ffffff`（白） |
| 本文 | `rgba(255,255,255,0.85)`（白85%） |
| カード見出し | `#ffffff`（白） |
| カード本文 | `#ffffff`（白） |
| カード/写真ボーダー | `#d9d9d9` 1px |
| アイコン塗り | `#ffffff`（白・マスク塗り） |

### タイポグラフィ
| 要素 | フォント | ウェイト | サイズ | 行高 | 字間 |
|---|---|---|---|---|---|
| 02（数字） | Noto Serif JP Medium | 500 | 40px | 40px | 1.28px |
| Our Mission | Jost Medium（uppercase） | 500 | 13px | 26px | 1.95px |
| H2見出し | Noto Serif JP Medium | 500 | 34px※ | 51px | 1.28px |
| 本文 | Noto Sans JP Light | 300 | 15px | 33px | 1.28px |
| カード見出し | Noto Sans JP Bold | 700 | 14px | 20px | 1.4px |
| カード本文 | Noto Sans JP Regular | 400 | 12px | 19.5px | 0 |

※H2のフォントサイズは Figma変数で `line-height/34`（=34px）が size に割当てられている（変数の流用）。実フォントサイズは **34px**、行高 51px。

備考: 指示では「見出し=Noto Serif JP・カード内=Noto Sans JP」。本文（リード文）も Noto Sans JP（Light）である点に注意。ラベル「Our Mission」は **Jost**（欧文）であってNoto Sansではない。

---

## 4. 装飾レイヤー（絶対配置）

各テキストカードの右上に、白塗りサービスアイコン（画像マスク・`bg-white` + maskImage）を絶対配置。
座標はテキストカードボックス（254×178.94）のローカル原点基準（カードボックス内の left/top）。

| カード | アイコンnode | 絶対配置 left/top（カードボックス内） | サイズ（マスクボックス） |
|---|---|---|---|
| 1 不動産売買サポート | `1:2074`（Rectangle 47） | left `182px` / top `22.27px` | `48.73 × 51.15px`（mask-size `47 × 49.33`） |
| 2 賃貸・管理サポート | `1:2087`（Rectangle 48） | left `184.01px` / top `29.74px` | `44.86 × 48.87px`（mask-size `41 × 44.28`） |
| 3 リフォームリノベ | `1:2115`（Rectangle 49） | left `170px` / top `22.74px` | `51 × 57.97px`（mask-size `51 × 57.97`） |
| 4 不動産コンサル | `1:2102`（Rectangle 50） | left `181px` / top `28.99px` | `55.48 × 44.76px`（mask-size `51.38 × 41.83`） |

※アイコンはカード内右上（見出しの右側）に重なる装飾。実装ではアイコン画像（ID19-22）を右上に絶対配置で配置する。
※カード写真ボックスとテキストカードボックスは縦に連結（写真下端＝テキストカード上端付近、重なりは実質0〜微小）。

---

## 5. アセット（既存メディアID再利用・新規importなし）

WP取込済み（トップページSERVICEと共用）。guid確認済み（コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート8918）。

### カード写真
| カード（左→右） | サービス | メディアID | post_title | guid(URL) |
|---|---|---|---|---|
| 1 | 不動産売買サポート | **15** | service-card1-baibai | `http://localhost:8918/wp-content/uploads/2026/06/service-card1-baibai.png` |
| 2 | 賃貸・管理サポート | **16** | service-card2-chintai | `http://localhost:8918/wp-content/uploads/2026/06/service-card2-chintai.png` |
| 3 | リフォーム リノベーション | **17** | service-card3-reform | `http://localhost:8918/wp-content/uploads/2026/06/service-card3-reform.png` |
| 4 | 不動産コンサルティング | **18** | service-card4-consulting | `http://localhost:8918/wp-content/uploads/2026/06/service-card4-consulting.png` |

### アイコン
| カード | サービス | メディアID | post_title | guid(URL) |
|---|---|---|---|---|
| 1 | 不動産売買サポート | **19** | service-icon1-baibai | `http://localhost:8918/wp-content/uploads/2026/06/service-icon1-baibai.png` |
| 2 | 賃貸・管理サポート | **20** | service-icon2-chintai | `http://localhost:8918/wp-content/uploads/2026/06/service-icon2-chintai.png` |
| 3 | リフォーム リノベーション | **21** | service-icon3-reform | `http://localhost:8918/wp-content/uploads/2026/06/service-icon3-reform.png` |
| 4 | 不動産コンサルティング | **22** | service-icon4-consulting | `http://localhost:8918/wp-content/uploads/2026/06/service-icon4-consulting.png` |

> 注意（指示の修正）: タスク指示には「ID17(コンサル), ID18(リフォーム)」とあったが、WP実体の post_title スラッグは ID17=service-card3-**reform**（リフォーム）、ID18=service-card4-**consulting**（コンサル）。
> Figma画面左→右の並び（売買→賃貸→リフォーム→コンサル）とスラッグが一致するため、上表（17=リフォーム / 18=コンサル）が正。アイコンID19-22も baibai/chintai/reform/consulting の順で写真と対応。

---

## 6. インタラクション台帳

| 要素 | 種別 | 内容 |
|---|---|---|
| Missionセクション全体 | — | CTAボタン **なし**（リンク・ボタン要素は検出されず）。カード自体のリンクも Figma 上は付与なし |

> Mission ノード内に CTA／ボタン／リンク要素は存在しない。

---

## 7. 正規化記録（生値→正規値）

| 項目 | 生値（Figma実測/変数） | 正規値 | 備考 |
|---|---|---|---|
| カラムグリッド総幅 | 1088 | 1088px | 254×4 + 24×3 |
| カード幅 | 254 | 254px | 全カラム共通 |
| 写真高 | 161.94264 / 161.9427 / 161.9424 / 161.9425 | **162px** | 個体差は丸め誤差、162pxに正規化 |
| テキストカード高 | 178.937 / 178.9374 / 178.9369 | **179px** | 同上、179pxに正規化 |
| 列間gap | 24 | 24px | gap-x/gap-y 共 24 |
| カードボックス内パディング | 33 | 33px | p-[33px] |
| 写真→テキストカードの縦オフセット | mt 160.06 | **160px**（≒写真高162に連結） | 写真下端付近からテキストカード開始（重なり実質0〜微小） |
| 見出しエリア高 | 56 | 56px | Heading 4:margin |
| 見出しエリア下パディング | 16 | 16px | pb-[16px] |
| アイコン座標/サイズ | 上表「装飾レイヤー」参照（小数） | 整数px丸め可 | サブピクセルは丸め |
| ゴールド | color/orange/60 = #c5a86d | #c5a86d | 指示の #c5a059 ではなく実値採用 |
| 本文色 | rgba(255,255,255,0.85) | #ffffff @85% | 白85% |
| H2サイズ | 変数 line-height/34 を size に流用 | 34px | 実フォントサイズ34px・行高51px |

---

## 8. 要確認事項

1. **ゴールド色**: 実値 `#c5a86d`（Figma変数 color/orange/60）。指示の `#c5a059` と差異あり。サイト全体のゴールド統一値に合わせるか要確認（本datapackは実値 #c5a86d で記録）。
2. **アイコン配置の解釈**: Figmaではアイコンが見出しテキストの「右上」に絶対配置で重なる（カード幅254内 left≒170-184）。実装でカード見出しとアイコンの重なり方（見出し右横 or 見出し上）を screenshot で最終確認推奨。
3. ID17/18 のリフォーム⇔コンサル対応（指示と逆）は WP スラッグに従い 17=リフォーム / 18=コンサル を採用。

---

## 検証用設計値（tree.js 突合シート）

ルート: `loos/full-wide` className=`sec-mission` / bgColor=`#0a192f` / contentSize=full / pcPadding=0 / spPadding=0。CTAボタン無し。

| 要素 | 属性表現（ブロック） | 値 |
|---|---|---|
| コンテナ | flavor universal-block / column / align center | width100% / maxWidth1120px / padding T130 R40 B130 L40 / margin auto中央 / gap0 |
| ラベル行 | flavor row / justify center / align center | padding-bottom20px。子: 02 + OUR MISSION 横並び |
| 02 | core/paragraph | Noto Serif JP 500 / 40px / lh40px / ls0.032em(=1.28px) / color#c5a86d / padding-right20px |
| OUR MISSION | core/paragraph | Jost 500 / 13px / lh26px / ls0.15em(=1.95px) / uppercase / color#c5a86d（元テキスト"Our Mission"） |
| H2見出し | core/heading level2 is-style-section_ttl / center | Noto Serif JP 500 / 34px / lh51px / ls0.038em(=1.28px) / color#fff / margin-bottom35px |
| リード本文 | core/paragraph / center | Noto Sans JP 300 / 15px / lh33px / ls0.085em(=1.28px) / color rgba(255,255,255,0.85) / paraSizeMaxWidth820px / margin-bottom75px |
| カードグリッド | flavor row / justify center / align flex-start | gap24px / width100% / 254×4固定 |
| カード（共通） | flavor column / width254px / gap0 | 上:写真254×162(border1px#d9d9d9 cover) → 下:本体 |
| カード本体 | flavor column relative / align center / 254×179px | bg#1e2c5b / border1px#d9d9d9 / padding33px / gap16px |
| カードアイコン | flavor absolute（本体relative基準）内に core/image | 下表 top/right・サイズ |
| カード見出し | core/heading level3 / center | Noto Sans JP 700 / 14px / lh20px / ls0.1em(=1.4px) / color#fff |
| カード本文 | core/paragraph / center | Noto Sans JP 400 / 12px / lh19.5px / ls0 / color#fff |

カード対応（写真ID / アイコンID / アイコンサイズ・座標 ※整数px丸め）:

| カード | 写真ID | アイコンID | iconW×H | top / right |
|---|---|---|---|---|
| 1 不動産売買サポート | 15 | 19 | 49×51 | 22 / 25 |
| 2 賃貸・管理サポート | 16 | 20 | 45×49 | 30 / 26 |
| 3 リフォームリノベーション | 17 | 21 | 51×58 | 23 / 33 |
| 4 不動産コンサルティング | 18 | 22 | 55×45 | 29 / 22 |

ブロック総数36（loos/full-wide×1・flavor×15・heading×5・paragraph×7・image×8）。
