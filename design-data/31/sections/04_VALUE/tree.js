(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント（datapack §3） ──
  const SERIF = "'Noto Serif JP', serif";    // 見出し系（03 / H2）
  const SANS  = "'Noto Sans JP', sans-serif"; // 本文系
  const JOST  = "'Jost', sans-serif";         // "Our Value"（欧文ラベル）

  // ── 共通カラー（datapack §3 実測値・推定上書き禁止） ──
  const GOLD  = '#c5a86d'; // ラベル "03" / "Our Value" / 横罫（実測値優先）
  const H2_C  = '#333333'; // H2 見出し（グレー20）
  const BODY  = '#666666'; // 本文（グレー40）
  const BG    = '#f2f2f2'; // セクション背景（微グレー白地）

  // ── アセット（datapack §5 guid実値確認済み・base http://localhost:8918） ──
  const IMG_BUILDING     = 'http://localhost:8918/wp-content/uploads/2026/06/value_building.png';     // ID43 / 553×368
  const IMG_CONSULTATION = 'http://localhost:8918/wp-content/uploads/2026/06/value_consultation.png'; // ID44 / 405×270

  // ============================================================
  // 左テキストカラム（Container 1:2119 / 幅約478px・縦並び・左寄せ・子間gap25）
  // datapack §1 積み上げ順: ラベル行 → H2 → 横罫 → 本文段落群
  // ============================================================

  // --- ラベル行（"03" + "OUR VALUE" / 横並び・中央揃え・"03"右padding20） ---
  const labelRow = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'flex-start',
    layoutAlign: 'center',
    metadata: { name: 'ラベル行' }
  }, [
    // "03"（Noto Serif JP Medium 40/40・ls 1.28px≈0.032em・右padding20）
    C('core/paragraph', {
      content: '03',
      style: {
        color: { text: GOLD },
        spacing: { padding: { right: '20px' } },
        typography: {
          fontFamily: SERIF, fontSize: '40px', fontWeight: '500',
          lineHeight: '40px', letterSpacing: '0.032em' // 1.28px / 40px
        }
      },
      metadata: { name: 'ラベル_03' }
    }),
    // "Our Value"（Jost Medium・uppercase表示・13/26・ls 1.95px=0.15em）
    C('core/paragraph', {
      content: 'OUR VALUE',
      style: {
        color: { text: GOLD },
        typography: {
          fontFamily: JOST, fontSize: '13px', fontWeight: '500',
          lineHeight: '26px', letterSpacing: '0.15em', // 1.95px / 13px
          textTransform: 'uppercase'
        }
      },
      metadata: { name: 'ラベル_Our Value' }
    })
  ]);

  // --- H2（Noto Serif JP Medium 32/48・ls 1.28px=0.04em・2行<br>・SWELL装飾中和） ---
  const heading = C('core/heading', {
    level: 2,
    className: 'is-style-section_ttl',
    content: '本当に価値ある選択を<br>追求し続ける。',
    style: {
      color: { text: H2_C },
      elements: { link: { color: { text: H2_C } } },
      typography: {
        fontFamily: SERIF, fontSize: '32px', fontWeight: '500',
        lineHeight: '48px', letterSpacing: '0.04em' // 1.28px / 32px
      }
    },
    metadata: { name: '見出し(H2)' }
  });

  // --- 横罫（divider / w40 h1 bg #c5a86d）: 幅40・高さ1のUBを地色ゴールドで表現 ---
  const divider = C('flavor/universal-block', {
    sizeWidth: '40', sizeWidthUnit: 'px',
    sizeHeight: '1', sizeHeightUnit: 'px',
    style: { color: { background: GOLD } },
    metadata: { name: '横罫' }
  });

  // --- 本文 第1段落（Noto Sans JP Regular 14/30・ls 1.28px≈0.091em・3行<br>） ---
  const para1 = C('core/paragraph', {
    content: 'また、私たちが大切にしているのは、<br>「お客様にとって本当に価値のある選択は何か」<br>を追求し続けることです。',
    style: {
      color: { text: BODY },
      typography: {
        fontFamily: SANS, fontSize: '14px', fontWeight: '400',
        lineHeight: '30px', letterSpacing: '0.091em' // 1.28px / 14px
      }
    },
    metadata: { name: '本文_第1段落' }
  });

  // --- 本文 第2段落（同スタイル・段落間gap30は spacing.margin.top で表現・3行<br>） ---
  const para2 = C('core/paragraph', {
    content: 'お客様一人ひとりの未来を見据え、<br>それぞれに最適なご提案を行うことで、<br>安心してご相談いただける存在であり続けたいと考えています。',
    style: {
      color: { text: BODY },
      spacing: { margin: { top: '30px', bottom: '0px' } }, // 段落間 gap 29.75≈30px
      typography: {
        fontFamily: SANS, fontSize: '14px', fontWeight: '400',
        lineHeight: '30px', letterSpacing: '0.091em'
      }
    },
    metadata: { name: '本文_第2段落' }
  });

  // --- 左テキストカラム（縦並び・左寄せ・子間gap25・幅478px固定で右画像エリアと分離） ---
  const textCol = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    sizeWidth: '478', sizeWidthUnit: 'px',
    spacingGap: '25', spacingGapUnit: 'px',
    metadata: { name: '左テキストカラム' }
  }, [labelRow, heading, divider, para1, para2]);

  // ============================================================
  // 右側装飾画像（コンテナ relative 基準の絶対配置・datapack §4 座標）
  // 建物写真: container内 left494 / top-101（上方向101pxはみ出し）/ 553×368 / 影あり
  //   影は flavor shadow拡張 imgBoxShadow custom: で表現可（box-shadow明示値あり）。
  // 打ち合わせ写真: abs(970,2985) → container border-box基準 left810 / top212 / 405×270
  //   （container abs左160 / abs上=section2718+pad55=2773 からの相対）
  // ※ 上方向breakout・右ブリードの「見え（クリップ抑止）」は座標属性では表現でき、
  //   実際に上/右へはみ出して見えるかは親の overflow に依存（下記報告: 要CSS）。
  // ============================================================

  // --- 建物写真（メイン装飾・右側大判・上はみ出し・影） ---
  const imgBuilding = C('core/image', {
    id: 43,
    url: IMG_BUILDING,
    alt: 'ASTERRA が手がける集合住宅の外観',
    sizeSlug: 'full',
    width: '553px',
    height: '368px',
    scale: 'cover',
    imgPositionType: 'absolute',
    imgPositionLeft: '494', imgPositionLeftUnit: 'px',
    imgPositionTop: '-101', imgPositionTopUnit: 'px',
    imgBoxShadow: 'custom:10px 10px 20px 0px rgba(0,0,0,0.25)', // datapack §4 実値
    style: { border: { radius: '0px' } },
    metadata: { name: '装飾_建物写真' }
  });

  // --- 打ち合わせ写真（サブ装飾・右下重なり） ---
  const imgConsultation = C('core/image', {
    id: 44,
    url: IMG_CONSULTATION,
    alt: '打ち合わせの様子',
    sizeSlug: 'full',
    width: '405px',
    height: '270px',
    scale: 'cover',
    imgPositionType: 'absolute',
    imgPositionLeft: '810', imgPositionLeftUnit: 'px',
    imgPositionTop: '212', imgPositionTopUnit: 'px',
    style: { border: { radius: '0px' } },
    metadata: { name: '装飾_打ち合わせ写真' }
  });

  // ============================================================
  // コンテナ（Container 1:2118 / 幅1015・中央寄せ・上padding55・relative）
  // 左右160マージン(1440基準)は max1015 + margin:auto で中央寄せに正規化。
  // 絶対配置画像(建物/打ち合わせ)の基準にするため positionType:relative。
  // 行レイアウト: 左テキストカラム(in-flow) + 右装飾画像(absolute)。
  // ============================================================
  const container = C('flavor/universal-block', {
    layoutDirection: 'row',
    layoutJustify: 'flex-start',
    layoutAlign: 'flex-start',
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1015', sizeMaxWidthUnit: 'px',
    spacingPadding: { top: '55', right: '0', bottom: '55', left: '0' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    metadata: { name: 'コンテナ' }
  }, [textCol, imgBuilding, imgConsultation]);

  // ============================================================
  // ルート: loos/full-wide（全幅・白系背景 #f2f2f2・padding0）
  // className:'sec-value' は固有指定（必須）。
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: BG,
      contentSize: 'full',
      pcPadding: '0',
      spPadding: '0',
      className: 'sec-value',
      metadata: { name: 'Sec.Value' }
    }, [container])
  ];

  return wp.blocks.serialize(tree);
})()
