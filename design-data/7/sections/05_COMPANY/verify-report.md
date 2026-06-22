# verify-report: COMPANY (会社概要)

- **対象**: ページID `7`（トップページ / `?page_id=7` はフロントページ解決）/ セクション5番目 `.sec-company`
- **環境**: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート `8918` / セッション `asterrra` / 計測ビューポート `1440×900`
- **挿入モード**: `append`（既存 FV / NEWS / SERVICE / ABOUT の下に追加。既存セクションは未変更）
- **入力**: `tree.js`（シリアライズ 15,269 bytes）→ ページ全体 58,650 bytes（既存 41,541 bytes + 追記）
- **ページメタ**: `swell_meta_show_sidebar=hide`（既存設定・未変更）
- **検証日**: 2026-06-16

## 結果

**合格（PASS）**。isValid 全数 true、計測突合は骨格・タイポ・色・寸法・画像3枚の重なり配置すべてデザイン値と一致。残課題は既知の CSS 待ち2点（透かし文字・小画像 box-shadow）のみで、本検証の合否対象外（事前合意どおり不一致判定しない）。

## isValid

- `wp.data.select('core/block-editor').getBlocks()` 再帰走査：**total 140 ブロック / allValid: true / invalid: []**
- 追記した COMPANY セクション（loos/full-wide + flavor/universal-block 多段 + core/heading + core/paragraph + core/buttons/button + core/image ×3）を含めバリデーションエラーなし。

## 計測突合表（`.sec-company` @ 1440×900）

### セクション骨格
| 要素 | 期待値 | 実測値 | 判定 |
|---|---|---|---|
| セクション背景 | `#0a192f` | `rgb(10,25,47)` | ✓ |
| セクション幅 | 1440 | 1440 | ✓ |
| セクション高さ | 784（design） | 784 | ✓ |
| コンテナ width / max-width | 100% / 1152px | 1152 / 1152px | ✓ |
| コンテナ padding | 128/32/128/32 | `128px 32px` | ✓ |

### 見出し
| 要素 | 期待値 | 実測値 | 判定 |
|---|---|---|---|
| h2 COMPANY content | `COMPANY` | `COMPANY`(w215×h40) | ✓ |
| h2 color | `#c5a059` | `rgb(197,160,89)` | ✓ |
| h2 font-size | 36px | 36px | ✓ |
| 小見出し 会社概要 | 12px / 16px / 400 | 12px / 16px / 400 | ✓ |

### 定義リスト（5項目 term:96px固定 + detail:flex1）
| 行 | term幅 | term weight/fs/lh | detail fs/lh | 判定 |
|---|---|---|---|---|
| 会社名 | 96px | 700 / 14px / 20px | 14px / 20px | ✓ |
| 代表者 | 96px | 700 / 14px / 20px | 14px / 20px | ✓ |
| 所在地 | 96px | 700 / 14px / 20px | 14px / **22.75px** | ✓（この行のみ行高 22.75px） |
| TEL | 96px | 700 / 14px / 20px | 14px / 20px | ✓ |
| 免許 | 96px | 700 / 14px / 20px | 14px / 20px | ✓ |
- term 全行 w=96px、detail 全行 w=312px（残幅 flex1）で一致。テキストは datapack 原文ママ（全角コロン始まり）で変更なし。

### CTAボタン（ゴールド）
| 属性 | 期待値 | 実測値 | 判定 |
|---|---|---|---|
| text | `会社概要を見る …→` | `会社概要を見る    →`（nbsp×4+矢印） | ✓ |
| background | `#c5a059` | `rgb(197,160,89)` | ✓ |
| color | `#ffffff` | `rgb(255,255,255)` | ✓ |
| border-radius | 0px | 0px | ✓ |
| padding | 16px 40px | 16px 40px | ✓ |
| サイズ | 215×52（design実測） | 221×52 | ✓（±6px=nbsp間隔誤差・許容） |

### 右カラム画像3枚（重なり配置）
| 要素 | 期待寸法 | 実測寸法 | はみ出し（期待→実測） | border | 判定 |
|---|---|---|---|---|---|
| 大 オフィス外観 | 616×400 | 616×400（x648,y4413） | 土台 | none | ✓ |
| 小L オフィス内観 | 277×150 | 277×150（x570,y4723） | left -78px → 78px / bottom -60px → 60px | 1px rgba(255,255,255,0.1) | ✓ |
| 小R 会議室 | 277×150 | 277×150（x1099,y4722） | right -112px → 112px / bottom -59px → 59px | 1px rgba(255,255,255,0.1) | ✓ |
- 大画像 左端648 / 右端1264 / 下端4813 を基準に、小Lは左へ78px・下へ60px、小Rは右へ112px・下へ59pxはみ出し、左右対称気味に底辺をまたぐ重なりを再現。
- 要素カウント: imgs=3 / buttons=1 / paragraphs=11（会社概要1 + term5 + detail5）すべて期待どおり。

## 修正履歴

なし（ラウンド1で isValid 全数 true・計測全項目一致。修正ループ未使用 / 上限3）。

## 残課題

**CSS待ち（既知）** — tree.js に意図的に含めず、後段ページCSSで適用予定。本検証では不一致判定の対象外（事前合意済み）。

1. **背景透かし文字「ASTERRA CORPORATION」** — コンテナ(max-width1152)外への breakout（セクション左端 -5.55px〜右へ約357pxはみ出し・1803px幅 nowrap）と overflow:hidden クリップ、z-index 背面・pointer-events:none が属性で表現不可。
2. **小画像2枚の box-shadow（shadow-xl: `0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)`）** — flavor shadow Extension の多重ドロップシャドウ カスタム値はフロントCSS未生成（白枠 1px のみ属性で実装済み・実測確認済み）。

> 上記2点はブロック属性ファースト原則上 CSS が正解の領域。着手前にユーザー承認が必要（wordpress/CLAUDE.md 鉄則）。

## 成果物

- 実装スクショ（フルページ）: `implemented.png`
- 本レポート: `verify-report.md`
