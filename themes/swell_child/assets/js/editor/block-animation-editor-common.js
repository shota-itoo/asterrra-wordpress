/**
 * Block Animation Editor Common
 * アニメーション設定UIの共通ライブラリ
 * AnimationItem / AnimationRepeater を各ブロックから再利用可能にする
 */
(function () {
    'use strict';
    var createElement = wp.element.createElement;
    var useState = wp.element.useState;
    var Button = wp.components.Button;
    var SelectControl = wp.components.SelectControl;
    var RangeControl = wp.components.RangeControl;
    var ColorPalette = wp.components.ColorPalette;
    var ToggleControl = wp.components.ToggleControl;
    var TextControl = wp.components.TextControl;
    var __ = wp.i18n.__;

    // アニメーション設定オプション
    var ANIMATION_TRIGGER_OPTIONS = [
        { label: __('スクロール表示時', 'flavor-flavor'), value: 'scroll' },
        { label: __('ホバー時', 'flavor-flavor'), value: 'hover' },
        { label: __('ページ読み込み時', 'flavor-flavor'), value: 'load' },
        { label: __('クリック時', 'flavor-flavor'), value: 'click' }
    ];

    var ANIMATION_TRIGGER_LABELS = {
        scroll: 'スクロール',
        hover: 'ホバー',
        load: '読み込み',
        click: 'クリック'
    };

    var ANIMATION_TYPE_OPTIONS = [
        { label: __('なし', 'flavor-flavor'), value: 'none' },
        { label: __('フェード', 'flavor-flavor'), value: 'fade' },
        { label: __('スライド', 'flavor-flavor'), value: 'slide' },
        { label: __('ズーム', 'flavor-flavor'), value: 'zoom' },
        { label: __('回転', 'flavor-flavor'), value: 'rotate' },
        { label: __('バウンス', 'flavor-flavor'), value: 'bounce' },
        { label: __('シェイク', 'flavor-flavor'), value: 'shake' },
        { label: __('パルス', 'flavor-flavor'), value: 'pulse' },
        { label: __('フリップ', 'flavor-flavor'), value: 'flip' }
    ];

    var ANIMATION_TYPE_LABELS = {
        none: 'なし',
        fade: 'フェード',
        slide: 'スライド',
        zoom: 'ズーム',
        rotate: '回転',
        bounce: 'バウンス',
        shake: 'シェイク',
        pulse: 'パルス',
        flip: 'フリップ'
    };

    var ANIMATION_DIRECTION_OPTIONS = [
        { label: __('上から', 'flavor-flavor'), value: 'up' },
        { label: __('下から', 'flavor-flavor'), value: 'down' },
        { label: __('左から', 'flavor-flavor'), value: 'left' },
        { label: __('右から', 'flavor-flavor'), value: 'right' }
    ];

    var ANIMATION_EASING_OPTIONS = [
        { label: 'ease', value: 'ease' },
        { label: 'ease-in', value: 'ease-in' },
        { label: 'ease-out', value: 'ease-out' },
        { label: 'ease-in-out', value: 'ease-in-out' },
        { label: 'linear', value: 'linear' },
        { label: 'bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }
    ];

    /**
     * HEX色コードをRGBA形式に変換
     * @param {string} hex - HEX色コード（#RRGGBB形式）
     * @param {number} alpha - 透明度（0-1）
     * @returns {string} RGBA形式の色文字列
     */
    function hexToRgba(hex, alpha) {
        if (alpha === undefined) alpha = 1;
        if (!hex) return '';
        // 既にrgba形式の場合はそのまま返す
        if (hex.startsWith('rgba') || hex.startsWith('rgb')) {
            return hex;
        }
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return hex; // 変換できない場合はそのまま返す
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        if (alpha >= 1) {
            return hex; // 透明度が1の場合はHEXのまま返す
        }
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

    // デフォルトアニメーション設定
    var DEFAULT_ANIMATION = {
        id: '',
        trigger: 'scroll',
        type: 'fade',
        direction: 'up',
        duration: 500,
        delay: 0,
        easing: 'ease',
        distance: 50,
        scale: 0.9,
        rotation: 360,
        intensity: 5,
        scrollThreshold: 0.15,
        // 適用デバイス（未設定/空は全デバイス対象）
        devices: ['pc', 'tablet', 'sp'],
        // ホバースタイル設定
        hoverBackgroundColor: '',
        hoverBackgroundColorAlpha: 1,
        hoverColor: '',
        hoverBorderColor: '',
        hoverBorderColorAlpha: 1,
        hoverBorderWidth: '',
        // ホバーボックスシャドウ
        hoverBoxShadow: '',
        // ホバーオーバーレイ設定
        hoverShowOverlay: false,
        hoverOverlayColor: '#000000',
        hoverOverlayOpacity: 0.3
    };

    /**
     * アニメーション個別設定コンポーネント
     */
    var AnimationItem = function (props) {
        var animation = props.animation;
        var index = props.index;
        var total = props.total;
        var onUpdate = props.onUpdate;
        var onRemove = props.onRemove;
        var onMoveUp = props.onMoveUp;
        var onMoveDown = props.onMoveDown;

        var expandedState = useState(true);
        var isExpanded = expandedState[0];
        var setIsExpanded = expandedState[1];
        var advancedState = useState(false);
        var showAdvanced = advancedState[0];
        var setShowAdvanced = advancedState[1];

        // 方向設定が必要なアニメーション種類
        var needsDirection = animation.type === 'slide' || animation.type === 'flip';

        return createElement(
            'div',
            {
                className: 'flavor-flavor-animation-item',
                style: {
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    backgroundColor: '#fff'
                }
            },
            // ヘッダー
            createElement(
                'div',
                {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 12px',
                        borderBottom: isExpanded ? '1px solid #eee' : 'none',
                        cursor: 'pointer',
                        backgroundColor: '#f9f9f9'
                    },
                    onClick: function () { setIsExpanded(!isExpanded); }
                },
                createElement('span', { style: { marginRight: '8px', fontWeight: 'bold', color: '#666' } }, '#' + (index + 1)),
                createElement('span', { style: { flex: 1, fontSize: '12px' } },
                    (ANIMATION_TRIGGER_LABELS[animation.trigger] || animation.trigger) + ' / ' + (ANIMATION_TYPE_LABELS[animation.type] || animation.type)
                ),
                createElement(
                    'div',
                    { style: { display: 'flex', gap: '2px' }, onClick: function (e) { e.stopPropagation(); } },
                    index > 0 && createElement(Button, {
                        isSmall: true,
                        icon: 'arrow-up-alt2',
                        onClick: onMoveUp,
                        label: __('上へ移動', 'flavor-flavor')
                    }),
                    index < total - 1 && createElement(Button, {
                        isSmall: true,
                        icon: 'arrow-down-alt2',
                        onClick: onMoveDown,
                        label: __('下へ移動', 'flavor-flavor')
                    }),
                    createElement(Button, {
                        isSmall: true,
                        isDestructive: true,
                        icon: 'trash',
                        onClick: onRemove,
                        label: __('削除', 'flavor-flavor')
                    })
                )
            ),
            // 設定内容（展開時のみ）
            isExpanded && createElement(
                'div',
                { style: { padding: '12px' } },

                // トリガー選択
                createElement(SelectControl, {
                    label: __('トリガー', 'flavor-flavor'),
                    value: animation.trigger,
                    options: ANIMATION_TRIGGER_OPTIONS,
                    onChange: function (value) {
                        // ホバートリガーの場合はscaleを1.05に、それ以外は0.9に調整
                        var newScale = value === 'hover' ? 1.05 : 0.9;
                        onUpdate({ trigger: value, scale: newScale });
                    },
                    __nextHasNoMarginBottom: true
                }),

                // 適用デバイス（PC / TB / SP）
                createElement(
                    'div',
                    { style: { marginTop: '12px' } },
                    createElement('span', {
                        style: { display: 'block', fontSize: '11px', marginBottom: '4px', color: '#1e1e1e' }
                    }, __('適用デバイス', 'flavor-flavor')),
                    createElement(
                        'div',
                        { style: { display: 'flex', gap: '2px' } },
                        [['pc', 'PC'], ['tablet', 'TB'], ['sp', 'SP']].map(function (opt) {
                            var devs = Array.isArray(animation.devices) && animation.devices.length
                                ? animation.devices : ['pc', 'tablet', 'sp'];
                            var active = devs.indexOf(opt[0]) !== -1;
                            return createElement(Button, {
                                key: opt[0],
                                isPressed: active,
                                size: 'small',
                                onClick: function () {
                                    var next = active
                                        ? devs.filter(function (d) { return d !== opt[0]; })
                                        : devs.concat([opt[0]]);
                                    if (next.length === 0) next = ['pc', 'tablet', 'sp'];
                                    onUpdate({ devices: next });
                                }
                            }, opt[1]);
                        })
                    ),
                    createElement('p', {
                        style: { fontSize: '11px', color: '#949494', margin: '4px 0 0' }
                    }, __('選択したデバイスでのみアニメーションします', 'flavor-flavor'))
                ),

                // アニメーション種類
                createElement(SelectControl, {
                    label: __('アニメーション', 'flavor-flavor'),
                    value: animation.type,
                    options: ANIMATION_TYPE_OPTIONS,
                    onChange: function (value) { onUpdate({ type: value }); },
                    __nextHasNoMarginBottom: true,
                    style: { marginTop: '12px' }
                }),

                // 方向（slide, flip の場合のみ）
                needsDirection && createElement(SelectControl, {
                    label: __('方向', 'flavor-flavor'),
                    value: animation.direction || 'up',
                    options: ANIMATION_DIRECTION_OPTIONS,
                    onChange: function (value) { onUpdate({ direction: value }); },
                    __nextHasNoMarginBottom: true,
                    style: { marginTop: '12px' }
                }),

                // === 基本設定 ===
                createElement('div', { style: { marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #eee' } },
                    createElement('h4', { style: { marginBottom: '12px', fontSize: '12px', fontWeight: '600' } }, __('基本設定', 'flavor-flavor')),

                    createElement(RangeControl, {
                        label: __('時間 (ms)', 'flavor-flavor'),
                        value: animation.duration || 500,
                        onChange: function (value) { onUpdate({ duration: value }); },
                        min: 100,
                        max: 3000,
                        step: 50,
                        __nextHasNoMarginBottom: true
                    }),

                    createElement(RangeControl, {
                        label: __('遅延 (ms)', 'flavor-flavor'),
                        value: animation.delay || 0,
                        onChange: function (value) { onUpdate({ delay: value }); },
                        min: 0,
                        max: 2000,
                        step: 50,
                        __nextHasNoMarginBottom: true,
                        style: { marginTop: '8px' }
                    }),

                    createElement(SelectControl, {
                        label: __('イージング', 'flavor-flavor'),
                        value: animation.easing || 'ease',
                        options: ANIMATION_EASING_OPTIONS,
                        onChange: function (value) { onUpdate({ easing: value }); },
                        __nextHasNoMarginBottom: true,
                        style: { marginTop: '8px' }
                    })
                ),

                // 拡張設定トグル
                createElement(Button, {
                    isSmall: true,
                    variant: 'tertiary',
                    onClick: function () { setShowAdvanced(!showAdvanced); },
                    style: { marginTop: '12px' }
                }, showAdvanced ? __('拡張設定を隠す', 'flavor-flavor') : __('拡張設定を表示', 'flavor-flavor')),

                // === 拡張設定 ===
                showAdvanced && createElement('div', {
                    style: { marginTop: '12px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }
                },
                    // slide用: 移動距離
                    animation.type === 'slide' && createElement(RangeControl, {
                        label: __('移動距離 (px)', 'flavor-flavor'),
                        value: animation.distance || 50,
                        onChange: function (value) { onUpdate({ distance: value }); },
                        min: 1,
                        max: 200,
                        step: 1,
                        __nextHasNoMarginBottom: true
                    }),

                    // zoom, pulse用: スケール
                    (animation.type === 'zoom' || animation.type === 'pulse') && createElement(RangeControl, {
                        label: __('スケール', 'flavor-flavor'),
                        value: animation.scale || (animation.trigger === 'hover' ? 1.05 : 0.9),
                        onChange: function (value) { onUpdate({ scale: value }); },
                        min: 0.5,
                        max: 1.5,
                        step: 0.05,
                        __nextHasNoMarginBottom: true,
                        help: animation.trigger === 'hover'
                            ? __('1より大きい値で拡大、小さい値で縮小', 'flavor-flavor')
                            : __('1より小さい値で開始時に小さく表示', 'flavor-flavor')
                    }),

                    // rotate用: 回転角度
                    animation.type === 'rotate' && createElement(RangeControl, {
                        label: __('回転角度 (deg)', 'flavor-flavor'),
                        value: animation.rotation || 360,
                        onChange: function (value) { onUpdate({ rotation: value }); },
                        min: 0,
                        max: 720,
                        step: 15,
                        __nextHasNoMarginBottom: true
                    }),

                    // bounce, shake, pulse用: 強度
                    (animation.type === 'bounce' || animation.type === 'shake' || animation.type === 'pulse') && createElement(RangeControl, {
                        label: __('強度', 'flavor-flavor'),
                        value: animation.intensity || 5,
                        onChange: function (value) { onUpdate({ intensity: value }); },
                        min: 1,
                        max: 10,
                        step: 1,
                        __nextHasNoMarginBottom: true
                    }),

                    // scroll用: 発火位置（ビューポート基準・要素の高さに依存しない）
                    animation.trigger === 'scroll' && createElement(RangeControl, {
                        label: __('発火位置（画面下からの割合）', 'flavor-flavor'),
                        help: __('画面の下から何割の位置で発火するか。0=画面下端で発火 / 大きいほど上で発火。要素の高さに依存しません', 'flavor-flavor'),
                        value: animation.scrollThreshold != null ? animation.scrollThreshold : 0.15,
                        onChange: function (value) { onUpdate({ scrollThreshold: value }); },
                        min: 0,
                        max: 0.4,
                        step: 0.05,
                        __nextHasNoMarginBottom: true
                    })
                ),

                // === ホバースタイル設定（hoverトリガーの場合のみ） ===
                animation.trigger === 'hover' && createElement('div', {
                    style: { marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #eee' }
                },
                    createElement('h4', { style: { marginBottom: '12px', fontSize: '12px', fontWeight: '600' } }, __('ホバースタイル', 'flavor-flavor')),

                    // 背景色
                    createElement('div', { style: { marginBottom: '12px' } },
                        createElement('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }
                        },
                            createElement('span', { style: { fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' } }, __('背景色', 'flavor-flavor')),
                            animation.hoverBackgroundColor && createElement(Button, {
                                isSmall: true,
                                variant: 'tertiary',
                                onClick: function () { onUpdate({ hoverBackgroundColor: '' }); }
                            }, __('リセット', 'flavor-flavor'))
                        ),
                        createElement(ColorPalette, {
                            value: animation.hoverBackgroundColor || '',
                            onChange: function (value) { onUpdate({ hoverBackgroundColor: value || '' }); },
                            clearable: true
                        }),
                        animation.hoverBackgroundColor && createElement(RangeControl, {
                            label: __('透明度', 'flavor-flavor'),
                            value: Math.round((animation.hoverBackgroundColorAlpha !== undefined ? animation.hoverBackgroundColorAlpha : 1) * 100),
                            onChange: function (value) { onUpdate({ hoverBackgroundColorAlpha: value / 100 }); },
                            min: 0,
                            max: 100,
                            step: 1,
                            help: __('0%: 完全に透明、100%: 完全に不透明', 'flavor-flavor')
                        })
                    ),

                    // 文字色
                    createElement('div', { style: { marginBottom: '12px' } },
                        createElement('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }
                        },
                            createElement('span', { style: { fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' } }, __('文字色', 'flavor-flavor')),
                            animation.hoverColor && createElement(Button, {
                                isSmall: true,
                                variant: 'tertiary',
                                onClick: function () { onUpdate({ hoverColor: '' }); }
                            }, __('リセット', 'flavor-flavor'))
                        ),
                        createElement(ColorPalette, {
                            value: animation.hoverColor || '',
                            onChange: function (value) { onUpdate({ hoverColor: value || '' }); },
                            clearable: true
                        })
                    ),

                    // ボーダー色
                    createElement('div', { style: { marginBottom: '12px' } },
                        createElement('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }
                        },
                            createElement('span', { style: { fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' } }, __('ボーダー色', 'flavor-flavor')),
                            animation.hoverBorderColor && createElement(Button, {
                                isSmall: true,
                                variant: 'tertiary',
                                onClick: function () { onUpdate({ hoverBorderColor: '' }); }
                            }, __('リセット', 'flavor-flavor'))
                        ),
                        createElement(ColorPalette, {
                            value: animation.hoverBorderColor || '',
                            onChange: function (value) { onUpdate({ hoverBorderColor: value || '' }); },
                            clearable: true
                        }),
                        animation.hoverBorderColor && createElement(RangeControl, {
                            label: __('透明度', 'flavor-flavor'),
                            value: Math.round((animation.hoverBorderColorAlpha !== undefined ? animation.hoverBorderColorAlpha : 1) * 100),
                            onChange: function (value) { onUpdate({ hoverBorderColorAlpha: value / 100 }); },
                            min: 0,
                            max: 100,
                            step: 1,
                            help: __('0%: 完全に透明、100%: 完全に不透明', 'flavor-flavor')
                        })
                    ),

                    // ボーダー幅
                    createElement(RangeControl, {
                        label: __('ボーダー幅 (px)', 'flavor-flavor'),
                        value: animation.hoverBorderWidth || 0,
                        onChange: function (value) { onUpdate({ hoverBorderWidth: value }); },
                        min: 0,
                        max: 10,
                        step: 1,
                        __nextHasNoMarginBottom: true
                    }),

                    // ボックスシャドウ
                    createElement('div', { style: { marginBottom: '12px', marginTop: '12px' } },
                        createElement('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }
                        },
                            createElement('span', {
                                style: { fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }
                            }, __('ボックスシャドウ', 'flavor-flavor')),
                            animation.hoverBoxShadow && createElement(Button, {
                                isSmall: true,
                                variant: 'tertiary',
                                onClick: function () { onUpdate({ hoverBoxShadow: '' }); }
                            }, __('リセット', 'flavor-flavor'))
                        ),
                        createElement(TextControl, {
                            value: animation.hoverBoxShadow || '',
                            onChange: function (value) { onUpdate({ hoverBoxShadow: value }); },
                            placeholder: '0 8px 30px rgba(0,0,0,0.08)',
                            help: __('CSS box-shadow値を入力', 'flavor-flavor'),
                            __nextHasNoMarginBottom: true
                        })
                    ),

                    // オーバーレイ設定
                    createElement('div', { style: { marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #eee' } },
                        createElement('h4', { style: { marginBottom: '12px', fontSize: '12px', fontWeight: '600' } }, __('オーバーレイ', 'flavor-flavor')),

                        // オーバーレイ表示トグル
                        createElement(ToggleControl, {
                            label: __('オーバーレイを表示', 'flavor-flavor'),
                            checked: animation.hoverShowOverlay || false,
                            onChange: function (value) { onUpdate({ hoverShowOverlay: value }); },
                            __nextHasNoMarginBottom: true
                        }),

                        // オーバーレイ色（hoverShowOverlay が true の場合のみ表示）
                        animation.hoverShowOverlay && createElement('div', { style: { marginTop: '12px' } },
                            createElement('div', {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px'
                                }
                            },
                                createElement('span', { style: { fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' } }, __('オーバーレイ色', 'flavor-flavor')),
                                animation.hoverOverlayColor && animation.hoverOverlayColor !== '#000000' && createElement(Button, {
                                    isSmall: true,
                                    variant: 'tertiary',
                                    onClick: function () { onUpdate({ hoverOverlayColor: '#000000' }); }
                                }, __('リセット', 'flavor-flavor'))
                            ),
                            createElement(ColorPalette, {
                                value: animation.hoverOverlayColor || '#000000',
                                onChange: function (value) { onUpdate({ hoverOverlayColor: value || '#000000' }); },
                                clearable: false
                            })
                        ),

                        // オーバーレイ透明度
                        animation.hoverShowOverlay && createElement(RangeControl, {
                            label: __('オーバーレイ透明度', 'flavor-flavor'),
                            value: animation.hoverOverlayOpacity !== undefined ? animation.hoverOverlayOpacity : 0.3,
                            onChange: function (value) { onUpdate({ hoverOverlayOpacity: value }); },
                            min: 0,
                            max: 1,
                            step: 0.05,
                            __nextHasNoMarginBottom: true
                        })
                    )
                )
            )
        );
    };

    /**
     * アニメーションリピーターコンポーネント
     */
    var AnimationRepeater = function (props) {
        var animations = props.animations;
        var onChange = props.onChange;

        // 新規追加
        var addAnimation = function () {
            var newAnimation = Object.assign({}, DEFAULT_ANIMATION, {
                id: 'anim_' + Date.now()
            });
            onChange(animations.concat([newAnimation]));
        };

        // 更新
        var updateAnimation = function (id, updates) {
            onChange(animations.map(function (anim) {
                return anim.id === id ? Object.assign({}, anim, updates) : anim;
            }));
        };

        // 削除
        var removeAnimation = function (id) {
            onChange(animations.filter(function (anim) { return anim.id !== id; }));
        };

        // 上へ移動
        var moveUp = function (id) {
            var index = -1;
            for (var i = 0; i < animations.length; i++) {
                if (animations[i].id === id) { index = i; break; }
            }
            if (index <= 0) return;
            var newAnimations = animations.slice();
            var tmp = newAnimations[index - 1];
            newAnimations[index - 1] = newAnimations[index];
            newAnimations[index] = tmp;
            onChange(newAnimations);
        };

        // 下へ移動
        var moveDown = function (id) {
            var index = -1;
            for (var i = 0; i < animations.length; i++) {
                if (animations[i].id === id) { index = i; break; }
            }
            if (index < 0 || index >= animations.length - 1) return;
            var newAnimations = animations.slice();
            var tmp = newAnimations[index];
            newAnimations[index] = newAnimations[index + 1];
            newAnimations[index + 1] = tmp;
            onChange(newAnimations);
        };

        return createElement(
            'div',
            { className: 'flavor-flavor-animation-repeater' },
            animations.map(function (anim, index) {
                return createElement(AnimationItem, {
                    key: anim.id,
                    animation: anim,
                    index: index,
                    total: animations.length,
                    onUpdate: function (updates) { updateAnimation(anim.id, updates); },
                    onRemove: function () { removeAnimation(anim.id); },
                    onMoveUp: function () { moveUp(anim.id); },
                    onMoveDown: function () { moveDown(anim.id); }
                });
            }),
            createElement(
                Button,
                {
                    variant: 'secondary',
                    onClick: addAnimation,
                    icon: 'plus',
                    style: { width: '100%', justifyContent: 'center', marginTop: '8px' }
                },
                __('アニメーションを追加', 'flavor-flavor')
            )
        );
    };

    window.flavorAnimationCommon = {
        AnimationItem: AnimationItem,
        AnimationRepeater: AnimationRepeater,
        DEFAULT_ANIMATION: DEFAULT_ANIMATION
    };
})();
