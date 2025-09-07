# 記事テンプレート適用ガイド

## 概要
このテンプレートは`humidifier-guide-2025.html`の完全なデザイン構造を再現するために作成されました。

## ファイル構成
- `article-template.html` - HTMLテンプレート
- `template-styles.css` - 専用スタイルシート  
- `TEMPLATE_README.md` - この説明書

## テンプレート適用手順

### 1. テンプレートの準備
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- 必要なmetaタグとCSS読み込み -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/article.css">
    <link rel="stylesheet" href="../css/template-styles.css">
</head>
```

### 2. 置換変数一覧

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `{{ARTICLE_TITLE}}` | 記事タイトル | "大容量業務用加湿器比較ガイド" |
| `{{ARTICLE_DESCRIPTION}}` | meta description | "業務用加湿器の選び方と比較" |
| `{{CANONICAL_URL}}` | 正規URL | "http://13.238.219.164/articles/..." |
| `{{CATEGORY_URL}}` | カテゴリーURL | "../pages/humidifier.html" |
| `{{CATEGORY_NAME}}` | カテゴリー名 | "加湿器" |
| `{{BREADCRUMB_TITLE}}` | パンくず最終項目 | "大容量業務用加湿器比較" |
| `{{UPDATE_DATE}}` | 更新日 | "2025年1月15日" |
| `{{TOC_ITEMS}}` | 目次項目 | HTMLのliタグリスト |
| `{{ARTICLE_CONTENT}}` | 記事本文 | 実際のコンテンツ |

### 3. 目次(TOC)の作成方法
```html
<li><a href="#section1" class="toc-link">はじめに</a></li>
<li><a href="#section2" class="toc-link">選び方のポイント</a></li>
<li><a href="#section3" class="toc-link">おすすめ商品</a></li>
```

対応するセクションには必ずidを付与：
```html
<section id="section1">
    <h2>はじめに</h2>
    <!-- コンテンツ -->
</section>
```

### 4. カラーパレット
```css
:root {
    --primary-color: #16a34a;      /* メインのグリーン */
    --primary-light: #22c55e;      /* 明るいグリーン */
    --background-light: #f0fdf4;   /* 薄いグリーン背景 */
    --text-dark: #1f2937;          /* ダークグレー文字 */
    --text-light: #6b7280;         /* ライトグレー文字 */
    --border-color: #d1d5db;       /* ボーダー色 */
}
```

### 5. 実際の適用例

#### 既存記事を修正する場合:
1. 既存HTMLファイルを開く
2. `<head>`セクションを更新
3. ヘッダー部分を以下に置換:
```html
<header class="header">
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../index.html">
                    <h1><i class="fas fa-home"></i> 失敗しないお得マン！</h1>
                    <span class="tagline">家電選びの専門サイト</span>
                </a>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html" class="nav-link">ホーム</a></li>
                <li><a href="../pages/humidifier.html" class="nav-link">加湿器</a></li>
                <li><a href="../pages/ranking.html" class="nav-link">ランキング</a></li>
            </ul>
        </div>
    </nav>
</header>
```

4. パンくずリストを追加:
```html
<div class="breadcrumb-container">
    <nav class="breadcrumb">
        <a href="../index.html" class="breadcrumb-link">ホーム</a>
        <span class="breadcrumb-separator">&gt;</span>
        <a href="../pages/humidifier.html" class="breadcrumb-link">加湿器</a>
        <span class="breadcrumb-separator">&gt;</span>
        <span class="breadcrumb-current">記事タイトル</span>
    </nav>
</div>
```

5. 記事ヘッダーを更新:
```html
<div class="article-header">
    <h1 class="article-title">記事タイトル</h1>
    <div class="article-meta">
        <span class="update-date">最終更新日：2025年1月15日</span>
    </div>
</div>
```

6. 目次セクションを追加:
```html
<div class="toc">
    <h2 class="toc-title">目次</h2>
    <ul class="toc-list">
        <!-- 各セクションへのリンク -->
    </ul>
</div>
```

### 6. 注意点
- 必ず`template-styles.css`を読み込む
- セクションIDと目次リンクを一致させる  
- レスポンシブ対応済み(768px、480px breakpoints)
- Font Awesome アイコンが必要
- Chart.jsを使用する場合は適宜読み込み

### 7. 検証項目
✅ ヘッダーが固定表示される  
✅ パンくずリストが正しく表示される  
✅ 記事ヘッダーのグラデーション背景  
✅ 目次のグリーン枠とホバー効果  
✅ 全体のカラー統一  
✅ レスポンシブ対応

このテンプレートにより、`humidifier-guide-2025.html`と完全に同じデザイン構造を再現できます。