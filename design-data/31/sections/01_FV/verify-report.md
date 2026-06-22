# verify-report: FV

対象: `design-data/31/sections/01_FV/tree.js` → ページID 31（`/about/`・`.sec-about-fv`・index0）
コンテナ: `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート 8918 / セッション about / デザイン幅 1440 / 挿入モード new（空ページ全置換）
検証日: 2026-06-16

## 結果

**収束（1回 / 修正ループ 0）**

初回シリアライズ→挿入→isValid→計測の一巡で、プロンプトがスコープする幾何項目（レイアウト・テキスト・寸法・色・背景写真表示）がすべて設計値と一致。tree.js の修正は不要だった。残る不一致はすべて datapack §要CSS で事前に「CSS待ち（既知）」と宣言済みの項目で、前提により不一致判定の対象外。

## isValid

`allValid: true`（total 10 / invalid 0）

エディタ `wp.data.select('core/block-editor').getBlocks()` を再帰走査。10ブロック（loos/full-wide → flavor/universal-block×2 → heading×2 / paragraph×2 / buttons>button / image）すべて isValid。バリデーションエラー・修正なし。

## 計測突合表（.sec-about-fv / viewport 1440×900）

| 要素 | 属性 | 設計値 | 実測値 | 判定 |
|---|---|---|---|---|
| セクション | w / h / x | 1440 / 900(min-height) / 0(full) | 1440 / 900 / 0 | ✓ |
| H1 ABOUT US | x | 200（=160 margin+40 padding）| 200 | ✓ |
| H1 | font-size / line-height / letter-spacing | 38 / 76 / 4.56px(0.12em) | 38px / 76px / 4.56px | ✓ |
| H1 | font-weight / color | 500 / #C5A86D | 500 / rgb(197,168,109)=#C5A86D | ✓ |
| サブ見出し 私たちについて | size / lh / ls | 13 / 26 / 1.3px(0.1em) | 13px / 26px / 1.3px | ✓ |
| サブ見出し | weight / color | 300 / 白80% | 300 / rgba(255,255,255,0.8) | ✓ |
| メインコピー H2 | size / lh / ls | 38 / 60.8 / 1.28px(0.034em) | 38px / 60.8px / 1.292px | ✓ |
| H2 | weight / color / margin-top | 500 / #ffffff / 44px | 500 / rgb(255,255,255) / 44px | ✓ |
| サブコピー | size / lh / ls | 15 / 31.5 / 1.28px(0.085em) | 15px / 31.5px / 1.275px | ✓ |
| サブコピー | weight / color / margin-top | 300 / 白90% / 30px | 300 / rgba(255,255,255,0.9) / 30px | ✓ |
| CTAボタン | font-size / lh / ls / weight | 13 / 26 / 1.3px(0.1em) / 400 | 13px / 26px / 1.3px / 400 | ✓ |
| CTAボタン | border / radius / bg / padding | 1px solid 白30% / 0 / transparent / 17・46 | 1px solid rgba(255,255,255,0.3) / 0px / rgba(0,0,0,0) / 17px 46px | ✓ |
| CTAボタン | text-color / margin-top | #fff / 50px | rgb(255,255,255) / 50px(buttonsラッパー) | ✓ |
| btns 数 | — | 1 | 1 | ✓ |
| 背景写真 | display / size / position | fv-background.png 表示 / cover / center | ::before に url(fv-background.png) / cover / 50% 50% | ✓ |
| FVラッパー | overflow / position | （extension）| hidden / relative | ✓ |
| imgs 数 | — | 1 | 1 | ✓ |
| 装飾ロゴ | サイズ | 222×170 | 222×170 / src=logo2.png 読込済 | ✓（寸法）|

- letterSpacing の 1.292px / 1.275px は em換算（0.034em×38=1.292 / 0.085em×15=1.275）の正当な丸めで、設計の 1.28px と実質一致。
- 背景写真は backgroundImage 拡張が `::before` 擬似要素として出力（要素自体の background-image は "none"。getComputedStyle(el,'::before') で確認）。素の写真は full-wide 全幅・cover・center で正しく描画。

## 修正履歴

なし（初回で収束）。

### 検証中の留意点（誤検知の記録）
- 初回の `getComputedStyle(wrapper).backgroundImage` が "none" を返したが、これは背景が `::before` 擬似要素に乗る本拡張の仕様によるもので失敗ではない。擬似要素計測と素のHTMLフェッチ（`::before { ... background-image: url(fv-background.png) ... }` を確認）で表示を実証した。
- `?dev_login=1` URL は front-end キャッシュが効くため、CSS出力確認は `?nocache=$RANDOM` の素フェッチで実施。

## 残課題［CSS待ち（既知）］

datapack §要CSS（ブロック属性で表現不可・後段ページCSS / swell-meta-css で対応予定）。前提により本検証では不一致判定の対象外。

1. **左→右ネイビーグラデオーバーレイ** — `linear-gradient(90.54deg, rgba(10,22,49,.9)→.6→.1)`。backgroundImage 拡張の overlay は単色のみで非対応。FVラッパー `::after` で後段CSS。
2. **装飾ロゴの白色反転** — ソース logo2.png はネイビー版。FV上は白表示が正で `filter: brightness(0) invert(1)` 相当が必要（色反転はブロック属性に存在しない）。実測でロゴはネイビーのまま表示。
3. **ロゴ absolute の specificity 競合** — img の注入 absolute を親 backgroundImage 拡張の `> *:not([style*='z-index']){ position:relative; z-index:2 }`（0,3,0）が打ち消し、ロゴが `position:static`（right/bottom=auto）で通常フロー中央に出る。実測 position=static を確認。page7 01_FV と同一既知事象で、ページ限定CSSで specificity を上げ absolute を確定させる。
4. **text-shadow** — datapack 明示指定なしのため tree.js 不含。可読性補強で必要になれば後段CSS。

スクリーンショット: `design-data/31/sections/01_FV/implemented.png`（背景写真・ゴールド ABOUT US・2行メインコピー/サブコピー・アウトラインCTA を確認。グラデ無し / ロゴ中央ネイビー表示は上記既知CSS待ち）。
