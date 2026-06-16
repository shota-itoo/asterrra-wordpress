/**
 * Block Extension: サイズセクション
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

	addFilter('blocks.registerBlockType', 'flavor/block-size/attributes', function (settings, name) {
		var cfg = CONFIG[name];
		if (!cfg || !cfg.size) return settings;
		settings.attributes = Object.assign({}, settings.attributes, C.generateSizeAttributes(cfg.prefix));
		return settings;
	});

	addFilter('editor.BlockEdit', 'flavor/block-size/edit', createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.size) return el(BlockEdit, props);
			var blockShort = props.name.replace(/[^a-z]/gi, '-');
			return el(Fragment, null,
				el(BlockEdit, props),
				el(InspectorControls, { group: 'styles' },
					el(PanelBody, { title: 'サイズ設定', initialOpen: false },
						el(TabPanel, {
							className: blockShort + '-size-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderSizeTab(tab.name, cfg.prefix, props.attributes, props.setAttributes);
							}
						})
					)
				)
			);
		};
	}, 'withBlockSize'));
})();
