# wordpress_template

SWELL子テーマのローカルWordPress開発環境テンプレート。

## 必要なもの

- Docker Desktop
- Node.js 18以上

## セットアップ

```bash
npm install
```

### SWELL親テーマの配置

SWELL親テーマ（有料）は別途入手し、ZIPを展開して `themes/swell/` に配置してください。

```
themes/
├── swell/          ← 親テーマをここに配置
└── swell_child/    ← カスタマイズ対象（Git管理）
```

### 起動

```bash
npm start
```

http://localhost:8888 でWordPressにアクセスできます。

- 管理画面: http://localhost:8888/wp-admin/
- ユーザー名: `admin` / パスワード: `password`

### 停止・削除

```bash
npm stop       # 停止
npm run destroy  # 環境削除
```

## 子テーマのカスタマイズ

`themes/swell_child/` 配下のファイルを編集してカスタマイズします。

- `style.css` - スタイルの追加・上書き
- `functions.php` - 機能の追加
