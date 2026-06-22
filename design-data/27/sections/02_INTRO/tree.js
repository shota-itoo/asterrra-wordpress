(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント（ページ標準 = 見出しSerif / 本文Sans）──
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // ── アセット（datapack §5 guid実値・base http://localhost:8918）──
  const IMG_INTRO = 'http://localhost:8918/wp-content/uploads/2026/06/intro-modern-apartment-building.png'; // ID33

  // ── 配色（datapack §3/§7 Figma実値を一次情報として採用）──
  const GOLD = '#c8a97e';   // ラベル・横罫（タン／ゴールド）
  const NAVY = '#131c30';   // H2（Big Stone ネイビー）
  const BODY = '#1f2937';   // 本文（Ebony Clay 濃グレーネイビー）

  const tree = [
    // ───────── セクション（白背景・full-wide・padding0） ─────────
    C('loos/full-wide', {
      bgColor: '#ffffff',
      contentSize: 'full',
      pcPadding: '0',
      spPadding: '0',
      className: 'sec-intro',
      metadata: { name: 'Sec.INTRO' }
    }, [
      // コンテナ（width1152・中央寄せ・横並び・items-center・gap64・padding py96 px32）
      //   datapack: セクションpadding上下96 / コンテンツ有効幅1152(左右544+gap64) = ページ標準1152と一致
      C('flavor/universal-block', {
        layoutDirection: 'row',
        layoutJustify: 'center',
        layoutAlign: 'center',
        sizeWidth: '100', sizeWidthUnit: '%',
        sizeMaxWidth: '1152', sizeMaxWidthUnit: 'px',
        spacingGap: '64', spacingGapUnit: 'px',
        spacingPadding: { top: '96', right: '32', bottom: '96', left: '32' },
        spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
        spacingMarginUnit: 'px', spacingMarginLinked: false,
        metadata: { name: 'コンテナ' }
      }, [

        // ───────── 左カラム：テキスト（縦積み・左寄せ・flex1=544px・gap16） ─────────
        C('flavor/universal-block', {
          layoutDirection: 'column',
          layoutJustify: 'flex-start',
          layoutAlign: 'flex-start',
          flexShorthand: '1',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingGap: '16', spacingGapUnit: 'px',
          metadata: { name: '左カラム' }
        }, [
          // ラベル INTRODUCTION（ゴールド #c8a97e・Noto Serif JP Regular 12/16・ls 2.4px=0.2em・全大文字）
          C('core/paragraph', {
            content: 'INTRODUCTION',
            style: {
              color: { text: GOLD },
              typography: {
                fontFamily: SERIF,
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '16px',
                letterSpacing: '0.2em'
              }
            }
          }),

          // H2 見出し（ネイビー #131c30・Noto Serif JP Regular 30/36・ls 0・pb8px）
          //   is-style-section_ttl: SWELLのh2デフォルトベタ塗り装飾を抑止（既存セクション見出しと統一）
          C('core/heading', {
            level: 2,
            content: '不動産は、未来をつくる資産。',
            className: 'is-style-section_ttl',
            style: {
              color: { text: NAVY },
              elements: { link: { color: { text: NAVY } } },
              spacing: { padding: { bottom: '8px' } },
              typography: {
                fontFamily: SERIF,
                fontSize: '30px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '36px',
                letterSpacing: '0'
              }
            }
          }),

          // 横罫（40×2px・ゴールド #c8a97e）
          C('flavor/universal-block', {
            metadata: { name: 'Divider' },
            sizeWidth: '40', sizeWidthUnit: 'px',
            sizeHeight: '2', sizeHeightUnit: 'px',
            style: { color: { background: GOLD } }
          }),

          // 本文ブロック（縦積み・段落間gap28・上pt16・濃グレー #1f2937 / Noto Sans JP Light 14/28・ls 0.35px=0.025em）
          C('flavor/universal-block', {
            metadata: { name: '本文' },
            layoutDirection: 'column',
            layoutJustify: 'flex-start',
            layoutAlign: 'flex-start',
            sizeWidth: '100', sizeWidthUnit: '%',
            spacingGap: '28', spacingGapUnit: 'px',
            spacingPadding: { top: '16', right: '0', bottom: '0', left: '0' },
            spacingPaddingUnit: 'px', spacingPaddingLinked: false
          }, [
            // 段落1（3行・手動改行2箇所）
            C('core/paragraph', {
              content: '私たちは、不動産を単なる「物件」ではなく、<br>お客様の未来を形づくる大切な資産であると考えています。',
              style: {
                color: { text: BODY },
                typography: {
                  fontFamily: SANS,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '300',
                  lineHeight: '28px',
                  letterSpacing: '0.025em'
                }
              }
            }),
            // 段落2（3行・手動改行2箇所）
            C('core/paragraph', {
              content: '住まいの購入や売却、資産形成、相続対策、賃貸経営など、<br>さまざまな選択においてお客様一人ひとりの想いや将来設計に寄り添いながら、<br>最適なご提案を行います。',
              style: {
                color: { text: BODY },
                typography: {
                  fontFamily: SANS,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '300',
                  lineHeight: '28px',
                  letterSpacing: '0.025em'
                }
              }
            }),
            // 段落3（2行・手動改行1箇所）
            C('core/paragraph', {
              content: '目先の利益だけではなく、<br>その先にある未来を見据えた価値あるサポートを提供いたします。',
              style: {
                color: { text: BODY },
                typography: {
                  fontFamily: SANS,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '300',
                  lineHeight: '28px',
                  letterSpacing: '0.025em'
                }
              }
            })
          ])
        ]),

        // ───────── 右カラム：画像（flex1=544px / 544×400・cover） ─────────
        //   ※ drop-shadow (box-shadow: 0 10px 15px -3px ... / shadow-lg) は core/image 属性で表現不可
        //     → 「要CSS: Intro画像影」報告参照
        C('flavor/universal-block', {
          layoutDirection: 'column',
          layoutJustify: 'flex-start',
          layoutAlign: 'flex-start',
          flexShorthand: '1',
          sizeWidth: '100', sizeWidthUnit: '%',
          metadata: { name: '右カラム' }
        }, [
          C('core/image', {
            id: 33,
            url: IMG_INTRO,
            alt: 'モダンなマンション・集合住宅の外観',
            sizeSlug: 'full',
            width: '544px',
            height: '400px',
            scale: 'cover'
          })
        ])
      ])
    ])
  ];

  return wp.blocks.serialize(tree);
})()
