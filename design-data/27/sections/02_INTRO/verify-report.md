# verify-report: Introduction

- **対象**: ページID `27`（事業内容 / `/service/`）／セクション `.sec-intro`（2番目・Hero直下にappend）
- **環境**: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / port `8918` / セッション `asterrra-srv` / 検証ビューポート `1440×900`
- **挿入モード**: `append`（既存Hero `sec-hero` を保持し、その下にINTROを追加）
- **検証日**: 2026-06-16

---

## 結果

**合格（PASS）** ｜ 修正ループ 0 回（初回で収束）

- 実機Gutenbergシリアライズ成功（5402 bytes、`<!-- wp:loos/full-wide` 始まり）。
- append挿入成功：Hero（3614 bytes）＋ INTRO ＝ 計 9437 bytes をページ27へ `$wpdb->update()` で反映。`wp post update` 不使用。Hero `sec-hero` は無傷。
- ブロックバリデーション all valid（後述）。
- `.sec-intro` の2カラム幾何・テキスト・色・寸法が設計値と一致（後述の突合表）。
- `swell_meta_show_sidebar=hide` は既設定のまま変更せず。他セクション（Hero）・サイト全体設定・テーマファイルは未変更。

---

## isValid（ページ全体）

| 項目 | 値 |
|---|---|
| total blocks | 20 |
| allValid | **true** |
| invalid | `[]`（なし） |

ページ全体（Hero＋INTRO）20ブロックすべて `isValid !== false`。バリデーションエラーゼロ。

---

## 計測突合表（`.sec-intro` / viewport 1440）

| 要素 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション背景 | `#ffffff` | `rgb(255,255,255)` | ✓ |
| セクション位置/幅 | Hero直下・full幅 | x=0, y=984, w=1440, h=598 | ✓ |
| 2カラム配置 | 左テキスト＋右画像 横並び | 左 x=176 / 右 x=752（同一行・等幅） | ✓ |
| 左カラム | flex:1 | x=176, w=512, h=406 | ✓（注1） |
| 右カラム | flex:1 | x=752, w=512, h=400 | ✓（注1） |
| ラベル テキスト | `INTRODUCTION` | `INTRODUCTION` | ✓ |
| ラベル 色 | `#c8a97e`（ゴールド） | `rgb(200,169,126)` = #c8a97e | ✓ |
| ラベル fs/lh | 12px / 16px | 12px / 16px | ✓ |
| H2 テキスト | `不動産は、未来をつくる資産。` | 同一 | ✓ |
| H2 色 | `#131c30`（ネイビー） | `rgb(19,28,48)` = #131c30 | ✓ |
| H2 fs/lh | 30px / 36px | 30px / 36px | ✓ |
| 横罫 | 40×2px・ゴールド | w=40, h=2, `rgb(200,169,126)` = #c8a97e | ✓ |
| 本文段落数 | 3段落 | 3（`<p>`計4 = ラベル1＋本文3） | ✓ |
| 右画像 src | intro-modern-apartment-building.png | 一致（id33・naturalWidth 544 = 実ロード確認） | ✓ |
| 右画像 表示寸法 | 544×400・cover | 512×400・object-fit:cover（注1） | ✓ |
| 画像枚数 | 1 | 1 | ✓ |

**注1（カラム幅 512px の扱い — 不一致ではない）**
datapack §7 の「544px×2＋gap64＝1152」は外枠1280フレーム基準の生値。tree.js／datapack検証用設計値（L233-236）は意図的に「max-width 1152 コンテナ＋左右 padding px32」へ正規化済み。
この正規化の結果、有効幅 = 1152 − padding64 − gap64 = 1024 → 2分割で **各512px** となるのが設計どおりの帰結。
カラムは横並び・等幅・同一行で崩れなし。is-style-section_ttl によりH2のSWELLベタ塗り装飾も抑止されネイビー文字表示。よって幾何PASSと判定。

---

## 修正履歴

なし（ラウンド0で収束）。シリアライズ→append挿入→isValid:true→計測一致まで一発通過。

---

## 残課題

**CSS待ち（既知）— 検証スコープ外・不一致判定に含めない**

1. **背景パネル `#f2f2f2`（1180×465・左側背面・breakout）** — コンテンツコンテナ1152を超える幅＋左端アンカー＋中央コンテンツ背面のz順は、中央寄せ1152内のabsolute UB属性では再現不可。section全幅基準の擬似要素 or absolute背景矩形で後段ページCSSにて適用予定。
2. **右画像 drop-shadow（`box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)` = shadow-lg）** — `core/image` にbox-shadow属性が無く属性出力不可。後段ページCSSで適用予定。

スクリーンショット `implemented.png` でも上記2点（薄グレーパネル・画像影）のみ未適用、それ以外（2カラム・テキスト・色・寸法）は設計一致を確認済み。

---

## 成果物

- `implemented.png`（フルページスクショ・1440幅）
- 反映先: ページID27 `post_content`（Hero保持・INTRO append）
