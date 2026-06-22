# データパック — Section 03 Value（フォルダ名 04_VALUE）

- Figma file: `eZFYBaJDAN0PLLd7ITdvLR`
- Section node: `1:2117`（name="Section - 03 Value"）
- 抽出方針: レンダリング結果・テキスト・数値・アセットのみ採用。レイヤー名は信用しない。
- レンダリング: `design.png`（このフォルダ）

---

## 1. レイアウト骨格

白背景の左右2カラム構成。左に見出しブロック（ラベル＋H2＋横罫＋本文2段落）、右に建物写真（セクション上端をはみ出して大きく配置）。さらに右下に装飾の打ち合わせ写真が重なる。

### 帰属・座標系（重要）

- セクションフレーム `1:2117` は canvas絶対 x=0 / y=2718 / **w=1335** / h=579（※他セクション Message/Contact は w=1440。この Value フレームは右側がトリミングされた幅。ビューポート1440基準では右の建物写真がさらにはみ出す想定）
- 建物写真 `1:2131` はセクションの子。container内 x=494 / **y=-101**（コンテナ上端より101px上にはみ出す） / w=553 / h=368
- 装飾の打ち合わせ写真 `1:2182`（name="写真"）は**ページレベルの兄弟ノード**（Valueフレームの子ではない）。canvas絶対 x=970 / y=2985 / w=405 / h=270。
  - 帰属判断: 絶対Y 2985–3255 は Value フレームのY帯 2718–3297 に完全に収まり、次の「04 Future」セクションの全幅背景写真（`1:2168` y=3372〜）より手前で終わる。Mainフレーム（`1:2027`）全体レンダリングで確認した結果、**この写真は白背景のValueセクション内・建物写真の下に重なって配置されており、Valueセクションの装飾写真と判断**。→ 取り込み対象に含める。

### ネスト（生値）

```
Section 1:2117  (abs x0 y2718  w1335 h579, bg #f2f2f2)
└ Container 1:2118  (x160 y55  w1015 h495)   ← 左右160マージン
  ├ Container 1:2119 [テキストカラム] (x40 y0  w477.5 h495, flex-col gap25, items-start, bottom-0)
  │  ├ Container 1:2120 [ラベル行] (x0 y0  w477.5 h40, flex-row items-center)
  │  │  ├ Margin 1:2121 (w67 h40, pr20)
  │  │  │  └ text 1:2122 "03" (w47 h40)
  │  │  └ Container 1:2123 (x67 y7  w86 h26)
  │  │     └ text 1:2124 "Our Value" (w86 h26)
  │  ├ Heading2 1:2125 (x0 y65  w477.5 h96)
  │  │  └ text 1:2126 "本当に価値ある選択を / 追求し続ける。" (w477.5 h96)
  │  ├ Divider 1:2127 [横罫] (x0 y186  w40 h1, bg #c5a86d)
  │  └ Paragraph 1:2128 (x0 y212  w477.5 h222.69, flex-col gap29.75, pt8.94)
  │     ├ text 1:2129 [本文1段落] (y8.94  w345 h92)
  │     └ text 1:2130 [本文2段落] (y130.69  w454 h92)
  └ 建物写真 1:2131 (x494 y-101  w553 h368, shadow 10/10/20 rgba(0,0,0,.25))  ← 上に101pxはみ出し

[ページ兄弟] 写真 1:2182 (abs x970 y2985  w405 h270)  ← Value装飾の打ち合わせ写真（重なり）
```

---

## 2. テキスト（一字一句・改行=<br>）

### ラベル
- `03`（数字）
- `Our Value`（大文字表示 / 元値 "Our Value" を uppercase で表示 → 表示は "OUR VALUE"）

### H2（見出し / 2行・各行で改行）
```
本当に価値ある選択を<br>
追求し続ける。
```

### 本文 第1段落（`1:2129`・3行・行末改行）
```
また、私たちが大切にしているのは、<br>
「お客様にとって本当に価値のある選択は何か」<br>
を追求し続けることです。
```

### 本文 第2段落（`1:2130`・3行・行末改行）
```
お客様一人ひとりの未来を見据え、<br>
それぞれに最適なご提案を行うことで、<br>
安心してご相談いただける存在であり続けたいと考えています。
```

> 段落間は空き（gap 29.75px ≈ 30px）。各段落内は1行ずつ改行（whitespace-nowrap で折り返さない設計）。

---

## 3. スタイル（生値 → 正規値）

配色実値（指定パレット照合）: 白 / ネイビー #0a192f / ゴールド #c5a059 / グレー #e5e7eb。
本セクションの抽出実値は以下（ゴールドは実測 #c5a86d でパレットの #c5a059 と近似だが**実測値を優先採用**）。

### 配色（実測）
| 用途 | 実測hex | 備考 |
|---|---|---|
| セクション背景 | `#f2f2f2` | ほぼ白（パレット「白」に相当する微グレー地） |
| ラベル "03" / "Our Value" / 横罫 | `#c5a86d` | ゴールド（パレット指定 #c5a059 に近い実測値） |
| H2 見出し | `#333333` | グレー20（濃グレー） |
| 本文 | `#666666` | グレー40（中グレー） |

### タイポグラフィ（生値 → 正規値）
| 要素 | フォント | size生 | →正規 | weight | line-height生→正規 | letter-spacing |
|---|---|---|---|---|---|---|
| "03" | Noto Serif JP / Medium | 40 | 40px | 500 | 40 → 40px | 1.28px |
| "Our Value" | Jost / Medium（uppercase） | 13 | 13px | 500 | 26 → 26px | 1.95px |
| H2 | Noto Serif JP / Medium | 32 | 32px | 500 | 48 → 48px | 1.28px |
| 本文 | Noto Sans JP / Regular | 14.5 | 14px or 15px ※ | 400 | 30.45 → 30px | 1.28px |

※ 本文 size 14.5px は端数。正規化すると 14px or 15px。見出し=Noto Serif JP・本文=Noto Sans JP の方針に一致。"Our Value" のみ Jost（欧文ラベル）。

### 間隔（生値 → 正規値）
| 箇所 | 生値 | 正規値 |
|---|---|---|
| テキストカラム内 縦gap（ラベル⇄H2⇄罫⇄本文） | 25 | 25px |
| 段落間 gap（1段落⇄2段落） | 29.75 | 30px |
| 本文ブロック上 padding-top | 8.94 | 約9px（≒ライン調整分。実装では省略可） |
| ラベル "03" 右 padding | 20 | 20px |
| セクション 左右マージン（container） | 160 | 160px（1440基準の左右余白。コンテンツ幅1120相当） |
| セクション 上 padding（container y） | 55 | 55px |
| テキストカラム幅 | 477.5 | 約478px（≒480px） |

### 横罫（divider）
- w=40px / h=1px / bg #c5a86d / 角丸rounded-rectangle（実質1pxライン）

---

## 4. 装飾レイヤー（座標・サイズ記録）

> 装飾の重なり・はみ出しは座標で記録。レイアウト本体ではなく装飾レイヤー扱い。

### 建物写真 `1:2131`（メイン装飾・右側大判）
- 配置: container内 left=494 / **top=-101**（コンテナ上端を101px上に突き抜ける）/ w=553 / h=368
- ビューポート絶対換算: 左 = 160(container) + 494 = **654px**、上 = 2718 + 55 + (-101) = **2672px**、右端 = 654+553 = 1207px
- 影: `box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.25)`
- object-fit: cover、表示アスペクト 553:368 ≒ 3:2
- 注: セクションフレーム上端より上に101pxはみ出す（上方向オーバーフロー）。1440基準では右にもさらにはみ出す可能性（フレーム幅1335でトリミングされているため）

### 打ち合わせ写真 `1:2182`（サブ装飾・右下重なり）
- 配置: canvas絶対 x=970 / y=2985 / w=405 / h=270
- ビューポート絶対換算: 左=970px、上=2985px（セクション上端2718からの相対 = 267px）、右端 = 970+405 = 1375px（**1440ビューポート内、ただし1335幅フレームからは右に40px超過**）
- 表示アスペクト 405:270 = 3:2
- 重なり順: 建物写真（top=-101〜+267 ≒ abs 2672〜3040）の下〜右に位置し、建物写真の右下と一部重なる構図（Mainフレーム全体レンダリングで確認）
- 影/角丸: メタは rounded-rectangle。Value建物写真と同様の影が付く可能性あり（実装時に design.png / Mainレンダリングで要目視確認）

---

## 5. アセット（guid確認済み・WP取込）

WPコンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1`（port 8918）に import 済み。

| 用途 | ファイル(ローカル assets/) | 元解像度 | 表示サイズ | WP ID | 実URL（guid確認済み） |
|---|---|---|---|---|---|
| 建物写真（メイン） | `value_building.png` | 1536×1024 (RGB) | 553×368 | **43** | `http://localhost:8918/wp-content/uploads/2026/06/value_building.png` |
| 打ち合わせ写真（装飾） | `value_consultation.png` | 1536×1024 (RGB) | 405×270 | **44** | `http://localhost:8918/wp-content/uploads/2026/06/value_consultation.png` |

- ローカル保存先: `04_VALUE/assets/`（高解像度オリジナル source 画像を採用）
- format: いずれも png（Figma raw image の format=png 準拠）
- URL は `wp post list --post_type=attachment --post__in=43,44 --fields=ID,guid` で実値確認済み（推測なし）

---

## 6. インタラクション台帳

- リンク / ボタン / ホバー: **なし**（このセクションに CTA・遷移要素は無し。テキスト＋画像のみ）
- アニメーション: Figma静的データからは判定不可（スクロールreveal等は実装側の設計事項）

---

## 7. 要確認・申し送り

1. **本文フォントサイズ 14.5px** は端数。14px か 15px のどちらに正規化するか実装時に決定（数値物差しで突合）。
2. **打ち合わせ写真 1:2182 の帰属**: ページ兄弟ノードのため「Valueの装飾」と機械判定（Y帯一致＋Mainレンダリングの白背景内配置）。最終的にデザイン意図として 03 Value に属するか、ユーザー確認の余地あり。
3. **建物写真の影・打ち合わせ写真の影/角丸**: 建物写真は box-shadow 明示あり。打ち合わせ写真は影属性が抽出に出ていないため design.png / Main レンダリングで目視確認のうえ実装。
4. **セクションフレーム幅1335** は他セクション(1440)と不一致。1440ビューポート基準で右の画像がさらにはみ出す前提で実装（右ブリード）。属性で表現不可な breakout はカスタムCSS事前確認領域。

---

## 検証用設計値（tree.js 突合シート）

| 要素 | 属性 | 値 | 出典 |
|---|---|---|---|
| ルート | `loos/full-wide` className | `sec-value` | 固有指定 |
| ルート | bgColor | `#f2f2f2` | §3 配色 |
| ルート | pcPadding / spPadding | `0` / `0` | コンテナで余白付与 |
| コンテナ | sizeMaxWidth | `1015px`（margin auto 中央寄せ） | §1 / §3（1440基準160マージン→幅1015） |
| コンテナ | spacingPadding | top55 / bottom55 / 左右0 | §3 上padding55 |
| コンテナ | positionType | `relative`（絶対画像の基準） | §4 |
| テキストカラム | sizeWidth | `478px` | §3 テキストカラム幅477.5≈478 |
| テキストカラム | direction / align | column / flex-start | §1 flex-col items-start |
| テキストカラム | spacingGap | `25px` | §3 縦gap25 |
| ラベル "03" | font / size / weight / lh / ls | Noto Serif JP / 40px / 500 / 40px / 0.032em | §3（ls 1.28px/40px） |
| ラベル "03" | color / padding-right | `#c5a86d` / 20px | §3 / §3 右padding20 |
| ラベル "Our Value" | font / size / weight / lh / ls | Jost / 13px / 500 / 26px / 0.15em | §3（ls 1.95px/13px） |
| ラベル "Our Value" | textTransform / color / content | uppercase / `#c5a86d` / `OUR VALUE` | §2（元値 "Our Value" を大文字表示） |
| H2 | content | `本当に価値ある選択を<br>追求し続ける。` | §2 |
| H2 | font / size / weight / lh / ls | Noto Serif JP / 32px / 500 / 48px / 0.04em | §3（ls 1.28px/32px） |
| H2 | color（text + link） / className | `#333333` / is-style-section_ttl | §3 / SWELL装飾中和 |
| 横罫 | sizeWidth / sizeHeight / bg | 40px / 1px / `#c5a86d` | §3 divider w40 h1 |
| 本文 第1段落 | content | 3行（§2の通り<br>区切り） | §2 |
| 本文 各段落 | font / size / weight / lh / ls | Noto Sans JP / 14px / 400 / 30px / 0.091em | §3（14.5→14正規化 / ls 1.28px/14px） |
| 本文 各段落 | color | `#666666` | §3 |
| 本文 第2段落 | margin-top | `30px`（段落間gap） | §3 段落間29.75≈30 |
| 建物写真 | id / url / size | 43 / value_building.png / 553×368 | §5 |
| 建物写真 | imgPositionType / Left / Top | absolute / 494px / **-101px** | §4（container内座標・上はみ出し） |
| 建物写真 | imgBoxShadow | `custom:10px 10px 20px 0px rgba(0,0,0,0.25)` | §4 影実値 |
| 打ち合わせ写真 | id / url / size | 44 / value_consultation.png / 405×270 | §5 |
| 打ち合わせ写真 | imgPositionType / Left / Top | absolute / 810px / 212px | §4（abs(970,2985)→container border-box基準: 970-160 / 2985-(2718+55)） |

### 正規化・換算メモ
- letter-spacing は全て px→em換算（1.28px ÷ fontSize）。"03"=0.032em / "Our Value"=0.15em（1.95/13） / H2=0.04em / 本文=0.091em。
- 本文サイズ 14.5px は §7 申し送りに従い **14px** に正規化（見出しNoto Serif JP・本文Noto Sans JPの方針整合）。
- 打ち合わせ写真の container 相対座標換算: container border-box 原点 = abs(x160, y2773[=section abs2718 + 上padding55])。よって left=970-160=810 / top=2985-2773=212。
- 本文ブロック上 padding-top 8.94px（§3）は「実装では省略可」の指示に従い不採用。

### 要CSS / 申し送り（属性で表現できない領域）
- **建物写真 上方向breakout（top:-101px）の「見え」**: 座標属性 imgPositionTop:-101 は出力されるが、セクション上端より上に実際にはみ出して見えるには ルート `loos/full-wide` / コンテナの `overflow:visible` が前提。SWELL full-wide は overflow を絞る既定があり得るため、上はみ出しがクリップされる場合は overflow打ち消しCSSが必要（理由: ブロック属性に overflow 制御が無い）。
- **建物写真・打ち合わせ写真の右ブリード**: §4 の通り 1440基準で content幅1015 を超えて右へはみ出す配置。max-width:1015 中央寄せコンテナの content-box を absolute left で超過させているため座標上は表現済みだが、横スクロール抑止/意図通りの右見切れには overflow / viewport追従CSSが要る可能性（理由: viewport基準の片側ブリードはブロック属性で完結不可）。
- 上記2点は wordpress/CLAUDE.md「ブロック属性ファースト」に従い、CSS着手前にユーザー確認が必要な領域。tree.js には座標・影まで属性で含め、overflow/ブリードの最終調整のみ別途確認とする。
