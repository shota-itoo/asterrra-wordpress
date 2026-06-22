(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント ──
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // ── 配色（datapack実値） ──
  const GOLD = '#c8a97e';   // Tan：アイブロウ / 番号 / 横罫 / 矢印
  const NAVY = '#131c30';   // Big Stone：見出し / H3 / バッジ
  const GRAY = '#374151';   // Oxford Blue：説明文

  // ── アセットURL（WP取込済み・guid実値） ──
  const BASE = 'http://localhost:8918/wp-content/uploads/2026/06/';
  const ARROW_URL = BASE + 'flow-arrow.svg';   // ID61

  // ── 円形バッジ（80×80ネイビー円・box-shadow shadow-md・中央に白線SVG40×40） ──
  // box-shadow は flavor/universal-block の shadow Extension プリセット 'm'
  //   = 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)（shadow-md・datapack実値と一致）
  const badge = (iconId, iconUrl) => C('flavor/universal-block', {
    metadata: { name: 'Badge' },
    layoutDirection: 'row',
    layoutJustify: 'center',
    layoutAlign: 'center',
    sizeWidth: '80', sizeWidthUnit: 'px',
    sizeHeight: '80', sizeHeightUnit: 'px',
    customBorderRadius: { topLeft: '40', topRight: '40', bottomRight: '40', bottomLeft: '40' }, customBorderRadiusUnit: 'px',
    style: { color: { background: NAVY } },
    boxShadow: 'm',
  }, [
    C('core/image', {
      id: iconId, url: iconUrl, alt: '',
      width: '40px', height: '40px',
      sizeSlug: 'full',
    }),
  ]);

  // ── ステップ列（番号 / バッジ / H3 / 説明文）。flex等分（flexShorthand:'1'・sizeMinWidth:'0'） ──
  const step = (num, iconId, iconFile, title, line1, line2) => C('flavor/universal-block', {
    metadata: { name: 'Step ' + num },
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'center',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMinWidth: '0', sizeMinWidthUnit: 'px',
    flexShorthand: '1',
    spacingGap: '0', spacingGapUnit: 'px',
  }, [
    // 番号（Noto Serif JP 24/32・ゴールド・中央・下pb16）
    // ※ PC文字揃えは core 標準クラス has-text-align-center で付与
    //   （この SWELL ビルドでは core/paragraph の align は block-align 用途で
    //    has-text-align-center を出力しないため className で直接指定）
    C('core/paragraph', {
      className: 'has-text-align-center',
      content: num,
      style: {
        color: { text: GOLD },
        spacing: { padding: { bottom: '16px' } },
        typography: { fontFamily: SERIF, fontSize: '24px', fontWeight: '400', lineHeight: '32px' },
      },
    }),
    // 円形バッジラッパ（下pb24）
    C('flavor/universal-block', {
      metadata: { name: 'Badge Wrap' },
      layoutDirection: 'row',
      layoutJustify: 'center',
      layoutAlign: 'center',
      sizeWidth: '100', sizeWidthUnit: '%',
      spacingPadding: { bottom: '24' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    }, [
      badge(iconId, BASE + iconFile),
    ]),
    // H3 見出し（Noto Sans JP 700・16/24・ネイビー・中央・下pb12）
    // ※ この SWELL ビルドの core/heading には textAlign 属性が無い（登録されない）。
    //   PC文字揃えは core 標準クラス has-text-align-center で付与する。
    C('core/heading', {
      level: 3,
      className: 'has-text-align-center',
      content: title,
      style: {
        color: { text: NAVY },
        elements: { link: { color: { text: NAVY } } },
        spacing: { padding: { bottom: '12px' } },
        typography: { fontFamily: SANS, fontSize: '16px', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.025em' },
      },
    }),
    // 説明文（Noto Sans JP 400・12/24・グレー・中央・<br>1か所）
    // ※ 2行の長さが異なるため per-line 中央寄せが必要。has-text-align-center で付与。
    C('core/paragraph', {
      className: 'has-text-align-center',
      content: line1 + '<br>' + line2,
      style: {
        color: { text: GRAY },
        typography: { fontFamily: SANS, fontSize: '12px', fontWeight: '400', lineHeight: '24px' },
      },
    }),
  ]);

  // ── 矢印（ゴールドchevron SVG・ID61）。ステップ間に配置・バッジ中心の高さへ marginTop で寄せる ──
  // 実測: marginTop 46px では矢印中心がバッジ中心より 23px 上にズレた（番号フォントの実高さ差）。
  // バッジ中心へ揃えるため marginTop を 46→69px に補正（46 + 23 = 69）。
  const arrow = () => C('core/image', {
    id: 61, url: ARROW_URL, alt: '',
    width: '20px', height: '20px',
    sizeSlug: 'full',
    style: { spacing: { margin: { top: '69px' } } },
  });

  const tree = [
    C('loos/full-wide', {
      bgColor: '#ffffff',          // セクション背景：白（実値）
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-flow',
      metadata: { name: 'Sec.FLOW' },
    }, [
      // 内側コンテナ：幅100%・max-width1152・中央寄せ・縦積み・gap64（見出しブロック↔ステップ行）
      // セクションpadding 上下96 / 左右はmax-width1152+autoマージン+内側16で実効片側144を再現
      C('flavor/universal-block', {
        metadata: { name: 'FLOW Inner' },
        layoutDirection: 'column',
        layoutJustify: 'flex-start',
        layoutAlign: 'center',
        sizeWidth: '100', sizeWidthUnit: '%',
        sizeMaxWidth: '1152',
        spacingPadding: { top: '96', right: '16', bottom: '96', left: '16' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
        spacingGap: '64', spacingGapUnit: 'px',
      }, [

        // ── 見出しブロック（縦積み・左寄せ・gap12）：FLOW / 和見出し / 横罫 ──
        C('flavor/universal-block', {
          metadata: { name: 'Section Title' },
          layoutDirection: 'column',
          layoutJustify: 'flex-start',
          layoutAlign: 'flex-start',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingGap: '12', spacingGapUnit: 'px',
        }, [
          // アイブロウ「FLOW」（Noto Serif JP 12/16・ls2.4px=0.2em・ゴールド・左）
          C('core/paragraph', {
            content: 'FLOW',
            style: {
              color: { text: GOLD },
              typography: { fontFamily: SERIF, fontSize: '12px', fontWeight: '400', lineHeight: '16px', letterSpacing: '0.2em' },
            },
          }),
          // 見出し H2「ご相談からご契約までの流れ」（Noto Serif JP 30/36・ls0.75px=0.025em・ネイビー・左）
          C('core/heading', {
            level: 2,
            content: 'ご相談からご契約までの流れ',
            style: {
              color: { text: NAVY },
              elements: { link: { color: { text: NAVY } } },
              typography: { fontFamily: SERIF, fontSize: '30px', fontWeight: '400', lineHeight: '36px', letterSpacing: '0.025em' },
            },
          }),
          // 横罫（40×2px・ゴールド・左寄せ）
          C('flavor/universal-block', {
            metadata: { name: 'Divider' },
            layoutJustify: 'flex-start',
            sizeWidth: '40', sizeWidthUnit: 'px',
            sizeHeight: '2', sizeHeightUnit: 'px',
            style: { color: { background: GOLD } },
          }),
        ]),

        // ── ステップ行（横並び・gap16・中央寄せ・items-start）：5ステップ＋4矢印 ──
        C('flavor/universal-block', {
          metadata: { name: 'Flow Steps' },
          layoutDirection: 'row',
          layoutJustify: 'center',
          layoutAlign: 'flex-start',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingGap: '16', spacingGapUnit: 'px',
        }, [
          step('01', 56, 'flow-icon-01-mail.svg', 'お問い合わせ', 'まずはお気軽に', 'お問い合わせください。'),
          arrow(),
          step('02', 57, 'flow-icon-02-clipboard.svg', 'ヒアリング', 'お客様のご希望や状況を', '丁寧にお伺いします。'),
          arrow(),
          step('03', 58, 'flow-icon-03-people.svg', 'ご提案', '最適なプランや解決策を', 'ご提案いたします。'),
          arrow(),
          step('04', 59, 'flow-icon-04-pen.svg', 'ご契約', '内容にご納得いただいた上で、', 'ご契約となります。'),
          arrow(),
          step('05', 60, 'flow-icon-05-heart.svg', 'アフターフォロー', 'ご契約後も長期的にサポート', 'いたします。'),
        ]),
      ]),
    ]),
  ];

  return wp.blocks.serialize(tree);
})()
