/**
 * Block Link Editor
 * コアブロック向けブロックリンクのエディタUI
 */
(function () {
	'use strict';

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var useState = wp.element.useState;
	var useEffect = wp.element.useEffect;
	var addFilter = wp.hooks.addFilter;
	var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
	var InspectorControls = wp.blockEditor.InspectorControls || wp.editor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var SelectControl = wp.components.SelectControl;

	// 対象ブロック
	var ALLOWED_BLOCKS = [
		'core/columns',
		'core/column',
		'core/cover',
		'core/media-text',
		'core/paragraph',
		'flavor/universal-block'
	];

	/**
	 * 属性追加
	 */
	addFilter('blocks.registerBlockType', 'flavor/block-link-attributes', function (settings, name) {
		if (ALLOWED_BLOCKS.indexOf(name) === -1) {
			return settings;
		}

		settings.attributes = Object.assign({}, settings.attributes, {
			blockLinkUrl: { type: 'string', default: '' },
			blockLinkTarget: { type: 'string', default: '_self' },
			blockLinkRel: { type: 'string', default: '' },
			blockLinkPostId: { type: 'number', default: 0 },
			blockLinkQuery: { type: 'string', default: '' },
			blockLinkHash: { type: 'string', default: '' }
		});

		return settings;
	});

	/**
	 * エディタUI追加
	 */
	var withBlockLinkControls = createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			if (ALLOWED_BLOCKS.indexOf(props.name) === -1) {
				return el(BlockEdit, props);
			}

			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			var _sq = useState('');
			var searchQuery = _sq[0];
			var setSearchQuery = _sq[1];
			var _sr = useState([]);
			var searchResults = _sr[0];
			var setSearchResults = _sr[1];

			useEffect(function () {
				if (!searchQuery || searchQuery.length < 2) {
					setSearchResults([]);
					return;
				}
				var timer = setTimeout(function () {
					wp.apiFetch({
						path: '/wp/v2/search?search=' + encodeURIComponent(searchQuery) + '&per_page=5&type=post'
					}).then(function (results) {
						setSearchResults(results);
					}).catch(function () {
						setSearchResults([]);
					});
				}, 300);
				return function () { clearTimeout(timer); };
			}, [searchQuery]);

			return el(
				Fragment,
				null,
				el(BlockEdit, props),
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{
							title: '\u30D6\u30ED\u30C3\u30AF\u30EA\u30F3\u30AF',
							initialOpen: !!attributes.blockLinkUrl
						},
						el(
							'p',
							{ style: { fontSize: '12px', color: '#757575', marginBottom: '16px' } },
							'\u30D6\u30ED\u30C3\u30AF\u5168\u4F53\u3092\u30AF\u30EA\u30C3\u30AF\u53EF\u80FD\u306A\u30EA\u30F3\u30AF\u306B\u3057\u307E\u3059\u3002'
						),
						el(TextControl, {
							label: '\u30EA\u30F3\u30AFURL',
							value: attributes.blockLinkUrl || '',
							onChange: function (value) {
								setAttributes({ blockLinkUrl: value, blockLinkPostId: 0 });
							},
							placeholder: 'https://example.com',
							type: 'url',
							__nextHasNoMarginBottom: true
						}),
						attributes.blockLinkPostId && el(
							'p',
							{ style: { fontSize: '11px', color: '#007cba', margin: '4px 0 0' } },
							'ID: ' + attributes.blockLinkPostId + ' \u306B\u30EA\u30F3\u30AF\u4E2D\uFF08URL\u306F\u81EA\u52D5\u66F4\u65B0\u3055\u308C\u307E\u3059\uFF09'
						),
						el(
							'div',
							{ style: { marginTop: '12px' } },
							el(TextControl, {
								label: '\u30DA\u30FC\u30B8\u3092\u691C\u7D22',
								value: searchQuery,
								onChange: function (value) { setSearchQuery(value); },
								placeholder: '\u30DA\u30FC\u30B8\u540D\u3092\u5165\u529B...',
								__nextHasNoMarginBottom: true
							}),
							searchResults.length > 0 && el(
								'ul',
								{
									style: {
										margin: '4px 0 0',
										padding: '0',
										listStyle: 'none',
										border: '1px solid #ddd',
										borderRadius: '4px',
										maxHeight: '200px',
										overflowY: 'auto'
									}
								},
								searchResults.map(function (result) {
									return el(
										'li',
										{
											key: result.id,
											onMouseDown: function (e) {
												e.preventDefault();
												setAttributes({
													blockLinkUrl: result.url.replace(/^https?:\/\/[^/]+/, ''),
													blockLinkPostId: result.id
												});
												setSearchQuery('');
												setSearchResults([]);
											},
											style: {
												padding: '8px 12px',
												cursor: 'pointer',
												borderBottom: '1px solid #f0f0f0'
											},
											onMouseEnter: function (e) { e.currentTarget.style.backgroundColor = '#f0f0f0'; },
											onMouseLeave: function (e) { e.currentTarget.style.backgroundColor = 'transparent'; }
										},
										el('span', { style: { display: 'block', fontWeight: '500', fontSize: '13px' } }, result.title),
										el('span', { style: { display: 'block', fontSize: '11px', color: '#757575' } },
											result.url.replace(/^https?:\/\/[^/]+/, '') + (result.subtype === 'page' ? ' \u2014 \u56FA\u5B9A\u30DA\u30FC\u30B8' : ' \u2014 \u6295\u7A3F')
										)
									);
								})
							)
						),
						attributes.blockLinkUrl && el(
							Fragment,
							null,
							el(
								'div',
								{ style: { marginTop: '16px' } },
								el(SelectControl, {
									label: '\u30EA\u30F3\u30AF\u5148',
									value: attributes.blockLinkTarget || '_self',
									options: [
										{ label: '\u540C\u3058\u30BF\u30D6\u3067\u958B\u304F', value: '_self' },
										{ label: '\u65B0\u3057\u3044\u30BF\u30D6\u3067\u958B\u304F', value: '_blank' }
									],
									onChange: function (value) {
										setAttributes({ blockLinkTarget: value });
									},
									__nextHasNoMarginBottom: true
								})
							),
							el(
								'div',
								{ style: { marginTop: '16px' } },
								el(TextControl, {
									label: 'rel\u5C5E\u6027',
									value: attributes.blockLinkRel || '',
									onChange: function (value) {
										setAttributes({ blockLinkRel: value });
									},
									placeholder: 'noopener noreferrer',
									help: '\u65B0\u3057\u3044\u30BF\u30D6\u3067\u958B\u304F\u5834\u5408\u306F\u300Cnoopener noreferrer\u300D\u3092\u63A8\u5968',
									__nextHasNoMarginBottom: true
								})
							),
							el(
								'div',
								{ style: { marginTop: '16px' } },
								el(TextControl, {
									label: '\u30AF\u30A8\u30EA',
									value: attributes.blockLinkQuery || '',
									onChange: function (value) {
										setAttributes({ blockLinkQuery: value });
									},
									placeholder: '?param=value',
									__nextHasNoMarginBottom: true
								})
							),
							el(
								'div',
								{ style: { marginTop: '16px' } },
								el(TextControl, {
									label: '\u30A2\u30F3\u30AB\u30FC',
									value: attributes.blockLinkHash || '',
									onChange: function (value) {
										setAttributes({ blockLinkHash: value });
									},
									placeholder: '#section-name',
									__nextHasNoMarginBottom: true
								})
							)
						)
					)
				)
			);
		};
	}, 'withBlockLinkControls');

	addFilter('editor.BlockEdit', 'flavor/block-link-controls', withBlockLinkControls);

	/**
	 * 保存時にhas-block-linkクラスを追加
	 */
	addFilter('blocks.getSaveContent.extraProps', 'flavor/block-link-save', function (extraProps, blockType, attributes) {
		if (ALLOWED_BLOCKS.indexOf(blockType.name) === -1) {
			return extraProps;
		}

		if (attributes.blockLinkUrl) {
			extraProps.className = ((extraProps.className || '') + ' has-block-link').trim();
		}

		return extraProps;
	});

})();
