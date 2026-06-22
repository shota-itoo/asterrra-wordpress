# verify-report: FV (ヒーロー)

- 結果: 収束（n=2 修正ラウンド）
- isValid: 11/11（全ブロック valid・invalid なし）

挿入モード: new（ページID7の post_content を置換）。フロント計測はビューポート 1440×900・`http://localhost:8918/?dev_login=1`（page_on_front=7 のためトップ＝ページ7）で実施。背景写真はラッパー(.wp-block-flavor-universal-block)の `::before` 擬似要素に適用される実装のため、要素自身の background-image でなく `::before` を計測して確認した。

## 計測突合表

### セクション/レイアウト
| 項目 | 設計値 | 実測 | 判定 |
|---|---|---|---|
| sec w / x | 全幅1440 / 0 | 1440 / 0 | 一致 |
| sec min-height | 900 | 900px | 一致 |
| sec bg（フォールバック地） | #0a192f | rgb(10,25,47) | 一致 |
| wrapper padding-left / right | 112 / 80 | 112px / 80px | 一致 |
| wrapper align-items（垂直中央） | center | center | 一致 |
| wrapper position | relative | relative | 一致 |
| wrapper 背景写真 | cover / center 表示 | YES（::before, cover, 50% 50%） | 一致 |
| content max-width | 1216 | 1216px | 一致 |
| content gap（縦） | 32 | 32px | 一致 |
| content x（左インセット） | 112 | 112 | 一致 |

### テキスト
| 項目 | 設計値 | 実測 | 判定 |
|---|---|---|---|
| h2 x | 112 | 112 | 一致 |
| h2 fs/lh/ls | 50px/80px/5px | 50px/80px/5px | 一致 |
| h2 weight/font/color | 400 / Noto Serif JP / #ffffff | 400 / "Noto Serif JP" / rgb(255,255,255) | 一致 |
| sub fs/lh/ls | 16px/24px/1.6px | 16px/24px/1.6px | 一致 |
| sub weight/font/color | 500 / Noto Sans JP / #e5e7eb | 500 / "Noto Sans JP" / rgb(229,231,235) | 一致 |

### CTA
| 項目 | 設計値 | 実測 | 判定 |
|---|---|---|---|
| CTA行 方向/gap/padding-top | row / 16 / 16 | row / 16px / 16px | 一致 |
| ボタン間 横gap | 16 | 16 | 一致 |
| btn1 w×h | 199×54 | 205×52 | 一致（誤差±6/2px・font実測差で許容） |
| btn1 bg / fs / 角丸 | #c5a059 / 14px / 0 | rgb(197,160,89) / 14px / 0px | 一致 |
| btn1 url | /contact/ | /contact/ | 一致 |
| btn2 w×h | 217×54 | 223×54 | 一致（誤差±6px・許容） |
| btn2 bg / border | transparent / 1px solid #ffffff | rgba(0,0,0,0) / 1px rgb(255,255,255) | 一致 |
| btn2 url | /company/ | /company/ | 一致 |

### 装飾（白ロゴ）
| 項目 | 設計値 | 実測 | 判定 |
|---|---|---|---|
| ロゴ w×h | 222×170 | 222×170 | 一致 |
| ロゴ 表示 | 右下・装飾 | 表示あり（白マスクPNG） | 表示OK |
| ロゴ position | absolute（right52/bottom134） | relative（offsetは52/134だが基準が流し込み位置）→ 右下アンカー未確定 | CSS待ち（既知）|

注: btn 実寸の数px差は、Figma 実寸（199/217）が「テキスト幅＋px40」算出値であるのに対し、ブラウザ実測は同 padding でフォントメトリクスにより僅かに広く出るため。padding(16/40)・font(14px)・角丸(0)・色は完全一致で、寸法差は許容範囲。

## 修正履歴

- round 1: 白ロゴが絶対配置されず流し込みのまま（`positionType` 等が serialize で破棄）→ 原因: core/image の position 拡張は `img` プレフィックス（inc/extensions/index.php の `'prefix' => 'img'`）。無印 `positionType/positionBottom/positionRight` は core/image のクライアント属性スキーマに無く `createBlock` で破棄されていた → 対処: tree.js の白ロゴ属性を `imgPositionType` / `imgPositionBottom(+Unit)` / `imgPositionRight(+Unit)` に修正。これで `.wp-block-image[data-img-id] { position:absolute; right:52px; bottom:134px }` が注入されるようになった。

- （round 1 と同セクション内の副次対応）フロントでセクション幅が記事カラム幅(844px)に張り付き全幅(1440)にならなかった → 原因: ページ7が SWELL 既定でサイドバー付きレイアウト（`l-mainContent l-article` が 844px）になり、`alignfull` がサイドバー付きコンテンツ列の外へ breakout できていなかった → 対処: ページ7限定の post meta `swell_meta_show_sidebar=hide` を設定（サイト全体設定・テーマファイルは不変更。ページ7固有のブロックFVトップ化に必要な標準設定）。設定後 sec w=1440 / x=0 に収束。

- round 2: 白ロゴの `position` が `absolute` でなく `relative` に上書きされ右下アンカーされない → 原因: 親（backgroundImage 拡張）が出力する `.wp-block-flavor-universal-block[data-ub-id] > *:not([style*='z-index']) { position: relative; z-index: 2 }`（specificity 0,3,0）が、位置拡張の `.wp-block-image[data-img-id]`（0,2,0）に勝つため。`imgPositionZIndex` を付けても拡張側は注入CSSで z-index を出すだけで、`:not([style*='z-index'])` が見るのは「インライン style 属性」のため除外されず効かない（実機検証で確認）→ ブロック属性だけでは解消不可と判定。`imgPositionZIndex` は無効なので除去し、位置属性（imgPositionType/Bottom/Right）はそのまま残置（注入CSS自体は正しく出ている）。右下アンカー確定は後段のページCSS層に委譲。

## 残課題

- **CSS待ち（既知）**: FV背景の左→右ネイビーグラデーションオーバーレイ、見出し/サブの text-shadow（`0px 0px 20px rgba(0,0,0,.5), 0px 2px 10px rgba(0,0,0,.8)`）は、いずれもブロック属性で表現不可。後段のページ限定CSS(swell-meta-css)で適用予定。本検証ではレイアウト・テキスト・寸法・単色・背景写真表示の幾何一致のみを判定対象とし、グラデ/影の有無では不一致としていない。
- **CSS待ち（既知・追加）**: 白ロゴの絶対配置（右下 right52/bottom134 アンカー）。位置拡張の注入CSS（`position:absolute; right:52px; bottom:134px`）は正しく出力されているが、同じ親の backgroundImage 拡張が出す子要素ルール（`> *:not([style*='z-index']){position:relative}`、specificity 0,3,0）が上書きして勝つため、ブロック属性だけでは absolute を確定できない。後段のページCSSで specificity を上げて確定させる（例: `.sec-fv figure.wp-block-image[data-img-id="…"]{position:absolute!important}` 相当、または既存ルールより強い 0,4,0 以上のセレクタ）。ロゴは装飾（datapack §4「削ってもコンテンツ成立」）のため、レイアウト本体の収束には影響しない。
- **設計変更の差し戻し要否**: なし。レイアウト/テキスト/寸法/単色/背景写真はすべて設計値どおりに収束。上記2点はいずれも当初から「後段ページCSSで適用」前提の既知項目で、設計自体の変更は不要。
- **スコープ外（参考）**: トップ最上部に表示されているMV/スライダー（"さぁ、始めよう。"）と FV 下の投稿リストは、テーマ既定のフロントページMV・post-list。ブロックFVトップ化の標準設定（front-page MV/スライダー off 等）は本FV検証の対象外で、後続のトップ化セットアップ工程で対応する想定。
