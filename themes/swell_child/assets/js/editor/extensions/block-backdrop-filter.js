/**
 * Block Extension: Backdrop Filterセクション
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

	addFilter('blocks.registerBlockType', 'flavor/block-backdrop-filter/attributes', function (settings, name) {
		var cfg = CONFIG[name];
		if (!cfg || !cfg.backdropFilter) return settings;
		settings.attributes = Object.assign({}, settings.attributes, C.generateBackdropFilterAttributes(cfg.prefix));
		return settings;
	});

	addFilter('editor.BlockEdit', 'flavor/block-backdrop-filter/edit', createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var cfg = CONFIG[props.name];
			if (!cfg || !cfg.backdropFilter) return el(BlockEdit, props);
			var blockShort = props.name.replace(/[^a-z]/gi, '-');
			return el(Fragment, null,
				el(BlockEdit, props),
				el(InspectorControls, { group: 'styles' },
					el(PanelBody, { title: 'Backdrop Filter設定', initialOpen: false },
						el(TabPanel, {
							className: blockShort + '-backdrop-filter-tab-panel',
							tabs: C.tabTitles,
							children: function (tab) {
								return C.renderBackdropFilterTab(tab.name, cfg.prefix, props.attributes, props.setAttributes);
							}
						})
					)
				)
			);
		};
	}, 'withBlockBackdropFilter'));
})();
