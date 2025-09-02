// メインJavaScriptファイル

// DOMContentLoaded時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProductCards();
    initializeCategoryCards();
    initializeNewsletterForm();
    initializeScrollEffects();
    initializeAffiliateTracking();
});

// ナビゲーション機能
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ナビゲーションのアクティブ状態管理
    window.addEventListener('scroll', updateActiveNavigation);
}

// アクティブナビゲーションの更新
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 商品カードの機能
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // ホバー効果の強化
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 商品詳細へのクリック
        const detailButton = card.querySelector('.btn-primary');
        if (detailButton) {
            detailButton.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = card.querySelector('h3').textContent;
                showProductModal(productName);
            });
        }
    });
}

// カテゴリカードの機能
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            if (category) {
                // カテゴリページへの遷移（実装例）
                window.location.href = `pages/${category}.html`;
            }
        });
        
        // アニメーション効果
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ニュースレター登録機能
function initializeNewsletterForm() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();
            if (validateEmail(email)) {
                subscribeNewsletter(email);
            } else {
                showMessage('正しいメールアドレスを入力してください', 'error');
            }
        });
        
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
}

// メール形式の検証
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ニュースレター登録処理
function subscribeNewsletter(email) {
    // 実際の実装では、サーバーにデータを送信
    console.log('Newsletter subscription:', email);
    
    // ローカルストレージに保存（デモ用）
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        showMessage('ニュースレターの登録が完了しました！', 'success');
        document.querySelector('.newsletter-input').value = '';
    } else {
        showMessage('このメールアドレスは既に登録されています', 'info');
    }
}

// メッセージ表示機能
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    // タイプ別の色設定
    switch(type) {
        case 'success':
            messageDiv.style.background = '#10b981';
            break;
        case 'error':
            messageDiv.style.background = '#ef4444';
            break;
        case 'info':
            messageDiv.style.background = '#3b82f6';
            break;
        default:
            messageDiv.style.background = '#6b7280';
    }
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // アニメーション
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動削除
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// スクロール効果の初期化
function initializeScrollEffects() {
    // スクロール時のヘッダー背景変更
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 要素の初期状態とオブザーバーの設定
    const animateElements = document.querySelectorAll('.category-card, .product-card, .article-card, .reason-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// アフィリエイトリンクの追跡
function initializeAffiliateTracking() {
    const affiliateLinks = document.querySelectorAll('.affiliate-link');
    
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const productName = this.closest('.product-card')?.querySelector('h3')?.textContent || 'Unknown Product';
            const platform = this.textContent.trim();
            
            // アフィリエイトクリックの記録
            trackAffiliateClick(productName, platform);
            
            // Google Analytics などの分析ツールにイベント送信
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'affiliate',
                    'event_label': `${productName} - ${platform}`,
                    'value': 1
                });
            }
        });
    });
}

// アフィリエイトクリック追跡
function trackAffiliateClick(productName, platform) {
    const clickData = {
        product: productName,
        platform: platform,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    // ローカルストレージに記録（デモ用）
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push(clickData);
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
    
    console.log('Affiliate click tracked:', clickData);
}

// 商品モーダル表示（デモ用）
function showProductModal(productName) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 16px;
        max-width: 600px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h2 style="margin: 0;">${productName}</h2>
            <button onclick="this.closest('.product-modal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
        </div>
        <p>商品の詳細レビューページに移動します...</p>
        <div style="margin-top: 1.5rem;">
            <button onclick="this.closest('.product-modal').remove()" class="btn btn-primary">閉じる</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // モーダル外クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ユーティリティ関数
const Utils = {
    // 要素の表示/非表示
    toggle: function(element) {
        if (element.style.display === 'none') {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    },
    
    // ローカルストレージのヘルパー
    storage: {
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: function(key, defaultValue = null) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        },
        remove: function(key) {
            localStorage.removeItem(key);
        }
    },
    
    // 日付フォーマット
    formatDate: function(date) {
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },
    
    // 価格フォーマット
    formatPrice: function(price) {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        }).format(price);
    }
};

// デバッグ用（開発時のみ）
if (process?.env?.NODE_ENV === 'development') {
    window.SiteDebug = {
        affiliateClicks: () => Utils.storage.get('affiliate_clicks', []),
        newsletterSubscribers: () => Utils.storage.get('newsletter_subscribers', []),
        clearData: () => {
            Utils.storage.remove('affiliate_clicks');
            Utils.storage.remove('newsletter_subscribers');
            console.log('All data cleared');
        }
    };
}