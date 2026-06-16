/**
 * Heading Block Responsive Font Size Extension
 * 見出しブロックにタブレット・モバイル時のフォントサイズ設定を追加
 */
(function (wp) {
    const { addFilter } = wp.hooks;
    const { createHigherOrderComponent } = wp.compose;
    const { Fragment, createElement, useState } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const {
        __experimentalToolsPanel: ToolsPanel,
        __experimentalToolsPanelItem: ToolsPanelItem,
        __experimentalUnitControl: UnitControl,
        TextControl,
        Button,
        ButtonGroup,
        Flex,
        FlexItem
    } = wp.components;
    const { __ } = wp.i18n;

    // 対象ブロック
    const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph'];

    /**
     * カスタム属性を追加
     */
    function addResponsiveFontAttributes(settings, name) {
        if (!ALLOWED_BLOCKS.includes(name)) {
            return settings;
        }

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                // タブレット時のフォントサイズ
                tabletFontSize: {
                    type: 'string',
                    default: ''
                },
                tabletFontSizeUnit: {
                    type: 'string',
                    default: 'em'
                },
                // モバイル時のフォントサイズ
                mobileFontSize: {
                    type: 'string',
                    default: ''
                },
                mobileFontSizeUnit: {
                    type: 'string',
                    default: 'em'
                }
            }
        };
    }

    addFilter(
        'blocks.registerBlockType',
        'swell-child/heading-responsive-font/attributes',
        addResponsiveFontAttributes
    );

    // 単位オプション（UnitControl用）
    const UNITS = [
        { value: 'px', label: 'px' },
        { value: 'em', label: 'em' },
        { value: 'rem', label: 'rem' },
        { value: 'vw', label: 'vw' },
        { value: '%', label: '%' }
    ];

    /**
     * インスペクターコントロールを追加
     */
    const withResponsiveFontControls = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            if (!ALLOWED_BLOCKS.includes(props.name)) {
                return createElement(BlockEdit, props);
            }

            const { attributes, setAttributes } = props;
            const {
                tabletFontSize,
                tabletFontSizeUnit,
                mobileFontSize,
                mobileFontSizeUnit
            } = attributes;

            // タブレット値を結合（例: "1.5em"）
            const tabletValue = tabletFontSize ? `${tabletFontSize}${tabletFontSizeUnit || 'em'}` : undefined;
            // モバイル値を結合
            const mobileValue = mobileFontSize ? `${mobileFontSize}${mobileFontSizeUnit || 'em'}` : undefined;

            return createElement(
                Fragment,
                null,
                createElement(BlockEdit, props),
                // タイポグラフィパネル内に項目として追加
                createElement(
                    InspectorControls,
                    { group: 'typography' },
                    // タブレット用フォントサイズ
                    createElement(
                        ToolsPanelItem,
                        {
                            hasValue: () => !!tabletFontSize,
                            label: __('タブレット時サイズ', 'swell_child'),
                            onDeselect: () => setAttributes({ tabletFontSize: '', tabletFontSizeUnit: 'em' }),
                            isShownByDefault: false,
                            panelId: props.clientId
                        },
                        createElement(UnitControl, {
                            label: __('タブレット (959px以下)', 'swell_child'),
                            value: tabletValue,
                            units: UNITS,
                            onChange: (newValue) => {
                                if (!newValue) {
                                    setAttributes({ tabletFontSize: '', tabletFontSizeUnit: 'em' });
                                    return;
                                }
                                // 値と単位を分離
                                const match = newValue.match(/^([\d.]+)(.*)$/);
                                if (match) {
                                    setAttributes({
                                        tabletFontSize: match[1],
                                        tabletFontSizeUnit: match[2] || 'em'
                                    });
                                }
                            },
                            __nextHasNoMarginBottom: true
                        })
                    ),
                    // モバイル用フォントサイズ
                    createElement(
                        ToolsPanelItem,
                        {
                            hasValue: () => !!mobileFontSize,
                            label: __('モバイル時サイズ', 'swell_child'),
                            onDeselect: () => setAttributes({ mobileFontSize: '', mobileFontSizeUnit: 'em' }),
                            isShownByDefault: false,
                            panelId: props.clientId
                        },
                        createElement(UnitControl, {
                            label: __('モバイル (599px以下)', 'swell_child'),
                            value: mobileValue,
                            units: UNITS,
                            onChange: (newValue) => {
                                if (!newValue) {
                                    setAttributes({ mobileFontSize: '', mobileFontSizeUnit: 'em' });
                                    return;
                                }
                                // 値と単位を分離
                                const match = newValue.match(/^([\d.]+)(.*)$/);
                                if (match) {
                                    setAttributes({
                                        mobileFontSize: match[1],
                                        mobileFontSizeUnit: match[2] || 'em'
                                    });
                                }
                            },
                            __nextHasNoMarginBottom: true
                        })
                    )
                )
            );
        };
    }, 'withResponsiveFontControls');

    addFilter(
        'editor.BlockEdit',
        'swell-child/heading-responsive-font/controls',
        withResponsiveFontControls
    );

    /**
     * 保存時にdata属性を追加（PHPでCSS生成に使用）
     */
    function addResponsiveFontDataAttributes(extraProps, blockType, attributes) {
        if (!ALLOWED_BLOCKS.includes(blockType.name)) {
            return extraProps;
        }

        const {
            tabletFontSize,
            tabletFontSizeUnit,
            mobileFontSize,
            mobileFontSizeUnit
        } = attributes;

        // レスポンシブフォント設定がある場合、クラスを追加
        if (tabletFontSize || mobileFontSize) {
            extraProps.className = `${extraProps.className || ''} has-responsive-font`.trim();
        }

        return extraProps;
    }

    addFilter(
        'blocks.getSaveContent.extraProps',
        'swell-child/heading-responsive-font/save-attributes',
        addResponsiveFontDataAttributes
    );

    /**
     * エディタプレビュー: Tablet/Mobileプレビューモードで
     * レスポンシブフォントサイズを <style> タグ（media query付き）で反映
     */
    // block-custom-common.js は enqueue 優先度9で先に読み込まれるためフォールバック不要
    var BREAKPOINTS = window.flavorBlockCommon.BREAKPOINTS;

    var withResponsiveFontPreview = createHigherOrderComponent(function (BlockListBlock) {
        return function (props) {
            if (!ALLOWED_BLOCKS.includes(props.name)) {
                return createElement(BlockListBlock, props);
            }

            var attrs = props.attributes;
            var tabletFs = attrs.tabletFontSize;
            var tabletFsUnit = attrs.tabletFontSizeUnit || 'em';
            var mobileFs = attrs.mobileFontSize;
            var mobileFsUnit = attrs.mobileFontSizeUnit || 'em';

            if (!tabletFs && !mobileFs) {
                return createElement(BlockListBlock, props);
            }

            var uid = 'rsp-font-prev-' + props.clientId.substring(0, 8);
            var sel = '.' + uid + '.' + uid + '.' + uid + '.' + uid;
            var css = '';
            if (tabletFs) {
                css += '@media(max-width:' + BREAKPOINTS.tablet + 'px){' + sel + '{font-size:' + tabletFs + tabletFsUnit + ' !important;}}\n';
            }
            if (mobileFs) {
                css += '@media(max-width:' + BREAKPOINTS.mobile + 'px){' + sel + '{font-size:' + mobileFs + mobileFsUnit + ' !important;}}\n';
            }

            var wrapperProps = Object.assign({}, props.wrapperProps || {});
            wrapperProps.className = ((wrapperProps.className || '') + ' ' + uid).trim();

            return createElement(
                Fragment,
                null,
                createElement('style', null, css),
                createElement(BlockListBlock, Object.assign({}, props, { wrapperProps: wrapperProps }))
            );
        };
    }, 'withResponsiveFontPreview');

    addFilter(
        'editor.BlockListBlock',
        'swell-child/heading-responsive-font/editor-preview',
        withResponsiveFontPreview
    );

})(window.wp);
