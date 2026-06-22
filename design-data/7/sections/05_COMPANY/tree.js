(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント ----
  const SERIF = "'Noto Serif JP', serif";    // 見出し（COMPANY）
  const SANS  = "'Noto Sans JP', sans-serif"; // 小見出し・定義リスト・ボタン

  // ============================================================
  // 定義リスト 1行（term:96px固定 + detail:flex1）
  //   term   : 太字ラベル（会社名 等 / Sans Bold 14/20 ls0.05em / #e5e7eb / nowrap）
  //   detail : 値（全角コロン始まり原文ママ / Sans Regular 14/lh / #e5e7eb）
  //   lh     : detail の line-height（所在地のみ 22.75px、他は 20px）
  //   各行: row / py12 / gap0
  // ============================================================
  const dlRow = (term, detail, lh) =>
    C('flavor/universal-block', {
      layoutDirection: 'row',
      layoutJustify: 'flex-start',
      layoutAlign: 'flex-start',
      spacingGap: '0', spacingGapUnit: 'px',
      sizeWidth: '100', sizeWidthUnit: '%',
      spacingPadding: { top: '12', right: '0', bottom: '12', left: '0' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false,
      metadata: { name: '定義行 ' + term }
    }, [
      // Term（幅96px固定）
      C('flavor/universal-block', {
        sizeWidth: '96', sizeWidthUnit: 'px'
      }, [
        C('core/paragraph', {
          content: term,
          style: {
            color: { text: '#e5e7eb' },
            typography: {
              fontFamily: SANS, fontSize: '14px', fontStyle: 'normal',
              fontWeight: '700', lineHeight: '20px', letterSpacing: '0.05em'
            }
          }
        })
      ]),
      // Detail（残り flex 1）
      C('flavor/universal-block', {
        flexShorthand: '1'
      }, [
        C('core/paragraph', {
          content: detail,
          style: {
            color: { text: '#e5e7eb' },
            typography: {
              fontFamily: SANS, fontSize: '14px', fontStyle: 'normal',
              fontWeight: '400', lineHeight: lh
            }
          }
        })
      ])
    ]);

  // ============================================================
  // 見出しブロック（COMPANY ゴールド + 会社概要 グレー小 / 縦 gap8）
  // ============================================================
  const headingBlock = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    spacingGap: '8', spacingGapUnit: 'px',
    sizeWidth: '100', sizeWidthUnit: '%',
    metadata: { name: '見出しブロック' }
  }, [
    // 大見出し COMPANY（ゴールド #c5a059 / Serif SemiBold 36/40 / ls 3.6px=0.1em）
    C('core/heading', {
      level: 2,
      className: 'is-style-section_ttl',  // SWELL h2装飾の中和
      content: 'COMPANY',
      style: {
        color: { text: '#c5a059' },
        elements: { link: { color: { text: '#c5a059' } } },
        typography: {
          fontFamily: SERIF, fontSize: '36px', fontStyle: 'normal',
          fontWeight: '600', lineHeight: '40px', letterSpacing: '0.1em'
        }
      }
    }),
    // 小見出し 会社概要（グレー #9ca3af / Sans Regular 12/16 / ls 1.2px=0.1em）
    C('core/paragraph', {
      content: '会社概要',
      style: {
        color: { text: '#9ca3af' },
        typography: {
          fontFamily: SANS, fontSize: '12px', fontStyle: 'normal',
          fontWeight: '400', lineHeight: '16px', letterSpacing: '0.1em'
        }
      }
    })
  ]);

  // ============================================================
  // 左カラム（width440 / 縦中央寄せ / pr32）
  //   ├ 定義リスト枠（pb40・w408・縦・gap0）
  //   └ CTAボタン（会社概要を見る → / #c5a059・白・角丸0 → /company/）
  // ============================================================
  const dlBlock = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    spacingGap: '0', spacingGapUnit: 'px',
    sizeWidth: '408', sizeWidthUnit: 'px',
    spacingPadding: { top: '0', right: '0', bottom: '40', left: '0' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: '定義リスト' }
  }, [
    dlRow('会社名', '：株式会社ASTERRA Corporation', '20px'),
    dlRow('代表者', '：田中 太郎', '20px'),
    dlRow('所在地', '：東京都港区南青山2丁目5-10-0', '22.75px'), // 所在地のみ行高22.75px
    dlRow('TEL', '：03-5678-2000', '20px'),
    dlRow('免許', '：東京都知事（1）第123456号', '20px')
  ]);

  // CTAボタン（ゴールド #c5a059・白文字・角丸0・py16/px40 / ラベル+矢印gap16px）
  const ctaButton = C('core/buttons', {
    layout: { type: 'flex', justifyContent: 'left' }
  }, [
    C('core/button', {
      text: '会社概要を見る&nbsp;&nbsp;&nbsp;&nbsp;→',
      url: '/company/',
      style: {
        color: { background: '#c5a059', text: '#ffffff' },
        border: { radius: '0px' },
        spacing: { padding: { top: '16px', right: '40px', bottom: '16px', left: '40px' } },
        typography: {
          fontFamily: SANS, fontSize: '14px', fontStyle: 'normal',
          fontWeight: '400', lineHeight: '20px', letterSpacing: '0.1em'
        }
      }
    })
  ]);

  const leftCol = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'center',
    layoutAlign: 'flex-start',
    spacingGap: '0', spacingGapUnit: 'px',
    sizeWidth: '440', sizeWidthUnit: 'px',
    spacingPadding: { top: '0', right: '32', bottom: '0', left: '0' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: '左カラム' }
  }, [dlBlock, ctaButton]);

  // ============================================================
  // 右カラム（width616 / minHeight400 / relative）
  //   ├ 大画像 オフィス外観（616×400・cover）
  //   ├ 小画像 左 オフィス内観（absolute / bottom-60 left-78 / 277×150・白枠）
  //   └ 小画像 右 会議室   （absolute / bottom-59 right-112 / 277×150・白枠）
  //   ※ 小画像の box-shadow（shadow-xl）は属性表現不可 → 要CSS報告
  // ============================================================
  const bigImage = C('core/image', {
    id: 23,
    url: 'http://localhost:8918/wp-content/uploads/2026/06/company-office-exterior.jpg',
    alt: 'オフィス外観',
    sizeSlug: 'full',
    width: '616px',
    height: '400px',
    scale: 'cover',
    style: { border: { radius: '0px' } },
    metadata: { name: '大画像 オフィス外観' }
  });

  // 小画像 左（オフィス内観）— 大画像の左下に重なり：left -78 / bottom -60
  const smallLeft = C('flavor/universal-block', {
    positionType: 'absolute',
    positionBottom: '-60', positionBottomUnit: 'px',
    positionLeft: '-78', positionLeftUnit: 'px',
    sizeWidth: '277', sizeWidthUnit: 'px',
    sizeHeight: '150', sizeHeightUnit: 'px',
    metadata: { name: '小画像L オフィス内観' }
  }, [
    C('core/image', {
      id: 24,
      url: 'http://localhost:8918/wp-content/uploads/2026/06/company-office-interior.png',
      alt: 'オフィス内観',
      sizeSlug: 'full',
      width: '277px',
      height: '150px',
      scale: 'cover',
      // 白枠 1px solid rgba(255,255,255,0.1)（影 shadow-xl は属性不可→要CSS）
      style: { border: { width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)', radius: '0px' } }
    })
  ]);

  // 小画像 右（会議室）— 大画像の右下に重なり：right -112 / bottom -59
  const smallRight = C('flavor/universal-block', {
    positionType: 'absolute',
    positionBottom: '-59', positionBottomUnit: 'px',
    positionRight: '-112', positionRightUnit: 'px',
    sizeWidth: '277', sizeWidthUnit: 'px',
    sizeHeight: '150', sizeHeightUnit: 'px',
    metadata: { name: '小画像R 会議室' }
  }, [
    C('core/image', {
      id: 25,
      url: 'http://localhost:8918/wp-content/uploads/2026/06/company-meeting-room.png',
      alt: '会議室',
      sizeSlug: 'full',
      width: '277px',
      height: '150px',
      scale: 'cover',
      // 白枠 1px solid rgba(255,255,255,0.1)（影 shadow-xl は属性不可→要CSS）
      style: { border: { width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)', radius: '0px' } }
    })
  ]);

  const rightCol = C('flavor/universal-block', {
    positionType: 'relative',
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    spacingGap: '0', spacingGapUnit: 'px',
    sizeWidth: '616', sizeWidthUnit: 'px',
    sizeMinHeight: '400', sizeMinHeightUnit: 'px',
    metadata: { name: '右カラム' }
  }, [bigImage, smallLeft, smallRight]);

  // ============================================================
  // 2カラム行（row / gap32 / align flex-start / w100%）
  // ============================================================
  const columnsRow = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    spacingGap: '32', spacingGapUnit: 'px',
    sizeWidth: '100', sizeWidthUnit: '%',
    metadata: { name: '2カラム行' }
  }, [leftCol, rightCol]);

  // ============================================================
  // コンテナ（width1152・中央寄せ・縦 gap64・py128/px32・relative）
  //   relative は背景透かし文字の絶対配置基準（透かしは要CSSのため未配置）
  // ============================================================
  const container = C('flavor/universal-block', {
    positionType: 'relative',
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1152', sizeMaxWidthUnit: 'px',
    spacingGap: '64', spacingGapUnit: 'px',
    spacingPadding: { top: '128', right: '32', bottom: '128', left: '32' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    metadata: { name: 'コンテナ' }
  }, [headingBlock, columnsRow]);

  // ============================================================
  // ルート：loos/full-wide（全幅・ネイビー地 #0a192f）
  //   ※ 背景透かし文字「ASTERRA CORPORATION」はコンテナ外への breakout
  //     （セクション左端 -5.55px / 右へ約357pxはみ出し）と 1803px幅 nowrap の
  //     overflow クリップが属性で表現不可 → 本ツリーに含めず（要CSS報告）
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: '#0a192f',
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-company',
      metadata: { name: 'Sec.COMPANY' }
    }, [container])
  ];

  return wp.blocks.serialize(tree);
})()
