/**
 * クリティカルCSS最適化システム
 * Above-the-foldコンテンツのスタイルを優先読み込みし、
 * 残りのCSSを非同期で読み込む
 */

// クリティカルCSS（上記フォールドコンテンツに必要な最小限のCSS）
const criticalCSS = `
/* 最小限のクリティカルCSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: #0f172a;
    background-color: #ffffff;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* ヘッダー（ファーストビュー） */
.header {
    background: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 80px;
}

.navbar {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: #16a34a;
    text-decoration: none;
}

/* ヒーローセクション（最重要） */
.hero {
    background: linear-gradient(135deg, #16a34a 0%, #059669 100%);
    padding: 120px 0 80px;
    color: white;
    text-align: center;
}

.hero-title {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.hero-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.btn {
    display: inline-block;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

/* レスポンシブ対応（モバイル） */
@media (max-width: 768px) {
    .hero {
        padding: 100px 0 60px;
    }
    
    .hero-title {
        font-size: 2.2rem;
    }
    
    .hero-description {
        font-size: 1rem;
    }
}
`;

class CriticalCSSLoader {
    constructor() {
        this.init();
    }

    init() {
        this.injectCriticalCSS();
        this.loadNonCriticalCSS();
        this.optimizeFontLoading();
    }

    /**
     * クリティカルCSSをインライン注入
     */
    injectCriticalCSS() {
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        style.id = 'critical-css';
        
        // 既存のCSSより前に挿入
        const firstLink = document.querySelector('link[rel="stylesheet"]');
        if (firstLink) {
            document.head.insertBefore(style, firstLink);
        } else {
            document.head.appendChild(style);
        }
    }

    /**
     * 非クリティカルCSSの遅延読み込み
     */
    loadNonCriticalCSS() {
        const nonCriticalCSS = [
            'css/animations.css',
            'css/print.css',
            'css/components.css'
        ];

        // ページ読み込み完了後に非クリティカルCSSを読み込み
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadCSSFiles(nonCriticalCSS);
            });
        } else {
            this.loadCSSFiles(nonCriticalCSS);
        }
    }

    /**
     * CSSファイルの非同期読み込み
     */
    loadCSSFiles(cssFiles) {
        cssFiles.forEach(file => {
            this.loadCSS(file);
        });
    }

    /**
     * 個別CSSファイル読み込み
     */
    loadCSS(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print'; // 最初はprint用として読み込み
        link.onload = function() {
            this.media = 'all'; // 読み込み完了後にallに変更
        };
        
        // 既存のlinkタグの後に追加
        const lastLink = document.querySelector('link[rel="stylesheet"]:last-of-type');
        if (lastLink) {
            lastLink.parentNode.insertBefore(link, lastLink.nextSibling);
        } else {
            document.head.appendChild(link);
        }
    }

    /**
     * フォント読み込み最適化
     */
    optimizeFontLoading() {
        // Webフォントのpreload
        const fontPreloads = [
            {
                href: 'https://fonts.gstatic.com/s/notosansjp/v52/k3kCo84MPvpLmixcA63oeAL7Iqp5JJXZ2Yd8uyKem.woff2',
                type: 'font/woff2'
            }
        ];

        fontPreloads.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font.href;
            link.as = 'font';
            link.type = font.type;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });

        // フォント表示最適化CSS
        const fontCSS = `
            @font-face {
                font-family: 'NotoSansJP';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url('https://fonts.gstatic.com/s/notosansjp/v52/k3kCo84MPvpLmixcA63oeAL7Iqp5JJXZ2Yd8uyKem.woff2') format('woff2');
                unicode-range: U+3000-9FFF, U+FF00-FFEF;
            }
        `;

        const fontStyle = document.createElement('style');
        fontStyle.textContent = fontCSS;
        document.head.appendChild(fontStyle);
    }

    /**
     * 未使用CSSの特定と削除
     */
    removeUnusedCSS() {
        // 開発環境でのみ実行
        if (location.hostname !== 'localhost') return;

        const usedSelectors = new Set();
        const stylesheets = Array.from(document.styleSheets);

        // 使用されているセレクターを収集
        stylesheets.forEach(stylesheet => {
            try {
                const rules = Array.from(stylesheet.cssRules || []);
                rules.forEach(rule => {
                    if (rule.type === CSSRule.STYLE_RULE) {
                        const selector = rule.selectorText;
                        if (document.querySelector(selector)) {
                            usedSelectors.add(selector);
                        }
                    }
                });
            } catch (e) {
                // CORS制限などでアクセスできない場合はスキップ
                console.warn('CSS rules access blocked:', stylesheet.href);
            }
        });

        console.log('使用中のCSSセレクター数:', usedSelectors.size);
    }

    /**
     * CSS読み込み状況の監視
     */
    monitorCSSLoading() {
        const startTime = performance.now();
        let cssLoadedCount = 0;
        const totalCSS = document.querySelectorAll('link[rel="stylesheet"]').length;

        document.addEventListener('load', () => {
            const endTime = performance.now();
            console.log(`CSS読み込み完了: ${Math.round(endTime - startTime)}ms`);
            console.log(`読み込まれたCSSファイル数: ${cssLoadedCount}/${totalCSS}`);
        });

        // 各CSSファイルの読み込み状況を監視
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            link.addEventListener('load', () => {
                cssLoadedCount++;
                console.log(`CSS読み込み完了: ${link.href}`);
            });

            link.addEventListener('error', () => {
                console.error(`CSS読み込みエラー: ${link.href}`);
            });
        });
    }
}

// クリティカルCSS読み込みシステムを初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CriticalCSSLoader();
    });
} else {
    new CriticalCSSLoader();
}