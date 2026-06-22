(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント ----
  const SERIF = "'Noto Serif JP', serif";   // 見出し
  const SANS  = "'Noto Sans JP', sans-serif"; // 本文・ボタン

  // ============================================================
  // CTAボタン（core/buttons > core/button）
  // 角丸0・指定背景・指定padding・指定フォントを style で再現。
  // ラベル末尾アイコン「→」は datapack のテキストを一字一句保持。
  // ============================================================

  // ボタン1（プライマリ・ゴールド #c5a059）/ お問い合わせ → /contact/
  const btn1 = C('core/buttons', {
    layout: { type: 'flex', justifyContent: 'left' }
  }, [
    C('core/button', {
      text: 'お問い合わせ&nbsp;&nbsp;&nbsp;&nbsp;→',
      url: '/contact/',
      style: {
        color: { background: '#c5a059', text: '#ffffff' },
        border: { radius: '0px' },
        spacing: { padding: { top: '16px', bottom: '16px', left: '40px', right: '40px' } },
        typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '400', lineHeight: '20px', letterSpacing: '0.1em' }
      }
    })
  ]);

  // ボタン2（セカンダリ・透明＋白枠1px）/ 会社概要を見る → /company/
  const btn2 = C('core/buttons', {
    layout: { type: 'flex', justifyContent: 'left' }
  }, [
    C('core/button', {
      text: '会社概要を見る&nbsp;&nbsp;&nbsp;&nbsp;→',
      url: '/company/',
      style: {
        color: { background: 'transparent', text: '#ffffff' },
        border: { width: '1px', style: 'solid', color: '#ffffff', radius: '0px' },
        // 枠線1px込みでボタン1と高さを揃える設計（datapack §3 ボタン2 / §7）。
        // box-sizing:border-box 前提で py16/px40 指定（border 1px を内側に含めて同寸）。
        spacing: { padding: { top: '16px', bottom: '16px', left: '40px', right: '40px' } },
        typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '400', lineHeight: '20px', letterSpacing: '0.1em' }
      }
    })
  ]);

  // CTA行（2ボタン横並び・左寄せ・gap16px・padding-top16px）
  const ctaRow = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    spacingGap: '16', spacingGapUnit: 'px',
    spacingPadding: { top: '16', right: '0', bottom: '0', left: '0' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'CTA行' }
  }, [btn1, btn2]);

  // ============================================================
  // テキスト群（見出し・サブ・CTA を縦並び・gap32px）
  // ============================================================
  const heading = C('core/heading', {
    level: 2,
    className: 'is-style-section_ttl',                  // SWELL h2装飾の中和
    content: '変わりゆく時代に、<br>　　　変わらぬ安心を。', // 2行目行頭=全角スペース3つ
    style: {
      color: { text: '#ffffff' },
      elements: { link: { color: { text: '#ffffff' } } },
      typography: {
        fontFamily: SERIF, fontSize: '50px', fontWeight: '400',
        lineHeight: '80px', letterSpacing: '0.1em'      // 5px / 50px = 0.1em
      }
    }
  });

  const subtext = C('core/paragraph', {
    content: '不動産の売買・仲介・管理・開発を通じて、<br>お客様一人ひとりのライフステージに最適なご提案をご提供します。',
    style: {
      color: { text: '#e5e7eb' },
      typography: {
        fontFamily: SANS, fontSize: '16px', fontWeight: '500',
        lineHeight: '24px', letterSpacing: '0.1em'      // 1.6px / 16px = 0.1em
      }
    }
  });

  const content = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    spacingGap: '32', spacingGapUnit: 'px',
    sizeMaxWidth: '1216', sizeMaxWidthUnit: 'px',
    metadata: { name: 'FVコンテンツ群' }
  }, [heading, subtext, ctaRow]);

  // ============================================================
  // 白ロゴ（右下・絶対配置・装飾）
  // ============================================================
  const logo = C('core/image', {
    id: 11,
    url: 'http://localhost:8918/wp-content/uploads/2026/06/fv-logo-white.png',
    alt: '',
    sizeSlug: 'full',
    width: '222px',
    height: '170px',
    // core/image の position 拡張は 'img' プレフィックス（index.php config）。
    // 無印 positionType は core/image のクライアントスキーマに無く createBlock で破棄される。
    // core/image の position 拡張は 'img' プレフィックス（index.php config）。
    // これで `.wp-block-image[data-img-id] { position:absolute; right:52px; bottom:134px }`
    // が注入されるが、親(backgroundImage拡張)の
    //   `.wp-block-flavor-universal-block[data-ub-id] > *:not([style*='z-index']){position:relative}`
    // が specificity (0,3,0) で勝ち、図の position が relative に上書きされる。
    // この打ち消しは「2つのテーマ拡張のCSS競合」でブロック属性だけでは解消不可
    // （:not はインライン style 属性を見るが、拡張の z-index は注入CSS側のため除外されない）。
    // → 後段のページ限定CSS(swell-meta-css)で specificity を上げて absolute を確定させる（CSS待ち・既知）。
    imgPositionType: 'absolute',
    imgPositionBottom: '134', imgPositionBottomUnit: 'px',
    imgPositionRight: '52', imgPositionRightUnit: 'px',
    style: { border: { radius: '0px' } },
    metadata: { name: '装飾_白ロゴ' }
  });

  // ============================================================
  // FVラッパー（背景写真＝backgroundImage拡張・min-height900・縦中央寄せ）
  // positionType:relative を付与し、装飾ロゴの absolute 基準にする。
  // 左インセット112px（外80+内32）は padding-left で再現。
  // ※ 左→右ネイビーグラデーションオーバーレイはブロック属性で表現不可（要CSS）。
  //   backgroundImage 拡張のオーバーレイ(::after)はフラット単色のみでグラデ非対応。
  // ============================================================
  const fvWrapper = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'flex-start',
    layoutAlign: 'center',                               // section内 垂直中央寄せ
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMinHeight: '900', sizeMinHeightUnit: 'px',
    backgroundImageUrl: 'http://localhost:8918/wp-content/uploads/2026/06/fv-bg-cityscape.png',
    backgroundImageId: 10,
    backgroundImageSize: 'cover',
    backgroundImagePosition: 'center',
    spacingPadding: { top: '0', right: '80', bottom: '0', left: '112' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'FVラッパー' }
  }, [content, logo]);

  // ============================================================
  // ルート：loos/full-wide（全幅・ネイビー地）
  // bgColor は写真未読込時のフォールバック地（白回避のためネイビー）。
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: '#0a192f',
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-fv',
      metadata: { name: 'Sec.FV' }
    }, [fvWrapper])
  ];

  return wp.blocks.serialize(tree);
})()
