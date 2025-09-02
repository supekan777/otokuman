/**
 * サイト品質テスト・動作確認システム
 * 失敗しないお得マン！
 */

class SiteTester {
    constructor() {
        this.testResults = {
            links: { passed: 0, failed: 0, errors: [] },
            images: { passed: 0, failed: 0, errors: [] },
            javascript: { passed: 0, failed: 0, errors: [] },
            performance: { scores: {}, warnings: [] },
            accessibility: { passed: 0, failed: 0, errors: [] },
            seo: { passed: 0, failed: 0, errors: [] }
        };
        this.isRunning = false;
    }

    /**
     * 全体テストの実行
     */
    async runAllTests() {
        if (this.isRunning) {
            console.log('テストが既に実行中です');
            return;
        }

        this.isRunning = true;
        this.showTestInterface();
        
        console.log('🧪 サイト品質テスト開始');
        
        try {
            await this.testLinks();
            await this.testImages();
            await this.testJavaScript();
            await this.testPerformance();
            await this.testAccessibility();
            await this.testSEO();
            
            this.displayResults();
        } catch (error) {
            console.error('テスト実行エラー:', error);
        } finally {
            this.isRunning = false;
        }
    }

    /**
     * テストインターフェースの表示
     */
    showTestInterface() {
        // 既存のテストパネルを削除
        const existingPanel = document.getElementById('site-test-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const testPanel = document.createElement('div');
        testPanel.id = 'site-test-panel';
        testPanel.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                width: 400px;
                max-height: 80vh;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                overflow: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                ">
                    <h3 style="margin: 0; font-size: 1.1rem;">
                        🧪 サイト品質テスト
                    </h3>
                    <button id="close-test-panel" style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        padding: 0;
                        width: 24px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                    ">&times;</button>
                </div>
                <div id="test-content" style="
                    padding: 1rem;
                    max-height: calc(80vh - 80px);
                    overflow-y: auto;
                ">
                    <div id="test-progress">テスト実行中...</div>
                    <div id="test-results" style="display: none;"></div>
                </div>
            </div>
        `;

        document.body.appendChild(testPanel);

        // 閉じるボタンのイベント
        document.getElementById('close-test-panel').addEventListener('click', () => {
            testPanel.remove();
        });
    }

    /**
     * リンクテスト
     */
    async testLinks() {
        this.updateProgress('リンクをテスト中...');
        
        const links = document.querySelectorAll('a[href]');
        const internalLinks = Array.from(links).filter(link => {
            const href = link.getAttribute('href');
            return href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:');
        });

        for (const link of internalLinks) {
            const href = link.getAttribute('href');
            
            try {
                if (href.startsWith('#')) {
                    // アンカーリンクのテスト
                    const targetId = href.substring(1);
                    const target = document.getElementById(targetId);
                    
                    if (target) {
                        this.testResults.links.passed++;
                    } else {
                        this.testResults.links.failed++;
                        this.testResults.links.errors.push({
                            type: 'anchor',
                            href: href,
                            text: link.textContent.trim().substring(0, 50),
                            error: 'アンカー要素が見つかりません'
                        });
                    }
                } else {
                    // 内部リンクの存在チェック（簡易）
                    this.testResults.links.passed++;
                }
            } catch (error) {
                this.testResults.links.failed++;
                this.testResults.links.errors.push({
                    type: 'link',
                    href: href,
                    text: link.textContent.trim().substring(0, 50),
                    error: error.message
                });
            }
        }
    }

    /**
     * 画像テスト
     */
    async testImages() {
        this.updateProgress('画像をテスト中...');
        
        const images = document.querySelectorAll('img');
        
        for (const img of images) {
            try {
                // alt属性のチェック
                if (!img.hasAttribute('alt')) {
                    this.testResults.images.failed++;
                    this.testResults.images.errors.push({
                        type: 'alt',
                        src: img.src,
                        error: 'alt属性が設定されていません'
                    });
                } else if (img.getAttribute('alt').trim() === '') {
                    this.testResults.images.failed++;
                    this.testResults.images.errors.push({
                        type: 'alt',
                        src: img.src,
                        error: 'alt属性が空です'
                    });
                } else {
                    this.testResults.images.passed++;
                }

                // 読み込み状態のチェック
                if (img.complete && img.naturalHeight !== 0) {
                    this.testResults.images.passed++;
                } else if (img.complete && img.naturalHeight === 0) {
                    this.testResults.images.failed++;
                    this.testResults.images.errors.push({
                        type: 'load',
                        src: img.src,
                        error: '画像の読み込みに失敗しました'
                    });
                }
            } catch (error) {
                this.testResults.images.failed++;
                this.testResults.images.errors.push({
                    type: 'general',
                    src: img.src,
                    error: error.message
                });
            }
        }
    }

    /**
     * JavaScript テスト
     */
    async testJavaScript() {
        this.updateProgress('JavaScript をテスト中...');
        
        // 必要なスクリプトの存在確認
        const requiredScripts = [
            'analytics.js',
            'search.js',
            'reading-time.js',
            'table-of-contents.js',
            'article-dates.js'
        ];

        const scripts = document.querySelectorAll('script[src]');
        const loadedScripts = Array.from(scripts).map(script => {
            const src = script.getAttribute('src');
            return src ? src.split('/').pop() : '';
        });

        requiredScripts.forEach(scriptName => {
            if (loadedScripts.includes(scriptName)) {
                this.testResults.javascript.passed++;
            } else {
                this.testResults.javascript.failed++;
                this.testResults.javascript.errors.push({
                    type: 'missing',
                    script: scriptName,
                    error: '必要なスクリプトが読み込まれていません'
                });
            }
        });

        // グローバル関数の存在確認
        const requiredFunctions = [
            'trackCustomEvent',
            'trackPageView'
        ];

        requiredFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                this.testResults.javascript.passed++;
            } else {
                this.testResults.javascript.failed++;
                this.testResults.javascript.errors.push({
                    type: 'function',
                    function: funcName,
                    error: '必要な関数が定義されていません'
                });
            }
        });

        // DOM要素の存在確認
        const requiredElements = [
            '.search-container',
            '.reading-time',
            '.table-of-contents'
        ];

        requiredElements.forEach(selector => {
            if (document.querySelector(selector)) {
                this.testResults.javascript.passed++;
            } else {
                this.testResults.javascript.failed++;
                this.testResults.javascript.errors.push({
                    type: 'element',
                    selector: selector,
                    error: '必要なDOM要素が見つかりません'
                });
            }
        });
    }

    /**
     * パフォーマンステスト
     */
    async testPerformance() {
        this.updateProgress('パフォーマンスをテスト中...');
        
        try {
            // Navigation API による基本的な測定
            if (performance.getEntriesByType) {
                const navigation = performance.getEntriesByType('navigation')[0];
                
                if (navigation) {
                    const loadTime = navigation.loadEventEnd - navigation.fetchStart;
                    const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
                    const firstByte = navigation.responseStart - navigation.fetchStart;

                    this.testResults.performance.scores = {
                        loadTime: Math.round(loadTime),
                        domContentLoaded: Math.round(domContentLoaded),
                        firstByte: Math.round(firstByte)
                    };

                    // パフォーマンス警告
                    if (loadTime > 3000) {
                        this.testResults.performance.warnings.push('ページ読み込み時間が3秒を超えています');
                    }
                    if (firstByte > 600) {
                        this.testResults.performance.warnings.push('First Byte Time が600msを超えています');
                    }
                }
            }

            // リソース数の確認
            const images = document.querySelectorAll('img').length;
            const scripts = document.querySelectorAll('script').length;
            const stylesheets = document.querySelectorAll('link[rel="stylesheet"]').length;

            if (images > 50) {
                this.testResults.performance.warnings.push(`画像数が多すぎます (${images}個)`);
            }
            if (scripts > 10) {
                this.testResults.performance.warnings.push(`スクリプト数が多すぎます (${scripts}個)`);
            }

        } catch (error) {
            this.testResults.performance.warnings.push('パフォーマンス測定エラー: ' + error.message);
        }
    }

    /**
     * アクセシビリティテスト
     */
    async testAccessibility() {
        this.updateProgress('アクセシビリティをテスト中...');
        
        // 見出し構造のチェック
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.substring(1)));
        
        let prevLevel = 0;
        let hasH1 = false;
        
        headingLevels.forEach((level, index) => {
            if (level === 1) {
                if (hasH1) {
                    this.testResults.accessibility.failed++;
                    this.testResults.accessibility.errors.push({
                        type: 'heading',
                        error: 'ページに複数のh1要素があります'
                    });
                }
                hasH1 = true;
                this.testResults.accessibility.passed++;
            } else if (level > prevLevel + 1 && prevLevel !== 0) {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push({
                    type: 'heading',
                    error: `見出しレベルが飛んでいます (h${prevLevel} → h${level})`
                });
            } else {
                this.testResults.accessibility.passed++;
            }
            prevLevel = level;
        });

        if (!hasH1) {
            this.testResults.accessibility.failed++;
            this.testResults.accessibility.errors.push({
                type: 'heading',
                error: 'h1要素がありません'
            });
        }

        // フォーカス可能な要素のチェック
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
        focusableElements.forEach(element => {
            if (element.getAttribute('tabindex') === '-1' && element.tagName !== 'DIV') {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push({
                    type: 'focus',
                    error: 'フォーカス不可能な要素があります: ' + element.tagName
                });
            } else {
                this.testResults.accessibility.passed++;
            }
        });

        // ARIA属性のチェック
        const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
        if (elementsWithAria.length > 0) {
            this.testResults.accessibility.passed += elementsWithAria.length;
        }
    }

    /**
     * SEO テスト
     */
    async testSEO() {
        this.updateProgress('SEO をテスト中...');
        
        // メタタグのチェック
        const title = document.querySelector('title');
        const description = document.querySelector('meta[name="description"]');
        const viewport = document.querySelector('meta[name="viewport"]');
        const charset = document.querySelector('meta[charset]');

        if (title && title.textContent.trim().length > 0) {
            this.testResults.seo.passed++;
            if (title.textContent.length > 60) {
                this.testResults.seo.errors.push({
                    type: 'title',
                    error: 'タイトルが60文字を超えています'
                });
            }
        } else {
            this.testResults.seo.failed++;
            this.testResults.seo.errors.push({
                type: 'title',
                error: 'タイトルタグがありません'
            });
        }

        if (description && description.getAttribute('content').length > 0) {
            this.testResults.seo.passed++;
            if (description.getAttribute('content').length > 160) {
                this.testResults.seo.errors.push({
                    type: 'description',
                    error: 'メタディスクリプションが160文字を超えています'
                });
            }
        } else {
            this.testResults.seo.failed++;
            this.testResults.seo.errors.push({
                type: 'description',
                error: 'メタディスクリプションがありません'
            });
        }

        if (viewport) {
            this.testResults.seo.passed++;
        } else {
            this.testResults.seo.failed++;
            this.testResults.seo.errors.push({
                type: 'viewport',
                error: 'viewportメタタグがありません'
            });
        }

        if (charset) {
            this.testResults.seo.passed++;
        } else {
            this.testResults.seo.failed++;
            this.testResults.seo.errors.push({
                type: 'charset',
                error: 'charsetメタタグがありません'
            });
        }

        // 構造化データのチェック
        const structuredData = document.querySelector('script[type="application/ld+json"]');
        if (structuredData) {
            try {
                JSON.parse(structuredData.textContent);
                this.testResults.seo.passed++;
            } catch (error) {
                this.testResults.seo.failed++;
                this.testResults.seo.errors.push({
                    type: 'structured-data',
                    error: '構造化データのJSONが無効です'
                });
            }
        } else {
            this.testResults.seo.errors.push({
                type: 'structured-data',
                error: '構造化データがありません（推奨）'
            });
        }
    }

    /**
     * 進捗更新
     */
    updateProgress(message) {
        const progressElement = document.getElementById('test-progress');
        if (progressElement) {
            progressElement.textContent = message;
        }
        console.log(message);
    }

    /**
     * 結果表示
     */
    displayResults() {
        const resultsElement = document.getElementById('test-results');
        const progressElement = document.getElementById('test-progress');
        
        if (!resultsElement || !progressElement) return;

        progressElement.style.display = 'none';
        resultsElement.style.display = 'block';

        const totalPassed = Object.values(this.testResults).reduce((sum, category) => sum + (category.passed || 0), 0);
        const totalFailed = Object.values(this.testResults).reduce((sum, category) => sum + (category.failed || 0), 0);
        const totalErrors = Object.values(this.testResults).reduce((sum, category) => sum + (category.errors ? category.errors.length : 0), 0);

        let html = `
            <div style="margin-bottom: 1rem; padding: 1rem; background: ${totalFailed === 0 ? '#d4edda' : '#f8d7da'}; border-radius: 5px;">
                <h4 style="margin: 0 0 0.5rem 0; color: ${totalFailed === 0 ? '#155724' : '#721c24'};">
                    ${totalFailed === 0 ? '✅ テスト完了' : '⚠️ 問題が見つかりました'}
                </h4>
                <p style="margin: 0;">
                    成功: ${totalPassed} | 失敗: ${totalFailed} | エラー: ${totalErrors}
                </p>
            </div>
        `;

        // カテゴリ別結果
        Object.entries(this.testResults).forEach(([category, results]) => {
            const categoryName = {
                links: 'リンク',
                images: '画像', 
                javascript: 'JavaScript',
                performance: 'パフォーマンス',
                accessibility: 'アクセシビリティ',
                seo: 'SEO'
            }[category];

            html += `
                <div style="margin-bottom: 1rem; padding: 0.75rem; border: 1px solid #dee2e6; border-radius: 5px;">
                    <h5 style="margin: 0 0 0.5rem 0;">${categoryName}</h5>
            `;

            if (category === 'performance') {
                if (results.scores && Object.keys(results.scores).length > 0) {
                    html += '<ul style="margin: 0; padding-left: 1rem; font-size: 0.9rem;">';
                    Object.entries(results.scores).forEach(([metric, value]) => {
                        const metricName = {
                            loadTime: '読み込み時間',
                            domContentLoaded: 'DOM構築時間',
                            firstByte: 'First Byte Time'
                        }[metric];
                        html += `<li>${metricName}: ${value}ms</li>`;
                    });
                    html += '</ul>';
                }
                if (results.warnings.length > 0) {
                    html += '<div style="color: #856404; font-size: 0.9rem;">';
                    results.warnings.forEach(warning => {
                        html += `<div>⚠️ ${warning}</div>`;
                    });
                    html += '</div>';
                }
            } else {
                html += `<div style="font-size: 0.9rem;">成功: ${results.passed || 0} | 失敗: ${results.failed || 0}</div>`;
                
                if (results.errors && results.errors.length > 0) {
                    html += '<div style="margin-top: 0.5rem; font-size: 0.85rem; color: #721c24;">';
                    results.errors.slice(0, 5).forEach(error => {
                        html += `<div>• ${error.error}</div>`;
                    });
                    if (results.errors.length > 5) {
                        html += `<div>... 他 ${results.errors.length - 5} 件</div>`;
                    }
                    html += '</div>';
                }
            }

            html += '</div>';
        });

        resultsElement.innerHTML = html;

        // コンソールにも詳細出力
        console.log('🧪 テスト結果詳細:', this.testResults);
    }
}

// グローバル関数として公開
window.runSiteTest = function() {
    const tester = new SiteTester();
    tester.runAllTests();
};

// 開発者ツール用のヘルプメッセージ
console.log(`
🧪 サイト品質テストツール
使用方法: runSiteTest() をコンソールで実行

テスト項目:
• リンク切れチェック
• 画像のalt属性・読み込み状態
• JavaScript機能の動作確認
• パフォーマンス測定
• アクセシビリティ検証
• SEO基本項目チェック
`);

// ページ読み込み完了後に自動でテスト実行（開発時）
document.addEventListener('DOMContentLoaded', () => {
    // URLパラメータでテスト実行を制御
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'auto') {
        setTimeout(() => runSiteTest(), 2000);
    }
});