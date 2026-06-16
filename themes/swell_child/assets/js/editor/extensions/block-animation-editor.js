/**
 * Block Animation Editor（統合）
 * アニメーション設定UIをHOC extensionとして共通化
 * 対象ブロックはPHPのFLAVOR_ANIMATION_ALLOWED_BLOCKSから渡される
 */
(function () {
	'use strict';

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var addFilter = wp.hooks.addFilter;
	var createHigherOrderComponent = wp.compose.createHigherOrderComponent;

	// 共通アニメーションコンポーネント参照
	var AC = window.flavorAnimationCommon;

	// PHPから渡される対象ブロック一覧
	var ALLOWED_BLOCKS = window.flavorAnimationAllowedBlocks || [];

	// ── フック: 属性登録 ──
	addFilter('blocks.registerBlockType', 'flavor/block-animation/attributes', function (settings, name) {
		if (ALLOWED_BLOCKS.indexOf(name) === -1) return settings;
		settings.attributes = Object.assign({}, settings.attributes, {
			customAnimations: { type: 'array', default: [] },
			customAspectRatio: { type: 'string', default: '' }
		});
		return settings;
	});

	// ── フック: InspectorControls UI（スタイルタブ） ──

	addFilter(
		'editor.BlockEdit',
		'flavor/block-animation/edit',
		createHigherOrderComponent(function (BlockEdit) {
			return function (props) {
				if (ALLOWED_BLOCKS.indexOf(props.name) === -1) {
					return el(BlockEdit, props);
				}

				var attributes = props.attributes;
				var setAttributes = props.setAttributes;

				return el(
					Fragment,
					null,
					el(BlockEdit, props),
					el(
						InspectorControls,
						{ group: 'styles' },
						el(
							PanelBody,
							{ title: 'アニメーション設定', initialOpen: false },
							el(AC.AnimationRepeater, {
								animations: attributes.customAnimations || [],
								onChange: function (newAnimations) {
									setAttributes({ customAnimations: newAnimations });
								}
							})
						)
					)
				);
			};
		}, 'withBlockAnimation')
	);

})();
