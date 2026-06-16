<?php
/**
 * Block Device Visibility
 * ブロックのデバイス表示切替機能
 */
if (!defined('ABSPATH')) exit;

// 対象ブロック（ここに追加するだけで機能拡張可能）
define('FLAVOR_DEVICE_VISIBILITY_BLOCKS', [
    'flavor/universal-block',
    'core/cover',
    'core/image',
]);

// フロントエンド用CSS
add_action('wp_enqueue_scripts', function () {
    $breakpoints = apply_filters('flavor_flavor_breakpoints', [
        'tablet' => 959, 'mobile' => 599,
    ]);
    $tablet = intval($breakpoints['tablet']);
    $mobile = intval($breakpoints['mobile']);
    $pc_min = $tablet + 1;
    $tablet_min = $mobile + 1;

    $css = "/* デバイス表示切替 */\n";
    $css .= "@media (min-width: {$pc_min}px) { .has-device-hide-pc { display: none !important; } }\n";
    $css .= "@media (min-width: {$tablet_min}px) and (max-width: {$tablet}px) { .has-device-hide-tablet { display: none !important; } }\n";
    $css .= "@media (max-width: {$mobile}px) { .has-device-hide-sp { display: none !important; } }\n";

    wp_register_style('flavor-device-visibility', false);
    wp_enqueue_style('flavor-device-visibility');
    wp_add_inline_style('flavor-device-visibility', $css);
}, 11);

// エディタ用JS
add_action('enqueue_block_editor_assets', function () {
    $js_path = get_stylesheet_directory() . '/assets/js/editor/extensions/block-device-visibility.js';
    if (file_exists($js_path)) {
        wp_enqueue_script(
            'flavor-block-device-visibility',
            get_stylesheet_directory_uri() . '/assets/js/editor/extensions/block-device-visibility.js',
            ['wp-hooks', 'wp-compose', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-data'],
            filemtime($js_path),
            true
        );
        // 対象ブロック一覧をJSに渡す
        wp_localize_script('flavor-block-device-visibility', 'flavorDeviceVisibilityBlocks',
            FLAVOR_DEVICE_VISIBILITY_BLOCKS
        );
    }

    // エディタ用インジケーターCSS
    $editor_css  = "/* デバイス表示切替 エディタ用インジケーター */\n";
    $editor_css .= "[class*=\"has-device-hide-\"] { position: relative; }\n";
    $editor_css .= "[class*=\"has-device-hide-\"]::after {\n";
    $editor_css .= "\tcontent: '表示制限あり';\n";
    $editor_css .= "\tposition: absolute; top: 0; right: 0;\n";
    $editor_css .= "\tbackground: rgba(0,0,0,0.5); color: #fff;\n";
    $editor_css .= "\tfont-size: 10px; padding: 2px 6px;\n";
    $editor_css .= "\tborder-radius: 0 0 0 4px; pointer-events: none; z-index: 1;\n";
    $editor_css .= "}\n";
    wp_register_style('flavor-device-visibility-editor', false);
    wp_enqueue_style('flavor-device-visibility-editor');
    wp_add_inline_style('flavor-device-visibility-editor', $editor_css);
});
