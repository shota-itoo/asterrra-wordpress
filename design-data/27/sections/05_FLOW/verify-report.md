# verify-report: Flow

- 対象: ページID 27「事業内容」/ セクション `.sec-flow`（5番目・index=4・append挿入）
- 環境: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート 8918 / セッション `asterrra-srv` / デザイン幅 1440
- 実施日: 2026-06-16 / 修正ラウンド: 1（上限3）

## 結果

**合格（PASS）** — 5ステップ横並び・円バッジ・SVGアイコン・矢印・テキスト中央寄せ・寸法すべて datapack 一致。
- 既存4セクション（sec-hero / sec-intro / sec-service / sec-value）は不変、その下に sec-flow を append。
- post_content はページID 27 のみ変更。テーマファイル・サイト全体設定は未変更。`swell_meta_show_sidebar=hide` も未変更。
- 残課題1件（H2のSWELL既定ネイビー箱）は**属性で解消不可・要ユーザー確認**。既存 sec-service と同一の既存挙動のため新規回帰ではない。

## isValid

ページ全体 129ブロック / **allValid: true / invalid: []**
- `has-text-align-center`（className）・`margin-top:69px`（矢印）追加後も isValid 維持。
- この SWELL ビルドの `core/heading` には `textAlign` 属性が存在せず（登録されない）、`core/paragraph` の `align` は block-align 用途で `has-text-align-center` を出力しない。PC文字揃えは responsive-text-align.php の方針どおり **core標準クラス `has-text-align-center` を className で直接付与**して解決（純ブロック属性・Gutenberg編集可）。

## 計測突合表（フロント実測 @1440 vs datapack）

| 項目 | datapack設計値 | フロント実測 | 判定 |
|---|---|---|---|
| セクション幅 | 1440（full-wide） | 1440 | ✓ |
| セクション背景 | #ffffff | rgb(255,255,255) | ✓ |
| セクション高さ | ≒610 | 615 | ✓ |
| 円バッジ サイズ | 80×80 | 80×80 | ✓ |
| 円バッジ border-radius | 円（9999px相当） | 40px（80pxボックスで正円） | ✓ |
| 円バッジ 背景 | #131c30 | rgb(19,28,48) | ✓ |
| 円バッジ box-shadow | shadow-md `0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)` | 同値（computed styleに出力済み） | ✓ **属性 boxShadow:'m' で表現済（CSS待ち不要）** |
| SVGアイコン（バッジ内） | 40×40 ×5 | 40×40 ×5（mail/clipboard/people/pen/heart 実URL読込） | ✓ |
| 矢印 chevron | 20×20 ×4 | 20×20 ×4（flow-arrow.svg） | ✓ |
| 矢印 縦位置 | バッジ中心の高さ | バッジ中心とのdelta **0px**（marginTop 46→69px補正後） | ✓ |
| ステップ数・横並び | 5・flex row 1段 | 5・同一y（stepRows=1） | ✓ |
| ステップ幅 | flex等分 ≒188.8 | 182px（等分） | ✓ |
| ステップ x座標 | 等間隔 | 160 / 394 / 629 / 863 / 1098（≒234px間隔） | ✓ |
| H3 見出し | 16/24・700・#131c30・中央 | fs16・fw700・rgb(19,28,48)・center | ✓ |
| 説明文 | 12/24・#374151・中央・2行<br> | fs12・lh24・rgb(55,65,81)・center・br有 | ✓ |
| 説明文 per-line中央 | 各行中央寄せ | Step5: line1 l0/r0・line2 l43/r43（左右対称） | ✓ |
| 番号 01-05 | 24/32・#c8a97e・中央 | center・rgb(200,169,126)（=#c8a97e） | ✓ |
| アイブロウ FLOW | 12/16・ls2.4px・#c8a97e・左 | fs12・ls2.4px・rgb(200,169,126)・start（左） | ✓ |
| H2見出し | 30/36・ls0.75px・#131c30・左 | fs30・ls0.75px・color rgb(19,28,48)・start（左） | ✓（文字色・字間・整列は一致。下記★） |
| 横罫 | 40×2・#c8a97e・左 | 描画確認（スクショ） | ✓ |

★ H2 文字色・字間・整列は設計一致だが、SWELL既定の**ネイビー箱（背景+::before枠）**が h2 に乗っている → 下記残課題。

## 修正履歴

ラウンド1（属性のみ・テーマファイル不使用）:
1. **テキスト中央寄せ** — 番号 `core/paragraph`・H3 `core/heading`・説明文 `core/paragraph` の効かない `align`/`textAlign` を `className:'has-text-align-center'` に置換。
   - 理由: この SWELL ビルドでは `core/heading.textAlign` 属性が未登録（serializeで脱落）、`core/paragraph.align` は block-align 用途で `has-text-align-center` 非出力。responsive-text-align.php の docstring「PC文字揃えは core標準クラス has-text-align-* を使う」に準拠。
   - 効果: num/h3/desc とも computed textAlign=center に。2行説明文の per-line 中央寄せも実現（修正前は短い行が左フラッシュ l0/r85 → 修正後 l43/r43 対称）。
2. **矢印の縦位置** — `core/image` の `style.spacing.margin.top` を 46px→69px に補正（実測で中心が23px上ズレ → +23）。矢印中心とバッジ中心の delta 0px に収束。

いずれも純ブロック属性。isValid 維持（129/129）。

## 残課題

**CSS待ち / 要ユーザー確認: H2見出しのSWELL既定ネイビー箱（1件）**

- 症状: H2「ご相談からご契約までの流れ」に `background:rgb(4,56,76)` と `::before`（2px solid rgb(4,56,76) の絶対配置枠 459×85px）が乗り、ネイビー地にネイビー文字で視認性が低い。
- 原因: SWELL の `core/heading`(h2) 既定ブロックスタイルが full-wide 内でネイビーの装飾箱（背景＋::before枠）を付与する仕様。`is-style-section_ttl` ブロックスタイルを当てると箱は消えるが **強制的に text-align:center** になり、FLOW datapack の左寄せ要件と矛盾する。
- 属性での可否: 背景は `style.color.background` で打ち消し可能だが、**`::before` 疑似要素は SWELL スタイルシート由来でブロック属性から除去不可**。左寄せを保ったまま箱を消すには SWELL 既定スタイルの打ち消し（カスタムCSS）が必要 → wordpress/CLAUDE.md「SWELL既定スタイルの打ち消しは着手前に必ずユーザー確認」に該当。本タスクは「テーマファイル不可」のため**未着手で残課題化**。
- 既存挙動との関係: **同ページの既存 sec-service の H2「サービス内容」も同一のネイビー箱**（bg rgb(4,56,76)・::before 同枠）。本セクション固有の不具合ではなく、ページ既存のプレーンH2と同じ状態。新規回帰ではない。
- 推奨対応（要承認）: `swell-meta-css.css`（ページ固有CSS）で `.sec-flow h2.wp-block-heading{ background:transparent; padding:0 0 12px; } .sec-flow h2.wp-block-heading::before{ display:none; }` を付与し、左寄せ・白地・装飾なしのネイビー серif見出しにする。承認後に着手。

その他の残課題: なし（バッジ影・矢印位置・横並び・SVG・テキスト中央寄せ・寸法はすべて属性で収束済み）。

## 成果物

- 実装スクショ（フルページ）: `design-data/27/sections/05_FLOW/implemented.png`
- ツリー: `design-data/27/sections/05_FLOW/tree.js`（ラウンド1修正反映済）
