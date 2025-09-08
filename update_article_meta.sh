#!/bin/bash

# 全記事のarticle-metaを統一するスクリプト

echo "記事のarticle-metaを統一中..."

# 更新対象のHTMLファイル一覧を取得
find articles/ -name "*.html" -type f | while read -r file; do
    echo "処理中: $file"
    
    # article-metaセクションを統一フォーマットに置換
    # 複数行にまたがるarticle-metaセクションを検索・置換
    sed -i '/class="article-meta"/,/<\/div>/{
        /class="article-meta"/c\
                <div class="article-meta">\
                    <span class="date"><i class="far fa-calendar"></i> 最終更新日：2025年8月24日</span>\
                </div>
        /<\/div>/d
        d
    }' "$file"
    
done

echo "全記事のarticle-meta統一完了！"