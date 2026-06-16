#!/usr/bin/env node
/**
 * prestart チェック: wp-env と 実環境のWordPressバージョン整合性を検証
 *
 * - .wp-env.json の "core" 設定値
 * - 既存wp-env環境のWordPressバージョン（version.php）
 * を比較し、差異があればエラーを出して停止する。
 *
 * 環境変数:
 *   ALLOW_VERSION_DIFF=1  → チェックをスキップ（意図的にバージョン変更する場合）
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ENV_FILE = path.resolve('.wp-env.json');

// ============================================================
// 1. .wp-env.json から core 設定を取得
// ============================================================
function getConfiguredVersion() {
  try {
    const config = JSON.parse(fs.readFileSync(ENV_FILE, 'utf-8'));
    if (!config.core) return null;
    // "WordPress/WordPress#6.9.4" → "6.9.4"
    const m = config.core.match(/#(.+)$/);
    return m ? m[1] : null;
  } catch (e) {
    return null;
  }
}

// ============================================================
// 2. 実環境のWordPressバージョンを取得
//    動作中のDockerコンテナ → そのbind-mount元 → version.php を読む
//
//    注意: docker ps には他案件の wp-env コンテナも含まれるため、
//    bind-mount の Source パスが現在の cwd 配下にあるコンテナだけを
//    「自プロジェクトのコンテナ」とみなしてフィルタリングする。
//    （wp-env は uploads / mu-plugins 等を案件ディレクトリから bind-mount する）
// ============================================================
function getInstalledVersion() {
  try {
    const cwd = path.resolve(process.cwd());

    // wp-env が起動しているコンテナを取得
    const containerNames = execSync(
      'docker ps --format "{{.Names}}"',
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
    ).trim().split('\n').filter(n => n.includes('wordpress'));

    for (const name of containerNames) {
      // bind-mountの一覧を取得
      const mounts = execSync(
        `docker inspect ${name} --format '{{range .Mounts}}{{.Source}}|{{.Destination}}{{"\\n"}}{{end}}'`,
        { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
      );
      const mountLines = mounts.split('\n').filter(Boolean);

      // 自プロジェクトのコンテナか判定: Source が cwd 配下にある bind-mount があるか
      const belongsToCwd = mountLines.some(line => {
        const src = line.split('|')[0];
        if (!src) return false;
        const resolved = path.resolve(src);
        return resolved === cwd || resolved.startsWith(cwd + path.sep);
      });
      if (!belongsToCwd) continue;

      // /var/www/html の bind-mount を探す
      const match = mountLines.find(l => l.endsWith('|/var/www/html'));
      if (!match) continue;

      const hostPath = match.split('|')[0];
      const versionFile = path.join(hostPath, 'wp-includes/version.php');
      if (!fs.existsSync(versionFile)) continue;

      const content = fs.readFileSync(versionFile, 'utf-8');
      const m = content.match(/\$wp_version\s*=\s*['"]([^'"]+)['"]/);
      if (m) return m[1];
    }
  } catch (e) {
    // Docker未起動 / コンテナなし: 初回起動と判断
  }
  return null;
}

// ============================================================
// 3. 比較
//    "7.0" と "7.0.0" など末尾の .0 違いだけのケースは同一バージョンとみなす
//    （WordPress のメジャー版は version.php 上 "7.0" 表記、wp-env の core 指定は
//     "7.0.0" と書かれることもある）
// ============================================================
function normalizeVersion(v) {
  if (!v) return v;
  // 末尾の .0 を繰り返し除去（"7.0.0" → "7.0" / "7.0" → "7"）
  return String(v).replace(/(\.0+)+$/, '');
}

const configured = getConfiguredVersion();
const installed = getInstalledVersion();

// ALLOW_VERSION_DIFF=1 でスキップ
if (process.env.ALLOW_VERSION_DIFF) {
  console.log('⏩ ALLOW_VERSION_DIFF=1 が指定されたため、バージョン比較をスキップします');
  process.exit(0);
}

// core 未指定 → 警告のみ
if (!configured) {
  console.warn('━'.repeat(50));
  console.warn('⚠️  .wp-env.json に "core" が指定されていません');
  console.warn('   最新の WordPress バージョンが自動取得され、毎回更新が走ります。');
  console.warn('   意図しないバージョンアップを防ぐため、バージョン固定を推奨します。');
  console.warn('');
  console.warn(`   例: "core": "WordPress/WordPress#6.9.4"`);
  console.warn('━'.repeat(50));
  // ここでは exit せず通常起動を許可（警告のみ）
  process.exit(0);
}

// 初回起動（実環境なし） → そのまま通す
if (!installed) {
  console.log(`✓ 初回起動: .wp-env.json の core (${configured}) を使用します`);
  process.exit(0);
}

// バージョン一致（厳密一致 or 正規化後の一致）→ そのまま通す
if (configured === installed) {
  console.log(`✓ WordPressバージョン整合性OK (${configured})`);
  process.exit(0);
}
if (normalizeVersion(configured) === normalizeVersion(installed)) {
  console.log(`✓ WordPressバージョン整合性OK (.wp-env.json: ${configured} / 実環境: ${installed} — 同一メジャー版として扱います)`);
  process.exit(0);
}

// 不整合 → エラーで停止
console.error('━'.repeat(50));
console.error('⚠️  WordPress バージョンの不整合を検知しました');
console.error('');
console.error(`  .wp-env.json (設定): ${configured}`);
console.error(`  実際のWP環境:        ${installed}`);
console.error('');
console.error('対処方法:');
console.error('');
console.error(`  A) 現在のWP環境 (${installed}) を正とする場合 ★推奨`);
console.error(`     .wp-env.json の "core" を更新してください:`);
console.error(`       "core": "WordPress/WordPress#${installed}"`);
console.error('');
console.error(`  B) .wp-env.json のバージョン (${configured}) へ意図的に変更する場合`);
console.error('     現在のWP環境のファイル変更は破棄されます。');
console.error('     ALLOW_VERSION_DIFF=1 npm run start');
console.error('');
console.error('  C) 初期状態からやり直す場合');
console.error('     npm run destroy && npm run start');
console.error('     ※ DBは削除されるため、必要に応じて npm run import で復元');
console.error('━'.repeat(50));
process.exit(1);
