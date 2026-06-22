(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント ──
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  const tree = [
    C('loos/full-wide', {
      bgColor: '#1e2c5b',          // セクション背景ネイビー（実値）
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-contact',
      metadata: { name: 'Sec.CONTACT' },
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

        // ── 見出し「CONTACT」（Noto Serif JP SemiBold / ゴールド #c5a059）──
        C('core/heading', {
          level: 2,
          textAlign: 'center',
          className: 'is-style-section_ttl',   // SWELL「セクションタイトル」style＝既定ボックスを出さない（editor/front両対応）
          content: 'CONTACT',
          style: {
            color: { text: '#c5a059' },
            elements: { link: { color: { text: '#c5a059' } } },
            typography: { fontFamily: SERIF, fontSize: '36px', fontWeight: '600', lineHeight: '40px', letterSpacing: '0.1em' },
          },
        }),

        // ── 小見出し「お問い合わせ」（Noto Sans JP Regular / 白）──
        C('core/paragraph', {
          align: 'center',
          content: 'お問い合わせ',
          style: {
            color: { text: '#ffffff' },
            typography: { fontFamily: SANS, fontSize: '12px', fontWeight: '400', lineHeight: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' },
          },
        }),

        // ── 横罫（40×2px・薄ゴールド #c8a97e・中央配置）──
        //   デザインの「お問い合わせ」34px高コンテナ下余白(≈18px)を再現するため上marginを付与
        C('flavor/universal-block', {
          metadata: { name: 'Divider' },
          layoutJustify: 'center',
          sizeWidth: '40', sizeWidthUnit: 'px',
          sizeHeight: '2', sizeHeightUnit: 'px',
          spacingMargin: { top: '16', right: '0', bottom: '0', left: '0' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
          style: { color: { background: '#c8a97e' } },
        }),

        // ── 本文（前後にpadding top32/bottom40・グレー #d1d5db）──
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
              color: { text: '#d1d5db' },
              typography: { fontFamily: SANS, fontSize: '16px', fontWeight: '400', lineHeight: '24px' },
            },
          }),
        ]),

        // ── CTAボタン「無料相談はこちら →」/contact/（ゴールド #c5a059・角丸0・白文字）──
        // ※ box-shadow(drop-shadow)は core/button 属性で表現不可 → 要CSS報告
        C('core/buttons', {}, [
          C('core/button', {
            text: '無料相談はこちら　→',
            url: '/contact/',
            width: undefined,
            style: {
              color: { background: '#c5a059', text: '#ffffff' },
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
