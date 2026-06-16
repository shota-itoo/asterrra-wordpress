/**
 * Block Extension: ポジションセクション
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

	addFilter('blocks.registerBlockType', 'flavor/block-position/attributes', function (settings, name) {
		var cfg = CONFIG[name];
		if (!cfg || !cfg.position) return settings;
		settings.attributes = Object.assign({}, settings.attributes, C.generatePositionAttributes(cfg.prefix));
		return settings;
	});

	addFilter('editor.BlockEdit', 'flavor/block-position/edit', createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.position) return el(BlockEdit, props);
			var blockShort = props.name.replace(/[^a-z]/gi, '-');
			return el(Fragment, null,
				el(BlockEdit, props),
				el(InspectorControls, { group: 'default' },
					el(PanelBody, { title: 'ポジション設定', initialOpen: false },
						el(TabPanel, {
							className: blockShort + '-position-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderPositionTab(tab.name, cfg.prefix, props.attributes, props.setAttributes);
							}
						})
					)
				)
			);
		};
	}, 'withBlockPosition'));
})();
