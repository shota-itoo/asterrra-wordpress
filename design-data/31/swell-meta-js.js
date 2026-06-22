/* Philosophy セクション: PCの2カラム(絶対配置・設計幅1280px)を、縦積みにせず比率を保ったまま
   利用可能幅に合わせて等倍縮小する。CSSのcalcではscale係数(無単位比率)を算出できないためJSで行う。
   ・左端の営業写真はパネル(grayBox)左端から 51px 外へ食い出す(imgPositionLeft:-51)。小幅時に
     画面端へ寄りすぎる/見切れるため、写真左端へ常に LEFT_GAP(32px) を確保する。
   ・パネル右端はデザイン通り画面右端までブリード(::after)させる。
   ≥1440px は自然な desktop レイアウト(中央寄せ)に任せる。 */
(function () {
  var DESIGN_W = 1280;   // grayBox 設計幅
  var DESIGN_H = 550;    // grayBox 設計高さ
  var BREAKOUT = 51;     // salesPhoto がパネル左端より外へ食い出す量(imgPositionLeft:-51)
  var PHOTO_UP = 74;     // 写真群がパネル上端より上へ食い出す量(imgPositionTop:-74)
  var LEFT_GAP = 32;     // 小幅時に写真左端へ確保する画面左の余白

  function fitPhilosophy() {
    var gb = document.querySelector('.sec-philosophy .philosophy-graybox');
    if (!gb || !gb.parentElement) return;
    var parent = gb.parentElement; // Philosophy 内側コンテナ
    var cs = window.getComputedStyle(parent);
    var clientW = document.documentElement.clientWidth;

    // ≥1440px は元の desktop レイアウト(中央寄せ＋CSSブリード)に任せる
    var active = window.matchMedia('(min-width: 960px) and (max-width: 1439px)').matches;

    var effScale = 1;
    if (active) {
      // 写真左端(LEFT_GAP)〜パネル右端 の総設計幅 = BREAKOUT + DESIGN_W を、画面幅から左余白を引いた
      // 範囲に収める。これで scale は自分で設定する padding に依存せず確定する(結合を断つ)。
      var scale = Math.min(1, (clientW - LEFT_GAP) / (BREAKOUT + DESIGN_W));

      // 親はflex-direction:column。親の高さを縮めるとgrayBoxがmain軸(縦)でflex-shrinkにより
      // レイアウト高さ550が潰れ、transformと二重縮小してパネルがテキストより低くなる。
      // flex-shrink:0でレイアウト高さ550を必ず維持する。
      gb.style.flexShrink = '0';
      gb.style.transformOrigin = 'top left';
      gb.style.transform = (scale < 0.999) ? ('scale(' + scale + ')') : '';
      effScale = scale;

      // 親(flex-column)の既定 justify-content:center はレイアウト高さ550(flex-shrink:0)を基準に
      // 縦中央寄せするが、視覚は550×scaleと短いため中央基準がズレ、パネル下に大余白が出る。
      // 上揃え(flex-start)に変え、下で親高さを視覚高さに合わせることで上下余白を130px(=内側pad)に統一。
      parent.style.setProperty('justify-content', 'flex-start', 'important');

      // 左パディング = LEFT_GAP + 写真の食い出し(視覚) → 写真左端がちょうど LEFT_GAP に来る。
      // @media 側の padding-left:40!important を上回るため important で指定。
      parent.style.setProperty('padding-left', (LEFT_GAP + BREAKOUT * scale) + 'px', 'important');

      // 縮小後の視覚高さ(550×scale)に親の高さを合わせる。さらに、写真群が上へ74×scale食い出す分
      // 「写真上の白」が「パネル下の白」より狭く見えるので、親高さを 74×scale 縮めて下の白を詰め、
      // 上下の白(=見えるコンテンツの上下余白)を揃える。
      var pt = parseFloat(cs.paddingTop) || 0;
      var pb = parseFloat(cs.paddingBottom) || 0;
      parent.style.height = (pt + DESIGN_H * scale + pb - PHOTO_UP * scale) + 'px';
    } else {
      gb.style.flexShrink = '';
      gb.style.transform = '';
      parent.style.height = '';
      parent.style.removeProperty('padding-left');
      parent.style.removeProperty('justify-content');
    }

    // 右ブリード: グレーパネルを画面右端まで伸ばす。パネル右端→画面端の距離は幅・scaleで変わるため、
    // transform/padding 適用後の実測値から算出してCSS変数にセットする
    // （::after はパネルの子＝transformで縮むので、見た目の必要幅を effScale で割ってパネル座標へ）。
    var rect = gb.getBoundingClientRect();
    var bleedVisual = Math.max(0, clientW - rect.right);
    gb.style.setProperty('--gb-bleed', (bleedVisual / effScale) + 'px');
  }

  function ready() {
    fitPhilosophy();
    // 画像読み込み等でレイアウトが変わる可能性に備え軽く再計算
    window.setTimeout(fitPhilosophy, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
  window.addEventListener('load', fitPhilosophy);
  window.addEventListener('resize', fitPhilosophy);
  window.addEventListener('orientationchange', fitPhilosophy);
})();

/* VALUE セクション: 角丸パネル＋テキスト＋写真の構図(絶対配置・基準幅1440)を、≤1439px で
   transform:scale により比率を維持して縮小し、960pxまで位置関係を保つ。CSSのcalcでscale係数を
   作れないためJSで行う。.sec-value は overflow:clip（横はみ出し抑止）、上余白(padding-top)内に
   建物写真の上食い出しを内包。≥1440 は等倍(自然レイアウト)。 */
(function () {
  var VAL_W = 1440; // 構図の基準幅

  function fitValue() {
    var sec = document.querySelector('.sec-value');
    if (!sec) return;
    var inner = sec.querySelector('.swell-block-fullWide__inner');
    if (!inner) return;
    var active = window.matchMedia('(min-width: 960px) and (max-width: 1439px)').matches;
    var vcs = window.getComputedStyle(sec);
    var pt = parseFloat(vcs.paddingTop) || 0;
    var pb = parseFloat(vcs.paddingBottom) || 0; // パネル下の白余白（上=padding-topと対称）

    if (active) {
      var vw = document.documentElement.clientWidth;
      var s = Math.min(1, vw / VAL_W);
      inner.style.transformOrigin = 'top left';
      inner.style.transform = 'scale(' + s + ')';

      // scale後の構図の実下端を測り、.sec-value 高さをそれに合わせて余白/重なりを解消する。
      var base = inner.getBoundingClientRect().top;       // scale後の inner 視覚top（=padding下端）
      var maxBottom = inner.getBoundingClientRect().bottom;
      inner.querySelectorAll('*').forEach(function (el) {
        var b = el.getBoundingClientRect().bottom;
        if (b > maxBottom) maxBottom = b;
      });
      sec.style.height = (pt + (maxBottom - base) + pb) + 'px'; // 末尾に padding-bottom 分の白余白を確保
    } else {
      inner.style.transform = '';
      sec.style.height = '';
    }
  }

  function ready() {
    fitValue();
    window.setTimeout(fitValue, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
  window.addEventListener('load', fitValue);
  window.addEventListener('resize', fitValue);
  window.addEventListener('orientationchange', fitValue);
})();

/* MESSAGE セクション: 構図(透かし・テキスト・右写真2枚の絶対配置)は max-width:1120px の
   コンテナ基準で組まれており、≥1120px では中央寄せで収まる。だが 1120px 未満では
   コンテナが縮む一方、写真は絶対配置(left 651/809＋幅)のままコンテナ右を越え、
   .sec-message の overflow:hidden で右側がクリップ＝見切れる（960px で顕著）。
   VALUE/Philosophy と同様に、vw<1120 では構図を 1120px のまま保持して transform:scale で
   比率維持縮小し、960px でも全体が収まるようにする。CSS calc では scale 係数を作れないため JS。
   ・width:1120 を強制し margin-left:SIDE(32px)＋ transform-origin:top left で縮小 → 左端を
     画面端から 32px の位置に固定し、視覚幅が (vw−2×32) になるよう scale=(vw−64)/1120 で縮小。
     これで内容が 32px 〜 vw−32px に収まり、左右どちらの画面端にも 32px の余白を確保する。
     （過幅要素の margin:auto は負にならず 0 に解決され中心がずれるため中央維持には使えない）
   ・適用開始は vw < 1184(=1120+32×2)。vw=1184 で s=1（自然レイアウトの中央寄せ余白32pxと連続）。
   ・transform はレイアウト高さを変えないため、.sec-message の高さを縮小後の視覚高さに合わせる。 */
(function () {
  var MSG_W = 1120; // 構図(コンテナ)の基準幅
  var SIDE = 32;    // 画面端に確保する左右の余白

  function fitMessage() {
    var sec = document.querySelector('.sec-message');
    if (!sec) return;
    var comp = sec.querySelector('.swell-block-fullWide__inner > .wp-block-flavor-universal-block');
    if (!comp) return;
    var vw = document.documentElement.clientWidth;
    var active = vw >= 960 && vw < MSG_W + SIDE * 2;  /* ≤959(SP)はJS縮小せずCSSに委ねる */

    if (active) {
      var s = (vw - SIDE * 2) / MSG_W;
      comp.style.width = MSG_W + 'px';      // 縮ませず 1120 を保持
      comp.style.marginLeft = SIDE + 'px';  // 左端を画面端から 32px に固定
      comp.style.marginRight = '0';
      comp.style.transformOrigin = 'top left';
      comp.style.transform = 'scale(' + s + ')';

      // 縮小後の視覚高さ(=構図の実下端−上端)に .sec-message の高さを合わせ、下の余白/被りを解消する。
      var top = comp.getBoundingClientRect().top;
      var maxBottom = comp.getBoundingClientRect().bottom;
      comp.querySelectorAll('*').forEach(function (el) {
        var bb = el.getBoundingClientRect().bottom;
        if (bb > maxBottom) maxBottom = bb;
      });
      sec.style.height = (maxBottom - top) + 'px';
    } else {
      comp.style.width = '';
      comp.style.marginLeft = '';
      comp.style.marginRight = '';
      comp.style.transform = '';
      comp.style.transformOrigin = '';
      sec.style.height = '';
    }
  }

  function ready() {
    fitMessage();
    window.setTimeout(fitMessage, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
  window.addEventListener('load', fitMessage);
  window.addEventListener('resize', fitMessage);
  window.addEventListener('orientationchange', fitMessage);
})();
