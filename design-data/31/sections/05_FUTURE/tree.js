(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント（datapack §3） ----
  const SERIF = "'Noto Serif JP', serif";     // 見出し系（"04" ラベル・H2）
  const SANS  = "'Noto Sans JP', sans-serif"; // 本文系

  // ---- 共通カラー（datapack §3 実測・推定上書き禁止） ----
  const GOLD     = '#c5a86d';               // "04" / "FUTURE" / 横罫（ゴールド実測）
  const WHITE    = '#ffffff';               // H2（完全不透明の白）
  const WHITE_85 = 'rgba(255,255,255,0.85)';// 本文（白85%）
  const NAVY     = '#0a192f';               // full-wide フォールバック地（パレットnavy）
  const OVERLAY  = '#0a1631';               // オーバーレイ色（rgba(10,22,49) = #0a1631）

  // ============================================================
  // ラベル行「04 / FUTURE」（datapack §1 ネスト：横並び・items-center）
  //   "04"  : Noto Serif JP 40px/40px/500・letter-spacing 1.28px≈0.032em・右padding20px
  //   "Future"(uppercase表示) : Jost 13px/26px/500・letter-spacing 1.95px=0.15em
  //   Jost はサイト未読込フォントのため、欧文ラベルとして本文SANSにフォールバック。
  //   uppercase は属性で表現不可（text-transform）→ 表示文字列を "FUTURE" 直接記述で再現。
  // ============================================================
  const labelNum = C('core/paragraph', {
    content: '04',
    style: {
      color: { text: GOLD },
      typography: {
        fontFamily: SERIF, fontSize: '40px', fontWeight: '500',
        lineHeight: '40px', letterSpacing: '0.032em' // 1.28px / 40px
      }
    },
    metadata: { name: 'ラベル_04' }
  });

  const labelText = C('core/paragraph', {
    content: 'FUTURE',
    style: {
      color: { text: GOLD },
      typography: {
        fontFamily: SANS, fontSize: '13px', fontWeight: '500',
        lineHeight: '26px', letterSpacing: '0.15em' // 1.95px / 13px
      }
    },
    metadata: { name: 'ラベル_FUTURE' }
  });

  // ラベル行コンテナ（横並び・縦中央・"04"の右に20pxの間隔）
  const labelRow = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'flex-start',
    layoutAlign: 'center',
    sizeWidth: '100', sizeWidthUnit: '%',
    style: { spacing: { blockGap: '20px' } }, // "04" 右padding20px ≒ ラベル間gap20
    metadata: { name: 'ラベル行' }
  }, [labelNum, labelText]);

  // ============================================================
  // H2 見出し（白 solid・Noto Serif JP 32px/48px/500・letter-spacing 1.28px≈0.04em）
  //   2行 <br>。is-style-section_ttl（SWELL装飾中和）。
  //   datapack §3：本文修正と無関係。原文どおり。
  // ============================================================
  const heading = C('core/heading', {
    level: 2,
    className: 'is-style-section_ttl',
    content: '変化を恐れず、<br>新たな価値を創造する。',
    style: {
      color: { text: WHITE },
      elements: { link: { color: { text: WHITE } } },
      typography: {
        fontFamily: SERIF, fontSize: '32px', fontWeight: '500',
        lineHeight: '48px', letterSpacing: '0.04em' // 1.28px / 32px
      }
    },
    metadata: { name: '見出し(H2)' }
  });

  // ============================================================
  // 横罫（divider・w40 h1・bg ゴールド）datapack §3 / §4
  //   flavor/universal-block を1pxラインとして使用（width40px・height1px・背景色GOLD）。
  // ============================================================
  const divider = C('flavor/universal-block', {
    sizeWidth: '40', sizeWidthUnit: 'px',
    sizeHeight: '1', sizeHeightUnit: 'px',
    style: { color: { background: GOLD } },
    metadata: { name: '横罫(divider)' }
  });

  // ============================================================
  // 本文（2段落・白85%・Noto Sans JP 15px/30px/400・letter-spacing 1.28px≈0.085em）
  //   sibling 03 Value と同一方針で 15px に正規化（datapack §3注・§7-2）。
  //   各段落2行 <br>。段落間 gap 30px。max-width 780px。
  //   ★ユーザー指示：第2段落「最良 of サポート」→「最良のサポート」（"of"→"の"）。
  //     それ以外は datapack 原文どおり。
  // ============================================================
  const para1 = C('core/paragraph', {
    content: '変化の激しい時代だからこそ、現状に満足することなく挑戦を続け、<br>新たな価値を創造しながら、お客様とともに成長していく企業を目指してまいります。',
    style: {
      color: { text: WHITE_85 },
      typography: {
        fontFamily: SANS, fontSize: '15px', fontWeight: '400',
        lineHeight: '30px', letterSpacing: '0.085em' // 1.28px / 15px
      }
    },
    metadata: { name: '本文_第1段落' }
  });

  const para2 = C('core/paragraph', {
    content: 'そして、私たちの事業活動を通じて、お客様の豊かな未来の実現に貢献できるよう、<br>社員一丸となって最良のサポートを提供し続けて参ります。',
    style: {
      color: { text: WHITE_85 },
      typography: {
        fontFamily: SANS, fontSize: '15px', fontWeight: '400',
        lineHeight: '30px', letterSpacing: '0.085em' // 1.28px / 15px
      }
    },
    metadata: { name: '本文_第2段落' }
  });

  // 本文ブロック（縦積み・段落間gap30px・max-width780px）
  const bodyBlock = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeMaxWidth: '780', sizeMaxWidthUnit: 'px',
    style: { spacing: { blockGap: '30px' } }, // 段落間 gap 30.31 ≒ 30px
    metadata: { name: '本文ブロック' }
  }, [para1, para2]);

  // ============================================================
  // テキストコンテンツ群（Container 1:2170・幅1120中央寄せ・内側左右padding40px・左寄せ縦並び）
  //   datapack §1：内側 horizontal padding 40px → 実描画幅1040px。
  //   子間 縦gap 25px（ラベル⇄H2⇄罫⇄本文）。
  //   背景写真＋overlay の直下の子＝この群（z-index2 で overlay の上に乗る／拡張が自動付与）。
  // ============================================================
  const content = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1120', sizeMaxWidthUnit: 'px',
    spacingPadding: { top: '0', right: '40', bottom: '0', left: '40' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    style: { spacing: { blockGap: '25px' } }, // Container内 縦gap 25px
    metadata: { name: 'Futureテキスト群' }
  }, [labelRow, heading, divider, bodyBlock]);

  // ============================================================
  // セクションラッパー（背景写真＝backgroundImage拡張・ネイビーoverlay・縦中央寄せ）
  //   datapack §4：背景写真(WP ID 42・1536×1024→cover表示)＋rgba(10,22,49,0.8) navy overlay。
  //   overlay は単色フラット → backgroundImage 拡張で表現可：
  //     backgroundOverlayColor:'#0a1631'（=rgb(10,22,49)）+ backgroundOverlayOpacity:'80'（=0.8）。
  //   拡張が ::before(画像) / ::after(overlay) / 子要素z-index2 を自動生成（position:relative・overflow:hidden 込み）。
  //   datapack §1/§7-5：テキストは高660px固定の中で上下中央。spPadding/pcPadding=0、
  //     縦中央寄せ(justify:center)＋上下padding140pxでセクション内中央配置を再現。
  // ============================================================
  const wrapper = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'center',
    layoutAlign: 'center',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMinHeight: '660', sizeMinHeightUnit: 'px',
    backgroundImageUrl: 'http://localhost:8918/wp-content/uploads/2026/06/future-bg-cityscape.png',
    backgroundImageId: 42,
    backgroundImageSize: 'cover',
    backgroundImagePosition: 'center',
    backgroundOverlayColor: OVERLAY,      // #0a1631 = rgb(10,22,49)
    backgroundOverlayOpacity: '80',       // 0.8 → rgba(10,22,49,0.8)
    spacingPadding: { top: '140', right: '0', bottom: '140', left: '0' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'Futureラッパー' }
  }, [content]);

  // ============================================================
  // ルート：loos/full-wide（全幅・ネイビー地フォールバック）
  //   className:'sec-future' は固有指定（必須）。pcPadding/spPadding=0で全幅フルブリード。
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: NAVY,
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-future',
      metadata: { name: 'Sec.Future' }
    }, [wrapper])
  ];

  return wp.blocks.serialize(tree);
})()
