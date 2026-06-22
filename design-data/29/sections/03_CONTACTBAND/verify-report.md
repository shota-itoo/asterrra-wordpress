# verify-report: CONTACT band

- 対象: お問い合わせページ（ページID 29）最終セクション `.sec-contactband`（トップページCONTACT流用 / 中央寄せ・ネイビー帯）
- 環境: コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート 8918 / セッション asterrra-c / デザイン幅 1440
- 挿入モード: append（既存 Hero / Form の下に追加・既存ブロック非改変）
- 検証日: 2026-06-16

## 結果

**合格（PASS）**。修正ループ 0 回で収束。シリアライズ → append 挿入 → isValid → 計測突合 → スクショ まで一発で一致。

## isValid

- ページ全体ブロック数: **48** / `allValid: **true**` / `invalid: []`
- 既存 Hero / Form ブロックを含む全ブロックがバリデーション通過。
- 挿入後の post_content 20425 bytes（挿入前 16418 → 新セクション +約4007）。
- full-wide ブロック数 open=4 / close=4 で開閉整合（既存3＋新規1）。

## 計測突合表（front-end `/contact/?dev_login=1` @1440×900）

| 項目 | 期待（設計意図） | 実測 | 判定 |
|---|---|---|---|
| セクション背景 | ネイビー #1e2c5b | rgb(30,44,91)=#1e2c5b | ✓ |
| セクション幅 | フル幅 1440 | x=0 w=1440 h=556 | ✓ |
| 内側コンテナ最大幅 | 896 中央寄せ | maxWidth=896px w=896 x=272（=(1440-896)/2） | ✓ |
| 内側 align/justify | center / center | align-items:center, justify-content:center | ✓ |
| 内側 padding 上下 | 128px / 128px | padT=128px padB=128px | ✓ |
| 見出し CONTACT | Noto Serif JP 600 36px ゴールド #c5a059・中央 | ff="Noto Serif JP" fw600 36px color=rgb(197,160,89)=#c5a059, 中心720=viewport中央 | ✓ |
| 小見出し お問い合わせ | Noto Sans JP 12px 白・中央 | ff=Noto Sans JP 12px color=rgb(255,255,255), 中心≈720 | ✓ |
| 横罫 | 40×2px 薄ゴールド #c8a97e・中央 | w=40 h=2 bg=rgb(200,169,126)=#c8a97e, x=700→中心720 | ✓ |
| 本文 | Noto Sans JP 16px グレー #d1d5db・中央 | ff=Noto Sans JP 16px color=rgb(209,213,219)=#d1d5db, 中心720 | ✓ |
| CTAボタン 数 | 1 | btnCount=1 | ✓ |
| CTAボタン 配色 | 背景ゴールド #c5a059・白文字 | bg=rgb(197,160,89)=#c5a059 color=rgb(255,255,255) | ✓ |
| CTAボタン 角丸 | 0 | border-radius=0px | ✓ |
| CTAボタン リンク先 | /contact/ | href=/contact/ | ✓ |
| CTAボタン 文言 | 無料相談はこちら　→ | 「無料相談はこちら　→」 | ✓ |
| CTAボタン 中央寄せ | 中央 | x=579 w=282→中心720, text-align:center | ✓ |

全要素が viewport 中心線 720px に揃っており、中央寄せレイアウト・テキスト・色・寸法すべて幾何一致。

補足: ラッパー div の `text-align` は `start` を返すが、中央寄せは内側コンテナの flex `align-items:center` で成立。各テキスト要素は `has-text-align-center` / button は `text-align:center` で個別に中央化されており実描画は中央。スクショでも中央寄せを確認。

## 修正履歴

なし（1回目で isValid:true かつ計測全一致のため修正ループ未発生 / 最大3回中0回）。

## 残課題

- **CSS待ち（既知）**: 以下2点はブロック属性で表現不可のため後段ページCSS適用予定（検証スコープ外）。
  - CTAボタンの box-shadow（drop-shadow）— core/button 属性に影なし。
  - セクション上端 border — full-wide 属性で上端罫線を表現不可。
- 上記は中央寄せ・テキスト・色・寸法の幾何一致には影響なし。
