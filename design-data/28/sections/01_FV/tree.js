(() => {
  const b = wp.blocks;
  const C = (n, a, k) => b.createBlock(n, a, k || []);

  // ---- 共通フォント（datapack §3） ----
  const SERIF = "'Noto Serif JP', serif";     // ラベル「NEWS」/ H1「お知らせ」
  const SANS  = "'Noto Sans JP', sans-serif"; // サブテキスト

  // ---- 共通カラー（datapack §3 §7 実値・推定上書き禁止） ----
  // ※ このFV固有のゴールドは color/orange/64 = #c8a97e（ページ標準 #c5a059 とは別系統。datapack §3 注 / §8-1）
  const GOLD     = '#c8a97e';                  // ラベル「NEWS」/ 横罫（Tan / color/orange/64）
  const WHITE    = '#ffffff';                  // H1「お知らせ」
  const WHITE_90 = 'rgba(255,255,255,0.9)';    // サブテキスト（White 90%）
  const NAVY     = '#131c30';                  // 写真未読込時フォールバック地 / オーバーレイ基色（color/azure/13）

  // ============================================================
  // テキスト群（Container 1:4792 内側・左寄せ縦並び）
  // datapack §1 の積み上げ順：ラベル「NEWS」→ H1「お知らせ」→ 横罫 → サブテキスト
  // 各ブロックの下マージン（pb）で縦間隔を表現する（ラベル16 / H1 24 / 横罫24）。
  // ============================================================

  // --- ラベル「NEWS」（ゴールド・20px/28px/letter-spacing4px=0.2em・pb16） ---
  const label = C('core/paragraph', {
    content: 'NEWS',
    style: {
      color: { text: GOLD },
      spacing: { margin: { top: '0px', bottom: '16px' } }, // §1: ラベル下マージン16px
      typography: {
        fontFamily: SERIF, fontSize: '20px', fontWeight: '400',
        lineHeight: '28px', letterSpacing: '0.2em' // 4px / 20px
      }
    },
    metadata: { name: 'ラベル_NEWS' }
  });

  // --- H1「お知らせ」（白 solid・level:1・SWELL装飾中和・48px/48px/2.4px=0.05em・pb24） ---
  const h1 = C('core/heading', {
    level: 1,
    className: 'is-style-section_ttl',
    content: 'お知らせ',
    style: {
      color: { text: WHITE },
      elements: { link: { color: { text: WHITE } } },
      spacing: { margin: { top: '0px', bottom: '24px' } }, // §1: H1 下マージン24px
      typography: {
        fontFamily: SERIF, fontSize: '48px', fontWeight: '400',
        lineHeight: '48px', letterSpacing: '0.05em' // 2.4px / 48px
      }
    },
    metadata: { name: '見出し_お知らせ(H1)' }
  });

  // --- 横罫（gold divider / 48×2px・pb24） ---
  // §3：width48 / height2 / background #c8a97e。下マージン24px（§1 横罫下マージン）。
  const divider = C('flavor/universal-block', {
    sizeWidth: '48', sizeWidthUnit: 'px',
    sizeHeight: '2', sizeHeightUnit: 'px',
    spacingMargin: { top: '0', right: '0', bottom: '24', left: '0' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    style: { color: { background: GOLD } },
    metadata: { name: '横罫_gold_divider' }
  });

  // --- サブテキスト（白90%・16px/24px/letter-spacing0.4px=0.025em・2行 <br>） ---
  // datapack §2：「ASTERRA Corporationからの」⏎「最新情報をお届けします。」（一字一句・改行は<br>）
  const subText = C('core/paragraph', {
    content: 'ASTERRA Corporationからの<br>最新情報をお届けします。',
    style: {
      color: { text: WHITE_90 },
      typography: {
        fontFamily: SANS, fontSize: '16px', fontWeight: '300',
        lineHeight: '24px', letterSpacing: '0.025em' // 0.4px / 16px
      }
    },
    metadata: { name: 'サブテキスト' }
  });

  // ============================================================
  // FVラッパー（背景写真＝backgroundImage拡張・min-height450・縦中央寄せ・左寄せ）
  // positionType:relative を付与（オーバーレイ/装飾の基準・将来CSS用）。
  // datapack §1：Container x80 + 内側padding(left64) = 実効左端x144（ページ標準左マージン）。
  //   ここでは spacingPadding left144 / top40 で再現（§1 pt40 / 実効左端144px）。
  // ※ 左→右ネイビーグラデーションオーバーレイ・見出し/サブのtext-shadow はブロック属性で表現不可（要CSS）。
  //   backgroundImage 拡張の overlay は単色のみ・linear-gradient(to right) 非対応のため tree には含めない。
  // ============================================================
  // --- テキストコンテナ（max-width1280・中央寄せ・左右padding32px） ---
  // 背景写真は親ラッパーのまま全幅。テキストだけこの内側コンテナに収め、広い画面では最大1280pxで中央、
  // 狭い画面（〜960px等）では両端32pxの余白を保って左寄せのまま破綻しないようにする。
  // positionType:relative ＋ CSS z-index:2 で グラデ(::after z1) の前面に置く。
  const inner = C('flavor/universal-block', {
    className: 'sec-fv__inner',
    layoutDirection: 'column',
    layoutAlign: 'flex-start',
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMaxWidth: '1280', sizeMaxWidthUnit: 'px',
    spacingMargin: { right: 'auto', left: 'auto' },
    spacingMarginUnit: 'px', spacingMarginLinked: false,
    spacingPadding: { right: '32', left: '32' },
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'FVテキストコンテナ(max1280/中央/pad32)' }
  }, [label, h1, divider, subText]);

  const fvWrapper = C('flavor/universal-block', {
    layoutDirection: 'column',
    layoutJustify: 'center',
    layoutAlign: 'flex-start',
    positionType: 'relative',
    sizeWidth: '100', sizeWidthUnit: '%',
    sizeMinHeight: '450', sizeMinHeightUnit: 'px', // §1: FV高さ450px（下層小型ヒーロー）
    backgroundImageUrl: 'http://localhost:8918/wp-content/uploads/2026/06/asterrra-news-fv-bg.png',
    backgroundImageId: 66,
    backgroundImageSize: 'cover',
    backgroundImagePosition: 'center',
    spacingPadding: { top: '40', right: '0', bottom: '0', left: '0' }, // 横paddingは内側コンテナへ移管・縦pt40のみ
    spacingPaddingUnit: 'px', spacingPaddingLinked: false,
    metadata: { name: 'FVラッパー' }
  }, [inner]);

  // ============================================================
  // ルート：loos/full-wide（全幅・ネイビー地フォールバック）
  // className:'sec-fv' は固有指定（必須）。
  // ============================================================
  const tree = [
    C('loos/full-wide', {
      bgColor: NAVY,
      contentSize: 'full',
      pcPadding: '0', spPadding: '0',
      className: 'sec-fv',
      metadata: { name: 'Sec.FV' }
    }, [fvWrapper])
  ];

  return wp.blocks.serialize(tree);
})()
