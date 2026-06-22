# データパック — 01_HERO（サービス内容ページ ヒーロー）

> Figmaファイル `eZFYBaJDAN0PLLd7ITdvLR` / ノード `1:3094`「Hero Section」（1440×650）
> 対象ページ: **サービス内容ページ**（design-data/27）。トップFV（design-data/7/01_FV）と同系統だがCTAボタンなし。
> デザイン基準幅 1440px・セクション高さ 650px。後工程はこのファイルだけ見てブロックツリーを組む。ここに無い情報は実装されない。

---

## 0. セクション概要

画面いっぱい（1440×650）の集合住宅（マンション）外観写真を背景に、左→右へ濃→透の**黒グラデーション**オーバーレイを重ね、左寄せで SERVICE ラベル・H1見出し・サブテキストを縦並び配置。**CTAボタンは無い**（トップFVとの最大の違い）。
3レイヤーの重ね合わせ構成:
- `1:3095`「FV画像」… 最背面の集合住宅外観写真（1440×650、object-fit:cover 相当）
- `1:3096`「Overlay」… 左濃→右透の黒グラデーション（写真の上に乗る・可読性確保の機能的装飾）
- `1:3097`「Container」配下のコンテンツ群（SERVICE / H1 / サブ、左寄せ・縦中央配置）

**グローバルヘッダー（`1:3106` 配下: 白ロゴ・Nav・Component5×5）は抽出対象外。** これは全ページ共通のヘッダーで本セクションの構成要素ではないため、本データパックには含めない（参考: ヘッダー高さ90px・bg `#0a1631`・Navは Jost 13px/ls1.95px。実装時はグローバルヘッダー側で扱う）。

design.png = 写真＋オーバーレイ＋コンテンツ＋（ヘッダーも写り込み）を合成した `1:3094` の screenshot。

---

## 1. レイアウト骨格

### 重なり順（z, 背面→前面）
1. 背景写真（`1:3095` FV画像、1440×650、絶対配置 inset:0、object-fit:cover 相当）… セクション背景
2. グラデーションオーバーレイ（`1:3096` Overlay、1440×650、絶対配置 inset:0）
3. コンテンツ群（`1:3097`〜`1:3105`：SERVICE・H1・サブ、左寄せ・縦並び・垂直中央寄せ）

### セクション／コンテナの配置（生値→正規値）
| 項目 | 生値(px) | 正規値(px) | 備考 |
|---|---|---|---|
| セクション（`1:3094`） | 1440×650 | 1440×650 | デザイン基準・据え置き |
| 外側パディング（section px） | 左右80 | 80 | `px-[80px]` |
| Container（`1:3097`） x | 80 | 80 | section内側 |
| Container 幅 | 1280 | 1280 | `max-w-[1280px]` |
| Container 内側パディング(左右) | 64 | 64 | `px-[64px]` → テキスト左端=80+64=**144px** |
| Container 高さ | 650 | 650 | section全高 |
| 縦配置 | center（垂直中央寄せ） | center | section `justify-center` |

**→ テキスト左インセット = 80 + 64 = 144px。コンテンツ内側幅 = 1280 − 64×2 = 1152px。** これはページ標準（コンテンツ幅1152px・左右マージン144px）と完全一致する。トップFV（左インセット112px・幅1216px）とは異なり、このサービスページHeroは**ページ標準ワイドに従う**。

### コンテンツ群の縦並び（セクション上端=0 基準、生値）
| 要素 | 上端y(px) | 高さ(px) | 下マージン(px) |
|---|---|---|---|
| SERVICE ラベル（`1:3098` Margin 内 `1:3100`） | 185 | 32 | 24（Margin の pb-24） |
| H1見出し（`1:3101` Heading1:margin 内 `1:3103`） | 241 | 120 | 32（pb-32） |
| サブテキスト（`1:3104` 内 `1:3105`） | 393 | 72 | 0 |

- SERVICE → H1 の実間隔 = 241 − (185+32) = **24px**（SERVICE下のMargin pb-24）
- H1 → サブの実間隔 = 393 − (241+120) = **32px**（Heading1:margin pb-32）
- 縦並び全体は section 内で **垂直中央寄せ**（justify-center）。3要素群の総高 = 185〜465（=280px相当）が 650 の中央付近に来る。

---

## 2. テキスト（一字一句・⏎=強制改行=<br>）

### SERVICE ラベル（`1:3100`）
```
SERVICE
```
- 1行・英大文字のみ。装飾ラベル。

### H1見出し（`1:3103`）
```
お客様の未来に寄り添う、⏎
不動産サービスを。
```
- デザイン上 2行に強制改行（`⏎`=`<br>`）。1行目末尾の読点「、」含む。
- 字下げ無し（トップFVのような全角スペース字下げは**無い**）。創作・改変禁止。

### サブテキスト（`1:3105`）
```
住まいの購入や売却、資産形成、相続対策、賃貸経営まで。⏎
私たちは、お客様一人ひとりの想いや将来設計に寄り添い、⏎
最適なご提案と長期的なサポートを提供いたします。
```
- 3行に強制改行（`⏎`=`<br>`×2）。各行末の句読点（。／、）含めて一字一句そのまま。

---

## 3. スタイル

### SERVICE ラベル `1:3100`
| プロパティ | 値 | トークン |
|---|---|---|
| font-family | Noto Serif JP | `font family/Font 2` |
| font-weight | 400 (Regular) | `font weight/400` |
| font-size | 24px | `font size/24` |
| line-height | 32px | `line height/32` |
| letter-spacing | 4.8px | `letter spacing/4_8` |
| color | **#c8a97e**（Tan） | `color/orange/64` |
| ブロック幅 | 1152px（w-full） | |

### H1見出し `1:3103`
| プロパティ | 値 | トークン |
|---|---|---|
| font-family | Noto Serif JP | `font family/Font 2` |
| font-weight | 400 (Regular) | `font weight/400` |
| font-size | 48px | `font size/48` |
| line-height | 60px（各行 `leading-[60px]`） | （トークン無し・実値60px） |
| letter-spacing | 4.8px | （`tracking-[4.8px]` ベタ値） |
| color | #ffffff | `color/white/solid` |
| 高さ | 120px（60px×2行） | |
| ブロック幅 | 1152px（w-full） | |
| text-shadow | 指定なし（design contextに影なし） | — |

### サブテキスト `1:3105`
| プロパティ | 値 | トークン |
|---|---|---|
| font-family | Noto Sans JP | `font family/Font 1` |
| font-weight | 300 (Light) | `font weight/300` |
| font-size | 16px | `font size/16` |
| line-height | 24px | `line height/24` |
| letter-spacing | 0.4px | `letter spacing/0_4` |
| color | **rgba(255,255,255,0.9)**（白90%） | `color/white/ 90%` = `#ffffffe5` |
| 高さ | 72px（24px×3行） | |
| ブロック幅 | 1152px（w-full） | |
| text-shadow | 指定なし | — |

---

## 4. 装飾レイヤー

### グラデーションオーバーレイ `1:3096`（コンテンツ可読性のための機能的装飾）
- 配置: 絶対 inset:0、サイズ 1440×650（セクション全面）
- 方向: **左→右（to right / 90deg）**（design context `bg-gradient-to-r`）
- カラーストップ（全て黒の不透明度違い・**ネイビーではなく純黒**）:
  - 0%: `rgba(0,0,0,0.8)`（`color/black/ 80%` = `#000000cc`）
  - 50%: `rgba(0,0,0,0.5)`（`color/black/ 50%` = `#00000080`、`via-1/2` = 中間ストップ50%）
  - 100%: `rgba(0,0,0,0)`（`color/black/ 0%` = `#00000000`）
- CSS例: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)`
- ※左濃→右透。テキストは左側にあり、左で背景が暗くなって白文字・Tanラベルが読める仕組み。削ると可読性が崩れるため**機能的装飾**（純飾りではない）。
- ※トップFVのオーバーレイはネイビー（#0a192f）系だったが、このサービスHeroは**純黒（#000000）系**。色味が違う点に注意。

### 背景写真 `1:3095`（セクション背景・装飾扱い）
- 配置: 絶対 inset:0、サイズ 1440×650、object-fit:cover / center 相当（design context `object-cover`）
- 内容: 青空の下の低層集合住宅（マンション）外観＋手前の植栽。明るい昼景。
- 用途: セクション背景。コンテンツ可読性はオーバーレイが担保するため、写真自体はビジュアル装飾。
- アセットは §5 参照。

---

## 5. アセット（guid確認済み）

WPメディア取込済み（コンテナ `wp-env-asterrra-wordpress-b07ac4e0-cli-1` / ポート8918）。**URLは `wp post list` で実取得済み（推測なし）**。

| 用途 | ローカルファイル | WP ID | 実URL | 寸法 | 由来ノード |
|---|---|---|---|---|---|
| Hero背景写真（集合住宅外観） | `hero27-bg-apartment.png` | **32** | `http://localhost:8918/wp-content/uploads/2026/06/hero27-bg-apartment.png` | 1536×1024 | `1:3095`（raw source image） |

補足:
- このノードには **同一写真の解像度違いが3つ**存在: Figma export render（1440×650・デザイン基準クロップ）／ raw1（**1536×1024・最高解像・無クロップ**）／ raw2（384×256・低解像サムネ）。
- **採用は raw1（1536×1024 PNG・最高解像）**。背景は `object-fit:cover` で使うため、最高解像の無クロップ原画を入れておくのが最良（クロップはCSS側で吸収）。design.png のクロップ枠（1440×650 export）は §design.png で確認できる。
- raw1 は無クロップのため、design.png の見た目（左に建物・右に植栽）に合わせるには `object-position` を中央〜やや左で調整する想定。フロント検証で要確認。
- ヘッダーの白ロゴ（`1:3123`）は**グローバルヘッダー要素のため本セクション対象外・未取込**。

---

## 6. インタラクション台帳（静止画に写らないもの）

| 要素 | 内容 | 状態 |
|---|---|---|
| 背景写真 | パララックス／固定（fixed）の有無 | **要ユーザー確認**（静止画のみ。スクロール挙動の指定なし） |
| SERVICE / H1 / サブ | 出現アニメーション（フェードイン等） | **要ユーザー確認**（Figmaに指定なし。実装方針はデザイン工程で決定） |
| `object-position` | 背景写真の表示基準位置 | **要ユーザー確認**（raw1は無クロップ。design.png の枠に合わせる位置を実機で詰める） |

このHeroには CTAボタン・リンク要素は無いため、リンク先確認は不要。

---

## 7. 正規化記録（生値→4/8pxスナップ）

| 対象 | 生値 | 正規値 | 判断 |
|---|---|---|---|
| セクションサイズ | 1440×650 | 1440×650 | デザイン基準・据え置き |
| 外側パディング(section) | 80 | 80 | 一致 |
| Container内側パディング | 64 | 64 | 一致（左インセット計144px＝ページ標準） |
| コンテンツ最大幅 | 1280(内側1152) | 1280/1152 | 一致（ページ標準1152px） |
| SERVICE→H1 実間隔 | 24 | 24 | 8グリッド一致（Margin pb-24） |
| H1→サブ 実間隔 | 32 | 32 | 8グリッド一致（pb-32） |
| SERVICE font-size | 24 | 24 | 一致 |
| SERVICE letter-spacing | 4.800000… | 4.8 | 浮動小数丸め |
| H1 font-size | 48 | 48 | 一致 |
| H1 line-height | 60 | 60 | 据え置き（fs48に対し1.25倍） |
| H1 letter-spacing | 4.8 | 4.8 | 一致 |
| サブ font-size | 16 | 16 | 一致 |
| サブ line-height | 24 | 24 | 一致 |
| サブ letter-spacing | 0.4000000… | 0.4 | 浮動小数丸め |

### 配色の正規化メモ
- **SERVICE ラベル: #c8a97e（Tan）**。※ページ標準ゴールドは #c5a059（トップ）/ #c2a24c（別表記）。このHeroの実値は **#c8a97e** で、いずれの標準ゴールドとも僅差で異なる。ブランド統一で標準ゴールドに寄せるか、デザイン実値 #c8a97e を維持するか → **要ユーザー確認**。
- H1: #ffffff（白・一致）
- サブ: rgba(255,255,255,0.9)（白90%）
- オーバーレイ: 純黒 #000000 の不透明度グラデ（0.8→0.5→0）。トップFVのネイビー系とは別。

---

## 検証用設計値

後工程がフロント計測値と突合するための期待値。x はセクション左端からの距離（左インセット）、gap/間隔は要素間の縦距離、ls は em換算（Figma px ÷ fontSize）。

### セクション/レイアウト
| 要素 | x(px) | w(px) | h(px) | 縦間隔(px) | padding(px) | 備考 |
|---|---|---|---|---|---|---|
| Heroセクション（full-wide） | 0 | 全幅(1440) | 650 | — | 左右80 | bg写真cover地 |
| Container（縦中央寄せ） | 80 | max1280 | 650 | — | 左右64 | justify-center。左インセット計144 |
| コンテンツ群（縦並び・左寄せ） | 144 | 1152 | — | SERVICE→H1:24 / H1→サブ:32 | 0 | CTAなし |

### テキスト
| 要素 | fs(px) | lh(px) | ls(em / 元px) | color | font-weight | font-family |
|---|---|---|---|---|---|---|
| SERVICE ラベル | 24 | 32 | 0.2em / 4.8px | #c8a97e | 400 | Noto Serif JP |
| H1見出し | 48 | 60 | 0.1em / 4.8px | #ffffff | 400 | Noto Serif JP |
| サブテキスト | 16 | 24 | 0.025em / 0.4px | rgba(255,255,255,0.9) | 300 | Noto Sans JP |

### 装飾
| 要素 | 配置 | サイズ | 内容 |
|---|---|---|---|
| 背景写真（`1:3095`） | 絶対 inset:0 | 1440×650 | object-cover/center。WP ID32 |
| オーバーレイ（`1:3096`） | 絶対 inset:0 | 1440×650 | linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%) |

---

### tree.js 実装マッピング（ブロックツリー → 期待値）

`tree.js` で組んだブロック属性と、フロント計測時の期待値の対応。`ls` は em換算（属性値）／元px併記。

#### ブロック構成
| ノード | ブロック | 主要属性 |
|---|---|---|
| ルート | `loos/full-wide` | `className:'sec-hero'` / `bgColor:'#131c30'`（写真未読込フォールバック地）/ `contentSize:'full'` / `pcPadding:'0'` `spPadding:'0'` |
| ヒーローラッパー | `flavor/universal-block` | `backgroundImageUrl`(ID32) / `backgroundImageSize:'cover'` / `backgroundImagePosition:'center'` / `positionType:'relative'` / `sizeMinHeight:'650px'` / `layoutJustify:'center'`（縦中央）/ `layoutAlign:'flex-start'`（左寄せ）/ padding `{top0,right80,bottom0,left144}` |
| コンテンツ群 | `flavor/universal-block` | `layoutDirection:'column'` / `sizeWidth:'100%'` / `sizeMaxWidth:'1152px'` |
| SERVICEラベル親 | `flavor/universal-block` | padding-bottom 24px（→H1まで24px） |
| H1見出し親 | `flavor/universal-block` | padding-bottom 32px（→サブまで32px） |

#### テキスト属性 → 期待計測値
| 要素 | ブロック | fs | lh | ls(em / 元px) | color属性 | font-weight | font-family |
|---|---|---|---|---|---|---|---|
| SERVICE | core/paragraph | 24px | 32px | 0.2em / 4.8px | #c8a97e | 400 | Noto Serif JP |
| H1見出し | core/heading(level1, `is-style-section_ttl`) | 48px | 60px | 0.1em / 4.8px | #ffffff | 400 | Noto Serif JP |
| サブ | core/paragraph | 16px | 24px | 0.025em / 0.4px | rgba(255,255,255,0.9) | 300 | Noto Sans JP |

- H1 content = `お客様の未来に寄り添う、<br>不動産サービスを。`（字下げ無し・読点保持）
- サブ content = 3行（`<br>`×2）／§2 一字一句どおり
- 見出しは `is-style-section_ttl` で SWELL h1装飾を中和。色は `style.color.text` と `style.elements.link.color.text` 双方に #ffffff

#### レイアウト期待値
| 項目 | 期待値 | tree.js 表現 |
|---|---|---|
| セクション幅 | 全幅 | `loos/full-wide` contentSize:full |
| セクション高さ | 650px（min） | ラッパー `sizeMinHeight:'650px'` |
| 左インセット | 144px | ラッパー padding-left 144（外80+内64相当） |
| コンテンツ最大幅 | 1152px | コンテンツ群 `sizeMaxWidth:'1152px'` |
| 縦配置 | 垂直中央 | ラッパー `layoutJustify:'center'` |
| SERVICE→H1 間隔 | 24px | SERVICEラベル親 padding-bottom 24 |
| H1→サブ 間隔 | 32px | H1親 padding-bottom 32 |

#### 要CSS（属性で表現不可・tree.js非収録）
- **Heroグラデオーバーレイ**: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)`。backgroundImage拡張のOverlayは単色のみでグラデ非対応のため、ページ限定CSS（swell-meta-css / `.sec-hero` の `::before` 等）で実装。`positionType:'relative'` は付与済み。
- text-shadow: datapack §3 で「指定なし」のため対象外（CSS不要）。
