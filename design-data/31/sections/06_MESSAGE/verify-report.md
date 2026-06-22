# verify-report: 代表メッセージ (06_MESSAGE / .sec-message)

- ページID: 31（/about/）
- セクション: `.sec-message`（top-level full-wide index5 = 6番目）
- コンテナ: `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート 8918 / セッション about / 幅 1440
- 挿入モード: **append**（既存5セクションの末尾に追加）
- 検証日: 2026-06-16

---

## 結果

**PASS（収束・修正ループ0回）**

- シリアライズ: tree.js → 実機Gutenberg `wp.blocks.serialize` で 6,348 bytes、`<!-- wp:loos/full-wide` 始まり確認。
- 挿入: 既存 post_content（41,172 bytes）末尾に append → 合計 47,995 bytes を `$wpdb->update`（insert-content.php）で書込成功。
- 既存セクション（AboutFV / Philosophy / Mission / Value / Future）は不可侵。sec-message が6番目として追加。
- 左テキスト・寸法・色・署名・右写真2枚の重なり、すべて datapack 設計値と一致。
- 既知の残課題2点（ghost文字 / 写真bleed）は属性外でCSS待ち。仕様どおり不一致判定せず。

---

## isValid（ページ全体）

```json
{ "total": 96, "allValid": true, "invalid": [] }
```

全96ブロック valid。型エラーなし。修正不要。

---

## 計測突合表（.sec-message / viewport 1440×900 / frontend）

### ルート / レイアウト
| 対象 | 設計値 | 実測値 | 判定 |
|---|---|---|---|
| ルート full-wide 幅 | alignfull = 1440 | x0 / w1440 | ✓ |
| 背景色 | #FFFFFF | 白（root） | ✓ |
| ラッパー左基準 | section pl144 ≈ max1120中央寄せ近似 | テキスト x=160（(1440-1120)/2） | ✓（近似仕様どおり） |
| セクション高さ | 712（原寸・固定高なし） | h643（コンテンツ駆動 pt/pb130） | ✓（高さ非固定の想定内） |

### テキスト（一字一句・正規値）
| 要素 | content | 設計 color / size / lh / ls / align | 実測 | 判定 |
|---|---|---|---|---|
| 英字ラベル H2 | MESSAGE | #C5A86D / 26 / 52 / 3.9px / (left配置) | rgb(197,168,109) / 26px / 52px / 3.9px / x160 | ✓ |
| 和ラベル | 代表メッセージ | #666666 / 11 / 22 / 1.32px / left | rgb(102,102,102) / 11px / 22px / 1.32px / start・x160 | ✓ |
| 本文1 | 私たちは…使命です。(3行<br>2) | #666666 / 14 / 29.4 / 1.28px / left | rgb(102,102,102) / 14px / 29.4px / 1.28px / start・x160・w522 | ✓ |
| 本文2 | これからも…続けます。(2行<br>1) | #666666 / 14 / 29.4 / 1.28px / left | rgb(102,102,102) / 14px / 29.4px / 1.28px / start・x160・w503 | ✓ |
| 署名役職 | 代表取締役 | #666666 / 12 / 24 / 1.2px / right | rgb(102,102,102) / 12px / 24px / 1.2px / 右寄せ（右端~712） | ✓ |
| 署名氏名 | 時田　和輝（全角SP1つ） | #333333 / 18 / 36 / 3.6px / right | rgb(51,51,51) / 18px / 36px / 3.6px / 右寄せ（右端712） | ✓ |

- 署名「時田　和輝」（全角スペース1つ）原文どおり描画を確認。色 #333333・右揃え一致。
- paras=5（代表メッセージ / 本文1 / 本文2 / 役職 / 氏名）一致。

### 装飾写真（absolute・親relative基準 / 重なり）
| 写真 | ID | 設計 size / z | 実測 表示 size / 位置 / wrapper | 判定 |
|---|---|---|---|---|
| 建物写真 | 40 | 346×231 / z1（背面） | message-building.png 346×231 / x811 y4292 / wrapper position:absolute z-index:1 | ✓ |
| 仲間写真 | 41 | 436×240 / z2（前面） | message-team.png 表示311×240 / x969 y4461 / wrapper position:absolute z-index:2 | ✓ 高さ・z一致／幅はbleedクリップ（下記） |

- imgs=2、両画像ともスクロール後 complete:true・naturalサイズ 1439×959 で実体ロード確認（lazy placeholder解消）。
- 親ラッパーは positionType:relative、写真2枚とも imgPositionType:absolute + imgPositionZIndex で配置。
- **重なり確認**: 建物写真（z1）右下に仲間写真（z2）の左上が被さる。重なり領域 x969–1157 / y4461–4523、仲間写真が前面。設計の重なり関係と一致。

---

## 修正履歴

- 修正ループ 0 回（初回シリアライズ→append→isValid:true→計測一致で即収束）。

---

## 残課題

**CSS待ち（既知）: ghost文字 / 写真bleed**

1. **背面ゴーストタイポ「MESSAGE」（::before）** — 200px・ネイビー rgba(30,44,91,0.05)。疑似要素のためブロック属性では表現不可。後段ページCSSで適用予定。今回の幾何検証では透かし文字なしを不一致としない（仕様どおり）。
2. **右写真のビューポート右ブリード** — 仲間写真（ID41）は設計上ビューポート右端付近（右端~1389/1440）まで張り出すが、max1120中央寄せラッパー内では右コンテンツ端 x=1280 でクリップされ表示幅 311px（高さ240px・left809px は設計どおり）。コンテナ外への右breakoutは属性では不可、後段ページCSSで適用予定。クリップ状態を不一致判定しない（仕様どおり）。

その他の左テキスト・寸法・色・署名・右写真2枚の重なり表示は全て設計一致。

- スクリーンショット: `design-data/31/sections/06_MESSAGE/implemented.png`（フルページ）
