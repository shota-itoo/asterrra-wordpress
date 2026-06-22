# verify-report: CONTACT

- ページID: 27（slug `/service/`「事業内容」）
- セクション: `.sec-contact`（6番目・最終 / index=5）
- 挿入モード: **append**（既存5セクション sec-hero/sec-intro/sec-service/sec-value/sec-flow の下に追加）
- 環境: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート8918 / セッション asterrra-srv / デザイン幅1440
- 検証日: 2026-06-16
- swell_meta_show_sidebar=hide: 既設定（変更せず）

## 結果

**PASS（合格 / 収束ラウンド0回）**

シリアライズ→append挿入→isValid全件合格→計測突合の全数値一致を1巡で達成。tree.js 修正は発生せず。
残課題はすべて事前合意済みの「CSS待ち（既知）」のみ。

## isValid

| 項目 | 値 |
|---|---|
| total blocks（ページ全体） | 138 |
| allValid | **true** |
| invalid | `[]`（なし） |

ページ27全体（既存5セクション＋CONTACT）で破綻ブロックゼロ。

## 計測突合表（`.sec-contact` / viewport 1440×900）

| 項目 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション背景色 | `#1e2c5b` | rgb(30,44,91) = #1e2c5b | ✓ |
| セクション幅 | full（1440） | 1440 | ✓ |
| 内側コンテナ max-width | 896px | 896px | ✓ |
| 内側コンテナ実幅 | 896px | 896px | ✓ |
| 内側コンテナ中央寄せ | margin L/R auto（272/272） | marginL 272px / marginR 272px / 中点x=720（=viewport中央） | ✓ |
| 内側 align-items | center | center | ✓ |
| 内側 gap | 8px | 8px | ✓ |
| 内側 padding-top | 128px | 128px | ✓ |
| 見出しh2 中央寄せ | center | leftGap311 = rightGap311（左右等間隔） | ✓ |
| 見出しh2 color | `#c5a059`（ゴールド） | rgb(197,160,89) = #c5a059 | ✓ |
| 見出しh2 font-family | Noto Serif JP | "Noto Serif JP", serif | ✓ |
| 見出しh2 font-size | 36px | 36px | ✓ |
| 見出しh2 font-weight | 600 | 600 | ✓ |
| 見出しh2 letter-spacing | 3.6px（0.1em） | 3.6px | ✓ |
| 小見出し「お問い合わせ」color | `#ffffff` | rgb(255,255,255) | ✓ |
| 小見出し font-size | 12px | 12px | ✓ |
| 横罫 サイズ | 40×2px | 40×2px | ✓ |
| 横罫 背景色 | `#c8a97e`（Tan） | rgb(200,169,126) = #c8a97e | ✓ |
| 横罫 中央配置 | center（x≈428） | leftGap428 = rightGap428 | ✓ |
| 本文 color | `#d1d5db`（グレー） | rgb(209,213,219) = #d1d5db | ✓ |
| 本文 font-size | 16px | 16px | ✓ |
| 本文ラッパ 高さ | 96px | 96px | ✓ |
| 段落数（paras） | 2（小見出し＋本文） | 2 | ✓ |
| CTAボタン 数 | 1 | 1 | ✓ |
| CTAボタン ラベル | `無料相談はこちら　→` | 無料相談はこちら　→ | ✓ |
| CTAボタン href | `/contact/` | /contact/ | ✓ |
| CTAボタン 背景 | `#c5a059` | rgb(197,160,89) = #c5a059 | ✓ |
| CTAボタン 文字色 | `#ffffff` | rgb(255,255,255) | ✓ |
| CTAボタン border-radius | 0px | 0px | ✓ |
| CTAボタン padding | 上下20 / 左右64 px | padTop20px / padLeft64px | ✓ |
| CTAボタン font-size | 14px | 14px | ✓ |
| CTAボタン font-weight | 700 | 700 | ✓ |
| CTAボタン 中央寄せ | center | leftGap307 = rightGap307 | ✓ |

中央寄せ・見出し・横罫・本文・ボタン・ネイビー背景 #1e2c5b すべて設計値と数値一致を確認。

### 補足（textAlign:start について）
h2・p の computed `text-align` は `start` だが、中央寄せは内側UBの flex `align-items:center` で実現しており、各要素の左右ギャップが等間隔（h2 311/311・divider 428/428・button 307/307・コンテナ中点720）であることで視覚的中央寄せを実測確認済み。不一致ではない。

## 修正履歴

| ラウンド | 内容 |
|---|---|
| 0 | 修正なし（初回シリアライズ→挿入で isValid:true・全計測一致。収束完了） |

修正ループ消費: 0 / 3。

## 残課題 [CSS待ち（既知）]

後段のページ固有CSS（swell-meta-css.css）で適用予定。本検証では不一致判定の対象外（事前合意）。

1. **CTAボタン box-shadow** — `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)`（shadow-lg相当）。core/button に box-shadow 属性がないため未反映。
2. **セクション上端 border** — `border-top: 1px solid #020c1b`。loos/full-wide のセクション全幅 border 属性が当ページ実装パターンに無いため未反映。
3. **見出し箱（SWELLデフォルト装飾）** — h2 に SWELL テーマ既定の `background-color: rgb(4,56,76)` + `padding:27px 36px` + `::before` 疑似要素が乗っている。`is-style-section_ttl` 等で打ち消す想定（残箱はCSS待ち）。テキスト・ゴールド色・フォント・字間は設計値一致しており、装飾箱のみの差異。

いずれもブロック属性では表現不可の装飾レイヤーで、テキスト・配置・配色の本体は設計通り。
