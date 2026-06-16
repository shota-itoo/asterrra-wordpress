/**
 * Responsive Text Align Extension（エディタUI）
 * core/paragraph・core/heading に Tablet / Mobile 時の text-align 切替を追加する。
 *
 * PC は core 標準のツールバー（左/中央/右）をそのまま使い、
 * 本拡張はインスペクターに「レスポンシブ文字揃え (TB/SP)」パネルを足す。
 * heading-responsive-font.js と同じ IIFE / no-build パターン。
 */
(function (wp) {
    const { addFilter } = wp.hooks;
    const { createHigherOrderComponent } = wp.compose;
    const { Fragment, createElement } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, SelectControl } = wp.components;
    const { __ } = wp.i18n;

    const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph'];

    // ブレークポイント（PHP側 @media と一致させる）
    const BREAKPOINTS = { tablet: 959, mobile: 599 };

    const ALIGN_OPTIONS = [
        { value: '', label: __('継承（PCの設定のまま）', 'swell_child') },
        { value: 'left', label: __('左揃え', 'swell_child') },
        { value: 'center', label: __('中央揃え', 'swell_child') },
        { value: 'right', label: __('右揃え', 'swell_child') },
        { value: 'justify', label: __('両端揃え', 'swell_child') }
    ];

    /**
     * 属性を追加
     */
    function addAttributes(settings, name) {
        if (!ALLOWED_BLOCKS.includes(name)) {
            return settings;
        }
        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                tabletTextAlign: { type: 'string', default: '' },
                mobileTextAlign: { type: 'string', default: '' }
            }
        };
    }

    addFilter(
        'blocks.registerBlockType',
        'swell-child/responsive-text-align/attributes',
        addAttributes
    );

    /**
     * インスペクターに「レスポンシブ文字揃え (TB/SP)」パネルを追加
     */
    const withControls = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            if (!ALLOWED_BLOCKS.includes(props.name)) {
                return createElement(BlockEdit, props);
            }
            const { attributes, setAttributes } = props;

            return createElement(
                Fragment,
                null,
                createElement(BlockEdit, props),
                createElement(
                    InspectorControls,
                    null,
                    createElement(
                        PanelBody,
                        { title: __('レスポンシブ文字揃え (TB/SP)', 'swell_child'), initialOpen: false },
                        createElement(SelectControl, {
                            label: __('タブレット (959px以下)', 'swell_child'),
                            value: attributes.tabletTextAlign || '',
                            options: ALIGN_OPTIONS,
                            onChange: (v) => setAttributes({ tabletTextAlign: v }),
                            __nextHasNoMarginBottom: true
                        }),
                        createElement('div', { style: { height: '16px' } }),
                        createElement(SelectControl, {
                            label: __('モバイル (599px以下)', 'swell_child'),
                            value: attributes.mobileTextAlign || '',
                            options: ALIGN_OPTIONS,
                            onChange: (v) => setAttributes({ mobileTextAlign: v }),
                            __nextHasNoMarginBottom: true
                        })
                    )
                )
            );
        };
    }, 'withResponsiveTextAlignControls');

    addFilter(
        'editor.BlockEdit',
        'swell-child/responsive-text-align/controls',
        withControls
    );

    /**
     * 保存時にマーカークラスを付与（一貫性のため。CSSはPHPが独自クラスで注入）
     */
    function addSaveClass(extraProps, blockType, attributes) {
        if (!ALLOWED_BLOCKS.includes(blockType.name)) {
            return extraProps;
        }
        if (attributes.tabletTextAlign || attributes.mobileTextAlign) {
            extraProps.className = `${extraProps.className || ''} has-responsive-text-align`.trim();
        }
        return extraProps;
    }

    addFilter(
        'blocks.getSaveContent.extraProps',
        'swell-child/responsive-text-align/save',
        addSaveClass
    );

    /**
     * エディタプレビュー: Tablet/Mobile プレビューモードのとき
     * レスポンシブ text-align を <style>（media query付き）で反映
     */
    const withPreview = createHigherOrderComponent(function (BlockListBlock) {
        return function (props) {
            if (!ALLOWED_BLOCKS.includes(props.name)) {
                return createElement(BlockListBlock, props);
            }
            const a = props.attributes;
            const t = a.tabletTextAlign;
            const m = a.mobileTextAlign;
            if (!t && !m) {
                return createElement(BlockListBlock, props);
            }

            const uid = 'rsp-talign-prev-' + props.clientId.substring(0, 8);
            const sel = '.' + uid + '.' + uid + '.' + uid;
            let css = '';
            if (t) {
                css += '@media(max-width:' + BREAKPOINTS.tablet + 'px){' + sel + '{text-align:' + t + ' !important;}}\n';
            }
            if (m) {
                css += '@media(max-width:' + BREAKPOINTS.mobile + 'px){' + sel + '{text-align:' + m + ' !important;}}\n';
            }

            const wrapperProps = Object.assign({}, props.wrapperProps || {});
            wrapperProps.className = ((wrapperProps.className || '') + ' ' + uid).trim();

            return createElement(
                Fragment,
                null,
                createElement('style', null, css),
                createElement(BlockListBlock, Object.assign({}, props, { wrapperProps: wrapperProps }))
            );
        };
    }, 'withResponsiveTextAlignPreview');

    addFilter(
        'editor.BlockListBlock',
        'swell-child/responsive-text-align/editor-preview',
        withPreview
    );

})(window.wp);
