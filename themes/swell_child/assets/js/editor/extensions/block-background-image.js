/**
 * Block Extension: 背景画像
 *
 * 現在 flavor/universal-block のみ有効。
 * JS側の属性定義は block-custom-common.js generateBackgroundImageAttributes() と同期。
 */
(function () {
	'use strict';
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var TabPanel = wp.components.TabPanel;
	var addFilter = wp.hooks.addFilter;
	var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
	var C = window.flavorBlockCommon;
	var CONFIG = window.flavorBlockExtensions || {};

	// ── 属性フィルター ──
	addFilter('blocks.registerBlockType', 'flavor/block-background-image/attributes', function (settings, name) {
		var cfg = CONFIG[name];
		if (!cfg || !cfg.backgroundImage) return settings;
		settings.attributes = Object.assign({}, settings.attributes, C.generateBackgroundImageAttributes());
		return settings;
	});

	// ── エディタUI HOC ──
	addFilter('editor.BlockEdit', 'flavor/block-background-image/edit', createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.backgroundImage) return el(BlockEdit, props);
			return el(Fragment, null,
				el(BlockEdit, props),
				el(InspectorControls, { group: 'styles' },
					el(PanelBody, { title: '背景画像', initialOpen: false },
						el(TabPanel, {
							className: 'ub-background-image-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderBackgroundImageTab(tab.name, props.attributes, props.setAttributes);
							}
						})
					)
				)
			);
		};
	}, 'withBlockBackgroundImage'));

	// ── ヘルパー: nullish チェック（0 を有効値として維持） ──
	function resolveOpacity(val, fallback) {
		if (val === undefined || val === null || val === '') return fallback;
		return val;
	}

	// ── ヘルパー: デバイス固有の設定があるか判定 ──
	function hasDeviceOverride(attrs, suffix) {
		var keys = ['backgroundImageUrl', 'backgroundImageSize', 'backgroundImagePosition', 'backgroundOverlayColor', 'backgroundOverlayOpacity'];
		for (var i = 0; i < keys.length; i++) {
			var v = attrs[keys[i] + suffix];
			if (v !== undefined && v !== null && v !== '') return true;
		}
		return false;
	}

	// ── ヘルパー: specificity用セレクタ生成（prevSel方式に統一） ──
	function highSpecSelector(uid, repeat) {
		var s = '';
		for (var i = 0; i < repeat; i++) s += '.' + uid;
		return s;
	}

	// ── ヘルパー: デバイス用背景CSS文字列を生成（PC値フォールバック付き） ──
	function buildBgCss(attrs, suffix) {
		if (!hasDeviceOverride(attrs, suffix)) return '';
		var url = attrs['backgroundImageUrl' + suffix] || attrs.backgroundImageUrl || '';
		if (!url) return '';
		var size = attrs['backgroundImageSize' + suffix] || attrs.backgroundImageSize || 'cover';
		var position = attrs['backgroundImagePosition' + suffix] || attrs.backgroundImagePosition || 'center';
		var overlayColor = attrs['backgroundOverlayColor' + suffix] || attrs.backgroundOverlayColor || '';
		var overlayOpacity = resolveOpacity(attrs['backgroundOverlayOpacity' + suffix], resolveOpacity(attrs.backgroundOverlayOpacity, '70'));

		var bgImage;
		if (overlayColor && C.hexToRgba) {
			var rgba = C.hexToRgba(overlayColor, parseInt(overlayOpacity, 10) / 100);
			bgImage = 'linear-gradient(' + rgba + ',' + rgba + '),url(' + url + ')';
		} else {
			bgImage = 'url(' + url + ')';
		}
		return 'background-image:' + bgImage + ' !important;background-size:' + size + ' !important;background-position:' + position + ' !important;background-repeat:no-repeat !important;';
	}

	// ── エディタプレビュー HOC ──
	// Desktop: inline style / Tablet・Mobile: <style> + media query + prevSel方式specificity
	addFilter('editor.BlockListBlock', 'flavor/block-background-image/preview', createHigherOrderComponent(function (BlockListBlock) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.backgroundImage) return el(BlockListBlock, props);

			var url = props.attributes.backgroundImageUrl;
			if (!url) return el(BlockListBlock, props);

			// === Desktop: inline style ===
			var size = props.attributes.backgroundImageSize || 'cover';
			var position = props.attributes.backgroundImagePosition || 'center';
			var overlayColor = props.attributes.backgroundOverlayColor || '';
			var overlayOpacity = resolveOpacity(props.attributes.backgroundOverlayOpacity, '70');

			var wrapperProps = Object.assign({}, props.wrapperProps || {});
			var existingStyle = wrapperProps.style || {};

			var bgImage;
			if (overlayColor && C.hexToRgba) {
				var rgba = C.hexToRgba(overlayColor, parseInt(overlayOpacity, 10) / 100);
				bgImage = 'linear-gradient(' + rgba + ',' + rgba + '), url(' + url + ')';
			} else {
				bgImage = 'url(' + url + ')';
			}

			var uid = 'bg-prev-' + props.clientId.substring(0, 8);
			wrapperProps.style = Object.assign({}, existingStyle, {
				position: 'relative',
				backgroundImage: bgImage,
				backgroundSize: size,
				backgroundPosition: position,
				backgroundRepeat: 'no-repeat'
			});
			wrapperProps.className = ((wrapperProps.className || '') + ' ' + uid).trim();

			// === Tablet/Mobile: <style> + media query（prevSel方式specificity） ===
			var sel = highSpecSelector(uid, 5);
			var responsiveCss = '';
			var tabletCss = buildBgCss(props.attributes, 'Tablet');
			var mobileCss = buildBgCss(props.attributes, 'Mobile');

			if (tabletCss) {
				responsiveCss += '@media(max-width:959px){' + sel + '{' + tabletCss + '}}\n';
			}
			if (mobileCss) {
				responsiveCss += '@media(max-width:599px){' + sel + '{' + mobileCss + '}}\n';
			}

			if (responsiveCss) {
				return el(Fragment, null,
					el('style', null, responsiveCss),
					el(BlockListBlock, Object.assign({}, props, { wrapperProps: wrapperProps }))
				);
			}

			return el(BlockListBlock, Object.assign({}, props, { wrapperProps: wrapperProps }));
		};
	}, 'withBlockBackgroundImagePreview'));
})();
