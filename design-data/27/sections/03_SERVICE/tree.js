(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント ──
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // 画像・本体の共通定数
  const CARD_W = '566';        // カード幅
  const IMG_H = '284px';       // カード画像高
  const BODY_PAD_L = '134';    // テキスト列の左オフセット（番号・アイコンの右）

  // ── 1カード生成ヘルパー ──
  // num   : '01'..'04'（大ゴールド番号・装飾兼ラベル）
  // title : カードタイトル（白）
  // descLines : 説明文の各行（配列。各行は <br> で連結）
  // imgId / imgUrl : カード上部画像
  // iconId / iconUrl / iconW / iconH : ゴールド線画アイコン（左端・絶対配置）
  const card = (name, num, title, descLines, imgId, imgUrl, iconId, iconUrl, iconW, iconH) =>
    C('flavor/universal-block', {
      metadata: { name: name },
      layoutDirection: 'column',
      layoutJustify: 'flex-start',
      layoutAlign: 'stretch',
      sizeWidth: CARD_W, sizeWidthUnit: 'px',
      spacingGap: '0', spacingGapUnit: 'px',
    }, [

      // ── カード上部：写真（566×284・cover）──
      C('core/image', {
        id: imgId,
        url: imgUrl,
        alt: '',
        sizeSlug: 'full',
        width: '566px',
        height: IMG_H,
        scale: 'cover',
      }),

      // ── カード本体（ネイビー #1e2c5b・relative・高さ346）──
      // 番号とアイコンは左端カラム（x≈48〜56）に絶対配置、
      // タイトル・説明文は一段右（左padding134）に左揃えで通常フロー。
      C('flavor/universal-block', {
        metadata: { name: name + ' 本体' },
        positionType: 'relative',
        layoutDirection: 'column',
        layoutJustify: 'flex-start',
        sizeWidth: CARD_W, sizeWidthUnit: 'px',
        sizeHeight: '346', sizeHeightUnit: 'px',
        style: { color: { background: '#1e2c5b' } },
        // テキスト列：上49 / 左134 / 右46
        spacingPadding: { top: '49', right: '46', bottom: '34', left: BODY_PAD_L }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingGap: '0', spacingGapUnit: 'px',
      }, [

        // ── 大ゴールド番号（本体左上・x≈56 / y≈49・絶対配置）──
        // core/paragraph に position 拡張が無いため flavor/universal-block で包んで絶対配置。
        C('flavor/universal-block', {
          metadata: { name: name + ' 番号' },
          positionType: 'absolute',
          positionLeft: '56', positionLeftUnit: 'px',
          positionTop: '49', positionTopUnit: 'px',
        }, [
          C('core/paragraph', {
            content: num,
            style: {
              color: { text: '#c8a97e' },
              typography: { fontFamily: SERIF, fontSize: '30px', fontWeight: '400', lineHeight: '36px' },
            },
          }),
        ]),

        // ── カードタイトル（白20px・左揃え・y≈53）──
        C('core/heading', {
          level: 3,
          className: 'is-style-section_ttl',
          content: title,
          style: {
            color: { text: '#ffffff' },
            elements: { link: { color: { text: '#ffffff' } } },
            typography: { fontFamily: SERIF, fontSize: '20px', fontWeight: '400', lineHeight: '28px', letterSpacing: '0.5px' },
          },
        }),

        // ── 説明文（薄グレー14px・複数行 <br>・y≈119）──
        C('core/paragraph', {
          content: descLines.join('<br>'),
          style: {
            color: { text: '#d1d5db' },
            typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '300', lineHeight: '28px' },
            spacing: { margin: { top: '18px' } },
          },
        }),

        // ── ゴールド線画アイコン（本体左端・絶対配置 / left≈48・top≈109）──
        // core/image は position 拡張が img プレフィックス必須で無印 positionType は破棄される。
        // 番号と同様に flavor/universal-block で包んで絶対配置し、左端カラム（説明文の左脇）へ。
        C('flavor/universal-block', {
          metadata: { name: name + ' アイコン' },
          positionType: 'absolute',
          positionLeft: '48', positionLeftUnit: 'px',
          positionTop: '109', positionTopUnit: 'px',
        }, [
          C('core/image', {
            id: iconId,
            url: iconUrl,
            alt: '',
            sizeSlug: 'full',
            width: iconW,
            height: iconH,
          }),
        ]),
      ]),
    ]);

  const tree = [
    C('loos/full-wide', {
      bgColor: '#131c30',           // セクション背景ネイビー（Figma実値）
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-service',
      metadata: { name: 'Sec.SERVICE' },
    }, [

      // ── 内側コンテナ：max-width1152・中央寄せ・縦積み（items-center）──
      // セクションpadding上下96 / 左右80+64=144 を集約。左右は max-width1152 + auto margin で代替。
      C('flavor/universal-block', {
        metadata: { name: 'SERVICE Inner' },
        layoutDirection: 'column',
        layoutJustify: 'flex-start',
        layoutAlign: 'center',
        sizeWidth: '100', sizeWidthUnit: '%',
        sizeMaxWidth: '1152',
        // 左右paddingは0（1152の content box をグリッドへ満額渡す。566×2+gap20=1152がwrapしないため）
        spacingPadding: { top: '96', right: '0', bottom: '96', left: '0' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
        spacingGap: '0', spacingGapUnit: 'px',
      }, [

        // ── 見出しブロック（ラベル + 見出し + 横罫・中央寄せ）──
        // 見出しブロック↔グリッド間 64px はこのブロックの margin-bottom で表現。
        C('flavor/universal-block', {
          metadata: { name: 'Section Title' },
          layoutDirection: 'column',
          layoutJustify: 'center',
          layoutAlign: 'center',
          spacingGap: '12', spacingGapUnit: 'px',     // ラベル↔見出し gap 12
          spacingMargin: { bottom: '64' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
        }, [

          // ラベル "SERVICE"（ゴールド・Noto Serif JP 12px・字間2.4px=0.2em・中央）
          C('core/paragraph', {
            align: 'center',
            content: 'SERVICE',
            style: {
              color: { text: '#c8a97e' },
              typography: { fontFamily: SERIF, fontSize: '12px', fontWeight: '400', lineHeight: '16px', letterSpacing: '0.2em' },
            },
          }),

          // 見出し "サービス内容"（白・Noto Serif JP 30px・字間0.75px・中央）
          C('core/heading', {
            level: 2,
            textAlign: 'center',
            content: 'サービス内容',
            style: {
              color: { text: '#ffffff' },
              elements: { link: { color: { text: '#ffffff' } } },
              typography: { fontFamily: SERIF, fontSize: '30px', fontWeight: '400', lineHeight: '36px', letterSpacing: '0.75px' },
              spacing: { margin: { top: '0', bottom: '12' } },   // 見出し↔横罫 余白 12
            },
          }),

          // 横罫（ゴールド #c8a97e・40×2px・中央）
          C('flavor/universal-block', {
            metadata: { name: 'Divider' },
            layoutJustify: 'center',
            sizeWidth: '40', sizeWidthUnit: 'px',
            sizeHeight: '2', sizeHeightUnit: 'px',
            style: { color: { background: '#c8a97e' } },
          }),
        ]),

        // ── 2×2グリッド（row + flexWrap:wrap・gap20・中央寄せ）──
        // 566×2 + gap20 = 1152。行間も gap20 で表現。
        C('flavor/universal-block', {
          metadata: { name: 'Card Grid' },
          layoutDirection: 'row',
          layoutJustify: 'center',
          flexWrap: 'wrap',
          spacingGap: '20', spacingGapUnit: 'px',
          sizeWidth: '100', sizeWidthUnit: '%',
        }, [

          // [01] 不動産売買サポート（左上）
          card('カード1', '01', '不動産売買サポート', [
            '居住用不動産から投資用不動産まで、',
            'お客様の目的や状況に応じた最適なご提案を行います。',
            '売却・購入のあらゆる場面で、',
            '専門的な知識と豊富な経験を活かし、',
            '安心できるお取引をサポートいたします。',
          ],
            45, 'http://localhost:8918/wp-content/uploads/2026/06/card1_baibai.png',
            49, 'http://localhost:8918/wp-content/uploads/2026/06/icon1_baibai.png', '51px', '51px'),

          // [02] 賃貸・管理サポート（右上）
          card('カード2', '02', '賃貸・管理サポート', [
            '入居者様には快適な住環境を、',
            'オーナー様には安心できる資産運用を。',
            '賃貸仲介から管理業務まで幅広く対応し、',
            '大切な資産を長期的にサポートいたします。',
          ],
            46, 'http://localhost:8918/wp-content/uploads/2026/06/card2_chintai.png',
            50, 'http://localhost:8918/wp-content/uploads/2026/06/icon2_chintai.png', '48px', '49px'),

          // [03] リフォーム・リノベーション（左下）
          card('カード3', '03', 'リフォーム・リノベーション', [
            'お客様の理想や不動産の可能性を最大限に',
            '引き出し、新たな価値を創造いたします。',
            '住まいとしても資産としても、',
            '未来につながる空間づくりをご提案いたします。',
          ],
            47, 'http://localhost:8918/wp-content/uploads/2026/06/card3_reform.png',
            51, 'http://localhost:8918/wp-content/uploads/2026/06/icon3_reform.png', '59px', '64px'),

          // [04] 不動産コンサルティング（右下）
          card('カード4', '04', '不動産コンサルティング', [
            '不動産売買、資産形成、相続、資産活用など、',
            '様々な課題に対して最適なソリューションを',
            'ご提案いたします。',
            'お客様の人生設計や事業計画に寄り添いながら、',
            '未来を見据えた意思決定をサポートいたします。',
          ],
            48, 'http://localhost:8918/wp-content/uploads/2026/06/card4_consulting.png',
            52, 'http://localhost:8918/wp-content/uploads/2026/06/icon4_consulting.png', '60px', '47px'),
        ]),
      ]),
    ]),
  ];

  return wp.blocks.serialize(tree);
})()
