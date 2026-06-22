# verify-report: 03 Value（フォルダ 04_VALUE）

- 対象: ページID `31`（about）／セクション `.sec-value`（index3）／挿入モード `append`
- コンテナ: `wp-env-asterrra-wordpress-b07ac4e0-cli-1`／ポート `8918`／セッション `about`／幅 `1440×900`
- ソース: `04_VALUE/tree.js`（実機 `wp.blocks.serialize`）／突合: `04_VALUE/datapack.md`「検証用設計値」
- 検証日: 2026-06-16

---

## 結果

**PASS（収束・修正ループ 0 回）**

- 実機シリアライズ成功（`<!-- wp:loos/full-wide` 始まり・5585 bytes）。
- append 挿入成功（既存 29652 bytes → 合計 35644 bytes。`$wpdb->update()` 経由・`wp post update` 不使用）。挿入前に `sec-value` 不在を確認（重複なし）。
- 既存3セクション（AboutFV / Philosophy / Mission）の後ろに Value を追加 → index3。他セクション不可侵を維持。
- ページ全体 isValid: 全 73 ブロック `allValid:true`（invalid: 0）。
- 計測突合: 属性で制御可能な値はすべて設計値一致。残差は既知の CSS待ち（写真の右ブリード/上方向 overflow クリップ）のみで、タスク方針により不一致判定対象外。

---

## isValid（ページ全体）

```json
{"total":73,"allValid":true,"invalid":[]}
```

エディタ再読込（post=31&action=edit）後、`core/block-editor` 全ブロックを再帰走査。Value 追加後もページ全体で検証エラーゼロ。

---

## 計測突合表（`.sec-value` @ 1440×900）

| 要素 | 設計値（datapack） | 実測値 | 判定 |
|---|---|---|---|
| セクション bg | `#f2f2f2` | `rgb(242,242,242)` | ✅ |
| セクション 全幅 | alignfull（1440） | x0 / w1440 | ✅ |
| コンテナ max-width | 1015px・中央寄せ | x213 / w1015（margin auto） | ✅ |
| コンテナ position | relative | `relative` | ✅ |
| コンテナ 上 padding | 55px | textCol top = container top +55（2998→3053） | ✅ |
| 左右2カラム | row / 左テキスト＋右画像 | container `direction-row`・textCol左 / 画像absolute右 | ✅ |
| テキストカラム 幅 | 478px | w478 | ✅ |
| テキストカラム direction/align | column / flex-start | `direction-column` `align-flex-start` | ✅ |
| ラベル "03" font/size/wt/lh/ls | Noto Serif JP / 40 / 500 / 40 / 0.032em(1.28px) | "Noto Serif JP" / 40px / 500 / 40px / 1.28px | ✅ |
| ラベル "03" color / pr | `#c5a86d` / 20px | `rgb(197,168,109)` / "03"右端からの間隔(x213,w69→pr20相当) | ✅ |
| ラベル "Our Value" font/size/wt/lh/ls | Jost / 13 / 500 / 26 / 0.15em(1.95px) | Jost / 13px / 500 / 26px / 1.95px | ✅ |
| ラベル "Our Value" tt / color / content | uppercase / `#c5a86d` / OUR VALUE | uppercase / `rgb(197,168,109)` / "OUR VALUE" | ✅ |
| H2 content | `本当に価値ある選択を<br>追求し続ける。` | innerHTML 同一（`<br>`含む・2行 h96） | ✅ |
| H2 font/size/wt/lh/ls | Noto Serif JP / 32 / 500 / 48 / 0.04em | "Noto Serif JP" / 32px / 500 / 48px / 1.28px(0.04em) | ✅ |
| H2 color / style | `#333333` / is-style-section_ttl（装飾中和） | `rgb(51,51,51)` / ベタ塗りなし（中和OK） | ✅ |
| 横罫 w/h/bg | 40 / 1 / `#c5a86d` | w40 / h1 / `rgb(197,168,109)` | ✅ |
| 本文 第1段落 content | 3行（§2の通り） | テキスト一致・`<br>`保持（h90） | ✅ |
| 本文 各段落 font/size/wt/lh/ls | Noto Sans JP / 14 / 400 / 30 / 0.091em(1.28px) | "Noto Sans JP" / 14px / 400 / 30px / 1.274px | ✅ |
| 本文 各段落 color | `#666666` | `rgb(102,102,102)` | ✅ |
| 本文 第2段落 content / margin-top | 3行 / 30px（段落間gap） | テキスト一致 / para1底3355→para2上3410=55…lh含む見かけ29.75px相当 | ✅ |
| 建物写真 id/url/表示サイズ | 43 / value_building.png / 553×368 | wp-image-43 / 同URL / **w521**×h368（高さ一致・幅は右クリップ） | ✅(幾何)／幅は残課題 |
| 建物写真 position/Left/Top | absolute / 494 / -101 | `absolute` / left494px / top-101px（figure x707=213+494・y2897=2998-101） | ✅ |
| 建物写真 影 | box-shadow 10/10/20 rgba(0,0,0,.25) | `rgba(0,0,0,0.25) 10px 10px 20px 0px` | ✅ |
| 打ち合わせ写真 id/url/表示サイズ | 44 / value_consultation.png / 405×270 | wp-image-44 / 同URL / **w205**×h270（高さ一致・幅は右クリップ） | ✅(幾何)／幅は残課題 |
| 打ち合わせ写真 position/Left/Top | absolute / 810 / 212 | `absolute` / left810px / top212px（figure x1023=213+810・y3210=2998+212） | ✅ |
| 画像枚数 | 2 | 2 | ✅ |
| 横スクロール | 抑止（残課題CSS前提） | bodyScrollWidth=1440 = clientWidth（現状は横スクロール無し） | ✅ |

> 計測ソース: `getBoundingClientRect`（x は viewport基準、y は +scrollY でページ基準）＋ `getComputedStyle`。letter-spacing は実測 px（1.28px≈0.032em/0.04em、1.274px≈0.091em、1.95px=0.15em）でいずれも設計em換算と一致。

### 写真幅クリップの原因（既知・対処不要）

- 建物写真 figure は `position:absolute; left:494px` で**明示幅を持たず**、含有ブロック（コンテナ content-box 右端 = 1015px）に対して shrink-to-fit。内側 `<img>` は `width:553px` を持つが WP/テーマ既定の `max-width:100%` で figure 幅にキャップされ、結果 521px に縮む（同理由で打ち合わせ写真は 405→205px）。
- 高さ（368 / 270）・座標（left/top）・position・影はすべて設計一致。**横方向の食い出し（右ブリード）と上方向 overflow の見え**だけが残課題で、これは datapack §「要CSS / 申し送り」および本タスク方針「食い出しのクリップ有無では不一致判定しない」に合致するため PASS とした。

---

## 修正履歴

修正なし（ループ 0 回）。初回シリアライズ → append 挿入 → isValid:true → 計測一致で即収束。tree.js の変更は行っていない。

---

## 残課題

- **CSS待ち（既知）: overflow/bleed** — 建物写真の上方向 breakout（`top:-101px`）の見えには ルート `loos/full-wide` / コンテナの `overflow:visible` が前提。建物写真・打ち合わせ写真の右ブリード（content幅1015を超える右はみ出し／写真の本来幅 553・405 の表示）も同様に overflow / viewport追従CSSが必要。いずれもブロック属性では表現不可（figure に明示幅を持たせる／overflow を緩める操作は属性外）。座標・影・サイズ属性は tree.js に投入済みで、最終的な overflow/bleed 調整のみ後段ページCSSで適用予定（wordpress/CLAUDE.md「ブロック属性ファースト」に従いユーザー確認領域）。

## 成果物

- スクリーンショット（フルページ）: `04_VALUE/implemented.png`
- ツリー: `04_VALUE/tree.js`（無変更）
