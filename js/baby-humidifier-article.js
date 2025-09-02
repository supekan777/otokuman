// 赤ちゃん・子供部屋用加湿器記事用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    initializeCharts();
    initializeAffiliateTracking();
    initializeReadingProgress();
    initializeSafetyHighlight();
    initializeAgeCalculator();
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
    // 湿度と健康の関係チャート
    const healthChart = document.getElementById('humidity-health-chart');
    if (healthChart) {
        const ctx = healthChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['20%', '30%', '40%', '50%', '60%', '70%', '80%'],
                datasets: [{
                    label: '風邪・感染症リスク',
                    data: [95, 80, 50, 20, 15, 25, 40],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                }, {
                    label: 'カビ・ダニ繁殖リスク',
                    data: [5, 8, 12, 20, 35, 70, 95],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                }, {
                    label: '肌の水分保持力',
                    data: [20, 30, 50, 80, 90, 85, 75],
                    borderColor: '#16a34a',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '湿度と赤ちゃんの健康の関係',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '湿度 (%)'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'リスク・効果 (%)'
                        },
                        min: 0,
                        max: 100
                    }
                },
                interaction: {
                    intersect: false,
                },
                plugins: {
                    annotation: {
                        annotations: {
                            optimalZone: {
                                type: 'box',
                                xMin: '50%',
                                xMax: '60%',
                                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                borderColor: '#16a34a',
                                borderWidth: 2,
                                label: {
                                    display: true,
                                    content: '最適ゾーン',
                                    position: 'center'
                                }
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
                page: 'baby-safe-humidifier',
                category: 'baby-safety'
            };
            
            // ローカルストレージに保存
            const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
            clicks.push(trackingData);
            localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
            
            console.log('Baby safe humidifier click tracked:', trackingData);
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

// 安全性ハイライト機能
function initializeSafetyHighlight() {
    const safetyElements = document.querySelectorAll('.safety-features, .safety-badge, .essential');
    
    safetyElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// 年齢別推奨計算機
function initializeAgeCalculator() {
    // 年齢入力があれば推奨設定を表示する機能
    const ageInputs = document.querySelectorAll('.age-input');
    
    ageInputs.forEach(input => {
        input.addEventListener('change', function() {
            const ageMonths = parseInt(this.value);
            showAgeRecommendation(ageMonths);
        });
    });
}

function showAgeRecommendation(ageMonths) {
    let recommendation = '';
    
    if (ageMonths < 6) {
        recommendation = `
            <div class="age-recommendation newborn">
                <h4>新生児〜6ヶ月の推奨設定</h4>
                <ul>
                    <li>湿度: 50-60%</li>
                    <li>音量: 25dB以下</li>
                    <li>設置距離: ベビーベッドから2m以上</li>
                    <li>推奨タイプ: 気化式</li>
                </ul>
            </div>
        `;
    } else if (ageMonths < 24) {
        recommendation = `
            <div class="age-recommendation infant">
                <h4>6ヶ月〜2歳の推奨設定</h4>
                <ul>
                    <li>湿度: 50-60%</li>
                    <li>音量: 30dB以下</li>
                    <li>安全機能: チャイルドロック必須</li>
                    <li>設置: 手の届かない高い場所</li>
                </ul>
            </div>
        `;
    } else {
        recommendation = `
            <div class="age-recommendation toddler">
                <h4>2歳以上の推奨設定</h4>
                <ul>
                    <li>湿度: 40-60%</li>
                    <li>音量: 35dB以下</li>
                    <li>教育: 触ってはいけないことを説明</li>
                    <li>タイマー: 8時間設定推奨</li>
                </ul>
            </div>
        `;
    }
    
    const recommendationArea = document.getElementById('age-recommendation-result');
    if (recommendationArea) {
        recommendationArea.innerHTML = recommendation;
    }
}

// 安全性チェックリスト機能
function initializeSafetyChecklist() {
    const checklistItems = document.querySelectorAll('.safety-checklist input[type="checkbox"]');
    
    checklistItems.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSafetyScore();
        });
    });
}

function updateSafetyScore() {
    const checkedItems = document.querySelectorAll('.safety-checklist input[type="checkbox"]:checked');
    const totalItems = document.querySelectorAll('.safety-checklist input[type="checkbox"]');
    const score = Math.round((checkedItems.length / totalItems.length) * 100);
    
    const scoreElement = document.getElementById('safety-score');
    if (scoreElement) {
        scoreElement.textContent = score + '%';
        
        if (score >= 80) {
            scoreElement.className = 'score excellent';
        } else if (score >= 60) {
            scoreElement.className = 'score good';
        } else {
            scoreElement.className = 'score needs-improvement';
        }
    }
}

// 湿度アラート機能
function initializeHumidityAlert() {
    // 仮想の湿度センサー値をシミュレート
    setInterval(function() {
        const currentHumidity = Math.floor(Math.random() * 40) + 30; // 30-70%の範囲
        
        const alertArea = document.getElementById('humidity-alert');
        if (alertArea) {
            if (currentHumidity < 40) {
                alertArea.innerHTML = `
                    <div class="alert warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        湿度が低すぎます (${currentHumidity}%)。加湿器の出力を上げてください。
                    </div>
                `;
            } else if (currentHumidity > 70) {
                alertArea.innerHTML = `
                    <div class="alert danger">
                        <i class="fas fa-exclamation-circle"></i>
                        湿度が高すぎます (${currentHumidity}%)。カビのリスクがあります。
                    </div>
                `;
            } else if (currentHumidity >= 50 && currentHumidity <= 60) {
                alertArea.innerHTML = `
                    <div class="alert success">
                        <i class="fas fa-check-circle"></i>
                        湿度が適正です (${currentHumidity}%)。良い環境が保たれています。
                    </div>
                `;
            } else {
                alertArea.innerHTML = '';
            }
        }
    }, 10000); // 10秒ごとに更新
}

// 初期化時に安全性チェックリストとアラート機能も実行
document.addEventListener('DOMContentLoaded', function() {
    initializeSafetyChecklist();
    initializeHumidityAlert();
});