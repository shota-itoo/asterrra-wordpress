# integration-report: ASTERRA お問い合わせページ (post_id 29)

**完了日:** 2026/6/16
**URL:** http://localhost:8918/contact/ （編集: post.php?post=29&action=edit&dev_login=1）

## 結果: 合格

- **isValid: 48/48**（ページ全体・全ブロック valid）
- **テキスト忠実性: PASS**（Hero/リード/フォーム7項目ラベル/連絡先カード/CONTACT帯すべて原文どおり）
- **フォーム: 実描画・実送信可能**（`<form>` ＋ input/select/textarea 11要素）
- **セクション: 3/3**（Hero[sec-hero]＋パンくず[sec-breadcrumb] / Formセクション[sec-form] / CONTACT帯[sec-contactband]）。Header/Footerはスコープ外（別途SWELL設定）

## 実装方式
- ブロックツリーJSON → 実機Gutenberg serialize → $wpdb挿入
- **フォーム**: Snow Monkey Forms で機能するフォームを構築（フォームCPT post_id **63**）。ページには埋め込みブロック `<!-- wp:snow-monkey-forms/snow-monkey-form {"formId":63} /-->` を左カードに配置
  - フィールド: お名前/フリガナ/メールアドレス/電話番号/お問い合わせ種別(select)/お問い合わせ内容(textarea)/プライバシー同意(checkbox)/送信。全て必須
- 装飾＋フォーム整形はページ29限定CSS `swell-meta-css.css`（224行・全セレクタ `.sec-*` 配下限定）: Hero背景グラデ / 左右カード影 / SMFフォーム内部（ラベル横配置192px・ゴールド必須バッジ・入力枠・ゴールド送信ボタン[SMF既定グラデ白被りを background-image:none で解消]）/ CONTACT帯ボタン影・上端border。`:has()` で必須バッジを生成
- ページ29メタ `swell_meta_show_sidebar=hide`（full-wide全幅化）

## 流用
- CONTACT帯は トップページ(post 7)の CONTACT セクション tree を流用（クラスのみ sec-contactband に変更）

## 要ユーザー確認・本番差し替え（重要）
- **メール通知の宛先**: 現在サイトの admin_email が初期値 `wordpress@example.com` のまま → 実アドレスへ要設定（wp-mail-smtp 導入済み）
- **自動返信メールの件名・本文**: SMF既定のまま → 要設定
- **お問い合わせ種別の選択肢**: 事業内容から仮設定（不動産売買/賃貸・管理/不動産コンサル/リフォーム・リノベ/その他）→ 要確認
- **連絡先カードの会社情報がダミー値**（電話 03 6912 0000・〒000-0000 東京都豊島区東池袋0-0-0 等）→ 本番情報へ差し替え。tel:リンク化の要否も
- Header / Footer は別途
