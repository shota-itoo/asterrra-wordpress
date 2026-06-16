#!/bin/bash
# DBダンプをインポート

DATA_DIR="data"
DUMP_FILE="$DATA_DIR/db.sql.gz"
HASH_FILE=".wp-env.db-hash"

if [ ! -f "$DUMP_FILE" ]; then
  echo "DBダンプが見つかりません。スキップします。"
  exit 0
fi

echo "DBをインポート中..."
gunzip -c "$DUMP_FILE" | npx wp-env run cli -- wp db import - 2>/dev/null

if [ $? -eq 0 ]; then
  md5sum "$DUMP_FILE" | awk '{print $1}' > "$HASH_FILE"
  echo "インポート完了"
  # サムネイルを再生成（Git管理対象外のため）
  echo "サムネイルを再生成中..."
  npx wp-env run cli -- wp media regenerate --yes 2>/dev/null
  echo "サムネイル再生成完了"
else
  echo "エラー: DBインポートに失敗しました"
  exit 1
fi
