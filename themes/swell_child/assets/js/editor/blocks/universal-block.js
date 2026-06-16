/**
 * Universal Block (汎用ブロック)
 * SWELLの干渉を避ける汎用コンテナブロック
 * レスポンシブFlexboxレイアウト設定付き
 *
 * スペーシング/サイズ/Flex/スタイル/アニメーション設定は
 * block-extensions と block-animation-editor extension が担当
 */
(function () {
	'use strict';

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var useInnerBlocksProps = wp.blockEditor.useInnerBlocksProps;
	var InnerBlocks = wp.blockEditor.InnerBlocks;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var SelectControl = wp.components.SelectControl;
	var TabPanel = wp.components.TabPanel;

	// 共通ライブラリ参照
	var C = window.flavorBlockCommon;

	// ── universal-block 固有定数 ──

	var TAG_OPTIONS = [
		{ label: '汎用コンテナ', value: 'div' },
		{ label: 'セクション', value: 'section' },
		{ label: '記事', value: 'article' },
		{ label: '補足情報', value: 'aside' },
		{ label: 'メインコンテンツ', value: 'main' },
		{ label: 'ヘッダー', value: 'header' },
		{ label: 'フッター', value: 'footer' },
		{ label: 'ナビゲーション', value: 'nav' },
		{ label: '見出し1（h1）', value: 'h1' },
		{ label: '見出し2（h2）', value: 'h2' },
		{ label: '見出し3（h3）', value: 'h3' },
		{ label: '見出し4（h4）', value: 'h4' },
		{ label: '見出し5（h5）', value: 'h5' },
		{ label: '見出し6（h6）', value: 'h6' }
	];

	// ── universal-block 固有関数 ──

	function getLayoutClasses(attributes) {
		var classes = [];
		if (attributes.layoutDirection) classes.push('has-ub-direction-' + attributes.layoutDirection);
		if (attributes.layoutJustify) classes.push('has-ub-justify-' + attributes.layoutJustify);
		if (attributes.layoutAlign) classes.push('has-ub-align-' + attributes.layoutAlign);
		if (attributes.layoutAlignSelf) classes.push('has-ub-align-self-' + attributes.layoutAlignSelf);
		if (attributes.layoutJustifySelf) classes.push('has-ub-justify-self-' + attributes.layoutJustifySelf);
		if (attributes.layoutDirectionTablet) classes.push('has-ub-tablet-direction-' + attributes.layoutDirectionTablet);
		if (attributes.layoutJustifyTablet) classes.push('has-ub-tablet-justify-' + attributes.layoutJustifyTablet);
		if (attributes.layoutAlignTablet) classes.push('has-ub-tablet-align-' + attributes.layoutAlignTablet);
		if (attributes.layoutAlignSelfTablet) classes.push('has-ub-tablet-align-self-' + attributes.layoutAlignSelfTablet);
		if (attributes.layoutJustifySelfTablet) classes.push('has-ub-tablet-justify-self-' + attributes.layoutJustifySelfTablet);
		if (attributes.layoutDirectionMobile) classes.push('has-ub-mobile-direction-' + attributes.layoutDirectionMobile);
		if (attributes.layoutJustifyMobile) classes.push('has-ub-mobile-justify-' + attributes.layoutJustifyMobile);
		if (attributes.layoutAlignMobile) classes.push('has-ub-mobile-align-' + attributes.layoutAlignMobile);
		if (attributes.layoutAlignSelfMobile) classes.push('has-ub-mobile-align-self-' + attributes.layoutAlignSelfMobile);
		if (attributes.layoutJustifySelfMobile) classes.push('has-ub-mobile-justify-self-' + attributes.layoutJustifySelfMobile);
		return classes.join(' ');
	}

	// ── 属性定義 ──

	// レイアウト属性（universal-block固有）
	var layoutAttributes = {
		layoutDirection: { type: 'string', default: '' },
		layoutJustify: { type: 'string', default: '' },
		layoutAlign: { type: 'string', default: '' },
		layoutAlignSelf: { type: 'string', default: '' },
		layoutJustifySelf: { type: 'string', default: '' },
		layoutOverflow: { type: 'string', default: '' },
		layoutDirectionTablet: { type: 'string', default: '' },
		layoutJustifyTablet: { type: 'string', default: '' },
		layoutAlignTablet: { type: 'string', default: '' },
		layoutAlignSelfTablet: { type: 'string', default: '' },
		layoutJustifySelfTablet: { type: 'string', default: '' },
		layoutOverflowTablet: { type: 'string', default: '' },
		layoutDirectionMobile: { type: 'string', default: '' },
		layoutJustifyMobile: { type: 'string', default: '' },
		layoutAlignMobile: { type: 'string', default: '' },
		layoutAlignSelfMobile: { type: 'string', default: '' },
		layoutJustifySelfMobile: { type: 'string', default: '' },
		layoutOverflowMobile: { type: 'string', default: '' }
	};

	// ── ブロック登録 ──
	// 注意: spacing/size/flex/style/animation 属性は extension が register_block_type_args で追加

	registerBlockType('flavor/universal-block', {
		apiVersion: 3,
		title: '汎用ブロック',
		__experimentalLabel: function (attributes, _ref) {
			var context = _ref.context;
			// WordPress「名前を変更」機能（metadata.name）が設定されていれば優先
			if (attributes.metadata && attributes.metadata.name) {
				return attributes.metadata.name;
			}
			var dir = attributes.layoutDirection;
			if (!dir) return '汎用ブロック';
			var labels = {
				'row': '汎用ブロック（横）',
				'column': '汎用ブロック（縦）',
				'row-reverse': '汎用ブロック（横逆）',
				'column-reverse': '汎用ブロック（縦逆）'
			};
			return labels[dir] || '汎用ブロック';
		},
		description: 'SWELLの干渉を受けない汎用コンテナブロック',
		icon: 'screenoptions',
		category: 'design',
		supports: {
			anchor: true,
			className: true,
			align: ['wide', 'full'],
			color: {
				background: true,
				text: true,
				gradients: true
			},
			spacing: {
				padding: true,
				margin: true,
				blockGap: true
			},
			__experimentalLayout: true
		},

		attributes: Object.assign({
			tagName: {
				type: 'string',
				default: 'div'
			}
		}, layoutAttributes),

		edit: function (props) {
			var tagName = props.attributes.tagName || 'div';
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			var layoutClassStr = getLayoutClasses(attributes);

			// エディタプレビュー: レイアウトに必要なスタイルのみ
			// スペーシング/サイズ/Flex/スタイルのプレビューは block-extensions が担当
			var blockStyle = {};

			// gap のプレビュー（PC値のみ。Tablet/MobileはgenerateResponsiveOverrideCssのmedia queryで処理）
			var gapRowCss = C.getCssValue(attributes.spacingGapRow, attributes.spacingGapRowUnit, true);
			var gapColCss = C.getCssValue(attributes.spacingGapColumn, attributes.spacingGapColumnUnit, true);
			if (gapRowCss || gapColCss) {
				if (gapRowCss) blockStyle.rowGap = gapRowCss;
				if (gapColCss) blockStyle.columnGap = gapColCss;
			} else {
				var gapCss = C.getCssValue(attributes.spacingGap, attributes.spacingGapUnit, true);
				if (gapCss) blockStyle.gap = gapCss;
			}

			// SWELL has-background 干渉防止
			blockStyle.padding = '0';
			var sp = attributes.spacingPadding || {};
			var pu = attributes.spacingPaddingUnit || 'preset';
			if (sp.top) blockStyle.paddingTop = C.getCssValue(sp.top, pu, true);
			if (sp.right) blockStyle.paddingRight = C.getCssValue(sp.right, pu, true);
			if (sp.bottom) blockStyle.paddingBottom = C.getCssValue(sp.bottom, pu, true);
			if (sp.left) blockStyle.paddingLeft = C.getCssValue(sp.left, pu, true);

			var sm = attributes.spacingMargin || {};
			var mu = attributes.spacingMarginUnit || 'preset';
			if (sm.top) blockStyle.marginTop = C.getCssValue(sm.top, mu, true);
			if (sm.right) blockStyle.marginRight = C.getCssValue(sm.right, mu, true);
			if (sm.bottom) blockStyle.marginBottom = C.getCssValue(sm.bottom, mu, true);
			if (sm.left) blockStyle.marginLeft = C.getCssValue(sm.left, mu, true);

			// サイズ（CSS変数も設定 — エディタの !important 上書き対策）
			if (attributes.sizeWidth) {
				var wVal = C.isSizeKeyword(attributes.sizeWidth) ? attributes.sizeWidth : attributes.sizeWidth + (attributes.sizeWidthUnit || 'px');
				blockStyle.width = wVal;
				blockStyle['--ub-width'] = wVal;
			}
			if (attributes.sizeMinWidth) {
				var mnwVal = C.isSizeKeyword(attributes.sizeMinWidth) ? attributes.sizeMinWidth : attributes.sizeMinWidth + (attributes.sizeMinWidthUnit || 'px');
				blockStyle.minWidth = mnwVal;
				blockStyle['--ub-min-width'] = mnwVal;
			}
			if (attributes.sizeMaxWidth) {
				var mxwVal = C.isSizeKeyword(attributes.sizeMaxWidth) ? attributes.sizeMaxWidth : attributes.sizeMaxWidth + (attributes.sizeMaxWidthUnit || 'px');
				blockStyle.maxWidth = mxwVal;
				blockStyle['--ub-max-width'] = mxwVal;
			}
			if (attributes.sizeHeight) {
				var hVal = C.isSizeKeyword(attributes.sizeHeight) ? attributes.sizeHeight : attributes.sizeHeight + (attributes.sizeHeightUnit || 'px');
				blockStyle.height = hVal;
				blockStyle['--ub-height'] = hVal;
			}
			if (attributes.sizeMinHeight) {
				var mnhVal = C.isSizeKeyword(attributes.sizeMinHeight) ? attributes.sizeMinHeight : attributes.sizeMinHeight + (attributes.sizeMinHeightUnit || 'px');
				blockStyle.minHeight = mnhVal;
				blockStyle['--ub-min-height'] = mnhVal;
			}
			if (attributes.sizeMaxHeight) {
				var mxhVal = C.isSizeKeyword(attributes.sizeMaxHeight) ? attributes.sizeMaxHeight : attributes.sizeMaxHeight + (attributes.sizeMaxHeightUnit || 'px');
				blockStyle.maxHeight = mxhVal;
				blockStyle['--ub-max-height'] = mxhVal;
			}
			if (attributes.sizeAspectRatio) blockStyle.aspectRatio = attributes.sizeAspectRatio;
			if (attributes.layoutOverflow) blockStyle.overflow = attributes.layoutOverflow;

			// Flex
			if (attributes.flexShorthand) blockStyle.flex = attributes.flexShorthand;
			if (attributes.flexWrap) blockStyle.flexWrap = attributes.flexWrap;
			if (attributes.flexGrow !== '' && attributes.flexGrow !== undefined) blockStyle.flexGrow = attributes.flexGrow;
			if (attributes.flexShrink !== '' && attributes.flexShrink !== undefined) blockStyle.flexShrink = attributes.flexShrink;
			if (attributes.flexBasis) blockStyle.flexBasis = attributes.flexBasis + (attributes.flexBasisUnit || 'px');
			if (attributes.flexOrder !== '' && attributes.flexOrder !== undefined) blockStyle.order = attributes.flexOrder;

			// スタイル（シャドウ / 角丸 / ボーダー / 透過）
			var shadowCss = C.getShadowCssValue(attributes.boxShadow);
			if (shadowCss) blockStyle.boxShadow = shadowCss;

			var br = attributes.customBorderRadius || {};
			var brUnit = attributes.customBorderRadiusUnit || 'px';
			if (br.topLeft) blockStyle.borderTopLeftRadius = br.topLeft + brUnit;
			if (br.topRight) blockStyle.borderTopRightRadius = br.topRight + brUnit;
			if (br.bottomRight) blockStyle.borderBottomRightRadius = br.bottomRight + brUnit;
			if (br.bottomLeft) blockStyle.borderBottomLeftRadius = br.bottomLeft + brUnit;
			if (br.topLeft || br.topRight || br.bottomRight || br.bottomLeft) blockStyle.overflow = 'hidden';

			blockStyle.borderWidth = '0';
			blockStyle.borderStyle = 'none';
			blockStyle.borderColor = 'transparent';

			var bw = attributes.customBorderWidth || {};
			var bStyle = attributes.customBorderStyle || '';
			var bColor = attributes.customBorderColor || '';
			var bStyleSides = attributes.customBorderStyleSides || {};
			var bStyleLinked = attributes.customBorderStyleLinked !== false;
			var bColorSides = attributes.customBorderColorSides || {};
			var bColorLinked = attributes.customBorderColorLinked !== false;
			['top', 'right', 'bottom', 'left'].forEach(function (side) {
				if (bw[side]) {
					var sStyle = (!bStyleLinked && bStyleSides[side]) ? bStyleSides[side] : (bStyle || 'solid');
					var sColor = (!bColorLinked && bColorSides[side]) ? bColorSides[side] : (bColor || '#000');
					var cssProp = 'border' + side.charAt(0).toUpperCase() + side.slice(1);
					blockStyle[cssProp] = bw[side] + 'px ' + sStyle + ' ' + sColor;
				}
			});

			if (attributes.elementOpacity !== '' && attributes.elementOpacity !== undefined) {
				blockStyle.opacity = parseInt(attributes.elementOpacity, 10) / 100;
			}

			// Position（PC値。Tablet/Mobile差分は generateResponsiveOverrideCss の media query で処理）
			Object.assign(blockStyle, C.getPreviewStyles('', attributes, { position: true }));

			// Background opacity（<style>タグで!important上書き）
			var bgOpacityCss = '';
			var bgOpacityUid = '';
			if (attributes.backgroundOpacity !== '' && attributes.backgroundOpacity !== undefined) {
				var bgAlpha = parseInt(attributes.backgroundOpacity, 10) / 100;
				var bgColor = '';
				if (attributes.style && attributes.style.color && attributes.style.color.background) {
					bgColor = attributes.style.color.background;
				} else if (attributes.backgroundColor) {
					var editorColors = wp.data.select('core/block-editor').getSettings().colors || [];
					for (var ci = 0; ci < editorColors.length; ci++) {
						if (editorColors[ci].slug === attributes.backgroundColor) {
							bgColor = editorColors[ci].color;
							break;
						}
					}
				}
				if (bgColor && bgColor.indexOf('#') === 0) {
					bgOpacityUid = 'ub-bgo-' + props.clientId.substring(0, 8);
					bgOpacityCss = '.' + bgOpacityUid + '{background-color:' + C.hexToRgba(bgColor, bgAlpha) + ' !important;}';
				}
			}

			// ── Tablet/Mobile レスポンシブオーバーライド ──
			// Tablet/Mobile差分は !important 付き media query で上書き
			var prevUid = 'ub-prev-' + props.clientId.substring(0, 8);
			var prevSel = '.' + prevUid + '.' + prevUid + '.' + prevUid + '.' + prevUid + '.' + prevUid;
			var responsiveOptions = {
				size: true, flex: true, padding: true, margin: true,
				shadow: true, backdropFilter: true, borderRadius: true,
				border: true, opacity: true, position: true
			};
			var responsiveCss = C.generateResponsiveOverrideCss(
				prevSel, '', attributes, responsiveOptions, { gap: true }
			);

			var editClass = (layoutClassStr || '') + ' ' + prevUid;
			if (bgOpacityUid) editClass = (editClass + ' ' + bgOpacityUid).trim();

			var blockProps = useBlockProps({
				className: editClass.trim() || undefined,
				style: blockStyle
			});
			var innerBlocksProps = useInnerBlocksProps(blockProps);

			var tabTitles = C.tabTitles;

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{
							title: 'HTML要素の設定',
							initialOpen: false
						},
						el(SelectControl, {
							label: 'HTML要素',
							value: tagName,
							options: TAG_OPTIONS,
							onChange: function (value) {
								setAttributes({ tagName: value });
							},
							__nextHasNoMarginBottom: true
						}),
						el(
							'p',
							{
								style: {
									fontSize: '12px',
									color: '#949494',
									fontFamily: 'monospace',
									marginTop: '4px'
								}
							},
							'<' + tagName + '>\u301C</' + tagName + '>'
						)
					),
					el(
						PanelBody,
						{
							title: 'レイアウト設定',
							initialOpen: false
						},
						el(TabPanel, {
							className: 'ub-layout-tab-panel',
							tabs: tabTitles,
							children: function (tab) {
								return C.renderLayoutTab(tab.name, '', attributes, setAttributes);
							}
						})
					)
				),
				responsiveCss ? el('style', null, responsiveCss) : null,
				bgOpacityCss ? el('style', null, bgOpacityCss) : null,
				el(tagName, innerBlocksProps)
			);
		},

		deprecated: [
			// v2: save() にアニメーション出力を含んでいた版（has-animation + data-animations）
			// block-animation.php の render_block で注入するのが正しいパターンのため廃止
			{
				attributes: Object.assign({
					tagName: { type: 'string', default: 'div' },
					customAnimations: { type: 'array', default: [] }
				}, layoutAttributes),
				save: function (props) {
					var tagName = props.attributes.tagName || 'div';
					var layoutClassStr = getLayoutClasses(props.attributes);
					var animations = props.attributes.customAnimations || [];
					var hasAnimation = animations.length > 0;
					var classes = [];
					if (layoutClassStr) classes.push(layoutClassStr);
					if (hasAnimation) classes.push('has-animation');
					var saveProps = {
						className: classes.length > 0 ? classes.join(' ') : undefined
					};
					if (hasAnimation) {
						saveProps['data-animations'] = JSON.stringify(animations);
					}
					var blockProps = useBlockProps.save(saveProps);
					return el(tagName, blockProps, el(InnerBlocks.Content));
				}
			},
			// v1: ブロックリンク + アニメーション出力を含んでいた版
			{
				attributes: Object.assign({
					tagName: { type: 'string', default: 'div' },
					customAnimations: { type: 'array', default: [] },
					blockLinkUrl: { type: 'string', default: '' },
					blockLinkTarget: { type: 'string', default: '_self' },
					blockLinkRel: { type: 'string', default: '' },
					blockLinkPostId: { type: 'number', default: 0 },
					blockLinkQuery: { type: 'string', default: '' },
					blockLinkHash: { type: 'string', default: '' }
				}, layoutAttributes,
					C.generateSpacingAttributes('', { gap: true, padding: true, margin: true }),
					C.generateSizeAttributes(''),
					C.generateFlexAttributes('', { includeWrap: true }),
					C.generateStyleAttributes('', { includeBackgroundOpacity: true })
				),
				save: function (props) {
					var tagName = props.attributes.tagName || 'div';
					var layoutClassStr = getLayoutClasses(props.attributes);
					var animations = props.attributes.customAnimations || [];
					var hasAnimation = animations.length > 0;
					var blockLinkUrl = props.attributes.blockLinkUrl || '';
					var blockLinkTarget = props.attributes.blockLinkTarget || '_self';
					var blockLinkRel = props.attributes.blockLinkRel || '';
					var blockLinkQuery = props.attributes.blockLinkQuery || '';
					var blockLinkHash = props.attributes.blockLinkHash || '';
					var classes = [];
					if (layoutClassStr) classes.push(layoutClassStr);
					if (hasAnimation) classes.push('has-animation');
					if (blockLinkUrl) classes.push('has-block-link');
					var saveProps = {
						className: classes.length > 0 ? classes.join(' ') : undefined
					};
					if (hasAnimation) {
						saveProps['data-animations'] = JSON.stringify(animations);
					}
					if (blockLinkUrl) {
						saveProps['data-block-link'] = blockLinkUrl + blockLinkQuery + blockLinkHash;
						saveProps['data-block-link-target'] = blockLinkTarget;
						if (blockLinkRel) saveProps['data-block-link-rel'] = blockLinkRel;
					}
					var blockProps = useBlockProps.save(saveProps);
					return el(tagName, blockProps, el(InnerBlocks.Content));
				}
			}
		],

		// save() はレイアウトクラスのみ出力
		// アニメーション（has-animation + data-animations）は block-animation.php の render_block で注入
		save: function (props) {
			var tagName = props.attributes.tagName || 'div';
			var layoutClassStr = getLayoutClasses(props.attributes);

			var classes = [];
			if (layoutClassStr) classes.push(layoutClassStr);

			var saveProps = {
				className: classes.length > 0 ? classes.join(' ') : undefined
			};

			var blockProps = useBlockProps.save(saveProps);
			return el(tagName, blockProps, el(InnerBlocks.Content));
		}
	});

})();
