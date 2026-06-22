(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント（ページ標準: 見出し=Serif / 本文=Sans）──
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // ── 配色（datapack実測値を採用）──
  const GOLD = '#c8a97e';                  // 小見出し / H3 / 横罫 / アイコン線
  const WHITE = '#ffffff';                 // H2 / 説明文
  const OVERLAY = 'rgba(0,0,0,0.8)';       // 暗色オーバーレイ背景（黒80%）
  const VLINE = 'rgba(75,85,99,0.5)';      // 縦区切り線（グレー#4b5563 50%）

  // ── アイコンURL（添付ID 53/54/55・SVG・確認済み guid）──
  const ICON_BASE = 'http://localhost:8918/wp-content/uploads/2026/06/';

  // ── 1価値ブロック生成ヘルパー ──
  // アイコン(core/image 64×64) + (H3 + 説明文col) を横並び gap24
  const valueCol = (iconId, iconFile, h3, descRichLines) =>
    C('flavor/universal-block', {
      metadata: { name: 'Value ' + h3 },
      layoutDirection: 'row',
      layoutJustify: 'flex-start',
      layoutAlign: 'flex-start',   // アイコン上端=見出し上端（上揃え）。デザイン準拠
      spacingGap: '24', spacingGapUnit: 'px',
    }, [
      // アイコン（ゴールド線画 SVG・64×64）
      C('core/image', {
        id: iconId,
        url: ICON_BASE + iconFile,
        alt: '',
        sizeSlug: 'full',
        width: '64px',
        height: '64px',
      }),
      // テキスト塊（H3 + 説明文）縦積み gap12
      C('flavor/universal-block', {
        metadata: { name: 'Value Text' },
        layoutDirection: 'column',
        layoutJustify: 'center',
        layoutAlign: 'flex-start',
        spacingGap: '12', spacingGapUnit: 'px',
      }, [
        // H3 価値名（Noto Serif JP 18/28・ls 0.45px=0.025em・ゴールド）
        C('core/heading', {
          level: 3,
          className: 'is-style-section_ttl',
          content: h3,
          style: {
            color: { text: GOLD },
            elements: { link: { color: { text: GOLD } } },
            typography: { fontFamily: SERIF, fontSize: '18px', fontWeight: '400', lineHeight: '28px', letterSpacing: '0.025em' },
          },
        }),
        // 説明文（Noto Sans JP Light 14/28・白・<br>で2行）
        C('core/paragraph', {
          content: descRichLines,
          style: {
            color: { text: WHITE },
            typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '300', lineHeight: '28px' },
          },
        }),
      ]),
    ]);

  // ── 縦区切り線（1×96px・グレー50%）──
  const vDivider = () =>
    C('flavor/universal-block', {
      metadata: { name: 'V-Divider' },
      sizeWidth: '1', sizeWidthUnit: 'px',
      sizeHeight: '96', sizeHeightUnit: 'px',
      style: { color: { background: VLINE } },
    });

  const tree = [
    // ════ ルート: 暗色オーバーレイセクション（className: sec-value）════
    // pcPadding/spPadding=0、内側コンテナで padding/中央寄せを集約
    C('loos/full-wide', {
      bgColor: OVERLAY,
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-value',
      metadata: { name: 'Sec.VALUE' },
    }, [
      // 内側コンテナ：最大幅1152・中央寄せ・縦積み center
      // セクションpadding 上下96 / 左右80 + 内コンテナ64 = 左右144 をここに集約
      C('flavor/universal-block', {
        metadata: { name: 'VALUE Inner' },
        layoutDirection: 'column',
        layoutJustify: 'center',
        layoutAlign: 'center',
        sizeWidth: '100', sizeWidthUnit: '%',
        sizeMaxWidth: '1152',
        spacingPadding: { top: '96', right: '0', bottom: '96', left: '0' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
        spacingGap: '64', spacingGapUnit: 'px',
      }, [

        // ════ Section Title（VALUE → H2 → 横罫）縦積み center gap12 ════
        C('flavor/universal-block', {
          metadata: { name: 'Section Title' },
          layoutDirection: 'column',
          layoutJustify: 'center',
          layoutAlign: 'center',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingGap: '12', spacingGapUnit: 'px',
        }, [
          // 小見出し VALUE（Noto Serif JP 12/16・ls 2.4px=0.2em・ゴールド・中央）
          C('core/paragraph', {
            align: 'center',
            content: 'VALUE',
            style: {
              color: { text: GOLD },
              typography: { fontFamily: SERIF, fontSize: '12px', fontWeight: '400', lineHeight: '16px', letterSpacing: '0.2em' },
            },
          }),
          // H2 見出し（Noto Serif JP 30/36・ls 0.75px=0.025em・白・中央）
          C('core/heading', {
            level: 2,
            textAlign: 'center',
            className: 'is-style-section_ttl',
            content: 'ASTERRAが大切にしていること',
            style: {
              color: { text: WHITE },
              elements: { link: { color: { text: WHITE } } },
              typography: { fontFamily: SERIF, fontSize: '30px', fontWeight: '400', lineHeight: '36px', letterSpacing: '0.025em' },
            },
          }),
          // 横罫（40×2px・ゴールド・中央）
          C('flavor/universal-block', {
            metadata: { name: 'H-Divider' },
            layoutJustify: 'center',
            sizeWidth: '40', sizeWidthUnit: 'px',
            sizeHeight: '2', sizeHeightUnit: 'px',
            style: { color: { background: GOLD } },
          }),
        ]),

        // ════ 3価値 横並び行（row・center・gap32）════
        // 価値 / 縦区切り / 価値 / 縦区切り / 価値
        C('flavor/universal-block', {
          metadata: { name: 'Values Row' },
          layoutDirection: 'row',
          layoutJustify: 'center',
          layoutAlign: 'center',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingGap: '32', spacingGapUnit: 'px',
        }, [
          valueCol(53, 'icon-value1-customer.svg', 'お客様目線',
            'お客様一人ひとりの状況や想いを理解<br>し、最適なご提案を行います。'),
          vDivider(),
          valueCol(54, 'icon-value2-sincere.svg', '誠実な対応',
            '目先の利益ではなく、<br>長期的な信頼関係を大切にします。'),
          vDivider(),
          valueCol(55, 'icon-value3-future.svg', '未来志向',
            '将来を見据えた資産形成や<br>住まい選びをサポートします。'),
        ]),

      ]),
    ]),
  ];

  return wp.blocks.serialize(tree);
})()
