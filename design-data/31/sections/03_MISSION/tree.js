(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント（datapack §3） ----
  const SERIF = "'Noto Serif JP', serif";     // 見出し系（02 / H2見出し）
  const SANS  = "'Noto Sans JP', sans-serif";  // 本文・カード系
  const JOST  = "'Jost', sans-serif";          // ラベル「Our Mission」(欧文・uppercase)

  // ---- 共通カラー（datapack §3 実値・推定上書き禁止） ----
  const GOLD     = '#c5a86d';                  // 02 / OUR MISSION（color/orange/60 実値）
  const WHITE    = '#ffffff';                  // H2 / カード見出し・本文
  const WHITE_85 = 'rgba(255,255,255,0.85)';   // リード本文（白85%）
  const NAVY_BG  = '#0a192f';                   // セクション背景
  const CARD_BG  = '#1e2c5b';                   // テキストカード背景

  const baseUrl = 'http://localhost:8918/wp-content/uploads/2026/06/';
  const iconBase = 'http://localhost:8918/wp-content/uploads/icons/'; // 白アイコン(白化PNG)はここに配置

  // ─────────────────────────────────────────────
  // カード生成ヘルパー（トップSERVICEと同一デザイン・既存メディア再利用）
  //   imgId/imgUrl : カード上部画像（254×162・cover・1px #d9d9d9）
  //   iconId/iconUrl/iconW/iconH : 右上 absolute 白アイコン（flavor ラッパーで絶対配置・白化PNG icon-*-w.png in uploads/icons/）
  //   iconTop/iconRight : テキストカード本体ローカル座標での絶対配置(px)
  //   title : カード見出し（<br> 可・level 3・白・Noto Sans Bold 14/20）
  //   desc  : カード説明文 paragraph（<br> 可・白・Noto Sans Regular 12/19.5）
  // ─────────────────────────────────────────────
  const card = (name, imgId, imgFile, imgAlt, iconId, iconFile, iconW, iconH, iconTop, iconRight, title, desc) =>
    C('flavor/universal-block', {
      layoutDirection: 'column',
      layoutJustify: 'flex-start',
      layoutAlign: 'stretch',
      sizeWidth: '254', sizeWidthUnit: 'px',
      spacingGap: '0', spacingGapUnit: 'px',
      metadata: { name }
    }, [
      // 上部画像（254×162・cover・1px #d9d9d9）通常フロー
      C('core/image', {
        id: imgId,
        url: baseUrl + imgFile,
        alt: imgAlt,
        sizeSlug: 'full',
        width: '254px',
        height: '162px',
        scale: 'cover',
        style: { border: { width: '1px', color: '#d9d9d9' } }
      }),
      // 下部ネイビーカード本体（254×179・#1e2c5b・1px #d9d9d9・padding33・relative=アイコン基準）
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
          color: { background: CARD_BG },
          border: { width: '1px', color: '#d9d9d9' }
        }
      }, [
        // 右上 absolute 白アイコン（flavor ラッパーで絶対配置・白化PNG icon-*-w.png in uploads/icons/）
        C('flavor/universal-block', {
          metadata: { name: 'アイコン' },
          positionType: 'absolute',
          positionTop: String(iconTop), positionTopUnit: 'px',
          positionRight: String(iconRight), positionRightUnit: 'px',
          sizeWidth: String(iconW), sizeWidthUnit: 'px'
        }, [
          C('core/image', {
            id: iconId,
            url: iconBase + iconFile,
            alt: '',
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
            color: { text: WHITE },
            elements: { link: { color: { text: WHITE } } },
            typography: {
              fontFamily: SANS,
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '20px',
              letterSpacing: '0.1em' // 1.4px / 14px
            }
          }
        }),
        // カード説明文（白・Noto Sans Regular 12/19.5・ls 0・center）
        C('core/paragraph', {
          align: 'center',
          content: desc,
          style: {
            color: { text: WHITE },
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

  // ============================================================
  // ① ラベル行「02 / OUR MISSION」（横並び・items-center・ゴールド）
  // datapack §1：02 側に右padding 20px。「02」=Noto Serif JP Medium 40/40/1.28px(=0.032em)
  // 「Our Mission」=Jost Medium uppercase 13/26/1.95px(=0.15em)・CSS uppercase
  // ============================================================
  const label = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'center',
    layoutAlign: 'center',
    spacingGap: '0', spacingGapUnit: 'px',
    spacingPadding: { bottom: '20' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'ラベル行' }
  }, [
    // 02（ゴールド・大・右padding20）
    C('core/paragraph', {
      content: '02',
      style: {
        color: { text: GOLD },
        spacing: { padding: { right: '20px' } },
        typography: {
          fontFamily: SERIF,
          fontSize: '40px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '40px',
          letterSpacing: '0.032em' // 1.28px / 40px
        }
      },
      metadata: { name: 'ラベル_02' }
    }),
    // OUR MISSION（ゴールド・小・大文字。元テキスト "Our Mission" を uppercase 表記で保持）
    C('core/paragraph', {
      content: 'OUR MISSION',
      style: {
        color: { text: GOLD },
        typography: {
          fontFamily: JOST,
          fontSize: '13px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '26px',
          letterSpacing: '0.15em', // 1.95px / 13px
          textTransform: 'uppercase'
        }
      },
      metadata: { name: 'ラベル_Our Mission' }
    })
  ]);

  // ============================================================
  // ② H2見出し（白・Noto Serif JP Medium 34/51/1.28px=0.038em・center・1行）
  //   SWELL装飾中和のため is-style-section_ttl 付与。下margin35（datapack §1）。
  // ============================================================
  const h2 = C('core/heading', {
    level: 2,
    textAlign: 'center',
    className: 'is-style-section_ttl',
    content: '人生の大切な選択を、より良い未来へ導くために。',
    style: {
      color: { text: WHITE },
      elements: { link: { color: { text: WHITE } } },
      spacing: { margin: { top: '0px', bottom: '35px' } },
      typography: {
        fontFamily: SERIF,
        fontSize: '34px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '51px',
        letterSpacing: '0.038em' // 1.28px / 34px
      }
    },
    metadata: { name: 'H2見出し' }
  });

  // ============================================================
  // ③ リード本文（白85%・Noto Sans JP Light 15/33/1.28px=0.085em・center・max820・4行 <br>）
  //   max-width 820 は size 拡張（para プレフィックス）の paraSizeMaxWidth で表現。
  //   下margin75（datapack §1）。
  // ============================================================
  const lead = C('core/paragraph', {
    align: 'center',
    content: '人生には、資産形成、結婚、相続、住まいの購入や売却など、<br>多くの選択と決断が求められる場面があります。<br>私たちは常にお客様の立場に立ち、それぞれの状況や想いに真摯に向き合いながら、<br>最善の選択ができるようサポートしてまいります。',
    paraSizeMaxWidth: '820', paraSizeMaxWidthUnit: 'px',
    style: {
      color: { text: WHITE_85 },
      spacing: { margin: { top: '0px', bottom: '75px' } },
      typography: {
        fontFamily: SANS,
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: '300',
        lineHeight: '33px',
        letterSpacing: '0.085em' // 1.28px / 15px
      }
    },
    metadata: { name: 'リード本文' }
  });

  // ============================================================
  // ④ カードグリッド（横並び・center・gap24・254×4固定）
  // 既存メディアID 15-22 を再利用（新規importなし）。並びは売買→賃貸→リフォーム→コンサル。
  // アイコンサイズ/座標は datapack §4（マスクボックス→整数px丸め）。
  // ============================================================
  const grid = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'center',
    layoutAlign: 'flex-start',
    spacingGap: '24', spacingGapUnit: 'px',
    sizeWidth: '100', sizeWidthUnit: '%',
    metadata: { name: 'カードグリッド' }
  }, [
    // カード1: 不動産売買サポート（白アイコン 家＋きらめき icon-baibai-w ID19 / icon 47×49 / top22 right25）
    card('カード1 不動産売買サポート',
      15, 'service-card1-baibai.png', '不動産売買サポートの写真',
      19, 'icon-baibai-w.png', '47', '49', 22, 25,
      '不動産売買サポート',
      '居住用不動産から投資用不動産まで、<br>お客様のご希望に応じた<br>最適なご提案を行います。'),

    // カード2: 賃貸・管理サポート（白アイコン 書類＋盾 icon-chintai-w ID20 / icon 41×44 / top30 right26）
    card('カード2 賃貸・管理サポート',
      16, 'service-card2-chintai.png', '賃貸・管理サポートの写真',
      20, 'icon-chintai-w.png', '41', '44', 30, 26,
      '賃貸・管理サポート',
      '賃貸の仲介から管理業務まで<br>幅広くサポートいたします。'),

    // カード3: リフォーム リノベーション（白アイコン 新芽 icon-reform-w ID21 / icon 51×58 / top23 right33・見出し2行）
    card('カード3 リフォームリノベーション',
      17, 'service-card3-reform.png', 'リフォーム・リノベーションの写真',
      21, 'icon-reform-w.png', '51', '58', 23, 33,
      'リフォーム<br>リノベーション',
      '新たな価値を創造し、<br>未来につながる住まいづくりを<br>ご提案します。'),

    // カード4: 不動産コンサルティング（白アイコン 鍵を持つ手 icon-consul-w ID22 / icon 51×42 / top29 right22・見出し2行）
    card('カード4 不動産コンサルティング',
      18, 'service-card4-consulting.png', '不動産コンサルティングの写真',
      22, 'icon-consul-w.png', '51', '42', 29, 22,
      '不動産<br>コンサルティング',
      '市場分析や相続対策など、<br>幅広いご相談に<br>対応いたします。')
  ]);

  // ============================================================
  // 内側コンテナ（max1120・中央寄せ・縦積み center・上下padding130/左右40）
  // datapack §1：section padding 上下130/左右160、Container max1120・左右padding40。
  // 左右160 はブロック側では Container max1120 + 中央寄せで実描画幅に吸収。
  // 縦の余白：ラベル下20 / H2下35 / 本文下75 は各要素の下marginで個別表現。
  // ============================================================
  const container = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'center',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1120', sizeMaxWidthUnit: 'px',
    spacingGap: '0', spacingGapUnit: 'px',
    spacingPadding: { top: '130', right: '40', bottom: '130', left: '40' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    metadata: { name: 'コンテナ' }
  }, [
    // ラベル行「02 / OUR MISSION」（下padding20・中央寄せ）
    label,
    // H2見出し（下margin35）
    h2,
    // リード本文（max820・下margin75）
    lead,
    // カードグリッド
    grid
  ]);

  // ============================================================
  // ルート：loos/full-wide（全幅・ネイビー地 #0a192f）
  // className:'sec-mission' は固有指定（必須）。CTAボタンなし。
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: NAVY_BG,
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-mission',
      metadata: { name: 'Sec.Mission' }
    }, [container])
  ];

  return wp.blocks.serialize(tree);
})()
