# WordPress開発環境テンプレート

## WHY — なぜこのテンプレートがあるのか

クライアント案件ごとに統一された構成のWordPress（SWELL子テーマ）ローカル開発環境を素早く立ち上げるため。
wp-env + SWELL子テーマ + 独自Block Extensions（flavor_）を標準装備し、案件間で品質と開発体験を統一する。

## WHAT — 何が入っているか

```
├── themes/swell/              ← SWELL親テーマ（有料・Git管理外 .gitkeep のみ）
├── themes/swell_child/        ← カスタマイズ対象（Git管理）
│   ├── style.css
│   ├── functions.php
│   ├── inc/blocks/            ← カスタムブロック（universal-block等）
│   ├── inc/extensions/        ← Block Extensions（サイズ・余白・影・角丸等）
│   │   └── index.php          ← オーケストレーター（BLOCK_CONFIG で対象ブロック×セクション管理）
│   ├── inc/block-custom-common.php  ← 共通PHPユーティリティ
│   └── assets/js/             ← エディタ用JS（IIFE・ビルド不要）
│       ├── editor/extensions/ ← 各Extension のエディタUI
│       └── frontend/          ← フロントエンド用JS
├── mu-plugins/                ← dev-auto-login.php（ローカル専用）
├── scripts/                   ← configure-wp.sh / export-db.sh / import-db.sh / check-db-update.sh
├── data/                      ← DBダンプ（db.sql.gz）
├── uploads/                   ← メディアファイル（サムネイルはGit管理外）
├── .wp-env.json               ← wp-env設定（ポート・PHP版・マッピング）
└── package.json               ← npm start/stop/destroy/import
```

### Block Extensions アーキテクチャ

`inc/extensions/index.php` が全体を統括する。`flavor_block_extensions_config()` で対象ブロック（core/image, core/paragraph, core/heading, core/cover, outermost/icon-block, flavor/universal-block, loos/full-wide）ごとに有効なセクション（size, flex, spacing, shadow, borderRadius, border, opacity, position, backdropFilter）を宣言。

- PHP: `register_block_type_args` で属性を一括登録 → `render_block` でCSS生成・`<style>`注入
- JS: IIFE形式（no JSX / no build step）。`wp_localize_script` で config を JS に渡す
- プレフィックス: ブロックごとに属性名プレフィックス（img, para, heading等）を付与し衝突を回避
- レスポンシブ: PC / Tablet(959px) / Mobile(599px) の3段階

### npmスクリプト

| コマンド | 動作 |
|----------|------|
| `npm start` | wp-env起動 → `configure-wp.sh`（初回のみ：日本語化・プラグイン・テーマ有効化） |
| `npm stop` | DB自動エクスポート → wp-env停止 |
| `npm run destroy` | 環境完全削除 |
| `npm run import` | DBダンプをインポート |

## HOW — どう使うか

### 環境構築

1. このテンプレートを案件用リポジトリにコピー/クローン
2. SWELL親テーマを `themes/swell/` に配置
3. `.wp-env.json` の `port` を他案件と被らないよう変更（2刻み推奨: 8888, 8890, 8892...）
4. `npm install` → `npm start`

### 開発時のルール

- カスタマイズは `themes/swell_child/` 配下で行う
- 新しいカスタムブロックは `inc/blocks/` に PHP、`assets/js/editor/blocks/` に JS を配置し `functions.php` で読み込む
- 新しい Extension セクションは `inc/extensions/` に PHP+JS を追加し `index.php` の config に登録
- コンテンツ挿入は wp-cli（`npx wp-env run cli -- wp post update <ID> --user=1`）を使用
- `?dev_login=1` で管理画面に自動ログイン（ローカル環境のみ有効）
- `dev-auto-login.php` は本番環境で自動削除される（functions.php のセキュリティ防御）

### DB管理

- `npm stop` で自動エクスポート（`data/db.sql.gz`）
- `npm run import` でインポート（サムネイル再生成含む）
- `git pull` 後の起動時にDBダンプ更新を自動検知・インポート提案
