(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント（datapack §3） ----
  const SERIF = "'Noto Serif JP', serif";    // 見出し系（ABOUT US / メインコピー）
  const SANS  = "'Noto Sans JP', sans-serif"; // 本文系（私たちについて / サブコピー / CTA）

  // ---- 共通カラー（datapack §3 / §7 実値・推定上書き禁止） ----
  const GOLD     = '#C5A86D';                 // ABOUT US（Laser / color/orange/60）
  const WHITE    = '#ffffff';                 // メインコピー・CTA
  const WHITE_80 = 'rgba(255,255,255,0.8)';   // 私たちについて
  const WHITE_90 = 'rgba(255,255,255,0.9)';   // サブコピー
  const WHITE_30 = 'rgba(255,255,255,0.3)';   // CTA枠線
  const NAVY     = '#0A1631';                 // グラデ基色 / 写真未読込時フォールバック地

  // ============================================================
  // テキスト群（Container 1:2155 / 1120px・内側左右padding40px・左寄せ縦並び）
  // datapack §1 の積み上げ順：H1 → サブ見出し → メインコピー → サブコピー → CTA
  // 子間 gap は datapack で 5px だが各ブロックの pt/pb が支配的（§1注）。
  // ここでは縦方向の余白を各要素の spacingMargin/Padding で個別表現する。
  // ============================================================

  // --- H1「ABOUT US」（ゴールド・level:1・SWELL装飾中和・38px/76px/4.56px≈0.12em） ---
  const h1About = C('core/heading', {
    level: 1,
    className: 'is-style-section_ttl',
    content: 'ABOUT US',
    style: {
      color: { text: GOLD },
      elements: { link: { color: { text: GOLD } } },
      typography: {
        fontFamily: SERIF, fontSize: '38px', fontWeight: '500',
        lineHeight: '76px', letterSpacing: '0.12em' // 4.56px / 38px
      }
    },
    metadata: { name: '見出し_ABOUT US(H1)' }
  });

  // --- サブ見出し「私たちについて」（白80%・13px/26px/1.3px=0.1em / H1直下 y=81・top81-76=5） ---
  const subHeading = C('core/paragraph', {
    content: '私たちについて',
    style: {
      color: { text: WHITE_80 },
      typography: {
        fontFamily: SANS, fontSize: '13px', fontWeight: '300',
        lineHeight: '26px', letterSpacing: '0.1em' // 1.3px / 13px
      }
    },
    metadata: { name: 'サブ見出し_私たちについて' }
  });

  // --- メインコピー H2（白 solid・38px/60.8px/1.28px≈0.034em・上pt44 / 2行 <br>） ---
  const mainCopy = C('core/heading', {
    level: 2,
    className: 'is-style-section_ttl',
    content: 'お客様の人生に寄り添い、<br>未来をともに描くパートナーへ。',
    style: {
      color: { text: WHITE },
      elements: { link: { color: { text: WHITE } } },
      spacing: { margin: { top: '44px', bottom: '0px' } }, // §7: H2 pt44 / pb0
      typography: {
        fontFamily: SERIF, fontSize: '38px', fontWeight: '500',
        lineHeight: '60.8px', letterSpacing: '0.034em' // 1.28px / 38px
      }
    },
    metadata: { name: 'メインコピー(H2)' }
  });

  // --- サブコピー（白90%・15px/31.5px/1.28px≈0.085em・上pt30 / 2行 <br>） ---
  const subCopy = C('core/paragraph', {
    content: '変わりゆく時代に、<br>変わらぬ安心を。',
    style: {
      color: { text: WHITE_90 },
      spacing: { margin: { top: '30px', bottom: '0px' } }, // §7: サブコピー pt30
      typography: {
        fontFamily: SANS, fontSize: '15px', fontWeight: '300',
        lineHeight: '31.5px', letterSpacing: '0.085em' // 1.28px / 15px
      }
    },
    metadata: { name: 'サブコピー' }
  });

  // ============================================================
  // CTAボタン（core/buttons > core/button / 会社概要を見る → /company/）
  // datapack §3：アウトライン型（背景なし・白30%枠1px）・角丸0・py17/px46・gap15。
  // ラベルと矢印「→」を一つの button text に保持（gap15 はラベル↔矢印間の視覚間隔を
  //   全角スペースで近似。datapack の文言「会社概要を見る」「→」は一字一句保持）。
  // ============================================================
  const ctaButtons = C('core/buttons', {
    layout: { type: 'flex', justifyContent: 'left' },
    style: {
      spacing: { margin: { top: '50px', bottom: '0px' } } // §7: サブコピー pb50（=CTA上余白）
    },
    metadata: { name: 'CTA行' }
  }, [
    C('core/button', {
      text: '会社概要を見る&nbsp;&nbsp;&nbsp;→',
      url: '/company/',
      style: {
        color: { background: 'transparent', text: WHITE },
        border: { width: '1px', style: 'solid', color: WHITE_30, radius: '0px' },
        spacing: { padding: { top: '17px', bottom: '17px', left: '46px', right: '46px' } },
        typography: {
          fontFamily: SANS, fontSize: '13px', fontWeight: '400',
          lineHeight: '26px', letterSpacing: '0.1em' // 1.3px / 13px
        }
      },
      metadata: { name: 'CTA_会社概要を見る' }
    })
  ]);

  // --- コンテンツ群（縦積み・左寄せ・max1120中央寄せ・内側左右padding40px） ---
  // datapack §1：Container 幅1120px・内側 horizontal padding 40px → 実描画幅1040px。
  const content = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1120', sizeMaxWidthUnit: 'px',
    spacingPadding: { top: '0', right: '40', bottom: '0', left: '40' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    metadata: { name: 'FVコンテンツ群' }
  }, [h1About, subHeading, mainCopy, subCopy, ctaButtons]);

  // ============================================================
  // 装飾_白ロゴ（ロゴ2 / 1:2165・右下絶対配置・純装飾リンクなし）
  // datapack §4：left1113 / top634 / 222×170 / FV上は白表示。
  // ソースアセット(logo2.png ID:36)はネイビー版 → 白表示は色反転が必要（要CSS）。
  // core/image の position 拡張は 'img' プレフィックス必須（無印 position は破棄）。
  // ※ 1440基準の left1113 = right(1440-1113-222)=105 / top634 = bottom(900-634-170)=96。
  // ============================================================
  const logo = C('core/image', {
    id: 36,
    url: 'http://localhost:8918/wp-content/uploads/2026/06/logo2.png',
    alt: '',
    sizeSlug: 'full',
    width: '222px',
    height: '170px',
    imgPositionType: 'absolute',
    imgPositionRight: '105', imgPositionRightUnit: 'px',
    imgPositionBottom: '96', imgPositionBottomUnit: 'px',
    style: { border: { radius: '0px' } },
    metadata: { name: '装飾_白ロゴ' }
  });

  // ============================================================
  // FVラッパー（背景写真＝backgroundImage拡張・min-height900・縦中央寄せ）
  // positionType:relative を付与し、装飾ロゴ(absolute)の基準にする。
  // datapack §1：Container top200 / コンテンツ縦は section 内 上寄せ気味だが、
  //   1440×900 アートボードに対し縦中央寄せ＋max1120中央でレイアウト再現。
  // ※ 左→右ネイビーグラデーションオーバーレイはブロック属性で表現不可（要CSS）。
  //   backgroundImage 拡張の overlay は単色のみ・linear-gradient(90.54deg) 非対応。
  // ============================================================
  const fvWrapper = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'center',
    layoutAlign: 'center',
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMinHeight: '900', sizeMinHeightUnit: 'px',
    backgroundImageUrl: 'http://localhost:8918/wp-content/uploads/2026/06/fv-background.png',
    backgroundImageId: 35,
    backgroundImageSize: 'cover',
    backgroundImagePosition: 'center',
    spacingPadding: { top: '0', right: '0', bottom: '0', left: '0' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'FVラッパー' }
  }, [content, logo]);

  // ============================================================
  // ルート：loos/full-wide（全幅・ネイビー地フォールバック）
  // className:'sec-about-fv' は固有指定（必須）。
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: NAVY,
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-about-fv',
      metadata: { name: 'Sec.AboutFV' }
    }, [fvWrapper])
  ];

  return wp.blocks.serialize(tree);
})()
