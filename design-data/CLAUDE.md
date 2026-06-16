# design-data — ページデザイン成果物フォルダ

## WHAT

デザインHTML→WordPressブロックマークアップ変換の成果物を格納するフォルダ。
`.wp-env.json` でコンテナにマウントされ、ホスト⇔コンテナ間でファイルを共有する。

```
design-data/
  scripts/              ← 汎用ヘルパースクリプト
    pull-content.php    ← DB → design-data（既存ページ修正前の同期）
    insert-content.php  ← design-data → DB（本文挿入）
    set-meta-css.php
    set-meta-js.php
  {post_id}/            ← ページIDごとの成果物
    page-content.html   ← Gutenbergブロックマークアップ
    swell-meta-css.css  ← ページ固有カスタムCSS
    swell-meta-js.js    ← ページ固有カスタムJS（必要時のみ）
```

## WHY

- `/tmp/` ではなくプロジェクト内に成果物を永続化し、修正・再利用を容易にする
- マウントにより `docker cp` なしでコンテナ内のwp-cliからファイルを直接参照できる
- ページIDで分離することで複数ページの成果物が共存する

## HOW

### コンテナ内パス

`/var/www/html/wp-content/design-data/`

### コンテンツ挿入

```bash
docker exec -e WP_POST_ID={post_id} {container} \
  wp eval-file /var/www/html/wp-content/design-data/scripts/insert-content.php --allow-root
```

### カスタムCSS設定

```bash
docker exec -e WP_POST_ID={post_id} {container} \
  wp eval-file /var/www/html/wp-content/design-data/scripts/set-meta-css.php --allow-root
```

### カスタムJS設定（swell-meta-js.js がある場合のみ）

```bash
docker exec -e WP_POST_ID={post_id} {container} \
  wp eval-file /var/www/html/wp-content/design-data/scripts/set-meta-js.php --allow-root
```

### 既存ページ修正の前に: DB → design-data を同期（pull）

**IMPORTANT: 既存ページを修正するときは、編集前に必ず pull して design-data を DB の最新状態にすること。** 本番反映やバージョン差で DB が「正」になっているため、古いローカルから編集すると変更を破壊する。

```bash
docker exec -e WP_POST_ID={post_id} {container} \
  wp eval-file /var/www/html/wp-content/design-data/scripts/pull-content.php --allow-root
```

pull → 編集 → insert-content.php / set-meta-*.php で push、の順を守る。

### 成果物の生成・編集ルール

- **IMPORTANT:** `page-content.html` と `swell-meta-css.css` は必ず `{post_id}/` 配下に置くこと
- 成果物はホスト側で生成・編集し、上記コマンドでDBに反映する
- 同じコマンドを再実行するだけで再挿入できる
