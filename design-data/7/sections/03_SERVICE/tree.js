(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // 共通フォント
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // ─────────────────────────────────────────────
  // カード生成ヘルパー
  //   imgId/imgUrl : カード上部画像（254×162, cover, 1px #d9d9d9）
  //   iconId/iconUrl/iconW : 右上 absolute 白アイコン
  //   iconTop/iconRight : カード本体ローカル座標での絶対配置
  //   title : 見出し（<br> 可・level 3・白）
  //   desc  : 説明文 paragraph（<br> 可・白）
  // ─────────────────────────────────────────────
  const card = (name, imgId, imgUrl, imgAlt, iconId, iconUrl, iconAlt, iconW, iconH, iconTop, iconRight, title, desc) =>
    C('flavor/universal-block', {
      layoutDirection: 'column',
      layoutJustify: 'flex-start',
      layoutAlign: 'stretch',
      sizeWidth: '254', sizeWidthUnit: 'px',
      spacingGap: '0', spacingGapUnit: 'px',
      metadata: { name }
    }, [
      // 上部画像（254×162・cover・1px #d9d9d9）
      C('core/image', {
        id: imgId,
        url: imgUrl,
        alt: imgAlt,
        sizeSlug: 'full',
        width: '254px',
        height: '162px',
        scale: 'cover',
        style: { border: { width: '1px', color: '#d9d9d9' } }
      }),
      // 下部ネイビーカード本体（254×179・#1e2c5b・1px #d9d9d9・padding33・relative）
      C('flavor/universal-block', {
        positionType: 'relative',
        layoutDirection: 'column',
        layoutJustify: 'flex-start',
        layoutAlign: 'center',
        sizeWidth: '254', sizeWidthUnit: 'px',
        sizeHeight: '179', sizeHeightUnit: 'px',
        spacingGap: '16', spacingGapUnit: 'px',
        spacingPadding: { top: '33', right: '33', bottom: '33', left: '33' },
        spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        style: {
          color: { background: '#1e2c5b' },
          border: { width: '1px', color: '#d9d9d9' }
        }
      }, [
        // 右上 absolute 白アイコン
        C('flavor/universal-block', {
          metadata: { name: 'アイコン' },
          positionType: 'absolute',
          positionTop: String(iconTop), positionTopUnit: 'px',
          positionRight: String(iconRight), positionRightUnit: 'px',
          sizeWidth: String(iconW), sizeWidthUnit: 'px'
        }, [
          C('core/image', {
            id: iconId,
            url: iconUrl,
            alt: iconAlt,
            sizeSlug: 'full',
            width: iconW + 'px',
            height: iconH + 'px'
          })
        ]),
        // カード見出し（level 3・白・Noto Sans Bold 14/20・ls 1.4px=0.1em・center）
        C('core/heading', {
          level: 3,
          textAlign: 'center',
          content: title,
          style: {
            color: { text: '#ffffff' },
            elements: { link: { color: { text: '#ffffff' } } },
            typography: {
              fontFamily: SANS,
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '20px',
              letterSpacing: '0.1em'
            }
          }
        }),
        // カード説明文（白・Noto Sans Regular 12/19.5・center）
        C('core/paragraph', {
          align: 'center',
          content: desc,
          style: {
            color: { text: '#ffffff' },
            typography: {
              fontFamily: SANS,
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '19.5px'
            }
          }
        })
      ])
    ]);

  const tree = [
    C('loos/full-wide', {
      bgColor: '#0a192f',
      contentSize: 'full',
      pcPadding: '0',
      spPadding: '0',
      className: 'sec-service',
      metadata: { name: 'Sec.SERVICE' }
    }, [
      // コンテナ（width1152・中央寄せ・縦並び gap40・内側padding-x32 / 上106・下128）
      C('flavor/universal-block', {
        layoutDirection: 'column',
        layoutJustify: 'flex-start',
        layoutAlign: 'center',
        sizeWidth: '100', sizeWidthUnit: '%',
        sizeMaxWidth: '1152', sizeMaxWidthUnit: 'px',
        spacingGap: '40', spacingGapUnit: 'px',
        spacingPadding: { top: '106', right: '32', bottom: '128', left: '32' },
        spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
        spacingMarginUnit: 'px', spacingMarginLinked: false,
        metadata: { name: 'コンテナ' }
      }, [
        // ① 見出しブロック（縦・center・gap8）
        C('flavor/universal-block', {
          layoutDirection: 'column',
          layoutJustify: 'flex-start',
          layoutAlign: 'center',
          spacingGap: '8', spacingGapUnit: 'px',
          sizeWidth: '100', sizeWidthUnit: '%',
          metadata: { name: '見出しブロック' }
        }, [
          // 大見出し SERVICE（ゴールド #c5a059・Noto Serif JP SemiBold 36/40・ls 3.6px=0.1em・center）
          C('core/heading', {
            level: 2,
            textAlign: 'center',
            content: 'SERVICE',
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
          // 小ラベル 事業内容（白・Noto Sans JP Regular 12/16・ls 1.2px=0.1em・center）
          C('core/paragraph', {
            align: 'center',
            content: '事業内容',
            style: {
              color: { text: '#ffffff' },
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

        // ② 導入テキスト（白・Noto Serif JP Regular 16/24・center・2行強制改行）
        C('core/paragraph', {
          align: 'center',
          content: '目先の利益や取引だけを追求するのではなく、その先にあるお客様の未来を見据え、<br>長期的な視点で価値あるサポートを提供いたします。',
          style: {
            color: { text: '#ffffff' },
            typography: {
              fontFamily: SERIF,
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '24px'
            }
          }
        }),

        // ③ カードグリッド（横並び・center・gap24・wrap無し）
        C('flavor/universal-block', {
          layoutDirection: 'row',
          layoutJustify: 'center',
          layoutAlign: 'flex-start',
          spacingGap: '24', spacingGapUnit: 'px',
          sizeWidth: '100', sizeWidthUnit: '%',
          metadata: { name: 'カードグリッド' }
        }, [
          // カード1: 不動産売買サポート（家＋きらめき 47×49.3 / top24 right25）
          card('カード1 不動産売買サポート',
            15, 'http://localhost:8918/wp-content/uploads/2026/06/service-card1-baibai.png', 'モダンな会社外装ビル',
            19, 'http://localhost:8918/wp-content/uploads/2026/06/service-icon1-baibai.png', '', '47', '49',
            24, 25,
            '不動産売買サポート',
            '居住用不動産から投資用不動産まで、<br>お客様のご希望に応じた<br>最適なご提案を行います。'),

          // カード2: 賃貸・管理サポート（書類＋盾 41×44.3 / top29.7 right28）
          card('カード2 賃貸・管理サポート',
            16, 'http://localhost:8918/wp-content/uploads/2026/06/service-card2-chintai.png', '戸建て住宅（青空）',
            20, 'http://localhost:8918/wp-content/uploads/2026/06/service-icon2-chintai.png', '', '41', '44',
            30, 28,
            '賃貸・管理サポート',
            '賃貸の仲介から管理業務まで<br>幅広くサポートいたします。'),

          // カード3: リフォーム リノベーション（ビル群＋新芽 51×58 / top22.7 right33）
          card('カード3 リフォームリノベーション',
            17, 'http://localhost:8918/wp-content/uploads/2026/06/service-card3-reform.png', 'リフォーム後の室内',
            21, 'http://localhost:8918/wp-content/uploads/2026/06/service-icon3-reform.png', '', '51', '58',
            23, 33,
            'リフォーム<br>リノベーション',
            '新たな価値を創造し、<br>未来につながる住まいづくりを<br>ご提案します。'),

          // カード4: 不動産コンサルティング（鍵を持つ手 51.4×41.8 / top29.7 right22）
          card('カード4 不動産コンサルティング',
            18, 'http://localhost:8918/wp-content/uploads/2026/06/service-card4-consulting.png', '打合せ/相談シーン',
            22, 'http://localhost:8918/wp-content/uploads/2026/06/service-icon4-consulting.png', '', '51', '42',
            30, 22,
            '不動産<br>コンサルティング',
            '市場分析や相続対策など、<br>幅広いご相談に<br>対応いたします。')
        ]),

        // ④ CTAボタン（事業内容一覧を見る → / #1e2c5b・白・角丸0・padding16/48 → /service/）
        C('core/buttons', {
          layout: { type: 'flex', justifyContent: 'center' }
        }, [
          C('core/button', {
            text: '事業内容一覧を見る →',
            url: '/service/',
            style: {
              color: { text: '#ffffff', background: '#1e2c5b' },
              border: { radius: '0px' },
              spacing: {
                padding: { top: '16px', right: '48px', bottom: '16px', left: '48px' }
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
  ];

  return wp.blocks.serialize(tree);
})()
