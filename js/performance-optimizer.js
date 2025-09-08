/**
 * ページ読み込み速度最適化システム
 * 画像遅延読み込み、リソース最適化、キャッシュ制御を実装
 */

class PerformanceOptimizer {
    constructor() {
        this.observer = null;
        this.loadedImages = new Set();
        this.criticalResources = ['css/style.css', 'js/analytics.js'];
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupResourceHints();
        this.optimizeImages();
        this.setupCriticalResourceLoading();
        this.monitorPerformance();
    }

    /**
     * 画像の遅延読み込み設定
     */
    setupLazyLoading() {
        // Intersection Observer をサポートしていない場合はフォールバック
        if (!('IntersectionObserver' in window)) {
            this.loadAllImages();
            return;
        }

        const imageObserverOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.loadedImages.has(entry.target)) {
                    this.loadImage(entry.target);
                }
            });
        }, imageObserverOptions);

        // 既存の画像に遅延読み込みを適用
        this.applyLazyLoadingToImages();
    }

    /**
     * 画像に遅延読み込みを適用
     */
    applyLazyLoadingToImages() {
        const images = document.querySelectorAll('img[src]');
        images.forEach((img, index) => {
            // ファーストビュー内の最初の2-3枚は即座に読み込む
            if (index < 3) {
                return;
            }

            // data-src に元のsrcを移動
            if (!img.hasAttribute('data-src')) {
                img.setAttribute('data-src', img.src);
                img.src = this.createPlaceholderImage(img);
                img.classList.add('lazy-image');
                this.observer.observe(img);
            }
        });
    }

    /**
     * プレースホルダー画像作成
     */
    createPlaceholderImage(img) {
        const width = img.offsetWidth || 300;
        const height = img.offsetHeight || 200;
        
        // SVGプレースホルダーを作成
        const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f0f0f0"/>
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">読み込み中...</text>
        </svg>`;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    /**
     * 画像読み込み実行
     */
    loadImage(img) {
        const dataSrc = img.getAttribute('data-src');
        if (!dataSrc) return;

        // 新しいImageオブジェクトで事前読み込み
        const newImg = new Image();
        newImg.onload = () => {
            img.src = dataSrc;
            img.classList.remove('lazy-image');
            img.classList.add('loaded');
            this.loadedImages.add(img);
            this.observer.unobserve(img);
        };
        
        newImg.onerror = () => {
            img.classList.add('error');
            console.warn('画像読み込みエラー:', dataSrc);
        };
        
        newImg.src = dataSrc;
    }

    /**
     * リソースヒント設定
     */
    setupResourceHints() {
        const head = document.head;

        // DNS prefetch for external domains
        const dnsHints = [
            'https://cdnjs.cloudflare.com',
            'https://cdn.jsdelivr.net',
            'https://www.googletagmanager.com',
            'https://www.google-analytics.com'
        ];

        dnsHints.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            head.appendChild(link);
        });

        // Preload critical resources
        this.criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            head.appendChild(link);
        });
    }

    /**
     * 画像最適化
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // loading属性を追加（ブラウザネイティブ遅延読み込み）
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // デコード最適化
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }

            // 重要でない画像のfetchpriorityを設定
            if (!img.hasAttribute('fetchpriority')) {
                img.setAttribute('fetchpriority', 'low');
            }
        });

        // ファーストビュー画像は優先度を高く設定
        const heroImages = document.querySelectorAll('.hero img, .main-visual img');
        heroImages.forEach(img => {
            img.setAttribute('fetchpriority', 'high');
            img.removeAttribute('loading'); // 即座に読み込む
        });
    }

    /**
     * クリティカルリソースの読み込み制御
     */
    setupCriticalResourceLoading() {
        // 非クリティカルなスクリプトを遅延読み込み
        const nonCriticalScripts = [
            'js/chart-config.js',
            'js/social-sharing.js',
            'js/comments.js'
        ];

        // ページ読み込み完了後に非クリティカルスクリプトを読み込み
        window.addEventListener('load', () => {
            setTimeout(() => {
                nonCriticalScripts.forEach(script => {
                    this.loadScriptAsync(script);
                });
            }, 1000);
        });
    }

    /**
     * スクリプトの非同期読み込み
     */
    loadScriptAsync(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * パフォーマンス監視
     */
    monitorPerformance() {
        // Performance Observer でパフォーマンス測定
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        this.logPerformanceMetrics(entry);
                    }
                });
            });
            observer.observe({ entryTypes: ['navigation'] });
        }

        // Core Web Vitals 測定
        this.measureCoreWebVitals();
    }

    /**
     * Core Web Vitals測定
     */
    measureCoreWebVitals() {
        // LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        }

        // FID (First Input Delay) - ユーザー操作での測定
        document.addEventListener('click', this.measureFID.bind(this), { once: true });
    }

    /**
     * FID測定
     */
    measureFID(event) {
        const start = performance.now();
        requestAnimationFrame(() => {
            const fid = performance.now() - start;
            console.log('FID:', fid);
        });
    }

    /**
     * パフォーマンスメトリクス記録
     */
    logPerformanceMetrics(entry) {
        const metrics = {
            'DNS解決時間': entry.domainLookupEnd - entry.domainLookupStart,
            'TCP接続時間': entry.connectEnd - entry.connectStart,
            '初期リクエスト時間': entry.responseStart - entry.requestStart,
            'レスポンス時間': entry.responseEnd - entry.responseStart,
            'DOM構築時間': entry.domContentLoadedEventEnd - entry.responseEnd,
            'リソース読み込み時間': entry.loadEventEnd - entry.domContentLoadedEventEnd,
            '総読み込み時間': entry.loadEventEnd - entry.navigationStart
        };

        console.group('📊 パフォーマンスメトリクス');
        Object.entries(metrics).forEach(([key, value]) => {
            if (value > 0) {
                console.log(`${key}: ${Math.round(value)}ms`);
            }
        });
        console.groupEnd();

        // 遅い項目の警告
        if (metrics['総読み込み時間'] > 3000) {
            console.warn('⚠️ ページ読み込み時間が3秒を超えています');
        }
    }

    /**
     * フォールバック: 全画像即座読み込み
     */
    loadAllImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }

    /**
     * メモリ使用量監視
     */
    monitorMemoryUsage() {
        if ('memory' in performance) {
            const memory = performance.memory;
            console.log('メモリ使用量:', {
                used: Math.round(memory.usedJSHeapSize / 1048576) + 'MB',
                total: Math.round(memory.totalJSHeapSize / 1048576) + 'MB',
                limit: Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB'
            });
        }
    }
}

// CSS for lazy loading
const lazyLoadingCSS = `
    .lazy-image {
        opacity: 0.6;
        transition: opacity 0.3s ease;
        background-color: #f5f5f5;
    }
    
    .lazy-image.loaded {
        opacity: 1;
        background-color: transparent;
    }
    
    .lazy-image.error {
        opacity: 0.3;
        filter: grayscale(100%);
        background-color: #ffebee;
    }
`;

// CSSを動的に追加（重複チェック）
if (!document.getElementById('lazy-loading-css')) {
    const style = document.createElement('style');
    style.id = 'lazy-loading-css';
    style.textContent = lazyLoadingCSS;
    document.head.appendChild(style);
}

// パフォーマンス最適化を初期化
document.addEventListener('DOMContentLoaded', () => {
    const optimizer = new PerformanceOptimizer();
    
    // 開発環境でのメモリ監視
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        setInterval(() => optimizer.monitorMemoryUsage(), 10000);
    }
});