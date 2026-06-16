/**
 * Block Extension: 角丸セクション
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

	addFilter('blocks.registerBlockType', 'flavor/block-border-radius/attributes', function (settings, name) {
		var cfg = CONFIG[name];
		if (!cfg || !cfg.borderRadius) return settings;
		settings.attributes = Object.assign({}, settings.attributes, C.generateBorderRadiusAttributes(cfg.prefix));
		return settings;
	});

	addFilter('editor.BlockEdit', 'flavor/block-border-radius/edit', createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.borderRadius) return el(BlockEdit, props);
			var blockShort = props.name.replace(/[^a-z]/gi, '-');
			return el(Fragment, null,
				el(BlockEdit, props),
				el(InspectorControls, { group: 'styles' },
					el(PanelBody, { title: '角丸設定', initialOpen: false },
						el(TabPanel, {
							className: blockShort + '-border-radius-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderBorderRadiusTab(tab.name, cfg.prefix, props.attributes, props.setAttributes);
							}
						})
					)
				)
			);
		};
	}, 'withBlockBorderRadius'));
})();
