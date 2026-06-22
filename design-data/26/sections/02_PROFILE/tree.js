(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ── 共通フォント（datapack §3：実フォントは Noto Serif JP 明朝。brief の Noto Sans JP ではない）──
  const SERIF = "'Noto Serif JP', serif";

  // 配色（datapack §3 実値）
  const NAVY        = '#131C30'; // ラベルセル背景
  const VALUE_BG    = '#ffffff'; // 値セル背景
  const LABEL_TEXT  = '#ffffff';
  const VALUE_TEXT  = '#1F2937';
  const ROW_BORDER  = '#E5E7EB';            // 値セル下罫線・テーブル末尾罫線
  const LABEL_BORDER = 'rgba(255,255,255,0.2)'; // ラベルセル下罫線（ネイビー上の白20%）
  // 行頭マーカー色 #C8A97E はリストマーカー色のため属性で出せず → 要CSS報告（後述）

  // letter-spacing：14px×1.4px=0.1em / 16px×0.4px=0.025em
  const LABEL_TYPO = { fontFamily: SERIF, fontSize: '14px', fontStyle: 'normal', fontWeight: '400', lineHeight: '20px', letterSpacing: '0.1em' };
  const VALUE_TYPO = { fontFamily: SERIF, fontSize: '16px', fontStyle: 'normal', fontWeight: '400', lineHeight: '24px', letterSpacing: '0.025em' };

  // ============================================================
  // ラベルセル（左・256px固定・ネイビー背景・白文字・中央寄せ）
  //   label   : ラベル文字列
  //   border  : 下罫線を引くか（最終FAX行のみ false）
  // ============================================================
  const labelCell = (label, border) =>
    C('flavor/universal-block', {
      sizeWidth: '256', sizeWidthUnit: 'px',
      layoutDirection: 'column',
      layoutJustify: 'center',
      layoutAlign: 'center',
      spacingPadding: { top: '24', right: '16', bottom: '24', left: '16' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false,
      style: Object.assign(
        { color: { background: NAVY } },
        border ? { border: { bottom: { color: LABEL_BORDER, width: '1px' } } } : {}
      ),
      className: 'pf-label',   // レスポンシブCSSフック
      metadata: { name: 'ラベル ' + label },
    }, [
      C('core/paragraph', {
        align: 'center',
        content: label,
        style: { color: { text: LABEL_TEXT }, typography: LABEL_TYPO },
      }),
    ]);

  // ラベルセル（リスト行 7/8・縦padding 40/40）
  const labelCellList = (label, border) =>
    C('flavor/universal-block', {
      sizeWidth: '256', sizeWidthUnit: 'px',
      layoutDirection: 'column',
      layoutJustify: 'center',
      layoutAlign: 'center',
      spacingPadding: { top: '40', right: '16', bottom: '40', left: '16' },
      spacingPaddingUnit: 'px', spacingPaddingLinked: false,
      style: Object.assign(
        { color: { background: NAVY } },
        border ? { border: { bottom: { color: LABEL_BORDER, width: '1px' } } } : {}
      ),
      className: 'pf-label',   // レスポンシブCSSフック
      metadata: { name: 'ラベル ' + label },
    }, [
      C('core/paragraph', {
        align: 'center',
        content: label,
        style: { color: { text: LABEL_TEXT }, typography: LABEL_TYPO },
      }),
    ]);

  // ============================================================
  // 標準行（label cell + 単一値の value cell）
  //   value セル：640px固定・白背景・左寄せ・縦padding24/24・左右padding48
  // ============================================================
  const stdRow = (label, value, border) =>
    C('flavor/universal-block', {
      layoutDirection: 'row',
      layoutAlign: 'stretch',
      sizeWidth: '100', sizeWidthUnit: '%',
      spacingGap: '0', spacingGapUnit: 'px',
      metadata: { name: '行 ' + label },
    }, [
      labelCell(label, border),
      C('flavor/universal-block', {
        sizeWidth: '640', sizeWidthUnit: 'px',
        layoutDirection: 'column',
        layoutJustify: 'center',
        spacingPadding: { top: '24', right: '48', bottom: '24', left: '48' },
        spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        style: Object.assign(
          { color: { background: VALUE_BG } },
          border ? { border: { bottom: { color: ROW_BORDER, width: '1px' } } } : {}
        ),
        className: 'pf-value',   // レスポンシブCSSフック
        metadata: { name: '値 ' + label },
      }, [
        C('core/paragraph', {
          content: value,
          style: { color: { text: VALUE_TEXT }, typography: VALUE_TYPO },
        }),
      ]),
    ]);

  // ============================================================
  // リスト行（事業内容・加盟団体）：value セル内に丸ドット箇条書き4項目
  //   value セル：640px固定・白背景・左寄せ・縦padding32/32・左右padding48
  //   箇条書きは core/list（マーカー色 #C8A97E は要CSS）
  // ============================================================
  const listRow = (label, items, border) =>
    C('flavor/universal-block', {
      layoutDirection: 'row',
      layoutAlign: 'stretch',
      sizeWidth: '100', sizeWidthUnit: '%',
      spacingGap: '0', spacingGapUnit: 'px',
      metadata: { name: '行 ' + label },
    }, [
      labelCellList(label, border),
      C('flavor/universal-block', {
        sizeWidth: '640', sizeWidthUnit: 'px',
        layoutDirection: 'column',
        layoutJustify: 'center',
        spacingPadding: { top: '32', right: '48', bottom: '32', left: '48' },
        spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        style: Object.assign(
          { color: { background: VALUE_BG } },
          border ? { border: { bottom: { color: ROW_BORDER, width: '1px' } } } : {}
        ),
        className: 'pf-value',   // レスポンシブCSSフック
        metadata: { name: '値 ' + label },
      }, [
        C('core/list', {
          className: 'asterrra-dotlist',
          style: {
            // 項目間ピッチ（datapack：item24 + gap16 = 40px）→ ブロック間スペーシング
            spacing: { blockGap: '15.5px' },
            color: { text: VALUE_TEXT },
            typography: VALUE_TYPO,
          },
        }, items.map((t) => C('core/list-item', { content: t }))),
      ]),
    ]);

  // ============================================================
  // テーブルコンテナ（column・width100%・maxWidth896・中央寄せ）
  //   末尾の全体下罫線（#E5E7EB）はコンテナ自身の border.bottom で表現
  // ============================================================
  const table = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'flex-start',
    layoutAlign: 'stretch',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '896',
    spacingGap: '0', spacingGapUnit: 'px',
    spacingMargin: { top: '0', right: 'auto', bottom: '0', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    style: { border: { bottom: { color: ROW_BORDER, width: '1px' } } }, // テーブル末尾の全体罫線
    className: 'profile-table',   // CSSフック（テーブル影）
    metadata: { name: 'PROFILE Table' },
  }, [
    stdRow('商号', '株式会社ASTERRA Corporation（アステラコーポレーション）', true),
    stdRow('代表者', '代表取締役　時田和輝', true),
    stdRow('所在地', '〒000-0000　東京都豊島区東池袋0-0-0', true),
    stdRow('適格請求書<br>事業者登録番号', 'T9013301054955', true), // SP改行: <br>はpf-label CSSでトグル（PC/TBはdisplay:none=1行）
    stdRow('顧問税理士', 'シェルパ税理士事務所', true),
    stdRow('免許', '宅地建物取引業　東京都知事（1）第113835号', true),
    listRow('事業内容', [
      '不動産の売買・仲介・賃貸・管理',
      '不動産に関するコンサルティング',
      '資産運用に関するコンサルティング',
      'リフォーム業',
    ], true),
    listRow('加盟団体', [
      '公益社団法人全日本不動産協会',
      '公益社団法人不動産保証協会',
      '一般社団法人全国不動産協会',
      '全日本不動産政治連盟',
    ], true),
    stdRow('TEL', '03 6912 0000', true),
    stdRow('FAX', '03 6912 0000', false), // 最終行：下罫線なし（末尾全体罫線でカバー）
  ]);

  // ============================================================
  // ルート：loos/full-wide（全幅・白地）
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: '#ffffff',
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-profile',
      metadata: { name: 'Sec.PROFILE' },
    }, [
      // セクション上下余白ラッパー（表とCONTACTの間に白い余白を作る）
      C('flavor/universal-block', {
        layoutDirection: 'column', sizeWidth: '100', sizeWidthUnit: '%',
        spacingPadding: { top: '80', bottom: '120' }, spacingPaddingUnit: 'px', spacingPaddingLinked: false,
        className: 'pf-inner',   // レスポンシブCSSフック（TB/SPで左右余白）
        metadata: { name: 'PROFILE 余白ラッパー' },
      }, [table]),
    ]),
  ];

  return wp.blocks.serialize(tree);
})()
