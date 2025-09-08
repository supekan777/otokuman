# 家電特化サイト テンプレート完全リファレンス

## 🎯 概要
このドキュメントは「失敗しないお得マン！」サイトの記事テンプレートシステムの完全な仕様書です。
参照記事：`humidifier-guide-2025.html` の完全なデザイン構造を再現します。

## 📁 ファイル構成
- `article-template.html` - HTMLテンプレート（99行）
- `template-styles.css` - 専用スタイルシート（414行）
- `TEMPLATE_README.md` - 適用手順書（140行）
- `TEMPLATE_COMPLETE_REFERENCE.md` - この完全リファレンス

## 🔧 置換変数システム

### 必須変数（8個）
```
{{ARTICLE_TITLE}}        - 記事タイトル
{{ARTICLE_DESCRIPTION}}  - meta description
{{CANONICAL_URL}}        - 正規URL（http://13.238.219.164/articles/...）
{{CATEGORY_URL}}         - カテゴリーURL（../pages/humidifier.html）
{{CATEGORY_NAME}}        - カテゴリー名（加湿器）
{{BREADCRUMB_TITLE}}     - パンくず最終項目
{{UPDATE_DATE}}          - 更新日（2025年8月24日形式）
{{TOC_ITEMS}}           - 目次項目（<li><a href="#section">タイトル</a></li>）
{{ARTICLE_CONTENT}}     - 記事本文HTML
```

### 使用例
```html
<title>{{ARTICLE_TITLE}} | 失敗しないお得マン！</title>
<meta name="description" content="{{ARTICLE_DESCRIPTION}}">
<link rel="canonical" href="{{CANONICAL_URL}}">
```

## 🎨 デザインシステム

### カラーパレット
```css
:root {
    --primary-color: #16a34a;      /* メインのグリーン */
    --primary-light: #22c55e;      /* 明るいグリーン */
    --secondary-color: #374151;    /* セカンダリーグレー */
    --accent-color: #fbbf24;       /* アクセントイエロー */
    --background-light: #f0fdf4;   /* 薄いグリーン背景 */
    --background-white: #ffffff;   /* 白背景 */
    --text-dark: #1f2937;          /* ダークグレー文字 */
    --text-light: #6b7280;         /* ライトグレー文字 */
    --border-color: #d1d5db;       /* ボーダー色 */
}
```

### レスポンシブブレークポイント
```css
@media (max-width: 768px)  /* タブレット */
@media (max-width: 480px)  /* スマートフォン */
```

## 📱 HTML構造

### 基本構造
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- メタタグ -->
    <!-- CSS読み込み（8個） -->
    <!-- Chart.js -->
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">...</div>
                <ul class="nav-menu">...</ul>
            </div>
        </nav>
    </header>
    
    <main class="main article-main">
        <article class="article-container">
            <nav class="breadcrumb">...</nav>
            <header class="article-header">...</header>
            <div class="toc">...</div>
            <div class="article-content">...</div>
        </article>
    </main>
    
    <footer class="footer">...</footer>
</body>
</html>
```

### 必須CSS読み込み順序
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/mobile.css">
<link rel="stylesheet" href="../css/overflow-fix.css">
<link rel="stylesheet" href="../css/article.css">
<link rel="stylesheet" href="../css/related-articles.css">
<link rel="stylesheet" href="../css/image-enhancements.css">
<link rel="stylesheet" href="../template-styles.css">
```

## 🧭 ナビゲーション

### ヘッダーナビ
```html
<ul class="nav-menu">
    <li><a href="../index.html" class="nav-link">ホーム</a></li>
    <li><a href="../pages/humidifier.html" class="nav-link">加湿器</a></li>
    <li><a href="../pages/ranking.html" class="nav-link">ランキング</a></li>
</ul>
```

### パンくずナビ
```html
<nav class="breadcrumb">
    <a href="../index.html">ホーム</a> &gt; 
    <a href="{{CATEGORY_URL}}">{{CATEGORY_NAME}}</a> &gt; 
    <span>{{BREADCRUMB_TITLE}}</span>
</nav>
```

## 📝 目次システム

### 目次HTML
```html
<div class="toc">
    <h2>目次</h2>
    <ol>
        {{TOC_ITEMS}}
    </ol>
</div>
```

### 目次項目例
```html
<li><a href="#introduction">はじめに</a></li>
<li><a href="#selection">選び方のポイント</a></li>
<li><a href="#ranking">おすすめランキング</a></li>
<li><a href="#comparison">詳細比較</a></li>
<li><a href="#faq">よくある質問</a></li>
<li><a href="#conclusion">まとめ</a></li>
```

### 対応セクションID
```html
<section id="introduction">
<section id="selection">
<section id="ranking">
<section id="comparison">
<section id="faq">
<section id="conclusion">
```

## 🎨 記事コンテンツスタイル

### 見出し階層
```css
.article-content h2    /* font-size: 1.75rem, border-bottom: 3px solid green */
.article-content h3    /* font-size: 1.5rem */
.article-content h4    /* font-size: 1.25rem */
```

### 特殊ボックス
```css
.info-box      /* 緑の左ボーダー、薄緑背景 */
.warning-box   /* オレンジの左ボーダー、薄黄背景 */
.product-card  /* 商品カード、グラデーションヘッダー */
```

## 📐 レイアウト仕様

### コンテナサイズ
```css
.article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
```

### 固定ヘッダー
```css
.header {
    position: fixed;
    top: 0;
    z-index: 1000;
}

.main.article-main {
    margin-top: 100px;  /* ヘッダー分 */
}
```

## 🚀 適用手順

### 1. 新規記事作成
```bash
# テンプレートコピー
cp article-template.html new-article.html

# 変数置換
sed -i 's/{{ARTICLE_TITLE}}/新しい記事タイトル/g' new-article.html
sed -i 's/{{UPDATE_DATE}}/2025年8月24日/g' new-article.html
```

### 2. 既存記事修正
```bash
# バックアップ作成
cp existing-article.html existing-article.html.bak

# テンプレート適用
# head部分、ヘッダー部分、フッター部分を置換
```

## 🔍 指示文言

### 新規作成
```
「テンプレート新規作成：[タイトル] - [カテゴリー] - [説明]」
```

### 既存適用
```
「テンプレート適用：[URL] - [更新日]」
```

### 修正
```
「テンプレート修正：[内容] - [ファイル]」
```

### デプロイ
```
「デプロイ実行」
```

## 📊 検証チェックリスト

### デザイン確認
- ✅ ヘッダーが固定表示される
- ✅ パンくずリストが正しく表示される  
- ✅ 記事ヘッダーが適切に表示される
- ✅ 目次のグリーン枠とホバー効果
- ✅ 全体のカラー統一（グリーンベース）
- ✅ レスポンシブ対応（768px, 480px）

### 機能確認
- ✅ 目次リンクが正常動作
- ✅ ナビゲーションリンクが正常動作
- ✅ Chart.js（使用時）が正常動作
- ✅ Font Awesomeアイコンが表示
- ✅ モバイル表示が適切

### SEO確認
- ✅ meta descriptionが適切
- ✅ canonical URLが設定
- ✅ 見出し階層が適切
- ✅ パンくず構造化データ（Schema.org）

## 🔧 トラブルシューティング

### よくある問題
1. **CSS読み込み順序エラー** → template-styles.cssを最後に読み込む
2. **目次リンク動作しない** → セクションIDと目次hrefを一致させる
3. **レスポンシブ崩れ** → viewport metaタグを確認
4. **アイコン表示されない** → Font Awesome CDNを確認

### デバッグ用CSS
```css
/* デバッグ用 - 本番では削除 */
.article-container { border: 1px solid red; }
.toc { border: 1px solid blue; }
.breadcrumb { border: 1px solid green; }
```

## 📈 更新履歴

- 2025-09-07: 初版作成
- 参照記事: `humidifier-guide-2025.html`
- 更新者: Claude Code Assistant

---

**このリファレンスを使用することで、いつでも完全な記事テンプレートシステムを再現可能です。**