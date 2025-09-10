# 家電特化サイト「失敗しないお得マン！」マスター記録書
**最終更新**: 2025年9月10日  
**記録統合**: 全プロジェクト記録を統合した最新版

## 🌐 サイト基本情報

**サイト名**: 失敗しないお得マン！  
**本番ドメイン**: https://www.otokuman.com  
**EC2サーバー**: 13.238.219.164 (Ubuntu 22.04 LTS)  
**SSH鍵**: C:/Users/chun7/otokuman_key.pem  
**Webサーバー**: Apache 2.4  

## 📁 プロジェクト構造（2025年9月現在）

### ディレクトリ構成
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
│   ├── analytics.js              # 分析・トラッキング
│   ├── site-tester.js            # 品質監視
│   ├── mobile-optimizer.js       # モバイル最適化
│   └── その他9ファイル
├── articles/ (82記事)            # 記事コンテンツ
│   ├── 加湿器関連 (16記事)
│   ├── 空気清浄機関連 (15記事)
│   ├── 掃除機関連 (15記事)
│   ├── 美容家電関連 (18記事)
│   ├── キッチン家電関連 (20記事)
│   └── 空調家電関連 (6記事)
├── pages/ (8ページ)              # 固定ページ
├── admin/                        # 管理画面（Chart.js使用）
├── 商品リンク/                   # アフィリエイトリンク管理
├── robots.txt & sitemap.xml      # SEO設定
└── deploy.sh                     # 自動デプロイスクリプト
```

### 現在の記事数：82記事
- **加湿器**: 16記事（humidifier-always-on-electricity-cost.html含む）
- **空気清浄機**: 15記事（allergy-specialized-air-purifier-guide.html含む）
- **掃除機**: 15記事（vacuum-cleaner-guide-2025.html含む）
- **美容家電**: 18記事（beauty-appliances-ranking-2025.html含む）
- **キッチン家電**: 20記事（rice-cooker-ranking-2025.html含む）
- **空調家電**: 6記事（新規カテゴリ）

## 🧩 技術仕様

### アフィリエイト・マネタイズ
- **ASP**: Moshimo Affiliate（もしもアフィリエイト）
- **実装方式**: MoshimoAffiliateEasyLink
- **対応EC**: 楽天市場、Yahoo!ショッピング
- **アフィリエイトID**: 
  - 楽天: `a_id=5147828, p_id=54, pl_id=27059, pc_id=54`
  - Yahoo: `a_id=5147829, p_id=1225, pl_id=27061, pc_id=1925`

### JavaScript機能詳細
1. **パフォーマンス最適化** (`performance-optimizer.js`)
   - 遅延画像読み込み: Intersection Observer API
   - リソースヒント: DNS prefetch, preconnect, preload
   - Core Web Vitals監視: FCP, LCP, CLS, FID測定

2. **分析・トラッキング** (`analytics.js`)
   - Google Analytics設定（プライバシー配慮済み）
   - Search Console連携準備

3. **サイト品質監視** (`site-tester.js`)
   - リンク切れチェック、画像alt属性検証
   - パフォーマンス測定、アクセシビリティ検証

4. **モバイル最適化** (`mobile-optimizer.js`)
   - タッチデバイス検出、ビューポート調整
   - ハンバーガーメニュー制御

### CSS設計
- **CSS Variables**: カスタムプロパティで統一管理
```css
:root {
    --primary-color: #16a34a;
    --secondary-color: #059669;
    --accent-color: #047857;
    --gradient-primary: linear-gradient(135deg, #16a34a 0%, #059669 100%);
}
```
- **レスポンシブ**: Mobile-First アプローチ
- **コンポーネントベース**: 再利用性重視

### SEO・構造化データ
**実装スキーマ**:
- `WebSite`, `Organization`, `BreadcrumbList`
- `ItemList`, `Article`, `Product`, `FAQPage`

## 🚀 デプロイメント

### デプロイ手順（重要）
```bash
# 1. プロジェクトディレクトリに移動
cd "C:/Users/chun7/OneDrive/デスクトップ/studyWorld/家電特化サイト"

# 2. デプロイスクリプト実行
KEY_FILE="C:/Users/chun7/otokuman_key.pem" ./deploy.sh
```

### デプロイスクリプト設定
- **EC2_IP**: 13.238.219.164
- **EC2_USER**: ubuntu
- **DocumentRoot**: /var/www/html

### Apache設定
- .htaccess有効化済み
- 必要モジュール: rewrite, deflate, expires
- 圧縮・キャッシュ設定済み

## 🔄 Git & GitHub管理

### リポジトリ情報
- **GitHub URL**: https://github.com/supekan777/otokuman
- **ブランチ**: master
- **最新コミット**: HV-T55アフィリエイトリンク更新（2025年9月10日）

### コミットメッセージ標準
```bash
git commit -m "$(cat <<'EOF'
[Action] [Target] with [Enhancement]

- Specific change 1
- Specific change 2

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

## 📋 運用・保守スケジュール

### 日次チェック
- [ ] サイト表示確認: https://www.otokuman.com
- [ ] EC2ステータス確認: 13.238.219.164
- [ ] エラーログ確認
```bash
ssh -i "C:/Users/chun7/otokuman_key.pem" ubuntu@13.238.219.164 'sudo tail -n 50 /var/log/apache2/error.log'
```

### 週次チェック
- [ ] 全ページ表示確認
- [ ] アフィリエイトリンク確認（楽天・Yahoo!ショッピング）
- [ ] サイトマップ更新
- [ ] 品質テスト実行: ブラウザでF12 > Console: `runSiteTest()`

### 月次チェック
- [ ] EC2スナップショット作成
- [ ] 価格情報・商品リンク一括確認
- [ ] Google Analytics・Search Console確認
- [ ] セキュリティアップデート
```bash
ssh -i "C:/Users/chun7/otokuman_key.pem" ubuntu@13.238.219.164 'sudo apt-get update && sudo apt-get upgrade -y'
```

### 季節更新（年4回）
- **春期（3月）**: 花粉・空気清浄機関連記事強化
- **夏期（6月）**: エアコン関連、除湿機能記事追加
- **秋期（9月）**: 加湿器・暖房準備記事強化
- **冬期（12月）**: 大掃除・掃除機関連記事強化

## 🚨 緊急時対応

### サイトダウン時
1. **障害確認**: `curl -I https://www.otokuman.com`
2. **EC2ステータス確認**: AWSコンソール
3. **Apache再起動**:
```bash
ssh -i "C:/Users/chun7/otokuman_key.pem" ubuntu@13.238.219.164 'sudo systemctl restart apache2'
```

### SSL証明書期限切れ
```bash
sudo certbot renew
sudo systemctl restart apache2
```

## 🔐 セキュリティ・バックアップ

### バックアップ戦略
1. **EC2スナップショット**: 月次、3ヶ月保持
2. **ファイルバックアップ**: 週次、ローカルコピー
```bash
scp -r -i "C:/Users/chun7/otokuman_key.pem" ubuntu@13.238.219.164:/var/www/html ./backup/$(date +%Y%m%d)/
```

### セキュリティ対策
- 定期パスワード変更（管理画面実装後）
- 不要ポート閉鎖: EC2セキュリティグループ設定
- ログ監視: 異常アクセスパターン検出
- SSL/TLS設定: 暗号化通信確保

## ⚠️ 重要な注意事項

### URL統一ルール
- **必須**: 全URLを www.otokuman.com で統一済み
- **禁止**: example.com への変更は絶対禁止
- **新規ファイル**: 必ず www.otokuman.com を使用

### アフィリエイトリンク管理
- **保存場所**: `商品リンク/加湿器/` フォルダ
- **形式**: 各商品ごとのtxtファイル
- **最新更新**: HV-T55.txt（eid: FRsjo → wGIKS, 2025年9月10日）

### デプロイ時の注意
- PEMファイルパス確認必須: `C:/Users/chun7/otokuman_key.pem`
- EC2インスタンス起動状態確認
- セキュリティグループ設定確認（HTTP:80, HTTPS:443, SSH:22）

## 📊 パフォーマンス目標

### Core Web Vitals目標
- **LCP** (Largest Contentful Paint): < 2.5秒
- **FID** (First Input Delay): < 100ミリ秒
- **CLS** (Cumulative Layout Shift): < 0.1

### 実装済み最適化効果
- 初期読み込み: 30-50% 削減
- 画像データ量: 60-80% 削減
- DNS解決: 20-40ms 短縮

## 🔮 今後の予定

### 短期目標
1. SSL証明書設定（Let's Encrypt）
2. CloudFlare CDN設定
3. Google Analytics・Search Console完全設定

### 中期目標
1. プライバシーポリシー・お問い合わせフォーム実装
2. ユーザーレビュー機能
3. メールマガジン機能

### 長期目標
1. AI チャットボット導入
2. 商品価格自動更新システム
3. ユーザー行動分析の高度化

## 📅 更新履歴

### 2025年9月10日
- HV-T55アフィリエイトリンク更新（eid: FRsjo → wGIKS）
- 本番環境 otokuman.com への反映確認
- プロジェクト記録ファイル統合作業

### 2025年9月2日
- PROJECT_SUMMARY.md 最新データ更新
- 総記事数を82記事に更新
- 空調家電カテゴリを新規追加

### 2025年8月27日
- 美容家電記事18本完成
- キッチン家電記事20本確認

### 2025年8月24日
- example.com → www.otokuman.com 一括変換
- 商品数・レビュー数テストデータ削除
- EC2デプロイ完了

### 2025年8月22日
- プロジェクト開始
- 家電特化サイト基本構造作成

---

## 📞 管理用コマンド一覧

### ログ確認
```bash
ssh -i "C:/Users/chun7/otokuman_key.pem" ubuntu@13.238.219.164 'sudo tail -f /var/log/apache2/access.log'
```

### エラーログ確認
```bash
ssh -i "C:/Users/chun7/otokuman_key.pem" ubuntu@13.238.219.164 'sudo tail -f /var/log/apache2/error.log'
```

### Apache再起動
```bash
ssh -i "C:/Users/chun7/otokuman_key.pem" ubuntu@13.238.219.164 'sudo systemctl restart apache2'
```

### 権限修復
```bash
ssh -i "C:/Users/chun7/otokuman_key.pem" ubuntu@13.238.219.164 'sudo chown -R www-data:www-data /var/www/html/ && sudo chmod -R 755 /var/www/html/'
```

---

**このマスター記録書は必ずプロジェクト理解・作業実行時に最初に確認すること**  
**他のPROJECT_*.mdファイルは本ファイルに統合済みのため削除対象**