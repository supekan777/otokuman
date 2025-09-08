/**
 * 目次自動生成機能
 * 失敗しないお得マン！
 */

class TableOfContents {
    constructor() {
        this.headings = [];
        this.tocContainer = null;
        this.activeHeading = null;
        this.observer = null;
        this.settings = {
            minHeadings: 3, // 最低見出し数
            maxDepth: 4,    // 最大見出しレベル (h1-h4)
            smoothScroll: true,
            trackProgress: true,
            autoCollapse: false
        };
        this.init();
    }

    init() {
        // JavaScript目次生成機能を完全に無効化
        console.log('目次自動生成機能は無効化されています。');
        return;
        
        // 記事ページでのみ動作
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;

        // 既存の目次が存在する場合はスキップ
        const existingToc = document.querySelector('.toc, .table-of-contents');
        if (existingToc) {
            console.log('既存の目次が見つかりました。自動生成をスキップします。');
            return;
        }

        this.extractHeadings();
        
        if (this.headings.length >= this.settings.minHeadings) {
            this.generateTOC();
            this.setupScrollSpy();
            this.setupSmoothScroll();
            this.trackTOCUsage();
        }
    }

    /**
     * 見出しを抽出してIDを付与
     */
    extractHeadings() {
        const articleContent = document.querySelector('.article-content');
        const headingSelectors = [];
        
        for (let i = 2; i <= this.settings.maxDepth; i++) {
            headingSelectors.push(`h${i}`);
        }
        
        const headingElements = articleContent.querySelectorAll(headingSelectors.join(', '));
        
        headingElements.forEach((heading, index) => {
            // 既存のIDがない場合は生成
            if (!heading.id) {
                const id = this.generateHeadingId(heading.textContent, index);
                heading.id = id;
            }
            
            const level = parseInt(heading.tagName.substring(1));
            this.headings.push({
                element: heading,
                id: heading.id,
                text: heading.textContent.trim(),
                level: level,
                offsetTop: 0 // 後で計算
            });
        });

        // オフセット位置を計算
        this.updateHeadingOffsets();
    }

    /**
     * 見出しIDを生成
     */
    generateHeadingId(text, index) {
        // 日本語対応のID生成
        let id = text
            .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]/g, '-') // 特殊文字を-に置換
            .replace(/^-+|-+$/g, '') // 先頭末尾の-を除去
            .replace(/-+/g, '-') // 連続する-を1つに
            .toLowerCase();
            
        if (!id || id.length < 2) {
            id = `heading-${index + 1}`;
        }
        
        // 重複チェック
        let finalId = id;
        let counter = 1;
        while (document.getElementById(finalId)) {
            finalId = `${id}-${counter}`;
            counter++;
        }
        
        return finalId;
    }

    /**
     * 目次を生成
     */
    generateTOC() {
        // 目次コンテナを作成
        this.tocContainer = document.createElement('div');
        this.tocContainer.className = 'table-of-contents';
        this.tocContainer.innerHTML = `
            <div class="toc-header">
                <h3 class="toc-title">
                    <i class="fas fa-list-ul"></i>
                    目次
                </h3>
                <button class="toc-toggle" aria-label="目次の表示/非表示">
                    <i class="fas fa-chevron-up"></i>
                </button>
            </div>
            <nav class="toc-nav" role="navigation" aria-label="記事目次">
                <ol class="toc-list">
                    ${this.generateTOCItems()}
                </ol>
            </nav>
        `;

        // スタイルを追加
        this.addTOCStyles();

        // 記事の最初に挿入
        const articleContent = document.querySelector('.article-content');
        const firstChild = articleContent.firstElementChild;
        if (firstChild) {
            articleContent.insertBefore(this.tocContainer, firstChild);
        } else {
            articleContent.appendChild(this.tocContainer);
        }

        // トグル機能
        this.setupTOCToggle();

        // 進捗表示
        if (this.settings.trackProgress) {
            this.addProgressIndicator();
        }
    }

    /**
     * 目次アイテムを生成
     */
    generateTOCItems() {
        let html = '';
        let currentLevel = 2;
        let openLists = 0;

        this.headings.forEach((heading, index) => {
            const level = heading.level;
            
            if (level > currentLevel) {
                // より深いレベル：ネストした<ol>を開始
                for (let i = currentLevel; i < level; i++) {
                    html += '<li><ol class="toc-sublist">';
                    openLists++;
                }
            } else if (level < currentLevel) {
                // より浅いレベル：ネストした<ol>を閉じる
                for (let i = level; i < currentLevel; i++) {
                    html += '</ol></li>';
                    openLists--;
                }
            }

            // 目次アイテムを追加
            html += `
                <li class="toc-item toc-level-${level}" data-heading-id="${heading.id}">
                    <a href="#${heading.id}" class="toc-link" data-level="${level}">
                        <span class="toc-number">${this.getTOCNumber(index, level)}</span>
                        <span class="toc-text">${this.escapeHtml(heading.text)}</span>
                    </a>
                </li>
            `;

            currentLevel = level;
        });

        // 残りの開いた<ol>を閉じる
        for (let i = 0; i < openLists; i++) {
            html += '</ol></li>';
        }

        return html;
    }

    /**
     * 目次番号を生成
     */
    getTOCNumber(index, level) {
        // シンプルな連番制御
        const counts = { 2: 0, 3: 0, 4: 0 };
        let currentCounts = { 2: 0, 3: 0, 4: 0 };
        
        for (let i = 0; i <= index; i++) {
            const h = this.headings[i];
            currentCounts[h.level]++;
            
            // より深いレベルがリセットされる
            for (let resetLevel = h.level + 1; resetLevel <= 4; resetLevel++) {
                currentCounts[resetLevel] = 0;
            }
        }
        
        if (level === 2) return `${currentCounts[2]}.`;
        if (level === 3) return `${currentCounts[2]}.${currentCounts[3]}`;
        if (level === 4) return `${currentCounts[2]}.${currentCounts[3]}.${currentCounts[4]}`;
        
        return `${index + 1}.`;
    }

    /**
     * 目次のスタイルを追加
     */
    addTOCStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .table-of-contents {
                background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                border: 2px solid #dee2e6;
                border-radius: 15px;
                margin: 2rem 0;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                position: relative;
            }

            .toc-header {
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                user-select: none;
            }

            .toc-title {
                margin: 0;
                font-size: 1.1rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .toc-toggle {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 50%;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
            }

            .toc-toggle:hover {
                background: rgba(255,255,255,0.2);
            }

            .toc-nav {
                padding: 1.5rem;
                max-height: 400px;
                overflow-y: auto;
                transition: all 0.3s ease;
            }

            .table-of-contents.collapsed .toc-nav {
                max-height: 0;
                padding: 0 1.5rem;
            }

            .table-of-contents.collapsed .toc-toggle i {
                transform: rotate(180deg);
            }

            .toc-list, .toc-sublist {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .toc-sublist {
                margin-left: 1rem;
                margin-top: 0.5rem;
                border-left: 2px solid #e9ecef;
                padding-left: 1rem;
            }

            .toc-item {
                margin: 0.25rem 0;
            }

            .toc-link {
                display: flex;
                align-items: flex-start;
                gap: 0.5rem;
                padding: 0.5rem 0.75rem;
                border-radius: 8px;
                text-decoration: none;
                color: #2c3e50;
                transition: all 0.3s ease;
                border-left: 3px solid transparent;
            }

            .toc-link:hover {
                background: rgba(52, 152, 219, 0.1);
                border-left-color: #3498db;
                transform: translateX(2px);
            }

            .toc-link.active {
                background: rgba(52, 152, 219, 0.15);
                border-left-color: #3498db;
                color: #2980b9;
                font-weight: 600;
            }

            .toc-number {
                color: #3498db;
                font-weight: bold;
                font-size: 0.9rem;
                min-width: 2rem;
                text-align: right;
            }

            .toc-text {
                line-height: 1.4;
                font-size: 0.9rem;
            }

            .toc-level-3 .toc-text {
                font-size: 0.85rem;
            }

            .toc-level-4 .toc-text {
                font-size: 0.8rem;
                color: #666;
            }

            .toc-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #27ae60, #2ecc71);
                transition: width 0.3s ease;
                border-radius: 0 0 0 15px;
            }

            /* モバイル対応 */
            @media (max-width: 768px) {
                .table-of-contents {
                    margin: 1rem -1rem;
                    border-radius: 0;
                    border-left: none;
                    border-right: none;
                }

                .toc-nav {
                    padding: 1rem;
                    max-height: 300px;
                }

                .toc-sublist {
                    margin-left: 0.5rem;
                    padding-left: 0.5rem;
                }

                .toc-text {
                    font-size: 0.85rem;
                }
            }

            /* 印刷時は非表示 */
            @media print {
                .table-of-contents {
                    display: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * 目次の開閉トグル機能
     */
    setupTOCToggle() {
        const header = this.tocContainer.querySelector('.toc-header');
        const toggle = this.tocContainer.querySelector('.toc-toggle');
        
        header.addEventListener('click', () => {
            this.tocContainer.classList.toggle('collapsed');
            
            // アナリティクストラッキング
            if (window.trackCustomEvent) {
                const isCollapsed = this.tocContainer.classList.contains('collapsed');
                window.trackCustomEvent('toc_toggle', {
                    category: 'engagement',
                    label: isCollapsed ? 'collapsed' : 'expanded',
                    value: 1
                });
            }
        });
    }

    /**
     * 進捗インジケーターを追加
     */
    addProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'toc-progress';
        progressBar.style.width = '0%';
        this.tocContainer.appendChild(progressBar);

        // スクロール時の進捗更新
        this.updateTOCProgress = () => {
            const scrollPercent = Math.min(100, Math.max(0, 
                (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            ));
            progressBar.style.width = `${scrollPercent}%`;
        };

        window.addEventListener('scroll', this.updateTOCProgress, { passive: true });
    }

    /**
     * スクロールスパイ機能
     */
    setupScrollSpy() {
        this.updateHeadingOffsets();

        const observerOptions = {
            rootMargin: '-20% 0px -35% 0px',
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const headingId = entry.target.id;
                const tocLink = this.tocContainer.querySelector(`a[href="#${headingId}"]`);
                
                if (entry.isIntersecting) {
                    // アクティブな見出しを更新
                    this.setActiveHeading(headingId);
                }
            });
        }, observerOptions);

        // 各見出しを監視
        this.headings.forEach(heading => {
            this.observer.observe(heading.element);
        });

        // 手動でのスクロール位置チェック（バックアップ）
        this.checkActiveHeadingOnScroll();
    }

    /**
     * スクロール位置に基づいてアクティブな見出しを決定
     */
    checkActiveHeadingOnScroll() {
        let ticking = false;

        const updateActiveHeading = () => {
            const scrollY = window.pageYOffset + 100; // オフセット調整
            let activeId = null;

            // 現在のスクロール位置に最も近い見出しを探す
            for (let i = this.headings.length - 1; i >= 0; i--) {
                const heading = this.headings[i];
                if (scrollY >= heading.offsetTop) {
                    activeId = heading.id;
                    break;
                }
            }

            if (activeId && activeId !== this.activeHeading) {
                this.setActiveHeading(activeId);
            }

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveHeading);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /**
     * アクティブな見出しを設定
     */
    setActiveHeading(headingId) {
        if (this.activeHeading === headingId) return;

        // 前のアクティブリンクを非アクティブに
        const prevActive = this.tocContainer.querySelector('.toc-link.active');
        if (prevActive) {
            prevActive.classList.remove('active');
        }

        // 新しいアクティブリンクを設定
        const newActive = this.tocContainer.querySelector(`a[href="#${headingId}"]`);
        if (newActive) {
            newActive.classList.add('active');
            this.activeHeading = headingId;

            // アクティブな要素を目次内でスクロール表示
            this.scrollTOCToActive(newActive);
        }
    }

    /**
     * 目次内でアクティブな項目をスクロール表示
     */
    scrollTOCToActive(activeLink) {
        const tocNav = this.tocContainer.querySelector('.toc-nav');
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = tocNav.getBoundingClientRect();

        if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
            activeLink.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    /**
     * スムーズスクロール機能
     */
    setupSmoothScroll() {
        if (!this.settings.smoothScroll) return;

        this.tocContainer.addEventListener('click', (e) => {
            const link = e.target.closest('.toc-link');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // アナリティクストラッキング
                if (window.trackCustomEvent) {
                    window.trackCustomEvent('toc_click', {
                        category: 'navigation',
                        label: targetId,
                        value: 1
                    });
                }
            }
        });
    }

    /**
     * 見出しのオフセット位置を更新
     */
    updateHeadingOffsets() {
        this.headings.forEach(heading => {
            heading.offsetTop = heading.element.offsetTop;
        });
    }

    /**
     * 目次の使用状況をトラッキング
     */
    trackTOCUsage() {
        // 目次が生成されたことをトラッキング
        if (window.trackCustomEvent) {
            window.trackCustomEvent('toc_generated', {
                category: 'engagement',
                label: `${this.headings.length} headings`,
                value: this.headings.length
            });
        }

        // ページ滞在時間と目次利用の相関をトラッキング
        let tocInteracted = false;
        
        this.tocContainer.addEventListener('click', () => {
            if (!tocInteracted) {
                tocInteracted = true;
                if (window.trackCustomEvent) {
                    window.trackCustomEvent('toc_first_interaction', {
                        category: 'engagement',
                        label: document.title,
                        value: Math.round((Date.now() - performance.timing.navigationStart) / 1000)
                    });
                }
            }
        });
    }

    /**
     * HTMLエスケープ
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 目次を破棄
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.tocContainer && this.tocContainer.parentNode) {
            this.tocContainer.remove();
        }
        window.removeEventListener('scroll', this.updateTOCProgress);
    }
}

/**
 * 初期化
 */
document.addEventListener('DOMContentLoaded', () => {
    // 記事ページでのみ動作
    if (document.querySelector('.article-content')) {
        new TableOfContents();
    }
});

// ページがリサイズされた時の対応
window.addEventListener('resize', () => {
    const toc = window.tableOfContents;
    if (toc) {
        toc.updateHeadingOffsets();
    }
});

// エクスポート（デバッグ用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TableOfContents;
}