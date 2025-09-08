// 電気代比較記事用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    initializeCharts();
    initializeCalculator();
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
    // 電気代比較チャート
    const electricityChart = document.getElementById('electricity-cost-chart');
    if (electricityChart) {
        const ctx = electricityChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['気化式', '超音波式', 'ハイブリッド式', 'スチーム式'],
                datasets: [{
                    label: '1ヶ月の電気代（円）',
                    data: [75, 225, 1115, 4100],
                    backgroundColor: [
                        '#22c55e',
                        '#3b82f6', 
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderColor: [
                        '#16a34a',
                        '#2563eb',
                        '#d97706', 
                        '#dc2626'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '加湿器タイプ別 月間電気代比較（1日8時間使用）',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '円';
                            }
                        }
                    }
                }
            }
        });
    }

    // 年間コスト比較チャート
    const costChart = document.getElementById('cost-comparison-chart');
    if (costChart) {
        const ctx = costChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1年目', '2年目', '3年目', '4年目', '5年目'],
                datasets: [{
                    label: '気化式',
                    data: [17335, 19670, 22005, 24340, 24675],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4
                }, {
                    label: '超音波式', 
                    data: [9930, 12260, 14590, 15920, 16720],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }, {
                    label: 'ハイブリッド式',
                    data: [23160, 28320, 33480, 36640, 38640],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4
                }, {
                    label: 'スチーム式',
                    data: [30380, 45260, 60140, 75020, 89420],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '5年間の総コスト推移',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString() + '円';
                            }
                        }
                    }
                }
            }
        });
    }
}

// 電気代計算機
function initializeCalculator() {
    // 簡易計算機があれば実装
    const calculatorSection = document.querySelector('.calculator');
    if (calculatorSection) {
        const powerInput = calculatorSection.querySelector('#power-input');
        const hoursInput = calculatorSection.querySelector('#hours-input');
        const calculateBtn = calculatorSection.querySelector('#calculate-btn');
        const resultDiv = calculatorSection.querySelector('#result');
        
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                const power = parseFloat(powerInput.value) || 0;
                const hours = parseFloat(hoursInput.value) || 0;
                const rate = 31; // 円/kWh
                
                const dailyCost = (power / 1000) * hours * rate;
                const monthlyCost = dailyCost * 30;
                const yearlyCost = dailyCost * 365;
                
                resultDiv.innerHTML = `
                    <h4>計算結果</h4>
                    <ul>
                        <li>1日の電気代: ${dailyCost.toFixed(2)}円</li>
                        <li>1ヶ月の電気代: ${monthlyCost.toFixed(0)}円</li>
                        <li>1年間の電気代: ${yearlyCost.toFixed(0)}円</li>
                    </ul>
                `;
            });
        }
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
                page: 'electricity-cost-comparison'
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

// 節約効果ハイライト
function highlightSavings() {
    const savingsElements = document.querySelectorAll('.cost-good');
    savingsElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 初期化時に節約効果ハイライトも実行
document.addEventListener('DOMContentLoaded', function() {
    highlightSavings();
});