// 記事ページ用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    initializeCharts();
    initializeAffiliateTracking();
    initializeReadingProgress();
});

// スムーススクロール
function initializeSmoothScroll() {
    const tocLinks = document.querySelectorAll('.toc a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// チャート初期化
function initializeCharts() {
    const chartCanvas = document.getElementById('humidity-chart');
    
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['0時', '4時', '8時', '12時', '16時', '20時', '24時'],
                datasets: [{
                    label: '加湿器なし',
                    data: [45, 40, 35, 30, 28, 32, 40],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                }, {
                    label: '加湿器あり',
                    data: [50, 48, 50, 52, 50, 51, 50],
                    borderColor: '#16a34a',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '室内湿度の変化（冬季の一般的な例）'
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 70,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// アフィリエイトリンクのトラッキング
function initializeAffiliateTracking() {
    const affiliateLinks = document.querySelectorAll('.btn-affiliate');
    
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.classList[1]; // amazon, rakuten, yahoo
            const productName = this.closest('.product-detail').querySelector('h3').textContent;
            
            // トラッキングデータを記録
            const trackingData = {
                product: productName,
                platform: platform,
                timestamp: new Date().toISOString(),
                page: 'article'
            };
            
            // ローカルストレージに保存
            const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
            clicks.push(trackingData);
            localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
            
            console.log('Affiliate click tracked:', trackingData);
        });
    });
}

// 読了進捗バー
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #16a34a, #22c55e);
        z-index: 1000;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

// 記事の読了時間を動的に計算
function calculateReadTime() {
    const content = document.querySelector('.article-content');
    if (content) {
        const text = content.textContent;
        const wordsPerMinute = 400; // 日本語の場合
        const words = text.length;
        const readTime = Math.ceil(words / wordsPerMinute);
        
        const readingTimeElement = document.querySelector('.reading-time');
        if (readingTimeElement) {
            readingTimeElement.innerHTML = `<i class="far fa-clock"></i> 約${readTime}分`;
        }
    }
}

// ページロード時に読了時間を計算
calculateReadTime();