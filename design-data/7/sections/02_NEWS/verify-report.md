# verify-report: NEWS (お知らせ)

- 結果: 収束（n=2 ラウンド / 上限3以内）
- isValid: 47/47（ページ全体・allValid:true）
- 挿入モード: append（FVセクションの末尾に連結。post_content 18851 bytes）
- 検証ビューポート: 1440×900 / フロント `?page_id=7&preview=true`（トップ固定ページ＝フロントページ）
- セクション特定: `.sec-news`

## 計測突合表

| 要素 | 設計値 | 実測値 | 判定 |
|---|---|---|---|
| Section bg | #ffffff | rgb(255,255,255) | ✓ |
| Section 幅 | full(100vw) | 1440 | ✓ |
| NEWS Inner 幅/x | 100%/max1152・中央 | w=1088, x=176（=144+左padding32） | ✓ |
| 見出し NEWS bg | 装飾なし（透明） | rgba(0,0,0,0)（SWELL既定ベタ塗りを除去） | ✓ |
| 見出し NEWS fs/lh/ls | 36/40/3.6px | 36px/40px/3.6px | ✓ |
| 見出し NEWS color | #c5a059 | rgb(197,160,89)=#c5a059 | ✓ |
| 見出し NEWS font | Noto Serif JP 600 | Noto Serif JP | ✓ |
| サブ お知らせ fs/lh/ls | 12/16/1.2px | 12px/16px/1.2px | ✓ |
| サブ お知らせ color | #1f2937 | rgb(31,41,55)=#1f2937 | ✓ |
| Body 2カラム w/h | 1088/320 | 1088/320 | ✓ |
| Body⇔Header gap | 64px | y差（h2 1818→body 1946）整合 | ✓ |
| ImageComposition w/h | 432×320, flex固定 | 432×320, flex:0 0 auto | ✓ |
| 大画像 (core/image) | 432×320 cover | 432×320, x=176 y=1946 | ✓ |
| 小画像ラッパ w/h | 216×192, bg白, padding4px | 216×192, bg白, padding4px | ✓ |
| 小画像配置（左カラム内） | x=248 / y=160（abs） | abs left=248(640-176-216÷)/top=160 → 画面 x=424 y=2106 | ✓ |
| 小画像はみ出し | 右-32px / 下-32px | 右608→640(+32) / 下2266→2298(+32) | ✓ |
| 室内画像 (core/image) | 208×184 cover | 208×184 | ✓ |
| 左⇔右 gap | 48px | imgComp right608 → newsRight x656（+48） | ✓ |
| NewsRight x/w/pl | x=656, w=608, pl=40 | x=656, w=608, pl=40px | ✓ |
| NewsList 上端罫線 | 2px solid #1e2c5b | 2px solid rgb(30,44,91)=#1e2c5b | ✓（UB border属性で描画） |
| NewsItem 行高 ×3 | 61px | 61/61/61 | ✓ |
| NewsItem 下罫線 ×3 | 1px solid #e5e7eb | 1px solid rgb(229,231,235)=#e5e7eb | ✓（UB border属性で描画） |
| 日付(Time) fs/fw/font/color/ls | 14/700/Serif/#111827/1.4px | 14px/700/Noto Serif JP/rgb(17,24,39)/1.4px | ✓ |
| タイトル fs/fw/font/color | 14/400/Sans/#1f2937 | 14px/400/Noto Sans JP/rgb(31,41,55) | ✓ |
| 矢印→(行) fs/color | 12px/#9ca3af | 12px/rgb(156,163,175)=#9ca3af | ✓ |
| ボタン bg | #1e2c5b | rgb(30,44,91)=#1e2c5b | ✓ |
| ボタン w/h | 200×52（中身依存） | 204×52 | ✓（中身依存・許容） |
| ボタン fs/lh/ls/color | 14/20/1.4px/#fff | 14px/20px/1.4px/rgb(255,255,255) | ✓ |
| ボタンテキスト | 全てを見る　→ | 全てを見る　→ | ✓ |
| 画像枚数 / ボタン数 | 2 / 1 | 2 / 1 | ✓ |

数値・色・タイポ・2カラムレイアウト・画像コンポジション・罫線すべて一致。

## 修正履歴

### Round 1（tree.js 属性修正・2件まとめて適用）
1. **左画像カラムの幅崩壊（w=0）**
   - 症状: `ImageComposition`（左カラム）が w=0 に潰れ、右カラムが行幅を占有。大画像も max-width:100% で 0px に。
   - 原因: `flexShorthand: '0'` が CSS `flex: 0`（= `flex:0 1 0%`）に展開され、`flex-basis:0%` + `flex-shrink:1` が `sizeWidth:432px`（width宣言）に main-axis サイズで優先勝ち → 0px に収縮。
   - 対処: `flexShorthand: '0' → '0 0 auto'`。`flex-basis:auto` で width:432px が効き、grow/shrink=0 で固定幅を維持。
   - 結果: ImageComposition 432×320（flex:0 0 auto）、大画像 432×320 に復旧。

2. **見出し NEWS のベタ塗り背景（rgb(4,56,76)）**
   - 症状: `<h2>NEWS</h2>` に SWELL 既定見出し装飾のベタ塗り背景＋padding 27px/36px が付与。
   - 原因: `is-style-*` 未指定の素の core/heading に SWELL がデフォルト装飾を適用（FV見出しは is-style-section_ttl で回避済み）。
   - 対処: `className: 'is-style-section_ttl'` を付与。子テーマ style.css が section_ttl の ::before/::after を解除済みのため、装飾なしのプレーンなゴールド文字＋透明背景になる（FVと同方式・対照表どおり）。
   - 結果: bg=透明、padding=0、color #c5a059 のプレーン見出しに収束。

ラウンド数 2/3。設計変更を要する差異はなし。

## 残課題

- **CSS待ち（既知）**: 小画像（室内）ラッパの box-shadow。設計は `shadow-xl`（0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)）だが、UB の属性では box-shadow 未生成（実測 `box-shadow:none`）。白フレーム（padding4px+bg白）は属性で再現済み。後段のページCSS（swell-meta-css）でまとめて適用予定。前提どおり影の有無では不一致と判定していない。
- 上記以外の罫線（リスト上端2pxネイビー / 各行下1pxグレー）は **UB の border 属性で実機描画されており CSS待ちではない**（一致）。
- 大画像の object-fit:cover は属性で適用済み。前提に挙がっていた「大画像の overflow」は本セクションでは問題化していない（432×320 でトリミング表示）。

## メモ
- ニュース各項目のリンク（href）は datapack 指示により未実装（行内 href なし）。設計どおり。
- 他セクション（FV）のブロックには一切変更を加えていない（isValid 47/47 維持）。
