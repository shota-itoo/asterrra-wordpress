# integration-report: ASTERRA 私たちについて（About us）ページ (post_id 31)

**完了日:** 2026/6/16
**URL:** http://localhost:8918/about/ / 編集: http://localhost:8918/wp-admin/post.php?post=31&action=edit&dev_login=1
**Figma:** node 1:2026「About us (PC版)」

## 結果: 合格

- **isValid: 105/105**（ページ全体・全ブロック valid）
- **テキスト忠実性: PASS**（全7セクションの主要テキストを確認）
- **セクション: 7/7 実装**（上から FV / 01 Philosophy / 02 Mission / 03 Value / 04 Future / 代表メッセージ / CONTACT、全て `.sec-*` フッククラス付き）
- **視覚: デザイン忠実**（after-css-full.png）

## 実装方式
- ブロックツリーJSON → 実機Gutenberg serialize → $wpdb直接挿入
- 装飾の大半（写真の重なり/食い出し・drop-shadow・背景写真＋オーバーレイ）は flavor 拡張のブロック属性（position/shadow/backgroundImage）で表現
- 属性で不可な分のみページ限定 swell-meta-css（139行・全て `.sec-*` 配下）: FV背景グラデ＋text-shadow＋ロゴ白化/絶対配置 / Value overflow保険 / Message背面透かし文字「MESSAGE」(::before)＋写真ブリード / CONTACTボタン影＋上端border / Jostフォント(@import・欧文ラベル)

## ページ設定（このページ単位）
- 新規固定ページ「私たちについて」slug=about / post_id 31
- post meta `swell_meta_show_sidebar=hide`（full-wide全幅化）
- ※グローバル設定（Google Fonts enqueue・SWELL既定MV/スライダーoff・permalink）はトップ実装時に適用済みのため再実施なし

## リンク
- FV「会社概要を見る」→ /company/、CONTACT「無料相談はこちら」→ /contact/

## ユーザー判断・申し送り
- **Future本文の誤字修正**: Figma原文「最良 of サポート」→「最良のサポート」に修正（ユーザー承認済）
- **配色**: このページのFigma実ゴールドは #c5a86d（トップページは #c5a059）。各ページFigma実値を採用。ブランド統一したい場合はFigma側で揃えるのが望ましい
- **代表者名「時田 和輝」**: デザインのダミーの公算大。トップCOMPANY「田中太郎」・会社概要ページ「時田和輝」と不整合 → 本番で会社情報の実データ統一が必要
- **本番差し替え候補**: プレースホルダ画像（営業/建物/家族/オフィス/仲間 等）
