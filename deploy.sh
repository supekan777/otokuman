#!/bin/bash

# 家電特化サイト EC2デプロイスクリプト
# EC2 IP: 13.238.219.164

echo "🚀 家電特化サイト EC2デプロイスクリプト開始"
echo "IP: 13.238.219.164"
echo "日時: $(date)"

# 設定変数（要編集）
EC2_IP="13.238.219.164"
KEY_FILE="C:/Users/chun7/Downloads/otokuman.pem"  # PEMファイルのパス
EC2_USER="ubuntu"             # Ubuntu インスタンス用

# 色設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 関数: エラーチェック
check_error() {
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ エラー: $1${NC}"
        exit 1
    fi
}

# 関数: 成功メッセージ
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 関数: 警告メッセージ
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 関数: 情報メッセージ
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ステップ1: 前提条件チェック
echo -e "\n${BLUE}=== ステップ1: 前提条件チェック ===${NC}"

# PEMファイルの存在確認
if [ ! -f "$KEY_FILE" ]; then
    warning "PEMファイル '$KEY_FILE' が見つかりません"
    echo "deploy.sh ファイルの KEY_FILE 変数を実際のPEMファイル名に変更してください"
    exit 1
fi

# PEMファイルの権限設定
chmod 400 "$KEY_FILE"
success "PEMファイルの権限設定完了"

# EC2への接続テスト
info "EC2への接続テスト中..."
ssh -i "$KEY_FILE" -o ConnectTimeout=10 -o StrictHostKeyChecking=no "$EC2_USER@$EC2_IP" "echo 'Connection successful'" 2>/dev/null
check_error "EC2への接続に失敗しました。IPアドレス、PEMファイル、セキュリティグループを確認してください"
success "EC2接続テスト完了"

# ステップ2: Webサーバーのセットアップ
echo -e "\n${BLUE}=== ステップ2: Webサーバーセットアップ ===${NC}"

info "Apache のインストールと起動中..."
ssh -i "$KEY_FILE" "$EC2_USER@$EC2_IP" "
    sudo apt-get update -y &&
    sudo apt-get install -y apache2 &&
    sudo systemctl start apache2 &&
    sudo systemctl enable apache2
"
check_error "Apacheのセットアップに失敗"
success "Apache セットアップ完了"

# ステップ3: 既存ファイルのバックアップ
echo -e "\n${BLUE}=== ステップ3: 既存ファイルのバックアップ ===${NC}"

ssh -i "$KEY_FILE" "$EC2_USER@$EC2_IP" "
    if [ -d '/var/www/html_backup' ]; then
        sudo rm -rf /var/www/html_backup
    fi
    sudo cp -r /var/www/html /var/www/html_backup
"
success "既存ファイルのバックアップ完了"

# ステップ4: ファイル転送
echo -e "\n${BLUE}=== ステップ4: ファイル転送 ===${NC}"

info "メインファイルの転送中..."

# 一時ディレクトリを作成
ssh -i "$KEY_FILE" "$EC2_USER@$EC2_IP" "mkdir -p /tmp/website_deploy"

# ファイルを段階的に転送
scp -i "$KEY_FILE" -r *.html "$EC2_USER@$EC2_IP:/tmp/website_deploy/"
check_error "HTMLファイルの転送に失敗"

scp -i "$KEY_FILE" -r css/ "$EC2_USER@$EC2_IP:/tmp/website_deploy/"
check_error "CSSファイルの転送に失敗"

scp -i "$KEY_FILE" -r js/ "$EC2_USER@$EC2_IP:/tmp/website_deploy/"
check_error "JavaScriptファイルの転送に失敗"

scp -i "$KEY_FILE" -r articles/ "$EC2_USER@$EC2_IP:/tmp/website_deploy/"
check_error "記事ファイルの転送に失敗"

scp -i "$KEY_FILE" -r pages/ "$EC2_USER@$EC2_IP:/tmp/website_deploy/"
check_error "ページファイルの転送に失敗"

# その他のファイル
scp -i "$KEY_FILE" robots.txt sitemap.xml "$EC2_USER@$EC2_IP:/tmp/website_deploy/" 2>/dev/null

if [ -d "images" ]; then
    scp -i "$KEY_FILE" -r images/ "$EC2_USER@$EC2_IP:/tmp/website_deploy/"
fi

if [ -d "admin" ]; then
    scp -i "$KEY_FILE" -r admin/ "$EC2_USER@$EC2_IP:/tmp/website_deploy/"
fi

if [ -d "data" ]; then
    scp -i "$KEY_FILE" -r data/ "$EC2_USER@$EC2_IP:/tmp/website_deploy/"
fi

success "ファイル転送完了"

# ステップ5: ファイルの配置と権限設定
echo -e "\n${BLUE}=== ステップ5: ファイル配置と権限設定 ===${NC}"

ssh -i "$KEY_FILE" "$EC2_USER@$EC2_IP" "
    # 既存のhtmlファイルをクリア
    sudo rm -rf /var/www/html/*
    
    # 新しいファイルを移動
    sudo mv /tmp/website_deploy/* /var/www/html/
    
    # 権限設定
    sudo chown -R www-data:www-data /var/www/html/
    sudo chmod -R 755 /var/www/html/
    sudo find /var/www/html -type f -name '*.html' -exec sudo chmod 644 {} \;
    sudo find /var/www/html -type f -name '*.css' -exec sudo chmod 644 {} \;
    sudo find /var/www/html -type f -name '*.js' -exec sudo chmod 644 {} \;
    sudo find /var/www/html -type f -name '*.txt' -exec sudo chmod 644 {} \;
    sudo find /var/www/html -type f -name '*.xml' -exec sudo chmod 644 {} \;
    
    # 一時ディレクトリをクリア
    rm -rf /tmp/website_deploy
"
check_error "ファイル配置と権限設定に失敗"
success "ファイル配置と権限設定完了"

# ステップ6: .htaccessファイルの作成
echo -e "\n${BLUE}=== ステップ6: .htaccess設定 ===${NC}"

ssh -i "$KEY_FILE" "$EC2_USER@$EC2_IP" "
sudo tee /var/www/html/.htaccess > /dev/null << 'EOF'
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
    ExpiresByType text/css \"access plus 1 month\"
    ExpiresByType application/javascript \"access plus 1 month\"
    ExpiresByType image/png \"access plus 1 month\"
    ExpiresByType image/jpg \"access plus 1 month\"
    ExpiresByType image/jpeg \"access plus 1 month\"
    ExpiresByType image/gif \"access plus 1 month\"
    ExpiresByType text/html \"access plus 1 week\"
</IfModule>

# セキュリティ設定
<Files \"*.json\">
    Order Allow,Deny
    Deny from all
</Files>

# 文字エンコーディング
AddDefaultCharset UTF-8
EOF
"
check_error ".htaccess設定に失敗"
success ".htaccess設定完了"

# ステップ7: Apache設定の調整
echo -e "\n${BLUE}=== ステップ7: Apache設定調整 ===${NC}"

ssh -i "$KEY_FILE" "$EC2_USER@$EC2_IP" "
    # AllowOverride を有効にする
    sudo sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf
    
    # 必要なモジュールを有効化
    sudo a2enmod rewrite
    sudo a2enmod deflate
    sudo a2enmod expires
    
    # Apache再起動
    sudo systemctl restart apache2
"
check_error "Apache設定調整に失敗"
success "Apache設定調整完了"

# ステップ8: 動作確認
echo -e "\n${BLUE}=== ステップ8: 動作確認 ===${NC}"

info "サイトの動作確認中..."

# HTTP接続テスト
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" "http://$EC2_IP" --connect-timeout 10)
if [ "$HTTP_STATUS" = "200" ]; then
    success "HTTP接続テスト成功 (Status: $HTTP_STATUS)"
else
    warning "HTTP接続テスト: Status $HTTP_STATUS"
fi

# 主要ページのテスト
info "主要ページのテスト中..."
test_pages=("" "pages/vacuum" "articles/vacuum-cleaner-guide-2025" "robots.txt" "sitemap.xml")

for page in "${test_pages[@]}"; do
    url="http://$EC2_IP/$page"
    status=$(curl -o /dev/null -s -w "%{http_code}" "$url" --connect-timeout 5)
    if [ "$status" = "200" ]; then
        success "✓ $url (Status: $status)"
    else
        warning "✗ $url (Status: $status)"
    fi
done

# ステップ9: 完了報告
echo -e "\n${GREEN}=== 🎉 デプロイ完了！ ===${NC}"

echo -e "\n${GREEN}📋 デプロイ結果:${NC}"
echo -e "• サイトURL: ${BLUE}http://$EC2_IP${NC}"
echo -e "• 記事数: ${BLUE}46記事${NC}"
echo -e "• カテゴリ: ${BLUE}掃除機・空気清浄機・加湿器${NC}"
echo -e "• 完了時刻: ${BLUE}$(date)${NC}"

echo -e "\n${GREEN}🔗 確認すべきURL:${NC}"
echo -e "• トップページ: http://$EC2_IP"
echo -e "• 掃除機カテゴリ: http://$EC2_IP/pages/vacuum"
echo -e "• 空気清浄機カテゴリ: http://$EC2_IP/pages/air-purifier"
echo -e "• 加湿器カテゴリ: http://$EC2_IP/pages/humidifier"
echo -e "• サイトマップ: http://$EC2_IP/sitemap.xml"
echo -e "• robots.txt: http://$EC2_IP/robots.txt"

echo -e "\n${GREEN}📝 次のステップ:${NC}"
echo -e "1. ブラウザでサイトの動作確認"
echo -e "2. モバイル表示の確認"
echo -e "3. SSL証明書の設定 (Let's Encrypt)"
echo -e "4. ドメイン名の設定"
echo -e "5. Google Analytics の設定"

echo -e "\n${GREEN}🔧 管理コマンド:${NC}"
echo -e "• ログ確認: ssh -i $KEY_FILE $EC2_USER@$EC2_IP 'sudo tail -f /var/log/apache2/access.log'"
echo -e "• エラーログ: ssh -i $KEY_FILE $EC2_USER@$EC2_IP 'sudo tail -f /var/log/apache2/error.log'"
echo -e "• Apache再起動: ssh -i $KEY_FILE $EC2_USER@$EC2_IP 'sudo systemctl restart apache2'"

echo -e "\n${GREEN}デプロイスクリプト実行完了！🚀${NC}"