# verify-report: 04 Future（フォルダ 05_FUTURE）

- ページID: 31 / セッション: about / コンテナ: `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート: 8918
- 挿入モード: **append**（既存4セクション=about/mission/philosophy/value の末尾に追加。section index4）
- root: `loos/full-wide` className:`sec-future` / bgColor `#0a192f` / contentSize:full / pcPadding,spPadding:0
- 検証日時: 2026-06-16

## 結果

**PASS（収束・修正ループ0回）**

シリアライズ → append挿入（$wpdb）→ isValid → 計測突合 → スクショ、すべて一発で合格。
全幅背景写真＋ネイビーオーバーレイ・テキスト・寸法・色・横罫の幾何一致を確認。

## isValid（ページ全体）

| 項目 | 値 |
|---|---|
| total blocks | 84 |
| allValid | **true** |
| invalid | なし（[]） |

挿入前 35,645 bytes → 挿入後 41,171 bytes。sec-future が最終セクションとして追加。

## 計測突合表（`.sec-future` / viewport 1440×900）

| 要素 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション幅 | 1440px（全幅フルブリード x=0） | w1440 / x0 | ✓ |
| セクション高 | min-height 660px | h660 | ✓ |
| 背景写真 | future-bg-cityscape.png（ID42）cover/center | wrapper `::before` に `url(.../future-bg-cityscape.png)` | ✓ |
| ネイビーオーバーレイ | `rgba(10,22,49,0.8)`（#0a1631 @80%） | wrapper `::after` bgc `rgba(10,22,49,0.8)` opacity1 | ✓ |
| ラッパー position | relative（拡張自動付与） | position:relative | ✓ |
| "04" ラベル | Serif 40px/40px/500 / #c5a86d | 40px/lh40/500 / rgb(197,168,109)=#c5a86d | ✓ |
| "FUTURE" ラベル | 13px/26px/500 / #c5a86d | 13px/lh26/500 / rgb(197,168,109)=#c5a86d | ✓ |
| H2 | 32px/48px/500 / #ffffff（白solid） | 32px / rgb(255,255,255) / x200(全幅左寄せ) | ✓ |
| 横罫(divider) | w40 × h1 / bg #c5a86d | w40 h1 / bgc rgb(197,168,109)=#c5a86d | ✓ |
| 本文1 | Sans 15px/30px/400 / rgba(255,255,255,0.85) | 15px/lh30/400 / rgba(255,255,255,0.85) | ✓ |
| 本文2 | 同上 | 15px/lh30/400 / rgba(255,255,255,0.85) | ✓ |
| 本文2テキスト | 「最良のサポート」（of→の 修正反映） | 「社員一丸となって最良のサポートを提供し続けて参ります。」 | ✓ |
| テキスト垂直中央 | 上下padding140px・justify:center | y3555〜（セク内中央配置） | ✓ |

### 計測上の注記（偽陰性の説明）

手順4のプローブ式 `hasBgOrImg` は `false` を返したが、これは**偽陰性**。プローブは universal-block の主 `background-image` プロパティのみを見るが、block-background-image 拡張は写真を `::before`、オーバーレイを `::after` の疑似要素で描画する設計のため、主プロパティは `none` になる。疑似要素を直接計測した結果（上表）と実機スクショ（implemented.png / future-section.png）で背景写真＋ネイビーオーバーレイの表示を確認済み。表示は正常。

## 修正履歴

なし（初回で全合格・tree.js 修正不要）。

## 残課題

- **CSS待ち（既知）: Jost** — "FUTURE" 欧文ラベルの Jost フォントはサイト未読込のため Noto Sans JP にフォールバック表示。datapack §7-2・本検証方針どおり不一致判定にはしない（後段ページCSSでのフォント追加で対応）。
- uppercase は表示文字列 "FUTURE" 直接記述で再現済み（text-transform 属性不使用）。

## 成果物

- `/home/ubuntu/git/creap-tail/ai-secretary/wordpress/asterrra-wordpress/design-data/31/sections/05_FUTURE/implemented.png`（フルページ）
