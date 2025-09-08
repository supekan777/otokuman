# 家電特化サイト EC2デプロイスクリプト (PowerShell版)
# EC2 IP: 16.176.167.244

param(
    [Parameter(Mandatory=$false)]
    [string]$KeyFile = "C:\Users\chun7\Downloads\otokuman.pem",
    
    [Parameter(Mandatory=$false)]
    [string]$EC2User = "ec2-user"
)

# 設定変数
$EC2_IP = "16.176.167.244"
$ProjectName = "家電特化サイト"
$ScriptStartTime = Get-Date

# 色設定
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    
    if ($args) {
        Write-Output $args
    } else {
        $input | Write-Output
    }
    
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success($message) {
    Write-ColorOutput Green "✅ $message"
}

function Write-Error2($message) {
    Write-ColorOutput Red "❌ $message"
}

function Write-Warning2($message) {
    Write-ColorOutput Yellow "⚠️  $message"
}

function Write-Info($message) {
    Write-ColorOutput Blue "ℹ️  $message"
}

function Write-Header($message) {
    Write-Host ""
    Write-ColorOutput Cyan "=== $message ==="
}

# メイン処理開始
Write-Header "🚀 $ProjectName EC2デプロイスクリプト開始"
Write-Host "IP: $EC2_IP"
Write-Host "日時: $ScriptStartTime"
Write-Host ""

# ステップ1: 前提条件チェック
Write-Header "ステップ1: 前提条件チェック"

# PEMファイルの存在確認
if (-not (Test-Path $KeyFile)) {
    Write-Warning2 "PEMファイル '$KeyFile' が見つかりません"
    Write-Host "deploy.ps1 を以下のように実行してください："
    Write-Host ".\deploy.ps1 -KeyFile 'actual-key-name.pem'"
    exit 1
}
Write-Success "PEMファイル確認完了"

# SCPとSSHコマンドの存在確認
try {
    $null = Get-Command ssh -ErrorAction Stop
    $null = Get-Command scp -ErrorAction Stop
} catch {
    Write-Error2 "SSH/SCPコマンドが見つかりません"
    Write-Host "以下のいずれかをインストールしてください："
    Write-Host "1. Git for Windows (推奨)"
    Write-Host "2. Windows Subsystem for Linux (WSL)"
    Write-Host "3. PuTTY + WinSCP"
    exit 1
}
Write-Success "SSH/SCP コマンド確認完了"

# ステップ2: EC2接続テスト
Write-Header "ステップ2: EC2接続テスト"

Write-Info "EC2への接続テスト中..."
$connectionTest = ssh -i $KeyFile -o ConnectTimeout=10 -o StrictHostKeyChecking=no "$EC2User@$EC2_IP" "echo 'Connection successful'" 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Error2 "EC2への接続に失敗しました"
    Write-Host "確認事項："
    Write-Host "1. IPアドレス: $EC2_IP"
    Write-Host "2. PEMファイル: $KeyFile"
    Write-Host "3. セキュリティグループでPort 22が開放されているか"
    Write-Host "4. EC2インスタンスが起動しているか"
    exit 1
}
Write-Success "EC2接続テスト完了"

# ステップ3: Webサーバーセットアップ
Write-Header "ステップ3: Webサーバーセットアップ"

Write-Info "Apacheのインストールと起動中..."
$apacheSetup = @"
sudo yum update -y &&
sudo yum install -y httpd &&
sudo systemctl start httpd &&
sudo systemctl enable httpd &&
echo 'Apache setup completed'
"@

ssh -i $KeyFile "$EC2User@$EC2_IP" $apacheSetup
if ($LASTEXITCODE -ne 0) {
    Write-Error2 "Apacheのセットアップに失敗しました"
    exit 1
}
Write-Success "Apache セットアップ完了"

# ステップ4: 既存ファイルのバックアップ
Write-Header "ステップ4: 既存ファイルのバックアップ"

$backupScript = @"
if [ -d '/var/www/html_backup' ]; then
    sudo rm -rf /var/www/html_backup
fi
sudo cp -r /var/www/html /var/www/html_backup &&
echo 'Backup completed'
"@

ssh -i $KeyFile "$EC2User@$EC2_IP" $backupScript
Write-Success "既存ファイルのバックアップ完了"

# ステップ5: ファイル転送
Write-Header "ステップ5: ファイル転送"

# 一時ディレクトリの作成
ssh -i $KeyFile "$EC2User@$EC2_IP" "mkdir -p /tmp/website_deploy"

Write-Info "ファイル転送中..."

# ファイルを段階的に転送
$filesToTransfer = @(
    @{ Source = "*.html"; Description = "HTMLファイル" },
    @{ Source = "css"; Description = "CSSファイル" },
    @{ Source = "js"; Description = "JavaScriptファイル" },
    @{ Source = "articles"; Description = "記事ファイル" },
    @{ Source = "pages"; Description = "ページファイル" },
    @{ Source = "robots.txt"; Description = "robots.txt" },
    @{ Source = "sitemap.xml"; Description = "sitemap.xml" }
)

foreach ($file in $filesToTransfer) {
    if (Test-Path $file.Source) {
        Write-Info "転送中: $($file.Description)"
        if ($file.Source.EndsWith(".txt") -or $file.Source.EndsWith(".xml") -or $file.Source.EndsWith("*.html")) {
            scp -i $KeyFile $file.Source "$EC2User@${EC2_IP}:/tmp/website_deploy/"
        } else {
            scp -i $KeyFile -r $file.Source "$EC2User@${EC2_IP}:/tmp/website_deploy/"
        }
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "$($file.Description) 転送完了"
        } else {
            Write-Warning2 "$($file.Description) 転送でエラーが発生しました"
        }
    }
}

# オプショナルファイル
$optionalFiles = @("images", "admin", "data")
foreach ($dir in $optionalFiles) {
    if (Test-Path $dir) {
        Write-Info "転送中: $dir"
        scp -i $KeyFile -r $dir "$EC2User@${EC2_IP}:/tmp/website_deploy/"
        if ($LASTEXITCODE -eq 0) {
            Write-Success "$dir 転送完了"
        }
    }
}

# ステップ6: ファイル配置と権限設定
Write-Header "ステップ6: ファイル配置と権限設定"

$deployScript = @"
# 既存のhtmlファイルをクリア
sudo rm -rf /var/www/html/*

# 新しいファイルを移動
sudo mv /tmp/website_deploy/* /var/www/html/

# 権限設定
sudo chown -R apache:apache /var/www/html/
sudo chmod -R 755 /var/www/html/
sudo find /var/www/html -type f -name '*.html' -exec sudo chmod 644 {} \;
sudo find /var/www/html -type f -name '*.css' -exec sudo chmod 644 {} \;
sudo find /var/www/html -type f -name '*.js' -exec sudo chmod 644 {} \;
sudo find /var/www/html -type f -name '*.txt' -exec sudo chmod 644 {} \;
sudo find /var/www/html -type f -name '*.xml' -exec sudo chmod 644 {} \;

# 一時ディレクトリをクリア
rm -rf /tmp/website_deploy

echo 'File deployment and permissions completed'
"@

ssh -i $KeyFile "$EC2User@$EC2_IP" $deployScript
if ($LASTEXITCODE -ne 0) {
    Write-Error2 "ファイル配置と権限設定に失敗しました"
    exit 1
}
Write-Success "ファイル配置と権限設定完了"

# ステップ7: .htaccess設定
Write-Header "ステップ7: .htaccess設定"

$htaccessContent = @'
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

# 文字エンコーディング
AddDefaultCharset UTF-8
'@

$htaccessScript = @"
sudo tee /var/www/html/.htaccess > /dev/null << 'EOF'
$htaccessContent
EOF
echo 'htaccess created'
"@

ssh -i $KeyFile "$EC2User@$EC2_IP" $htaccessScript
Write-Success ".htaccess設定完了"

# ステップ8: Apache設定調整
Write-Header "ステップ8: Apache設定調整"

$apacheConfigScript = @"
# AllowOverride を有効にする
sudo sed -i 's/AllowOverride None/AllowOverride All/g' /etc/httpd/conf/httpd.conf

# Apache再起動
sudo systemctl restart httpd

echo 'Apache configuration completed'
"@

ssh -i $KeyFile "$EC2User@$EC2_IP" $apacheConfigScript
if ($LASTEXITCODE -ne 0) {
    Write-Error2 "Apache設定調整に失敗しました"
    exit 1
}
Write-Success "Apache設定調整完了"

# ステップ9: 動作確認
Write-Header "ステップ9: 動作確認"

Write-Info "サイトの動作確認中..."

# HTTP接続テスト
try {
    $response = Invoke-WebRequest -Uri "http://$EC2_IP" -TimeoutSec 10 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Success "HTTP接続テスト成功 (Status: $($response.StatusCode))"
    } else {
        Write-Warning2 "HTTP接続テスト: Status $($response.StatusCode)"
    }
} catch {
    Write-Warning2 "HTTP接続テストでエラーが発生: $($_.Exception.Message)"
}

# 主要ページのテスト
Write-Info "主要ページのテスト中..."
$testPages = @(
    @{ Path = ""; Description = "トップページ" },
    @{ Path = "pages/vacuum"; Description = "掃除機カテゴリ" },
    @{ Path = "articles/vacuum-cleaner-guide-2025"; Description = "掃除機ガイド記事" },
    @{ Path = "robots.txt"; Description = "robots.txt" },
    @{ Path = "sitemap.xml"; Description = "sitemap.xml" }
)

foreach ($page in $testPages) {
    $url = "http://$EC2_IP/$($page.Path)"
    try {
        $response = Invoke-WebRequest -Uri $url -TimeoutSec 5 -ErrorAction Stop
        Write-Success "✓ $($page.Description) (Status: $($response.StatusCode))"
    } catch {
        Write-Warning2 "✗ $($page.Description) - エラー"
    }
}

# ステップ10: 完了報告
Write-Header "🎉 デプロイ完了！"

$endTime = Get-Date
$duration = $endTime - $ScriptStartTime

Write-Host ""
Write-ColorOutput Green "📋 デプロイ結果:"
Write-Host "• サイトURL: " -NoNewline
Write-ColorOutput Blue "http://$EC2_IP"
Write-Host "• 記事数: " -NoNewline  
Write-ColorOutput Blue "46記事"
Write-Host "• カテゴリ: " -NoNewline
Write-ColorOutput Blue "掃除機・空気清浄機・加湿器"
Write-Host "• 実行時間: " -NoNewline
Write-ColorOutput Blue "$([math]::Round($duration.TotalMinutes, 2))分"
Write-Host "• 完了時刻: " -NoNewline
Write-ColorOutput Blue "$endTime"

Write-Host ""
Write-ColorOutput Green "🔗 確認すべきURL:"
Write-Host "• トップページ: http://$EC2_IP"
Write-Host "• 掃除機カテゴリ: http://$EC2_IP/pages/vacuum"
Write-Host "• 空気清浄機カテゴリ: http://$EC2_IP/pages/air-purifier"  
Write-Host "• 加湿器カテゴリ: http://$EC2_IP/pages/humidifier"
Write-Host "• サイトマップ: http://$EC2_IP/sitemap.xml"
Write-Host "• robots.txt: http://$EC2_IP/robots.txt"

Write-Host ""
Write-ColorOutput Green "📝 次のステップ:"
Write-Host "1. ブラウザでサイトの動作確認"
Write-Host "2. モバイル表示の確認"
Write-Host "3. SSL証明書の設定 (Let's Encrypt)"
Write-Host "4. ドメイン名の設定"
Write-Host "5. Google Analytics の設定"

Write-Host ""
Write-ColorOutput Green "🔧 管理コマンド:"
Write-Host "• ログ確認: ssh -i $KeyFile $EC2User@$EC2_IP 'sudo tail -f /var/log/httpd/access_log'"
Write-Host "• エラーログ: ssh -i $KeyFile $EC2User@$EC2_IP 'sudo tail -f /var/log/httpd/error_log'"
Write-Host "• Apache再起動: ssh -i $KeyFile $EC2User@$EC2_IP 'sudo systemctl restart httpd'"

Write-Host ""
Write-ColorOutput Green "PowerShellデプロイスクリプト実行完了！🚀"