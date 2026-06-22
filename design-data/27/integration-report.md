# integration-report: ASTERRA サービス内容ページ (post_id 27 / /service/)

**完了日:** 2026/6/16
**URL:** http://localhost:8918/service/ / 編集: http://localhost:8918/wp-admin/post.php?post=27&action=edit&dev_login=1
**Figma:** node 1:3028「サービス内容（PC版）」

## 結果: 合格

- **isValid: 138/138**（ページ全体・全ブロック valid）
- **テキスト忠実性: PASS**（全6セクションの主要テキストを原文どおり確認）
- **セクション: 6/6 実装**（上から Hero / Introduction / Service(4カード2×2) / Value(3価値) / Flow(5ステップ) / CONTACT、全て `.sec-*` フッククラス付き）
- **視覚: デザイン忠実**（after-css-full.png）

## 実装方式
- ブロックツリーJSON → 実機Gutenberg serialize → $wpdb直接挿入。手書きマークアップなし
- レイアウト・寸法・テキスト・色はブロック属性（loos/full-wide + flavor/universal-block + コアブロック）。今回は属性化が進み、Flowバッジ影は shadow Extension `boxShadow:'m'`、Service番号/アイコンは position属性、Valueの縦区切りはUB幅1pxで表現
- 装飾（属性で不可）はページ限定 `swell-meta-css.css`（96行・全セレクタ `.sec-*` 配下）: Hero黒グラデ / Intro背景パネル(#f2f2f2 breakout)＋画像影 / CONTACTボタン影＋上端border / SERVICE・FLOW・CONTACT見出しのSWELL既定箱打ち消し
- アイコンは SVG（Value3点 ID53-55 / Flow6点 ID56-61）。取り込み用の一時SVGアップロード許可mu-pluginは撤去済（取込済SVGは静的配信され表示OK）

## ページ設定（page 27のみ）
- `swell_meta_show_sidebar=hide`（full-wide全幅化・ページ単位メタ）
- CONTACTセクションはトップ(7)の実装を再利用（tree/CSSとも）

## CTAリンク
- CONTACTボタン「無料相談はこちら →」→ /contact/。Hero/Service/Value/Flowに遷移ボタンは無し（デザイン通り）

## スコープ外・本番差し替え候補
- Header / Footer … 別途（SWELL設定）
- 画像（ChatGPT生成プレースホルダ）→ 本番写真
- **ブランドゴールドの不統一**: このサービスページ＝Figma実値 `#c8a97e`、トップページ＝ `#c5a059`。各ページのFigmaに忠実実装。本番でブランドカラー統一を検討
- SVGアイコンを今後メディアライブラリで管理するなら、Safe SVGプラグイン等で正式にSVG対応を入れる（現状はアップロード許可オフ）
