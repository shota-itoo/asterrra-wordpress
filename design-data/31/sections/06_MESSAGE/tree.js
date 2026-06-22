(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント（datapack §3） ----
  const SERIF = "'Noto Serif JP', serif";    // 見出し系（MESSAGE / 氏名 / ゴーストタイポ）
  const SANS  = "'Noto Sans JP', sans-serif"; // 本文系（代表メッセージ / 本文 / 役職）

  // ---- 共通カラー（datapack §3 実値・推定上書き禁止） ----
  const GOLD  = '#C5A86D';   // 英字ラベル MESSAGE（Laser・Figma実値）
  const GREY  = '#666666';   // 和ラベル / 本文 / 署名役職（Dove Gray）
  const DARK  = '#333333';   // 署名 氏名（Mine Shaft）
  const WHITE = '#ffffff';   // 背景

  // ============================================================
  // 左テキスト列（Container 1:2134 / flex-column・左寄せ）
  // datapack §1 積み上げ順：MESSAGE → 代表メッセージ → 本文1 → 本文2 → 署名
  // 縦の余白は各要素の spacing.margin.top で個別表現（§7 padding-top 値）。
  // ============================================================

  // --- 英字ラベル「MESSAGE」（ゴールド・H2・SWELL装飾中和） ---
  //     §3: Noto Serif JP / 500 / 26px / 52px / 3.9px=0.15em / uppercase / left
  const labelEn = C('core/heading', {
    level: 2,
    className: 'is-style-section_ttl',
    content: 'MESSAGE',
    style: {
      color: { text: GOLD },
      elements: { link: { color: { text: GOLD } } },
      typography: {
        fontFamily: SERIF, fontSize: '26px', fontWeight: '500',
        lineHeight: '52px', letterSpacing: '0.15em', // 3.9px / 26px
        textTransform: 'uppercase'
      }
    },
    metadata: { name: '英字ラベル_MESSAGE(H2)' }
  });

  // --- 和ラベル「代表メッセージ」（グレー・11px/22px/1.32px=0.12em・上57px） ---
  const labelJa = C('core/paragraph', {
    content: '代表メッセージ',
    style: {
      color: { text: GREY },
      spacing: { margin: { top: '5px', bottom: '0px' } }, // §7: 前要素から gap 5px（実余白は line-height で吸収）
      typography: {
        fontFamily: SANS, fontSize: '11px', fontWeight: '400',
        lineHeight: '22px', letterSpacing: '0.12em' // 1.32px / 11px
      }
    },
    metadata: { name: '和ラベル_代表メッセージ' }
  });

  // --- 本文 段落1（グレー・14px/29.4px/1.28px≈0.0914em・上pt29 / 3行 <br>） ---
  //     §2 原文の句読点・スペースを一字一句保持（「と考えています。 」後ろは半角スペース）。
  const body1 = C('core/paragraph', {
    content: '私たちは、お客様の人生に寄り添う企業として、信頼される存在でありたい<br>と考えています。 一人ひとりの想いや課題に真摯に向き合い、最適なご提案<br>とサポートを通じて、安心と豊かさを届けることが私たちの使命です。',
    style: {
      color: { text: GREY },
      spacing: { margin: { top: '29px', bottom: '0px' } }, // §7: 本文段落1 pt 28.89≒29px
      typography: {
        fontFamily: SANS, fontSize: '14px', fontWeight: '400',
        lineHeight: '29.4px', letterSpacing: '0.0914em' // 1.28px / 14px
      }
    },
    metadata: { name: '本文_段落1' }
  });

  // --- 本文 段落2（グレー・14px/29.4px/1.28px≈0.0914em・上pt19 / 2行 <br>） ---
  const body2 = C('core/paragraph', {
    content: 'これからも変化を恐れず、挑戦を続けながら、お客様とともに未来を創造<br>し、長く信頼していただけるパートナーであり続けます。',
    style: {
      color: { text: GREY },
      spacing: { margin: { top: '19px', bottom: '0px' } }, // §7: 本文段落2 pt 19.195≒19px
      typography: {
        fontFamily: SANS, fontSize: '14px', fontWeight: '400',
        lineHeight: '29.4px', letterSpacing: '0.0914em' // 1.28px / 14px
      }
    },
    metadata: { name: '本文_段落2' }
  });

  // --- 署名 役職「代表取締役」（グレー・12px/24px/1.2px=0.1em・右揃え） ---
  const signRole = C('core/paragraph', {
    content: '代表取締役',
    align: 'right',
    style: {
      color: { text: GREY },
      spacing: { margin: { top: '0px', bottom: '0px' } },
      typography: {
        fontFamily: SANS, fontSize: '12px', fontWeight: '400',
        lineHeight: '24px', letterSpacing: '0.1em' // 1.2px / 12px
      }
    },
    metadata: { name: '署名_役職' }
  });

  // --- 署名 氏名「時田 和輝」（ダーク・18px/36px/3.6px=0.2em・右揃え） ---
  //     §2/§7: ダミー値の可能性大・デザイン通り正確抽出（全角スペース1つ）。後で差し替え前提。
  const signName = C('core/paragraph', {
    content: '時田　和輝',
    align: 'right',
    style: {
      color: { text: DARK },
      spacing: { margin: { top: '2px', bottom: '0px' } }, // §7: 署名ブロック内 gap 2px
      typography: {
        fontFamily: SERIF, fontSize: '18px', fontWeight: '500',
        lineHeight: '36px', letterSpacing: '0.2em' // 3.6px / 18px
      }
    },
    metadata: { name: '署名_氏名(仮)' }
  });

  // --- 署名ブロック（width 552・右揃え列・上pt45） ---
  const signature = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-end', // §1: 署名のみ右揃え
    sizeWidth: '552', sizeWidthUnit: 'px',
    spacingGap: '2', spacingGapUnit: 'px', // §7: 内 gap 2px
    spacingMargin: { top: '45', right: '0', bottom: '0', left: '0' }, // §7: 署名ブロック pt45
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    metadata: { name: '署名ブロック' }
  }, [signRole, signName]);

  // --- 左テキスト列（縦積み・左寄せ・width 1120 ガミー） ---
  //     §1: 可読幅は写真領域を避けて左約600px（実描画は写真がabsoluteで干渉せず1120幅可）。
  const textCol = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeWidth: '100', sizeWidthUnit: '%',
    spacingPadding: { top: '0', right: '40', bottom: '0', left: '0' }, // §3: Container 内 右 padding 40px
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: '左テキスト列' }
  }, [labelEn, labelJa, body1, body2, signature]);

  // ============================================================
  // 装飾写真レイヤー（§4・absolute 重なり配置）
  // 親(relative wrapper)基準のローカル座標へ換算。
  //   wrapper の左上 = section padding (top130/left144) を差し引いたコンテンツ原点。
  //   建物写真  グローバル x795,y207 → ローカル left=795-144=651 / top=207-130=77
  //   仲間写真  グローバル x953,y376 → ローカル left=953-144=809 / top=376-130=246
  // z重なり: 建物写真=背面(z1) / 仲間写真=前面(z2)。属性 imgPositionZIndex で表現。
  // ※ 角丸なし（§4: radius 実質0）。両写真とも box-shadow なし（§4）。
  // ※ ビューポート右端への breakout（§4/§7.3）は属性では不可 → 要CSS（下記報告）。
  //    ここでは container(1120)基準の left オフセットで近似配置する。
  // ============================================================

  // --- 建物写真（ID:40 / 346×231 / cover / 背面 z1） ---
  const photoBuilding = C('core/image', {
    id: 40,
    url: 'http://localhost:8918/wp-content/uploads/2026/06/message-building.png',
    alt: '',
    sizeSlug: 'full',
    width: '346px',
    height: '231px',
    scale: 'cover',
    imgPositionType: 'absolute',
    imgPositionLeft: '651', imgPositionLeftUnit: 'px',
    imgPositionTop: '77', imgPositionTopUnit: 'px',
    imgPositionZIndex: '1',
    style: { border: { radius: '0px' } },
    metadata: { name: '装飾_建物写真' }
  });

  // --- 仲間写真（ID:41 / 436×240 / cover・中央やや上トリミング / 前面 z2） ---
  const photoTeam = C('core/image', {
    id: 41,
    url: 'http://localhost:8918/wp-content/uploads/2026/06/message-team.png',
    alt: '',
    sizeSlug: 'full',
    width: '436px',
    height: '240px',
    scale: 'cover',
    imgPositionType: 'absolute',
    imgPositionLeft: '809', imgPositionLeftUnit: 'px',
    imgPositionTop: '246', imgPositionTopUnit: 'px',
    imgPositionZIndex: '2',
    style: { border: { radius: '0px' } },
    metadata: { name: '装飾_仲間写真' }
  });

  // ============================================================
  // 内側ラッパー（Container 1:2133 / max1120 中央寄せ・relative）
  // positionType:relative を付与し、装飾写真(absolute)の配置基準にする。
  // §1: Section padding top/bottom 130px・左144/右160 → 内側 max1120 中央寄せで再現。
  //     左右の非対称 padding はテキストの可読幅に影響しないため、max-width中央寄せ + 内右padding40で近似。
  // ============================================================
  const wrapper = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1120', sizeMaxWidthUnit: 'px',
    spacingPadding: { top: '130', right: '0', bottom: '130', left: '0' }, // §7: Section pt/pb 130
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    metadata: { name: 'Messageラッパー' }
  }, [textCol, photoBuilding, photoTeam]);

  // ============================================================
  // ルート：loos/full-wide（全幅・白地）
  // className:'sec-message' は固有指定（必須）。
  // ※ 背面ゴーストタイポ「MESSAGE」(ネイビー rgba(30,44,91,0.05)・200px・§4)は
  //   ::before 疑似要素案件のため属性では不可 → 要CSS（下記報告）。
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: WHITE,
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-message',
      metadata: { name: 'Sec.Message' }
    }, [wrapper])
  ];

  return wp.blocks.serialize(tree);
})()
