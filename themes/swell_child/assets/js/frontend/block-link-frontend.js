/**
 * Block Link Frontend Handler
 * ブロックリンクのクリックイベントを処理
 * イベント委譲で実装（SWELLの追従ヘッダー等、cloneNodeで複製される要素に対応）
 */
(function () {
    'use strict';

    // イベント委譲: documentレベルでクリックを監視
    document.addEventListener('click', function (e) {
        var block = e.target.closest('[data-block-link]');
        if (!block) return;

        var url = block.getAttribute('data-block-link');
        var normalizedUrl = url ? url.trim().toLowerCase() : '';
        if (!url || normalizedUrl.indexOf('javascript:') === 0 || normalizedUrl.indexOf('data:') === 0) return;

        // 内部のリンクやボタンがクリックされた場合は何もしない
        var isInteractiveElement = e.target.closest('a, button, input, textarea, select, [role="button"]');
        if (isInteractiveElement && isInteractiveElement !== block) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        var target = block.getAttribute('data-block-link-target') || '_self';
        var rel = block.getAttribute('data-block-link-rel') || '';

        var tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.target = target;
        if (rel) {
            tempLink.rel = rel;
        }
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    });

    // a11y属性を個別ノードに設定
    function setA11yAttrs(node) {
        if (!node.hasAttribute('tabindex')) {
            node.setAttribute('tabindex', '0');
            node.setAttribute('role', 'link');
        }
    }

    // キーボードアクセシビリティ: tabindex と role を設定
    function initBlockLinkA11y() {
        var blocks = document.querySelectorAll('[data-block-link]');
        blocks.forEach(setA11yAttrs);
    }

    // キーボードイベントも委譲（フォーカスがブロック自体にある場合のみ発火）
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.hasAttribute && e.target.hasAttribute('data-block-link')) {
                e.preventDefault();
                e.target.click();
            }
        }
    });

    // MutationObserverで動的追加された要素のa11y属性を設定（追加ノードのみ処理）
    var observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType !== 1) return;
                if (node.matches && node.matches('[data-block-link]')) {
                    setA11yAttrs(node);
                }
                var children = node.querySelectorAll && node.querySelectorAll('[data-block-link]');
                if (children) children.forEach(setA11yAttrs);
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 初回実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlockLinkA11y);
    } else {
        initBlockLinkA11y();
    }
})();
