/**
 * Block Extension: スペーシングセクション
 * 完全版（gap + padding + margin）とマージンのみ版を統合
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

	addFilter('blocks.registerBlockType', 'flavor/block-spacing/attributes', function (settings, name) {
		var cfg = CONFIG[name];
		if (!cfg || !cfg.spacing) return settings;
		settings.attributes = Object.assign({}, settings.attributes, C.generateSpacingAttributes(cfg.prefix, {
			gap: !!cfg.spacing.gap,
			padding: !!cfg.spacing.padding,
			margin: !!cfg.spacing.margin
		}));
		return settings;
	});

	addFilter('editor.BlockEdit', 'flavor/block-spacing/edit', createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.spacing) return el(BlockEdit, props);
			var blockShort = props.name.replace(/[^a-z]/gi, '-');
			var hasFullSpacing = cfg.spacing.gap || cfg.spacing.padding;
			var panels = [];

			if (hasFullSpacing) {
				panels.push(
					el(PanelBody, { key: 'spacing', title: 'スペーシング設定', initialOpen: false },
						el(TabPanel, {
							className: blockShort + '-spacing-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderSpacingTab(tab.name, cfg.prefix, props.attributes, props.setAttributes);
							}
						})
					)
				);
			} else if (cfg.spacing.margin) {
				panels.push(
					el(PanelBody, { key: 'margin', title: 'マージン設定', initialOpen: false },
						el(TabPanel, {
							className: blockShort + '-margin-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderMarginTab(tab.name, cfg.prefix, props.attributes, props.setAttributes);
							}
						})
					)
				);
			}

			if (panels.length === 0) return el(BlockEdit, props);

			return el(Fragment, null,
				el(BlockEdit, props),
				el(InspectorControls, { group: 'styles' }, panels)
			);
		};
	}, 'withBlockSpacing'));
})();
