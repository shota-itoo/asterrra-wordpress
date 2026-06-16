/**
 * Text Block Font Family Extension
 * テキスト系ブロックにフォントファミリー設定を追加
 */
(function (wp) {
    const { addFilter } = wp.hooks;
    const { createHigherOrderComponent } = wp.compose;
    const { Fragment, createElement, useState } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const {
        __experimentalToolsPanel: ToolsPanel,
        __experimentalToolsPanelItem: ToolsPanelItem,
        SelectControl,
        TextControl,
        Button,
        BaseControl
    } = wp.components;
    const { __ } = wp.i18n;

    // 対象ブロック
    const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list', 'core/quote'];

    // PHPから渡されたプリセット情報を取得
    const RAW_PRESETS = window.flavorFlavorFontPresets || [];

    // プリセットをカテゴリ分け
    const JAPANESE_FONTS = [
        'noto-sans-jp', 'noto-serif-jp', 'yu-gothic', 'yu-mincho',
        'hiragino-kaku', 'hiragino-mincho', 'meiryo',
        'biz-ud-gothic', 'biz-ud-mincho', 'm-plus-1p', 'm-plus-rounded',
        'zen-kaku-gothic', 'zen-old-mincho', 'kosugi-maru',
        'sawarabi-mincho', 'sawarabi-gothic'
    ];

    // 日本語ラベルマッピング
    const FONT_LABELS = {
        'noto-sans-jp': 'Noto Sans JP',
        'noto-serif-jp': 'Noto Serif JP',
        'yu-gothic': '游ゴシック',
        'yu-mincho': '游明朝',
        'hiragino-kaku': 'ヒラギノ角ゴ',
        'hiragino-mincho': 'ヒラギノ明朝',
        'meiryo': 'メイリオ',
        'biz-ud-gothic': 'BIZ UDゴシック',
        'biz-ud-mincho': 'BIZ UD明朝',
        'm-plus-1p': 'M PLUS 1p',
        'm-plus-rounded': 'M PLUS Rounded 1c',
        'zen-kaku-gothic': 'Zen Kaku Gothic New',
        'zen-old-mincho': 'Zen Old Mincho',
        'kosugi-maru': 'Kosugi Maru',
        'sawarabi-mincho': 'さわらび明朝',
        'sawarabi-gothic': 'さわらびゴシック',
        'roboto': 'Roboto',
        'open-sans': 'Open Sans',
        'montserrat': 'Montserrat',
        'lato': 'Lato',
        'poppins': 'Poppins',
        'playfair-display': 'Playfair Display',
        'georgia': 'Georgia'
    };

    // SelectControl用オプション生成
    function buildFontOptions() {
        const options = [
            { label: 'デフォルト', value: '' }
        ];

        // 日本語フォント
        const japaneseOptions = RAW_PRESETS
            .filter(p => JAPANESE_FONTS.includes(p.label))
            .map(p => ({
                label: FONT_LABELS[p.label] || p.label,
                value: p.value
            }));

        // 欧文フォント
        const westernOptions = RAW_PRESETS
            .filter(p => !JAPANESE_FONTS.includes(p.label))
            .map(p => ({
                label: FONT_LABELS[p.label] || p.label,
                value: p.value
            }));

        if (japaneseOptions.length > 0) {
            options.push({ label: '--- 日本語フォント ---', value: '', disabled: true });
            options.push(...japaneseOptions);
        }

        if (westernOptions.length > 0) {
            options.push({ label: '--- 欧文フォント ---', value: '', disabled: true });
            options.push(...westernOptions);
        }

        return options;
    }

    const FONT_OPTIONS = buildFontOptions();

    // プリセット値からCSS値を取得
    function getFontFamilyCss(value) {
        if (!value) return '';

        if (value.startsWith('custom:')) {
            return value.substring(7);
        }

        if (value.startsWith('preset:')) {
            const preset = RAW_PRESETS.find(p => p.value === value);
            return preset ? preset.css : '';
        }

        return '';
    }

    /**
     * カスタム属性を追加
     */
    function addFontFamilyAttributes(settings, name) {
        if (!ALLOWED_BLOCKS.includes(name)) {
            return settings;
        }

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                customFontFamily: {
                    type: 'string',
                    default: ''
                }
            }
        };
    }

    addFilter(
        'blocks.registerBlockType',
        'swell-child/text-font-family/attributes',
        addFontFamilyAttributes
    );

    /**
     * FontFamilyControl コンポーネント
     */
    const FontFamilyControl = ({ value, onChange }) => {
        // カスタムモードかどうか
        const isCustomMode = value && value.startsWith('custom:');
        const [showCustomInput, setShowCustomInput] = useState(isCustomMode);

        // 現在の値
        const presetValue = !isCustomMode ? value : '';
        const customValue = isCustomMode ? value.substring(7) : '';

        // プレビュー用CSS
        const previewFontCss = getFontFamilyCss(value);

        return createElement(
            'div',
            { className: 'flavor-flavor-font-family-control' },

            // プリセット選択（非カスタムモード時）
            !showCustomInput && createElement(SelectControl, {
                value: presetValue,
                options: FONT_OPTIONS,
                onChange: (newValue) => onChange(newValue),
                __nextHasNoMarginBottom: true
            }),

            // カスタム入力欄（カスタムモード時）
            showCustomInput && createElement(TextControl, {
                value: customValue,
                onChange: (newValue) => onChange(newValue ? `custom:${newValue}` : ''),
                placeholder: '"游ゴシック", sans-serif',
                help: 'CSSのfont-family値を入力',
                __nextHasNoMarginBottom: true
            }),

            // モード切替ボタン
            createElement(
                Button,
                {
                    isSmall: true,
                    variant: 'tertiary',
                    onClick: () => {
                        if (showCustomInput) {
                            // カスタム → プリセットに切替
                            setShowCustomInput(false);
                            onChange('');
                        } else {
                            // プリセット → カスタムに切替
                            setShowCustomInput(true);
                            onChange('');
                        }
                    },
                    style: { marginTop: '8px' }
                },
                showCustomInput ? 'プリセットから選択' : 'カスタム入力'
            ),

            // プレビュー表示（値がある場合のみ）
            value && previewFontCss && createElement(
                'div',
                {
                    style: {
                        marginTop: '12px',
                        padding: '12px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        fontFamily: previewFontCss
                    }
                },
                createElement('span', { style: { fontSize: '14px' } }, 'あいうえおABCabc123')
            )
        );
    };

    /**
     * インスペクターコントロールを追加
     */
    const withFontFamilyControls = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            if (!ALLOWED_BLOCKS.includes(props.name)) {
                return createElement(BlockEdit, props);
            }

            const { attributes, setAttributes } = props;
            const { customFontFamily } = attributes;

            return createElement(
                Fragment,
                null,
                createElement(BlockEdit, props),
                // タイポグラフィパネル内に項目として追加
                createElement(
                    InspectorControls,
                    { group: 'typography' },
                    createElement(
                        ToolsPanelItem,
                        {
                            hasValue: () => !!customFontFamily,
                            label: 'フォント',
                            onDeselect: () => setAttributes({ customFontFamily: '' }),
                            isShownByDefault: false,
                            panelId: props.clientId
                        },
                        createElement(FontFamilyControl, {
                            value: customFontFamily,
                            onChange: (newValue) => setAttributes({ customFontFamily: newValue })
                        })
                    )
                )
            );
        };
    }, 'withFontFamilyControls');

    addFilter(
        'editor.BlockEdit',
        'swell-child/text-font-family/controls',
        withFontFamilyControls
    );

    /**
     * 保存時にクラスを追加
     */
    function addFontFamilySaveProps(extraProps, blockType, attributes) {
        if (!ALLOWED_BLOCKS.includes(blockType.name)) {
            return extraProps;
        }

        const { customFontFamily } = attributes;

        if (customFontFamily) {
            extraProps.className = `${extraProps.className || ''} has-custom-font-family`.trim();
        }

        return extraProps;
    }

    addFilter(
        'blocks.getSaveContent.extraProps',
        'swell-child/text-font-family/save-props',
        addFontFamilySaveProps
    );

    /**
     * エディタ上でもフォントを適用
     */
    const withEditorFontStyle = createHigherOrderComponent((BlockListBlock) => {
        return (props) => {
            if (!ALLOWED_BLOCKS.includes(props.name)) {
                return createElement(BlockListBlock, props);
            }

            const { customFontFamily } = props.attributes;

            if (!customFontFamily) {
                return createElement(BlockListBlock, props);
            }

            const fontCss = getFontFamilyCss(customFontFamily);

            if (!fontCss) {
                return createElement(BlockListBlock, props);
            }

            // wrapperPropsでスタイルを追加
            const wrapperProps = {
                ...props.wrapperProps,
                style: {
                    ...(props.wrapperProps?.style || {}),
                    fontFamily: fontCss
                }
            };

            return createElement(BlockListBlock, {
                ...props,
                wrapperProps
            });
        };
    }, 'withEditorFontStyle');

    addFilter(
        'editor.BlockListBlock',
        'swell-child/text-font-family/editor-style',
        withEditorFontStyle
    );

})(window.wp);
