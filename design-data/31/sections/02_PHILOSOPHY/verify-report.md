# verify-report: 01 Philosophy

- 対象: ページID **31**（私たちについて / about）・セクション `.sec-philosophy`（index1）
- コンテナ: `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート 8918 / セッション about
- 挿入モード: **append**（既存FVの下に追加。FV原文5513B + 本セクション → 計12431B）
- 検証日: 2026-06-16 / ビューポート 1440×900

## 結果

**PASS（合格）**。幾何・寸法・テキスト・色・タイポグラフィすべて設計値と一致。
左写真コンポジション（負方向食い出し top -74px / left -51px ＋ drop-shadow）・右テキスト列とも
**ブロック属性のみで完結**（カスタムCSS不要）。テキスト変更なし。post 31 のみ操作。

## isValid

ページ全体 25 ブロック **allValid: true**（invalid: 0）。修正後も維持。

## 計測突合表（front-end / 1440幅。座標は写真土台ボックス原点基準）

| 要素 | 設計値 | 計測値 | 判定 |
|---|---|---|---|
| セクション | 1440×810 / bg #ffffff | 1440×810 / rgb(255,255,255) | ✓ |
| 写真土台ボックス | 1280×550px(maxW100%) / #f2f2f2 / relative | 1120×550 / rgb(242,242,242) / relative | ✓※1 |
| 左・営業写真(id37) | absolute left -51 / top -74 / 342×553 / shadow -10px 10px 15px rgba(0,0,0,.25) | dx -51 / dy -74 / 342×553 / 同shadow / absolute | ✓ |
| 右・縦2分割コンテナ | absolute left 298 / top -74 / 幅342 / column gap8 / shadow同上 | dx 298 / dy -74 / 342 / shadow同上 | ✓ |
| └ 建物写真(id38) | 342×273 | dx298 dy-74 / 342×273 | ✓ |
| └ 家族写真(id39) | 342×272（建物下 +gap8 → dy207） | dx298 dy207 / 342×272 | ✓ |
| ラベル「01」 | Noto Serif JP 40px / lh40 / ls1.28 / #c5a86d | NotoSerifJP 40px/40px/1.28px/rgb(197,168,109) | ✓ |
| ラベル「OUR PHILOSOPHY」 | Jost 13px uppercase / lh26 / ls1.95 / #c5a86d | Jost 13px/26px/1.95px/rgb(197,168,109) | ✓ |
| H2見出し | Noto Serif JP 32px / lh48 / ls1.28 / #333333 / 2行(br) | NotoSerifJP 32px/48px/1.28px/rgb(51,51,51) / br有 | ✓ |
| 横罫 | UB 40×1px / bg #c5a86d | 40×1 / rgb(197,168,109) | ✓ |
| 本文第1段落 | Noto Sans JP 14.5px / lh30.45 / ls1.28 / #666666 / 上アキ8.935px | NotoSansJP 14.5px/30.45px/1.28px/rgb(102,102,102) / margin-top 8.935px | ✓※2 |
| 本文第2段落 | 同上 / 段落間 mt29.75px | 同上 / margin-top 29.75px | ✓ |
| 画像枚数 | 3 | 3 | ✓ |

※1 土台ボックスは `sizeWidth:1280` + `sizeMaxWidth:100%`。内側コンテナ（maxW1440・左右padding160）の
コンテンツ幅 1120px に追従して 1120 表示。設計の「maxWidth100%」仕様どおりの挙動で、写真・テキストは
ボックス原点基準で配置されるため負方向食い出し（-51/-74）・配置とも設計値に一致。崩れ・横スクロールなし。

※2 設計の本文第1段落「上アキ 8.935px」は当初 `paraSpacingPadding` で指定 → CSS未生成（後述・修正履歴1）。
`paraSpacingMargin` に変更して margin-top 8.935px を実現（背景/枠が無く padding と視覚等価）。

## テキスト一致確認（変更禁止 遵守）

- ラベル「01」/「OUR PHILOSOPHY」一致
- H2: `一度のお取引で終わらない、<br>信頼関係を大切に。`（br込み一致）
- 本文第1/第2段落 一字一句一致（br込み）

## 影・食い出し（属性完結の確認）

- 営業写真: `<figure>`（core/image）に `box-shadow: rgba(0,0,0,.25) -10px 10px 15px 0px`（`imgBoxShadow`由来）
- 縦2分割コンテナ: ラッパ `wp-block-flavor-universal-block` に同 box-shadow（`boxShadow`由来）
- 負方向食い出し: 親 relative（土台ボックス）+ 子 absolute（`positionType`/`imgPositionType`）+ 負値で表現
- いずれもブロック属性のみで出力。**CSS待ちなし**。

## 修正履歴（ループ1 / 上限3）

1. **本文第1段落の上アキ未反映** — `paraSpacingPadding:{top:8.935}` が CSS未生成（前提「要CSSなし」想定からの逸脱を属性内で解消）。
   原因: `inc/extensions/index.php` の `core/paragraph` spacing 設定が `['margin'=>true]`（margin のみ・padding 未登録）。
   そのため paragraph では padding 系属性が登録されず CSS化されない。
   対処: tree.js を `paraSpacingMargin:{top:8.935}` に変更（margin は paragraph で対応・第2段落の29.75pxで実証済）。
   背景/枠が無いため視覚は padding と等価。再シリアライズ→再append挿入→isValid再OK→計測で 8.935px 確認。
   ※テーマファイル（PHP/CSS）は変更していない。post 31 以外・サイト全体設定・メタ(swell_meta_show_sidebar=hide)は不変更。

## 残課題

- なし（PASS）。
- 参考: 営業写真の厳密な focal point（Figma原画 image left -47px のクリップ）は `scale:'cover'` で近似。
  現状の表示で違和感なし。厳密一致が必要なら object-position 微調整（属性外）を別途検討。
- 参考: 土台ボックスは内側コンテンツ幅1120pxに追従（設計1280はmaxWidth100%でキャップ）。設計仕様どおりで崩れなし。
