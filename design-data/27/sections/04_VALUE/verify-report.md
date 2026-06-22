# verify-report: Value

ページID 27（事業内容）4番目セクション `.sec-value` を append 挿入し、実機シリアライズ → isValid → 計測突合で収束。

## 結果

**PASS**（収束）。3価値の横並び・アイコン64×64（SVG表示）・H3＋説明文・縦区切り線・暗色背景すべて datapack 設計値と幾何一致。修正1ラウンドで収束（上限3）。

- 挿入モード: append（既存 Hero / Intro / Service の下に追加）。全 loos/full-wide セクション数 4、`sec-value` ブロック 1（重複なし）。
- post_content バイト数: 35419。他セクション・サイト設定・テーマファイルは未変更。
- swell_meta_show_sidebar=hide 維持（変更せず）。

## isValid

**allValid: true**（total 83 / invalid 0）。ページ全体のブロックがすべて妥当。H2 への `is-style-section_ttl` 追加後も全ブロック valid を再確認。

## 計測突合表（`.sec-value` / viewport 1440×900・frontend preview）

| 要素 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション幅 | full（1440） | w=1440 | ✅ |
| セクション背景 | rgba(0,0,0,0.8) 黒80%オーバーレイ | rgba(0,0,0,0.8) | ✅ |
| H2 テキスト | ASTERRAが大切にしていること | 一致 | ✅ |
| H2 色 | #ffffff（白） | rgb(255,255,255) | ✅ |
| H2 font-size | 30px | 30px | ✅ |
| H2 font-family | Noto Serif JP | "Noto Serif JP", serif | ✅ |
| H2 高さ | 36（line-height） | 36 | ✅ |
| H2 背景 | なし（透明・地はオーバーレイ） | rgba(0,0,0,0) padding 0 | ✅（※修正後） |
| 小見出し VALUE | Serif 12px / #c8a97e | 12px / rgb(200,169,126) / Noto Serif JP | ✅ |
| 横罫（H-Divider） | 40×2px / #c8a97e | w=40 h=2 bg rgb(200,169,126) | ✅ |
| 3価値行 | row / 中央 / width1152 / 行高96 | x=144 w=1152 h=96 | ✅ |
| 行の子（5要素） | 価値/区切/価値/区切/価値 gap32 | x: 195→553→586→929→962（valued 326/311/283・div 1/1） | ✅ |
| アイコン数 | 3（core/image SVG） | 3 | ✅ |
| アイコン naturalWidth | >0（SVG読込確認） | 64（×3、complete=true） | ✅ |
| アイコン表示サイズ | 64×64 | 64×64（×3） | ✅ |
| アイコン src | icon-value{1,2,3}-*.svg（ID53-55） | icon-value1-customer/2-sincere/3-future.svg | ✅ |
| H3 数 | 3 | 3 | ✅ |
| H3 色 | #c8a97e | rgb(200,169,126)（×3） | ✅ |
| H3 font-size | 18px | 18px | ✅ |
| 縦区切り線 ×2 | 1×96px / rgba(75,85,99,0.5) | w=1 h=96 bg rgba(75,85,99,0.5)（×2、x=553/929） | ✅ |

検算: 行内 5 要素（326+32+1+32+311+32+1+32+283=1150≒1152、端数は flex 等分の吸収）。datapack の 340.66+32+1+32+340.67+32+1+32+340.67≒1152 とテキスト幅追従差のみで幾何一致。

## 修正履歴

- **Round 1**: H2 に SWELL 既定見出し装飾（ベタ塗り navy ボックス `rgb(4,56,76)` + padding 22.5/30px）が乗り、design（白serif＋ゴールド下線のみ）と不一致。troubleshooting 表「見出しベタ塗り → SWELL装飾 → `className:"is-style-section_ttl"`」に従い、`tree.js` の H2 に `className: 'is-style-section_ttl'`（H3 と同じセクション用スタイル）を追加。再シリアライズ→再挿入後、H2 背景 `rgba(0,0,0,0)`・padding 0・白serif に解消。isValid:true 維持。

## 残課題

なし（CSS 待ちなし）。ブロック属性のみで完結。

注（情報のみ・本タスク対象外）:
- アクセントゴールドは tree.js / datapack とも Figma 実測 `#c8a97e` を採用（タスク指示の `#c5a059` とは別値。datapack 要確認サマリ参照）。実測も `rgb(200,169,126)` = `#c8a97e` で一貫。
- SVG メディア表示は確認できたが、SVG アップロード許可の恒久フィルタは未追加（import 用一時 mu-plugin は削除済み）。本番運用で SVG を使う場合の恒久対応は別途要検討（datapack 記載）。
