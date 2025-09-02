/**
 * 読了時間表示機能
 * 失敗しないお得マン！
 */

class ReadingTimeCalculator {
    constructor() {
        this.wordsPerMinute = 400; // 日本語の平均読書速度（文字/分）
        this.init();
    }

    init() {
        this.calculateAndDisplayReadingTime();
        this.addReadingProgress();
        this.trackReadingBehavior();
    }

    /**
     * 読了時間を計算して表示
     */
    calculateAndDisplayReadingTime() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;

        // 文字数をカウント（日本語対応）
        const text = this.extractTextContent(articleContent);
        const characterCount = text.length;
        const estimatedMinutes = Math.max(1, Math.ceil(characterCount / this.wordsPerMinute));

        // 記事メタ情報に読了時間を追加
        this.displayReadingTime(estimatedMinutes, characterCount);
        
        // カテゴリページでの記事リストにも読了時間を追加
        this.addReadingTimeToArticleCards();
    }

    /**
     * テキストコンテンツを抽出（画像やコードブロックを除外）
     */
    extractTextContent(element) {
        const clone = element.cloneNode(true);
        
        // 除外要素を削除
        const excludeSelectors = [
            'script', 'style', 'noscript', 
            '.advertisement', '.related-articles',
            'pre', 'code', '.image-container',
            '.chart-container', '.social-share'
        ];
        
        excludeSelectors.forEach(selector => {
            const elements = clone.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });

        return clone.textContent || clone.innerText || '';
    }

    /**
     * 読了時間の表示
     */
    displayReadingTime(minutes, characterCount) {
        const articleMeta = document.querySelector('.article-meta');
        if (!articleMeta) return;

        // 既存の読了時間表示を削除
        const existingReadingTime = articleMeta.querySelector('.reading-time');
        if (existingReadingTime) {
            existingReadingTime.remove();
        }

        // 読了時間表示を作成
        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `
            <span class="reading-time-main">
                <i class="fas fa-clock"></i> 
                約${minutes}分で読めます
            </span>
            <span class="reading-time-details">
                （${characterCount.toLocaleString()}文字）
            </span>
        `;

        // スタイル適用
        readingTimeElement.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
        `;

        const readingTimeDetails = readingTimeElement.querySelector('.reading-time-details');
        if (readingTimeDetails) {
            readingTimeDetails.style.cssText = `
                opacity: 0.8;
                font-size: 0.8rem;
            `;
        }

        articleMeta.appendChild(readingTimeElement);

        // 構造化データに読了時間を追加
        this.addReadingTimeToStructuredData(minutes);
    }

    /**
     * 記事リストカードに読了時間を追加
     */
    addReadingTimeToArticleCards() {
        const articleCards = document.querySelectorAll('.article-card, .post-card');
        
        // 記事別の読了時間データ
        const readingTimes = {
            'humidifier-guide-2025.html': 8,
            'air-purifier-guide-2025.html': 12,
            'humidifier-electricity-cost-comparison.html': 6,
            'air-purifier-electricity-cost-comparison.html': 6,
            'baby-safe-humidifier-guide.html': 7,
            'baby-child-air-purifier-guide.html': 7,
            'single-person-humidifier-best10.html': 9,
            'single-living-air-purifier-guide.html': 8,
            'humidifier-mold-cleaning-guide.html': 5,
            'air-purifier-filter-maintenance-guide.html': 5
        };

        articleCards.forEach(card => {
            const link = card.querySelector('a');
            if (link && link.href) {
                const filename = link.href.split('/').pop();
                const readingTime = readingTimes[filename] || 5;

                // 既存の読了時間表示を確認
                if (!card.querySelector('.card-reading-time')) {
                    const readingTimeElement = document.createElement('span');
                    readingTimeElement.className = 'card-reading-time';
                    readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime}分`;
                    readingTimeElement.style.cssText = `
                        color: #666;
                        font-size: 0.8rem;
                        display: flex;
                        align-items: center;
                        gap: 0.25rem;
                    `;

                    // カードのメタ情報エリアに追加
                    const metaArea = card.querySelector('.article-meta, .card-meta, .post-meta');
                    if (metaArea) {
                        metaArea.appendChild(readingTimeElement);
                    } else {
                        // メタエリアがない場合は新規作成
                        const newMetaArea = document.createElement('div');
                        newMetaArea.className = 'card-meta';
                        newMetaArea.style.cssText = `
                            margin-top: 0.5rem;
                            padding-top: 0.5rem;
                            border-top: 1px solid #eee;
                        `;
                        newMetaArea.appendChild(readingTimeElement);
                        card.appendChild(newMetaArea);
                    }
                }
            }
        });
    }

    /**
     * 読書進捗バーを追加
     */
    addReadingProgress() {
        if (document.querySelector('.article-content')) {
            // 進捗バーを作成
            const progressBar = document.createElement('div');
            progressBar.id = 'reading-progress';
            progressBar.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-info">
                    <span class="progress-text">読書進捗</span>
                    <span class="progress-percentage">0%</span>
                </div>
            `;

            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: rgba(255, 255, 255, 0.9);
                z-index: 999;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: opacity 0.3s ease;
            `;

            // 進捗バーのスタイル
            const progressStyles = document.createElement('style');
            progressStyles.textContent = `
                .progress-bar {
                    height: 100%;
                    background: #f1f1f1;
                    position: relative;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #3498db, #2980b9);
                    width: 0%;
                    transition: width 0.1s ease;
                    position: relative;
                }
                
                .progress-fill::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3));
                    animation: shimmer 2s infinite;
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-20px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(20px); opacity: 0; }
                }
                
                .progress-info {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                    color: #666;
                    pointer-events: none;
                }
                
                #reading-progress.hidden {
                    opacity: 0;
                    pointer-events: none;
                }
            `;
            document.head.appendChild(progressStyles);

            document.body.appendChild(progressBar);

            // スクロールイベントで進捗を更新
            this.updateReadingProgress();
        }
    }

    /**
     * 読書進捗の更新
     */
    updateReadingProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressPercentage = document.querySelector('.progress-percentage');
        const progressBar = document.getElementById('reading-progress');

        if (!progressFill || !progressPercentage) return;

        let ticking = false;

        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));

            progressFill.style.width = `${scrollPercent}%`;
            progressPercentage.textContent = `${Math.round(scrollPercent)}%`;

            // 進捗バーの表示/非表示
            if (scrollPercent > 5) {
                progressBar.classList.remove('hidden');
            } else {
                progressBar.classList.add('hidden');
            }

            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /**
     * 読書行動のトラッキング
     */
    trackReadingBehavior() {
        if (!document.querySelector('.article-content')) return;

        let startTime = Date.now();
        let hasStartedReading = false;
        let readingMilestones = [25, 50, 75, 90];
        let trackedMilestones = [];

        function trackScrollMilestone() {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            if (scrollPercent > 10 && !hasStartedReading) {
                hasStartedReading = true;
                if (window.trackCustomEvent) {
                    window.trackCustomEvent('reading_started', {
                        category: 'engagement',
                        label: document.title,
                        value: 1
                    });
                }
            }

            readingMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                    trackedMilestones.push(milestone);
                    if (window.trackCustomEvent) {
                        window.trackCustomEvent('reading_progress', {
                            category: 'engagement',
                            label: `${milestone}% - ${document.title}`,
                            value: milestone
                        });
                    }
                }
            });
        }

        // 読了完了の判定
        function checkReadingCompletion() {
            if (trackedMilestones.includes(90)) {
                const readingTime = Math.round((Date.now() - startTime) / 1000);
                if (window.trackCustomEvent) {
                    window.trackCustomEvent('article_completed', {
                        category: 'engagement',
                        label: document.title,
                        value: readingTime
                    });
                }
            }
        }

        window.addEventListener('scroll', () => {
            trackScrollMilestone();
            checkReadingCompletion();
        }, { passive: true });

        // ページ離脱時の読書時間記録
        window.addEventListener('beforeunload', () => {
            if (hasStartedReading) {
                const readingTime = Math.round((Date.now() - startTime) / 1000);
                if (window.trackCustomEvent) {
                    window.trackCustomEvent('reading_session', {
                        category: 'engagement',
                        label: document.title,
                        value: readingTime
                    });
                }
            }
        });
    }

    /**
     * 構造化データに読了時間を追加
     */
    addReadingTimeToStructuredData(minutes) {
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            try {
                const data = JSON.parse(existingScript.textContent);
                data.timeRequired = `PT${minutes}M`;
                data.wordCount = document.querySelector('.article-content')?.textContent?.length || 0;
                existingScript.textContent = JSON.stringify(data, null, 2);
            } catch (e) {
                console.warn('構造化データの更新に失敗しました:', e);
            }
        }
    }
}

/**
 * 初期化
 */
document.addEventListener('DOMContentLoaded', () => {
    new ReadingTimeCalculator();
});

// 記事ページでのみ動作するように制限
if (document.querySelector('.article-content')) {
    new ReadingTimeCalculator();
}