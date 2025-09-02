/**
 * Google Analytics・Search Console設定
 * 失敗しないお得マン！
 */

// Google Analytics設定
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // 実際のMeasurement IDに置き換えてください
const GSC_VERIFICATION_CODE = 'your-google-search-console-verification-code'; // Search Console認証コードに置き換えてください

/**
 * Google Analytics 4 (gtag) の初期化
 */
function initGoogleAnalytics() {
    // Google Analytics スクリプトの読み込み
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gtagScript);

    // gtag設定スクリプト
    const gtagConfig = document.createElement('script');
    gtagConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            // プライバシー設定
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
    `;
    document.head.appendChild(gtagConfig);
}

/**
 * Google Search Console認証メタタグの追加
 */
function addSearchConsoleVerification() {
    // 既存の認証メタタグがあるかチェック
    const existingMeta = document.querySelector('meta[name="google-site-verification"]');
    
    if (!existingMeta && GSC_VERIFICATION_CODE !== 'your-google-search-console-verification-code') {
        const meta = document.createElement('meta');
        meta.name = 'google-site-verification';
        meta.content = GSC_VERIFICATION_CODE;
        document.head.appendChild(meta);
    }
}

/**
 * カスタムイベントトラッキング
 */
function trackCustomEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: parameters.category || 'engagement',
            event_label: parameters.label || '',
            value: parameters.value || 0,
            ...parameters
        });
    }
}

/**
 * ページビュートラッキング（SPA用）
 */
function trackPageView(pageTitle, pageLocation) {
    if (typeof gtag !== 'undefined') {
        gtag('config', GA_MEASUREMENT_ID, {
            page_title: pageTitle,
            page_location: pageLocation
        });
    }
}

/**
 * スクロール深度トラッキング
 */
function initScrollTracking() {
    let scrollThresholds = [25, 50, 75, 90];
    let trackedThresholds = [];

    function trackScrollDepth() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        scrollThresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !trackedThresholds.includes(threshold)) {
                trackedThresholds.push(threshold);
                trackCustomEvent('scroll_depth', {
                    category: 'engagement',
                    label: `${threshold}%`,
                    value: threshold
                });
            }
        });
    }

    window.addEventListener('scroll', throttle(trackScrollDepth, 1000));
}

/**
 * 記事読了トラッキング
 */
function initReadingTimeTracking() {
    let startTime = Date.now();
    let isArticlePage = document.querySelector('.article-content') !== null;
    
    if (!isArticlePage) return;

    // 記事読了判定（90%スクロール + 最低30秒滞在）
    let hasScrolled90 = false;
    let minTimeSpent = false;

    setTimeout(() => {
        minTimeSpent = true;
        checkReadingCompletion();
    }, 30000); // 30秒

    function checkScrollProgress() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent >= 90) {
            hasScrolled90 = true;
            checkReadingCompletion();
        }
    }

    function checkReadingCompletion() {
        if (hasScrolled90 && minTimeSpent) {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            trackCustomEvent('article_read_completion', {
                category: 'content',
                label: document.title,
                value: timeSpent
            });
        }
    }

    window.addEventListener('scroll', throttle(checkScrollProgress, 1000));
}

/**
 * 外部リンククリックトラッキング
 */
function initExternalLinkTracking() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            const currentDomain = window.location.hostname;
            const linkDomain = new URL(link.href).hostname;
            
            // 外部リンクかチェック
            if (linkDomain !== currentDomain) {
                trackCustomEvent('click_external_link', {
                    category: 'outbound',
                    label: link.href,
                    value: 1
                });
            }
            
            // アフィリエイトリンクのトラッキング
            if (link.href.includes('amazon.co.jp') || 
                link.href.includes('rakuten.co.jp') ||
                link.href.includes('affiliate')) {
                trackCustomEvent('click_affiliate_link', {
                    category: 'monetization',
                    label: link.href,
                    value: 1
                });
            }
        }
    });
}

/**
 * 検索クエリトラッキング（サイト内検索）
 */
function initSearchTracking() {
    const searchInputs = document.querySelectorAll('input[type="search"], .search-input, #search');
    
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                trackCustomEvent('site_search', {
                    category: 'search',
                    label: this.value.trim(),
                    value: 1
                });
            }
        });
    });
}

/**
 * フォーム送信トラッキング
 */
function initFormTracking() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const formName = this.id || this.className || 'unknown_form';
            trackCustomEvent('form_submission', {
                category: 'engagement',
                label: formName,
                value: 1
            });
        });
    });
}

/**
 * エラートラッキング
 */
function initErrorTracking() {
    window.addEventListener('error', function(e) {
        trackCustomEvent('javascript_error', {
            category: 'error',
            label: `${e.filename}:${e.lineno} - ${e.message}`,
            value: 1
        });
    });
}

/**
 * パフォーマンストラッキング
 */
function initPerformanceTracking() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                const loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
                
                trackCustomEvent('page_load_time', {
                    category: 'performance',
                    label: 'load_time_ms',
                    value: loadTime
                });
                
                // Core Web Vitals
                if ('web-vital' in window) {
                    getCLS(metric => trackWebVital('CLS', metric.value));
                    getFID(metric => trackWebVital('FID', metric.value));
                    getFCP(metric => trackWebVital('FCP', metric.value));
                    getLCP(metric => trackWebVital('LCP', metric.value));
                    getTTFB(metric => trackWebVital('TTFB', metric.value));
                }
            }
        }, 0);
    });
}

function trackWebVital(name, value) {
    trackCustomEvent('web_vital', {
        category: 'performance',
        label: name,
        value: Math.round(value * 1000) // ミリ秒に変換
    });
}

/**
 * ユーティリティ関数: スロットル
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * Cookie同意管理
 */
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookie_consent');
    
    if (!cookieConsent) {
        showCookieConsentBanner();
    } else if (cookieConsent === 'accepted') {
        initGoogleAnalytics();
    }
}

function showCookieConsentBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
        <div style="
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #2c3e50;
            color: white;
            padding: 1rem;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
        ">
            <div>
                <p style="margin: 0; font-size: 0.9rem;">
                    当サイトではユーザー体験向上のためCookieを使用しています。
                    <a href="/pages/privacy-policy.html" style="color: #3498db;">詳細はプライバシーポリシーをご確認ください。</a>
                </p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="cookie-accept" style="
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                ">同意する</button>
                <button id="cookie-decline" style="
                    background: #e74c3c;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                ">拒否する</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    document.getElementById('cookie-accept').addEventListener('click', function() {
        localStorage.setItem('cookie_consent', 'accepted');
        banner.remove();
        initGoogleAnalytics();
    });
    
    document.getElementById('cookie-decline').addEventListener('click', function() {
        localStorage.setItem('cookie_consent', 'declined');
        banner.remove();
    });
}

/**
 * 初期化関数
 */
function initAnalytics() {
    // Search Console認証の追加
    addSearchConsoleVerification();
    
    // Cookie同意管理
    initCookieConsent();
    
    // 各種トラッキング機能の初期化
    document.addEventListener('DOMContentLoaded', function() {
        initScrollTracking();
        initReadingTimeTracking();
        initExternalLinkTracking();
        initSearchTracking();
        initFormTracking();
        initErrorTracking();
        initPerformanceTracking();
    });
}

// システム初期化
initAnalytics();

// グローバル関数としてエクスポート
window.trackCustomEvent = trackCustomEvent;
window.trackPageView = trackPageView;