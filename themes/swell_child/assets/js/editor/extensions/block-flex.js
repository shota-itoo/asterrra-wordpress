/**
 * Block Extension: Flexセクション
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

	addFilter('blocks.registerBlockType', 'flavor/block-flex/attributes', function (settings, name) {
		var cfg = CONFIG[name];
		if (!cfg || !cfg.flex) return settings;
		settings.attributes = Object.assign({}, settings.attributes, C.generateFlexAttributes(cfg.prefix, { includeWrap: !!cfg.flex.includeWrap }));
		return settings;
	});

	addFilter('editor.BlockEdit', 'flavor/block-flex/edit', createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.flex) return el(BlockEdit, props);
			var blockShort = props.name.replace(/[^a-z]/gi, '-');
			return el(Fragment, null,
				el(BlockEdit, props),
				el(InspectorControls, { group: 'styles' },
					el(PanelBody, { title: 'Flex設定', initialOpen: false },
						el(TabPanel, {
							className: blockShort + '-flex-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderFlexTab(tab.name, cfg.prefix, { showContainer: !!cfg.flex.includeWrap }, props.attributes, props.setAttributes);
							}
						})
					)
				)
			);
		};
	}, 'withBlockFlex'));
})();
