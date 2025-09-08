# 技術詳細仕様書 - 失敗しないお得マン！

## 🧩 アフィリエイト・マネタイズ構造

### Moshimoアフィリエイト実装
- **ASP**: Moshimo Affiliate（もしもアフィリエイト）
- **実装方式**: MoshimoAffiliateEasyLink
- **対応EC**: 楽天市場、Yahoo!ショッピング
- **アフィリエイトID**: 
  - 楽天: `a_id=5147828, p_id=54, pl_id=27059, pc_id=54`
  - Yahoo: `a_id=5147829, p_id=1225, pl_id=27061, pc_id=1925`

### 商品リンク管理
```
商品リンク/
└── 加湿器/
    ├── EE-DE50.txt (象印 EE-DE50-HA)
    ├── EE-FA50.txt (象印 STAN. EE-FA50-BA)
    ├── EE-TB60.txt (象印 EE-TB60-BM)
    ├── HD-RXT924.txt (ダイニチ HD-RXT924-W)
    └── SHE120VD.txt (三菱重工 SHE120VD)
```

### アフィリエイトリンク形式
```html
<!-- Moshimoアフィリエイト実装例 -->
<script type="text/javascript">
msmaflink({
    "n": "商品名",
    "u": {"u": "楽天URL", "t": "rakuten"},
    "b_l": [
        {"u_tx": "楽天市場で見る", "u_bc": "#f76956", "s_n": "rakuten"},
        {"u_tx": "Yahoo!ショッピングで見る", "u_bc": "#66a7ff", "s_n": "yahoo"}
    ]
});
</script>
```

## 🔧 JavaScript機能詳細

### 1. パフォーマンス最適化 (`performance-optimizer.js`)
**主要機能**:
- **遅延画像読み込み**: Intersection Observer API
- **リソースヒント**: DNS prefetch, preconnect, preload
- **クリティカルリソース制御**: 優先度付きローディング
- **Core Web Vitals監視**: FCP, LCP, CLS, FID測定

**設定値**:
```javascript
imageObserverOptions = {
    root: null,
    rootMargin: '50px',  // 50px手前から読み込み開始
    threshold: 0.01
}
```

### 2. 分析・トラッキング (`analytics.js`)
**Google Analytics設定**:
```javascript
GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // 要設定
GSC_VERIFICATION_CODE = 'your-google-search-console-verification-code';
```

**プライバシー配慮**:
```javascript
gtag('config', GA_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
});
```

### 3. サイト品質監視 (`site-tester.js`)
**テスト項目**:
- リンク切れチェック（内部・アンカー）
- 画像alt属性検証
- JavaScript関数存在確認
- パフォーマンス測定
- アクセシビリティ検証
- SEO基本項目チェック

### 4. モバイル最適化 (`mobile-optimizer.js`)
**最適化内容**:
- タッチデバイス検出・最適化
- ビューポート調整
- フォーム入力最適化
- ハンバーガーメニュー制御
- スワイプジェスチャー対応

### 5. その他のJavaScript機能
- **検索機能** (`search.js`): サイト内記事検索
- **目次自動生成** (`table-of-contents.js`): h2-h4から目次作成
- **読了時間計算** (`reading-time.js`): 文字数ベース算出
- **記事日付管理** (`article-dates.js`): 更新日自動反映
- **画像システム** (`image-system.js`): 画像最適化統合管理
- **ソーシャルメタ** (`social-meta-tags.js`): OGP動的生成

## 📊 管理画面システム

### 管理画面構成 (`admin/`)
```
admin/
├── index.html - 管理画面メイン
├── admin.css - 管理画面専用CSS
└── admin.js - 管理画面JavaScript
```

### 管理機能
- **ダッシュボード**: PV数、人気記事表示
- **商品管理**: 商品情報CRUD操作
- **記事管理**: 記事の作成・編集・公開管理
- **分析レポート**: Chart.js使用のグラフ表示
- **アフィリエイト管理**: リンク効果測定
- **SEO管理**: メタデータ一括編集
- **設定**: サイト基本情報管理

### Chart.js実装
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```
- アクセス解析グラフ
- 収益推移チャート
- 人気記事ランキング表示

## 🎨 CSS構造詳細

### CSS設計思想
- **カスケーディング**: コンポーネントベース設計
- **CSS Variables**: カスタムプロパティで色・サイズ管理
- **レスポンシブ**: Mobile-First アプローチ
- **パフォーマンス**: クリティカルCSS分離

### CSS Variables定義
```css
:root {
    --primary-color: #16a34a;
    --secondary-color: #059669;
    --accent-color: #047857;
    --text-dark: #0f172a;
    --text-light: #475569;
    --background-light: #f0fdf4;
    --border-color: #d1d5db;
    --gradient-primary: linear-gradient(135deg, #16a34a 0%, #059669 100%);
}
```

### CSS構成
1. **style.css**: メインスタイル（変数、基本レイアウト）
2. **article.css**: 記事ページ専用（読みやすさ重視）
3. **product-page.css**: 商品ページ（カード、グリッド）
4. **mobile.css**: モバイル専用調整
5. **overflow-fix.css**: レイアウト崩れ防止
6. **image-enhancements.css**: 画像表示最適化

## 🔍 SEO・構造化データ詳細

### JSON-LD構造化データ実装済み
**実装スキーマ**:
- `WebSite` - サイト情報
- `Organization` - 運営組織情報  
- `BreadcrumbList` - パンくず構造
- `ItemList` - 商品・記事一覧
- `Article` - 記事詳細（作者、公開日等）
- `Product` - 商品情報（価格、評価等）
- `FAQPage` - よくある質問

### メタタグ最適化
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="robots" content="index,follow">
<meta name="googlebot" content="index,follow">
```

### サイトマップ・robots.txt
- **sitemap.xml**: 全URL含有、週次更新想定
- **robots.txt**: クローラー制御設定

## 🛠️ 開発・テスト環境

### 品質管理システム
**自動テスト** (`site-tester.js`):
```javascript
// テスト実行コマンド
runSiteTest();       // 基本品質テスト
runMobileTest();     // モバイル最適化テスト
runPerformanceTest(); // パフォーマンステスト
```

**テスト項目**:
- HTML検証（W3C準拠）
- リンク切れ検出
- 画像最適化状況
- JavaScript エラー検出
- Core Web Vitals測定

### レポートシステム
自動生成されるレポート:
1. **品質テストレポート** (`QUALITY_TEST_REPORT.md`)
2. **パフォーマンス最適化レポート** (`PAGE_SPEED_OPTIMIZATION_REPORT.md`)
3. **画像実装レポート** (`IMAGE_IMPLEMENTATION_REPORT.md`)
4. **構造化データレポート** (`STRUCTURED_DATA_IMPLEMENTATION_REPORT.md`)
5. **EC2デプロイレポート** (`EC2_DEPLOYMENT_REPORT.md`)

## 🔒 セキュリティ・プライバシー対策

### セキュリティ実装
- **CSP**: Content Security Policy（ヘッダー設定）
- **HTTPS**: SSL証明書対応準備済み
- **XSS対策**: エスケープ処理実装
- **SQLインジェクション対策**: 静的サイトのため該当なし

### プライバシー対策
- **Cookie使用最小限**: 分析目的のみ
- **IP匿名化**: Google Analytics設定済み
- **データ削除権**: 問い合わせフォーム対応
- **個人情報保護**: プライバシーポリシー完備

## 📈 パフォーマンス指標目標値

### Core Web Vitals目標
- **LCP** (Largest Contentful Paint): < 2.5秒
- **FID** (First Input Delay): < 100ミリ秒  
- **CLS** (Cumulative Layout Shift): < 0.1

### 実装済み最適化効果
- 初期読み込み: **30-50% 削減**
- 画像データ量: **60-80% 削減**
- DNS解決: **20-40ms 短縮**

## 🔄 継続運用・保守

### 定期メンテナンス項目
1. **月次**:
   - EC2スナップショット作成
   - アフィリエイトリンク有効性確認
   - 記事内容・価格情報更新

2. **週次**:
   - サイトマップ更新
   - 品質テスト実行
   - アクセス解析レビュー

3. **日次**:
   - 自動バックアップ確認
   - エラーログ監視
   - セキュリティアラート確認

### アップデート戦略
- **Google Core Update対応**: アルゴリズム変更追従
- **技術トレンド**: 新しいWeb標準採用検討
- **ユーザビリティ改善**: A/Bテスト実装
- **収益最適化**: アフィリエイト戦略見直し

---

**この技術詳細書は開発・運用時の技術参考資料として活用**