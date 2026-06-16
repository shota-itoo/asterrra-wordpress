/**
 * Block Extension: 透過セクション
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

	addFilter('blocks.registerBlockType', 'flavor/block-opacity/attributes', function (settings, name) {
		var cfg = CONFIG[name];
		if (!cfg || !cfg.opacity) return settings;
		var options = typeof cfg.opacity === 'object' ? cfg.opacity : {};
		settings.attributes = Object.assign({}, settings.attributes, C.generateOpacityAttributes(cfg.prefix, options));
		return settings;
	});

	addFilter('editor.BlockEdit', 'flavor/block-opacity/edit', createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.opacity) return el(BlockEdit, props);
			var blockShort = props.name.replace(/[^a-z]/gi, '-');
			var opacityOptions = typeof cfg.opacity === 'object' ? cfg.opacity : {};
			return el(Fragment, null,
				el(BlockEdit, props),
				el(InspectorControls, { group: 'styles' },
					el(PanelBody, { title: '透過設定', initialOpen: false },
						el(TabPanel, {
							className: blockShort + '-opacity-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderOpacityTab(tab.name, cfg.prefix, {
									showBackgroundOpacity: !!opacityOptions.includeBackgroundOpacity
								}, props.attributes, props.setAttributes);
							}
						})
					)
				)
			);
		};
	}, 'withBlockOpacity'));
})();
