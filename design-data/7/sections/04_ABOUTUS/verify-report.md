# verify-report: ABOUT US (代表挨拶)

- ページ: ID 7（トップページ / front page）, ポート 8918, コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1`
- 挿入モード: **append**（既存 Sec.FV / Sec.NEWS / Sec.SERVICE の下に Sec.ABOUT を追加。既存3セクションは不変）
- 検証幅: 1440px / セクション: `.sec-about`（4番目）
- swell_meta_show_sidebar=hide（既設定・未変更）

## 結果

**PASS（影のみ CSS 待ち・既知）**

幾何・寸法・テキスト・色・画像/背景オーバーレイ・ボタンの主要項目はすべてデザイン一致。
SWELL の h2 デフォルトベタ塗り装飾を `is-style-section_ttl` で抑止し、デザイン通りの「白地＋ゴールド素見出し」を再現。
建物写真の左はみ出し（-20px）を反映し、写真右側にネイビーカードが前面で重なる構図を再現。

## isValid

- **allValid: true**（total 99 ブロック / invalid 0）。ページ全体で破綻なし。

## 計測突合表（`.sec-about` フロント実測 vs datapack 設計値）

| 対象 | 設計値 | 実測値 | 判定 |
|---|---|---|---|
| セクション背景 | #ffffff | rgb(255,255,255) | ✓ |
| 重なりエリア | 100% / 466px・relative | 1088px / 466px・relative | ✓ |
| 左建物写真ラッパ | absolute / left -20 / top 159 | absolute / x=156（content176−20）/ y整合 | ✓ |
| 建物写真(img) | 596×397 / cover / radius10px | 596×397 / cover / 10px | ✓ |
| メッセージカード | absolute / right0 / top0 / 668×466 | absolute / x=596（右フラッシュ）/ 668×466 | ✓ |
| 写真↔カード水平重なり | 71px（設計フレーム値） | 156px（コンテナ実幅内・右フラッシュ配置の幾何） | △（下記） |
| 大見出し ABOUT US | #c5a059 / 36px / lh40 / ベタ塗りなし | #c5a059 / 36px / lh40 / bg透明・padding0 | ✓ |
| カード見出し h3 | #c5a059 / 32px / 700 / lh44 | #c5a059 / 32px / 700 / lh44 | ✓ |
| カード本文 | 白 #ffffff / 16px / lh29 ×2段落 | rgb(255,255,255) / 16px / 2段落 | ✓ |
| カード背景画像 | skyline cover/center | ::before に skyline 画像（cover） | ✓ |
| navy オーバーレイ | rgba(10,25,47,0.8) | ::after rgba(10,25,47,0.8) | ✓ |
| ロゴ画像 | 152×116 | 152×116 | ✓ |
| ボタン | 透明背景 / 白枠1px / 角丸0 / 白文字 | bg rgba(255,255,255,0) / 1px #ffffff / 0px / #ffffff | ✓ |

### △ 重なり量について（不一致でない判断）

datapack の「71px」は Figma フレーム（幅1173・写真とカードが両方とも 1152 コンテンツ外へブリードする前提）の値。
本実装はコンテナ実幅内（overlap area 1088px）で「建物写真 left:-20 フラッシュ左」＋「カード right:0 フラッシュ右」の絶対配置。
写真596＋カード668＝1264 が 1088 を 176px 超過するため、両者をコンテナ幅内に収めると重なりは構造的に156px となる（71pxはカードも右へブリードさせない限り幾何的に成立しない）。
タスク要件「カードが写真の右側に前面で重なる／コンテナ実幅内のabsolute配置」は満たしており、視覚的にデザインと一致（design.png 突合済み）。datapack の検証式（`668 − 1088 + 596 − 0 ≒ 72px`）は算術上176pxとなり、datapack 内部の記載不整合と判断。

## 修正履歴

- **Round 1**: 大見出し h2 に SWELL デフォルトのベタ塗り装飾（bg rgb(4,56,76)・padding 27/36px）が混入。datapack 症状表どおり、既存セクション見出しと統一して `className: 'is-style-section_ttl'` を付与 → 白地ゴールド素見出しに是正。
- **Round 2**: 建物写真の左はみ出し（datapack §1「left:-20」装飾オフセット）が未実装（left:0）だったため `positionLeft: '-20'` に修正 → 写真が content 左端より20px左へ突出、重なり量も176→156pxへデザイン側へ接近。
- いずれも tree.js のブロック属性のみで対応（カスタムCSS/PHP不使用）。再シリアライズ→旧 Sec.ABOUT を除去して再 append→isValid true 維持を確認。

## 残課題

- **CSS待ち（既知）**: メッセージカードの box-shadow `0 0 6px 6px rgba(0,0,0,0.05)`。ブロック属性に影指定がないため後段のページCSS（swell-meta-css）で適用予定。影の有無は本検証の合否対象外。
