// ページID 31 / セクション「01 Philosophy」（Section - 01 Philosophy）
// root: loos/full-wide className:'sec-philosophy'（白背景）
// 左=写真3枚コンポジション（負方向食い出し＋drop-shadow / positionType:absolute・親relative）
// 右=「01 / Our Philosophy」ラベル＋H2＋横罫＋本文2段落
// ブロックツリーJSON → wp.blocks.serialize（手書きマークアップ無し）
(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  const NOTO_SERIF = "'Noto Serif JP', serif";
  const NOTO_SANS  = "'Noto Sans JP', sans-serif";
  const JOST       = "'Jost', sans-serif";
  const GOLD       = '#c5a86d';   // color/orange/60（実値。指示の #c5a059 ではなく datapack 採用値）
  const H2_COLOR   = '#333333';   // color/grey/20
  const BODY_COLOR = '#666666';   // color/grey/40
  const BASE_BG    = '#f2f2f2';   // color/grey/95（写真土台ボックス）
  const SHADOW     = 'custom:-10px 10px 15px rgba(0,0,0,0.25)';
  const UP         = 'http://localhost:8918/wp-content/uploads/2026/06';

  // ── 右テキスト群（絶対配置: left 711 / top 58。top:58 がカード内の正位置なので translateY は付けない）──
  const textCol = C('flavor/universal-block', {
    positionType: 'absolute',
    positionLeft: '711', positionLeftUnit: 'px',
    positionTop: '58',  positionTopUnit: 'px',
    layoutDirection: 'column', layoutAlign: 'flex-start',
    sizeWidth: '530.75', sizeWidthUnit: 'px',
    spacingGap: '25', spacingGapUnit: 'px',
    metadata: { name: 'Philosophy Text' }
  }, [
    // ラベル行（01 + OUR PHILOSOPHY）横並び items-center
    C('flavor/universal-block', {
      layoutDirection: 'row', layoutAlign: 'center',
      sizeWidth: '100', sizeWidthUnit: '%',
      spacingGap: '20', spacingGapUnit: 'px'
    }, [
      C('core/heading', {
        level: 2, className: 'is-style-section_ttl', content: '01',
        style: {
          color: { text: GOLD },
          elements: { link: { color: { text: GOLD } } },
          typography: { fontFamily: NOTO_SERIF, fontSize: '40px', fontWeight: '500', lineHeight: '40px', letterSpacing: '1.28px' }
        }
      }),
      C('core/paragraph', {
        content: 'OUR PHILOSOPHY',
        style: {
          color: { text: GOLD },
          typography: { fontFamily: JOST, fontSize: '13px', fontWeight: '500', lineHeight: '26px', letterSpacing: '1.95px', textTransform: 'uppercase' }
        }
      })
    ]),
    // H2見出し（2行 / ⏎=<br>）
    C('core/heading', {
      level: 2, className: 'is-style-section_ttl', textAlign: 'left',
      content: '一度のお取引で終わらない、<br>信頼関係を大切に。',
      style: {
        color: { text: H2_COLOR },
        elements: { link: { color: { text: H2_COLOR } } },
        typography: { fontFamily: NOTO_SERIF, fontSize: '32px', fontWeight: '500', lineHeight: '48px', letterSpacing: '1.28px' }
      }
    }),
    // 横罫（40 × 1px・ゴールド塗り）= UBを幅40/高さ1/bgで表現
    C('flavor/universal-block', {
      sizeWidth: '40', sizeWidthUnit: 'px',
      sizeHeight: '1', sizeHeightUnit: 'px',
      bgColor: GOLD,
      style: { color: { background: GOLD } }
    }, []),
    // 本文 第1段落（3行・上マージン 8.935px）
    // ※ core/paragraph の spacing 拡張は margin のみ対応（padding 未登録）のため
    //   上アキは paraSpacingMargin で表現（背景/枠が無いため padding と視覚等価）
    C('core/paragraph', {
      content: '私たちは、お客様一人ひとりの人生に寄り添い、<br>さまざまな課題やお悩みに対して最適な解決策をご提案できる<br>存在でありたいと考えています。',
      paraSpacingMargin: { top: '8.935' }, paraSpacingMarginUnit: 'px', paraSpacingMarginLinked: false,
      style: {
        color: { text: BODY_COLOR },
        typography: { fontFamily: NOTO_SANS, fontSize: '14.5px', fontWeight: '400', lineHeight: '30.45px', letterSpacing: '1.28px' }
      }
    }),
    // 本文 第2段落（3行・段落間 gap 29.75px は上マージンで表現）
    C('core/paragraph', {
      content: 'そのため、一度のお取引で終わる関係ではなく、<br>その先も長く信頼していただけるパートナーとして、<br>お客様を支え続けることを大切にしております。',
      paraSpacingMargin: { top: '29.75' }, paraSpacingMarginUnit: 'px', paraSpacingMarginLinked: false,
      style: {
        color: { text: BODY_COLOR },
        typography: { fontFamily: NOTO_SANS, fontSize: '14.5px', fontWeight: '400', lineHeight: '30.45px', letterSpacing: '1.28px' }
      }
    })
  ]);

  // ── 左・営業写真（縦長 / 絶対配置: left -51 / top -74 / 342×553 / cover / drop-shadow）──
  const salesPhoto = C('core/image', {
    id: 37, url: UP + '/philosophy-sales-photo.png', alt: '営業担当の写真', sizeSlug: 'full', scale: 'cover',
    imgPositionType: 'absolute',
    imgPositionLeft: '-51', imgPositionLeftUnit: 'px',
    imgPositionTop: '-74',  imgPositionTopUnit: 'px',
    imgSizeWidth: '342', imgSizeWidthUnit: 'px',
    imgSizeHeight: '553', imgSizeHeightUnit: 'px',
    imgBoxShadow: SHADOW
  });

  // ── 右・縦2分割写真（建物 + 家族 / 絶対配置: left 298 / top -74 / 342幅 / column gap 8 / drop-shadow）──
  const stackPhotos = C('flavor/universal-block', {
    positionType: 'absolute',
    positionLeft: '298', positionLeftUnit: 'px',
    positionTop: '-74',  positionTopUnit: 'px',
    layoutDirection: 'column',
    sizeWidth: '342', sizeWidthUnit: 'px',
    spacingGap: '8', spacingGapUnit: 'px',
    boxShadow: SHADOW,
    metadata: { name: 'Philosophy Stack Photos' }
  }, [
    C('core/image', {
      id: 38, url: UP + '/philosophy-building-photo.png', alt: '建物の写真', sizeSlug: 'full', scale: 'cover',
      imgSizeWidth: '342', imgSizeWidthUnit: 'px',
      imgSizeHeight: '273', imgSizeHeightUnit: 'px'
    }),
    C('core/image', {
      id: 39, url: UP + '/philosophy-family-photo.png', alt: '家族の写真', sizeSlug: 'full', scale: 'cover',
      imgSizeWidth: '342', imgSizeWidthUnit: 'px',
      imgSizeHeight: '272', imgSizeHeightUnit: 'px'
    })
  ]);

  // ── 写真土台ボックス（1280×550 / bg #f2f2f2 / relative）= 絶対配置の基準 ──
  const baseBox = C('flavor/universal-block', {
    className: 'philosophy-graybox',
    positionType: 'relative',
    sizeWidth: '1280', sizeWidthUnit: 'px',
    sizeHeight: '550',  sizeHeightUnit: 'px',
    sizeMaxWidth: '100', sizeMaxWidthUnit: '%',
    bgColor: BASE_BG,
    style: { color: { background: BASE_BG } },
    metadata: { name: 'Philosophy Base Box' }
  }, [ salesPhoto, stackPhotos, textCol ]);

  // ── 内側コンテナ（中央寄せ / 上下130px・左右160px）──
  const inner = C('flavor/universal-block', {
    layoutDirection: 'column', layoutJustify: 'center', layoutAlign: 'center',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1440', sizeMaxWidthUnit: 'px',
    spacingPadding: { top: '130', right: '160', bottom: '130', left: '160' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    spacingMargin: { right: 'auto', left: 'auto' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
    metadata: { name: 'Philosophy Inner' }
  }, [ baseBox ]);

  const tree = [
    C('loos/full-wide', {
      className: 'sec-philosophy',
      bgColor: '#ffffff',
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      metadata: { name: 'Sec.Philosophy' }
    }, [ inner ])
  ];

  return wp.blocks.serialize(tree);
})()
