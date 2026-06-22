# integration-report: ASTERRA 会社概要ページ (post_id 26)

**完了日:** 2026/6/16
**URL:** http://localhost:8918/company/ / 編集: http://localhost:8918/wp-admin/post.php?post=26&action=edit&dev_login=1
**Figma:** node 1:3600「会社概要（PC版）」

## 結果: 合格

- **isValid: 86/86**（ページ全体・全ブロック valid）
- **テキスト忠実性: PASS**（商号〜FAXの全行、会社名の括弧・全角スペース・登録番号T9013301054955・免許番号第113835号・団体名まで原文どおり）
- **セクション: HERO / Breadcrumb / PROFILE(会社概要テーブル) / CONTACT**（CONTACTはトップの06_CONTACTツリーを再利用）
- **視覚: デザイン忠実**（after-css-full.png）

## 実装方式
- ブロックツリーJSON → 実機serialize → $wpdb挿入。レイアウト・寸法・テキスト・色はブロック属性で表現
- テーブルは flavor/universal-block の row（ラベルセル#131C30/値セル白）。セル下罫線・セル同高(stretch)はブロック属性で実現（CSS不要）
- 装飾CSS（属性不可分のみ）はページ限定 swell-meta-css.css（90行・全て .sec-* 配下）: HERO横グラデオーバーレイ / PROFILE箇条書きマーカー色#C8A97E＋テーブル影 / CONTACTボタン影＋上端border＋見出しSWELL既定打ち消し

## ページ設定（ページ単位）
- swell_meta_show_sidebar=hide（full-wide全幅化）
- ※グローバル設定（Googleフォント・MV/スライダーOFF・permalink）はトップページ実装時に適用済みで流用

## リンク
- パンくず HOME → / 、CONTACTボタン → /contact/

## スコープ外・本番差し替え候補
- Header / Footer … SWELL設定で別途
- プレースホルダ: 所在地〒000-0000、FAX=TEL同番号（03 6912 0000）→ 本番情報差し替え
- 注: 代表者は本ページ「時田和輝」。トップCOMPANY節のダミー「田中太郎」と不一致 → 本番では実データに統一が必要
