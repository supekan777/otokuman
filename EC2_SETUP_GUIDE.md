# 🚀 EC2デプロイ実行ガイド - 家電特化サイト

**EC2 Public IP**: `16.176.167.244`  
**デプロイ日**: 2025年1月23日

## 📋 現在の状況

**確認結果**: EC2インスタンス `16.176.167.244` はアクティブですが、Webサーバーの設定が必要です。

## 🔧 1. EC2初期セットアップ

### ステップ1: SSH接続の確認

以下のコマンドでEC2インスタンスに接続してください：

```bash
# PEMキーファイルのパーミッション設定
chmod 400 your-key-pair.pem

# SSH接続（Amazon Linux 2の場合）
ssh -i your-key-pair.pem ec2-user@16.176.167.244

# Ubuntu の場合
ssh -i your-key-pair.pem ubuntu@16.176.167.244
```

### ステップ2: システム更新とApacheインストール

```bash
# Amazon Linux 2の場合
sudo yum update -y
sudo yum install -y httpd
sudo systemctl start httpd
sudo systemctl enable httpd

# Ubuntu の場合
sudo apt update -y
sudo apt install -y apache2
sudo systemctl start apache2
sudo systemctl enable apache2
```

### ステップ3: セキュリティグループの確認

AWS Management Consoleで以下のポートが開放されているか確認：

- **Port 80 (HTTP)**: 0.0.0.0/0 からのアクセス許可
- **Port 443 (HTTPS)**: 0.0.0.0/0 からのアクセス許可  
- **Port 22 (SSH)**: 管理者IPからのアクセス許可

## 📁 2. ウェブサイトファイルのアップロード

### ファイル転送コマンド

```bash
# SCPでファイル転送（ローカルからEC2へ）
scp -r -i your-key-pair.pem "C:\Users\chun7\OneDrive\デスクトップ\studyWorld\家電特化サイト\*" ec2-user@16.176.167.244:/tmp/

# EC2上でファイルを適切な場所に移動
sudo mv /tmp/*.html /var/www/html/
sudo mv /tmp/css /var/www/html/
sudo mv /tmp/js /var/www/html/
sudo mv /tmp/articles /var/www/html/
sudo mv /tmp/pages /var/www/html/
sudo mv /tmp/images /var/www/html/
sudo mv /tmp/admin /var/www/html/
sudo mv /tmp/data /var/www/html/
```

### 権限設定

```bash
# Apache用の権限設定
sudo chown -R apache:apache /var/www/html/  # Amazon Linux
# sudo chown -R www-data:www-data /var/www/html/  # Ubuntu

sudo chmod -R 755 /var/www/html/
sudo chmod -R 644 /var/www/html/*.html
sudo chmod -R 644 /var/www/html/css/*
sudo chmod -R 644 /var/www/html/js/*
```

## ⚙️ 3. Apache設定

### .htaccessファイル作成

```bash
sudo nano /var/www/html/.htaccess
```

以下の内容を追加：

```apache
RewriteEngine On

# HTMLファイル拡張子を隠す
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# 圧縮設定
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
    AddOutputFilterByType DEFLATE text/xml application/xml application/xml+rss text/javascript
</IfModule>

# キャッシュ設定
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType text/html "access plus 1 week"
</IfModule>

# セキュリティ設定
<Files "*.json">
    Order Allow,Deny
    Deny from all
</Files>

# GZIP圧縮
Header append Vary User-Agent env=!dont-vary
```

### Apache設定の有効化

```bash
# 必要なApacheモジュールの有効化
sudo a2enmod rewrite deflate expires headers  # Ubuntu
# Amazon Linuxの場合はhttpdの設定を編集

# Apache設定ファイル編集（Amazon Linux）
sudo nano /etc/httpd/conf/httpd.conf

# AllowOverride None を AllowOverride All に変更
# Directory "/var/www/html" セクションで
AllowOverride All

# Apacheを再起動
sudo systemctl restart httpd  # Amazon Linux
sudo systemctl restart apache2  # Ubuntu
```

## 🌐 4. サイト動作確認

### 基本動作テスト

1. **トップページアクセス**: http://16.176.167.244/
2. **記事ページテスト**: http://16.176.167.244/articles/vacuum-cleaner-guide-2025
3. **カテゴリページテスト**: http://16.176.167.244/pages/vacuum
4. **CSS/JS読み込み確認**: ブラウザ開発者ツールでエラーチェック

### 動作確認コマンド

```bash
# Apache状態確認
sudo systemctl status httpd

# エラーログ確認
sudo tail -f /var/log/httpd/error_log

# アクセスログ確認
sudo tail -f /var/log/httpd/access_log
```

## 🔒 5. SSL証明書設定（Let's Encrypt）

### Certbotのインストール

```bash
# Amazon Linux 2
sudo yum install -y certbot python3-certbot-apache

# Ubuntu
sudo apt install -y certbot python3-certbot-apache
```

### SSL証明書の取得（ドメイン設定後）

```bash
# ドメイン名を設定後に実行
sudo certbot --apache -d your-domain.com -d www.your-domain.com

# テスト用（ステージング環境）
sudo certbot --apache --staging -d your-domain.com
```

## 📊 6. 監視とログ設定

### ログローテーション設定

```bash
# logrotate設定確認
sudo nano /etc/logrotate.d/httpd
```

### 基本的な監視設定

```bash
# ディスク使用量監視
df -h

# メモリ使用量監視
free -m

# CPUとプロセス監視
top
```

## 🔧 7. パフォーマンス最適化

### Apache設定調整

```bash
sudo nano /etc/httpd/conf/httpd.conf
```

以下の設定を追加・調整：

```apache
# Keep Alive設定
KeepAlive On
MaxKeepAliveRequests 100
KeepAliveTimeout 5

# Worker設定
<IfModule mpm_prefork_module>
    StartServers          8
    MinSpareServers       5
    MaxSpareServers      20
    MaxRequestWorkers   256
    MaxConnectionsPerChild 1000
</IfModule>
```

## 📋 8. デプロイ後チェックリスト

### 機能確認
- [ ] トップページ表示 (http://16.176.167.244/)
- [ ] 全カテゴリページ表示確認
- [ ] 記事ページ表示確認（46記事）
- [ ] ナビゲーション動作確認
- [ ] 検索機能動作確認
- [ ] モバイル表示確認
- [ ] 404エラーページ表示確認

### パフォーマンス確認
- [ ] ページ読み込み速度 (3秒以下目標)
- [ ] 画像読み込み確認
- [ ] CSS/JS読み込み確認
- [ ] モバイル表示速度確認

### SEO確認
- [ ] robots.txt設置確認 (http://16.176.167.244/robots.txt)
- [ ] sitemap.xml設置確認 (http://16.176.167.244/sitemap.xml)
- [ ] メタタグ確認
- [ ] 構造化データ確認

## 🚨 トラブルシューティング

### よくある問題と解決方法

1. **403 Forbidden Error**
   ```bash
   sudo chmod -R 755 /var/www/html/
   sudo chown -R apache:apache /var/www/html/
   ```

2. **CSS/JSファイルが読み込まれない**
   ```bash
   # ファイルパスの確認
   ls -la /var/www/html/css/
   ls -la /var/www/html/js/
   ```

3. **.htaccessが効かない**
   ```bash
   # AllowOverrideの確認
   grep -n "AllowOverride" /etc/httpd/conf/httpd.conf
   ```

4. **日本語文字化け**
   ```bash
   # Apache設定に追加
   echo "AddDefaultCharset UTF-8" | sudo tee -a /etc/httpd/conf/httpd.conf
   ```

## 📞 次のステップ

1. **ドメイン設定**: 独自ドメインの設定とDNS設定
2. **SSL化**: Let's Encrypt証明書の設定
3. **CDN設定**: CloudFront等の設定でパフォーマンス向上
4. **バックアップ**: 定期バックアップの設定
5. **監視設定**: CloudWatch Logs等の設定

---

**⚡ 重要**: 上記手順を順序通りに実行してください。各ステップ完了後に必ず動作確認を行ってください。

**📧 サポート**: 問題が発生した場合はエラーログと実行したコマンドを確認の上、お知らせください。