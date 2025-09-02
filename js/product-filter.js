// 商品フィルター・ソート機能

document.addEventListener('DOMContentLoaded', function() {
    initializeProductFilters();
    initializeViewToggle();
    initializePagination();
});

// フィルター機能の初期化
function initializeProductFilters() {
    const priceFilter = document.getElementById('priceFilter');
    const typeFilter = document.getElementById('typeFilter');
    const roomSizeFilter = document.getElementById('roomSizeFilter');
    const sortSelect = document.getElementById('sortSelect');
    
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);
    if (typeFilter) typeFilter.addEventListener('change', applyFilters);
    if (roomSizeFilter) roomSizeFilter.addEventListener('change', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applySorting);
    
    // 初期状態での商品数表示
    updateProductCount();
}

// フィルター適用
function applyFilters() {
    const priceRange = document.getElementById('priceFilter').value;
    const type = document.getElementById('typeFilter').value;
    const roomSize = document.getElementById('roomSizeFilter').value;
    
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        let shouldShow = true;
        
        // 価格フィルター
        if (priceRange && !checkPriceRange(card, priceRange)) {
            shouldShow = false;
        }
        
        // タイプフィルター
        if (type && card.dataset.type !== type) {
            shouldShow = false;
        }
        
        // 部屋サイズフィルター
        if (roomSize && card.dataset.room !== roomSize) {
            shouldShow = false;
        }
        
        // 表示/非表示の切り替え
        if (shouldShow) {
            card.style.display = '';
            visibleCount++;
            // フェードインアニメーション
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });
    
    updateProductCount(visibleCount);
    
    // フィルター適用のトラッキング
    trackFilterUsage(priceRange, type, roomSize);
}

// 価格範囲チェック
function checkPriceRange(card, range) {
    const price = parseInt(card.dataset.price);
    
    switch (range) {
        case 'under5000':
            return price < 5000;
        case '5000-10000':
            return price >= 5000 && price <= 10000;
        case '10000-20000':
            return price >= 10000 && price <= 20000;
        case 'over20000':
            return price > 20000;
        default:
            return true;
    }
}

// ソート適用
function applySorting() {
    const sortType = document.getElementById('sortSelect').value;
    const productsContainer = document.getElementById('productsContainer');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    // 現在表示されている商品のみをソート
    const visibleCards = productCards.filter(card => card.style.display !== 'none');
    
    visibleCards.sort((a, b) => {
        switch (sortType) {
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'rating':
                return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
            case 'new':
                // 新着順（デモ用にランダム）
                return Math.random() - 0.5;
            case 'recommended':
            default:
                // おすすめ順（元の順序を維持）
                return 0;
        }
    });
    
    // ソート後の順序で再配置
    visibleCards.forEach(card => {
        productsContainer.appendChild(card);
    });
    
    // ソートアニメーション
    visibleCards.forEach((card, index) => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0.7';
        setTimeout(() => {
            card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, index * 50);
    });
    
    // ソート使用のトラッキング
    trackSortUsage(sortType);
}

// フィルターリセット
function resetFilters() {
    document.getElementById('priceFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('roomSizeFilter').value = '';
    document.getElementById('sortSelect').value = 'recommended';
    
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    updateProductCount();
    
    // リセットのトラッキング
    trackFilterReset();
}

// 表示切り替え（グリッド/リスト）
function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const viewType = this.dataset.view;
            
            // アクティブ状態の更新
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // グリッドクラスの切り替え
            if (viewType === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
            
            // 表示切り替えのトラッキング
            trackViewToggle(viewType);
        });
    });
}

// ページネーション
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageNumber = this.textContent;
            
            // アクティブ状態の更新
            pageButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // ページ切り替えアニメーション
            const productsGrid = document.querySelector('.products-grid');
            productsGrid.style.opacity = '0.5';
            productsGrid.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                // 実際のページ切り替え処理をここに実装
                loadPage(pageNumber);
                
                productsGrid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                productsGrid.style.opacity = '1';
                productsGrid.style.transform = 'translateY(0)';
            }, 200);
            
            // ページ切り替えのトラッキング
            trackPageNavigation(pageNumber);
        });
    });
}

// ページ読み込み（デモ用）
function loadPage(pageNumber) {
    console.log(`Loading page ${pageNumber}`);
    // 実際の実装では、APIからデータを取得して商品を表示
}

// 商品数の更新
function updateProductCount(visibleCount = null) {
    const totalProducts = document.querySelectorAll('.product-card').length;
    const displayCount = visibleCount !== null ? visibleCount : totalProducts;
    
    // 商品数表示の更新（要素があれば）
    const countElement = document.querySelector('.product-count');
    if (countElement) {
        countElement.textContent = `${displayCount}件中 1-${Math.min(displayCount, 6)}件を表示`;
    }
    
    // セクションタイトルの更新
    const sectionTitle = document.querySelector('.section-header h2');
    if (sectionTitle && visibleCount !== null) {
        sectionTitle.textContent = `おすすめ加湿器一覧 (${displayCount}件)`;
    }
}

// 商品カードのインタラクション強化
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // カードクリックで詳細ページへ
        card.addEventListener('click', function(e) {
            // ボタンクリック時は除外
            if (e.target.closest('.btn') || e.target.closest('.affiliate-link')) {
                return;
            }
            
            const detailLink = this.querySelector('.btn-primary');
            if (detailLink) {
                window.location.href = detailLink.href;
            }
        });
        
        // ホバー効果の強化
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.querySelector('.product-image').style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.product-image').style.transform = 'scale(1)';
        });
    });
    
    // アフィリエイトリンクのクリック追跡
    const affiliateLinks = document.querySelectorAll('.affiliate-link');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const platform = this.dataset.platform || this.textContent.trim();
            const price = productCard.dataset.price;
            
            // アフィリエイトクリックの記録
            trackAffiliateClick(productName, platform, price);
            
            // 外部リンクの場合は新しいタブで開く
            if (this.href && !this.href.includes(window.location.hostname)) {
                e.preventDefault();
                window.open(this.href, '_blank', 'noopener,noreferrer');
            }
        });
    });
});

// トラッキング関数群
function trackFilterUsage(priceRange, type, roomSize) {
    const filterData = {
        price: priceRange,
        type: type,
        roomSize: roomSize,
        timestamp: new Date().toISOString()
    };
    
    // ローカルストレージに記録
    const filters = JSON.parse(localStorage.getItem('filter_usage') || '[]');
    filters.push(filterData);
    localStorage.setItem('filter_usage', JSON.stringify(filters));
    
    console.log('Filter applied:', filterData);
}

function trackSortUsage(sortType) {
    const sortData = {
        sortType: sortType,
        timestamp: new Date().toISOString()
    };
    
    const sorts = JSON.parse(localStorage.getItem('sort_usage') || '[]');
    sorts.push(sortData);
    localStorage.setItem('sort_usage', JSON.stringify(sorts));
    
    console.log('Sort applied:', sortData);
}

function trackViewToggle(viewType) {
    const viewData = {
        viewType: viewType,
        timestamp: new Date().toISOString()
    };
    
    const views = JSON.parse(localStorage.getItem('view_toggle') || '[]');
    views.push(viewData);
    localStorage.setItem('view_toggle', JSON.stringify(views));
    
    console.log('View toggled:', viewData);
}

function trackPageNavigation(pageNumber) {
    const navData = {
        page: pageNumber,
        timestamp: new Date().toISOString()
    };
    
    const navigation = JSON.parse(localStorage.getItem('page_navigation') || '[]');
    navigation.push(navData);
    localStorage.setItem('page_navigation', JSON.stringify(navigation));
    
    console.log('Page navigated:', navData);
}

function trackFilterReset() {
    const resetData = {
        action: 'filter_reset',
        timestamp: new Date().toISOString()
    };
    
    const resets = JSON.parse(localStorage.getItem('filter_resets') || '[]');
    resets.push(resetData);
    localStorage.setItem('filter_resets', JSON.stringify(resets));
    
    console.log('Filters reset:', resetData);
}

// 検索機能（将来的な拡張用）
function initializeProductSearch() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value);
        }, 300);
    });
}

function performSearch(query) {
    const productCards = document.querySelectorAll('.product-card');
    const searchTerms = query.toLowerCase().split(' ');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productBrand = card.querySelector('.product-brand').textContent.toLowerCase();
        const searchText = `${productName} ${productBrand}`;
        
        const matches = searchTerms.every(term => searchText.includes(term));
        
        card.style.display = matches ? '' : 'none';
    });
    
    // 検索のトラッキング
    trackSearch(query);
}

function trackSearch(query) {
    const searchData = {
        query: query,
        timestamp: new Date().toISOString()
    };
    
    const searches = JSON.parse(localStorage.getItem('product_searches') || '[]');
    searches.push(searchData);
    localStorage.setItem('product_searches', JSON.stringify(searches));
    
    console.log('Search performed:', searchData);
}

// デバッグ用関数（開発時のみ）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.ProductPageDebug = {
        getFilterUsage: () => JSON.parse(localStorage.getItem('filter_usage') || '[]'),
        getSortUsage: () => JSON.parse(localStorage.getItem('sort_usage') || '[]'),
        getViewToggle: () => JSON.parse(localStorage.getItem('view_toggle') || '[]'),
        getPageNavigation: () => JSON.parse(localStorage.getItem('page_navigation') || '[]'),
        clearAllData: () => {
            localStorage.removeItem('filter_usage');
            localStorage.removeItem('sort_usage');
            localStorage.removeItem('view_toggle');
            localStorage.removeItem('page_navigation');
            localStorage.removeItem('filter_resets');
            localStorage.removeItem('product_searches');
            console.log('All product page data cleared');
        }
    };
}