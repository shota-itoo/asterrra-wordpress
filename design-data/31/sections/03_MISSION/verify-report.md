# verify-report: 02 Mission（Section - 02 Mission）

- 日時: 2026-06-16
- 対象: ページID `31`（私たちについて / about）
- セクション: `.sec-mission`（loos/full-wide・ネイビー地 `#0a192f`）
- 挿入モード: **append**（既存 FV + Philosophy の下に追加）
- 環境: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート `8918` / セッション `about` / viewport `1440×900`
- 入力: `design-data/31/sections/03_MISSION/tree.js`
- 突合: `design-data/31/sections/03_MISSION/datapack.md`

---

## 結果

**PASS（修正ループ 0 回・初回収束）**

- 実機シリアライズ（`wp.blocks.serialize`）→ `$wpdb` で append 挿入 → isValid 機械チェック → `.sec-mission` 計測突合まで一気通貫で合格。
- post 31 のみ操作。既存 FV / Philosophy セクション・他 post・サイト全体設定・テーマファイルは不可侵。テキスト変更なし。
- ページ全体バイト数: 12,432（挿入前）→ 29,651（挿入後）。

---

## isValid（ページ全体）

| 項目 | 値 |
|---|---|
| 総ブロック数 | 61（FV + Philosophy + Mission） |
| allValid | **true** |
| invalid | `[]`（なし） |

Mission セクション単体のブロック構成（シリアライズ結果からの計数）:

| ブロック | 個数 | datapack 期待値 | 判定 |
|---|---|---|---|
| loos/full-wide | 1 | 1 | ✓ |
| flavor/universal-block | 15 | 15 | ✓ |
| core/heading | 5 | 5 | ✓ |
| core/paragraph | 7 | 7 | ✓ |
| core/image | 8 | 8 | ✓ |
| **合計** | **36** | **36** | ✓ |

---

## 計測突合表（`.sec-mission` / viewport 1440）

### セクション骨格

| 要素 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション背景 | `#0a192f`（navy） | `rgb(10,25,47)` | ✓ |
| セクション幅 | full（1440） | w=1440 | ✓ |
| セクション高 | ≒952（design.png） | h=954 | ✓ |
| 画像枚数 | 8 | 8 | ✓ |

### ラベル / 見出し / リード

| 要素 | 設計値 | 実測値 | 判定 |
|---|---|---|---|
| 02（数字） | Noto Serif JP 40px/lh40/ls1.28px/`#c5a86d` | `rgb(197,168,109)` 40px/40px/1.28px/Noto Serif JP | ✓ |
| OUR MISSION | Jost 13px/lh26/ls1.95px/uppercase/`#c5a86d` | `rgb(197,168,109)` Jost 13px/26px/1.95px/uppercase | ✓ |
| H2 見出し | 34px/lh51/白 | fs34px/h51/`rgb(255,255,255)` | ✓ |
| リード本文 | Noto Sans JP 15px/lh33/ls1.28px/白85%/maxW820 | `rgba(255,255,255,0.85)` 15px/33px/1.275px/Noto Sans JP/maxW820px | ✓ |

### カードグリッド（4カラム）

| 要素 | 設計値 | 実測値 | 判定 |
|---|---|---|---|
| グリッド | flex row / justify center / gap24 | flex/row/center/columnGap 24px | ✓ |
| カラム配置 | 254×4 + gap24×3 | x=176 / 454 / 732 / 1010（各間隔 24px） | ✓ |
| カード写真 | 254×162 / cover | 全4枚 254×162 / object-fit cover | ✓ |
| カード本体 | 254×179 / `#1e2c5b` / relative / gap16 | 全4枚 254×179 / `rgb(30,44,91)` / relative / gap16px | ✓ |

### カード画像ソース（左→右の順序）

| カード | 写真 src | アイコン src | アイコン実測 W×H | 設計 W×H | 判定 |
|---|---|---|---|---|---|
| 1 不動産売買サポート | service-card1-baibai.png | service-icon1-baibai.png | 49×51 | 49×51 | ✓ |
| 2 賃貸・管理サポート | service-card2-chintai.png | service-icon2-chintai.png | 45×49 | 45×49 | ✓ |
| 3 リフォーム リノベーション | service-card3-reform.png | service-icon3-reform.png | 51×58 | 51×58 | ✓ |
| 4 不動産コンサルティング | service-card4-consulting.png | service-icon4-consulting.png | 55×45 | 55×45 | ✓ |

写真・アイコンとも naturalWidth>0 / complete=true（実体読込確認済）。

### アイコン絶対配置（カード本体ローカル top/right）

| カード | 設計 top/right | 実測 top/right | 判定 |
|---|---|---|---|
| 1 | 22 / 25 | 22px / 25px | ✓ |
| 2 | 30 / 26 | 30px / 26px | ✓ |
| 3 | 23 / 33 | 23px / 33px | ✓ |
| 4 | 29 / 22 | 29px / 22px | ✓ |

### カード見出し（white / 14px）

| カード | 見出しテキスト | color / fs | 判定 |
|---|---|---|---|
| 1 | 不動産売買サポート | `rgb(255,255,255)` / 14px | ✓ |
| 2 | 賃貸・管理サポート | `rgb(255,255,255)` / 14px | ✓ |
| 3 | リフォームリノベーション（2行） | `rgb(255,255,255)` / 14px | ✓ |
| 4 | 不動産コンサルティング（2行） | `rgb(255,255,255)` / 14px | ✓ |

---

## 修正履歴

修正ループ: **0 回**。tree.js を一切変更せず初回で全項目収束。

留意点（要修正ではない・挙動メモ）:
- フロント計測 1 回目はカード写真・アイコンが lazy-load 未デコード（naturalWidth=1 / base64 GIF プレースホルダ）だった。スクロールスルー後に全 8 枚が実ソースへ解決し、寸法・object-fit を再計測して合格。スクショ撮影前にも全節スクロールを実施し、空プレースホルダの偽 FAIL を回避済み。

---

## 残課題

なし。

- 属性内完結（追加 CSS / PHP なし）で 4カラム寸法・gap24・カード本体 254×179・写真 254×162 cover・アイコン絶対配置（top/right・サイズ）・ゴールド/ネイビー/白の配色・タイポグラフィすべて設計一致。
- ゴールドは datapack の実値 `#c5a86d`（Figma color/orange/60）を採用（指示の `#c5a059` ではない）。サイト全体ゴールド統一値に合わせる方針があれば別途要確認だが、本セクション内は datapack 準拠で一致。
- スクリーンショット: `design-data/31/sections/03_MISSION/implemented.png`（フルページ・FV + Philosophy + Mission）。
