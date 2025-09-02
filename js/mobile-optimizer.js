/**
 * モバイルフレンドリー最適化システム
 * 失敗しないお得マン！
 */

class MobileOptimizer {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isTablet = this.detectTablet();
        this.touchDevice = 'ontouchstart' in window;
        this.screenSize = this.getScreenSize();
        
        this.init();
    }

    init() {
        this.optimizeForMobile();
        this.addTouchOptimizations();
        this.optimizeImages();
        this.optimizeNavigation();
        this.optimizeForms();
        this.addMobileStyles();
        // this.removeBottomNavigation(); // 無効化 - CSSで制御
        this.setupViewportTest();
    }

    /**
     * モバイルデバイス検出
     */
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }

    /**
     * タブレット検出
     */
    detectTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent) ||
               (window.innerWidth >= 768 && window.innerWidth <= 1024);
    }

    /**
     * 画面サイズ取得
     */
    getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.devicePixelRatio || 1
        };
    }

    /**
     * モバイル向け基本最適化
     */
    optimizeForMobile() {
        if (!this.isMobile) return;

        // フォントサイズの調整
        document.documentElement.style.fontSize = '16px';
        
        // タップハイライトの最適化
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-tap-highlight-color: rgba(52, 152, 219, 0.3);
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            
            input, textarea, [contenteditable] {
                -webkit-user-select: auto !important;
                -moz-user-select: auto !important;
                -ms-user-select: auto !important;
                user-select: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * タッチ操作最適化
     */
    addTouchOptimizations() {
        // ボタンとリンクのタッチ領域を拡大
        const touchTargets = document.querySelectorAll('button, a, .toc-link, .nav-link');
        touchTargets.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.height < 44) { // 44px未満の場合は調整
                element.style.minHeight = '44px';
                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            }
        });

        // スワイプジェスチャーの追加
        this.addSwipeGestures();
        
        // 長押しメニューの無効化（不要な場所）
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
                // 画像やリンクでは長押しメニューを許可
                return;
            }
            e.preventDefault();
        });
    }

    /**
     * スワイプジェスチャー
     */
    addSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            const swipeThreshold = 100;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > swipeThreshold) {
                    if (deltaX > 0) {
                        // 右スワイプ
                        this.handleRightSwipe();
                    } else {
                        // 左スワイプ
                        this.handleLeftSwipe();
                    }
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }

    handleRightSwipe() {
        // サイドメニューを開く（将来の実装用）
        console.log('右スワイプ検出');
    }

    handleLeftSwipe() {
        // サイドメニューを閉じる
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }

    /**
     * 画像の最適化
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // 高解像度ディスプレイ対応
            if (this.screenSize.ratio > 1) {
                const src = img.getAttribute('src');
                const dataSrc = img.getAttribute('data-src-2x');
                if (dataSrc) {
                    img.src = dataSrc;
                }
            }

            // 画像の遅延読み込み強化
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }

            // 画像タップ時の拡大表示
            if (this.touchDevice) {
                img.addEventListener('touchstart', (e) => {
                    if (img.classList.contains('expandable')) {
                        e.preventDefault();
                        this.showImageModal(img);
                    }
                });
            }
        });
    }

    /**
     * ナビゲーションの最適化
     */
    optimizeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            // ハンバーガーメニューの動作改善
            hamburger.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                
                // ARIA属性の更新
                const expanded = navMenu.classList.contains('active');
                hamburger.setAttribute('aria-expanded', expanded);
                
                // トラッキング
                if (window.trackCustomEvent) {
                    window.trackCustomEvent('mobile_menu_toggle', {
                        category: 'navigation',
                        label: expanded ? 'opened' : 'closed',
                        value: 1
                    });
                }
            });

            // メニュー外タップで閉じる
            document.addEventListener('touchend', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // 目次の最適化
        const tocToggle = document.querySelector('.toc-toggle');
        if (tocToggle && this.isMobile) {
            tocToggle.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const toc = document.querySelector('.table-of-contents');
                if (toc) {
                    toc.classList.toggle('collapsed');
                }
            });
        }
    }

    /**
     * フォームの最適化
     */
    optimizeForms() {
        const forms = document.querySelectorAll('form');
        const inputs = document.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // 適切な inputmode を設定
            if (input.type === 'email') {
                input.setAttribute('inputmode', 'email');
            } else if (input.type === 'tel') {
                input.setAttribute('inputmode', 'tel');
            } else if (input.type === 'url') {
                input.setAttribute('inputmode', 'url');
            } else if (input.type === 'number') {
                input.setAttribute('inputmode', 'numeric');
            }

            // フォーカス時のズーム防止
            if (this.isMobile) {
                const currentFontSize = window.getComputedStyle(input).fontSize;
                const fontSize = parseFloat(currentFontSize);
                if (fontSize < 16) {
                    input.style.fontSize = '16px';
                }
            }

            // バーチャルキーボード対応
            input.addEventListener('focus', () => {
                if (this.isMobile) {
                    setTimeout(() => {
                        input.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                }
            });
        });
    }

    /**
     * ボトムナビゲーション強制削除（Android対応）
     */
    removeBottomNavigation() {
        // モバイルナビゲーションの削除機能を無効化
        // CSSで制御するため、JavaScriptでの削除は行わない
        return;
    }

    /**
     * ボトムナビ要素のスキャンと削除
     */
    scanAndRemoveBottomElements() {
        // 機能を無効化 - CSSで制御
        return;
    }

    /**
     * ボトムナビ要素かどうかの判定
     */
    isBottomNavElement(element) {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        
        // 下部に固定されている要素
        if (style.position === 'fixed' && 
            (style.bottom === '0px' || style.bottom === '0' || 
             rect.bottom >= window.innerHeight - 10)) {
            return true;
        }

        // クラス名・ID名による判定
        const className = element.className || '';
        const id = element.id || '';
        const suspiciousTerms = [
            'bottom', 'tab-bar', 'mobile-nav', 'nav-bottom', 
            'toolbar', 'app-bar', 'navigation'
        ];

        return suspiciousTerms.some(term => 
            className.toLowerCase().includes(term) || 
            id.toLowerCase().includes(term)
        );
    }

    /**
     * ヘッダーナビゲーションの削除
     */
    removeHeaderNavigation() {
        // ヘッダーナビゲーションは削除しない - 正常な動作のため
        return;
    }

    /**
     * 要素の安全な削除
     */
    removeElement(element) {
        if (element && element.parentNode && 
            element.tagName !== 'BODY' && element.tagName !== 'HTML') {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
            element.style.opacity = '0';
            element.style.height = '0';
            element.style.width = '0';
            element.style.overflow = 'hidden';
            element.style.position = 'absolute';
            element.style.left = '-9999px';
            element.style.top = '-9999px';
            element.style.zIndex = '-9999';
            element.style.pointerEvents = 'none';
            
            // 完全削除も試行
            try {
                element.remove();
            } catch (e) {
                // 削除に失敗した場合は隠すだけ
            }
        }
    }

    /**
     * モバイル専用スタイルの追加
     */
    addMobileStyles() {
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                /* タッチ領域の最適化 */
                .nav-menu a,
                .toc-link,
                .search-result-item,
                button {
                    min-height: 44px;
                    padding: 0.75rem;
                }

                /* 読みやすさの向上 */
                .article-content {
                    font-size: 1.1rem;
                    line-height: 1.7;
                }

                /* スクロール最適化 */
                .toc-nav,
                .search-dropdown {
                    -webkit-overflow-scrolling: touch;
                }

                /* フォーム最適化 */
                input, textarea, select {
                    font-size: 16px !important;
                    padding: 1rem;
                    border-radius: 8px;
                }

                /* 画像レスポンシブ */
                img {
                    max-width: 100%;
                    height: auto;
                    touch-action: manipulation;
                }

                /* テーブル横スクロール */
                table {
                    display: block;
                    overflow-x: auto;
                    white-space: nowrap;
                    -webkit-overflow-scrolling: touch;
                }

                /* ボタンのタッチ改善 */
                .btn, button {
                    padding: 1rem 1.5rem;
                    font-size: 1rem;
                    min-height: 48px;
                }

                /* 検索ボックスの改善 */
                .search-box input {
                    font-size: 16px;
                    padding: 0.75rem 1rem;
                }

                /* 目次の改善 */
                .table-of-contents {
                    margin: 1rem 0;
                    border-radius: 10px;
                }

                /* 読了時間表示の最適化 */
                .reading-time {
                    font-size: 1rem;
                    padding: 0.75rem 1rem;
                }

                /* 進捗バーの調整 */
                #reading-progress {
                    height: 6px;
                }
            }

            @media (max-width: 480px) {
                /* 小画面でのさらなる最適化 */
                .hero-title {
                    font-size: 1.75rem;
                }

                .nav-container {
                    padding: 0.5rem 1rem;
                }

                .article-header h1 {
                    font-size: 1.5rem;
                    line-height: 1.4;
                }

                .character-dialogue {
                    padding: 1rem;
                    margin: 1rem 0;
                }
            }

            /* 横向きの最適化 */
            @media (max-height: 500px) and (orientation: landscape) {
                .nav-menu {
                    max-height: 200px;
                    overflow-y: auto;
                }

                .search-dropdown {
                    max-height: 250px;
                }
            }
        `;
        document.head.appendChild(mobileStyles);
    }

    /**
     * Viewport テストとレポート
     */
    setupViewportTest() {
        // Viewport meta tag の確認
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        const testResults = {
            hasViewport: !!viewportMeta,
            viewportContent: viewportMeta ? viewportMeta.getAttribute('content') : null,
            screenSize: this.screenSize,
            isMobile: this.isMobile,
            isTablet: this.isTablet,
            touchDevice: this.touchDevice,
            issues: []
        };

        // 問題の検出
        if (!viewportMeta) {
            testResults.issues.push('Viewport meta tag がありません');
        } else {
            const content = viewportMeta.getAttribute('content') || '';
            if (!content.includes('width=device-width')) {
                testResults.issues.push('width=device-width が設定されていません');
            }
            if (content.includes('user-scalable=no')) {
                testResults.issues.push('ユーザーのズームが無効化されています（アクセシビリティ問題）');
            }
        }

        // 小さすぎるタッチターゲットの検出
        const touchTargets = document.querySelectorAll('a, button, input, [onclick], [tabindex]');
        let smallTargetCount = 0;
        
        touchTargets.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                smallTargetCount++;
            }
        });

        if (smallTargetCount > 0) {
            testResults.issues.push(`小さすぎるタッチターゲットが ${smallTargetCount} 個あります`);
        }

        // コンソールにレポート出力
        console.group('📱 モバイルフレンドリー テスト結果');
        console.log('デバイス情報:', {
            isMobile: testResults.isMobile,
            isTablet: testResults.isTablet,
            touchDevice: testResults.touchDevice,
            screenSize: testResults.screenSize
        });
        
        if (testResults.issues.length > 0) {
            console.warn('検出された問題:', testResults.issues);
        } else {
            console.log('✅ 問題は検出されませんでした');
        }
        console.groupEnd();

        // Global オブジェクトに結果を保存
        window.mobileTestResults = testResults;
    }

    /**
     * 画像モーダル表示
     */
    showImageModal(img) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        `;

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        `;

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        // タップで閉じる
        modal.addEventListener('touchend', () => {
            modal.remove();
        });

        // ESCキーで閉じる
        const closeOnEsc = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEsc);
            }
        };
        document.addEventListener('keydown', closeOnEsc);
    }

    /**
     * パフォーマンス監視
     */
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'measure') {
                        console.log(`📊 ${entry.name}: ${Math.round(entry.duration)}ms`);
                    }
                });
            });

            observer.observe({ entryTypes: ['measure'] });
        }
    }
}

// モバイル最適化の初期化
document.addEventListener('DOMContentLoaded', () => {
    const optimizer = new MobileOptimizer();
    window.mobileOptimizer = optimizer;
});

// グローバル関数
window.runMobileTest = function() {
    console.log('📱 モバイルテスト結果:', window.mobileTestResults || 'テスト未実行');
};

// 画面回転時の再最適化
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.mobileOptimizer) {
            window.mobileOptimizer.screenSize = window.mobileOptimizer.getScreenSize();
            console.log('📱 画面回転検出 - 最適化更新');
        }
    }, 100);
});

console.log(`
📱 モバイル最適化システム初期化完了
使用方法: runMobileTest() でテスト結果を表示
`);