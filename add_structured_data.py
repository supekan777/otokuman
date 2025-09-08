#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
記事ページに構造化データ（JSON-LD）を追加するスクリプト
"""

import os
import re
from datetime import datetime

# 記事ファイルのパス
ARTICLES_DIR = "articles"

# 記事情報のマッピング
ARTICLES_DATA = {
    "air-purifier-electricity-cost-comparison.html": {
        "headline": "【2025年】空気清浄機の電気代を徹底比較！省エネモデルと節約テクニック",
        "description": "空気清浄機の電気代をメーカー・機種別に徹底比較。年間電気代を抑える省エネモデルと節約テクニックを詳しく解説します。",
        "category": "コスト・節約",
        "keywords": ["空気清浄機", "電気代", "比較", "省エネ", "節約"],
        "readTime": "PT12M"
    },
    "air-purifier-filter-maintenance-guide.html": {
        "headline": "【完全版】空気清浄機フィルター交換・メンテナンス完全ガイド",
        "description": "空気清浄機のフィルター交換時期から正しいメンテナンス方法まで完全解説。長く清潔に使うためのプロのテクニックを紹介します。",
        "category": "メンテナンス",
        "keywords": ["空気清浄機", "フィルター", "メンテナンス", "交換", "掃除"],
        "readTime": "PT14M"
    },
    "air-purifier-guide-2025.html": {
        "headline": "【2025年最新】空気清浄機おすすめランキング！選び方から使い方まで徹底解説",
        "description": "2025年最新の空気清浄機おすすめランキング。花粉・PM2.5・ウイルス対策から選び方のポイントまで専門家が詳しく解説します。",
        "category": "基本ガイド",
        "keywords": ["空気清浄機", "おすすめ", "2025年", "ランキング", "選び方"],
        "readTime": "PT16M"
    },
    "baby-safe-humidifier-guide.html": {
        "headline": "【お得マン監修】赤ちゃん・子供部屋の加湿器選び完全ガイド2025",
        "description": "お得マン監修による安全基準とおすすめ10選。チャイルドロック・転倒防止など安全機能を重視し、新生児から幼児まで年齢別の使い方を詳しく解説します。",
        "category": "健康・安全",
        "keywords": ["赤ちゃん", "子供", "加湿器", "安全", "選び方"],
        "readTime": "PT13M"
    },
    "humidifier-electricity-cost-comparison.html": {
        "headline": "【2025年】加湿器の電気代を徹底比較！月500円以下で使える省エネモデル15選",
        "description": "電気代高騰の今、加湿器の電気代はタイプによって10倍以上の差が！気化式・超音波式・スチーム式の電気代を詳しく比較し、月500円以下の省エネモデルをご紹介します。",
        "category": "コスト・節約",
        "keywords": ["加湿器", "電気代", "比較", "省エネ", "節約"],
        "readTime": "PT12M"
    },
    "single-person-humidifier-best10.html": {
        "headline": "【2025年版】一人暮らし向け加湿器BEST10｜6畳ワンルームに最適なコンパクトモデル",
        "description": "一人暮らしの6畳ワンルームに最適な加湿器10選。コンパクト設計、省エネ、お手入れ簡単なモデルを厳選。価格・性能・電気代を徹底比較します。",
        "category": "使い方・設置",
        "keywords": ["一人暮らし", "加湿器", "コンパクト", "6畳", "ワンルーム"],
        "readTime": "PT11M"
    },
    "humidifier-mold-cleaning-guide.html": {
        "headline": "【2025年版】加湿器のカビ対策完全ガイド｜正しい掃除方法と除菌テクニック",
        "description": "カビ防止から緊急対処まで、加湿器を清潔に保つ完全マニュアル。タイプ別掃除方法、効果的な除菌グッズ、予防策まで詳しく解説します。",
        "category": "メンテナンス",
        "keywords": ["加湿器", "カビ", "掃除", "除菌", "メンテナンス"],
        "readTime": "PT14M"
    },
    "baby-humidifier-when-to-start.html": {
        "headline": "【お得マン回答】赤ちゃんに加湿器はいつから？新生児〜乳児期の正しい使い方ガイド",
        "description": "お得マンが解説する赤ちゃんの加湿器使用開始時期。新生児期からの安全な使用方法、月齢別注意点、おすすめ機種まで完全ガイドします。",
        "category": "健康・安全",
        "keywords": ["赤ちゃん", "加湿器", "いつから", "新生児", "使い方"],
        "readTime": "PT8M"
    }
}

def create_structured_data(filename, article_data):
    """記事用の構造化データを生成"""
    url_path = f"https://example.com/articles/{filename}"
    
    structured_data = f'''
    <!-- 構造化データ（JSON-LD） -->
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{article_data['headline']}",
        "description": "{article_data['description']}",
        "image": {{
            "@type": "ImageObject",
            "url": "https://example.com/images/{filename.replace('.html', '')}.jpg",
            "width": 1200,
            "height": 630
        }},
        "author": {{
            "@type": "Person",
            "name": "失敗しないお得マン編集部",
            "url": "https://example.com"
        }},
        "publisher": {{
            "@type": "Organization",
            "name": "失敗しないお得マン！",
            "logo": {{
                "@type": "ImageObject",
                "url": "https://example.com/images/logo.png",
                "width": 200,
                "height": 60
            }}
        }},
        "datePublished": "2025-01-22T00:00:00+09:00",
        "dateModified": "2025-01-22T00:00:00+09:00",
        "mainEntityOfPage": {{
            "@type": "WebPage",
            "@id": "{url_path}"
        }},
        "articleSection": "家電レビュー",
        "keywords": {article_data['keywords']},
        "timeRequired": "{article_data['readTime']}",
        "isPartOf": {{
            "@type": "WebSite",
            "name": "失敗しないお得マン！",
            "url": "https://example.com"
        }},
        "breadcrumb": {{
            "@type": "BreadcrumbList",
            "itemListElement": [
                {{
                    "@type": "ListItem",
                    "position": 1,
                    "name": "ホーム",
                    "item": "https://example.com"
                }},
                {{
                    "@type": "ListItem",
                    "position": 2,
                    "name": "記事一覧",
                    "item": "https://example.com/articles/"
                }},
                {{
                    "@type": "ListItem",
                    "position": 3,
                    "name": "{article_data['headline'][:30]}...",
                    "item": "{url_path}"
                }}
            ]
        }},
        "about": [
            {{
                "@type": "Thing",
                "name": "家電"
            }},
            {{
                "@type": "Thing",
                "name": "家電選び"
            }}
        ]
    }}
    </script>'''
    
    return structured_data

def find_head_end(content):
    """</head>タグの位置を見つける"""
    patterns = [
        r'</head>',
        r'</style>\s*\n\s*</head>',
        r'</script>\s*\n\s*</head>'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            return match.start()
    
    return -1

def process_article(filepath):
    """個別記事ファイルを処理"""
    filename = os.path.basename(filepath)
    
    # 既知の記事データがない場合はスキップ
    if filename not in ARTICLES_DATA:
        print(f"スキップ: {filename} (データ未定義)")
        return False
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 既に構造化データが含まれているかチェック
        if '<!-- 構造化データ（JSON-LD） -->' in content:
            print(f"スキップ: {filename} (既に構造化データあり)")
            return False
        
        # </head>の位置を見つける
        head_end = find_head_end(content)
        if head_end == -1:
            print(f"エラー: {filename} </head>タグが見つかりません")
            return False
        
        # 構造化データを生成
        article_data = ARTICLES_DATA[filename]
        structured_data = create_structured_data(filename, article_data)
        
        # 構造化データを挿入
        new_content = content[:head_end] + structured_data + '\n' + content[head_end:]
        
        # ファイルに書き戻し
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"完了: {filename}")
        return True
        
    except Exception as e:
        print(f"エラー: {filename} - {str(e)}")
        return False

def main():
    """メイン処理"""
    articles_dir = ARTICLES_DIR
    
    if not os.path.exists(articles_dir):
        print(f"エラー: {articles_dir} ディレクトリが見つかりません")
        return
    
    processed_count = 0
    total_count = 0
    
    # articlesディレクトリ内のHTMLファイルを処理
    for filename in os.listdir(articles_dir):
        if filename.endswith('.html'):
            total_count += 1
            filepath = os.path.join(articles_dir, filename)
            if process_article(filepath):
                processed_count += 1
    
    print(f"\n処理完了: {processed_count}/{total_count} ファイル")

if __name__ == "__main__":
    main()