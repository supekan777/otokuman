// レビューページ専用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeReviewPage();
    initializeImageGallery();
    initializeRatingAnimations();
    initializeSocialShare();
    initializeScrollProgress();
    initializeTableOfContents();
});

// レビューページの初期化
function initializeReviewPage() {
    // アフィリエイトリンクの追跡強化
    const affiliateLinks = document.querySelectorAll('.affiliate-link');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.dataset.platform || 'unknown';
            const productName = document.querySelector('.product-title').textContent;
            const price = document.querySelector('.current-price').textContent;
            
            // レビューページでのクリック追跡
            trackReviewPageClick(productName, platform, price, 'affiliate_link');
            
            // GTMイベント送信
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'affiliate_click',
                    'product_name': productName,
                    'platform': platform,
                    'price': price,
                    'page_type': 'review'
                });
            }
        });
    });
    
    // シェアボタンの機能
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            shareContent(platform);
        });
    });
}

// 画像ギャラリーの初期化
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImage = document.querySelector('.main-image .placeholder-image');
    
    if (!thumbnails.length || !mainImage) return;
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // サムネイルのアクティブ状態更新
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // メイン画像の更新（デモ用）
            mainImage.textContent = this.textContent;
            
            // 画像切り替えアニメーション
            mainImage.style.opacity = '0.5';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 200);
            
            // 画像切り替えの追跡
            trackImageSwitch(index);
        });
    });
}

// 評価アニメーションの初期化
function initializeRatingAnimations() {
    const ratingBars = document.querySelectorAll('.rating-fill');
    
    // Intersection Observer で評価バーをアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    ratingBars.forEach(bar => observer.observe(bar));
    
    // 総合評価の数字アニメーション
    const ratingNumber = document.querySelector('.rating-number');
    if (ratingNumber) {
        observer.observe(ratingNumber);
        
        const finalRating = parseFloat(ratingNumber.textContent);
        let currentRating = 0;
        const increment = finalRating / 30; // 30フレームでアニメーション
        
        const animateRating = () => {
            if (currentRating < finalRating) {
                currentRating += increment;
                ratingNumber.textContent = Math.min(currentRating, finalRating).toFixed(1);
                requestAnimationFrame(animateRating);
            } else {
                ratingNumber.textContent = finalRating.toFixed(1);
            }
        };
        
        // 要素が表示されたときにアニメーション開始
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => animateRating(), 500);
                    ratingObserver.unobserve(entry.target);
                }
            });
        });
        
        ratingObserver.observe(ratingNumber);
    }
}

// ソーシャルシェア機能
function initializeSocialShare() {
    window.shareContent = function(platform) {
        const url = window.location.href;
        const title = document.querySelector('.product-title').textContent;
        const text = `${title}のレビューをチェック！`;
        
        let shareUrl = '';
        
        switch(platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'line':
                shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            trackSocialShare(platform, title);
        }
    };
}

// スクロール進捗表示
function initializeScrollProgress() {
    // プログレスバーを作成
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // スクロール時の進捗更新
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

// 目次の動的生成とスムーススクロール
function initializeTableOfContents() {
    const tocItems = document.querySelectorAll('.toc-item');
    
    tocItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // ヘッダー分のオフセット
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 目次クリックの追跡
                trackTOCClick(targetId);
            }
        });
    });
    
    // アクティブセクションのハイライト
    const sections = document.querySelectorAll('[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                
                // 目次のアクティブ状態更新
                tocItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

// レビューページ専用の追跡関数
function trackReviewPageClick(productName, platform, price, elementType) {
    const clickData = {
        product: productName,
        platform: platform,
        price: price,
        element_type: elementType,
        page_type: 'review',
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
    
    // ローカルストレージに記録
    const clicks = JSON.parse(localStorage.getItem('review_page_clicks') || '[]');
    clicks.push(clickData);
    localStorage.setItem('review_page_clicks', JSON.stringify(clicks));
    
    console.log('Review page click tracked:', clickData);
}

function trackImageSwitch(imageIndex) {
    const switchData = {
        image_index: imageIndex,
        product: document.querySelector('.product-title').textContent,
        timestamp: new Date().toISOString()
    };
    
    const switches = JSON.parse(localStorage.getItem('image_switches') || '[]');
    switches.push(switchData);
    localStorage.setItem('image_switches', JSON.stringify(switches));
    
    console.log('Image switch tracked:', switchData);
}

function trackSocialShare(platform, title) {
    const shareData = {
        platform: platform,
        product: title,
        url: window.location.href,
        timestamp: new Date().toISOString()
    };
    
    const shares = JSON.parse(localStorage.getItem('social_shares') || '[]');
    shares.push(shareData);
    localStorage.setItem('social_shares', JSON.stringify(shares));
    
    console.log('Social share tracked:', shareData);
}

function trackTOCClick(sectionId) {
    const tocData = {
        section: sectionId,
        product: document.querySelector('.product-title').textContent,
        timestamp: new Date().toISOString()
    };
    
    const tocClicks = JSON.parse(localStorage.getItem('toc_clicks') || '[]');
    tocClicks.push(tocData);
    localStorage.setItem('toc_clicks', JSON.stringify(tocClicks));
    
    console.log('TOC click tracked:', tocData);
}

// 読了時間の計算と表示
function calculateReadTime() {
    const content = document.querySelector('.main').textContent;
    const wordsPerMinute = 400; // 日本語の場合の目安
    const wordCount = content.length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    
    return readTime;
}

// ページ滞在時間の追跡
let pageStartTime = Date.now();
let maxScrollDepth = 0;

window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);
});

window.addEventListener('beforeunload', function() {
    const timeSpent = Date.now() - pageStartTime;
    
    const engagementData = {
        product: document.querySelector('.product-title').textContent,
        time_spent: timeSpent,
        max_scroll_depth: maxScrollDepth,
        page_type: 'review',
        timestamp: new Date().toISOString()
    };
    
    // ローカルストレージに記録
    const engagement = JSON.parse(localStorage.getItem('page_engagement') || '[]');
    engagement.push(engagementData);
    localStorage.setItem('page_engagement', JSON.stringify(engagement));
});

// 比較表のレスポンシブ対応
function initializeResponsiveTable() {
    const table = document.querySelector('.comparison-table');
    if (!table) return;
    
    // テーブルをスクロール可能にする
    const tableContainer = table.parentElement;
    
    // スクロールヒントの表示
    if (table.offsetWidth > tableContainer.offsetWidth) {
        const scrollHint = document.createElement('div');
        scrollHint.textContent = '← スクロールして他の項目を確認 →';
        scrollHint.style.cssText = `
            text-align: center;
            color: #666;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            animation: pulse 2s infinite;
        `;
        tableContainer.appendChild(scrollHint);
        
        // スクロール時にヒントを非表示
        tableContainer.addEventListener('scroll', function() {
            scrollHint.style.display = 'none';
        }, { once: true });
    }
}

// CTA効果測定
function initializeCTATracking() {
    const ctaButtons = document.querySelectorAll('.final-cta .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const store = this.closest('.store-price').querySelector('.store-name').textContent;
            const price = this.closest('.store-price').querySelector('.price').textContent;
            
            trackCTAClick(store, price);
        });
    });
}

function trackCTAClick(store, price) {
    const ctaData = {
        store: store,
        price: price,
        product: document.querySelector('.product-title').textContent,
        position: 'final_cta',
        timestamp: new Date().toISOString()
    };
    
    const ctaClicks = JSON.parse(localStorage.getItem('cta_clicks') || '[]');
    ctaClicks.push(ctaData);
    localStorage.setItem('cta_clicks', JSON.stringify(ctaClicks));
    
    console.log('CTA click tracked:', ctaData);
}

// 初期化時にCTA追跡も実行
document.addEventListener('DOMContentLoaded', function() {
    initializeResponsiveTable();
    initializeCTATracking();
});

// デバッグ用関数（開発時のみ）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.ReviewPageDebug = {
        getReviewClicks: () => JSON.parse(localStorage.getItem('review_page_clicks') || '[]'),
        getImageSwitches: () => JSON.parse(localStorage.getItem('image_switches') || '[]'),
        getSocialShares: () => JSON.parse(localStorage.getItem('social_shares') || '[]'),
        getTOCClicks: () => JSON.parse(localStorage.getItem('toc_clicks') || '[]'),
        getPageEngagement: () => JSON.parse(localStorage.getItem('page_engagement') || '[]'),
        getCTAClicks: () => JSON.parse(localStorage.getItem('cta_clicks') || '[]'),
        clearAllData: () => {
            localStorage.removeItem('review_page_clicks');
            localStorage.removeItem('image_switches');
            localStorage.removeItem('social_shares');
            localStorage.removeItem('toc_clicks');
            localStorage.removeItem('page_engagement');
            localStorage.removeItem('cta_clicks');
            console.log('All review page data cleared');
        }
    };
}