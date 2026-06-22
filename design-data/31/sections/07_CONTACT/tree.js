(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント（datapack §スタイル：見出しのみ Noto Serif JP、他は Noto Sans JP）──
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // ── 共通カラー（datapack §配色 実値・推定上書き禁止）──
  const NAVY  = '#1e2c5b'; // セクション背景ネイビー（ベタ実値）
  const GOLD  = '#c5a059'; // 見出しCONTACT文字 / CTAボタン背景（Twine）
  const TAN   = '#c8a97e'; // 横罫（薄ゴールド Tan）
  const WHITE = '#ffffff'; // サブラベル / CTA文字
  const GRAY  = '#d1d5db'; // 本文（Mischka 薄グレー）

  // トップページCONTACTと同型。root className を 'sec-about-contact' に。
  const tree = [
    C('loos/full-wide', {
      bgColor: NAVY,               // セクション背景ネイビー #1e2c5b
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-about-contact',
      metadata: { name: 'Sec.AboutContact' },
    }, [
      // 内側コンテナ：最大幅896・中央寄せ・縦積み（items-center）gap=8
      // セクションpadding top128/bottom128 をここに集約、左右はmax-width896+autoマージンで代替
      C('flavor/universal-block', {
        metadata: { name: 'CONTACT Inner' },
        layoutDirection: 'column',
        layoutJustify: 'center',
        layoutAlign: 'center',
        sizeWidth: '100', sizeWidthUnit: '%',
        sizeMaxWidth: '896',
        spacingPadding: { top: '128', right: '16', bottom: '128', left: '16' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
        spacingGap: '8', spacingGapUnit: 'px',
      }, [

        // ── 見出し「CONTACT」（Noto Serif JP SemiBold 36px/40px / letter 3.6px=0.1em / ゴールド #c5a059）──
        C('core/heading', {
          level: 2,
          textAlign: 'center',
          content: 'CONTACT',
          style: {
            color: { text: GOLD },
            elements: { link: { color: { text: GOLD } } },
            typography: { fontFamily: SERIF, fontSize: '36px', fontWeight: '600', lineHeight: '40px', letterSpacing: '0.1em' },
          },
        }),

        // ── 小見出し「お問い合わせ」（Noto Sans JP Regular 12px/16px / letter 1.2px=0.1em / 白 / uppercase）──
        C('core/paragraph', {
          align: 'center',
          content: 'お問い合わせ',
          style: {
            color: { text: WHITE },
            typography: { fontFamily: SANS, fontSize: '12px', fontWeight: '400', lineHeight: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' },
          },
        }),

        // ── 横罫（40×2px・薄ゴールド #c8a97e・中央配置）──
        C('flavor/universal-block', {
          metadata: { name: 'Divider' },
          layoutJustify: 'center',
          sizeWidth: '40', sizeWidthUnit: 'px',
          sizeHeight: '2', sizeHeightUnit: 'px',
          style: { color: { background: TAN } },
        }),

        // ── 本文（前後に padding top32/bottom40・グレー #d1d5db / 16px/24px）──
        C('flavor/universal-block', {
          metadata: { name: 'Lead' },
          layoutDirection: 'column',
          layoutAlign: 'center',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingPadding: { top: '32', right: '0', bottom: '40', left: '0' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
          spacingGap: '0', spacingGapUnit: 'px',
        }, [
          C('core/paragraph', {
            align: 'center',
            content: '不動産に関するご相談は、お気軽にお問い合わせください。',
            style: {
              color: { text: GRAY },
              typography: { fontFamily: SANS, fontSize: '16px', fontWeight: '400', lineHeight: '24px' },
            },
          }),
        ]),

        // ── CTAボタン「無料相談はこちら　→」/contact/（ゴールド #c5a059・角丸0・白文字 14px/20px letter 0.1em）──
        // ※ box-shadow（shadow-lg）と セクション border-top 1px #020c1b は属性で表現不可 → 要CSS報告
        C('core/buttons', {}, [
          C('core/button', {
            text: '無料相談はこちら　→',
            url: '/contact/',
            style: {
              color: { background: GOLD, text: WHITE },
              border: { radius: '0px' },
              spacing: { padding: { top: '20px', right: '64px', bottom: '20px', left: '64px' } },
              typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '700', lineHeight: '20px', letterSpacing: '0.1em' },
            },
          }),
        ]),
      ]),
    ]),
  ];

  return wp.blocks.serialize(tree);
})()
