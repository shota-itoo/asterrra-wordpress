# verify-report: CONTACT (お問い合わせ)

- ページID: 7（トップページ・フロントページ）/ ポート: 8918 / コンテナ: `wp-env-asterrra-wordpress-b07ac4e0-cli-1`
- 挿入モード: **append**（既存5セクションの下に6番目・最終セクションとして追加）
- セクション: `.sec-contact`（`loos/full-wide`、ネイビー背景 #1e2c5b）
- 検証日: 2026-06-16 / 修正ループ: 0回（ラウンド1で収束）

## 結果

**合格（収束）。** ラウンド1でシリアライズ→append挿入→isValid:true→計測突合まで一致。tree.js修正は不要だった。
ページ全体の post_content は 62650 bytes（58651 + CONTACT 3912 + 区切り改行）に更新。`sec-contact` は新規1セクションとして追加され、既存ブロックには未接触。

## isValid

```json
{"total":149, "allValid":true, "invalid":[]}
```

ページ全体149ブロックすべて isValid:true。バリデーションエラーなし。

## 計測突合表（.sec-contact / viewport 1440×900）

| 項目 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション幅 | 1440（alignfull） | 1440 | OK |
| セクション背景 | #1e2c5b | rgb(30,44,91)=#1e2c5b | OK |
| 内側コンテナ max-width | 896px | 896px | OK |
| 内側 padding | 128/16/128/16 px | 128px/16px/128px/16px | OK |
| 内側 左右中央寄せ | margin left/right auto | 272px/272px（自動中央） | OK |
| 内側 align-items | center | center | OK |
| 内側 justify-content | center | center | OK |
| 内側 gap | 8px | 8px | OK |
| 見出しCONTACT font-family | Noto Serif JP | Noto Serif JP, serif | OK |
| 見出しCONTACT size/lh | 36px / 40px | 36px / 40px | OK |
| 見出しCONTACT weight | 600 | 600 | OK |
| 見出しCONTACT letter-spacing | 0.1em(=3.6px) | 3.6px | OK |
| 見出しCONTACT color | #c5a059 | rgb(197,160,89)=#c5a059 | OK |
| 見出しCONTACT 中央 | center | x583 w274 → 中心720（=1440/2） | OK |
| 小見出しお問い合わせ font | Noto Sans JP / 12px / lh16 / w400 | Noto Sans JP / 12px / 16px / 400 | OK |
| 小見出し letter-spacing | 0.1em(=1.2px) | 1.2px | OK |
| 小見出し color | #ffffff | rgb(255,255,255) | OK |
| 小見出し 中央 | center | x680 w79 → 中心≈720 | OK |
| 横罫 width×height | 40×2px | 40×2px | OK |
| 横罫 background | #c8a97e | rgb(200,169,126)=#c8a97e | OK |
| 横罫 中央配置 | layoutJustify:center | 中央（gap8流れ内） | OK |
| 本文 font | Noto Sans JP / 16px / lh24 / w400 | Noto Sans JP / 16px / 24px / 400 | OK |
| 本文 color | #d1d5db | rgb(209,213,219)=#d1d5db | OK |
| 本文ラッパ padding | top32 / bottom40 | top32 / bottom40 | OK |
| 本文 中央 | center | x504 w432 → 中心720 | OK |
| ボタン背景 | #c5a059 | rgb(197,160,89)=#c5a059 | OK |
| ボタン文字色 | #ffffff | rgb(255,255,255) | OK |
| ボタン border-radius | 0px | 0px | OK |
| ボタン padding | 20/64/20/64 | 上下20 左右64（実寸 282×60） | OK |
| ボタン font | Noto Sans JP / 14px / lh20 / w700 | Noto Sans JP / 14px / 20px / 700 | OK |
| ボタン letter-spacing | 0.1em(=1.4px) | 1.4px | OK |
| ボタン ラベル | `無料相談はこちら　→` | `無料相談はこちら　→` | OK |
| ボタン url | /contact/ | /contact/ | OK |
| ボタン 中央 | center | x579 w282 → 中心720 | OK |
| 要素数 | btn 1 / p 2（小見出し+本文） | btns:1 / paras:2 | OK |

幾何・テキスト・寸法・色すべて datapack 設計値と一致。中央寄せは flex `align-items:center` により各 hug幅ボックスがセクション中心(720px)に揃う形で成立（テキストの computed `text-align:start` は box が中央配置されるため視覚上の中央寄せに影響なし）。

## 修正履歴

なし（ラウンド1で全項目一致・isValid:true のため tree.js 修正・再挿入は発生せず）。

## 残課題

すべて「ブロック属性で表現不可 → 後段ページCSSで対応予定」の既知項目。検証では不一致判定の対象外とした（前提どおり）。

1. **CSS待ち（既知）: CTAボタン box-shadow** — `0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`（shadow-lg相当）。core/button に box-shadow 属性がないため未反映。
2. **CSS待ち（既知）: セクション上端 border-top** — `1px solid #020c1b`。loos/full-wide に全幅border属性がないため未反映。
3. **CSS待ち（既知・追加検出）: 見出しCONTACTの背景ボックス打ち消し** — 実測で h2 に SWELL デフォルトの見出し装飾背景 `rgb(4,56,76)` が出ている。これは `is-style-section_ttl` 未指定の plain h2 に SWELL がサイト全体で付与するテーマ既定装飾で、CONTACT固有の不具合ではない（同ページの SERVICE セクション h2 も plain heading のため同一の teal 背景が出ており、挙動はページ全体で一貫）。datapack はフラットな見出しを意図しているため、後段ページCSSで該当 h2 の背景打ち消しが必要（テーマ既定の打ち消しは属性不可・CSS領域）。ページ全体の plain h2 を一括で扱う方が一貫性が高い。

## スクショ

`design-data/7/sections/06_CONTACT/implemented.png`（フルページ・スクロールスルー後）。CONTACT はページ最終セクションとして末尾に描画。
