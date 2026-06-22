(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // 共通フォント
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // アセット（design-data §5 のguid実値・base http://localhost:8918）
  const IMG_BUILDING = 'http://localhost:8918/wp-content/uploads/2026/06/asterrra_about_building.png'; // ID12
  const IMG_SKYLINE  = 'http://localhost:8918/wp-content/uploads/2026/06/asterrra_about_card_skyline.png'; // ID13
  const IMG_LOGO     = 'http://localhost:8918/wp-content/uploads/2026/06/asterrra_about_logo.png'; // ID14

  const tree = [
    // ───────── セクション（白背景・full-wide・padding0） ─────────
    C('loos/full-wide', {
      bgColor: '#ffffff',
      contentSize: 'full',
      pcPadding: '0',
      spPadding: '0',
      className: 'sec-about',
      metadata: { name: 'Sec.ABOUT' }
    }, [
      // コンテナ（width1152・中央寄せ・縦並び gap64・padding py128 px32）
      C('flavor/universal-block', {
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
      }, [
        // ① 見出しブロック（縦・左寄せ・gap8）
        C('flavor/universal-block', {
          layoutDirection: 'column',
          layoutJustify: 'flex-start',
          layoutAlign: 'flex-start',
          spacingGap: '8', spacingGapUnit: 'px',
          metadata: { name: '見出しブロック' }
        }, [
          // 大見出し ABOUT US（ゴールド #c5a059・Noto Serif JP SemiBold 36/40・ls 3.6px=0.1em）
          // is-style-section_ttl: SWELLのh2デフォルトベタ塗り装飾を抑止（既存セクション見出しと統一）
          C('core/heading', {
            level: 2,
            content: 'ABOUT US',
            className: 'is-style-section_ttl',
            style: {
              color: { text: '#c5a059' },
              elements: { link: { color: { text: '#c5a059' } } },
              typography: {
                fontFamily: SERIF,
                fontSize: '36px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: '40px',
                letterSpacing: '0.1em'
              }
            }
          }),
          // 小見出し 代表挨拶（ダークグレー #1f2937・Noto Sans JP Regular 12/16・ls 1.2px=0.1em）
          C('core/paragraph', {
            content: '代表挨拶',
            style: {
              color: { text: '#1f2937' },
              typography: {
                fontFamily: SANS,
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '16px',
                letterSpacing: '0.1em'
              }
            }
          })
        ]),

        // ② 重なりエリア（relative・幅100%・高さ466px）
        //    左建物写真(absolute left0 top159) と 右カード(absolute right0 top0) が水平72px重なる
        C('flavor/universal-block', {
          positionType: 'relative',
          sizeWidth: '100', sizeWidthUnit: '%',
          sizeHeight: '466', sizeHeightUnit: 'px',
          metadata: { name: '重なりエリア' }
        }, [
          // 左 建物写真（596×397・角丸10px・cover）
          //   コンテナ左端より左へはみ出す装飾。重なりエリアの top は 159px(=写真section内284 − カードsection内125)
          C('flavor/universal-block', {
            metadata: { name: '左建物写真' },
            positionType: 'absolute',
            positionLeft: '-20', positionLeftUnit: 'px',
            positionTop: '159', positionTopUnit: 'px',
            sizeWidth: '596', sizeWidthUnit: 'px'
          }, [
            C('core/image', {
              id: 12,
              url: IMG_BUILDING,
              alt: 'モダンな平屋建築・ガラス張りエントランス',
              sizeSlug: 'full',
              width: '596px',
              height: '397px',
              scale: 'cover',
              style: { border: { radius: '10px' } }
            })
          ]),

          // 右 メッセージカード（668×466・skyline背景＋navy 80%オーバーレイ・前面）
          C('flavor/universal-block', {
            metadata: { name: 'メッセージカード' },
            positionType: 'absolute',
            positionRight: '0', positionRightUnit: 'px',
            positionTop: '0', positionTopUnit: 'px',
            sizeWidth: '668', sizeWidthUnit: 'px',
            sizeHeight: '466', sizeHeightUnit: 'px',
            layoutDirection: 'column',
            layoutJustify: 'flex-start',
            layoutAlign: 'flex-start',
            spacingGap: '16', spacingGapUnit: 'px',
            spacingPadding: { top: '64', right: '64', bottom: '64', left: '64' },
            spacingPaddingUnit: 'px', spacingPaddingLinked: false,
            // 背景画像（skyline cover/center）＋ navy オーバーレイ rgba(10,25,47,0.8)
            backgroundImageUrl: IMG_SKYLINE,
            backgroundImageId: 13,
            backgroundImageSize: 'cover',
            backgroundImagePosition: 'center',
            backgroundOverlayColor: '#0a192f',
            backgroundOverlayOpacity: '80'
          }, [
            // ASTERRA ロゴ（152×116）
            C('core/image', {
              id: 14,
              url: IMG_LOGO,
              alt: 'ASTERRA Corporation ロゴ',
              sizeSlug: 'full',
              width: '152px',
              height: '116px'
            }),

            // カード見出し（ゴールド #c5a059・Noto Serif JP Bold 32/44・ls 0.7px≒0.022em・字下げ＋強制改行）
            C('core/heading', {
              level: 3,
              content: '　　変わりゆく時代に、<br>　　　　　変わらぬ安心を。',
              style: {
                color: { text: '#c5a059' },
                elements: { link: { color: { text: '#c5a059' } } },
                typography: {
                  fontFamily: SERIF,
                  fontSize: '32px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '44px',
                  letterSpacing: '0.022em'
                }
              }
            }),

            // カード本文（白 #ffffff・Noto Sans JP Regular 16/29・ls 0.7px≒0.044em・2段落）
            C('core/paragraph', {
              content: '私たちは、お客様一人ひとりの人生に寄り添い、さまざまな課題やお悩みに対し、最適な解決策をご提案できる存在でありたいと考えています。',
              style: {
                color: { text: '#ffffff' },
                typography: {
                  fontFamily: SANS,
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '29px',
                  letterSpacing: '0.044em'
                }
              }
            }),
            C('core/paragraph', {
              content: '信頼を積み重ね、住まいの購入・売却など、人生のさまざまな場面で変わられる志に対し、お客様のご期待に沿ったご提案でサポートを行います。',
              style: {
                color: { text: '#ffffff' },
                typography: {
                  fontFamily: SANS,
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '29px',
                  letterSpacing: '0.044em'
                }
              }
            }),

            // 会社概要を見る → ボタン（透明背景・白枠1px・白文字・角丸0・/company/）
            C('core/buttons', {
              layout: { type: 'flex', justifyContent: 'left' }
            }, [
              C('core/button', {
                text: '会社概要を見る →',
                url: '/company/',
                style: {
                  color: { text: '#ffffff', background: 'rgba(255,255,255,0)' },
                  border: { width: '1px', color: '#ffffff', radius: '0px' },
                  spacing: {
                    padding: { top: '16px', right: '40px', bottom: '16px', left: '40px' }
                  },
                  typography: {
                    fontFamily: SANS,
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '20px',
                    letterSpacing: '0.1em'
                  }
                }
              })
            ])
          ])
        ])
      ])
    ])
  ];

  return wp.blocks.serialize(tree);
})()
