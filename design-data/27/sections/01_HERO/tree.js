(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント（datapack §3） ----
  const SERIF = "'Noto Serif JP', serif";     // SERVICE ラベル・H1見出し
  const SANS  = "'Noto Sans JP', sans-serif"; // サブテキスト

  // ---- 共通カラー（datapack §3 / §7 Figma実値・推定上書き禁止） ----
  const GOLD     = '#c8a97e';                  // SERVICE ラベル（Tan / color/orange/64）
  const WHITE    = '#ffffff';                  // H1見出し
  const WHITE_90 = 'rgba(255,255,255,0.9)';    // サブテキスト（白90% / color/white/ 90%）

  // ============================================================
  // SERVICE ラベル（ゴールド・letterSpacing 4.8px/24px=0.2em）
  // ============================================================
  const label = C('core/paragraph', {
    content: 'SERVICE',
    style: {
      color: { text: GOLD },
      typography: {
        fontFamily: SERIF, fontSize: '24px', fontWeight: '400',
        lineHeight: '32px', letterSpacing: '0.2em' // 4.8px / 24px
      }
    },
    metadata: { name: 'SERVICEラベル' }
  });

  // ============================================================
  // H1見出し（白・level:1・SWELL装飾中和・2行<br>）
  // letterSpacing 4.8px/48px=0.1em
  // ============================================================
  const heading = C('core/heading', {
    level: 1,
    className: 'is-style-section_ttl',
    content: 'お客様の未来に寄り添う、<br>不動産サービスを。',
    style: {
      color: { text: WHITE },
      elements: { link: { color: { text: WHITE } } },
      typography: {
        fontFamily: SERIF, fontSize: '48px', fontWeight: '400',
        lineHeight: '60px', letterSpacing: '0.1em' // 4.8px / 48px
      }
    },
    metadata: { name: '見出し_H1' }
  });

  // ============================================================
  // サブテキスト（白90%・3行<br>×2・letterSpacing 0.4px/16px=0.025em）
  // ============================================================
  const subtext = C('core/paragraph', {
    content: '住まいの購入や売却、資産形成、相続対策、賃貸経営まで。<br>私たちは、お客様一人ひとりの想いや将来設計に寄り添い、<br>最適なご提案と長期的なサポートを提供いたします。',
    style: {
      color: { text: WHITE_90 },
      typography: {
        fontFamily: SANS, fontSize: '16px', fontWeight: '300',
        lineHeight: '24px', letterSpacing: '0.025em' // 0.4px / 16px
      }
    },
    metadata: { name: 'サブテキスト' }
  });

  // ============================================================
  // ヒーロー内コンテンツ群（縦積み・左寄せ・幅1152px相当=w-full）
  // datapack §1: SERVICE → H1 間隔24px / H1 → サブ 間隔32px。
  // gap均一にせず各要素の下paddingを spacingPadding で個別表現（26/01_HEROに倣う）。
  // ============================================================
  const heroContent = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1152', sizeMaxWidthUnit: 'px',
    metadata: { name: 'ヒーローコンテンツ群' }
  }, [
    // SERVICE ラベル（pb24px → 次のH1まで24px）
    C('flavor/universal-block', {
      spacingPadding: { top: '0', right: '0', bottom: '24', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false
    }, [label]),
    // H1見出し（pb32px → 次のサブまで32px）
    C('flavor/universal-block', {
      spacingPadding: { top: '0', right: '0', bottom: '32', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false
    }, [heading]),
    // サブテキスト（下マージン0）
    subtext
  ]);

  // ============================================================
  // ヒーローラッパー（全幅・min-height650・縦中央寄せ・背景写真＝backgroundImage拡張）
  // positionType:relative を付与（オーバーレイ要CSSの基準）。
  // 左インセット144px（外80+内64）は padding-left で再現・max1152中央寄せ。
  // ※ 左→右 純黒グラデーションオーバーレイはブロック属性で表現不可（要CSS）。
  //   backgroundImage拡張のOverlayは単色のみでグラデ非対応。
  // ============================================================
  const heroWrapper = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'center',
    layoutAlign: 'flex-start',
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMinHeight: '650', sizeMinHeightUnit: 'px',
    backgroundImageUrl: 'http://localhost:8918/wp-content/uploads/2026/06/hero27-bg-apartment.png',
    backgroundImageId: 32,
    backgroundImageSize: 'cover',
    backgroundImagePosition: 'center',
    spacingPadding: { top: '0', right: '80', bottom: '0', left: '144' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'ヒーローラッパー' }
  }, [heroContent]);

  // ============================================================
  // ルート：loos/full-wide（全幅・ネイビー地フォールバック）
  // bgColor は写真未読込時の地（白回避）。className:'sec-hero'。
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: '#131c30',
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-hero',
      metadata: { name: 'Sec.HERO' }
    }, [heroWrapper])
  ];

  return wp.blocks.serialize(tree);
})()
