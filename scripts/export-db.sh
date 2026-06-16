#!/bin/bash
# DBダンプをエクスポート（stop時に自動実行）

DATA_DIR="data"
DUMP_FILE="$DATA_DIR/db.sql.gz"
HASH_FILE=".wp-env.db-hash"

mkdir -p "$DATA_DIR"

echo "DBをエクスポート中..."
npx wp-env run cli -- wp db export - 2>/dev/null | gzip > "$DUMP_FILE"

if [ -s "$DUMP_FILE" ]; then
  md5sum "$DUMP_FILE" | awk '{print $1}' > "$HASH_FILE"
  echo "エクスポート完了: $DUMP_FILE"
else
  echo "エラー: DBエクスポートに失敗しました"
  rm -f "$DUMP_FILE"
  exit 1
fi
