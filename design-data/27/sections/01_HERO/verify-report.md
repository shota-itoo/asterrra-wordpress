# verify-report: Hero（サービス内容ページ / page_id 27）

## 結果

**PASS（収束ラウンド 0 / 修正なし）**

tree.js を実機シリアライズ → ページ27に new モードで挿入 → isValid 機械チェック合格 → `.sec-hero` のフロント計測値を datapack 設計値（1440px基準）と突合し、レイアウト・テキスト・寸法・色（単色）・背景写真表示のすべてが幾何一致。tree.js への修正は不要だった。

- 環境: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート 8918 / ページID 27 / セッション `asterrra-srv`
- 挿入: `$wpdb->update()`（insert-content.php、page-type ガード通過）、3613 bytes
- post_content 変更はページID 27 のみ。テキスト変更なし。ページメタ `swell_meta_show_sidebar=hide` は不変更。

## isValid

`wp.data.select('core/block-editor').getBlocks()` 全走査:

```
{"total":8, "allValid":true, "invalid":[]}
```

8ブロック（loos/full-wide ×1 + flavor/universal-block ×4 + core/paragraph ×2 + core/heading ×1）すべて valid。バリデーションエラーなし。

## 計測突合表（viewport 1440×900 / `.sec-hero`）

| 要素 | プロパティ | 期待値（datapack） | 計測値 | 判定 |
|---|---|---|---|---|
| セクション | x / w / h | 0 / 1440 / 650 | 0 / 1440 / 650 | ✓ |
| セクション | 背景フォールバック地 | #131c30 | rgb(19,28,48) | ✓ |
| ヒーローラッパー | min-height / padding-left | 650 / 144 | 650px / 144px | ✓ |
| ヒーローラッパー | position | relative | relative | ✓ |
| 背景写真（`::before`） | background-image | hero27-bg-apartment.png | url(.../hero27-bg-apartment.png) | ✓ |
| 背景写真（`::before`） | size / position / cover | cover / center / 1440×650 / z-index:0 | cover / 1440×650 / z-index:0 | ✓ |
| SERVICEラベル | x / fs / lh / ls / fw | 144 / 24 / 32 / 4.8px / 400 | 144 / 24px / 32px / 4.8px / 400 | ✓ |
| SERVICEラベル | color / font / text | #c8a97e / Noto Serif JP / SERVICE | rgb(200,169,126) / "Noto Serif JP" / SERVICE | ✓ |
| H1見出し | x / h / fs / lh / ls / fw | 144 / 120 / 48 / 60 / 4.8px / 400 | 144 / 120 / 48px / 60px / 4.8px / 400 | ✓ |
| H1見出し | color / font | #ffffff / Noto Serif JP | rgb(255,255,255) / "Noto Serif JP" | ✓ |
| H1見出し | 2行（`<br>`） | br×1（2行） | br×1 / text=「お客様の未来に寄り添う、不動産サービスを。」 | ✓ |
| サブテキスト | x / h / fs / lh / ls / fw | 144 / 72 / 16 / 24 / 0.4px / 300 | 144 / 72 / 16px / 24px / 0.4px / 300 | ✓ |
| サブテキスト | color / font | rgba(255,255,255,0.9) / Noto Sans JP | rgba(255,255,255,0.9) / "Noto Sans JP" | ✓ |
| サブテキスト | 3行（`<br>`×2） | br×2（3行） | br×2 | ✓ |
| コンテンツ群 | max-width | 1152 | 1152 | ✓ |
| 段落数 | p 要素数 | 2 | 2 | ✓ |
| 間隔 | SERVICE→H1 | 24px | 24px（label下端551→H1上端575） | ✓ |
| 間隔 | H1→サブ | 32px | 32px（H1下端695→サブ上端727） | ✓ |
| 縦配置 | 垂直中央寄せ | SERVICE上端 ≈ 185px（section内） | grpTop 519 − secTop 334 = 185 | ✓ |

### 計測上の注意（偽陰性回避メモ）
- `getComputedStyle(wrapper).backgroundImage` は `none` を返すが、これは**偽陰性**。背景画像拡張（`inc/extensions/block-background-image.php`）は要素自身の `background-image` ではなく `{selector}::before` 疑似要素で背景を描画する設計。`getComputedStyle(wrapper,'::before').backgroundImage` で url を確認済み（cover / フルカバー / z-index:0）。画像URLは HTTP 200・3,075,968 bytes で到達可能。背景写真は正しく表示されている。
- 間隔は各テキストの「親 universal-block の padding-bottom」（label親=24px / H1親=32px）として実装。element-to-element の bounding rect 差分で 24 / 32px を実測確認。

## 修正履歴

なし（ラウンド0で収束）。シリアライズ→挿入→isValid→計測突合をすべて1巡で通過。tree.js への変更は発生していない。

## 残課題

- **CSS待ち（既知）: Hero グラデオーバーレイ** — 左→右の純黒グラデーション `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)`。backgroundImage拡張のOverlayは単色のみ（`::after` 単色背景）でグラデ非対応のため、ブロック属性では表現不可。ページ限定CSS（swell-meta-css / `.sec-hero` の `::before`・`::after` 等）での実装が必要。`positionType:'relative'` は付与済みで基準は整っている。本検証ではグラデの有無で不一致判定していない（前提どおり）。実機スクショ（implemented.png）では、このオーバーレイ未適用のため左側テキストが明るい空背景に対しコントラスト弱め＝グラデCSS適用で解消予定。
- その他（背景写真の object-position 微調整・出現アニメーション・パララックスの有無）は datapack §6 で「要ユーザー確認」。本検証スコープ外。
