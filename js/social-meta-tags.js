/**
 * ソーシャルメディアタグ（OGP、Twitter Card）自動生成システム
 * 失敗しないお得マン！
 */

class SocialMetaTags {
    constructor() {
        this.siteData = {
            siteName: '失敗しないお得マン！',
            siteUrl: 'https://shippai-shinai-otokuman.com',
            description: '家電製品の詳細レビュー・比較・ランキングを掲載する専門サイト。実際の使用感と専門的な評価で、あなたの家電選びをサポートします。',
            image: 'https://shippai-shinai-otokuman.com/images/og-image.jpg',
            twitterHandle: '@otokuman_kaden',
            locale: 'ja_JP'
        };
        
        this.pageData = this.getPageData();
        this.init();
    }

    init() {
        this.generateOGPTags();
        this.generateTwitterCardTags();
        this.generateFacebookTags();
        this.generateLINETags();
        this.generateGenericMetaTags();
    }

    /**
     * ページ固有のデータを取得
     */
    getPageData() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        // ページタイトルを取得
        const titleElement = document.querySelector('title');
        const title = titleElement ? titleElement.textContent.trim() : this.siteData.siteName;
        
        // メタディスクリプションを取得
        const descElement = document.querySelector('meta[name="description"]');
        const description = descElement ? descElement.getAttribute('content') : this.siteData.description;
        
        // ページタイプを判定
        let pageType = 'website';
        let section = 'home';
        let image = this.siteData.image;
        
        if (path.includes('/articles/')) {
            pageType = 'article';
            section = 'article';
            if (path.includes('humidifier')) {
                section = 'humidifier';
                image = 'https://shippai-shinai-otokuman.com/images/og-humidifier.jpg';
            } else if (path.includes('air-purifier')) {
                section = 'air-purifier';
                image = 'https://shippai-shinai-otokuman.com/images/og-air-purifier.jpg';
            }
        } else if (path.includes('/pages/')) {
            if (path.includes('humidifier')) {
                section = 'humidifier';
                image = 'https://shippai-shinai-otokuman.com/images/og-humidifier-category.jpg';
            } else if (path.includes('air-purifier')) {
                section = 'air-purifier';
                image = 'https://shippai-shinai-otokuman.com/images/og-air-purifier-category.jpg';
            }
        }

        // 記事の場合は公開日を取得
        let publishedTime = null;
        let modifiedTime = null;
        
        if (pageType === 'article' && window.articleDates) {
            const dateInfo = window.articleDates[filename];
            if (dateInfo) {
                publishedTime = dateInfo.created;
                modifiedTime = dateInfo.lastModified;
            }
        }

        return {
            title: title,
            description: description,
            url: this.siteData.siteUrl + path,
            image: image,
            pageType: pageType,
            section: section,
            publishedTime: publishedTime,
            modifiedTime: modifiedTime
        };
    }

    /**
     * OGP (Open Graph Protocol) タグを生成
     */
    generateOGPTags() {
        const ogTags = {
            'og:type': this.pageData.pageType,
            'og:title': this.pageData.title,
            'og:description': this.pageData.description,
            'og:url': this.pageData.url,
            'og:site_name': this.siteData.siteName,
            'og:locale': this.siteData.locale,
            'og:image': this.pageData.image,
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:alt': this.pageData.title + ' - ' + this.siteData.siteName
        };

        // 記事の場合は追加情報
        if (this.pageData.pageType === 'article') {
            ogTags['article:published_time'] = this.pageData.publishedTime;
            ogTags['article:modified_time'] = this.pageData.modifiedTime;
            ogTags['article:author'] = 'お得マン編集部';
            ogTags['article:section'] = this.pageData.section;
            
            // タグの追加
            if (this.pageData.section === 'humidifier') {
                ogTags['article:tag'] = '加湿器,家電,レビュー,おすすめ';
            } else if (this.pageData.section === 'air-purifier') {
                ogTags['article:tag'] = '空気清浄機,家電,レビュー,おすすめ';
            }
        }

        this.insertMetaTags(ogTags, 'property');
    }

    /**
     * Twitter Card タグを生成
     */
    generateTwitterCardTags() {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:site': this.siteData.twitterHandle,
            'twitter:creator': this.siteData.twitterHandle,
            'twitter:title': this.pageData.title.length > 70 ? 
                this.pageData.title.substring(0, 67) + '...' : 
                this.pageData.title,
            'twitter:description': this.pageData.description.length > 200 ?
                this.pageData.description.substring(0, 197) + '...' :
                this.pageData.description,
            'twitter:image': this.pageData.image,
            'twitter:image:alt': this.pageData.title + ' - ' + this.siteData.siteName,
            'twitter:url': this.pageData.url
        };

        this.insertMetaTags(twitterTags, 'name');
    }

    /**
     * Facebook専用タグを生成
     */
    generateFacebookTags() {
        const fbTags = {
            'fb:app_id': 'YOUR_FACEBOOK_APP_ID', // 実際のFacebook App IDに置き換え
            'og:see_also': this.siteData.siteUrl
        };

        this.insertMetaTags(fbTags, 'property');
    }

    /**
     * LINE専用タグを生成
     */
    generateLINETags() {
        // LINEは基本的にOGPタグを使用するが、追加で設定
        const lineTags = {
            'line:card': 'summary_large_image'
        };

        this.insertMetaTags(lineTags, 'name');
    }

    /**
     * 一般的なメタタグを生成
     */
    generateGenericMetaTags() {
        const genericTags = {
            'keywords': this.generateKeywords(),
            'author': 'お得マン編集部',
            'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            'googlebot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            'referrer': 'strict-origin-when-cross-origin',
            'format-detection': 'telephone=no, email=no, address=no',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'application-name': this.siteData.siteName,
            'apple-mobile-web-app-title': this.siteData.siteName,
            'theme-color': '#3498db',
            'msapplication-TileColor': '#3498db',
            'msapplication-navbutton-color': '#3498db',
            'apple-mobile-web-app-status-bar-style': 'black-translucent'
        };

        this.insertMetaTags(genericTags, 'name');
    }

    /**
     * キーワードを生成
     */
    generateKeywords() {
        const baseKeywords = ['家電', 'レビュー', 'おすすめ', '比較', '失敗しない', 'お得マン'];
        
        if (this.pageData.section === 'humidifier') {
            baseKeywords.push('加湿器', '乾燥対策', '超音波式', '気化式', 'スチーム式');
        } else if (this.pageData.section === 'air-purifier') {
            baseKeywords.push('空気清浄機', 'HEPA', '花粉', 'PM2.5', 'ウイルス対策');
        }
        
        return baseKeywords.join(', ');
    }

    /**
     * メタタグをHTMLに挿入
     */
    insertMetaTags(tags, attributeType) {
        Object.entries(tags).forEach(([name, content]) => {
            if (!content) return;

            // 既存のタグを削除
            const existingTag = document.querySelector(`meta[${attributeType}="${name}"]`);
            if (existingTag) {
                existingTag.remove();
            }

            // 新しいタグを作成・挿入
            const meta = document.createElement('meta');
            meta.setAttribute(attributeType, name);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        });
    }

    /**
     * プリロードタグの追加（パフォーマンス向上）
     */
    addPreloadTags() {
        // 重要なリソースのプリロード
        const preloadResources = [
            { href: '/css/style.css', as: 'style' },
            { href: '/js/main.js', as: 'script' },
            { href: this.pageData.image, as: 'image' }
        ];

        preloadResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    /**
     * 正規URLの設定
     */
    addCanonicalTag() {
        // 既存のcanonicalタグを削除
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }

        // 新しいcanonicalタグを追加
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = this.pageData.url;
        document.head.appendChild(canonical);
    }

    /**
     * 代替URLの設定（多言語対応の準備）
     */
    addAlternateLinks() {
        // 将来の多言語対応用
        const alternates = [
            { hreflang: 'ja', href: this.pageData.url },
            { hreflang: 'x-default', href: this.pageData.url }
        ];

        alternates.forEach(alt => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = alt.hreflang;
            link.href = alt.href;
            document.head.appendChild(link);
        });
    }

    /**
     * JSON-LD WebPage情報の追加
     */
    addWebPageStructuredData() {
        const webPageData = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': this.pageData.url,
            'url': this.pageData.url,
            'name': this.pageData.title,
            'description': this.pageData.description,
            'image': this.pageData.image,
            'inLanguage': 'ja-JP',
            'isPartOf': {
                '@type': 'WebSite',
                '@id': this.siteData.siteUrl + '#website',
                'name': this.siteData.siteName,
                'url': this.siteData.siteUrl
            },
            'primaryImageOfPage': {
                '@type': 'ImageObject',
                'url': this.pageData.image,
                'width': 1200,
                'height': 630
            },
            'datePublished': this.pageData.publishedTime || '2025-08-22',
            'dateModified': this.pageData.modifiedTime || new Date().toISOString().split('T')[0],
            'breadcrumb': this.generateBreadcrumbStructuredData()
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(webPageData, null, 2);
        document.head.appendChild(script);
    }

    /**
     * パンくずリストの構造化データ生成
     */
    generateBreadcrumbStructuredData() {
        const path = window.location.pathname;
        const breadcrumbs = [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'ホーム',
                'item': this.siteData.siteUrl
            }
        ];

        if (path.includes('/articles/')) {
            breadcrumbs.push({
                '@type': 'ListItem',
                'position': 2,
                'name': '記事',
                'item': this.siteData.siteUrl + '/articles/'
            });
            
            if (this.pageData.section === 'humidifier') {
                breadcrumbs.push({
                    '@type': 'ListItem',
                    'position': 3,
                    'name': '加湿器',
                    'item': this.siteData.siteUrl + '/pages/humidifier.html'
                });
            } else if (this.pageData.section === 'air-purifier') {
                breadcrumbs.push({
                    '@type': 'ListItem',
                    'position': 3,
                    'name': '空気清浄機',
                    'item': this.siteData.siteUrl + '/pages/air-purifier.html'
                });
            }
        } else if (path.includes('/pages/')) {
            if (path.includes('humidifier')) {
                breadcrumbs.push({
                    '@type': 'ListItem',
                    'position': 2,
                    'name': '加湿器',
                    'item': this.pageData.url
                });
            } else if (path.includes('air-purifier')) {
                breadcrumbs.push({
                    '@type': 'ListItem',
                    'position': 2,
                    'name': '空気清浄機',
                    'item': this.pageData.url
                });
            }
        }

        return {
            '@type': 'BreadcrumbList',
            'itemListElement': breadcrumbs
        };
    }

    /**
     * ソーシャルシェアボタンの生成
     */
    addSocialShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share';
        shareContainer.innerHTML = `
            <div class="social-share-title">この記事をシェア</div>
            <div class="social-share-buttons">
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(this.pageData.title)}&url=${encodeURIComponent(this.pageData.url)}&via=${encodeURIComponent(this.siteData.twitterHandle.replace('@', ''))}" target="_blank" rel="noopener" class="share-btn twitter">
                    <i class="fab fa-twitter"></i> Twitter
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.pageData.url)}" target="_blank" rel="noopener" class="share-btn facebook">
                    <i class="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(this.pageData.url)}" target="_blank" rel="noopener" class="share-btn line">
                    <i class="fab fa-line"></i> LINE
                </a>
                <a href="javascript:void(0)" onclick="navigator.clipboard.writeText('${this.pageData.url}');alert('URLをコピーしました！')" class="share-btn copy">
                    <i class="fas fa-link"></i> URLコピー
                </a>
            </div>
        `;

        // スタイルを追加
        const style = document.createElement('style');
        style.textContent = `
            .social-share {
                margin: 2rem 0;
                padding: 1.5rem;
                background: #f8f9fa;
                border-radius: 10px;
                text-align: center;
            }
            
            .social-share-title {
                font-weight: bold;
                margin-bottom: 1rem;
                color: #2c3e50;
            }
            
            .social-share-buttons {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .share-btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1rem;
                border-radius: 25px;
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.3s ease;
                color: white;
            }
            
            .share-btn.twitter { background: #1DA1F2; }
            .share-btn.facebook { background: #1877f2; }
            .share-btn.line { background: #00B900; }
            .share-btn.copy { background: #6c757d; }
            
            .share-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                color: white;
            }
            
            @media (max-width: 600px) {
                .social-share-buttons {
                    flex-direction: column;
                    align-items: center;
                }
                
                .share-btn {
                    width: 200px;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);

        // 記事の最後に追加
        const articleContent = document.querySelector('.article-content');
        if (articleContent) {
            articleContent.appendChild(shareContainer);
        }
    }

    /**
     * すべての機能を初期化
     */
    initializeAll() {
        this.generateOGPTags();
        this.generateTwitterCardTags();
        this.generateFacebookTags();
        this.generateLINETags();
        this.generateGenericMetaTags();
        this.addPreloadTags();
        this.addCanonicalTag();
        this.addAlternateLinks();
        this.addWebPageStructuredData();
        
        // 記事ページの場合はシェアボタンも追加
        if (this.pageData.pageType === 'article') {
            this.addSocialShareButtons();
        }
    }
}

// ページ読み込み完了後に実行
document.addEventListener('DOMContentLoaded', () => {
    const socialMeta = new SocialMetaTags();
    socialMeta.initializeAll();
    
    // デバッグ用にグローバル変数に格納
    window.socialMetaTags = socialMeta;
    
    console.log('📱 ソーシャルメディアタグ設定完了');
});

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialMetaTags;
}