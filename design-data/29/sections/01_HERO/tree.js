(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント（datapack §3） ----
  const SERIF = "'Noto Serif JP', serif";     // CONTACT ラベル・H1見出し
  const SANS  = "'Noto Sans JP', sans-serif"; // 本文・パンくず

  // ---- 共通カラー（datapack §3 / §7 Figma実値・推定上書き禁止） ----
  const GOLD       = '#C8A97E';                // CONTACTラベル／ゴールドディバイダー（Tan / orange/64）
  const WHITE      = '#ffffff';                // H1見出し
  const WHITE_90   = 'rgba(255,255,255,0.9)';  // 本文（白90% / white/-90%）
  const BC_GREY    = '#6B7280';                // パンくず HOME / >（Pale Sky / grey/46）
  const BC_CURRENT = '#1F2937';                // パンくず現在地・お問い合わせ（Ebony Clay / azure/17）

  // ============================================================
  // (A) ヒーロー帯 sec-hero
  // ============================================================

  // --- CONTACT ラベル（ゴールド・letterSpacing 4px/20px=0.2em / 下16px） ---
  const label = C('core/paragraph', {
    content: 'CONTACT',
    style: {
      color: { text: GOLD },
      typography: {
        fontFamily: SERIF, fontSize: '20px', fontWeight: '400',
        lineHeight: '28px', letterSpacing: '0.2em' // 4px / 20px
      }
    },
    metadata: { name: 'CONTACTラベル' }
  });

  // --- 大見出し H1「お問い合わせ」（白・level:1・SWELL装飾中和・letterSpacing 2.4px/48px=0.05em） ---
  const heading = C('core/heading', {
    level: 1,
    className: 'is-style-section_ttl',
    content: 'お問い合わせ',
    style: {
      color: { text: WHITE },
      elements: { link: { color: { text: WHITE } } },
      typography: {
        fontFamily: SERIF, fontSize: '48px', fontWeight: '400',
        lineHeight: '48px', letterSpacing: '0.05em' // 2.4px / 48px（行高=フォントサイズ1.0倍）
      }
    },
    metadata: { name: '見出し_お問い合わせ(H1)' }
  });

  // --- ゴールド水平ディバイダー（48×2px / #C8A97E / UBで実体化） ---
  const divider = C('flavor/universal-block', {
    sizeWidth: '48', sizeWidthUnit: 'px',
    sizeHeight: '2', sizeHeightUnit: 'px',
    style: { color: { background: GOLD } },
    metadata: { name: 'ゴールドディバイダー' }
  });

  // --- 本文（リード文 3行・白90%・<br>区切り／letterSpacing 0.4px/16px=0.025em） ---
  // datapack §2: 各行末「、」「。」「。」。Figma上は3つの<p>(mb-0)だが1段落<br>で同等表現。
  const body = C('core/paragraph', {
    content: '不動産に関するご質問・ご相談など、<br>お気軽にお問い合わせください。<br>担当者よりご連絡させていただきます。',
    style: {
      color: { text: WHITE_90 },
      typography: {
        fontFamily: SANS, fontSize: '16px', fontWeight: '300',
        lineHeight: '24px', letterSpacing: '0.025em' // 0.4px / 16px
      }
    },
    metadata: { name: '本文_リード3行' }
  });

  // --- ヒーロー内コンテンツ群（縦積み・左寄せ・max1280） ---
  // datapack §1: CONTACT pb16 → H1 pb24 → ディバイダー親 pb24 → 本文。
  // gap で均一にせず、各要素の下paddingを spacingPadding で個別表現（26/01_HEROに倣う）。
  const heroContent = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1280', sizeMaxWidthUnit: 'px',
    metadata: { name: 'ヒーローコンテンツ群' }
  }, [
    // CONTACT ラベル（pb16px → 次のH1まで16px）
    C('flavor/universal-block', {
      spacingPadding: { top: '0', right: '0', bottom: '16', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false
    }, [label]),
    // H1見出し（pb24px → 次のディバイダーまで24px）
    C('flavor/universal-block', {
      spacingPadding: { top: '0', right: '0', bottom: '24', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false
    }, [heading]),
    // ゴールドディバイダー（親pb24px → 次の本文まで24px）
    C('flavor/universal-block', {
      spacingPadding: { top: '0', right: '0', bottom: '24', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false
    }, [divider]),
    // 本文（下マージン0）
    body
  ]);

  // --- ヒーローラッパー（全幅・min-height450・縦中央寄せ・背景写真＝backgroundImage拡張） ---
  // datapack §1/§3: section左右padding80 + Container px64 = コンテンツ左端144px。
  // 外80 + 内64 = 144 の左padを与え max1280 中央寄せで再現。高さ450px固定帯。
  // ※ 左→右ネイビー横グラデオーバーレイ（90%→60%→0%）はブロック属性で表現不可（要CSS）。
  //   backgroundImage拡張のOverlayは単色のみでグラデ非対応。
  const heroWrapper = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'center',
    layoutAlign: 'flex-start',
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMinHeight: '450', sizeMinHeightUnit: 'px',
    backgroundImageUrl: 'http://localhost:8918/wp-content/uploads/2026/06/asterrra-contact-hero-bg.jpg',
    backgroundImageId: 64,
    backgroundImageSize: 'cover',
    backgroundImagePosition: 'center',
    spacingPadding: { top: '40', right: '80', bottom: '0', left: '144' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'ヒーローラッパー' }
  }, [heroContent]);

  const heroSection = C('loos/full-wide', {
    bgColor: '#131C30',           // 写真未読込時フォールバック地（ネイビー azure/13）
    contentSize: 'full',
    pcPadding: '0', spPadding: '0',
    className: 'sec-hero',
    metadata: { name: 'Sec.HERO' }
  }, [heroWrapper]);

  // ============================================================
  // (B) パンくず sec-breadcrumb（白背景・帯の下に分離配置 / datapack §1 注: y=474）
  // ============================================================

  // HOME（リンク → /・グレー）。アイコンなしテキストのみ（datapack §2）。
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

  // カレント「お問い合わせ」（非リンク・濃紺グレー）
  const bcCurrent = C('core/paragraph', {
    content: 'お問い合わせ',
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
    spacingPadding: { top: '24', right: '0', bottom: '24', left: '0' },
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
  // ルート：2つの full-wide（ヒーロー帯 → パンくず帯）
  // datapack §1: パンくずは Hero(y0-450) の下 y=474 に白背景で分離配置。
  // ============================================================
  const tree = [heroSection, breadcrumbSection];

  return wp.blocks.serialize(tree);
})()
