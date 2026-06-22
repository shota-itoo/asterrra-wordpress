# 01_HERO データパック — お問い合わせページ Hero（ページタイトル帯）

対象 Figma ファイル: `eZFYBaJDAN0PLLd7ITdvLR`
対象 nodeId: `1:4006`（Page Hero Section / 1440×450）＋ `1:4002`（Breadcrumb → Nav）
スクショ: `design.png`（1440×450）

> 注意: `1:4006` は get_metadata では子ノードが空に見えるが、get_design_context では完全なコンテンツ（背景写真・オーバーレイ・CONTACT見出し・「お問い合わせ」H1・金色ディバイダー・本文3行）が取得できた。本データパックは get_design_context の実コンテンツに基づく。

---

## 1. レイアウト骨格

### Hero 本体 `1:4006`（Page Hero Section）
- フレームサイズ: 1440 × 450（デザイン幅 1440 / 高さ 450px）
- レイアウト: 縦並び（flex-col）/ 垂直中央寄せ（justify-center）/ 左寄せ（items-start）
- 外側パディング: `px-[80px]`（左右 80px）
- 構造（外→内）:
  ```
  1:4006 Page Hero Section (1440×450, px-80, justify-center, items-start)
   ├ 背景画像レイヤー（absolute inset-0, overflow-hidden）  ← 装飾
   ├ 1:4007 Overlay（absolute inset-0, 左→右グラデーション）  ← 装飾
   └ 1:4008 Container（max-w-1280, flex-1, justify-center, pt-40, px-64, w-full）
       ├ 1:4009 Margin（pb-16）
       │   └ 1:4010 Container
       │       └ 1:4011 「CONTACT」（エッジ見出し / 金色）
       ├ 1:4012 Heading 1:margin（pb-24）
       │   └ 1:4013 Heading 1
       │       └ 1:4014 「お問い合わせ」（H1 / 白 / 48px）
       ├ 1:4015 Margin（h-26, pb-24, w-48）
       │   └ 1:4016 Horizontal Divider（金色 2px × 48px の横線）  ← 装飾
       └ 1:4017 Container
           └ 1:4018 本文 3行（白90% / 16px）
  ```

### コンテンツ左端の計算（重要）
- viewport 左端からのコンテンツ左端 = 外側 px-80 ＋ Container px-64 = **144px**
- これはページ標準「左右マージン 144px（デザイン幅 1440px → コンテンツ幅 1152px）」と完全一致 ✅
- Container は `max-w-[1280px]`（=80+64+ コンテンツ +64 の内訳ではなく、Container 自身の最大幅）。Container 内のコンテンツは Container px-64 を差し引いた幅で展開される。
- → 実装上は「左右マージン 144px / コンテンツ幅 1152px」のページ標準に正規化する。

### パンくず `1:4002`（Breadcrumb → Nav）
- フレームサイズ: 1024 × 16
- 生座標: x=208, y=474, w=1024, h=16
- **配置位置の注意**: y=474 は Hero（y=0〜450）の **下** にある。つまりパンくずは Hero 帯の中ではなく、Hero 直下に置かれる別要素。本タスクの指示により「1つの Hero セクション」として一括管理するが、視覚上は Hero 帯の下に分離配置されている（Hero は写真背景、パンくずは白背景域）。
- パンくず左端 x=208。ただしこれはデザイン上の Breadcrumb フレーム原点。実コンテンツ（"HOME" テキスト）は frame 内 left-0 から開始。
- 横並び: HOME → `>` → お問い合わせ
  - "HOME": left-0
  - "`>`"（区切り）: left=46.66px
  - "お問い合わせ": left=64.63px

---

## 2. テキスト（一字一句 / ⏎=<br>）

### Hero `1:4006`
| ノード | 役割 | テキスト（原文ママ） |
|---|---|---|
| 1:4011 | エッジ見出し（英字ラベル） | `CONTACT` |
| 1:4014 | H1（ページタイトル） | `お問い合わせ` |
| 1:4018 | 本文（リード文 / 3行） | 1行目: `不動産に関するご質問・ご相談など、`<br>2行目: `お気軽にお問い合わせください。`<br>3行目: `担当者よりご連絡させていただきます。` |

> 本文の改行は Figma 上で `<p>` が3つに分かれている（`mb-0` で行間ゼロ詰め）。WPでは1つの段落内 `<br>` 区切り、または3行の意味的改行として実装する。各行末:
> - 1行目末尾「、」、2行目末尾「。」、3行目末尾「。」

### パンくず `1:4002`
| ノード | テキスト（原文ママ） | リンク状態 |
|---|---|---|
| I1:4003;1:3908 | `HOME` | リンク（ホームへ）。※レイヤー名は「Component 1」だが実コンテンツは英字 "HOME"。「ホーム」ではない |
| 1:4004 | `>` | 区切り文字（半角不等号） |
| 1:4005 | `お問い合わせ` | カレント（現在ページ / 非リンク） |

> 指示書の「（ホーム）> お問い合わせ」は階層の意図説明であり、実テキストは "HOME"（英大文字）。一字一句は "HOME"。

---

## 3. スタイル

### Hero 本体
| 項目 | 生値 | 正規値 / 備考 |
|---|---|---|
| フレーム高さ | 450px | 8グリッド合致（450=8×56.25 ではないが、ページ帯としてそのまま採用。スナップ不要の固定帯高） |
| 外側左右padding | 80px | 4/8グリッド合致 |
| Container 上padding | 40px | 8グリッド合致 |
| Container 左右padding | 64px | 8グリッド合致 |
| コンテンツ左端（viewport基準） | 80+64=144px | ページ標準 144px ✅ |
| 縦配置 | justify-center | 帯の縦中央にコンテンツ群を配置 |

### CONTACT（エッジ見出し）`1:4011`
| 項目 | 値 | 正規値 |
|---|---|---|
| フォント | Noto Serif JP / Regular | 見出し=Noto Serif JP ✅ |
| font-weight | 400 | |
| font-size | 20px | 8グリッド外だが指定値。正規 20px |
| line-height | 28px | |
| letter-spacing | 4px | 広めトラッキング（英字ラベル演出） |
| color | #C8A97E（Tan / orange/64） | デザイン値 #C8A97E。※ページ標準ゴールドは #C5A059 → **生値 #C8A97E を採用**（Figma 定義のトークン色を優先。標準ゴールドとは別トーン） |
| 下マージン | pb-16（16px） | 8グリッド合致 |

### お問い合わせ（H1）`1:4014`
| 項目 | 値 | 正規値 |
|---|---|---|
| フォント | Noto Serif JP / Regular | 見出し=Noto Serif JP ✅ |
| font-weight | 400 | |
| font-size | 48px | 8グリッド合致 |
| line-height | 48px | 行高=フォントサイズ（1.0倍） |
| letter-spacing | 2.4px | |
| color | #FFFFFF（白 solid） | ページ標準 白 #FFFFFF ✅ |
| 下マージン | pb-24（24px） | 8グリッド合致 |

### Horizontal Divider（金色横線）`1:4016`
| 項目 | 値 | 正規値 |
|---|---|---|
| 幅 | 48px | 8グリッド合致 |
| 高さ（線太さ） | 2px | |
| color | #C8A97E（Tan / orange/64） | CONTACT と同色のゴールド |
| ラッパー | h-26（26px）/ pb-24（24px）/ w-48 | 線の下に 24px マージン |

### 本文（リード文）`1:4018`
| 項目 | 値 | 正規値 |
|---|---|---|
| フォント | Noto Sans JP / Light | 本文=Noto Sans JP ✅（ウェイト Light=300） |
| font-weight | 300 | |
| font-size | 16px | 8グリッド合致 |
| line-height | 24px | 1.5倍 |
| letter-spacing | 0.4px | |
| color | rgba(255,255,255,0.9)（白90% / white/-90%） | 白の90%不透明。正規: #FFFFFF @ opacity 0.9 |
| 行間 | 各 `<p>` mb-0 | 行間詰め（24px line-height のみ） |

### パンくず スタイル
| ノード | テキスト | フォント | size | line-h | letter-sp | color |
|---|---|---|---|---|---|---|
| HOME（I1:4003;1:3908） | HOME | Noto Sans JP / Regular(400) | 12px | 16px | 0.3px | #6B7280（Pale Sky / grey/46） |
| `>`（1:4004） | > | Noto Sans JP / Regular(400) | 12px | 16px | 0.3px | #6B7280（grey/46） |
| お問い合わせ（1:4005） | お問い合わせ | Noto Sans JP / Regular(400) | 12px | 16px | 0.3px | #1F2937（Ebony Clay / azure/17） ※カレントは濃色 |

> パンくず色はページ標準グレー #E5E7EB ではなく **テキスト用グレー #6B7280**（リンク）/ 濃紺グレー #1F2937（カレント）。#E5E7EB は罫線用、ここは文字色なので #6B7280・#1F2937 を採用。

---

## 4. 装飾レイヤー

| ノード | 種別 | 内容 | 座標 / 色 |
|---|---|---|---|
| 背景画像（1:4006 内 img） | 写真背景 | 高層ビル群を見上げる写真（ネイビートーン） | absolute inset-0, overflow-hidden。img は `h-[213.33%] top-[-56.67%] w-full`（縦方向に拡大しトリミング配置）。帯 450px に対し元画像 1920×1280 を幅基準で配置し縦中央付近をクロップ |
| 1:4007 Overlay | グラデーションオーバーレイ | 左→右の暗→透明グラデ（写真の上に重ね、左側のテキスト可読性を確保） | absolute inset-0。`bg-gradient-to-r`：<br>・from（左 0%）: `rgba(19,28,48,0.9)`（azure/13 @ 90%）<br>・via（中央 50%）: `rgba(19,28,48,0.6)`（azure/13 @ 60%）<br>・to（右 100%）: `rgba(19,28,48,0)`（azure/13 @ 0% 透明）<br>基準色 #131C30（azure/13） |
| 1:4016 Horizontal Divider | 装飾横線 | ゴールド 2px×48px（H1 と本文の間のアクセント） | color #C8A97E |

> オーバーレイ基準色 #131C30 はページ標準ネイビー #0A192F とは別のやや明るいネイビー。Figma 定義トークン azure/13 を優先採用。
> グラデは「左濃→右透明」の機能的グラデ（左側テキスト可読性確保）であり、装飾的多色グラデではない。

---

## 5. アセット（guid 確認済み）

| 用途 | ファイル | WP添付ID | 実URL（guid確認済み・推測でない） | 元解像度 |
|---|---|---|---|---|
| Hero 背景写真 | asterrra-contact-hero-bg.jpg | **64** | `http://localhost:8918/wp-content/uploads/2026/06/asterrra-contact-hero-bg.jpg` | 1920×320?→ **1920×1280**（jpeg, baseline） |

- download_assets の rawImages は2件返ったが、jpeg(1920×1280) と png(480×320) は**同一写真**（png は低解像度の重複サムネ）。本番用は高解像度 jpeg を採用し WP 取込済み。png は不採用。
- export レンダー（1:4006 全体 png）は datapack の `design.png` として保存済み（1440×450、装飾合成後の見た目）。
- 取込手順実績:
  - `docker cp /tmp/asterrra-contact-hero-bg.jpg wp-env-asterrra-wordpress-b07ac4e0-cli-1:/tmp/`
  - `wp media import /tmp/asterrra-contact-hero-bg.jpg --porcelain` → `64`
  - `wp post list --post_type=attachment --post__in=64 --fields=ID,guid` で guid 確認済み

---

## 6. インタラクション台帳

| 要素 | 挙動 | リンク先 | 確定度 |
|---|---|---|---|
| パンくず "HOME" | リンク（クリックでホームへ） | サイトトップ（`/` ホームページ） | 推定（パンくず慣習）。実URLは **要ユーザー確認**（トップページのパーマリンク） |
| パンくず "お問い合わせ" | カレント（現在ページ・非リンク） | なし（テキスト表示のみ） | 確定 |
| パンくず "`>`" | 区切り文字（非インタラクティブ） | なし | 確定 |
| Hero 背景 / オーバーレイ / 見出し群 | 静的表示（リンク・ボタンなし） | なし | 確定 |

> このHeroセクション内にCTAボタン・フォームリンクは存在しない（ページタイトル帯のみ）。

---

## 7. 正規化記録（生値 → 正規値）

| 項目 | 生値（Figma） | 正規値（採用） | 判断根拠 |
|---|---|---|---|
| コンテンツ左端 | px-80 + px-64 = 144px | 左右マージン 144px / コンテンツ幅 1152px | ページ標準と一致。そのまま採用 |
| Hero 高さ | 450px | 450px | 固定帯高。スナップ不要 |
| Container max-width | 1280px | 1280px（実コンテンツ幅は 1152px に収まる） | Figma 値維持 |
| CONTACT font-size | 20px | 20px | 指定値維持（8グリッド外だが意図的） |
| CONTACT / Divider 色 | #C8A97E（orange/64） | **#C8A97E**（採用） | Figma トークン色を優先。ページ標準ゴールド #C5A059 とは別トーンのため標準には丸めない |
| H1 font-size / 色 | 48px / #FFFFFF | 48px / #FFFFFF | 8グリッド合致・標準色一致 |
| 本文 色 | rgba(255,255,255,0.9) | #FFFFFF @ opacity 0.9 | 白90%。標準白の透過 |
| オーバーレイ基準色 | #131C30（azure/13） | **#131C30**（採用） | Figma トークン色を優先。標準ネイビー #0A192F とは別トーンのため標準には丸めない |
| パンくず色（リンク/カレント） | #6B7280 / #1F2937 | #6B7280 / #1F2937 | 文字色。標準罫線グレー #E5E7EB は不採用 |
| 各種マージン | pb-16 / pb-24 / pt-40 | 16 / 24 / 40px | すべて 8グリッド合致。スナップ不要 |

### 配色まとめ（このセクションで使う色）
- ゴールド（ラベル・ディバイダー）: **#C8A97E**
- 白（H1）: **#FFFFFF**
- 白90%（本文）: **rgba(255,255,255,0.9)**
- オーバーレイネイビー: **#131C30**（90%→60%→0% の左→右グラデ）
- パンくずリンク文字: **#6B7280** / カレント文字: **#1F2937**

---

## 検証用設計値

> tree.js（ブロックツリーJSON）の採用値。実機Gutenbergシリアライズ後の突合用。

### ルート構成
- ルート1: `loos/full-wide` `className:'sec-hero'` / bgColor `#131C30`（写真未読込時フォールバック地）/ contentSize:full / pcPadding,spPadding:0
- ルート2: `loos/full-wide` `className:'sec-breadcrumb'` / bgColor `#ffffff`（パンくず帯はHero下 y=474 に分離配置 datapack §1）
- パンくずは「1つのHeroセクション」の指示に対し、datapackの分離配置（白背景・Hero帯外）に従い別 full-wide として実装（Few-Shot 3 末尾の許容構成）

### (A) sec-hero
| 要素 | ブロック | 主要属性 |
|---|---|---|
| ヒーローラッパー | flavor/universal-block | column/justify:center/align:flex-start・positionType:relative・width100%・minHeight450px・padding{top40,right80,bottom0,left144}・背景写真ID64(cover/center) |
| コンテンツ群 | flavor/universal-block | column/flex-start・width100%・maxWidth1280px |
| CONTACTラベル | core/paragraph | #C8A97E・Noto Serif JP・20px/400・lineHeight28px・letterSpacing0.2em（4px）・親UB pb16 |
| H1 お問い合わせ | core/heading | level1・is-style-section_ttl・#ffffff(+link同色)・Noto Serif JP・48px/400・lineHeight48px・letterSpacing0.05em（2.4px）・親UB pb24 |
| ゴールドディバイダー | flavor/universal-block | width48px×height2px・background #C8A97E・親UB pb24 |
| 本文リード3行 | core/paragraph | rgba(255,255,255,0.9)・Noto Sans JP・16px/300・lineHeight24px・letterSpacing0.025em（0.4px）・3行<br>区切り |

本文content（一字一句）:
`不動産に関するご質問・ご相談など、<br>お気軽にお問い合わせください。<br>担当者よりご連絡させていただきます。`

### (B) sec-breadcrumb
| 要素 | ブロック | 主要属性 |
|---|---|---|
| パンくず行 | flavor/universal-block | row/justify:flex-start/align:center・gap8px・width100%・maxWidth1024px・padding{top24,bottom24}・margin{left/right:auto}中央寄せ |
| HOME | core/paragraph | `<a href="/">HOME</a>`・#6B7280(+link同色)・Noto Sans JP・12px/400・lineHeight16px・letterSpacing0.025em（0.3px） |
| 区切り | core/paragraph | `&gt;`・#6B7280・12px/400・lineHeight16px |
| お問い合わせ（カレント） | core/paragraph | 非リンク・#1F2937・12px/400・lineHeight16px |

### 要CSS（ブロック属性で表現不可）
- **左→右ネイビー横グラデオーバーレイ**（#131C30 90%→60%→0% / datapack §4）: backgroundImage拡張のOverlayは単色のみでグラデ非対応。左側テキスト可読性確保の機能的グラデのため要カスタムCSS（`.sec-hero` の背景写真上に `linear-gradient(to right, rgba(19,28,48,0.9), rgba(19,28,48,0.6) 50%, rgba(19,28,48,0))` を疑似要素 or オーバーレイで重ねる）

### 配色（採用・Figma実値）
- ゴールド: #C8A97E / 白: #ffffff / 本文白90%: rgba(255,255,255,0.9)
- オーバーレイネイビー: #131C30 / パンくずリンク: #6B7280 / カレント: #1F2937
