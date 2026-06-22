(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント ──
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // ── ニュース項目（1件）──
  // Component 6（下罫線つきラッパ pb=1px相当）の中に Component 5（py=20px の行）
  // 行内: Time列(128px固定) / タイトル(伸縮・pr16) / 矢印(shrink-0)
  const newsItem = (date, title) =>
    C('flavor/universal-block', {
      metadata: { name: 'NewsItem' },
      layoutDirection: 'row',
      layoutAlign: 'center',
      sizeWidth: '100', sizeWidthUnit: '%',
      spacingPadding: { top: '20', right: '0', bottom: '20', left: '0' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
      style: { border: { bottom: { color: '#e5e7eb', width: '1px', style: 'solid' } } },
    }, [
      // Time列（128px固定・Noto Serif JP Bold）
      C('flavor/universal-block', {
        metadata: { name: 'Time' },
        layoutDirection: 'column',
        sizeWidth: '128', sizeWidthUnit: 'px',
        spacingGap: '0', spacingGapUnit: 'px',
      }, [
        C('core/paragraph', {
          content: date,
          style: {
            color: { text: '#111827' },
            typography: { fontFamily: SERIF, fontSize: '14px', fontStyle: 'normal', fontWeight: '700', lineHeight: '20px', letterSpacing: '0.1em' },
          },
        }),
      ]),
      // タイトル（伸縮・pr16・Noto Sans JP Regular）
      C('flavor/universal-block', {
        metadata: { name: 'Title' },
        layoutDirection: 'column',
        flexShorthand: '1',
        spacingPadding: { top: '0', right: '16', bottom: '0', left: '0' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingGap: '0', spacingGapUnit: 'px',
      }, [
        C('core/paragraph', {
          content: title,
          style: {
            color: { text: '#1f2937' },
            typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '400', lineHeight: '20px' },
          },
        }),
      ]),
      // 矢印（右端・shrink-0・薄グレー）
      C('flavor/universal-block', {
        metadata: { name: 'Arrow' },
        layoutDirection: 'column',
        flexShorthand: '0',
      }, [
        C('core/paragraph', {
          content: '→',
          style: {
            color: { text: '#9ca3af' },
            typography: { fontFamily: SANS, fontSize: '12px', fontWeight: '400', lineHeight: '16px' },
          },
        }),
      ]),
    ]);

  const tree = [
    C('loos/full-wide', {
      bgColor: '#ffffff',
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-news',
      metadata: { name: 'Sec.NEWS' },
    }, [
      // 内側コンテナ：最大幅1152・中央寄せ・縦積み（ヘッダー → 本体）gap=64
      C('flavor/universal-block', {
        metadata: { name: 'NEWS Inner' },
        layoutDirection: 'column',
        sizeWidth: '100', sizeWidthUnit: '%',
        sizeMaxWidth: '1152',
        spacingPadding: { top: '76', right: '32', bottom: '128', left: '32' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
        spacingGap: '64', spacingGapUnit: 'px',
      }, [

        // ── ヘッダー（NEWS / お知らせ）gap=8 ──
        C('flavor/universal-block', {
          metadata: { name: 'Header' },
          layoutDirection: 'column',
          spacingGap: '8', spacingGapUnit: 'px',
        }, [
          C('core/heading', {
            level: 2,
            content: 'NEWS',
            className: 'is-style-section_ttl',
            style: {
              color: { text: '#c5a059' },
              elements: { link: { color: { text: '#c5a059' } } },
              typography: { fontFamily: SERIF, fontSize: '36px', fontWeight: '600', lineHeight: '40px', letterSpacing: '0.1em' },
            },
          }),
          C('core/paragraph', {
            content: 'お知らせ',
            style: {
              color: { text: '#1f2937' },
              typography: { fontFamily: SANS, fontSize: '12px', fontWeight: '400', lineHeight: '16px', letterSpacing: '0.1em' },
            },
          }),
        ]),

        // ── 本体2カラム（左=画像 / 右=リスト＋ボタン）gap=48 ──
        C('flavor/universal-block', {
          metadata: { name: 'Body' },
          layoutDirection: 'row',
          layoutAlign: 'flex-start',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingGap: '48', spacingGapUnit: 'px',
        }, [

          // 左：画像コンポジション（relative 親 432×320、小画像 absolute）
          C('flavor/universal-block', {
            metadata: { name: 'ImageComposition' },
            positionType: 'relative',
            flexShorthand: '0 0 auto',
            sizeWidth: '432', sizeWidthUnit: 'px',
            sizeHeight: '320', sizeHeightUnit: 'px',
          }, [
            // 大画像（ベース・432×320 cover）
            C('core/image', {
              id: 8,
              url: 'http://localhost:8918/wp-content/uploads/2026/06/news-image-large.png',
              alt: '物件外観',
              sizeSlug: 'full',
              width: '432px', height: '320px', scale: 'cover',
            }),
            // 小画像（absolute・左カラム内 x=248 / y=160・白枠4px＋影）
            C('flavor/universal-block', {
              metadata: { name: '重なり小画像' },
              positionType: 'absolute',
              positionTop: '160', positionTopUnit: 'px',
              positionLeft: '248', positionLeftUnit: 'px',
              sizeWidth: '216', sizeWidthUnit: 'px',
              sizeHeight: '192', sizeHeightUnit: 'px',
              spacingPadding: { top: '4', right: '4', bottom: '4', left: '4' }, spacingPaddingUnit: 'px', spacingPaddingLinked: true,
              style: { color: { background: '#ffffff' } },
            }, [
              C('core/image', {
                id: 9,
                url: 'http://localhost:8918/wp-content/uploads/2026/06/news-image-small.png',
                alt: '室内インテリア',
                sizeSlug: 'full',
                width: '208px', height: '184px', scale: 'cover',
              }),
            ]),
          ]),

          // 右：NEWSリスト＋ボタン（pl=40・縦積み gap=40）
          C('flavor/universal-block', {
            metadata: { name: 'NewsRight' },
            layoutDirection: 'column',
            flexShorthand: '1',
            spacingPadding: { top: '0', right: '0', bottom: '0', left: '40' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
            spacingGap: '40', spacingGapUnit: 'px',
          }, [
            // リスト本体（上端に濃ネイビー2px太線）
            C('flavor/universal-block', {
              metadata: { name: 'NewsList' },
              layoutDirection: 'column',
              sizeWidth: '100', sizeWidthUnit: '%',
              spacingGap: '0', spacingGapUnit: 'px',
              style: { border: { top: { color: '#1e2c5b', width: '2px', style: 'solid' } } },
            }, [
              newsItem('2026.05.10', 'ホームページをリニューアルしました'),
              newsItem('2026.04.01', '新築分譲マンション「ASTERRA RESIDENCE」販売開始'),
              newsItem('2026.03.01', '不動産サイトに新規物件を追加しました'),
            ]),
            // ボタン行（「全てを見る →」/news/）
            C('flavor/universal-block', {
              metadata: { name: 'ButtonRow' },
              layoutDirection: 'row',
              spacingGap: '0', spacingGapUnit: 'px',
            }, [
              C('core/buttons', {}, [
                C('core/button', {
                  text: '全てを見る　→',
                  url: '/news/',
                  width: undefined,
                  style: {
                    color: { background: '#1e2c5b', text: '#ffffff' },
                    border: { radius: '0px' },
                    spacing: { padding: { top: '16px', right: '48px', bottom: '16px', left: '48px' } },
                    typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '400', lineHeight: '20px', letterSpacing: '0.1em' },
                  },
                }),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ];

  return wp.blocks.serialize(tree);
})()
