/**
 * サイト内検索機能
 * 失敗しないお得マン！
 */

// 検索インデックス（記事データベース）
const searchIndex = {
    // 加湿器記事
    'humidifier-guide-2025.html': {
        title: '【2025年最新】加湿器おすすめ15選！選び方から使い方まで徹底解説',
        description: '2025年最新の加湿器おすすめ15選を徹底比較。超音波式・気化式・スチーム式・ハイブリッド式の特徴、選び方のポイント、お手入れ方法まで専門家が詳しく解説',
        category: '加湿器',
        tags: ['加湿器', 'おすすめ', '2025年', '選び方', '比較', '超音波式', '気化式', 'スチーム式', 'ハイブリッド式'],
        url: '/articles/humidifier-guide-2025.html',
        priority: 10
    },
    'humidifier-electricity-cost-comparison.html': {
        title: '加湿器の電気代徹底比較！タイプ別・製品別コスト詳細分析',
        description: '加湿器の電気代をタイプ別・製品別で徹底比較。超音波式、気化式、スチーム式、ハイブリッド式の電気代の違いと節約方法を詳しく解説',
        category: '加湿器',
        tags: ['加湿器', '電気代', '比較', 'コスト', '節約', '超音波式', '気化式', 'スチーム式'],
        url: '/articles/humidifier-electricity-cost-comparison.html',
        priority: 8
    },
    'baby-safe-humidifier-guide.html': {
        title: '赤ちゃん向け加湿器の選び方完全ガイド！安全性重視のおすすめ10選',
        description: '赤ちゃんに安全な加湿器の選び方とおすすめ製品10選。チャイルドロック、安全機能、お手入れのしやすさなど赤ちゃん向けの重要ポイントを解説',
        category: '加湿器',
        tags: ['加湿器', '赤ちゃん', '安全', 'チャイルドロック', '子育て', 'ベビー'],
        url: '/articles/baby-safe-humidifier-guide.html',
        priority: 9
    },
    'single-person-humidifier-best10.html': {
        title: '一人暮らし向け加湿器ベスト10！コンパクト&コスパ重視で厳選',
        description: '一人暮らしに最適な加湿器ベスト10を厳選。コンパクトサイズ、コストパフォーマンス、お手入れの簡単さを重視した選び方とおすすめ製品',
        category: '加湿器',
        tags: ['加湿器', '一人暮らし', 'コンパクト', 'コスパ', '省スペース'],
        url: '/articles/single-person-humidifier-best10.html',
        priority: 8
    },
    'humidifier-mold-cleaning-guide.html': {
        title: '加湿器のカビ対策・掃除方法完全ガイド！予防から除去まで',
        description: '加湿器のカビ対策と掃除方法を完全解説。カビの原因、予防方法、効果的な掃除手順、おすすめ洗剤まで詳しく紹介',
        category: '加湿器',
        tags: ['加湿器', 'カビ', '掃除', 'メンテナンス', '予防', '除去'],
        url: '/articles/humidifier-mold-cleaning-guide.html',
        priority: 7
    },

    // 空気清浄機記事
    'air-purifier-guide-2025.html': {
        title: '【2025年最新】空気清浄機おすすめ20選！効果的な選び方を徹底解説',
        description: '2025年最新の空気清浄機おすすめ20選を徹底比較。HEPA・活性炭・光触媒フィルターの特徴、選び方のポイント、効果的な使い方まで専門家が詳しく解説',
        category: '空気清浄機',
        tags: ['空気清浄機', 'おすすめ', '2025年', '選び方', 'HEPA', '活性炭', '光触媒', 'フィルター'],
        url: '/articles/air-purifier-guide-2025.html',
        priority: 10
    },
    'air-purifier-electricity-cost-comparison.html': {
        title: '空気清浄機の電気代徹底比較！タイプ別・製品別コスト分析',
        description: '空気清浄機の電気代をタイプ別・製品別で徹底比較。機能別の電力消費量の違いと効率的な使い方による節約方法を詳しく解説',
        category: '空気清浄機',
        tags: ['空気清浄機', '電気代', '比較', 'コスト', '節約', '電力消費'],
        url: '/articles/air-purifier-electricity-cost-comparison.html',
        priority: 8
    },
    'baby-child-air-purifier-guide.html': {
        title: '赤ちゃん・子供部屋向け空気清浄機選び方ガイド！安全性重視のおすすめ',
        description: '赤ちゃんや子供部屋に適した空気清浄機の選び方とおすすめ製品。安全機能、静音性、有害物質除去能力など子育て世代向けの重要ポイント',
        category: '空気清浄機',
        tags: ['空気清浄機', '赤ちゃん', '子供', '安全', '静音', 'ベビー'],
        url: '/articles/baby-child-air-purifier-guide.html',
        priority: 9
    },
    'single-living-air-purifier-guide.html': {
        title: '一人暮らし向け空気清浄機ガイド！コンパクト&コスパ重視で厳選',
        description: '一人暮らしに最適な空気清浄機の選び方とおすすめ製品。コンパクトサイズ、コストパフォーマンス、省エネ性能を重視した厳選ガイド',
        category: '空気清浄機',
        tags: ['空気清浄機', '一人暮らし', 'コンパクト', 'コスパ', '省エネ'],
        url: '/articles/single-living-air-purifier-guide.html',
        priority: 8
    },
    'pet-specialized-air-purifier-guide.html': {
        title: 'ペット向け空気清浄機の選び方！毛・臭い・アレルゲン対策完全ガイド',
        description: 'ペットを飼っている家庭向けの空気清浄機選び方ガイド。ペットの毛、臭い、アレルゲン除去に特化した製品の選び方とおすすめ',
        category: '空気清浄機',
        tags: ['空気清浄機', 'ペット', '毛', '臭い', 'アレルゲン', '犬', '猫'],
        url: '/articles/pet-specialized-air-purifier-guide.html',
        priority: 7
    }
};

/**
 * 検索機能のメインクラス
 */
class SiteSearch {
    constructor() {
        this.searchResults = [];
        this.currentQuery = '';
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.bindEvents();
    }

    /**
     * 検索インターフェースの作成
     */
    createSearchInterface() {
        // ヘッダーに検索ボックスを追加
        const navbar = document.querySelector('.nav-container');
        if (navbar) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            searchContainer.innerHTML = `
                <div class="search-box">
                    <input type="search" id="site-search" placeholder="記事を検索..." autocomplete="off">
                    <button type="button" id="search-btn" aria-label="検索">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div id="search-dropdown" class="search-dropdown" style="display: none;">
                    <div class="search-results-container">
                        <div id="search-results"></div>
                        <div class="search-footer">
                            <span id="results-count">0件の結果</span>
                            <button id="view-all-results" style="display: none;">すべての結果を表示</button>
                        </div>
                    </div>
                </div>
            `;

            // 検索ボックスのスタイル
            const searchStyles = document.createElement('style');
            searchStyles.textContent = `
                .search-container {
                    position: relative;
                    margin-left: auto;
                    margin-right: 1rem;
                }
                
                .search-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                
                .search-box input {
                    width: 200px;
                    padding: 0.5rem 2.5rem 0.5rem 1rem;
                    border: 2px solid #e9ecef;
                    border-radius: 25px;
                    outline: none;
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                }
                
                .search-box input:focus {
                    width: 300px;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
                }
                
                .search-box button {
                    position: absolute;
                    right: 0.5rem;
                    background: none;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 50%;
                    transition: color 0.3s ease;
                }
                
                .search-box button:hover {
                    color: #3498db;
                }
                
                .search-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 400px;
                    max-height: 500px;
                    background: white;
                    border: 1px solid #e9ecef;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    z-index: 1000;
                    overflow: hidden;
                }
                
                .search-results-container {
                    max-height: 450px;
                    overflow-y: auto;
                }
                
                .search-result-item {
                    padding: 1rem;
                    border-bottom: 1px solid #f8f9fa;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                
                .search-result-item:hover {
                    background-color: #f8f9fa;
                }
                
                .search-result-title {
                    font-weight: bold;
                    color: #2c3e50;
                    margin-bottom: 0.25rem;
                    font-size: 0.95rem;
                    line-height: 1.3;
                }
                
                .search-result-description {
                    color: #666;
                    font-size: 0.85rem;
                    line-height: 1.4;
                    margin-bottom: 0.5rem;
                }
                
                .search-result-meta {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-size: 0.75rem;
                    color: #999;
                }
                
                .search-result-category {
                    background: #3498db;
                    color: white;
                    padding: 0.125rem 0.5rem;
                    border-radius: 10px;
                    font-size: 0.7rem;
                }
                
                .search-footer {
                    padding: 0.75rem 1rem;
                    background: #f8f9fa;
                    border-top: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.8rem;
                    color: #666;
                }
                
                .search-highlight {
                    background-color: #fff3cd;
                    padding: 0.1rem 0.2rem;
                    border-radius: 2px;
                    font-weight: bold;
                }
                
                .no-results {
                    padding: 2rem;
                    text-align: center;
                    color: #666;
                }
                
                .no-results i {
                    font-size: 2rem;
                    color: #ddd;
                    margin-bottom: 1rem;
                }
                
                @media (max-width: 768px) {
                    .search-container {
                        margin-left: 0;
                        margin-right: 0;
                        margin-top: 1rem;
                    }
                    
                    .search-box input {
                        width: 100%;
                    }
                    
                    .search-box input:focus {
                        width: 100%;
                    }
                    
                    .search-dropdown {
                        width: 100%;
                        right: auto;
                        left: 0;
                    }
                }
            `;
            document.head.appendChild(searchStyles);

            navbar.appendChild(searchContainer);
        }
    }

    /**
     * イベントバインド
     */
    bindEvents() {
        const searchInput = document.getElementById('site-search');
        const searchBtn = document.getElementById('search-btn');
        const searchDropdown = document.getElementById('search-dropdown');

        if (searchInput) {
            // 入力時の検索
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length >= 2) {
                    this.performSearch(query);
                } else {
                    this.hideSearchResults();
                }
            });

            // フォーカス時の表示
            searchInput.addEventListener('focus', (e) => {
                if (e.target.value.trim().length >= 2) {
                    this.showSearchResults();
                }
            });

            // Enterキーでの検索
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = e.target.value.trim();
                    if (query) {
                        this.performSearch(query);
                        // トラッキング
                        if (window.trackCustomEvent) {
                            window.trackCustomEvent('site_search', {
                                category: 'search',
                                label: query,
                                value: 1
                            });
                        }
                    }
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    this.performSearch(query);
                }
            });
        }

        // 外部クリックで検索結果を非表示
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchResults();
            }
        });
    }

    /**
     * 検索実行
     */
    performSearch(query) {
        this.currentQuery = query;
        const results = this.search(query);
        this.displaySearchResults(results);
        this.showSearchResults();
    }

    /**
     * 検索ロジック
     */
    search(query) {
        const normalizedQuery = query.toLowerCase();
        const results = [];

        Object.entries(searchIndex).forEach(([filename, data]) => {
            let score = 0;
            const titleMatch = data.title.toLowerCase().includes(normalizedQuery);
            const descriptionMatch = data.description.toLowerCase().includes(normalizedQuery);
            const tagMatch = data.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
            const categoryMatch = data.category.toLowerCase().includes(normalizedQuery);

            // スコア計算
            if (titleMatch) score += 10 * data.priority;
            if (descriptionMatch) score += 5 * data.priority;
            if (tagMatch) score += 3 * data.priority;
            if (categoryMatch) score += 2 * data.priority;

            // 完全一致ボーナス
            if (data.title.toLowerCase() === normalizedQuery) score += 50;
            if (data.tags.some(tag => tag.toLowerCase() === normalizedQuery)) score += 30;

            if (score > 0) {
                results.push({
                    ...data,
                    filename,
                    score,
                    titleMatch,
                    descriptionMatch,
                    tagMatch,
                    categoryMatch
                });
            }
        });

        // スコア順でソート
        return results.sort((a, b) => b.score - a.score).slice(0, 8);
    }

    /**
     * 検索結果の表示
     */
    displaySearchResults(results) {
        const resultsContainer = document.getElementById('search-results');
        const resultsCount = document.getElementById('results-count');

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>「${this.currentQuery}」に関する記事が見つかりませんでした。</p>
                    <p><small>別のキーワードでお試しください。</small></p>
                </div>
            `;
            resultsCount.textContent = '0件の結果';
            return;
        }

        const resultsHTML = results.map(result => {
            const highlightedTitle = this.highlightText(result.title, this.currentQuery);
            const highlightedDescription = this.highlightText(
                this.truncateText(result.description, 80), 
                this.currentQuery
            );

            return `
                <div class="search-result-item" data-url="${result.url}">
                    <div class="search-result-title">${highlightedTitle}</div>
                    <div class="search-result-description">${highlightedDescription}</div>
                    <div class="search-result-meta">
                        <span class="search-result-category">${result.category}</span>
                        <span>スコア: ${result.score}</span>
                    </div>
                </div>
            `;
        }).join('');

        resultsContainer.innerHTML = resultsHTML;
        resultsCount.textContent = `${results.length}件の結果`;

        // 検索結果のクリックイベント
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                if (url) {
                    window.location.href = url;
                    // トラッキング
                    if (window.trackCustomEvent) {
                        window.trackCustomEvent('search_result_click', {
                            category: 'search',
                            label: `${this.currentQuery} -> ${url}`,
                            value: 1
                        });
                    }
                }
            });
        });
    }

    /**
     * テキストのハイライト
     */
    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    /**
     * 正規表現エスケープ
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * テキストの切り詰め
     */
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    /**
     * 検索結果の表示
     */
    showSearchResults() {
        const dropdown = document.getElementById('search-dropdown');
        if (dropdown) {
            dropdown.style.display = 'block';
        }
    }

    /**
     * 検索結果の非表示
     */
    hideSearchResults() {
        const dropdown = document.getElementById('search-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
}

/**
 * 初期化
 */
document.addEventListener('DOMContentLoaded', () => {
    new SiteSearch();
});

// モバイルメニュー対応
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});