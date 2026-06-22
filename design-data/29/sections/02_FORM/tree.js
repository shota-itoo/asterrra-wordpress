(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント ──
  const SERIF = "'Noto Serif JP', serif";
  const SANS = "'Noto Sans JP', sans-serif";

  // ── 配色（datapack実値）──
  const NAVY = '#131C30';   // 右カード背景（color/azure/13 Big Stone）
  const GOLD = '#C8A97E';   // 電話番号・アクセント（color/orange/64 Tan）
  const CARD_BG = '#f8f9fa'; // 左フォームカード背景（color/grey/98-5）

  const tree = [
    C('loos/full-wide', {
      bgColor: '#ffffff',          // セクション背景（白）
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-form',
      metadata: { name: 'Sec.FORM' },
    }, [

      // ── 内側コンテナ：内コンテンツ幅1024・中央寄せ・縦積み（items-center）gap=64 ──
      // セクション左右padding64（px-[64px]）をここに集約、左右autoマージンで中央寄せ
      C('flavor/universal-block', {
        metadata: { name: 'FORM Inner' },
        layoutDirection: 'column',
        layoutAlign: 'center',
        sizeWidth: '100', sizeWidthUnit: '%',
        sizeMaxWidth: '1152',
        spacingPadding: { top: '80', right: '64', bottom: '80', left: '64' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
        spacingGap: '64', spacingGapUnit: 'px',
      }, [

        // ── リード文（中央寄せ・2行）Noto Serif JP 16/24 / 0.4px / #1f2937 ──
        C('flavor/universal-block', {
          metadata: { name: 'Lead Text' },
          layoutDirection: 'column',
          layoutAlign: 'center',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingGap: '0', spacingGapUnit: 'px',
        }, [
          C('core/paragraph', {
            align: 'center',
            content: '下記のフォームに必要事項をご入力のうえ、送信してください。',
            style: {
              color: { text: '#1f2937' },
              typography: { fontFamily: SERIF, fontSize: '16px', fontWeight: '400', lineHeight: '24px', letterSpacing: '0.025em' },
            },
          }),
          C('core/paragraph', {
            align: 'center',
            content: '内容を確認のうえ、担当者より折り返しご連絡いたします。',
            style: {
              color: { text: '#1f2937' },
              typography: { fontFamily: SERIF, fontSize: '16px', fontWeight: '400', lineHeight: '24px', letterSpacing: '0.025em' },
            },
          }),
        ]),

        // ── 2カラム本体：横flex / gap32 / items-start ──
        C('flavor/universal-block', {
          metadata: { name: 'Main: Form & Info' },
          layoutDirection: 'row',
          layoutAlign: 'start',
          sizeWidth: '100', sizeWidthUnit: '%',
          spacingGap: '32', spacingGapUnit: 'px',
        }, [

          // ── 左カラム：白フォームカード（器）→ 中に Snow Monkey Forms 埋め込み ──
          // 背景 #f8f9fa / border 1px #f3f4f6 / padding 64 / 弱い影 → 影は属性不可（要CSS）
          C('flavor/universal-block', {
            metadata: { name: 'Left: Form Card' },
            sizeWidth: '660', sizeWidthUnit: 'px',
            spacingPadding: { top: '64', right: '64', bottom: '64', left: '64' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
            style: {
              color: { background: CARD_BG },
              border: { width: '1px', color: '#f3f4f6', radius: '0px' },
            },
          }, [
            // フォーム本体（SMF が入力欄群をレンダリング）
            C('snow-monkey-forms/snow-monkey-form', { formId: 63 }),
          ]),

          // ── 右カラム：ネイビー連絡先カード ──
          // 背景 #131C30 / padding 48 / 縦flex・縦中央寄せ（justify-center）
          // カード全面の影 0 10 15 -3 / 0 4 6 -4 rgba(0,0,0,0.1) → 属性不可（要CSS）
          C('flavor/universal-block', {
            metadata: { name: 'Right: Contact Info' },
            layoutDirection: 'column',
            layoutJustify: 'center',
            layoutAlign: 'start',
            sizeWidth: '331', sizeWidthUnit: 'px',
            spacingPadding: { top: '48', right: '48', bottom: '48', left: '48' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
            style: {
              color: { background: NAVY },
            },
          }, [

            // ── ブロックA：電話お問い合わせ（下に48px余白）gap16 ──
            C('flavor/universal-block', {
              metadata: { name: 'Block A: Phone' },
              layoutDirection: 'column',
              layoutAlign: 'center',
              sizeWidth: '100', sizeWidthUnit: '%',
              spacingPadding: { top: '0', right: '0', bottom: '48', left: '0' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
              spacingGap: '16', spacingGapUnit: 'px',
            }, [

              // 見出し「お電話でのお問い合わせ」Noto Serif JP 14/20 / 1.4px / 白 / center
              C('core/paragraph', {
                align: 'center',
                content: 'お電話でのお問い合わせ',
                style: {
                  color: { text: '#ffffff' },
                  typography: { fontFamily: SERIF, fontSize: '14px', fontWeight: '400', lineHeight: '20px', letterSpacing: '0.1em' },
                },
              }),

              // 電話番号コンテナ（横並び・中央寄せ・アイコン＋番号 gap12・上pt8）
              C('flavor/universal-block', {
                metadata: { name: 'Phone Number' },
                layoutDirection: 'row',
                layoutJustify: 'center',
                layoutAlign: 'center',
                sizeWidth: '100', sizeWidthUnit: '%',
                spacingPadding: { top: '8', right: '0', bottom: '0', left: '0' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
                spacingGap: '12', spacingGapUnit: 'px',
              }, [
                // 電話アイコン（ゴールド受話器 28×28 / WP media ID 65）
                C('core/image', {
                  id: 65,
                  url: 'http://localhost:8918/wp-content/uploads/2026/06/asterrra-phone-icon.svg',
                  alt: '',
                  width: '28px',
                  height: '28px',
                }),
                // 番号「03 6912 0000」Noto Serif JP 30/36 / 1.5px / ゴールド / center
                C('core/paragraph', {
                  align: 'center',
                  content: '03 6912 0000',
                  style: {
                    color: { text: GOLD },
                    typography: { fontFamily: SERIF, fontSize: '30px', fontWeight: '400', lineHeight: '36px', letterSpacing: '0.05em' },
                  },
                }),
              ]),

              // 受付時間 Noto Sans JP 11/16.5 / 1.1px / #d1d5db / center（全角スペース U+3000）
              C('core/paragraph', {
                align: 'center',
                content: '受付時間　9:00-18:00（土日祝休）',
                style: {
                  color: { text: '#d1d5db' },
                  typography: { fontFamily: SANS, fontSize: '11px', fontWeight: '300', lineHeight: '16.5px', letterSpacing: '0.1em' },
                },
              }),
            ]),

            // ── 水平区切り線：高さ1px・幅100%・rgba(255,255,255,0.2) / 下に48px余白 ──
            C('flavor/universal-block', {
              metadata: { name: 'Divider' },
              sizeWidth: '100', sizeWidthUnit: '%',
              sizeHeight: '1', sizeHeightUnit: 'px',
              spacingMargin: { top: '0', right: '0', bottom: '48', left: '0' }, spacingMarginUnit: 'px', spacingMarginLinked: false,
              style: { color: { background: 'rgba(255,255,255,0.2)' } },
            }),

            // ── ブロックB：会社情報（左右px8 / H3と本文群の間 gap24）──
            C('flavor/universal-block', {
              metadata: { name: 'Block B: Company' },
              layoutDirection: 'column',
              layoutAlign: 'start',
              sizeWidth: '100', sizeWidthUnit: '%',
              spacingPadding: { top: '0', right: '8', bottom: '0', left: '8' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
              spacingGap: '24', spacingGapUnit: 'px',
            }, [

              // H3「会社情報」Noto Serif JP 16/24 / 1.6px / 白 / left（SWELL装飾中和）
              C('core/heading', {
                level: 3,
                className: 'is-style-section_ttl',
                content: '会社情報',
                style: {
                  color: { text: '#ffffff' },
                  elements: { link: { color: { text: '#ffffff' } } },
                  typography: { fontFamily: SERIF, fontSize: '16px', fontWeight: '400', lineHeight: '24px', letterSpacing: '0.1em' },
                },
              }),

              // B本文群（会社名ブロック / 住所 / TEL・FAX の3塊・gap32）
              C('flavor/universal-block', {
                metadata: { name: 'Company Body' },
                layoutDirection: 'column',
                layoutAlign: 'start',
                sizeWidth: '100', sizeWidthUnit: '%',
                spacingGap: '32', spacingGapUnit: 'px',
              }, [

                // 会社名ブロック（社名＋ヨミ・gap0でほぼ密着）
                C('flavor/universal-block', {
                  metadata: { name: 'Company Name' },
                  layoutDirection: 'column',
                  layoutAlign: 'start',
                  sizeWidth: '100', sizeWidthUnit: '%',
                  spacingGap: '0', spacingGapUnit: 'px',
                }, [
                  // 会社名 Noto Serif JP Light 14 / 22.75 / 0.7px / #f3f4f6 / left
                  C('core/paragraph', {
                    content: '株式会社ASTERRA Corporation',
                    style: {
                      color: { text: '#f3f4f6' },
                      typography: { fontFamily: SERIF, fontSize: '14px', fontWeight: '300', lineHeight: '22.75px', letterSpacing: '0.05em' },
                    },
                  }),
                  // ヨミ Noto Serif JP Light 12 / 16 / 0.7px / #f3f4f6 / left
                  C('core/paragraph', {
                    content: '（アステラコーポレーション）',
                    style: {
                      color: { text: '#f3f4f6' },
                      typography: { fontFamily: SERIF, fontSize: '12px', fontWeight: '300', lineHeight: '16px', letterSpacing: '0.05em' },
                    },
                  }),
                ]),

                // 住所 Noto Sans JP Light 14 / 28 / 0.7px / #f3f4f6 / left（⏎=<br>）
                C('core/paragraph', {
                  content: '〒000-0000<br>東京都豊島区東池袋0-0-0',
                  style: {
                    color: { text: '#f3f4f6' },
                    typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '300', lineHeight: '28px', letterSpacing: '0.05em' },
                  },
                }),

                // TEL/FAX Noto Sans JP Light 14 / 28 / 0.7px / #f3f4f6 / left（⏎=<br>）
                C('core/paragraph', {
                  content: 'TEL : 03 6912 0000<br>FAX : 03 6912 0000',
                  style: {
                    color: { text: '#f3f4f6' },
                    typography: { fontFamily: SANS, fontSize: '14px', fontWeight: '300', lineHeight: '28px', letterSpacing: '0.05em' },
                  },
                }),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ];

  return wp.blocks.serialize(tree);
})()
