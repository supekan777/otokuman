// 管理画面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    initializeNavigation();
    initializeCharts();
    initializeModals();
    loadMockData();
});

// 管理画面の初期化
function initializeAdminPanel() {
    // サイドバートグル
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // 現在時刻の表示
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // 1分ごとに更新
}

// ナビゲーションの初期化
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.dataset.section;
            
            // アクティブ状態の更新
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // コンテンツセクションの切り替え
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection + '-section').classList.add('active');
            
            // ページタイトルの更新
            const titles = {
                'dashboard': 'ダッシュボード',
                'products': '商品管理',
                'articles': '記事管理',
                'analytics': '分析・レポート',
                'affiliate': 'アフィリエイト管理',
                'seo': 'SEO管理',
                'settings': '設定'
            };
            
            pageTitle.textContent = titles[targetSection] || 'ダッシュボード';
            
            // セクション固有の初期化
            handleSectionSwitch(targetSection);
        });
    });
}

// セクション切り替え時の処理
function handleSectionSwitch(section) {
    switch(section) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        case 'products':
            loadProducts();
            break;
        case 'articles':
            loadArticles();
            break;
        case 'affiliate':
            loadAffiliateData();
            break;
        case 'seo':
            loadSEOData();
            break;
    }
}

// チャートの初期化
function initializeCharts() {
    // ダッシュボードチャート
    const dashboardCtx = document.getElementById('dashboardChart');
    if (dashboardCtx) {
        new Chart(dashboardCtx, {
            type: 'line',
            data: {
                labels: Array.from({length: 30}, (_, i) => `${30-i}日前`),
                datasets: [
                    {
                        label: 'PV数',
                        data: generateMockData(30, 1000, 3000),
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        yAxisID: 'y'
                    },
                    {
                        label: '収益 (円)',
                        data: generateMockData(30, 5000, 15000),
                        borderColor: '#f5576c',
                        backgroundColor: 'rgba(245, 87, 108, 0.1)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }
    
    // アナリティクスチャート
    initializeAnalyticsCharts();
}

// アナリティクスチャートの初期化
function initializeAnalyticsCharts() {
    // トラフィックチャート
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'bar',
            data: {
                labels: ['月', '火', '水', '木', '金', '土', '日'],
                datasets: [{
                    label: 'PV数',
                    data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
                    backgroundColor: 'rgba(102, 126, 234, 0.8)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // 収益チャート
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: Array.from({length: 7}, (_, i) => `${7-i}日前`),
                datasets: [{
                    label: '収益',
                    data: generateMockData(7, 8000, 25000),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // カテゴリチャート
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['加湿器', '空気清浄機', '掃除機', 'キッチン家電', '美容家電'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#667eea',
                        '#f5576c',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // デバイスチャート
    const deviceCtx = document.getElementById('deviceChart');
    if (deviceCtx) {
        new Chart(deviceCtx, {
            type: 'pie',
            data: {
                labels: ['PC', 'スマートフォン', 'タブレット'],
                datasets: [{
                    data: [45, 50, 5],
                    backgroundColor: ['#667eea', '#f5576c', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// モーダルの初期化
function initializeModals() {
    // モーダルを閉じる
    window.closeModal = function(modalId) {
        document.getElementById(modalId).classList.remove('show');
    };
    
    // モーダル外クリックで閉じる
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
    
    // 閉じるボタン
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });
}

// モックデータの読み込み
function loadMockData() {
    // ヘッダー統計の更新
    document.getElementById('today-views').textContent = '2,345';
    document.getElementById('today-revenue').textContent = '¥15,678';
    
    // KPIカードの更新
    updateKPICards();
}

// KPIカードの更新
function updateKPICards() {
    const kpiData = [
        { value: '45,892', change: '+12.5%', positive: true },
        { value: '¥234,567', change: '+23.8%', positive: true },
        { value: '3.4%', change: '-0.2%', positive: false },
        { value: '189', change: '+15.3%', positive: true }
    ];
    
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach((card, index) => {
        if (kpiData[index]) {
            const valueElement = card.querySelector('.kpi-value');
            const changeElement = card.querySelector('.kpi-change');
            
            if (valueElement) valueElement.textContent = kpiData[index].value;
            if (changeElement) {
                changeElement.textContent = kpiData[index].change;
                changeElement.className = `kpi-change ${kpiData[index].positive ? 'positive' : 'negative'}`;
            }
        }
    });
}

// ダッシュボードの更新
function updateDashboard() {
    console.log('Dashboard updated');
    // リアルタイムデータの更新処理
}

// 商品管理
function loadProducts() {
    console.log('Loading products...');
    // 商品データの読み込み処理
}

window.openProductModal = function() {
    document.getElementById('productModal').classList.add('show');
};

window.saveProduct = function() {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    
    // 実際の保存処理をここに実装
    console.log('Saving product:', Object.fromEntries(formData));
    
    closeModal('productModal');
    showNotification('商品を保存しました', 'success');
};

// 記事管理
function loadArticles() {
    console.log('Loading articles...');
    // 記事データの読み込み処理
}

window.openArticleModal = function() {
    // 記事作成モーダルの表示
    showNotification('記事作成機能は準備中です', 'info');
};

// アナリティクス
function loadAnalyticsData() {
    const period = document.getElementById('analytics-period');
    if (period) {
        period.addEventListener('change', function() {
            updateAnalyticsCharts(this.value);
        });
    }
}

function updateAnalyticsCharts(period) {
    console.log(`Updating analytics for ${period} days`);
    // 期間に基づいてチャートを更新
}

// アフィリエイト管理
function loadAffiliateData() {
    console.log('Loading affiliate data...');
    // アフィリエイトデータの読み込み
}

window.generateAffiliateReport = function() {
    showNotification('アフィリエイトレポートを生成中...', 'info');
    
    // レポート生成の模擬処理
    setTimeout(() => {
        showNotification('レポートが生成されました', 'success');
        
        // CSVダウンロードの模擬
        const csvContent = generateAffiliateCSV();
        downloadCSV(csvContent, 'affiliate_report.csv');
    }, 2000);
};

function generateAffiliateCSV() {
    const headers = ['日付', 'プラットフォーム', '商品名', 'クリック数', '収益', 'CVR'];
    const data = [
        ['2025-01-20', 'Amazon', 'シャープ HV-L55', '45', '¥12,340', '3.2%'],
        ['2025-01-20', '楽天市場', 'パナソニック FE-KFP07', '32', '¥8,760', '2.8%'],
        ['2025-01-19', 'Amazon', '象印 EE-DC50', '28', '¥9,450', '4.1%']
    ];
    
    return [headers, ...data].map(row => row.join(',')).join('\n');
}

// SEO管理
function loadSEOData() {
    console.log('Loading SEO data...');
}

window.analyzeSEO = function() {
    showNotification('SEO分析を実行中...', 'info');
    
    setTimeout(() => {
        showNotification('SEO分析が完了しました', 'success');
        updateSEOMetrics();
    }, 3000);
};

function updateSEOMetrics() {
    // SEOメトリクスの更新
    console.log('SEO metrics updated');
}

// ユーティリティ関数
function generateMockData(length, min, max) {
    return Array.from({length}, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // 時刻表示要素があれば更新
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.textContent = message;
    
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    };
    
    Object.assign(notification.style, styles);
    
    // タイプ別の色設定
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // アニメーション
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動削除
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function downloadCSV(content, filename) {
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// データ永続化
const AdminStorage = {
    save: function(key, data) {
        localStorage.setItem(`admin_${key}`, JSON.stringify(data));
    },
    
    load: function(key, defaultValue = null) {
        const item = localStorage.getItem(`admin_${key}`);
        return item ? JSON.parse(item) : defaultValue;
    },
    
    remove: function(key) {
        localStorage.removeItem(`admin_${key}`);
    }
};

// 統計データの更新
function updateStatistics() {
    const stats = {
        totalViews: Math.floor(Math.random() * 50000) + 40000,
        monthlyRevenue: Math.floor(Math.random() * 300000) + 200000,
        clickThroughRate: (Math.random() * 2 + 2).toFixed(1),
        conversions: Math.floor(Math.random() * 100) + 150
    };
    
    AdminStorage.save('statistics', stats);
    
    // 画面の更新
    document.querySelector('.kpi-card:nth-child(1) .kpi-value').textContent = stats.totalViews.toLocaleString();
    document.querySelector('.kpi-card:nth-child(2) .kpi-value').textContent = `¥${stats.monthlyRevenue.toLocaleString()}`;
    document.querySelector('.kpi-card:nth-child(3) .kpi-value').textContent = `${stats.clickThroughRate}%`;
    document.querySelector('.kpi-card:nth-child(4) .kpi-value').textContent = stats.conversions.toString();
}

// リアルタイム更新
function startRealTimeUpdates() {
    // 5分ごとに統計を更新
    setInterval(() => {
        updateStatistics();
        showNotification('データが更新されました', 'info');
    }, 300000);
}

// 管理画面の完全初期化
document.addEventListener('DOMContentLoaded', function() {
    startRealTimeUpdates();
    
    // 保存された統計データの読み込み
    const savedStats = AdminStorage.load('statistics');
    if (savedStats) {
        // 保存されたデータで画面を更新
        console.log('Loaded saved statistics:', savedStats);
    }
});

// デバッグ用（開発時のみ）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.AdminDebug = {
        storage: AdminStorage,
        showTestNotification: () => showNotification('テスト通知', 'success'),
        generateTestData: () => updateStatistics(),
        clearAllData: () => {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('admin_')) {
                    localStorage.removeItem(key);
                }
            });
            console.log('All admin data cleared');
        }
    };
}