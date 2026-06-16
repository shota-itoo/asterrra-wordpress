#!/bin/bash
# DBダンプが外部（git pull等）で更新されたかチェックし、インポートを促す

DATA_DIR="data"
DUMP_FILE="$DATA_DIR/db.sql.gz"
HASH_FILE=".wp-env.db-hash"

if [ ! -f "$DUMP_FILE" ]; then
  exit 0
fi

# ハッシュファイルがない場合（初回 / destroy 後の再構築）
if [ ! -f "$HASH_FILE" ]; then
  if [ -t 0 ]; then
    # 対話モード：確認プロンプトを表示
    echo ""
    echo "=========================================="
    echo "  DBダンプが検出されました（初回起動）"
    echo "  インポートするには: npm run import"
    echo "=========================================="
    echo ""
    read -p "DBダンプをインポートしますか？ (y/N): " ANSWER
    if [ "$ANSWER" = "y" ] || [ "$ANSWER" = "Y" ]; then
      bash scripts/import-db.sh
    fi
  else
    # 非対話モード（afterStart / npm 経由）：ダンプがあるので自動インポート
    # destroy 後の再構築時に DB を自動復元する目的。
    # 新規プロジェクトはテンプレートに db.sql.gz が無いため、ここには到達しない（冒頭で exit 済み）。
    echo "DBダンプを検出（初回）。自動インポートします..."
    bash scripts/import-db.sh
  fi
  exit 0
fi

# ハッシュ比較
CURRENT_HASH=$(md5sum "$DUMP_FILE" | awk '{print $1}')
SAVED_HASH=$(cat "$HASH_FILE" 2>/dev/null)

if [ "$CURRENT_HASH" != "$SAVED_HASH" ]; then
  # タイムスタンプ確認（ダンプファイルがハッシュファイルより新しいか）
  if [ "$DUMP_FILE" -nt "$HASH_FILE" ]; then
    echo ""
    echo "=========================================="
    echo "  DBダンプが更新されています（git pull等）"
    echo "  インポートするには: npm run import"
    echo "=========================================="
    echo ""

    # 対話モードならプロンプト表示
    if [ -t 0 ]; then
      read -p "DBダンプをインポートしますか？ (y/N): " ANSWER
      if [ "$ANSWER" = "y" ] || [ "$ANSWER" = "Y" ]; then
        bash scripts/import-db.sh
      fi
    fi
  fi
fi
