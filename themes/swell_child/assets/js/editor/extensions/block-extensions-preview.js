/**
 * Block Extensions: エディタプレビューHOC（集約）
 * editor.BlockListBlock フィルターで各ブロックにスタイルを適用。
 *
 * - Desktop: inline style（従来通り・最高詳細度でGutenberg/SWELL に確実に勝つ）
 * - Tablet/Mobile: <style> タグ + media query + !important でレスポンシブプレビュー対応
 *   Gutenberg プレビューモード切替で iframe 幅が変わり media query が自動発火
 *
 * icon の inner_selector 分離、image の !important、universal-block スキップを処理。
 */
(function () {
	'use strict';
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var addFilter = wp.hooks.addFilter;
	var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
	var C = window.flavorBlockCommon;
	var CONFIG = window.flavorBlockExtensions || {};

	// !important が必要なサイズプロパティ（SWELL詳細度対策）
	var SIZE_PROPS_MAP = {
		width: 'width', maxWidth: 'max-width', minWidth: 'min-width',
		height: 'height', maxHeight: 'max-height', minHeight: 'min-height'
	};

	/**
	 * セレクタの specificity を上げる
	 */
	function highSpecSelector(uid, repeat) {
		var s = '';
		for (var i = 0; i < repeat; i++) s += '.' + uid;
		return s;
	}

	addFilter(
		'editor.BlockListBlock',
		'flavor/block-extensions/preview',
		createHigherOrderComponent(function (BlockListBlock) {
			return function (props) {
				var cfg = CONFIG[props.name];
				if (!cfg) {
					return el(BlockListBlock, props);
				}

				// universal-block はedit関数内で直接プレビューを処理するためスキップ
				if (props.name === 'flavor/universal-block') {
					return el(BlockListBlock, props);
				}

				var attributes = props.attributes;
				var prefix = cfg.prefix;

				// ── icon ブロック: 外側margin + 内側padding/style 分離 ──
				if (cfg.innerSelector) {
					var marginStyle = C.getPreviewStyles(prefix, attributes, { margin: true });
					var innerStyle = C.getPreviewStyles(prefix, attributes, {
						padding: true,
						shadow: true,
						backdropFilter: true,
						borderRadius: true,
						border: true,
						opacity: true
					});

					var hasMargin = Object.keys(marginStyle).length > 0;
					var hasInner = Object.keys(innerStyle).length > 0;

					if (!hasMargin && !hasInner) {
						return el(BlockListBlock, props);
					}

					var wrapperProps = Object.assign({}, props.wrapperProps || {});
					if (hasMargin) {
						wrapperProps.style = Object.assign({}, (wrapperProps.style || {}), marginStyle);
					}

					var newProps = Object.assign({}, props, { wrapperProps: wrapperProps });

					if (!hasInner) {
						return el(BlockListBlock, newProps);
					}

					// .icon-container 用の <style> タグを生成
					var uid = prefix + '-prev-' + props.clientId.substring(0, 8);
					wrapperProps.className = ((wrapperProps.className || '') + ' ' + uid).trim();

					var cssStr = '';
					var hasPadding = false;
					Object.keys(innerStyle).forEach(function (key) {
						var cssProp = key.replace(/([A-Z])/g, '-$1').toLowerCase();
						cssStr += cssProp + ':' + innerStyle[key] + ';';
						if (key.indexOf('padding') === 0) hasPadding = true;
					});
					if (hasPadding && cfg.innerBoxSizing) {
						cssStr += 'box-sizing:' + cfg.innerBoxSizing + ';';
					}

					return el(
						Fragment,
						null,
						el('style', null, '.' + uid + ' ' + cfg.innerSelector.trim() + '{' + cssStr + '}'),
						el(BlockListBlock, newProps)
					);
				}

				// ── 通常ブロック ──
				var previewOptions = {};
				if (cfg.size) previewOptions.size = true;
				if (cfg.flex) previewOptions.flex = true;
				if (cfg.spacing) {
					if (cfg.spacing.padding) previewOptions.padding = true;
					if (cfg.spacing.margin) previewOptions.margin = true;
				}
				if (cfg.shadow) previewOptions.shadow = true;
				if (cfg.backdropFilter) previewOptions.backdropFilter = true;
				if (cfg.borderRadius) previewOptions.borderRadius = true;
				if (cfg.border) previewOptions.border = true;
				if (cfg.opacity) previewOptions.opacity = true;
				if (cfg.position) previewOptions.position = true;

				// === Desktop: inline style（従来互換） ===
				var blockStyle = C.getPreviewStyles(prefix, attributes, previewOptions);

				// gap はプレビューに手動追加
				var gapConfig = (cfg.spacing && cfg.spacing.gap) ? { gap: true } : null;
				if (gapConfig) {
					C.addGapToStyle(blockStyle, prefix, attributes, '');
				}

				if (Object.keys(blockStyle).length === 0) {
					return el(BlockListBlock, props);
				}

				// === Tablet/Mobile: 共通関数で !important 付き media query 生成 ===
				var uid = prefix + '-prev-' + props.clientId.substring(0, 8);
				var sel = props.name === 'core/image'
					? highSpecSelector(uid, 5)
					: highSpecSelector(uid, 3);

				var responsiveCss = C.generateResponsiveOverrideCss(
					sel, prefix, attributes, previewOptions, gapConfig
				);

				// image ブロック: サイズプロパティは !important が必要（SWELL上書き対策）
				var sizeCss = '';
				if (props.name === 'core/image') {
					Object.keys(SIZE_PROPS_MAP).forEach(function (jsKey) {
						if (blockStyle[jsKey]) {
							sizeCss += SIZE_PROPS_MAP[jsKey] + ':' + blockStyle[jsKey] + ' !important;';
							delete blockStyle[jsKey];
						}
					});
				}

				var wrapperPropsStd = Object.assign({}, props.wrapperProps || {});

				// Desktop inline style を適用
				wrapperPropsStd.style = Object.assign({}, (wrapperPropsStd.style || {}), blockStyle);
				wrapperPropsStd.className = ((wrapperPropsStd.className || '') + ' ' + uid).trim();

				var hasStyleTag = sizeCss || responsiveCss;
				var styleContent = '';
				if (sizeCss) styleContent += sel + '{' + sizeCss + '}\n';
				if (responsiveCss) styleContent += responsiveCss;

				if (hasStyleTag) {
					return el(
						Fragment,
						null,
						el('style', null, styleContent),
						el(BlockListBlock, Object.assign({}, props, { wrapperProps: wrapperPropsStd }))
					);
				}

				return el(BlockListBlock, Object.assign({}, props, { wrapperProps: wrapperPropsStd }));
			};
		}, 'withBlockExtensionsPreview')
	);
})();
