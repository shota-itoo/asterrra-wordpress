(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント（datapack §3） ----
  const SERIF = "'Noto Serif JP', serif";    // エヤブロウ・見出し
  const SANS  = "'Noto Sans JP', sans-serif"; // サブ本文・パンくず

  // ---- 共通カラー（datapack §3 実値・推定上書き禁止） ----
  const GOLD       = '#C8A97E';              // エヤブロウ／ディバイダー
  const WHITE       = '#ffffff';             // 見出し
  const WHITE_90    = 'rgba(255,255,255,0.9)'; // サブ本文（白90%）
  const BC_GREY     = '#6B7280';             // パンくず HOME / >
  const BC_CURRENT  = '#1F2937';             // パンくず現在地（会社概要）

  // ============================================================
  // (A) ヒーロー帯 sec-hero
  // ============================================================

  // --- エヤブロウ「COMPANY」（ゴールド・letterSpacing 4px/20px=0.2em） ---
  const eyebrow = C('core/paragraph', {
    content: 'COMPANY',
    style: {
      color: { text: GOLD },
      typography: {
        fontFamily: SERIF, fontSize: '20px', fontWeight: '400',
        lineHeight: '28px', letterSpacing: '0.2em' // 4px / 20px
      }
    },
    metadata: { name: 'エヤブロウ_COMPANY' }
  });

  // --- 大見出し H1「会社概要」（白・level:1・SWELL装飾中和・letterSpacing 2.4px/48px=0.05em） ---
  const heading = C('core/heading', {
    level: 1,
    className: 'is-style-section_ttl',
    content: '会社概要',
    style: {
      color: { text: WHITE },
      elements: { link: { color: { text: WHITE } } },
      typography: {
        fontFamily: SERIF, fontSize: '48px', fontWeight: '400',
        lineHeight: '48px', letterSpacing: '0.05em' // 2.4px / 48px
      }
    },
    metadata: { name: '見出し_会社概要(H1)' }
  });

  // --- ゴールド水平ディバイダー（48×2px / #C8A97E / UBで実体化） ---
  const divider = C('flavor/universal-block', {
    sizeWidth: '48', sizeWidthUnit: 'px',
    sizeHeight: '2', sizeHeightUnit: 'px',
    style: { color: { background: GOLD } },
    metadata: { name: 'ゴールドディバイダー' }
  });

  // --- 日本語サブ2行（白90%・別段落×2／letterSpacing 0.4px/16px=0.025em） ---
  const subStyle = {
    color: { text: WHITE_90 },
    typography: {
      fontFamily: SANS, fontSize: '16px', fontWeight: '300',
      lineHeight: '24px', letterSpacing: '0.025em' // 0.4px / 16px
    }
  };
  const sub1 = C('core/paragraph', {
    content: 'お客様の信頼に応え、より良い未来を創造するために。',
    style: subStyle, metadata: { name: 'サブ1行目' }
  });
  const sub2 = C('core/paragraph', {
    content: 'ASTERRA Corporationの基本情報をご紹介します。',
    style: subStyle, metadata: { name: 'サブ2行目' }
  });

  // --- ヒーロー内コンテンツ群（縦積み・左寄せ・max1280） ---
  // datapack §1: エヤブロウ pb16 → 見出し pb24 → ディバイダー親 pb24 → サブ。
  // gap で均一にせず、各要素の下マージンを spacingMargin で個別表現。
  const heroContent = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1280', sizeMaxWidthUnit: 'px',
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' }, // 中央寄せ
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    spacingPadding: { top: '0', right: '32', bottom: '0', left: '32' },    // 両端32px
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    className: 'fv-content',   // CSSフック（グラデ前面化 z-index）
    metadata: { name: 'ヒーローコンテンツ群' }
  }, [
    // エヤブロウ（pb16px）
    C('flavor/universal-block', {
      spacingPadding: { top: '0', right: '0', bottom: '16', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false
    }, [eyebrow]),
    // 見出し（pb24px）
    C('flavor/universal-block', {
      spacingPadding: { top: '0', right: '0', bottom: '24', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false
    }, [heading]),
    // ディバイダー（親pb24px）
    C('flavor/universal-block', {
      spacingPadding: { top: '0', right: '0', bottom: '24', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false
    }, [divider]),
    // サブ2行
    C('flavor/universal-block', {
      layoutDirection: 'column',
      layoutJustify: 'flex-start',
      layoutAlign: 'flex-start'
    }, [sub1, sub2])
  ]);

  // --- ヒーローラッパー（全幅・min-height450・縦中央寄せ・背景写真＝backgroundImage拡張） ---
  // datapack §1: section左右padding80px。コンテンツ左端実座標≈208px（80外+64内+α）を
  // 外80 + 内64 = 144 の左padを与え max1280 中央寄せで再現。
  // ※ ネイビー横グラデオーバーレイはブロック属性で表現不可（要CSS）。
  //   backgroundImage拡張のOverlayColorは単色のみでグラデ非対応。
  const heroWrapper = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'center',
    layoutAlign: 'flex-start',
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMinHeight: '450', sizeMinHeightUnit: 'px',
    backgroundImageUrl: 'http://localhost:8918/wp-content/uploads/2026/06/hero-bg-city.jpg',
    backgroundImageId: 34,
    backgroundImageSize: 'cover',
    backgroundImagePosition: 'center',
    spacingPadding: { top: '40', right: '0', bottom: '0', left: '0' }, // 左右paddingはheroContent側(max1280中央寄せ+32px)で制御
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    className: 'fv-bg',   // CSSフック（背景写真::before + グラデ::after オーバーレイ）
    metadata: { name: 'ヒーローラッパー' }
  }, [heroContent]);

  const heroSection = C('loos/full-wide', {
    bgColor: '#131C30',           // 写真未読込時フォールバック地（ネイビー）
    contentSize: 'full',
    pcPadding: '0', spPadding: '0',
    className: 'sec-hero',
    metadata: { name: 'Sec.HERO' }
  }, [heroWrapper]);

  // ============================================================
  // (B) パンくず sec-breadcrumb（白背景・コンテンツ幅1024・左寄せ）
  // ============================================================

  // HOME（リンク → /・グレー）。アイコンなし（datapack §1 注：Component1はテキストのみ）。
  const bcHome = C('core/paragraph', {
    content: '<a href="/">HOME</a>',
    style: {
      color: { text: BC_GREY },
      elements: { link: { color: { text: BC_GREY } } },
      typography: {
        fontFamily: SANS, fontSize: '12px', fontWeight: '400',
        lineHeight: '16px', letterSpacing: '0.025em' // 0.3px / 12px
      }
    },
    metadata: { name: 'パンくず_HOME' }
  });

  // 区切り「>」（半角不等号・グレー・HTMLエンティティで安全化）
  const bcSep = C('core/paragraph', {
    content: '&gt;',
    style: {
      color: { text: BC_GREY },
      typography: {
        fontFamily: SANS, fontSize: '12px', fontWeight: '400',
        lineHeight: '16px', letterSpacing: '0.025em'
      }
    },
    metadata: { name: 'パンくず_区切り' }
  });

  // カレント「会社概要」（非リンク・濃紺グレー）
  const bcCurrent = C('core/paragraph', {
    content: '会社概要',
    style: {
      color: { text: BC_CURRENT },
      typography: {
        fontFamily: SANS, fontSize: '12px', fontWeight: '400',
        lineHeight: '16px', letterSpacing: '0.025em'
      }
    },
    metadata: { name: 'パンくず_現在地' }
  });

  // パンくず行（横並び・左寄せ・gap8px・max1024中央寄せ・上下24px）
  const bcRow = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'flex-start',
    layoutAlign: 'center',
    spacingGap: '8', spacingGapUnit: 'px',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1024', sizeMaxWidthUnit: 'px',
    spacingPadding: { top: '24', right: '16', bottom: '24', left: '16' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    metadata: { name: 'パンくず行' }
  }, [bcHome, bcSep, bcCurrent]);

  const breadcrumbSection = C('loos/full-wide', {
    bgColor: '#ffffff',
    contentSize: 'full',
    pcPadding: '0', spPadding: '0',
    className: 'sec-breadcrumb',
    metadata: { name: 'Sec.Breadcrumb' }
  }, [bcRow]);

  // ============================================================
  // ルート：2つの full-wide（ヒーロー → パンくず）
  // ============================================================
  const tree = [heroSection, breadcrumbSection];

  return wp.blocks.serialize(tree);
})()
