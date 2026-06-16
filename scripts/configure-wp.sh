#!/bin/bash
# WordPress初期設定スクリプト（wp-env afterStartで自動実行・初回のみ）

FLAG_FILE=".wp-env.configured"
if [ -f "$FLAG_FILE" ]; then
  echo "WordPress初期設定は実行済みです。再実行するには $FLAG_FILE を削除してください。"
  # DBダンプが外部更新されていないかチェック
  bash scripts/check-db-update.sh
  exit 0
fi

# 日本語化
npx wp-env run cli -- wp language core install ja
npx wp-env run cli -- wp site switch-language ja

# タイムゾーン
npx wp-env run cli -- wp option update timezone_string Asia/Tokyo

# 日付形式・時刻形式
npx wp-env run cli -- wp option update date_format 'Y年n月j日'
npx wp-env run cli -- wp option update time_format 'g:i A'

# 検索エンジンにインデックスさせない
npx wp-env run cli -- wp option update blog_public 0

# パーマリンク構造を投稿名に
npx wp-env run cli -- wp rewrite structure '/%postname%/'
npx wp-env run cli -- wp rewrite flush --hard

# デフォルトコンテンツを日本語に差し替え
npx wp-env run cli -- wp post update 1 --post_title='はじめての投稿' --post_content='WordPress へようこそ。こちらは最初の投稿です。編集または削除し、コンテンツ作成を始めてください。'
npx wp-env run cli -- wp post update 2 --post_title='サンプルページ' --post_content='これはサンプルページです。投稿とは異なり、サイト内の決まった位置に表示されます。お問い合わせページや会社概要ページなどにご活用ください。'
npx wp-env run cli -- wp post update 3 --post_title='プライバシーポリシー' 2>/dev/null
npx wp-env run cli -- wp comment update 1 --comment_content='こちらはコメントです。コメントの承認、編集、削除は管理画面から行えます。' 2>/dev/null

# プラグインのインストール・有効化
npx wp-env run cli -- wp plugin install all-in-one-wp-migration --activate
npx wp-env run cli -- wp plugin install seo-simple-pack --activate
npx wp-env run cli -- wp plugin install siteguard --activate
npx wp-env run cli -- wp plugin install icon-block --activate
npx wp-env run cli -- wp plugin install wp-multibyte-patch --activate
npx wp-env run cli -- wp plugin install wp-mail-smtp --activate

# プラグインの日本語翻訳をインストール
npx wp-env run cli -- wp language plugin install --all ja

# SWELL子テーマの有効化（親テーマが配置済みの場合）
npx wp-env run cli -- wp theme activate swell_child 2>/dev/null || echo "※ SWELL親テーマが未配置のため、子テーマの有効化をスキップしました"

# SWELL: コアサイトマップ機能を有効化（デフォルトでは停止されている）
npx wp-env run cli -- wp eval '$o=get_option("swell_options");if(is_array($o)){$o["remove_sitemap"]="";update_option("swell_options",$o);echo "コアサイトマップを有効化しました";}' 2>/dev/null

touch "$FLAG_FILE"
echo "WordPress初期設定が完了しました。"

# 初回起動時もDBダンプがあればチェック
bash scripts/check-db-update.sh

# サムネイルを再生成（Git管理対象外のため）
echo "サムネイルを再生成中..."
npx wp-env run cli -- wp media regenerate --yes 2>/dev/null
echo "サムネイル再生成完了"
