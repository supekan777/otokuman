/**
 * 記事の更新日管理システム
 * 失敗しないお得マン！
 */

// 記事の更新日データベース
const articleDates = {
    // 加湿器記事
    'humidifier-guide-2025.html': {
        created: '2025-01-15',
        lastModified: '2025-08-22',
        version: '2.1',
        updateNote: '2025年最新機種追加、価格情報更新'
    },
    'humidifier-electricity-cost-comparison.html': {
        created: '2025-02-01',
        lastModified: '2025-08-22',
        version: '1.5',
        updateNote: ''
    },
    'baby-safe-humidifier-guide.html': {
        created: '2025-02-10',
        lastModified: '2025-08-22',
        version: '1.3',
        updateNote: '安全基準情報更新'
    },
    'humidifier-mold-cleaning-guide.html': {
        created: '2025-02-15',
        lastModified: '2025-08-22',
        version: '1.2',
        updateNote: 'お手入れ方法追加'
    },
    'single-person-humidifier-best10.html': {
        created: '2025-02-20',
        lastModified: '2025-08-22',
        version: '1.4',
        updateNote: 'ランキング順位更新'
    },
    'humidifier-air-purifier-combo-guide.html': {
        created: '2025-03-01',
        lastModified: '2025-08-22',
        version: '1.1',
        updateNote: '新製品情報追加'
    },
    'humidifier-always-on-electricity-cost.html': {
        created: '2025-03-05',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'baby-humidifier-when-to-start.html': {
        created: '2025-03-10',
        lastModified: '2025-08-22',
        version: '1.1',
        updateNote: '専門家コメント追加'
    },
    'humidifier-mold-health-risks.html': {
        created: '2025-03-15',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'humidifier-noise-solutions.html': {
        created: '2025-03-20',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'humidifier-ineffective-causes.html': {
        created: '2025-04-01',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'office-humidifier-guide.html': {
        created: '2025-04-05',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'seasonal-humidifier-usage-guide.html': {
        created: '2025-04-10',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'humidifier-aromatherapy-guide.html': {
        created: '2025-04-15',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'large-capacity-commercial-humidifier-comparison.html': {
        created: '2025-04-20',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'humidifier-lifespan-replacement-guide.html': {
        created: '2025-05-01',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },

    // 空気清浄機記事
    'air-purifier-guide-2025.html': {
        created: '2025-01-20',
        lastModified: '2025-08-22',
        version: '2.0',
        updateNote: '2025年最新機種20選に更新'
    },
    'air-purifier-electricity-cost-comparison.html': {
        created: '2025-02-05',
        lastModified: '2025-08-22',
        version: '1.3',
        updateNote: '電気料金値上げ対応'
    },
    'baby-child-air-purifier-guide.html': {
        created: '2025-02-12',
        lastModified: '2025-08-22',
        version: '1.2',
        updateNote: 'チャイルドロック機能追加'
    },
    'single-living-air-purifier-guide.html': {
        created: '2025-02-25',
        lastModified: '2025-08-22',
        version: '1.1',
        updateNote: 'コンパクト機種追加'
    },
    'air-purifier-not-working-solutions.html': {
        created: '2025-03-02',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'air-purifier-filter-maintenance-guide.html': {
        created: '2025-03-08',
        lastModified: '2025-08-22',
        version: '1.1',
        updateNote: 'フィルター種類別メンテナンス追加'
    },
    'odor-specialized-air-purifier-guide.html': {
        created: '2025-03-12',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'bedroom-sleep-air-purifier-guide.html': {
        created: '2025-03-18',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'premium-high-end-air-purifier-guide.html': {
        created: '2025-03-25',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'seasonal-usage-settings-guide.html': {
        created: '2025-04-02',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'air-purifier-hvac-integration-guide.html': {
        created: '2025-04-08',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'compact-portable-air-purifier-guide.html': {
        created: '2025-04-12',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'pet-specialized-air-purifier-guide.html': {
        created: '2025-04-18',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'budget-price-air-purifier-guide.html': {
        created: '2025-04-25',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    },
    'allergy-specialized-air-purifier-guide.html': {
        created: '2025-05-05',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    }
};

/**
 * 現在のページの更新日情報を取得
 */
function getCurrentPageDateInfo() {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    return articleDates[filename] || {
        created: '2025-08-22',
        lastModified: '2025-08-22',
        version: '1.0',
        updateNote: '初版公開'
    };
}

/**
 * 記事ヘッダーに更新日情報を表示
 */
function displayArticleDates() {
    const dateInfo = getCurrentPageDateInfo();
    const articleMeta = document.querySelector('.article-meta');
    
    if (articleMeta) {
        // 既存の日付情報を更新、なければ新規作成
        let dateSpan = articleMeta.querySelector('.article-last-modified');
        if (!dateSpan) {
            dateSpan = document.createElement('span');
            dateSpan.className = 'article-last-modified';
            articleMeta.appendChild(dateSpan);
        }
        
        const lastModifiedDate = new Date(dateInfo.lastModified);
        const formattedDate = lastModifiedDate.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        dateSpan.innerHTML = `
            <i class="fas fa-sync-alt"></i> 
            最終更新日：${formattedDate}
            <span class="version-info" title="${dateInfo.updateNote}">
                (v${dateInfo.version})
            </span>
        `;
        
        // CSS適用
        dateSpan.style.cssText = `
            display: block;
            margin-top: 0.5rem;
            color: #666;
            font-size: 0.9rem;
        `;
        
        const versionInfo = dateSpan.querySelector('.version-info');
        if (versionInfo) {
            versionInfo.style.cssText = `
                color: #3498db;
                font-weight: bold;
                cursor: help;
            `;
        }
    }
}

/**
 * 記事の鮮度インジケーターを表示
 */
function displayFreshnessIndicator() {
    const dateInfo = getCurrentPageDateInfo();
    const lastModified = new Date(dateInfo.lastModified);
    const today = new Date();
    const daysDiff = Math.floor((today - lastModified) / (1000 * 60 * 60 * 24));
    
    // 記事ヘッダーに鮮度インジケーターを追加
    const articleHeader = document.querySelector('.article-header');
    if (articleHeader) {
        let indicator = articleHeader.querySelector('.freshness-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'freshness-indicator';
            articleHeader.appendChild(indicator);
        }
        
        let indicatorClass = 'fresh';
        let indicatorText = '最新情報';
        let indicatorIcon = 'fas fa-leaf';
        let indicatorColor = '#27ae60';
        
        if (daysDiff > 90) {
            indicatorClass = 'outdated';
            indicatorText = '要更新';
            indicatorIcon = 'fas fa-clock';
            indicatorColor = '#e74c3c';
        } else if (daysDiff > 30) {
            indicatorClass = 'moderate';
            indicatorText = '確認済み';
            indicatorIcon = 'fas fa-check-circle';
            indicatorColor = '#f39c12';
        }
        
        indicator.innerHTML = `
            <i class="${indicatorIcon}"></i> 
            <span>${indicatorText}</span>
            <small>(${daysDiff}日前更新)</small>
        `;
        
        indicator.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: ${indicatorColor};
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            font-weight: bold;
        `;
        
        const smallTag = indicator.querySelector('small');
        if (smallTag) {
            smallTag.style.opacity = '0.8';
        }
    }
}

/**
 * 更新履歴セクションを表示
 * 注：この機能は無効化されました
 */
function displayUpdateHistory() {
    // 更新履歴表示機能を無効化
    // 既存の更新履歴要素があれば削除
    const updateHistory = document.querySelector('.update-history');
    if (updateHistory) {
        updateHistory.remove();
    }
    return; // 処理を停止
}

/**
 * 構造化データ（JSON-LD）を追加
 */
function addStructuredData() {
    const dateInfo = getCurrentPageDateInfo();
    const title = document.querySelector('h1')?.textContent || document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "datePublished": dateInfo.created,
        "dateModified": dateInfo.lastModified,
        "version": dateInfo.version,
        "author": {
            "@type": "Organization",
            "name": "お得マン編集部"
        },
        "publisher": {
            "@type": "Organization",
            "name": "失敗しないお得マン！",
            "logo": {
                "@type": "ImageObject",
                "url": "https://shippai-shinai-otokuman.com/images/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        }
    };
    
    // 既存のstructured dataスクリプトを削除
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    // 新しいstructured dataを追加
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
}

/**
 * 初期化関数
 */
function initArticleDateSystem() {
    // DOM読み込み完了後に実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            displayArticleDates();
            displayFreshnessIndicator();
            displayUpdateHistory();
            addStructuredData();
        });
    } else {
        displayArticleDates();
        displayFreshnessIndicator();
        displayUpdateHistory();
        addStructuredData();
    }
}

// システム初期化
initArticleDateSystem();

// エクスポート（必要に応じて）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        articleDates,
        getCurrentPageDateInfo,
        displayArticleDates,
        displayFreshnessIndicator,
        displayUpdateHistory,
        addStructuredData
    };
}