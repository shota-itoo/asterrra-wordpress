(function (wp) {
    'use strict';
    var addFilter = wp.hooks.addFilter;
    var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
    var Fragment = wp.element.Fragment;
    var createElement = wp.element.createElement;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var Button = wp.components.Button;
    var ButtonGroup = wp.components.ButtonGroup;
    var useSelect = (wp.data && wp.data.useSelect) || function () { return 'Desktop'; };

    // 現在のエディタ プレビューデバイス（Desktop / Tablet / Mobile）を取得（WP版差を吸収）
    function getPreviewDevice(select) {
        var ed = select('core/editor');
        if (ed && typeof ed.getDeviceType === 'function') return ed.getDeviceType();
        var ep = select('core/edit-post');
        if (ep && typeof ep.__experimentalGetPreviewDeviceType === 'function') return ep.__experimentalGetPreviewDeviceType();
        var es = select('core/edit-site');
        if (es && typeof es.__experimentalGetPreviewDeviceType === 'function') return es.__experimentalGetPreviewDeviceType();
        return 'Desktop';
    }

    // 「表示するデバイス」配列と現在のプレビューデバイスから、今のプレビューで隠すべきか判定
    function isHiddenOnDevice(visibility, device) {
        if (!visibility || visibility.length === 0) return false;
        if (device === 'Desktop') return visibility.indexOf('pc') === -1;
        if (device === 'Tablet') return visibility.indexOf('tablet') === -1;
        if (device === 'Mobile') return visibility.indexOf('sp') === -1;
        return false;
    }

    // 対象ブロック（PHPから渡される）
    var ALLOWED_BLOCKS = window.flavorDeviceVisibilityBlocks || ['flavor/universal-block'];

    var DEVICE_OPTIONS = [
        { value: 'pc', label: 'PC' },
        { value: 'tablet', label: 'TB' },
        { value: 'sp', label: 'SP' }
    ];

    // ① blocks.registerBlockType — 属性追加
    addFilter('blocks.registerBlockType', 'flavor/device-visibility/attributes', function (settings, name) {
        if (ALLOWED_BLOCKS.indexOf(name) === -1) return settings;
        settings.attributes = Object.assign({}, settings.attributes, {
            deviceVisibility: { type: 'array', default: [] }
        });
        return settings;
    });

    // ② editor.BlockEdit — InspectorControls追加
    var withDeviceVisibility = createHigherOrderComponent(function (BlockEdit) {
        return function (props) {
            if (ALLOWED_BLOCKS.indexOf(props.name) === -1) {
                return createElement(BlockEdit, props);
            }
            var visibility = props.attributes.deviceVisibility || [];
            var setAttributes = props.setAttributes;

            return createElement(
                Fragment, null,
                createElement(BlockEdit, props),
                createElement(
                    InspectorControls, null,
                    createElement(PanelBody, { title: '表示切替', initialOpen: false },
                        createElement('p', {
                            style: { fontSize: '12px', color: '#757575', marginBottom: '8px' }
                        }, '表示するデバイスを選択してください。未選択の場合は全デバイスで表示されます。'),
                        createElement(ButtonGroup, null,
                            DEVICE_OPTIONS.map(function (opt) {
                                var isActive = visibility.indexOf(opt.value) !== -1;
                                return createElement(Button, {
                                    key: opt.value,
                                    isPressed: isActive,
                                    onClick: function () {
                                        var newVal = isActive
                                            ? visibility.filter(function (d) { return d !== opt.value; })
                                            : visibility.concat([opt.value]);
                                        setAttributes({ deviceVisibility: newVal });
                                    },
                                    size: 'compact'
                                }, opt.label);
                            })
                        ),
                        createElement('p', {
                            style: { fontSize: '11px', color: '#949494', marginTop: '8px', fontFamily: 'monospace' }
                        }, visibility.length === 0
                            ? '全デバイスで表示'
                            : visibility.join(' + ').toUpperCase() + ' のみ表示'
                        )
                    )
                )
            );
        };
    }, 'withDeviceVisibility');
    addFilter('editor.BlockEdit', 'flavor/device-visibility/controls', withDeviceVisibility);

    // ③ blocks.getSaveContent.extraProps — 保存時にhideクラス追加
    addFilter('blocks.getSaveContent.extraProps', 'flavor/device-visibility/save-props', function (extraProps, blockType, attributes) {
        if (ALLOWED_BLOCKS.indexOf(blockType.name) === -1) return extraProps;
        var visibility = attributes.deviceVisibility || [];
        if (visibility.length === 0) return extraProps;

        var hideClasses = [];
        if (visibility.indexOf('pc') === -1) hideClasses.push('has-device-hide-pc');
        if (visibility.indexOf('tablet') === -1) hideClasses.push('has-device-hide-tablet');
        if (visibility.indexOf('sp') === -1) hideClasses.push('has-device-hide-sp');

        if (hideClasses.length > 0) {
            extraProps.className = ((extraProps.className || '') + ' ' + hideClasses.join(' ')).trim();
        }
        return extraProps;
    });

    // ④ editor.BlockListBlock — エディタ上でクラス反映＋現在のプレビューデバイスに連動して非表示
    var withEditorVisibilityClass = createHigherOrderComponent(function (BlockListBlock) {
        return function (props) {
            if (ALLOWED_BLOCKS.indexOf(props.name) === -1) {
                return createElement(BlockListBlock, props);
            }
            var visibility = props.attributes.deviceVisibility || [];
            // 現在のプレビューデバイスを購読（切替で再描画される）
            var device = useSelect(function (select) { return getPreviewDevice(select); }, []);

            if (visibility.length === 0) {
                return createElement(BlockListBlock, props);
            }
            var hideClasses = [];
            if (visibility.indexOf('pc') === -1) hideClasses.push('has-device-hide-pc');
            if (visibility.indexOf('tablet') === -1) hideClasses.push('has-device-hide-tablet');
            if (visibility.indexOf('sp') === -1) hideClasses.push('has-device-hide-sp');

            var wrapperProps = Object.assign({}, props.wrapperProps || {});
            wrapperProps.className = ((wrapperProps.className || '') + ' ' + hideClasses.join(' ')).trim();

            // 現在のプレビューデバイスで非表示対象なら、エディタ上でも隠してフロントと一致させる
            if (isHiddenOnDevice(visibility, device)) {
                wrapperProps.style = Object.assign({}, wrapperProps.style || {}, { display: 'none' });
            }
            return createElement(BlockListBlock, Object.assign({}, props, { wrapperProps: wrapperProps }));
        };
    }, 'withEditorVisibilityClass');
    addFilter('editor.BlockListBlock', 'flavor/device-visibility/editor-classes', withEditorVisibilityClass);

})(window.wp);
