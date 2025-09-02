# 家電特化サイト「失敗しないお得マン！」プロジェクト概要

## 🌐 サイト基本情報

**サイト名**: 失敗しないお得マン！  
**ドメイン**: https://www.otokuman.com  
**EC2サーバー**: 16.176.167.244 (Ubuntu)  
**PEMキー**: C:/Users/chun7/Downloads/otokuman.pem  
**最終更新**: 2025年8月24日

## 📁 プロジェクト構造

```
家電特化サイト/
├── index.html                    # メインページ
├── css/ (6ファイル)              # スタイルシート
│   ├── style.css                 # メインスタイル
│   ├── article.css               # 記事専用
│   ├── product-page.css          # 商品ページ
│   ├── mobile.css                # レスポンシブ
│   ├── overflow-fix.css          # オーバーフロー修正
│   └── image-enhancements.css    # 画像最適化
├── js/ (15ファイル)              # JavaScript
│   ├── main.js                   # コア機能
│   ├── search.js                 # 検索機能
│   ├── performance-optimizer.js  # パフォーマンス最適化
│   └── その他12ファイル
├── articles/ (71記事)            # 記事コンテンツ
│   ├── 加湿器関連 (16記事)
│   ├── 空気清浄機関連 (15記事)
│   ├── 掃除機関連 (15記事)
│   ├── 美容家電関連 (18記事)
│   └── キッチン家電関連 (7記事)
├── pages/ (8ページ)              # 固定ページ
│   ├── humidifier.html           # 加湿器カテゴリ
│   ├── air-purifier.html         # 空気清浄機カテゴリ
│   ├── vacuum.html               # 掃除機カテゴリ
│   ├── beauty-appliances.html    # 美容家電カテゴリ
│   ├── kitchen-appliances.html   # キッチン家電カテゴリ
│   └── その他4ページ
├── images/                       # 画像ディレクトリ
├── admin/                        # 管理画面
├── data/                         # データファイル
├── robots.txt                    # SEO設定
├── sitemap.xml                   # サイトマップ
├── deploy.sh                     # Linuxデプロイスクリプト
├── deploy.ps1                    # Windowsデプロイスクリプト
└── otokuman.pem                  # EC2キーファイル (Downloadsフォルダにあり)
```

## 🏷️ カテゴリ構成

### 主要カテゴリ（6カテゴリ）
1. **加湿器** - 乾燥対策の必需品
2. **空気清浄機** - クリーンな空気環境
3. **掃除機** - お掃除を効率化
4. **キッチン家電** - 料理をもっと楽しく
5. **美容家電** - 美しさをサポート
6. **季節家電** - 快適な室内環境

## 📄 記事コンテンツ詳細

### 現在の総記事数: 82記事

### 加湿器記事 (11記事)
- humidifier-guide-2025.html (基本ガイド)
- humidifier-electricity-cost-comparison.html (電気代比較)
- baby-safe-humidifier-guide.html (赤ちゃん向け)
- humidifier-air-purifier-combo-guide.html (空気清浄機併用)
- baby-humidifier-when-to-start.html (赤ちゃんいつから)
- その他6記事

### 空気清浄機記事 (15記事) ※作成完了済み
- air-purifier-guide-2025.html (基本ガイド)
- allergy-specialized-air-purifier-guide.html (花粉対策)
- pet-specialized-air-purifier-guide.html (ペット対応)
- baby-child-air-purifier-guide.html (赤ちゃん向け)
- air-purifier-electricity-cost-comparison.html (電気代比較)
- air-purifier-filter-maintenance-guide.html (フィルター掃除)
- air-purifier-not-working-solutions.html (故障対処)
- single-living-air-purifier-guide.html (一人暮らし)
- その他7記事

### 掃除機記事 (15記事)
- vacuum-cleaner-guide-2025.html (基本ガイド)
- cordless-vacuum-cleaner-2025.html (コードレス)
- robot-vacuum-cleaner-2025.html (ロボット)
- pet-hair-vacuum-cleaner-2025.html (ペットの毛)
- allergy-hepa-vacuum-cleaner-2025.html (アレルギー対応)
- その他10記事

### 美容家電記事 (15記事) ※作成完了済み
- beauty-appliances-ranking-2025.html (ランキング)
- beauty-appliances-complete-guide-2025.html (完全ガイド)
- facial-device-guide-2025.html (美顔器ガイド)
- epilator-complete-guide-2025.html (脱毛器ガイド)
- hair-dryer-professional-ranking-2025.html (ドライヤーランキング)
- その他10記事

### キッチン家電記事 (20記事) ※作成完了済み
- rice-cooker-ranking-2025.html (炊飯器)
- coffee-maker-ranking-2025.html (コーヒーメーカー)
- microwave-ranking-2025.html (電子レンジ)
- dishwasher-ranking-2025.html (食洗機)
- hotplate-ranking-2025.html (ホットプレート)
- air-fryer-nonfry-ranking-2025.html (ノンフライヤー)
- electric-kettle-ranking-2025.html (電気ケトル)
- pressure-cooker-electric-guide-2025.html (電気圧力鍋)
- food-processor-blender-guide-2025.html (フードプロセッサー)
- toaster-oven-ranking-2025.html (オーブントースター)
- その他10記事

### 空調家電記事 (6記事) ※新規追加
- エアコン選び方ガイド
- DCモーター扇風機比較
- サーキュレーター活用法
- エアコン工事ガイド
- 電気代節約術
- 冷風機vsエアコン比較

## 🔧 技術仕様

### フロントエンド技術
- **HTML5**: セマンティックマークアップ
- **CSS3**: カスタムプロパティ、Flexbox、Grid
- **JavaScript**: Vanilla JS (フレームワーク不使用)
- **構造化データ**: JSON-LD形式で実装済み
- **レスポンシブ**: モバイルファーストデザイン

### SEO対策
- メタタグ完備
- 構造化データ (Schema.org)
- パンくずナビゲーション
- サイトマップ (sitemap.xml)
- robots.txt設定済み

### 外部依存関係
- Font Awesome 6.0.0 (CDN)
- Chart.js (管理画面用)

## 🚀 デプロイ環境

### EC2インスタンス詳細
- **IP**: 16.176.167.244
- **OS**: Ubuntu 22.04 LTS
- **Webサーバー**: Apache 2.4
- **ユーザー**: ubuntu
- **キーファイル**: C:/Users/chun7/Downloads/otokuman.pem

### Apache設定
- DocumentRoot: /var/www/html
- .htaccess有効化済み
- 必要モジュール: rewrite, deflate, expires
- 圧縮・キャッシュ設定済み

## 📝 重要な設定値

### ドメイン・URL設定
- **本番ドメイン**: www.otokuman.com
- **構造化データ**: 全てwww.otokuman.comで統一済み
- **内部リンク**: 相対パスで統一

### 商品数・レビュー数
- **注意**: テスト用の数値は全て削除済み
- numberOfItems: 0 に設定
- 統計表示: "-" で表示

## 🔄 デプロイ手順（重要）

### 1. 通常のデプロイ（ファイル更新時）

```bash
# プロジェクトディレクトリに移動
cd "C:/Users/chun7/OneDrive/デスクトップ/studyWorld/家電特化サイト"

# デプロイスクリプト実行
bash deploy.sh
```

### 2. デプロイスクリプトの設定内容
- **EC2_IP**: 16.176.167.244
- **KEY_FILE**: C:/Users/chun7/Downloads/otokuman.pem
- **EC2_USER**: ubuntu (Ubuntu用)

### 3. デプロイされるファイル
- 全HTMLファイル (index.html + pages/ + articles/)
- 全CSS・JSファイル
- robots.txt, sitemap.xml
- images/, admin/, data/ (存在する場合)

### 4. デプロイ後の確認
- http://16.176.167.244 でアクセス確認
- 主要ページの動作確認
- robots.txt, sitemap.xml の確認

## ⚠️ 重要な注意事項

### URL統一について
- **全ファイル**: www.otokuman.com で統一済み
- **変更厳禁**: example.com に戻さない
- **新規ファイル**: 必ずwww.otokuman.comを使用

### 商品数・レビュー数について
- **削除済み**: テスト用数値は全削除
- **新規追加時**: 実数値のみ記載
- **構造化データ**: numberOfItems は実数値またはゼロ

### デプロイ時の注意
- PEMファイルのパス確認必須
- EC2インスタンス起動状態確認
- セキュリティグループ設定確認 (HTTP:80, SSH:22)

## 📊 パフォーマンス最適化

### 実装済み最適化
- CSS最適化（変数使用、コンポーネント化）
- JavaScript遅延読み込み
- 画像最適化（レスポンシブ対応）
- .htaccess による圧縮・キャッシュ設定
- モバイル最適化

### CDN・外部リソース
- Font Awesome: CDN経由
- 事前接続設定済み (preconnect)

## 🔍 トラブルシューティング

### よくある問題
1. **403エラー**: ディレクトリリスティング無効のため正常
2. **SSH接続失敗**: PEMファイルパス、EC2ユーザー名確認
3. **デプロイ失敗**: EC2インスタンス起動状態、セキュリティグループ確認

### 管理用コマンド
```bash
# ログ確認
ssh -i C:/Users/chun7/Downloads/otokuman.pem ubuntu@16.176.167.244 'sudo tail -f /var/log/apache2/access.log'

# エラーログ確認  
ssh -i C:/Users/chun7/Downloads/otokuman.pem ubuntu@16.176.167.244 'sudo tail -f /var/log/apache2/error.log'

# Apache再起動
ssh -i C:/Users/chun7/Downloads/otokuman.pem ubuntu@16.176.167.244 'sudo systemctl restart apache2'
```

## 🔮 今後の予定・推奨事項

### SSL・ドメイン設定
1. DNS設定: www.otokuman.com → 16.176.167.244
2. Let's Encrypt SSL証明書設定
3. HTTPS リダイレクト設定

### パフォーマンス向上
1. CloudFlare CDN設定
2. Google Analytics設定
3. Search Console設定

## 📝 記事作成のルール

### キャラクター会話の配置
- **必須要素**: お得マンと主婦の会話は記事の重要な構成要素
- **配置方法**: 記事の流れに合わせて1往復ずつの会話を適切な箇所に配置
- **目的**: 読者の疑問を代弁し、お得マンが専門的な回答をする流れ
- **注意**: 長い連続会話は避け、セクション間に分散させる

## ✅ 美容家電記事18本（作成完了）

### 作成済み記事一覧
1. beauty-appliances-ranking-2025.html - 美容家電おすすめ人気ランキング2025
2. beauty-appliances-complete-guide-2025.html - 美容家電完全ガイド
3. beauty-appliances-beginners-guide-2025.html - 初心者向けガイド
4. beauty-appliances-budget-saving-guide-2025.html - 節約術ガイド
5. beauty-appliances-rental-comparison-2025.html - レンタルサービス比較
6. beauty-appliances-lifespan-guide-2025.html - 寿命と買い替えガイド
7. anti-aging-beauty-appliances-ranking-2025.html - エイジングケアランキング
8. mens-beauty-appliances-guide-2025.html - 男性用美容家電ガイド
9. facial-device-complete-guide-2025.html - 美顔器完全ガイド
10. facial-device-guide-2025.html - 美顔器選び方ガイド
11. facial-steamer-complete-guide-2025.html - 美顔スチーマー完全ガイド
12. epilator-complete-guide-2025.html - 脱毛器完全ガイド
13. epilator-vs-medical-cost-comparison-2025.html - 脱毛器vs医療脱毛比較
14. home-epilator-ranking-2025.html - 家庭用脱毛器ランキング
15. hair-dryer-ranking-2025.html - ヘアドライヤーランキング
16. hair-dryer-professional-ranking-2025.html - プロ仕様ドライヤーランキング
17. hair-iron-damage-prevention-guide-2025.html - ヘアアイロンダメージ防止ガイド
18. electric-brush-effect-verification-2025.html - 電動ブラシ効果検証

## 📅 更新履歴

### 2025年9月2日
- プロジェクトの最新データ確認・更新完了
- 空気清浄機記事15本の存在を確認・記録
- キッチン家電記事20本に大幅増加を確認
- 総記事数を82記事に更新
- 空調家電カテゴリを新規追加（季節家電から変更）
- PROJECT_SUMMARYを最新データに更新

### 2025年8月27日
- 美容家電記事15本の完成を確認・記録
- キッチン家電記事20本の大幅増加を確認
- 空気清浄機記事15本の存在を確認

### 2025年8月25日
- 記事のキャラクター会話ルールを確立
- baby-humidifier-when-to-start.html の会話配置を最適化

### 2025年8月24日
- プロジェクト全体確認
- example.com → www.otokuman.com 一括変換
- 商品数・レビュー数削除
- EC2デプロイ完了
- 本ドキュメント作成

---

**このファイルは必ずプロジェクト理解のために最初に確認すること**