# verify-report: CONTACT (お問い合わせ・再利用)

トップページから再利用した CONTACT セクションを、会社概要ページ（ページID 26）の最終セクションとして **append** 挿入し、実機シリアライズ → isValid → DOM計測突合で収束した。

## 結果

**PASS**（合格）。中央寄せレイアウト・テキスト・寸法・色・ネイビー背景の幾何が datapack 検証値と一致。残課題はボタン影・上端border の2点のみ（属性で表現不可・後段ページCSS待ち＝既知）。修正ループ 0 回（初回シリアライズで収束）。

- 挿入モード: append（既存 HERO / Breadcrumb / PROFILE の下に追加、それらブロックは無改変）
- post_content 変更: ページID 26 のみ。テキスト変更なし。
- セクション markup: 3912 bytes / ページ全体: 37765 bytes

## isValid（ページ全体）

```
{ total: 86, allValid: true, invalid: [] }
```

全86ブロック allValid:true。修正不要。

## 計測突合表（.sec-contact / viewport 1440×900）

| 項目 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション背景 | #1e2c5b | rgb(30,44,91) = #1e2c5b | ✓ |
| セクション幅 / x原点 | 全幅 / 0 | w1440 / x0 | ✓ |
| 内側 max-width | 896px | 896px | ✓ |
| 内側 padding | top128 / 左右16 / bottom128 | 128px 16px | ✓ |
| 内側 左右中央寄せ | margin left/right auto | ML272px / MR272px（896を中央寄せ） | ✓ |
| 内側 gap | 8px | 8px | ✓ |
| 中央寄せ | items-center | align-items:center | ✓ |
| 見出し CONTACT | 36/40 fw600 ls3.6 Noto Serif JP #c5a059 center | 36px/40px fw600 ls3.6px "Noto Serif JP" rgb(197,160,89) 中央配置(x583,w274) | ✓ |
| 小見出し お問い合わせ | 12/16 fw400 ls1.2 Noto Sans JP #fff center | 12px/16px fw400 ls1.2px "Noto Sans JP" rgb(255,255,255) 中央(x680) | ✓ |
| 横罫 | 40×2px #c8a97e 中央 | w40×h2 rgb(200,169,126)=#c8a97e 中央(x700) | ✓ |
| 本文ラッパ padding | top32 / bottom40 | 本文 y2090（subhead y2024 +divider間＋32 反映） | ✓ |
| 本文 | 16/24 fw400 Noto Sans JP #d1d5db center | 16px/24px fw400 "Noto Sans JP" rgb(209,213,219)=#d1d5db / 「不動産に関するご相談は、お気軽にお問い合わせください。」 | ✓ |
| ボタン数 | 1 | 1 | ✓ |
| ボタン背景 / 文字 | #c5a059 / #fff | rgb(197,160,89)=#c5a059 / rgb(255,255,255) | ✓ |
| ボタン padding | 上下20 / 左右64 | 20px 64px | ✓ |
| ボタン border-radius | 0px | 0px | ✓ |
| ボタン書体 | 14/20 fw700 ls1.4 Noto Sans JP | 14px/20px fw700 ls1.4px "Noto Sans JP" | ✓ |
| ボタン文字 / url | 無料相談はこちら　→ / /contact/ | 「無料相談はこちら　→」 / href=/contact/ | ✓ |
| ボタン実寸 | 278×60px | 282×60px（hug幅・文字幅+padで自然算出、誤差4px許容内） | ✓ |
| ボタン box-shadow | shadow-lg（要CSS） | none | △ CSS待ち（既知） |
| セクション上端 border-top | 1px #020c1b（要CSS） | 0px none | △ CSS待ち（既知） |

備考: 見出し h2 の getComputedStyle 上 backgroundColor に SWELL テーマ既定値が出るが、`::before` は content:"" / 透明、`::after` は none で、可視の装飾バー・ベタ塗りは描画されない（class に is-style-section_ttl 無し・inline style はゴールド文字指定のみ）。視覚確認（implemented.png）でも中央寄せのゴールド文字見出しとして正しく描画。section_ttl 系の打ち消し対応は不要。

## 修正履歴

なし（修正ループ 0 / 3）。初回シリアライズ＋append挿入で isValid:true・計測全一致のため tree.js 修正・属性変更は行っていない。

## 残課題

**CSS待ち（既知）** — 以下2点は属性で表現不可。後段ページCSS（swell-meta-css.css）で適用予定。本検証では不一致判定の対象外。

1. **CTAボタン box-shadow** — `0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`（shadow-lg相当）。core/button に box-shadow 属性が無いため `.wp-block-button__link` へ後段付与。
2. **セクション上端 border-top** — `1px solid #020c1b`。loos/full-wide に全幅 border を出す属性が当ページ実装パターンに無いため `.sec-contact` へ後段付与。
