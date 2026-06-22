/**
 * News List Block (asterrra/news-list) エディタ登録
 *
 * 動的ブロック。サーバーサイドの render_callback を ServerSideRender で
 * プレビューする。IIFE / no JSX / no build step。
 * save は null（動的ブロックなのでフロントは PHP がレンダリング）。
 */
(function () {
	'use strict';

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var RangeControl = wp.components.RangeControl;
	// wp.serverSideRender は wp-server-side-render 依存で提供される
	var ServerSideRender = wp.serverSideRender;

	registerBlockType('asterrra/news-list', {
		apiVersion: 3,
		title: 'お知らせ一覧（asterrra）',
		description: 'カテゴリフィルタ・ページネーション付きの動的お知らせ一覧（投稿を表示）。',
		icon: 'list-view',
		category: 'design',
		supports: {
			html: false,
			align: ['wide', 'full']
		},
		attributes: {
			postsPerPage: { type: 'number', default: 8 }
		},

		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var blockProps = useBlockProps();

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: '表示設定', initialOpen: true },
						el(RangeControl, {
							label: '1ページの表示件数',
							value: attributes.postsPerPage,
							min: 1,
							max: 30,
							onChange: function (value) {
								setAttributes({ postsPerPage: value });
							},
							__nextHasNoMarginBottom: true
						})
					)
				),
				el(
					'div',
					blockProps,
					ServerSideRender
						? el(ServerSideRender, {
							block: 'asterrra/news-list',
							attributes: attributes
						})
						: el('p', null, 'お知らせ一覧（プレビューを読み込めません）')
				)
			);
		},

		// 動的ブロック: フロントは render_callback が描画
		save: function () {
			return null;
		}
	});
})();
