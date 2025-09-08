/**
 * 画像システム - 家電特化サイト用
 * 遅延読み込み、レスポンシブ対応、プレースホルダー管理
 */

class ImageSystem {
    constructor() {
        this.placeholderAPI = 'https://picsum.photos';
        this.categories = {
            humidifier: {
                color: '4A90E2',
                keywords: ['water', 'mist', 'air']
            },
            'air-purifier': {
                color: '7ED321', 
                keywords: ['clean', 'air', 'fresh']
            },
            appliance: {
                color: '9013FE',
                keywords: ['tech', 'modern']
            },
            article: {
                color: 'F5A623',
                keywords: ['info', 'guide']
            },
            character: {
                color: 'BD10E0',
                keywords: ['avatar', 'person']
            }
        };
        
        this.init();
    }

    init() {
        // DOM読み込み完了時に実行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupImageSystem());
        } else {
            this.setupImageSystem();
        }
    }

    setupImageSystem() {
        this.setupIntersectionObserver();
        this.replaceEmojiPlaceholders();
        this.setupImageErrorHandling();
        this.setupResponsiveImages();
    }

    /**
     * Intersection Observer による遅延読み込みの設定
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // フォールバック：すぐに全画像を読み込む
            this.loadAllImages();
            return;
        }

        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.imageObserver.unobserve(img);
                }
            });
        }, options);
    }

    /**
     * 絵文字プレースホルダーを適切な画像システムに置換
     */
    replaceEmojiPlaceholders() {
        // 絵文字プレースホルダーはそのまま表示するため、置換を無効化
        console.log('絵文字プレースホルダーをそのまま表示します');
        
        // 必要に応じて特定の画像のみ置換
        // const productPlaceholders = document.querySelectorAll('.product-image .placeholder-image[data-replace="true"]');
        // productPlaceholders.forEach((placeholder, index) => {
        //     this.replaceProductPlaceholder(placeholder, index);
        // });

        // キャラクターアイコンの処理のみ実行
        this.setupCharacterImages();
    }

    /**
     * 商品画像プレースホルダーの置換
     */
    replaceProductPlaceholder(placeholder, index) {
        const productCard = placeholder.closest('.product-card');
        const productName = productCard?.querySelector('.product-name')?.textContent || '';
        const brand = productCard?.querySelector('.product-brand')?.textContent || '';
        
        // 商品タイプを判定
        let category = 'appliance';
        if (productName.includes('加湿器') || productName.includes('加湿機')) {
            category = 'humidifier';
        } else if (productName.includes('空気清浄機')) {
            category = 'air-purifier';
        }

        const img = this.createImageElement({
            category: category,
            width: 300,
            height: 200,
            alt: `${brand} ${productName}の商品画像`,
            className: 'product-image-placeholder',
            seed: this.generateSeed(productName + brand)
        });

        // 既存のプレースホルダーと置換
        placeholder.parentNode.replaceChild(img, placeholder);
    }

    /**
     * 記事画像プレースホルダーの置換
     */
    replaceArticlePlaceholder(placeholder, index) {
        const articleCard = placeholder.closest('.article-card');
        const title = articleCard?.querySelector('h3')?.textContent || '';
        const badge = articleCard?.querySelector('.article-badge')?.textContent || '';

        const img = this.createImageElement({
            category: 'article',
            width: 400,
            height: 250,
            alt: `${title}の記事サムネイル`,
            className: 'article-image-placeholder',
            seed: this.generateSeed(title + badge)
        });

        placeholder.parentNode.replaceChild(img, placeholder);
    }

    /**
     * キャラクター画像の設定
     */
    setupCharacterImages() {
        // CSSで設定されているキャラクター絵文字を画像に置換
        const style = document.createElement('style');
        style.textContent = `
            .pixel-character.otokuman::before {
                content: '';
                background-image: url('${this.generatePlaceholderURL({category: 'character', width: 60, height: 60, seed: 'otokuman'})}');
                background-size: cover;
                background-position: center;
                width: 32px;
                height: 32px;
                display: block;
                border-radius: 50%;
            }
            
            .pixel-character.housewife::before {
                content: '';
                background-image: url('${this.generatePlaceholderURL({category: 'character', width: 60, height: 60, seed: 'housewife'})}');
                background-size: cover;
                background-position: center;
                width: 32px;
                height: 32px;
                display: block;
                border-radius: 50%;
            }
            
            .pixel-character.newcomer::before {
                content: '';
                background-image: url('${this.generatePlaceholderURL({category: 'character', width: 60, height: 60, seed: 'newcomer'})}');
                background-size: cover;
                background-position: center;
                width: 32px;
                height: 32px;
                display: block;
                border-radius: 50%;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 画像要素を作成
     */
    createImageElement({category, width, height, alt, className, seed}) {
        const img = document.createElement('img');
        
        // 遅延読み込み用のdata属性を設定
        img.dataset.src = this.generatePlaceholderURL({category, width, height, seed});
        img.alt = alt;
        img.className = `lazy-image ${className}`;
        
        // レスポンシブ対応
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        
        // 読み込み中のスタイル
        img.style.backgroundColor = `#${this.categories[category]?.color || 'E0E0E0'}20`;
        img.style.border = `2px solid #${this.categories[category]?.color || 'E0E0E0'}`;
        img.style.borderRadius = '8px';
        
        // Intersection Observerに登録
        if (this.imageObserver) {
            this.imageObserver.observe(img);
        } else {
            this.loadImage(img);
        }
        
        return img;
    }

    /**
     * プレースホルダー画像URLを生成
     */
    generatePlaceholderURL({category, width, height, seed}) {
        // Lorem Picsumを使用した高品質なプレースホルダー画像
        const baseURL = `${this.placeholderAPI}/${width}/${height}`;
        const seedParam = seed ? `?random=${this.hashCode(seed)}` : `?random=${Date.now()}`;
        return baseURL + seedParam;
    }

    /**
     * 文字列からシードを生成
     */
    generateSeed(text) {
        return text.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    /**
     * 文字列のハッシュコードを生成
     */
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 32bit整数に変換
        }
        return Math.abs(hash);
    }

    /**
     * 画像の実際の読み込み
     */
    loadImage(img) {
        const src = img.dataset.src || img.src;
        if (!src) return;

        // 新しい画像オブジェクトで読み込みテスト
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.style.backgroundColor = 'transparent';
            img.style.border = 'none';
        };
        
        imageLoader.onerror = () => {
            this.handleImageError(img);
        };
        
        imageLoader.src = src;
    }

    /**
     * 全画像の即座読み込み（フォールバック）
     */
    loadAllImages() {
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(img => this.loadImage(img));
    }

    /**
     * 画像読み込みエラーの処理
     */
    setupImageErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target);
            }
        }, true);
    }

    handleImageError(img) {
        // エラー時のフォールバック画像
        const category = this.getCategoryFromClassName(img.className);
        const color = this.categories[category]?.color || 'E0E0E0';
        
        // SVGでシンプルなアイコンを生成
        const svgIcon = this.generateSVGIcon(category, color);
        img.src = `data:image/svg+xml;base64,${btoa(svgIcon)}`;
        img.classList.add('error-fallback');
    }

    getCategoryFromClassName(className) {
        if (className.includes('product')) return 'appliance';
        if (className.includes('article')) return 'article';
        if (className.includes('character')) return 'character';
        return 'appliance';
    }

    generateSVGIcon(category, color) {
        const icons = {
            'humidifier': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
            'air-purifier': '<path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-3H18V6c0-3.31-2.69-6-6-6S6 2.69 6 6v2H3.5c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5H5v7c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-7h1.5c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5z"/>',
            'article': '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
            'character': '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
            'appliance': '<path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-3H18V6c0-3.31-2.69-6-6-6S6 2.69 6 6v2H3.5c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5H5v7c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-7h1.5c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5z"/>'
        };

        const iconPath = icons[category] || icons['appliance'];
        
        return `
            <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#${color}20"/>
                <g transform="translate(12, 12)">
                    <g transform="translate(-12, -12)">
                        ${iconPath}
                    </g>
                </g>
            </svg>
        `;
    }

    /**
     * レスポンシブ画像の設定
     */
    setupResponsiveImages() {
        // ウィンドウリサイズ時の対応
        window.addEventListener('resize', this.debounce(() => {
            this.updateImageSizes();
        }, 250));
    }

    updateImageSizes() {
        const images = document.querySelectorAll('.lazy-image');
        images.forEach(img => {
            const container = img.parentElement;
            const containerWidth = container.offsetWidth;
            
            // コンテナに合わせて画像サイズを調整
            if (containerWidth < 300) {
                img.style.maxWidth = '100%';
            }
        });
    }

    /**
     * デバウンス関数
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// 画像システムのCSSスタイル
const imageSystemCSS = `
    .lazy-image {
        transition: all 0.3s ease;
        opacity: 0.7;
    }
    
    .lazy-image.loaded {
        opacity: 1;
    }
    
    .lazy-image.error-fallback {
        opacity: 0.8;
        background-color: #f5f5f5;
    }
    
    /* 商品画像のスタイル */
    .product-image-placeholder {
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        object-fit: cover;
    }
    
    /* 記事画像のスタイル */
    .article-image-placeholder {
        border-radius: 8px;
        object-fit: cover;
    }
    
    /* レスポンシブ対応 */
    @media (max-width: 768px) {
        .product-image-placeholder,
        .article-image-placeholder {
            height: auto;
            min-height: 150px;
        }
    }
    
    /* 読み込み中のアニメーション */
    .lazy-image:not(.loaded) {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
`;

// CSSを追加
const styleSheet = document.createElement('style');
styleSheet.textContent = imageSystemCSS;
document.head.appendChild(styleSheet);

// グローバルで画像システムを初期化
window.imageSystem = new ImageSystem();

// エクスポート（ES6モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageSystem;
}