/**
 * Block Custom Common Library
 * 汎用ブロック・画像カスタム設定等の共通コードライブラリ
 * window.flavorBlockCommon に公開
 */
(function () {
	'use strict';

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var SelectControl = wp.components.SelectControl;
	var Button = wp.components.Button;
	var ButtonGroup = wp.components.ButtonGroup;
	var TextControl = wp.components.TextControl;
	var RangeControl = wp.components.RangeControl;

	// ── 定数・プリセット ──

	var SPACING_PRESETS = [
		{ label: '0', value: '0', size: 0 },
		{ label: '2XS', value: '2xs', size: 0.44 },
		{ label: 'XS', value: 'xs', size: 0.67 },
		{ label: 'S', value: 's', size: 1 },
		{ label: 'M', value: 'm', size: 1.5 },
		{ label: 'L', value: 'l', size: 2.25 },
		{ label: 'XL', value: 'xl', size: 3.38 },
		{ label: '2XL', value: '2xl', size: 5.06 }
	];

	var UNIT_OPTIONS = [
		{ label: 'px', value: 'px' },
		{ label: 'rem', value: 'rem' },
		{ label: 'em', value: 'em' },
		{ label: '%', value: '%' },
		{ label: 'vh', value: 'vh' },
		{ label: 'vw', value: 'vw' }
	];

	var SIZE_UNIT_OPTIONS = [
		{ label: 'px', value: 'px' },
		{ label: '%', value: '%' },
		{ label: 'rem', value: 'rem' },
		{ label: 'em', value: 'em' },
		{ label: 'vw', value: 'vw' },
		{ label: 'vh', value: 'vh' },
		{ label: 'svw', value: 'svw' },
		{ label: 'svh', value: 'svh' },
		{ label: 'dvw', value: 'dvw' },
		{ label: 'dvh', value: 'dvh' },
		{ label: 'vmin', value: 'vmin' },
		{ label: 'vmax', value: 'vmax' }
	];

	var SIZE_KEYWORDS = [
		{ label: 'auto', value: 'auto' },
		{ label: 'fit-content', value: 'fit-content' },
		{ label: 'max-content', value: 'max-content' },
		{ label: 'min-content', value: 'min-content' }
	];

	var ASPECT_RATIO_OPTIONS = [
		{ label: 'なし', value: '' },
		{ label: '1:1（正方形）', value: '1/1' },
		{ label: '4:3', value: '4/3' },
		{ label: '3:4', value: '3/4' },
		{ label: '16:9', value: '16/9' },
		{ label: '9:16', value: '9/16' },
		{ label: '3:2', value: '3/2' },
		{ label: '2:3', value: '2/3' },
		{ label: '21:9', value: '21/9' },
		{ label: 'カスタム', value: 'custom' }
	];

	var OVERFLOW_OPTIONS = [
		{ label: 'なし (visible)', value: '' },
		{ label: 'hidden', value: 'hidden' },
		{ label: 'scroll', value: 'scroll' },
		{ label: 'auto', value: 'auto' },
		{ label: 'clip', value: 'clip' }
	];

	var SHADOW_PRESETS = [
		{ label: 'なし', value: '' },
		{ label: 'XS', value: 'xs', css: '0 1px 2px 0 rgba(0,0,0,.05)' },
		{ label: 'S', value: 's', css: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)' },
		{ label: 'M', value: 'm', css: '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)' },
		{ label: 'L', value: 'l', css: '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)' },
		{ label: 'XL', value: 'xl', css: '0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)' },
		{ label: '2XL', value: '2xl', css: '0 25px 50px -12px rgba(0,0,0,.25)' },
		{ label: 'インナー', value: 'inner', css: 'inset 0 2px 4px 0 rgba(0,0,0,.06)' }
	];

	var TEXT_SHADOW_PRESETS = [
		{ label: 'なし', value: '' },
		{ label: 'S', value: 's', css: '0 1px 2px rgba(0,0,0,.15)' },
		{ label: 'M', value: 'm', css: '0 2px 4px rgba(0,0,0,.2)' },
		{ label: 'L', value: 'l', css: '0 4px 8px rgba(0,0,0,.25)' },
		{ label: '白縁取り', value: 'white-outline', css: '0 0 8px rgba(255,255,255,.8), 0 0 16px rgba(255,255,255,.6)' },
		{ label: '黒縁取り', value: 'black-outline', css: '0 0 8px rgba(0,0,0,.6), 0 0 16px rgba(0,0,0,.4)' }
	];

	var BACKDROP_FILTER_PRESETS = [
		{ label: 'なし', value: '' },
		{ label: 'Blur S', value: 'blur-s', css: 'blur(4px)' },
		{ label: 'Blur M', value: 'blur-m', css: 'blur(8px)' },
		{ label: 'Blur L', value: 'blur-l', css: 'blur(16px)' },
		{ label: 'Blur XL', value: 'blur-xl', css: 'blur(24px)' }
	];

	var BORDER_STYLE_OPTIONS = [
		{ label: 'なし', value: '' },
		{ label: 'solid', value: 'solid' },
		{ label: 'dashed', value: 'dashed' },
		{ label: 'dotted', value: 'dotted' },
		{ label: 'double', value: 'double' }
	];

	var BORDER_RADIUS_UNIT_OPTIONS = [
		{ label: 'px', value: 'px' },
		{ label: '%', value: '%' },
		{ label: 'rem', value: 'rem' },
		{ label: 'em', value: 'em' }
	];

	var FLEX_SHORTHAND_OPTIONS = [
		{ label: 'なし', value: '' },
		{ label: '1（均等に伸縮）', value: '1' },
		{ label: 'auto（内容に応じて伸縮）', value: 'auto' },
		{ label: 'none（固定サイズ）', value: 'none' },
		{ label: 'initial（縮小のみ）', value: 'initial' },
		{ label: 'カスタム', value: 'custom' }
	];

	var SPACING_KEYWORDS = ['auto', 'inherit', 'initial', 'unset', 'revert'];

	var BREAKPOINTS = window.flavorBlockCommonBreakpoints || window.flavorUniversalBlockBreakpoints || { tablet: 959, mobile: 599 };

	var hintStyle = {
		color: '#949494',
		fontFamily: 'monospace',
		fontSize: '12px',
		marginTop: '2px',
		marginBottom: '0'
	};

	var sectionLabelStyle = {
		fontSize: '11px',
		fontWeight: '500',
		textTransform: 'uppercase',
		color: '#757575',
		borderBottom: '1px solid #e0e0e0',
		paddingBottom: '4px',
		marginTop: '16px',
		marginBottom: '8px'
	};

	// ── ヘルパー関数 ──

	function isSizeKeyword(value) {
		return SIZE_KEYWORDS.some(function (kw) { return kw.value === value; });
	}

	function isSpacingKeyword(val) {
		return SPACING_KEYWORDS.indexOf(val) !== -1;
	}

	function getRemValue(presetValue) {
		for (var i = 0; i < SPACING_PRESETS.length; i++) {
			if (SPACING_PRESETS[i].value === presetValue) return SPACING_PRESETS[i].size;
		}
		return 0;
	}

	function getPresetFromIndex(index) {
		return (SPACING_PRESETS[index] && SPACING_PRESETS[index].value) || '0';
	}

	function getIndexFromPreset(presetValue) {
		for (var i = 0; i < SPACING_PRESETS.length; i++) {
			if (SPACING_PRESETS[i].value === presetValue) return i;
		}
		return 0;
	}

	// ── 色変換ヘルパー ──

	function parseRgba(str) {
		if (!str) return null;
		var m = str.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/);
		if (!m) return null;
		return { r: parseInt(m[1], 10), g: parseInt(m[2], 10), b: parseInt(m[3], 10), a: m[4] !== undefined ? parseFloat(m[4]) : 1 };
	}

	function hexToRgba(hex) {
		if (!hex) return null;
		var m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
		if (!m) {
			var m3 = hex.match(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i);
			if (!m3) return null;
			m = [null, m3[1] + m3[1], m3[2] + m3[2], m3[3] + m3[3]];
		}
		return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16), a: 1 };
	}

	function rgbaToString(r, g, b, a) {
		if (a === undefined || a === null || a === '' || a === 1 || a === '1') {
			return 'rgb(' + r + ', ' + g + ', ' + b + ')';
		}
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
	}

	function rgbaToHex(r, g, b) {
		function toHex(n) {
			var h = Math.max(0, Math.min(255, Math.round(Number(n)))).toString(16);
			return h.length === 1 ? '0' + h : h;
		}
		return '#' + toHex(r) + toHex(g) + toHex(b);
	}

	function getCssValue(value, unit, allowZero) {
		if (value === '' || value === null || value === undefined) return '';
		if (unit === 'preset') {
			if (value === '0') return allowZero ? '0' : '';
			var remVal = getRemValue(value);
			if (remVal === 0) return allowZero ? '0' : '';
			return remVal + 'rem';
		}
		if (value === '0' || value === 0) return allowZero ? '0' : '';
		return value + (unit || 'px');
	}

	function getPresetCssHint(value, unit) {
		if (value === '' || value === null || value === undefined) return '';
		if (unit === 'preset') {
			if (value === '0') return '0';
			var presetMap = {
				'2xs': 'var(--wp--preset--spacing--5)',
				'xs': 'var(--wp--preset--spacing--10)',
				's': 'var(--wp--preset--spacing--20)',
				'm': 'var(--wp--preset--spacing--30)',
				'l': 'var(--wp--preset--spacing--40)',
				'xl': 'var(--wp--preset--spacing--50)',
				'2xl': 'var(--wp--preset--spacing--60)'
			};
			return presetMap[value] || '';
		}
		return value + (unit || 'px');
	}

	function getShadowCssValue(presetValue) {
		if (!presetValue) return '';
		if (presetValue.indexOf('custom:') === 0) {
			return presetValue.substring(7);
		}
		for (var i = 0; i < SHADOW_PRESETS.length; i++) {
			if (SHADOW_PRESETS[i].value === presetValue) return SHADOW_PRESETS[i].css || '';
		}
		return '';
	}

	function getTextShadowCssValue(presetValue) {
		if (!presetValue) return '';
		if (presetValue.indexOf('custom:') === 0) return presetValue.substring(7);
		for (var i = 0; i < TEXT_SHADOW_PRESETS.length; i++) {
			if (TEXT_SHADOW_PRESETS[i].value === presetValue) return TEXT_SHADOW_PRESETS[i].css || '';
		}
		return '';
	}

	function getBackdropFilterCssValue(presetValue) {
		if (!presetValue) return '';
		if (presetValue.indexOf('custom:') === 0) return presetValue.substring(7);
		for (var i = 0; i < BACKDROP_FILTER_PRESETS.length; i++) {
			if (BACKDROP_FILTER_PRESETS[i].value === presetValue) return BACKDROP_FILTER_PRESETS[i].css || '';
		}
		return '';
	}

	function hexToRgba(hex, alpha) {
		if (!hex) return '';
		hex = hex.replace('#', '');
		if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		var r = parseInt(hex.substring(0, 2), 16);
		var g = parseInt(hex.substring(2, 4), 16);
		var b = parseInt(hex.substring(4, 6), 16);
		if (isNaN(r) || isNaN(g) || isNaN(b)) return '';
		return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
	}

	function getAttrSuffix(device) {
		if (device === 'tablet') return 'Tablet';
		if (device === 'mobile') return 'Mobile';
		return '';
	}

	/**
	 * プレフィックス対応属性キー生成
	 * attrKey('img', 'sizeWidth', 'Tablet') → 'imgSizeWidthTablet'
	 * attrKey('', 'sizeWidth', 'Tablet') → 'sizeWidthTablet'
	 */
	function attrKey(prefix, baseName, suffix) {
		suffix = suffix || '';
		if (!prefix) return baseName + suffix;
		return prefix + baseName.charAt(0).toUpperCase() + baseName.slice(1) + suffix;
	}

	var tabTitles = [
		{ name: 'pc', title: 'PC' },
		{ name: 'tablet', title: 'タブレット (' + BREAKPOINTS.tablet + 'px以下)' },
		{ name: 'mobile', title: 'モバイル (' + BREAKPOINTS.mobile + 'px以下)' }
	];

	// ── UIコンポーネント ──

	function createSizeInput(label, cssProperty, valueKey, unitKey, attributes, setAttributes) {
		var value = attributes[valueKey] || '';
		var unit = attributes[unitKey] || 'px';
		var isKeyword = isSizeKeyword(value);
		var cssHint = value
			? cssProperty + ': ' + (isKeyword ? value : value + unit)
			: '';

		var children = [];

		children.push(
			el('div', { key: 'label', style: { marginBottom: '4px', fontWeight: '500', fontSize: '11px', textTransform: 'uppercase' } }, label)
		);

		children.push(
			el('div', { key: 'keywords', style: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' } },
				SIZE_KEYWORDS.map(function (kw) {
					return el(Button, {
						key: kw.value,
						isSmall: true,
						variant: value === kw.value ? 'primary' : 'secondary',
						onClick: function () {
							var update = {};
							if (value === kw.value) {
								update[valueKey] = '';
							} else {
								update[valueKey] = kw.value;
							}
							setAttributes(update);
						}
					}, kw.label);
				})
			)
		);

		if (!isKeyword) {
			children.push(
				el('div', { key: 'input', style: { display: 'flex', gap: '8px', alignItems: 'flex-start' } },
					el('div', { style: { flex: 1 } },
						el(TextControl, {
							type: 'number',
							value: value,
							onChange: function (v) {
								var update = {};
								update[valueKey] = String(v);
								setAttributes(update);
							},
							__nextHasNoMarginBottom: true
						})
					),
					el('div', { style: { minWidth: '70px' } },
						el(SelectControl, {
							value: unit,
							options: SIZE_UNIT_OPTIONS,
							onChange: function (u) {
								var update = {};
								update[unitKey] = u;
								setAttributes(update);
							},
							__nextHasNoMarginBottom: true
						})
					)
				)
			);
		}

		if (cssHint) {
			children.push(
				el('p', { key: 'hint', style: hintStyle }, cssHint)
			);
		}

		if (value) {
			children.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[valueKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '2px' }
				}, 'リセット')
			);
		}

		return el('div', { style: { marginBottom: '12px' } }, children);
	}

	function createAspectRatioControl(valueKey, attributes, setAttributes) {
		var value = attributes[valueKey] || '';
		var isCustom = value !== '' && !ASPECT_RATIO_OPTIONS.some(function (opt) {
			return opt.value === value;
		});
		var selectValue = isCustom ? 'custom' : value;

		var children = [];

		children.push(
			el(SelectControl, {
				key: 'select',
				label: 'アスペクト比',
				value: selectValue,
				options: ASPECT_RATIO_OPTIONS,
				onChange: function (v) {
					var update = {};
					if (v === 'custom') {
						update[valueKey] = attributes[valueKey] || '16/9';
					} else {
						update[valueKey] = v;
					}
					setAttributes(update);
				},
				__nextHasNoMarginBottom: true
			})
		);

		if (selectValue === 'custom' || isCustom) {
			children.push(
				el(TextControl, {
					key: 'custom',
					label: 'カスタム値（例: 2.35/1）',
					value: value,
					onChange: function (v) {
						var update = {};
						update[valueKey] = v;
						setAttributes(update);
					},
					__nextHasNoMarginBottom: true
				})
			);
		}

		if (value) {
			children.push(
				el('p', { key: 'hint', style: hintStyle }, 'aspect-ratio: ' + value)
			);
			children.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[valueKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '2px' }
				}, 'リセット')
			);
		}

		return el('div', { style: { marginBottom: '12px' } }, children);
	}

	function createOverflowControl(valueKey, attributes, setAttributes) {
		return el('div', { style: { marginBottom: '12px' } },
			el(SelectControl, {
				label: 'overflow',
				value: attributes[valueKey] || '',
				options: OVERFLOW_OPTIONS,
				onChange: function (v) {
					var update = {};
					update[valueKey] = v;
					setAttributes(update);
				},
				__nextHasNoMarginBottom: true
			}),
			attributes[valueKey] ? el('p', { style: hintStyle }, 'overflow: ' + attributes[valueKey]) : null
		);
	}

	function createSingleSpacingControl(label, value, unit, onChange) {
		var isCustomMode = unit !== 'preset' && unit !== '';
		var sliderValue = !isCustomMode ? getIndexFromPreset(value || '0') : 0;

		var marks = SPACING_PRESETS.map(function (preset, index) {
			return { value: index, label: preset.label };
		});

		var children = [];

		children.push(
			el('div', { key: 'header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
				el('span', { style: { fontWeight: '500' } }, label),
				el(Button, {
					isSmall: true,
					variant: 'tertiary',
					onClick: function () {
						if (isCustomMode) {
							onChange('m', 'preset');
						} else {
							var remVal = getRemValue(value || 'm');
							onChange(String(Math.round(remVal * 16)), 'px');
						}
					},
					style: { fontSize: '11px' }
				}, isCustomMode ? 'プリセット' : 'カスタム')
			)
		);

		if (!isCustomMode) {
			children.push(
				el('div', { key: 'preset' },
					el(RangeControl, {
						value: sliderValue,
						onChange: function (index) {
							onChange(getPresetFromIndex(index), 'preset');
						},
						min: 0,
						max: SPACING_PRESETS.length - 1,
						step: 1,
						withInputField: false,
						marks: marks,
						__nextHasNoMarginBottom: true
					}),
					el('p', { style: hintStyle },
						value ? (getPresetCssHint(value, 'preset') || '') : '未設定'
					)
				)
			);
		}

		if (isCustomMode) {
			children.push(
				el('div', { key: 'custom', style: { display: 'flex', gap: '8px', alignItems: 'flex-start' } },
					el('div', { style: { flex: 1 } },
						el(TextControl, {
							type: 'number',
							value: value || '',
							onChange: function (v) {
								onChange(String(v), unit === 'preset' ? 'px' : unit);
							},
							min: 0,
							step: unit === 'px' ? 1 : 0.1,
							__nextHasNoMarginBottom: true
						})
					),
					el(SelectControl, {
						value: unit === 'preset' ? 'px' : unit,
						options: UNIT_OPTIONS,
						onChange: function (u) {
							onChange(value || '16', u);
						},
						__nextHasNoMarginBottom: true,
						style: { minWidth: '70px' }
					})
				)
			);
			if (value) {
				children.push(
					el('p', { key: 'custom-hint', style: hintStyle }, value + (unit || 'px'))
				);
			}
		}

		if (value) {
			children.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () { onChange('', 'preset'); },
					style: { marginTop: '4px' }
				}, 'リセット')
			);
		}

		return el('div', { style: { marginBottom: '16px' } }, children);
	}

	function createBoxSpacingControl(label, values, unit, linked, onChange, onUnitChange, onLinkedChange) {
		var isCustomMode = unit !== 'preset' && unit !== '';
		var currentValue = values || {};
		var allValue = linked ? (currentValue.top || currentValue.right || currentValue.bottom || currentValue.left || '') : '';
		var hasValue = !!(currentValue.top || currentValue.right || currentValue.bottom || currentValue.left);

		var directions = [
			{ key: 'top', label: '上', icon: '\u2191' },
			{ key: 'right', label: '右', icon: '\u2192' },
			{ key: 'bottom', label: '下', icon: '\u2193' },
			{ key: 'left', label: '左', icon: '\u2190' }
		];

		var marks = SPACING_PRESETS.map(function (preset, index) {
			return { value: index, label: preset.label };
		});

		function handleValueChange(direction, newValue) {
			var unitToUse = isCustomMode ? (unit === 'preset' ? 'px' : unit) : 'preset';
			if (linked) {
				onChange({ top: newValue, right: newValue, bottom: newValue, left: newValue }, unitToUse);
			} else {
				var updated = Object.assign({}, currentValue);
				updated[direction] = newValue;
				onChange(updated, unitToUse);
			}
		}

		function createKeywordButtons(currentVal, onSelect) {
			return el('div', {
				style: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }
			},
				SPACING_KEYWORDS.map(function (kw) {
					return el(Button, {
						key: kw,
						isSmall: true,
						variant: currentVal === kw ? 'primary' : 'secondary',
						onClick: function () {
							onSelect(currentVal === kw ? '' : kw);
						},
						style: { fontSize: '11px' }
					}, kw);
				})
			);
		}

		var children = [];

		children.push(
			el('div', { key: 'header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
				el('span', { style: { fontWeight: '500' } }, label),
				el('div', { style: { display: 'flex', gap: '4px' } },
					el(Button, {
						isSmall: true,
						variant: linked ? 'primary' : 'secondary',
						onClick: function () { onLinkedChange(!linked); },
						style: { fontSize: '11px', minWidth: '24px' },
						title: linked ? '個別設定' : '一括設定'
					}, linked ? '連結' : '個別'),
					el(Button, {
						isSmall: true,
						variant: 'tertiary',
						onClick: function () {
							if (isCustomMode) {
								onUnitChange('preset');
							} else {
								onUnitChange('px');
							}
						},
						style: { fontSize: '11px' }
					}, isCustomMode ? 'プリセット' : 'カスタム')
				)
			)
		);

		if (linked) {
			if (!isCustomMode) {
				children.push(
					el('div', { key: 'linked-preset' },
						el(RangeControl, {
							value: getIndexFromPreset(allValue || '0'),
							onChange: function (index) {
								handleValueChange('top', getPresetFromIndex(index));
							},
							min: 0,
							max: SPACING_PRESETS.length - 1,
							step: 1,
							withInputField: false,
							marks: marks,
							__nextHasNoMarginBottom: true
						}),
						el('p', { style: hintStyle },
							allValue ? (getPresetCssHint(allValue, 'preset') || '') : '未設定'
						)
					)
				);
			} else {
				children.push(
					el('div', { key: 'linked-keywords' },
						createKeywordButtons(allValue, function (kw) {
							handleValueChange('top', kw);
						})
					)
				);
				if (!isSpacingKeyword(allValue)) {
					children.push(
						el('div', { key: 'linked-custom', style: { display: 'flex', gap: '8px', alignItems: 'flex-start' } },
							el('div', { style: { flex: 1 } },
								el(TextControl, {
									type: 'number',
									value: allValue || '',
									onChange: function (v) { handleValueChange('top', v); },
									min: 0,
									step: unit === 'px' ? 1 : 0.1,
									__nextHasNoMarginBottom: true
								})
							),
							el(SelectControl, {
								value: unit === 'preset' ? 'px' : unit,
								options: UNIT_OPTIONS,
								onChange: function (u) { onUnitChange(u); },
								__nextHasNoMarginBottom: true,
								style: { minWidth: '70px' }
							})
						)
					);
				}
				if (allValue) {
					children.push(
						el('p', { key: 'linked-hint', style: hintStyle },
							isSpacingKeyword(allValue) ? allValue : allValue + (unit || 'px')
						)
					);
				}
			}
		}

		if (!linked) {
			if (!isCustomMode) {
				children.push(
					el('div', { key: 'unlinked-preset' },
						directions.map(function (dir) {
							return el('div', { key: dir.key, style: { marginBottom: '8px' } },
								el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } },
									dir.icon + ' ' + dir.label
								),
								el(RangeControl, {
									value: getIndexFromPreset(currentValue[dir.key] || '0'),
									onChange: function (index) {
										handleValueChange(dir.key, getPresetFromIndex(index));
									},
									min: 0,
									max: SPACING_PRESETS.length - 1,
									step: 1,
									withInputField: false,
									__nextHasNoMarginBottom: true
								})
							);
						})
					)
				);
			} else {
				children.push(
					el('div', { key: 'unit-select', style: { marginBottom: '12px' } },
						el(SelectControl, {
							label: '単位',
							value: unit === 'preset' ? 'px' : unit,
							options: UNIT_OPTIONS,
							onChange: function (u) { onUnitChange(u); },
							__nextHasNoMarginBottom: true,
							style: { maxWidth: '120px' }
						})
					)
				);
				children.push(
					el('div', { key: 'unlinked-custom', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } },
						directions.map(function (dir) {
							var dirVal = currentValue[dir.key] || '';
							return el('div', { key: dir.key },
								el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } },
									dir.icon + ' ' + dir.label + (isSpacingKeyword(dirVal) ? ' (' + dirVal + ')' : '')
								),
								el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '2px', marginBottom: '4px' } },
									SPACING_KEYWORDS.map(function (kw) {
										return el(Button, {
											key: kw,
											isSmall: true,
											variant: dirVal === kw ? 'primary' : 'secondary',
											onClick: function () {
												handleValueChange(dir.key, dirVal === kw ? '' : kw);
											},
											style: { fontSize: '10px', padding: '0 4px', minWidth: 'auto' }
										}, kw);
									})
								),
								!isSpacingKeyword(dirVal) ? el(TextControl, {
									type: 'number',
									value: dirVal,
									onChange: function (v) { handleValueChange(dir.key, v); },
									min: 0,
									step: unit === 'px' ? 1 : 0.1,
									__nextHasNoMarginBottom: true
								}) : null
							);
						})
					)
				);
			}
		}

		if (hasValue) {
			children.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () { onChange({}, 'preset'); },
					style: { marginTop: '4px' }
				}, 'リセット')
			);
		}

		return el('div', { style: { marginBottom: '16px' } }, children);
	}

	// ── タブレンダー関数（prefix対応） ──

	function renderSizeTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);

		var overflowKey = attrKey(prefix, 'layoutOverflow', suffix);
		var sizeWidthKey = attrKey(prefix, 'sizeWidth', suffix);
		var sizeWidthUnitKey = attrKey(prefix, 'sizeWidthUnit', suffix);
		var sizeMinWidthKey = attrKey(prefix, 'sizeMinWidth', suffix);
		var sizeMinWidthUnitKey = attrKey(prefix, 'sizeMinWidthUnit', suffix);
		var sizeMaxWidthKey = attrKey(prefix, 'sizeMaxWidth', suffix);
		var sizeMaxWidthUnitKey = attrKey(prefix, 'sizeMaxWidthUnit', suffix);
		var sizeHeightKey = attrKey(prefix, 'sizeHeight', suffix);
		var sizeHeightUnitKey = attrKey(prefix, 'sizeHeightUnit', suffix);
		var sizeMinHeightKey = attrKey(prefix, 'sizeMinHeight', suffix);
		var sizeMinHeightUnitKey = attrKey(prefix, 'sizeMinHeightUnit', suffix);
		var sizeMaxHeightKey = attrKey(prefix, 'sizeMaxHeight', suffix);
		var sizeMaxHeightUnitKey = attrKey(prefix, 'sizeMaxHeightUnit', suffix);
		var sizeAspectRatioKey = attrKey(prefix, 'sizeAspectRatio', suffix);

		return el('div', null,
			el('div', { style: sectionLabelStyle }, '表示'),
			createOverflowControl(overflowKey, attributes, setAttributes),
			el('div', { style: sectionLabelStyle }, 'サイズ'),
			createSizeInput('横幅', 'width', sizeWidthKey, sizeWidthUnitKey, attributes, setAttributes),
			createSizeInput('最小幅', 'min-width', sizeMinWidthKey, sizeMinWidthUnitKey, attributes, setAttributes),
			createSizeInput('最大幅', 'max-width', sizeMaxWidthKey, sizeMaxWidthUnitKey, attributes, setAttributes),
			createSizeInput('高さ', 'height', sizeHeightKey, sizeHeightUnitKey, attributes, setAttributes),
			createSizeInput('最小高さ', 'min-height', sizeMinHeightKey, sizeMinHeightUnitKey, attributes, setAttributes),
			createSizeInput('最大高さ', 'max-height', sizeMaxHeightKey, sizeMaxHeightUnitKey, attributes, setAttributes),
			createAspectRatioControl(sizeAspectRatioKey, attributes, setAttributes)
		);
	}

	function renderFlexTab(device, prefix, options, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);
		var showContainer = options && options.showContainer;
		var FLEX_WRAP_OPTIONS = [
			{ label: 'なし (nowrap)', value: '' },
			{ label: 'wrap', value: 'wrap' },
			{ label: 'wrap-reverse', value: 'wrap-reverse' }
		];

		var flexShorthandKey = attrKey(prefix, 'flexShorthand', suffix);
		var flexWrapKey = attrKey(prefix, 'flexWrap', suffix);
		var flexGrowKey = attrKey(prefix, 'flexGrow', suffix);
		var flexShrinkKey = attrKey(prefix, 'flexShrink', suffix);
		var flexBasisKey = attrKey(prefix, 'flexBasis', suffix);
		var flexBasisUnitKey = attrKey(prefix, 'flexBasisUnit', suffix);
		var flexOrderKey = attrKey(prefix, 'flexOrder', suffix);

		var shorthandValue = attributes[flexShorthandKey] || '';
		var isCustomShorthand = shorthandValue !== '' && !FLEX_SHORTHAND_OPTIONS.some(function (opt) {
			return opt.value === shorthandValue;
		});
		var selectShorthandValue = isCustomShorthand ? 'custom' : shorthandValue;

		var children = [];

		// コンテナセクション（showContainer=trueの場合のみ）
		if (showContainer) {
			children.push(
				el('div', { key: 'section-container', style: sectionLabelStyle }, 'コンテナ')
			);
			children.push(
				el('div', { key: 'flex-wrap', style: { marginBottom: '12px' } },
					el(SelectControl, {
						label: 'flex-wrap',
						value: attributes[flexWrapKey] || '',
						options: FLEX_WRAP_OPTIONS,
						onChange: function (v) {
							var update = {};
							update[flexWrapKey] = v;
							setAttributes(update);
						},
						__nextHasNoMarginBottom: true
					}),
					attributes[flexWrapKey] ? el('p', { style: hintStyle }, 'flex-wrap: ' + attributes[flexWrapKey]) : null
				)
			);
			children.push(
				el('div', { key: 'section-item', style: sectionLabelStyle }, 'アイテム')
			);
		}

		// flex（ショートハンド）
		var flexShorthandChildren = [];
		flexShorthandChildren.push(
			el(SelectControl, {
				key: 'select',
				label: 'flex',
				value: selectShorthandValue,
				options: FLEX_SHORTHAND_OPTIONS,
				onChange: function (v) {
					var update = {};
					if (v === 'custom') {
						update[flexShorthandKey] = attributes[flexShorthandKey] || '0 1 auto';
					} else {
						update[flexShorthandKey] = v;
					}
					setAttributes(update);
				},
				__nextHasNoMarginBottom: true
			})
		);

		if (selectShorthandValue === 'custom' || isCustomShorthand) {
			flexShorthandChildren.push(
				el(TextControl, {
					key: 'custom',
					label: 'カスタム値（例: 2 1 200px）',
					value: shorthandValue,
					onChange: function (v) {
						var update = {};
						update[flexShorthandKey] = v;
						setAttributes(update);
					},
					__nextHasNoMarginBottom: true
				})
			);
		}

		if (shorthandValue) {
			flexShorthandChildren.push(
				el('p', { key: 'hint', style: hintStyle }, 'flex: ' + shorthandValue)
			);
			flexShorthandChildren.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[flexShorthandKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '2px' }
				}, 'リセット')
			);
		}

		children.push(
			el('div', { key: 'flex-shorthand', style: { marginBottom: '12px' } }, flexShorthandChildren)
		);

		// flex-grow
		var growValue = attributes[flexGrowKey];
		children.push(
			el('div', { key: 'flex-grow', style: { marginBottom: '12px' } },
				el(TextControl, {
					label: 'flex-grow',
					type: 'number',
					min: 0,
					step: 1,
					value: growValue !== undefined && growValue !== '' ? growValue : '',
					onChange: function (v) {
						var update = {};
						update[flexGrowKey] = String(v);
						setAttributes(update);
					},
					__nextHasNoMarginBottom: true
				}),
				growValue !== '' && growValue !== undefined ? el('p', { style: hintStyle }, 'flex-grow: ' + growValue) : null,
				growValue !== '' && growValue !== undefined ? el(Button, {
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[flexGrowKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '2px' }
				}, 'リセット') : null
			)
		);

		// flex-shrink
		var shrinkValue = attributes[flexShrinkKey];
		children.push(
			el('div', { key: 'flex-shrink', style: { marginBottom: '12px' } },
				el(TextControl, {
					label: 'flex-shrink',
					type: 'number',
					min: 0,
					step: 1,
					value: shrinkValue !== undefined && shrinkValue !== '' ? shrinkValue : '',
					onChange: function (v) {
						var update = {};
						update[flexShrinkKey] = String(v);
						setAttributes(update);
					},
					__nextHasNoMarginBottom: true
				}),
				shrinkValue !== '' && shrinkValue !== undefined ? el('p', { style: hintStyle }, 'flex-shrink: ' + shrinkValue) : null,
				shrinkValue !== '' && shrinkValue !== undefined ? el(Button, {
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[flexShrinkKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '2px' }
				}, 'リセット') : null
			)
		);

		// flex-basis
		children.push(
			el('div', { key: 'flex-basis' },
				createSizeInput('flex-basis', 'flex-basis', flexBasisKey, flexBasisUnitKey, attributes, setAttributes)
			)
		);

		// order
		var orderValue = attributes[flexOrderKey];
		children.push(
			el('div', { key: 'flex-order', style: { marginBottom: '12px' } },
				el(TextControl, {
					label: 'order',
					type: 'number',
					step: 1,
					value: orderValue !== undefined && orderValue !== '' ? orderValue : '',
					onChange: function (v) {
						var update = {};
						update[flexOrderKey] = String(v);
						setAttributes(update);
					},
					__nextHasNoMarginBottom: true
				}),
				orderValue !== '' && orderValue !== undefined ? el('p', { style: hintStyle }, 'order: ' + orderValue) : null,
				orderValue !== '' && orderValue !== undefined ? el(Button, {
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[flexOrderKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '2px' }
				}, 'リセット') : null
			)
		);

		return el('div', null, children);
	}

	function renderMarginTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);

		var marginKey = attrKey(prefix, 'spacingMargin', suffix);
		var marginUnitKey = attrKey(prefix, 'spacingMarginUnit', suffix);
		var marginLinkedKey = attrKey(prefix, 'spacingMarginLinked', suffix);

		return el('div', null,
			createBoxSpacingControl(
				'マージン',
				attributes[marginKey] || {},
				attributes[marginUnitKey] || 'preset',
				attributes[marginLinkedKey] !== false,
				function (values, unit) {
					var update = {};
					update[marginKey] = values;
					update[marginUnitKey] = unit;
					setAttributes(update);
				},
				function (unit) {
					var update = {};
					update[marginUnitKey] = unit;
					setAttributes(update);
				},
				function (linked) {
					var update = {};
					update[marginLinkedKey] = linked;
					setAttributes(update);
				}
			)
		);
	}

	function renderSpacingTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);

		var gapKey = attrKey(prefix, 'spacingGap', suffix);
		var gapUnitKey = attrKey(prefix, 'spacingGapUnit', suffix);
		var gapRowKey = attrKey(prefix, 'spacingGapRow', suffix);
		var gapRowUnitKey = attrKey(prefix, 'spacingGapRowUnit', suffix);
		var gapColumnKey = attrKey(prefix, 'spacingGapColumn', suffix);
		var gapColumnUnitKey = attrKey(prefix, 'spacingGapColumnUnit', suffix);
		var gapLinkedKey = attrKey(prefix, 'spacingGapLinked', suffix);
		var paddingKey = attrKey(prefix, 'spacingPadding', suffix);
		var paddingUnitKey = attrKey(prefix, 'spacingPaddingUnit', suffix);
		var paddingLinkedKey = attrKey(prefix, 'spacingPaddingLinked', suffix);
		var marginKey = attrKey(prefix, 'spacingMargin', suffix);
		var marginUnitKey = attrKey(prefix, 'spacingMarginUnit', suffix);
		var marginLinkedKey = attrKey(prefix, 'spacingMarginLinked', suffix);

		var gapLinked = attributes[gapLinkedKey] !== false;

		var gapChildren = [];

		// Header with linked/individual toggle
		gapChildren.push(
			el('div', { key: 'gap-header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
				el('span', { style: { fontWeight: '500' } }, 'Gap (ブロックの間隔)'),
				el(Button, {
					isSmall: true,
					variant: gapLinked ? 'primary' : 'secondary',
					onClick: function () {
						var update = {};
						update[gapLinkedKey] = !gapLinked;
						setAttributes(update);
					},
					style: { fontSize: '11px', minWidth: '24px' },
					title: gapLinked ? '個別設定に切替' : '連結設定に切替'
				}, gapLinked ? '連結' : '個別')
			)
		);

		if (gapLinked) {
			// Linked mode: single gap control (existing behavior)
			gapChildren.push(
				el('div', { key: 'gap-linked' },
					createSingleSpacingControl(
						'',
						attributes[gapKey] || '',
						attributes[gapUnitKey] || 'preset',
						function (value, unit) {
							var update = {};
							update[gapKey] = value;
							update[gapUnitKey] = unit;
							setAttributes(update);
						}
					)
				)
			);
		} else {
			// Individual mode: row-gap and column-gap controls
			gapChildren.push(
				el('div', { key: 'gap-row' },
					createSingleSpacingControl(
						'行間隔 (縦 / row-gap)',
						attributes[gapRowKey] || '',
						attributes[gapRowUnitKey] || 'preset',
						function (value, unit) {
							var update = {};
							update[gapRowKey] = value;
							update[gapRowUnitKey] = unit;
							setAttributes(update);
						}
					)
				)
			);
			gapChildren.push(
				el('div', { key: 'gap-column' },
					createSingleSpacingControl(
						'列間隔 (横 / column-gap)',
						attributes[gapColumnKey] || '',
						attributes[gapColumnUnitKey] || 'preset',
						function (value, unit) {
							var update = {};
							update[gapColumnKey] = value;
							update[gapColumnUnitKey] = unit;
							setAttributes(update);
						}
					)
				)
			);
		}

		var gapControl = el('div', { style: { marginBottom: '16px' } }, gapChildren);

		return el('div', null,
			gapControl,
			createBoxSpacingControl(
				'パディング',
				attributes[paddingKey] || {},
				attributes[paddingUnitKey] || 'preset',
				attributes[paddingLinkedKey] !== false,
				function (values, unit) {
					var update = {};
					update[paddingKey] = values;
					update[paddingUnitKey] = unit;
					setAttributes(update);
				},
				function (unit) {
					var update = {};
					update[paddingUnitKey] = unit;
					setAttributes(update);
				},
				function (linked) {
					var update = {};
					update[paddingLinkedKey] = linked;
					setAttributes(update);
				}
			),
			createBoxSpacingControl(
				'マージン',
				attributes[marginKey] || {},
				attributes[marginUnitKey] || 'preset',
				attributes[marginLinkedKey] !== false,
				function (values, unit) {
					var update = {};
					update[marginKey] = values;
					update[marginUnitKey] = unit;
					setAttributes(update);
				},
				function (unit) {
					var update = {};
					update[marginUnitKey] = unit;
					setAttributes(update);
				},
				function (linked) {
					var update = {};
					update[marginLinkedKey] = linked;
					setAttributes(update);
				}
			)
		);
	}

	function renderShadowTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);
		var shadowKey = attrKey(prefix, 'boxShadow', suffix);
		var value = attributes[shadowKey] || '';
		var isCustom = value.indexOf('custom:') === 0;

		var children = [];

		children.push(
			el('div', { key: 'presets', style: { marginBottom: '12px' } },
				el('div', { style: { marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' } }, 'プリセット'),
				el(
					ButtonGroup,
					null,
					SHADOW_PRESETS.map(function (preset) {
						return el(Button, {
							key: preset.value,
							isPressed: value === preset.value,
							onClick: function () {
								var update = {};
								update[shadowKey] = value === preset.value ? '' : preset.value;
								setAttributes(update);
							},
							size: 'compact'
						}, preset.label);
					})
				)
			)
		);

		children.push(
			el('div', { key: 'custom', style: { marginBottom: '12px' } },
				el(TextControl, {
					label: 'カスタム box-shadow',
					value: isCustom ? value.substring(7) : '',
					onChange: function (v) {
						var update = {};
						update[shadowKey] = v ? 'custom:' + v : '';
						setAttributes(update);
					},
					placeholder: '例: 0 4px 6px rgba(0,0,0,0.1)',
					__nextHasNoMarginBottom: true
				})
			)
		);

		var cssVal = getShadowCssValue(value);
		if (cssVal) {
			children.push(
				el('p', { key: 'hint', style: hintStyle }, 'box-shadow: ' + cssVal)
			);
		}

		if (value) {
			children.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[shadowKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '4px' }
				}, 'リセット')
			);
		}

		// ── テキストシャドウ ──
		var textShadowKey = attrKey(prefix, 'textShadow', suffix);
		var tsValue = attributes[textShadowKey] || '';
		var tsIsCustom = tsValue.indexOf('custom:') === 0;

		children.push(
			el('hr', { key: 'ts-sep', style: { margin: '16px 0', borderColor: '#e0e0e0' } })
		);

		children.push(
			el('div', { key: 'ts-presets', style: { marginBottom: '12px' } },
				el('div', { style: { marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' } }, 'テキストシャドウ'),
				el(
					ButtonGroup,
					null,
					TEXT_SHADOW_PRESETS.map(function (preset) {
						return el(Button, {
							key: preset.value,
							isPressed: tsValue === preset.value,
							onClick: function () {
								var update = {};
								update[textShadowKey] = tsValue === preset.value ? '' : preset.value;
								setAttributes(update);
							},
							size: 'compact'
						}, preset.label);
					})
				)
			)
		);

		children.push(
			el('div', { key: 'ts-custom', style: { marginBottom: '12px' } },
				el(TextControl, {
					label: 'カスタム text-shadow',
					value: tsIsCustom ? tsValue.substring(7) : '',
					onChange: function (v) {
						var update = {};
						update[textShadowKey] = v ? 'custom:' + v : '';
						setAttributes(update);
					},
					placeholder: '例: 0 2px 4px rgba(0,0,0,0.2)',
					__nextHasNoMarginBottom: true
				})
			)
		);

		var tsCssVal = getTextShadowCssValue(tsValue);
		if (tsCssVal) {
			children.push(
				el('p', { key: 'ts-hint', style: hintStyle }, 'text-shadow: ' + tsCssVal)
			);
		}

		if (tsValue) {
			children.push(
				el(Button, {
					key: 'ts-reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[textShadowKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '4px' }
				}, 'リセット')
			);
		}

		return el('div', null, children);
	}

	function renderBorderRadiusTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);
		var radiusKey = attrKey(prefix, 'customBorderRadius', suffix);
		var unitKey = attrKey(prefix, 'customBorderRadiusUnit', suffix);
		var linkedKey = attrKey(prefix, 'customBorderRadiusLinked', suffix);

		var values = attributes[radiusKey] || {};
		var unit = attributes[unitKey] || 'px';
		var linked = attributes[linkedKey] !== false;

		var allValue = linked ? (values.topLeft || values.topRight || values.bottomRight || values.bottomLeft || '') : '';
		var hasValue = !!(values.topLeft || values.topRight || values.bottomRight || values.bottomLeft);

		var directions = [
			{ key: 'topLeft', label: '左上', icon: '\u2196' },
			{ key: 'topRight', label: '右上', icon: '\u2197' },
			{ key: 'bottomRight', label: '右下', icon: '\u2198' },
			{ key: 'bottomLeft', label: '左下', icon: '\u2199' }
		];

		function handleValueChange(direction, newValue) {
			var updated;
			if (linked) {
				updated = { topLeft: newValue, topRight: newValue, bottomRight: newValue, bottomLeft: newValue };
			} else {
				updated = Object.assign({}, values);
				updated[direction] = newValue;
			}
			var update = {};
			update[radiusKey] = updated;
			setAttributes(update);
		}

		var children = [];

		children.push(
			el('div', { key: 'header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
				el('span', { style: { fontWeight: '500' } }, '角丸'),
				el('div', { style: { display: 'flex', gap: '4px' } },
					el(Button, {
						isSmall: true,
						variant: linked ? 'primary' : 'secondary',
						onClick: function () {
							var update = {};
							update[linkedKey] = !linked;
							setAttributes(update);
						},
						style: { fontSize: '11px', minWidth: '24px' },
						title: linked ? '個別設定' : '一括設定'
					}, linked ? '連結' : '個別'),
					el(SelectControl, {
						value: unit,
						options: BORDER_RADIUS_UNIT_OPTIONS,
						onChange: function (u) {
							var update = {};
							update[unitKey] = u;
							setAttributes(update);
						},
						__nextHasNoMarginBottom: true,
						style: { minWidth: '70px' }
					})
				)
			)
		);

		if (linked) {
			children.push(
				el('div', { key: 'linked', style: { marginBottom: '12px' } },
					el(TextControl, {
						type: 'number',
						value: allValue,
						onChange: function (v) { handleValueChange('topLeft', v); },
						min: 0,
						__nextHasNoMarginBottom: true
					})
				)
			);
		}

		if (!linked) {
			children.push(
				el('div', { key: 'unlinked', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' } },
					directions.map(function (dir) {
						return el('div', { key: dir.key },
							el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } },
								dir.icon + ' ' + dir.label
							),
							el(TextControl, {
								type: 'number',
								value: values[dir.key] || '',
								onChange: function (v) { handleValueChange(dir.key, v); },
								min: 0,
								__nextHasNoMarginBottom: true
							})
						);
					})
				)
			);
		}

		if (hasValue) {
			var hintParts = directions.map(function (dir) {
				return (values[dir.key] || '0') + unit;
			});
			children.push(
				el('p', { key: 'hint', style: hintStyle }, 'border-radius: ' + hintParts.join(' '))
			);
		}

		if (hasValue) {
			children.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[radiusKey] = {};
						setAttributes(update);
					},
					style: { marginTop: '4px' }
				}, 'リセット')
			);
		}

		return el('div', null, children);
	}

	function renderBorderTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);
		var widthKey = attrKey(prefix, 'customBorderWidth', suffix);
		var widthLinkedKey = attrKey(prefix, 'customBorderWidthLinked', suffix);
		var styleKey = attrKey(prefix, 'customBorderStyle', suffix);
		var styleSidesKey = attrKey(prefix, 'customBorderStyleSides', suffix);
		var styleLinkedKey = attrKey(prefix, 'customBorderStyleLinked', suffix);
		var colorKey = attrKey(prefix, 'customBorderColor', suffix);
		var colorSidesKey = attrKey(prefix, 'customBorderColorSides', suffix);
		var colorLinkedKey = attrKey(prefix, 'customBorderColorLinked', suffix);

		var widthValues = attributes[widthKey] || {};
		var widthLinked = attributes[widthLinkedKey] !== false;
		var borderStyle = attributes[styleKey] || '';
		var styleSides = attributes[styleSidesKey] || {};
		var styleLinked = attributes[styleLinkedKey] !== false;
		var borderColor = attributes[colorKey] || '';
		var colorSides = attributes[colorSidesKey] || {};
		var colorLinked = attributes[colorLinkedKey] !== false;

		var allWidth = widthLinked ? (widthValues.top || widthValues.right || widthValues.bottom || widthValues.left || '') : '';
		var hasWidth = !!(widthValues.top || widthValues.right || widthValues.bottom || widthValues.left);

		var directions = [
			{ key: 'top', label: '上', icon: '\u2191' },
			{ key: 'right', label: '右', icon: '\u2192' },
			{ key: 'bottom', label: '下', icon: '\u2193' },
			{ key: 'left', label: '左', icon: '\u2190' }
		];

		function handleWidthChange(direction, newValue) {
			var updated;
			if (widthLinked) {
				updated = { top: newValue, right: newValue, bottom: newValue, left: newValue };
			} else {
				updated = Object.assign({}, widthValues);
				updated[direction] = newValue;
			}
			var update = {};
			update[widthKey] = updated;
			setAttributes(update);
		}

		var children = [];

		children.push(
			el('div', { key: 'section-width', style: sectionLabelStyle }, 'ボーダー幅')
		);

		children.push(
			el('div', { key: 'width-header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
				el('span', { style: { fontWeight: '500' } }, '幅 (px)'),
				el(Button, {
					isSmall: true,
					variant: widthLinked ? 'primary' : 'secondary',
					onClick: function () {
						var update = {};
						update[widthLinkedKey] = !widthLinked;
						setAttributes(update);
					},
					style: { fontSize: '11px', minWidth: '24px' },
					title: widthLinked ? '個別設定' : '一括設定'
				}, widthLinked ? '連結' : '個別')
			)
		);

		if (widthLinked) {
			children.push(
				el('div', { key: 'width-linked', style: { marginBottom: '12px' } },
					el(TextControl, {
						type: 'number',
						value: allWidth,
						onChange: function (v) { handleWidthChange('top', v); },
						min: 0,
						__nextHasNoMarginBottom: true
					})
				)
			);
		}

		if (!widthLinked) {
			children.push(
				el('div', { key: 'width-unlinked', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' } },
					directions.map(function (dir) {
						return el('div', { key: dir.key },
							el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } },
								dir.icon + ' ' + dir.label
							),
							el(TextControl, {
								type: 'number',
								value: widthValues[dir.key] || '',
								onChange: function (v) { handleWidthChange(dir.key, v); },
								min: 0,
								__nextHasNoMarginBottom: true
							})
						);
					})
				)
			);
		}

		children.push(
			el('div', { key: 'section-style', style: sectionLabelStyle }, 'スタイル・色')
		);

		// ── スタイル：連結/個別トグル ──
		children.push(
			el('div', { key: 'style-header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
				el('span', { style: { fontWeight: '500' } }, 'スタイル'),
				el(Button, {
					isSmall: true,
					variant: styleLinked ? 'primary' : 'secondary',
					onClick: function () {
						var update = {};
						if (styleLinked) {
							// 連結→個別: 現在のstring値を4辺にコピー
							var current = borderStyle || '';
							if (current) {
								update[styleSidesKey] = { top: current, right: current, bottom: current, left: current };
							}
						} else {
							// 個別→連結: 最初の非空値をstring属性にセット
							var first = styleSides.top || styleSides.right || styleSides.bottom || styleSides.left || '';
							if (first) {
								update[styleKey] = first;
							}
						}
						update[styleLinkedKey] = !styleLinked;
						setAttributes(update);
					},
					style: { fontSize: '11px', minWidth: '24px' },
					title: styleLinked ? '個別設定' : '一括設定'
				}, styleLinked ? '連結' : '個別')
			)
		);

		if (styleLinked) {
			children.push(
				el('div', { key: 'style-linked', style: { marginBottom: '12px' } },
					el(SelectControl, {
						value: borderStyle,
						options: BORDER_STYLE_OPTIONS,
						onChange: function (v) {
							var update = {};
							update[styleKey] = v;
							setAttributes(update);
						},
						__nextHasNoMarginBottom: true
					})
				)
			);
		} else {
			children.push(
				el('div', { key: 'style-unlinked', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' } },
					directions.map(function (dir) {
						return el('div', { key: dir.key },
							el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } },
								dir.icon + ' ' + dir.label
							),
							el(SelectControl, {
								value: styleSides[dir.key] || '',
								options: BORDER_STYLE_OPTIONS,
								onChange: function (v) {
									var updated = Object.assign({}, styleSides);
									updated[dir.key] = v;
									var update = {};
									update[styleSidesKey] = updated;
									setAttributes(update);
								},
								__nextHasNoMarginBottom: true
							})
						);
					})
				)
			);
		}

		// ── 色：連結/個別トグル ──
		var isRgbaMode = !!parseRgba(borderColor);
		var rgbaObj = isRgbaMode ? parseRgba(borderColor) : (hexToRgba(borderColor) || { r: 0, g: 0, b: 0, a: 1 });

		function setColor(v) {
			var update = {};
			update[colorKey] = v;
			setAttributes(update);
		}

		var colorChildren = [];

		colorChildren.push(
			el('div', { key: 'color-header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
				el('span', { style: { fontWeight: '500' } }, '色'),
				el(Button, {
					isSmall: true,
					variant: colorLinked ? 'primary' : 'secondary',
					onClick: function () {
						var update = {};
						if (colorLinked) {
							// 連結→個別: 現在のstring値を4辺にコピー
							var current = borderColor || '';
							if (current) {
								update[colorSidesKey] = { top: current, right: current, bottom: current, left: current };
							}
						} else {
							// 個別→連結: 最初の非空値をstring属性にセット
							var first = colorSides.top || colorSides.right || colorSides.bottom || colorSides.left || '';
							if (first) {
								update[colorKey] = first;
							}
						}
						update[colorLinkedKey] = !colorLinked;
						setAttributes(update);
					},
					style: { fontSize: '11px', minWidth: '24px' },
					title: colorLinked ? '個別設定' : '一括設定'
				}, colorLinked ? '連結' : '個別')
			)
		);

		if (colorLinked) {
			// 連結モード: 既存のHEX/RGBA切替UI
			colorChildren.push(
				el('div', { key: 'color-mode-toggle', style: { textAlign: 'right', marginBottom: '4px' } },
					el(Button, {
						isSmall: true,
						variant: 'tertiary',
						onClick: function () {
							if (isRgbaMode) {
								var obj = parseRgba(borderColor);
								if (obj) { setColor(rgbaToHex(obj.r, obj.g, obj.b)); }
							} else {
								var obj = hexToRgba(borderColor);
								if (obj) { setColor(rgbaToString(obj.r, obj.g, obj.b, obj.a)); }
								else if (!borderColor) { setColor('rgba(0, 0, 0, 1)'); }
							}
						},
						style: { fontSize: '11px' }
					}, isRgbaMode ? 'HEXに切替' : 'RGBAに切替')
				)
			);

			if (!isRgbaMode) {
				colorChildren.push(
					el('div', { key: 'color-hex' },
						el(TextControl, {
							value: borderColor,
							onChange: function (v) { setColor(v); },
							placeholder: '例: #333333',
							__nextHasNoMarginBottom: true
						})
					)
				);
			} else {
				colorChildren.push(
					el('div', { key: 'color-rgba', style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px' } },
						el('div', null,
							el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } }, 'R'),
							el(TextControl, {
								type: 'number',
								value: String(rgbaObj.r),
								onChange: function (v) { setColor(rgbaToString(v === '' ? 0 : parseInt(v, 10), rgbaObj.g, rgbaObj.b, rgbaObj.a)); },
								min: 0, max: 255, step: 1,
								__nextHasNoMarginBottom: true
							})
						),
						el('div', null,
							el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } }, 'G'),
							el(TextControl, {
								type: 'number',
								value: String(rgbaObj.g),
								onChange: function (v) { setColor(rgbaToString(rgbaObj.r, v === '' ? 0 : parseInt(v, 10), rgbaObj.b, rgbaObj.a)); },
								min: 0, max: 255, step: 1,
								__nextHasNoMarginBottom: true
							})
						),
						el('div', null,
							el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } }, 'B'),
							el(TextControl, {
								type: 'number',
								value: String(rgbaObj.b),
								onChange: function (v) { setColor(rgbaToString(rgbaObj.r, rgbaObj.g, v === '' ? 0 : parseInt(v, 10), rgbaObj.a)); },
								min: 0, max: 255, step: 1,
								__nextHasNoMarginBottom: true
							})
						),
						el('div', null,
							el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } }, 'A'),
							el(TextControl, {
								type: 'number',
								value: String(rgbaObj.a),
								onChange: function (v) { setColor(rgbaToString(rgbaObj.r, rgbaObj.g, rgbaObj.b, v === '' ? 1 : parseFloat(v))); },
								min: 0, max: 1, step: 0.01,
								__nextHasNoMarginBottom: true
							})
						)
					)
				);
			}

			if (borderColor) {
				colorChildren.push(
					el('div', { key: 'color-preview', style: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' } },
						el('span', { style: { display: 'inline-block', width: '20px', height: '20px', border: '1px solid #ccc', borderRadius: '3px', backgroundColor: borderColor } }),
						el('span', { style: { fontSize: '12px', color: '#757575' } }, borderColor)
					)
				);
			}
		} else {
			// 個別モード: 4方向テキスト入力 + 色見本プレビュー
			colorChildren.push(
				el('div', { key: 'color-unlinked', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } },
					directions.map(function (dir) {
						var sideColor = colorSides[dir.key] || '';
						return el('div', { key: dir.key },
							el('label', { style: { fontSize: '11px', color: '#757575', display: 'block', marginBottom: '4px' } },
								dir.icon + ' ' + dir.label
							),
							el('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
								sideColor ? el('span', { style: { display: 'inline-block', width: '16px', height: '16px', border: '1px solid #ccc', borderRadius: '2px', backgroundColor: sideColor, flexShrink: 0 } }) : null,
								el(TextControl, {
									value: sideColor,
									onChange: function (v) {
										var updated = Object.assign({}, colorSides);
										updated[dir.key] = v;
										var update = {};
										update[colorSidesKey] = updated;
										setAttributes(update);
									},
									placeholder: '#000',
									__nextHasNoMarginBottom: true
								})
							)
						);
					})
				)
			);
		}

		children.push(
			el('div', { key: 'color', style: { marginBottom: '12px' } }, colorChildren)
		);

		// ── ヒント表示：各辺のstyle/colorを個別に解決 ──
		if (hasWidth || borderStyle || borderColor || styleSides.top || colorSides.top) {
			var hintLines = [];
			if (hasWidth) {
				directions.forEach(function (dir) {
					var w = widthValues[dir.key] || '0';
					var s = (!styleLinked && styleSides[dir.key]) ? styleSides[dir.key] : (borderStyle || 'solid');
					var c = (!colorLinked && colorSides[dir.key]) ? colorSides[dir.key] : (borderColor || '#000');
					if (w !== '0' && w !== '') {
						hintLines.push('border-' + dir.key + ': ' + w + 'px ' + s + ' ' + c);
					}
				});
			}
			if (hintLines.length > 0) {
				children.push(
					el('p', { key: 'hint', style: hintStyle }, hintLines.join('; '))
				);
			}
		}

		// ── リセットボタン：新属性もクリア ──
		var hasAnySetting = hasWidth || borderStyle || borderColor ||
			styleSides.top || styleSides.right || styleSides.bottom || styleSides.left ||
			colorSides.top || colorSides.right || colorSides.bottom || colorSides.left;
		if (hasAnySetting) {
			children.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[widthKey] = {};
						update[styleKey] = '';
						update[styleSidesKey] = {};
						update[styleLinkedKey] = true;
						update[colorKey] = '';
						update[colorSidesKey] = {};
						update[colorLinkedKey] = true;
						setAttributes(update);
					},
					style: { marginTop: '4px' }
				}, 'リセット')
			);
		}

		return el('div', null, children);
	}

	function renderBackdropFilterTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);
		var bfKey = attrKey(prefix, 'backdropFilter', suffix);
		var value = attributes[bfKey] || '';
		var isCustom = value.indexOf('custom:') === 0;

		var children = [];

		children.push(
			el('div', { key: 'presets', style: { marginBottom: '12px' } },
				el('div', { style: { marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' } }, 'プリセット'),
				el(
					ButtonGroup,
					null,
					BACKDROP_FILTER_PRESETS.map(function (preset) {
						return el(Button, {
							key: preset.value,
							isPressed: value === preset.value,
							onClick: function () {
								var update = {};
								update[bfKey] = value === preset.value ? '' : preset.value;
								setAttributes(update);
							},
							size: 'compact'
						}, preset.label);
					})
				)
			)
		);

		children.push(
			el('div', { key: 'custom', style: { marginBottom: '12px' } },
				el(TextControl, {
					label: 'カスタム backdrop-filter',
					value: isCustom ? value.substring(7) : '',
					onChange: function (v) {
						var update = {};
						update[bfKey] = v ? 'custom:' + v : '';
						setAttributes(update);
					},
					placeholder: '例: blur(10px) saturate(1.5)',
					__nextHasNoMarginBottom: true
				})
			)
		);

		var cssVal = getBackdropFilterCssValue(value);
		if (cssVal) {
			children.push(
				el('p', { key: 'hint', style: hintStyle }, 'backdrop-filter: ' + cssVal)
			);
		}

		if (value) {
			children.push(
				el(Button, {
					key: 'reset',
					isSmall: true,
					variant: 'tertiary',
					isDestructive: true,
					onClick: function () {
						var update = {};
						update[bfKey] = '';
						setAttributes(update);
					},
					style: { marginTop: '4px' }
				}, 'リセット')
			);
		}

		return el('div', null, children);
	}

	function renderOpacityTab(device, prefix, options, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);
		var showBackgroundOpacity = options && options.showBackgroundOpacity;
		var opacityKey = attrKey(prefix, 'elementOpacity', suffix);
		var opacityVal = attributes[opacityKey] || '';

		var children = [];

		children.push(
			el('div', { key: 'element-opacity', style: { marginBottom: '16px' } },
				el(RangeControl, {
					label: '要素の透過',
					value: opacityVal !== '' ? parseInt(opacityVal, 10) : 100,
					onChange: function (v) {
						var update = {};
						update[opacityKey] = v !== undefined && v !== null && v !== 100 ? String(v) : '';
						setAttributes(update);
					},
					min: 0,
					max: 100,
					step: 1,
					__nextHasNoMarginBottom: true
				}),
				opacityVal !== '' ? el('p', { style: hintStyle }, 'opacity: ' + (parseInt(opacityVal, 10) / 100)) : null
			)
		);

		if (showBackgroundOpacity) {
			var bgOpacityKey = attrKey(prefix, 'backgroundOpacity', suffix);
			var bgOpacityVal = attributes[bgOpacityKey] || '';

			children.push(
				el('div', { key: 'bg-opacity', style: { marginBottom: '16px' } },
					el(RangeControl, {
						label: '背景の透過',
						value: bgOpacityVal !== '' ? parseInt(bgOpacityVal, 10) : 100,
						onChange: function (v) {
							var update = {};
							update[bgOpacityKey] = v !== undefined && v !== null && v !== 100 ? String(v) : '';
							setAttributes(update);
						},
						min: 0,
						max: 100,
						step: 1,
						__nextHasNoMarginBottom: true
					}),
					bgOpacityVal !== '' ? el('p', { style: hintStyle }, '背景色のalpha値を ' + (parseInt(bgOpacityVal, 10) / 100) + ' に変換') : null
				)
			);

			if (opacityVal !== '' || bgOpacityVal !== '') {
				children.push(
					el(Button, {
						key: 'reset',
						isSmall: true,
						variant: 'tertiary',
						isDestructive: true,
						onClick: function () {
							var update = {};
							update[opacityKey] = '';
							update[bgOpacityKey] = '';
							setAttributes(update);
						},
						style: { marginTop: '4px' }
					}, 'リセット')
				);
			}
		} else {
			if (opacityVal !== '') {
				children.push(
					el(Button, {
						key: 'reset',
						isSmall: true,
						variant: 'tertiary',
						isDestructive: true,
						onClick: function () {
							var update = {};
							update[opacityKey] = '';
							setAttributes(update);
						},
						style: { marginTop: '4px' }
					}, 'リセット')
				);
			}
		}

		return el('div', null, children);
	}

	// ── ポジション設定 ──

	var POSITION_TYPE_OPTIONS = [
		{ label: 'なし', value: '' },
		{ label: 'static', value: 'static' },
		{ label: 'relative', value: 'relative' },
		{ label: 'absolute', value: 'absolute' },
		{ label: 'sticky', value: 'sticky' },
		{ label: 'fixed', value: 'fixed' }
	];

	var POSITION_PRESET_OPTIONS = [
		{ label: '─', value: '' },
		{ label: '中央', value: 'center' },
		{ label: '上中央', value: 'top-center' },
		{ label: '下中央', value: 'bottom-center' },
		{ label: '左中央', value: 'left-center' },
		{ label: '右中央', value: 'right-center' }
	];

	var POSITION_PRESET_MAP = {
		'center':       { top: '50', topUnit: '%', right: '', rightUnit: 'px', bottom: '', bottomUnit: 'px', left: '50', leftUnit: '%', transform: 'translate(-50%, -50%)' },
		'top-center':   { top: '0',  topUnit: 'px', right: '', rightUnit: 'px', bottom: '', bottomUnit: 'px', left: '50', leftUnit: '%', transform: 'translateX(-50%)' },
		'bottom-center':{ top: '',   topUnit: 'px', right: '', rightUnit: 'px', bottom: '0', bottomUnit: 'px', left: '50', leftUnit: '%', transform: 'translateX(-50%)' },
		'left-center':  { top: '50', topUnit: '%', right: '', rightUnit: 'px', bottom: '', bottomUnit: 'px', left: '0', leftUnit: 'px', transform: 'translateY(-50%)' },
		'right-center': { top: '50', topUnit: '%', right: '0', rightUnit: 'px', bottom: '', bottomUnit: 'px', left: '', leftUnit: 'px', transform: 'translateY(-50%)' }
	};

	function applyPositionPreset(preset, prefix, suffix, setAttributes) {
		var map = POSITION_PRESET_MAP[preset];
		if (!map) return;
		var update = {};
		update[attrKey(prefix, 'positionTop', suffix)] = map.top;
		update[attrKey(prefix, 'positionTopUnit', suffix)] = map.topUnit;
		update[attrKey(prefix, 'positionRight', suffix)] = map.right;
		update[attrKey(prefix, 'positionRightUnit', suffix)] = map.rightUnit;
		update[attrKey(prefix, 'positionBottom', suffix)] = map.bottom;
		update[attrKey(prefix, 'positionBottomUnit', suffix)] = map.bottomUnit;
		update[attrKey(prefix, 'positionLeft', suffix)] = map.left;
		update[attrKey(prefix, 'positionLeftUnit', suffix)] = map.leftUnit;
		update[attrKey(prefix, 'positionTransform', suffix)] = map.transform;
		setAttributes(update);
	}

	function renderPositionTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);

		var typeKey = attrKey(prefix, 'positionType', suffix);
		var topKey = attrKey(prefix, 'positionTop', suffix);
		var topUnitKey = attrKey(prefix, 'positionTopUnit', suffix);
		var rightKey = attrKey(prefix, 'positionRight', suffix);
		var rightUnitKey = attrKey(prefix, 'positionRightUnit', suffix);
		var bottomKey = attrKey(prefix, 'positionBottom', suffix);
		var bottomUnitKey = attrKey(prefix, 'positionBottomUnit', suffix);
		var leftKey = attrKey(prefix, 'positionLeft', suffix);
		var leftUnitKey = attrKey(prefix, 'positionLeftUnit', suffix);
		var zIndexKey = attrKey(prefix, 'positionZIndex', suffix);
		var transformKey = attrKey(prefix, 'positionTransform', suffix);

		var posType = attributes[typeKey] || '';
		var showOffsets = posType !== '' && posType !== 'static';

		var children = [];

		children.push(
			el(SelectControl, {
				key: 'posType',
				label: 'position',
				value: posType,
				options: POSITION_TYPE_OPTIONS,
				onChange: function (v) {
					var update = {};
					update[typeKey] = v;
					setAttributes(update);
				},
				__nextHasNoMarginBottom: true
			})
		);

		if (posType) {
			children.push(
				el('p', { key: 'posHint', style: hintStyle }, 'position: ' + posType)
			);
		}

		if (showOffsets) {
			// 配置プリセット
			children.push(
				el('div', { key: 'preset', style: { marginTop: '12px' } },
					el(SelectControl, {
						label: '配置プリセット',
						value: '',
						options: POSITION_PRESET_OPTIONS,
						onChange: function (v) {
							if (v) applyPositionPreset(v, prefix, suffix, setAttributes);
						},
						__nextHasNoMarginBottom: true
					})
				)
			);

			// オフセット
			children.push(
				el('div', { key: 'offsets', style: { marginTop: '12px' } },
					el('div', { style: sectionLabelStyle }, 'オフセット'),
					createSizeInput('top', 'top', topKey, topUnitKey, attributes, setAttributes),
					createSizeInput('right', 'right', rightKey, rightUnitKey, attributes, setAttributes),
					createSizeInput('bottom', 'bottom', bottomKey, bottomUnitKey, attributes, setAttributes),
					createSizeInput('left', 'left', leftKey, leftUnitKey, attributes, setAttributes)
				)
			);

			// transform
			var transformVal = attributes[transformKey] || '';
			children.push(
				el('div', { key: 'transform', style: { marginTop: '12px' } },
					el('div', { style: sectionLabelStyle }, 'Transform'),
					el(TextControl, {
						value: transformVal,
						placeholder: '例: translate(-50%, -50%)',
						onChange: function (v) {
							var update = {};
							update[transformKey] = v;
							setAttributes(update);
						},
						__nextHasNoMarginBottom: true
					}),
					transformVal ? el('p', { style: hintStyle }, 'transform: ' + transformVal) : null,
					transformVal ? el(Button, {
						isSmall: true,
						variant: 'tertiary',
						isDestructive: true,
						onClick: function () {
							var update = {};
							update[transformKey] = '';
							setAttributes(update);
						},
						style: { marginTop: '2px' }
					}, 'リセット') : null
				)
			);
		}

		if (posType) {
			var zIndex = attributes[zIndexKey] || '';

			children.push(
				el('div', { key: 'zindex', style: { marginTop: '12px' } },
					el('div', { style: sectionLabelStyle }, 'Z-index'),
					el(TextControl, {
						type: 'number',
						value: zIndex,
						onChange: function (v) {
							var update = {};
							update[zIndexKey] = String(v);
							setAttributes(update);
						},
						__nextHasNoMarginBottom: true
					}),
					zIndex ? el('p', { style: hintStyle }, 'z-index: ' + zIndex) : null,
					zIndex ? el(Button, {
						isSmall: true,
						variant: 'tertiary',
						isDestructive: true,
						onClick: function () {
							var update = {};
							update[zIndexKey] = '';
							setAttributes(update);
						},
						style: { marginTop: '2px' }
					}, 'リセット') : null
				)
			);
		}

		return el('div', null, children);
	}

	// ── 属性定義ジェネレータ ──

	function generatePositionAttributes(prefix) {
		var attrs = {};
		var props = [
			'PositionType', 'PositionTop', 'PositionTopUnit',
			'PositionRight', 'PositionRightUnit', 'PositionBottom', 'PositionBottomUnit',
			'PositionLeft', 'PositionLeftUnit', 'PositionZIndex', 'PositionTransform'
		];
		var defaults = {
			PositionType: '', PositionTop: '', PositionTopUnit: 'px',
			PositionRight: '', PositionRightUnit: 'px',
			PositionBottom: '', PositionBottomUnit: 'px',
			PositionLeft: '', PositionLeftUnit: 'px',
			PositionZIndex: '', PositionTransform: ''
		};
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			props.forEach(function (prop) {
				var key = prefix ? prefix + prop + device : prop.charAt(0).toLowerCase() + prop.slice(1) + device;
				attrs[key] = { type: 'string', default: defaults[prop] || '' };
			});
		});
		return attrs;
	}

	function generateSizeAttributes(prefix) {
		var attrs = {};
		var sizeProps = ['SizeWidth', 'SizeWidthUnit', 'SizeMinWidth', 'SizeMinWidthUnit', 'SizeMaxWidth', 'SizeMaxWidthUnit', 'SizeHeight', 'SizeHeightUnit', 'SizeMinHeight', 'SizeMinHeightUnit', 'SizeMaxHeight', 'SizeMaxHeightUnit', 'SizeAspectRatio', 'LayoutOverflow'];
		var sizeDefaults = {
			SizeWidth: '', SizeWidthUnit: 'px', SizeMinWidth: '', SizeMinWidthUnit: 'px',
			SizeMaxWidth: '', SizeMaxWidthUnit: 'px', SizeHeight: '', SizeHeightUnit: 'px',
			SizeMinHeight: '', SizeMinHeightUnit: 'px', SizeMaxHeight: '', SizeMaxHeightUnit: 'px',
			SizeAspectRatio: '', LayoutOverflow: ''
		};
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			sizeProps.forEach(function (prop) {
				var key = prefix ? prefix + prop + device : prop.charAt(0).toLowerCase() + prop.slice(1) + device;
				attrs[key] = { type: 'string', default: sizeDefaults[prop] || '' };
			});
		});
		return attrs;
	}

	function generateFlexAttributes(prefix, options) {
		var attrs = {};
		var includeWrap = options && options.includeWrap;
		var flexProps = ['FlexShorthand', 'FlexGrow', 'FlexShrink', 'FlexBasis', 'FlexBasisUnit', 'FlexOrder'];
		if (includeWrap) flexProps.push('FlexWrap');
		var flexDefaults = {
			FlexShorthand: '', FlexGrow: '', FlexShrink: '',
			FlexBasis: '', FlexBasisUnit: 'px', FlexOrder: '', FlexWrap: ''
		};
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			flexProps.forEach(function (prop) {
				var key = prefix ? prefix + prop + device : prop.charAt(0).toLowerCase() + prop.slice(1) + device;
				attrs[key] = { type: 'string', default: flexDefaults[prop] || '' };
			});
		});
		return attrs;
	}

	function generateSpacingAttributes(prefix, options) {
		var attrs = {};
		var includeGap = options && options.gap;
		var includePadding = options && options.padding;
		var includeMargin = options && options.margin;
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			if (includeGap) {
				attrs[attrKey(prefix, 'spacingGap', device)] = { type: 'string', default: '' };
				attrs[attrKey(prefix, 'spacingGapUnit', device)] = { type: 'string', default: 'preset' };
				attrs[attrKey(prefix, 'spacingGapRow', device)] = { type: 'string', default: '' };
				attrs[attrKey(prefix, 'spacingGapRowUnit', device)] = { type: 'string', default: 'preset' };
				attrs[attrKey(prefix, 'spacingGapColumn', device)] = { type: 'string', default: '' };
				attrs[attrKey(prefix, 'spacingGapColumnUnit', device)] = { type: 'string', default: 'preset' };
				attrs[attrKey(prefix, 'spacingGapLinked', device)] = { type: 'boolean', default: true };
			}
			if (includePadding) {
				attrs[attrKey(prefix, 'spacingPadding', device)] = { type: 'object', default: {} };
				attrs[attrKey(prefix, 'spacingPaddingUnit', device)] = { type: 'string', default: 'preset' };
				attrs[attrKey(prefix, 'spacingPaddingLinked', device)] = { type: 'boolean', default: true };
			}
			if (includeMargin) {
				attrs[attrKey(prefix, 'spacingMargin', device)] = { type: 'object', default: {} };
				attrs[attrKey(prefix, 'spacingMarginUnit', device)] = { type: 'string', default: 'preset' };
				attrs[attrKey(prefix, 'spacingMarginLinked', device)] = { type: 'boolean', default: true };
			}
		});
		return attrs;
	}

	function generateMarginAttributes(prefix) {
		return generateSpacingAttributes(prefix, { gap: false, padding: false, margin: true });
	}

	function generateLayoutAttributes(prefix) {
		var attrs = {};
		var layoutProps = ['LayoutDirection', 'LayoutJustify', 'LayoutAlign', 'LayoutAlignSelf', 'LayoutJustifySelf'];
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			layoutProps.forEach(function (prop) {
				var key = prefix ? prefix + prop + device : prop.charAt(0).toLowerCase() + prop.slice(1) + device;
				attrs[key] = { type: 'string', default: '' };
			});
		});
		return attrs;
	}

	// ── レイアウト用アイコン ──
	var LAYOUT_ICONS = {
		row: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M4 6.5h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4V16h5a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 9 8H4V6.5Zm16 0h-5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h5V16h-5a.5.5 0 0 1-.5-.5v-7A.5.5 0 0 1 15 8h5V6.5Z' })
		),
		column: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M17.5 4v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V4H8v5a.5.5 0 0 0 .5.5h7A.5.5 0 0 0 16 9V4h1.5Zm0 16v-5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v5H8v-5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v5h1.5Z' })
		),
		rowReverse: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M20 6.5h-5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h5V16h-5a.5.5 0 0 1-.5-.5v-7A.5.5 0 0 1 15 8h5V6.5ZM4 6.5h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4V16h5a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 9 8H4V6.5Z' }),
			el('path', { d: 'M2 12l3-2.5v5L2 12Z', fill: 'currentColor' })
		),
		columnReverse: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M17.5 20v-5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v5H8v-5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v5h1.5Zm0-16v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V4H8v5a.5.5 0 0 0 .5.5h7A.5.5 0 0 0 16 9V4h1.5Z' }),
			el('path', { d: 'M12 2l-2.5 3h5L12 2Z', fill: 'currentColor' })
		),
		justifyLeft: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M9 9v6h11V9H9zM4 20h1.5V4H4v16z' })
		),
		justifyCenter: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M20 9h-7.2V4h-1.6v5H4v6h7.2v5h1.6v-5H20z' })
		),
		justifyRight: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M4 15h11V9H4v6zM18.5 4v16H20V4h-1.5z' })
		),
		justifySpaceBetween: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M9 15h6V9H9v6zM4 20h1.5V4H4v16zM18.5 4v16H20V4h-1.5z' })
		),
		justifySpaceAround: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M7 15h3V9H7v6zM14 15h3V9H14v6zM4 20h1.5V4H4v16zM18.5 4v16H20V4h-1.5z' })
		),
		alignTop: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M9 20h6V9H9v11zM4 4v1.5h16V4H4z' })
		),
		alignCenter: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M20 11h-5V4H9v7H4v1.5h5V20h6v-7.5h5z' })
		),
		alignBottom: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M15 4H9v11h6V4zM4 18.5V20h16v-1.5H4z' })
		),
		alignStretch: el('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: '24', height: '24' },
			el('path', { d: 'M4 4h1.5v16H4V4zm14.5 0V20H20V4h-1.5zM9 6.5h6v11H9z' })
		)
	};

	// ── レイアウト用ボタングループ ──
	function createLayoutButtonGroup(label, cssHint, value, options, onChange) {
		var ButtonGroup = wp.components.ButtonGroup;
		var Button = wp.components.Button;
		return el(
			'div',
			{ style: { marginBottom: '12px' } },
			el('div', { style: { marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' } }, label),
			el(
				ButtonGroup,
				null,
				options.map(function (opt) {
					return el(Button, {
						key: opt.value,
						icon: opt.icon || undefined,
						label: opt.label,
						isPressed: value === opt.value,
						onClick: function () {
							onChange(value === opt.value ? '' : opt.value);
						},
						size: 'compact'
					}, opt.icon ? undefined : opt.label);
				})
			),
			el('p', { style: hintStyle }, value ? cssHint + ': ' + value : cssHint)
		);
	}

	/**
	 * レイアウト設定タブのレンダリング（プレフィックス対応）
	 * @param {string} device - 'pc' | 'tablet' | 'mobile'
	 * @param {string} prefix - 属性プレフィックス（空文字列 or 'img' 等）
	 * @param {object} attributes - ブロック属性
	 * @param {function} setAttributes - 属性更新関数
	 */
	function renderLayoutTab(device, prefix, attributes, setAttributes) {
		var suffix = getAttrSuffix(device);

		var directionKey   = attrKey(prefix, 'layoutDirection', suffix);
		var justifyKey     = attrKey(prefix, 'layoutJustify', suffix);
		var alignKey       = attrKey(prefix, 'layoutAlign', suffix);
		var alignSelfKey   = attrKey(prefix, 'layoutAlignSelf', suffix);
		var justifySelfKey = attrKey(prefix, 'layoutJustifySelf', suffix);

		var direction = attributes[directionKey] || '';
		var isColumn = direction === 'column' || direction === 'column-reverse';

		var directionOptions = [
			{ value: 'row', icon: LAYOUT_ICONS.row, label: '横並び' },
			{ value: 'column', icon: LAYOUT_ICONS.column, label: '縦並び' },
			{ value: 'row-reverse', icon: LAYOUT_ICONS.rowReverse, label: '横並び（逆順）' },
			{ value: 'column-reverse', icon: LAYOUT_ICONS.columnReverse, label: '縦並び（逆順）' }
		];

		var justifyOptions = [
			{ value: 'flex-start', icon: LAYOUT_ICONS.justifyLeft, label: isColumn ? '上揃え' : '左揃え' },
			{ value: 'center', icon: LAYOUT_ICONS.justifyCenter, label: '中央' },
			{ value: 'flex-end', icon: LAYOUT_ICONS.justifyRight, label: isColumn ? '下揃え' : '右揃え' },
			{ value: 'space-between', icon: LAYOUT_ICONS.justifySpaceBetween, label: '均等配置' },
			{ value: 'space-around', icon: LAYOUT_ICONS.justifySpaceAround, label: '均等配置（余白あり）' }
		];

		var alignOptions = [
			{ value: 'flex-start', icon: LAYOUT_ICONS.alignTop, label: isColumn ? '左揃え' : '上揃え' },
			{ value: 'center', icon: LAYOUT_ICONS.alignCenter, label: '中央' },
			{ value: 'flex-end', icon: LAYOUT_ICONS.alignBottom, label: isColumn ? '右揃え' : '下揃え' },
			{ value: 'stretch', icon: LAYOUT_ICONS.alignStretch, label: '伸縮' }
		];

		var alignSelfOptions = [
			{ value: 'flex-start', icon: LAYOUT_ICONS.alignTop, label: '上揃え' },
			{ value: 'center', icon: LAYOUT_ICONS.alignCenter, label: '中央' },
			{ value: 'flex-end', icon: LAYOUT_ICONS.alignBottom, label: '下揃え' },
			{ value: 'stretch', icon: LAYOUT_ICONS.alignStretch, label: '伸縮' }
		];

		var justifySelfOptions = [
			{ value: 'flex-start', icon: LAYOUT_ICONS.justifyLeft, label: '左揃え' },
			{ value: 'center', icon: LAYOUT_ICONS.justifyCenter, label: '中央' },
			{ value: 'flex-end', icon: LAYOUT_ICONS.justifyRight, label: '右揃え' },
			{ value: 'stretch', icon: LAYOUT_ICONS.alignStretch, label: '伸縮' }
		];

		var children = [];

		children.push(
			el('div', { key: 'section-children', style: sectionLabelStyle }, '子要素の並び方')
		);

		children.push(
			el('div', { key: 'direction' },
				createLayoutButtonGroup(
					'並び方向',
					'flex-direction',
					direction,
					directionOptions,
					function (val) {
						var update = {};
						update[directionKey] = val;
						if (!val) {
							update[justifyKey] = '';
							update[alignKey] = '';
						}
						setAttributes(update);
					}
				)
			)
		);

		if (direction) {
			children.push(
				el('div', { key: 'justify' },
					createLayoutButtonGroup(
						isColumn ? '垂直配置' : '水平配置',
						'justify-content',
						attributes[justifyKey] || '',
						justifyOptions,
						function (val) {
							var update = {};
							update[justifyKey] = val;
							setAttributes(update);
						}
					)
				)
			);

			children.push(
				el('div', { key: 'align' },
					createLayoutButtonGroup(
						isColumn ? '水平配置' : '垂直配置',
						'align-items',
						attributes[alignKey] || '',
						alignOptions,
						function (val) {
							var update = {};
							update[alignKey] = val;
							setAttributes(update);
						}
					)
				)
			);
		}

		children.push(
			el('div', { key: 'section-self', style: sectionLabelStyle }, 'この要素の配置')
		);

		children.push(
			el('div', { key: 'justify-self' },
				createLayoutButtonGroup(
					'横位置',
					'justify-self',
					attributes[justifySelfKey] || '',
					justifySelfOptions,
					function (val) {
						var update = {};
						update[justifySelfKey] = val;
						setAttributes(update);
					}
				)
			)
		);

		children.push(
			el('div', { key: 'align-self' },
				createLayoutButtonGroup(
					'縦位置',
					'align-self',
					attributes[alignSelfKey] || '',
					alignSelfOptions,
					function (val) {
						var update = {};
						update[alignSelfKey] = val;
						setAttributes(update);
					}
				)
			)
		);

		return el('div', null, children);
	}

	function generateStyleAttributes(prefix, options) {
		var attrs = {};
		var includeBackgroundOpacity = options && options.includeBackgroundOpacity;
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			attrs[attrKey(prefix, 'boxShadow', device)] = { type: 'string', default: '' };
			attrs[attrKey(prefix, 'customBorderRadius', device)] = { type: 'object', default: {} };
			attrs[attrKey(prefix, 'customBorderRadiusUnit', device)] = { type: 'string', default: 'px' };
			attrs[attrKey(prefix, 'customBorderRadiusLinked', device)] = { type: 'boolean', default: true };
			attrs[attrKey(prefix, 'customBorderWidth', device)] = { type: 'object', default: {} };
			attrs[attrKey(prefix, 'customBorderWidthLinked', device)] = { type: 'boolean', default: true };
			attrs[attrKey(prefix, 'customBorderStyle', device)] = { type: 'string', default: '' };
			attrs[attrKey(prefix, 'customBorderStyleSides', device)] = { type: 'object', default: {} };
			attrs[attrKey(prefix, 'customBorderStyleLinked', device)] = { type: 'boolean', default: true };
			attrs[attrKey(prefix, 'customBorderColor', device)] = { type: 'string', default: '' };
			attrs[attrKey(prefix, 'customBorderColorSides', device)] = { type: 'object', default: {} };
			attrs[attrKey(prefix, 'customBorderColorLinked', device)] = { type: 'boolean', default: true };
			attrs[attrKey(prefix, 'elementOpacity', device)] = { type: 'string', default: '' };
			if (includeBackgroundOpacity) {
				attrs[attrKey(prefix, 'backgroundOpacity', device)] = { type: 'string', default: '' };
			}
		});
		return attrs;
	}

	function generateShadowAttributes(prefix) {
		var attrs = {};
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			attrs[attrKey(prefix, 'boxShadow', device)] = { type: 'string', default: '' };
			attrs[attrKey(prefix, 'textShadow', device)] = { type: 'string', default: '' };
		});
		return attrs;
	}

	function generateBorderRadiusAttributes(prefix) {
		var attrs = {};
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			attrs[attrKey(prefix, 'customBorderRadius', device)] = { type: 'object', default: {} };
			attrs[attrKey(prefix, 'customBorderRadiusUnit', device)] = { type: 'string', default: 'px' };
			attrs[attrKey(prefix, 'customBorderRadiusLinked', device)] = { type: 'boolean', default: true };
		});
		return attrs;
	}

	function generateBorderAttributes(prefix) {
		var attrs = {};
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			attrs[attrKey(prefix, 'customBorderWidth', device)] = { type: 'object', default: {} };
			attrs[attrKey(prefix, 'customBorderWidthLinked', device)] = { type: 'boolean', default: true };
			attrs[attrKey(prefix, 'customBorderStyle', device)] = { type: 'string', default: '' };
			attrs[attrKey(prefix, 'customBorderStyleSides', device)] = { type: 'object', default: {} };
			attrs[attrKey(prefix, 'customBorderStyleLinked', device)] = { type: 'boolean', default: true };
			attrs[attrKey(prefix, 'customBorderColor', device)] = { type: 'string', default: '' };
			attrs[attrKey(prefix, 'customBorderColorSides', device)] = { type: 'object', default: {} };
			attrs[attrKey(prefix, 'customBorderColorLinked', device)] = { type: 'boolean', default: true };
		});
		return attrs;
	}

	function generateBackdropFilterAttributes(prefix) {
		var attrs = {};
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			attrs[attrKey(prefix, 'backdropFilter', device)] = { type: 'string', default: '' };
		});
		return attrs;
	}

	function generateOpacityAttributes(prefix, options) {
		var attrs = {};
		var includeBackgroundOpacity = options && options.includeBackgroundOpacity;
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			attrs[attrKey(prefix, 'elementOpacity', device)] = { type: 'string', default: '' };
			if (includeBackgroundOpacity) {
				attrs[attrKey(prefix, 'backgroundOpacity', device)] = { type: 'string', default: '' };
			}
		});
		return attrs;
	}

	// ── エディタプレビュー用スタイル生成 ──

	function getPreviewStyles(prefix, attributes, options) {
		var style = {};
		var p = prefix;

		if (options.size) {
			var sw = attributes[attrKey(p, 'sizeWidth', '')];
			if (sw) style.width = isSizeKeyword(sw) ? sw : sw + (attributes[attrKey(p, 'sizeWidthUnit', '')] || 'px');
			var smnw = attributes[attrKey(p, 'sizeMinWidth', '')];
			if (smnw) style.minWidth = isSizeKeyword(smnw) ? smnw : smnw + (attributes[attrKey(p, 'sizeMinWidthUnit', '')] || 'px');
			var smxw = attributes[attrKey(p, 'sizeMaxWidth', '')];
			if (smxw) style.maxWidth = isSizeKeyword(smxw) ? smxw : smxw + (attributes[attrKey(p, 'sizeMaxWidthUnit', '')] || 'px');
			var sh = attributes[attrKey(p, 'sizeHeight', '')];
			if (sh) style.height = isSizeKeyword(sh) ? sh : sh + (attributes[attrKey(p, 'sizeHeightUnit', '')] || 'px');
			var smnh = attributes[attrKey(p, 'sizeMinHeight', '')];
			if (smnh) style.minHeight = isSizeKeyword(smnh) ? smnh : smnh + (attributes[attrKey(p, 'sizeMinHeightUnit', '')] || 'px');
			var smxh = attributes[attrKey(p, 'sizeMaxHeight', '')];
			if (smxh) style.maxHeight = isSizeKeyword(smxh) ? smxh : smxh + (attributes[attrKey(p, 'sizeMaxHeightUnit', '')] || 'px');
			var sar = attributes[attrKey(p, 'sizeAspectRatio', '')];
			if (sar) style.aspectRatio = sar;
			var ov = attributes[attrKey(p, 'layoutOverflow', '')];
			if (ov) style.overflow = ov;
		}

		if (options.flex) {
			var fs = attributes[attrKey(p, 'flexShorthand', '')];
			if (fs) style.flex = fs;
			var fg = attributes[attrKey(p, 'flexGrow', '')];
			if (fg !== '' && fg !== undefined) style.flexGrow = fg;
			var fsh = attributes[attrKey(p, 'flexShrink', '')];
			if (fsh !== '' && fsh !== undefined) style.flexShrink = fsh;
			var fb = attributes[attrKey(p, 'flexBasis', '')];
			if (fb) style.flexBasis = fb + (attributes[attrKey(p, 'flexBasisUnit', '')] || 'px');
			var fo = attributes[attrKey(p, 'flexOrder', '')];
			if (fo !== '' && fo !== undefined) style.order = fo;
		}

		if (options.padding) {
			var sp = attributes[attrKey(p, 'spacingPadding', '')] || {};
			var pu = attributes[attrKey(p, 'spacingPaddingUnit', '')] || 'preset';
			if (sp.top) style.paddingTop = getCssValue(sp.top, pu, true);
			if (sp.right) style.paddingRight = getCssValue(sp.right, pu, true);
			if (sp.bottom) style.paddingBottom = getCssValue(sp.bottom, pu, true);
			if (sp.left) style.paddingLeft = getCssValue(sp.left, pu, true);
		}

		if (options.margin) {
			var sm = attributes[attrKey(p, 'spacingMargin', '')] || {};
			var mu = attributes[attrKey(p, 'spacingMarginUnit', '')] || 'preset';
			if (sm.top) style.marginTop = getCssValue(sm.top, mu, true);
			if (sm.right) style.marginRight = getCssValue(sm.right, mu, true);
			if (sm.bottom) style.marginBottom = getCssValue(sm.bottom, mu, true);
			if (sm.left) style.marginLeft = getCssValue(sm.left, mu, true);
		}

		if (options.shadow) {
			var shadowCss = getShadowCssValue(attributes[attrKey(p, 'boxShadow', '')]);
			if (shadowCss) style.boxShadow = shadowCss;
			var textShadowCss = getTextShadowCssValue(attributes[attrKey(p, 'textShadow', '')]);
			if (textShadowCss) style.textShadow = textShadowCss;
		}

		if (options.backdropFilter) {
			var bfCss = getBackdropFilterCssValue(attributes[attrKey(p, 'backdropFilter', '')]);
			if (bfCss) {
				style.backdropFilter = bfCss;
				style.WebkitBackdropFilter = bfCss;
			}
		}

		if (options.borderRadius) {
			var br = attributes[attrKey(p, 'customBorderRadius', '')] || {};
			var brUnit = attributes[attrKey(p, 'customBorderRadiusUnit', '')] || 'px';
			if (br.topLeft) style.borderTopLeftRadius = br.topLeft + brUnit;
			if (br.topRight) style.borderTopRightRadius = br.topRight + brUnit;
			if (br.bottomRight) style.borderBottomRightRadius = br.bottomRight + brUnit;
			if (br.bottomLeft) style.borderBottomLeftRadius = br.bottomLeft + brUnit;
			if (br.topLeft || br.topRight || br.bottomRight || br.bottomLeft) style.overflow = 'hidden';
		}

		if (options.border) {
			var bw = attributes[attrKey(p, 'customBorderWidth', '')] || {};
			var bStyle = attributes[attrKey(p, 'customBorderStyle', '')] || '';
			var bColor = attributes[attrKey(p, 'customBorderColor', '')] || '';
			var bStyleSides = attributes[attrKey(p, 'customBorderStyleSides', '')] || {};
			var bStyleLinked = attributes[attrKey(p, 'customBorderStyleLinked', '')] !== false;
			var bColorSides = attributes[attrKey(p, 'customBorderColorSides', '')] || {};
			var bColorLinked = attributes[attrKey(p, 'customBorderColorLinked', '')] !== false;
			var borderProps = { top: 'borderTop', right: 'borderRight', bottom: 'borderBottom', left: 'borderLeft' };
			['top', 'right', 'bottom', 'left'].forEach(function (side) {
				if (bw[side]) {
					var sStyle = (!bStyleLinked && bStyleSides[side]) ? bStyleSides[side] : (bStyle || 'solid');
					var sColor = (!bColorLinked && bColorSides[side]) ? bColorSides[side] : (bColor || '#000');
					style[borderProps[side]] = bw[side] + 'px ' + sStyle + ' ' + sColor;
				}
			});
		}

		if (options.opacity) {
			var eo = attributes[attrKey(p, 'elementOpacity', '')];
			if (eo !== '' && eo !== undefined) {
				style.opacity = parseInt(eo, 10) / 100;
			}
		}

		if (options.position) {
			var pt = attributes[attrKey(p, 'positionType', '')];
			if (pt) style.position = pt;
			var pTop = attributes[attrKey(p, 'positionTop', '')];
			if (pTop) style.top = isSizeKeyword(pTop) ? pTop : pTop + (attributes[attrKey(p, 'positionTopUnit', '')] || 'px');
			var pRight = attributes[attrKey(p, 'positionRight', '')];
			if (pRight) style.right = isSizeKeyword(pRight) ? pRight : pRight + (attributes[attrKey(p, 'positionRightUnit', '')] || 'px');
			var pBottom = attributes[attrKey(p, 'positionBottom', '')];
			if (pBottom) style.bottom = isSizeKeyword(pBottom) ? pBottom : pBottom + (attributes[attrKey(p, 'positionBottomUnit', '')] || 'px');
			var pLeft = attributes[attrKey(p, 'positionLeft', '')];
			if (pLeft) style.left = isSizeKeyword(pLeft) ? pLeft : pLeft + (attributes[attrKey(p, 'positionLeftUnit', '')] || 'px');
			var pz = attributes[attrKey(p, 'positionZIndex', '')];
			if (pz !== '' && pz !== undefined) style.zIndex = pz;
			var pTransform = attributes[attrKey(p, 'positionTransform', '')];
			if (pTransform) style.transform = pTransform;
		}

		return style;
	}

	// ── レスポンシブプレビュー用ヘルパー ──

	/**
	 * 属性をデバイスカスケード順でリマップ
	 * CSS カスケードを再現: PC → Tablet で上書き → Mobile で上書き
	 * getPreviewStyles にリマップ済み attributes を渡すことで Tablet/Mobile プレビューを実現
	 */
	function remapAttrsForDevice(attributes, deviceSuffix) {
		if (!deviceSuffix) return attributes;
		var remapped = {};
		Object.keys(attributes).forEach(function (key) {
			remapped[key] = attributes[key];
		});
		var suffixes = deviceSuffix === 'Mobile' ? ['Tablet', 'Mobile'] : ['Tablet'];
		suffixes.forEach(function (suffix) {
			// まず値キー（Unit/Linked 以外）で実際に設定されているものを収集
			var activeBaseKeys = {};
			Object.keys(attributes).forEach(function (key) {
				if (!key.endsWith(suffix)) return;
				var baseKey = key.slice(0, -suffix.length);
				if (!baseKey || !(baseKey in attributes)) return;
				// Unit/Linked はコンパニオンキー — 値キーが active な場合のみ remap
				if (/Unit$|Linked$/.test(baseKey)) return;
				var val = attributes[key];
				if (val === undefined || val === '') return;
				if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
					var hasValue = Object.keys(val).some(function (k) {
						return val[k] !== '' && val[k] !== undefined && val[k] !== null;
					});
					if (!hasValue) return;
				}
				activeBaseKeys[baseKey] = true;
			});
			Object.keys(attributes).forEach(function (key) {
				if (!key.endsWith(suffix)) return;
				var baseKey = key.slice(0, -suffix.length);
				if (!baseKey || !(baseKey in attributes)) return;
				// コンパニオンキー（Unit/Linked）は対応する値キーが active な場合のみ remap
				if (/Unit$|Linked$/.test(baseKey)) {
					// spacingGapUnit → spacingGap が active か確認
					var valueBaseKey = baseKey.replace(/Unit$|Linked$/, '');
					if (!activeBaseKeys[valueBaseKey]) return;
				}
				var val = attributes[key];
				if (val === undefined || val === '') return;
				if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
					var hasValue = Object.keys(val).some(function (k) {
						return val[k] !== '' && val[k] !== undefined && val[k] !== null;
					});
					if (!hasValue) return;
					var merged = Object.assign({}, remapped[baseKey] || {});
					Object.keys(val).forEach(function (k) {
						if (val[k] !== '' && val[k] !== undefined && val[k] !== null) {
							merged[k] = val[k];
						}
					});
					remapped[baseKey] = merged;
				} else {
					remapped[baseKey] = val;
				}
			});
		});
		return remapped;
	}

	/**
	 * React style オブジェクト → CSS 文字列に変換
	 * @param {object} styleObj - { width: '300px', marginTop: '10px' }
	 * @param {boolean} [important] - true なら各宣言に !important を付与
	 * @return {string} 'width:300px;margin-top:10px;' or 'width:300px !important;...'
	 */
	function styleObjectToCss(styleObj, important) {
		var css = '';
		var suffix = important ? ' !important;' : ';';
		Object.keys(styleObj).forEach(function (key) {
			var val = styleObj[key];
			if (val === undefined || val === null || val === '') return;
			var cssProp = key.replace(/([A-Z])/g, '-$1').toLowerCase();
			css += cssProp + ':' + val + suffix;
		});
		return css;
	}

	/**
	 * PC/Tablet/Mobile の3デバイス分のプレビューCSSを一括生成
	 * @param {string} selector - CSS セレクタ（例: '.uid.uid.uid'）
	 * @param {string} prefix - 属性プレフィックス
	 * @param {object} attributes - ブロック属性（未リマップ）
	 * @param {object} options - getPreviewStyles に渡すオプション
	 * @param {object} [gapConfig] - gap 設定 { gap: true } など（省略可）
	 * @return {string} CSS 文字列（空文字列 = スタイルなし）
	 */
	function generatePreviewCss(selector, prefix, attributes, options, gapConfig) {
		var bp = BREAKPOINTS;

		// PC スタイル
		var pcStyle = getPreviewStyles(prefix, attributes, options);
		if (gapConfig && gapConfig.gap) {
			addGapToStyle(pcStyle, prefix, attributes, '');
		}
		var pcCss = styleObjectToCss(pcStyle);

		// Tablet スタイル（差分のみ）
		var tabletAttrs = remapAttrsForDevice(attributes, 'Tablet');
		var tabletStyle = getPreviewStyles(prefix, tabletAttrs, options);
		if (gapConfig && gapConfig.gap) {
			addGapToStyle(tabletStyle, prefix, tabletAttrs, '');
		}
		var tabletDiff = diffStyles(pcStyle, tabletStyle);
		var tabletCss = styleObjectToCss(tabletDiff);

		// Mobile スタイル（差分のみ）
		var mobileAttrs = remapAttrsForDevice(attributes, 'Mobile');
		var mobileStyle = getPreviewStyles(prefix, mobileAttrs, options);
		if (gapConfig && gapConfig.gap) {
			addGapToStyle(mobileStyle, prefix, mobileAttrs, '');
		}
		var mobileDiff = diffStyles(tabletStyle, mobileStyle);
		var mobileCss = styleObjectToCss(mobileDiff);

		if (!pcCss && !tabletCss && !mobileCss) return '';

		var css = '';
		if (pcCss) css += selector + '{' + pcCss + '}\n';
		if (tabletCss) css += '@media(max-width:' + bp.tablet + 'px){' + selector + '{' + tabletCss + '}}\n';
		if (mobileCss) css += '@media(max-width:' + bp.mobile + 'px){' + selector + '{' + mobileCss + '}}\n';
		return css;
	}

	/**
	 * Tablet/Mobile のレスポンシブオーバーライド CSS を生成
	 * Desktop の inline style を !important 付き media query で上書きする用途
	 * @param {string} selector - CSS セレクタ
	 * @param {string} prefix - 属性プレフィックス
	 * @param {object} attributes - ブロック属性（未リマップ）
	 * @param {object} options - getPreviewStyles に渡すオプション
	 * @param {object} [gapConfig] - gap 設定 { gap: true } など（省略可）
	 * @return {string} media query CSS 文字列（Tablet/Mobile のみ、!important 付き）
	 */
	function generateResponsiveOverrideCss(selector, prefix, attributes, options, gapConfig) {
		var bp = BREAKPOINTS;
		var css = '';

		// PC baseline
		var pcStyle = getPreviewStyles(prefix, attributes, options);
		if (gapConfig && gapConfig.gap) addGapToStyle(pcStyle, prefix, attributes, '');

		// Tablet diff
		var tabletAttrs = remapAttrsForDevice(attributes, 'Tablet');
		var tabletStyle = getPreviewStyles(prefix, tabletAttrs, options);
		if (gapConfig && gapConfig.gap) addGapToStyle(tabletStyle, prefix, tabletAttrs, '');
		var tabletCss = styleObjectToCss(diffStyles(pcStyle, tabletStyle), true);
		if (tabletCss) {
			css += '@media(max-width:' + bp.tablet + 'px){' + selector + '{' + tabletCss + '}}\n';
		}

		// Mobile diff (from tablet baseline)
		var mobileAttrs = remapAttrsForDevice(attributes, 'Mobile');
		var mobileStyle = getPreviewStyles(prefix, mobileAttrs, options);
		if (gapConfig && gapConfig.gap) addGapToStyle(mobileStyle, prefix, mobileAttrs, '');
		var mobileCss = styleObjectToCss(diffStyles(tabletStyle, mobileStyle), true);
		if (mobileCss) {
			css += '@media(max-width:' + bp.mobile + 'px){' + selector + '{' + mobileCss + '}}\n';
		}

		return css;
	}

	/**
	 * gap スタイルを style オブジェクトに追加
	 */
	function addGapToStyle(style, prefix, attrs, suffix) {
		var gapRowCss = getCssValue(
			attrs[attrKey(prefix, 'spacingGapRow', suffix)],
			attrs[attrKey(prefix, 'spacingGapRowUnit', suffix)],
			true
		);
		var gapColCss = getCssValue(
			attrs[attrKey(prefix, 'spacingGapColumn', suffix)],
			attrs[attrKey(prefix, 'spacingGapColumnUnit', suffix)],
			true
		);
		if (gapRowCss || gapColCss) {
			if (gapRowCss) style.rowGap = gapRowCss;
			if (gapColCss) style.columnGap = gapColCss;
		} else {
			var gapCss = getCssValue(
				attrs[attrKey(prefix, 'spacingGap', suffix)],
				attrs[attrKey(prefix, 'spacingGapUnit', suffix)],
				true
			);
			if (gapCss) style.gap = gapCss;
		}
	}

	/**
	 * 2つの style オブジェクトの差分を返す（changed のみ含む）
	 */
	function diffStyles(base, changed) {
		var diff = {};
		Object.keys(changed).forEach(function (key) {
			if (changed[key] !== base[key]) {
				diff[key] = changed[key];
			}
		});
		return diff;
	}

	// ── 背景画像 ──
	// PHP側の属性定義: block-background-image.php flavor_ext_background_image_register_attrs()

	function generateBackgroundImageAttributes() {
		var attrs = {};
		['', 'Tablet', 'Mobile'].forEach(function (device) {
			attrs['backgroundImageUrl' + device]      = { type: 'string', default: '' };
			attrs['backgroundImageId' + device]        = { type: 'number', default: 0 };
			attrs['backgroundImageSize' + device]      = { type: 'string', default: '' };
			attrs['backgroundImagePosition' + device]  = { type: 'string', default: '' };
			attrs['backgroundOverlayColor' + device]   = { type: 'string', default: '' };
			attrs['backgroundOverlayOpacity' + device] = { type: 'string', default: '' };
		});
		// PC のデフォルト値
		attrs.backgroundImageSize.default = 'cover';
		attrs.backgroundImagePosition.default = 'center';
		attrs.backgroundOverlayOpacity.default = '70';
		return attrs;
	}

	function renderBackgroundImageTab(device, attributes, setAttributes) {
		var MediaUpload = wp.blockEditor.MediaUpload;
		var ColorPalette = wp.components.ColorPalette;
		var suffix = getAttrSuffix(device);

		var url = attributes['backgroundImageUrl' + suffix] || '';
		var imageId = attributes['backgroundImageId' + suffix] || 0;
		var size = attributes['backgroundImageSize' + suffix] || '';
		var position = attributes['backgroundImagePosition' + suffix] || '';
		var overlayColor = attributes['backgroundOverlayColor' + suffix] || '';
		var overlayOpacity = attributes['backgroundOverlayOpacity' + suffix];
		if (overlayOpacity === undefined || overlayOpacity === null) overlayOpacity = '';

		// PC以外のデバイスはPC値をプレースホルダ表示
		var pcUrl = attributes.backgroundImageUrl || '';

		var children = [];

		// MediaUpload — 画像選択/変更ボタン（PCタブのみ、またはデバイス固有画像設定時）
		if (suffix === '' || url) {
			children.push(
				el(MediaUpload, {
					key: 'media-upload',
					onSelect: function (media) {
						var update = {};
						update['backgroundImageUrl' + suffix] = media.sizes && media.sizes.large ? media.sizes.large.url : media.url;
						update['backgroundImageId' + suffix] = media.id;
						setAttributes(update);
					},
					allowedTypes: ['image'],
					value: imageId,
					render: function (obj) {
						var displayUrl = url || pcUrl;
						if (displayUrl) {
							return el(Fragment, null,
								el('img', {
									src: displayUrl,
									style: {
										width: '100%',
										height: 'auto',
										borderRadius: '4px',
										marginBottom: '8px',
										display: 'block',
										opacity: url ? 1 : 0.5
									}
								}),
								el('div', { style: { display: 'flex', gap: '8px', marginBottom: '12px' } },
									el(Button, {
										variant: 'secondary',
										size: 'small',
										onClick: obj.open
									}, suffix === '' ? '画像を変更' : 'デバイス固有画像を設定'),
									url ? el(Button, {
										variant: 'tertiary',
										size: 'small',
										isDestructive: true,
										onClick: function () {
											var update = {};
											update['backgroundImageUrl' + suffix] = '';
											update['backgroundImageId' + suffix] = 0;
											setAttributes(update);
										}
									}, '削除') : null
								)
							);
						}
						return el(Button, {
							variant: 'secondary',
							onClick: obj.open,
							style: { marginBottom: '12px' }
						}, '背景画像を選択');
					}
				})
			);
		} else if (pcUrl) {
			// PC画像が設定済みで、このデバイスでは未設定
			children.push(
				el('p', {
					key: 'inherit-note',
					style: { fontSize: '12px', color: '#757575', marginBottom: '8px' }
				}, 'PC設定を継承中')
			);
		}

		var displayUrl = url || pcUrl;
		if (displayUrl) {
			// 表示サイズ
			children.push(
				el(SelectControl, {
					key: 'bg-size',
					label: '表示サイズ',
					value: size,
					options: [
						{ label: suffix === '' ? 'cover（全体を覆う）' : '継承', value: '' },
						{ label: 'cover', value: 'cover' },
						{ label: 'contain', value: 'contain' },
						{ label: 'auto', value: 'auto' }
					].filter(function (o) { return suffix !== '' || o.value !== ''; }),
					onChange: function (v) {
						var update = {};
						update['backgroundImageSize' + suffix] = v;
						setAttributes(update);
					},
					__nextHasNoMarginBottom: true
				})
			);

			// 表示位置
			children.push(
				el(SelectControl, {
					key: 'bg-position',
					label: '表示位置',
					value: position,
					options: [
						{ label: suffix === '' ? 'center' : '継承', value: '' },
						{ label: '中央', value: 'center' },
						{ label: '上', value: 'top' },
						{ label: '下', value: 'bottom' },
						{ label: '左', value: 'left' },
						{ label: '右', value: 'right' },
						{ label: '左上', value: 'left top' },
						{ label: '右上', value: 'right top' },
						{ label: '左下', value: 'left bottom' },
						{ label: '右下', value: 'right bottom' }
					].filter(function (o) { return suffix !== '' || o.value !== ''; }),
					onChange: function (v) {
						var update = {};
						update['backgroundImagePosition' + suffix] = v;
						setAttributes(update);
					},
					__nextHasNoMarginBottom: true
				})
			);

			// 区切り線 + オーバーレイラベル
			children.push(
				el('div', {
					key: 'overlay-separator',
					style: sectionLabelStyle
				}, 'オーバーレイ')
			);

			// オーバーレイ色
			children.push(
				el('div', { key: 'overlay-color', style: { marginBottom: '12px' } },
					el(ColorPalette, {
						value: overlayColor,
						onChange: function (color) {
							var update = {};
							update['backgroundOverlayColor' + suffix] = color || '';
							setAttributes(update);
						},
						clearable: true
					})
				)
			);

			// 不透明度
			if (overlayColor || attributes.backgroundOverlayColor) {
				children.push(
					el(RangeControl, {
						key: 'overlay-opacity',
						label: '不透明度',
						value: overlayOpacity !== '' ? parseInt(overlayOpacity, 10) : (suffix === '' ? 70 : ''),
						onChange: function (v) {
							var update = {};
							update['backgroundOverlayOpacity' + suffix] = v !== undefined ? String(v) : '';
							setAttributes(update);
						},
						min: 0,
						max: 100,
						step: 1,
						__nextHasNoMarginBottom: true
					})
				);
			}
		}

		return el(Fragment, null, children);
	}

	// ── 公開 ──

	window.flavorBlockCommon = {
		// 定数
		SPACING_PRESETS: SPACING_PRESETS,
		UNIT_OPTIONS: UNIT_OPTIONS,
		SIZE_UNIT_OPTIONS: SIZE_UNIT_OPTIONS,
		SIZE_KEYWORDS: SIZE_KEYWORDS,
		ASPECT_RATIO_OPTIONS: ASPECT_RATIO_OPTIONS,
		OVERFLOW_OPTIONS: OVERFLOW_OPTIONS,
		SHADOW_PRESETS: SHADOW_PRESETS,
		TEXT_SHADOW_PRESETS: TEXT_SHADOW_PRESETS,
		BACKDROP_FILTER_PRESETS: BACKDROP_FILTER_PRESETS,
		BORDER_STYLE_OPTIONS: BORDER_STYLE_OPTIONS,
		BORDER_RADIUS_UNIT_OPTIONS: BORDER_RADIUS_UNIT_OPTIONS,
		FLEX_SHORTHAND_OPTIONS: FLEX_SHORTHAND_OPTIONS,
		SPACING_KEYWORDS: SPACING_KEYWORDS,
		BREAKPOINTS: BREAKPOINTS,
		hintStyle: hintStyle,
		sectionLabelStyle: sectionLabelStyle,
		tabTitles: tabTitles,

		// ヘルパー関数
		isSizeKeyword: isSizeKeyword,
		isSpacingKeyword: isSpacingKeyword,
		getRemValue: getRemValue,
		getPresetFromIndex: getPresetFromIndex,
		getIndexFromPreset: getIndexFromPreset,
		getCssValue: getCssValue,
		getPresetCssHint: getPresetCssHint,
		getShadowCssValue: getShadowCssValue,
		getTextShadowCssValue: getTextShadowCssValue,
		getBackdropFilterCssValue: getBackdropFilterCssValue,
		hexToRgba: hexToRgba,
		getAttrSuffix: getAttrSuffix,
		attrKey: attrKey,

		// UIコンポーネント
		createSizeInput: createSizeInput,
		createAspectRatioControl: createAspectRatioControl,
		createOverflowControl: createOverflowControl,
		createSingleSpacingControl: createSingleSpacingControl,
		createBoxSpacingControl: createBoxSpacingControl,

		// タブレンダー関数
		renderSizeTab: renderSizeTab,
		renderFlexTab: renderFlexTab,
		renderLayoutTab: renderLayoutTab,
		renderMarginTab: renderMarginTab,
		renderSpacingTab: renderSpacingTab,
		renderShadowTab: renderShadowTab,
		renderBorderRadiusTab: renderBorderRadiusTab,
		renderBorderTab: renderBorderTab,
		renderBackdropFilterTab: renderBackdropFilterTab,
		renderOpacityTab: renderOpacityTab,
		renderPositionTab: renderPositionTab,

		// 属性定義ジェネレータ
		generatePositionAttributes: generatePositionAttributes,
		generateSizeAttributes: generateSizeAttributes,
		generateFlexAttributes: generateFlexAttributes,
		generateSpacingAttributes: generateSpacingAttributes,
		generateMarginAttributes: generateMarginAttributes,
		generateLayoutAttributes: generateLayoutAttributes,
		generateStyleAttributes: generateStyleAttributes,
		generateShadowAttributes: generateShadowAttributes,
		generateBorderRadiusAttributes: generateBorderRadiusAttributes,
		generateBorderAttributes: generateBorderAttributes,
		generateBackdropFilterAttributes: generateBackdropFilterAttributes,
		generateOpacityAttributes: generateOpacityAttributes,
		generateBackgroundImageAttributes: generateBackgroundImageAttributes,

		// 背景画像タブ
		renderBackgroundImageTab: renderBackgroundImageTab,

		// プレビュースタイル
		getPreviewStyles: getPreviewStyles,
		remapAttrsForDevice: remapAttrsForDevice,
		styleObjectToCss: styleObjectToCss,
		generatePreviewCss: generatePreviewCss,
		generateResponsiveOverrideCss: generateResponsiveOverrideCss,
		addGapToStyle: addGapToStyle,
		diffStyles: diffStyles
	};

})();
