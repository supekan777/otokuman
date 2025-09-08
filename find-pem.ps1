# PEMファイル検索スクリプト

Write-Host "🔍 PEMファイル検索中..." -ForegroundColor Yellow
Write-Host ""

# よく使われる場所を検索
$searchPaths = @(
    "$env:USERPROFILE\Downloads",
    "$env:USERPROFILE\Documents", 
    "$env:USERPROFILE\Desktop",
    "$env:USERPROFILE\.ssh",
    "$env:USERPROFILE\OneDrive\デスクトップ",
    "$env:USERPROFILE\OneDrive\ドキュメント"
)

$foundFiles = @()

foreach ($path in $searchPaths) {
    if (Test-Path $path) {
        Write-Host "📁 検索中: $path" -ForegroundColor Blue
        $files = Get-ChildItem -Path $path -Filter "*.pem" -Recurse -ErrorAction SilentlyContinue
        foreach ($file in $files) {
            $foundFiles += $file
            Write-Host "✅ 発見: $($file.FullName)" -ForegroundColor Green
        }
    }
}

Write-Host ""

if ($foundFiles.Count -eq 0) {
    Write-Host "❌ PEMファイルが見つかりませんでした。" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 対処方法:" -ForegroundColor Yellow
    Write-Host "1. AWS Management Consoleでキーペア名を確認"
    Write-Host "2. キーペアを再ダウンロード"
    Write-Host "3. 新しいキーペアを作成"
    Write-Host ""
    Write-Host "📖 詳細な手順:" -ForegroundColor Cyan
    Write-Host "1. AWSコンソール → EC2 → キーペア"
    Write-Host "2. 既存のキーペアを確認または新規作成"
    Write-Host "3. .pemファイルをダウンロード"
} else {
    Write-Host "🎉 PEMファイルが見つかりました！" -ForegroundColor Green
    Write-Host ""
    Write-Host "💡 使用方法:" -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($file in $foundFiles) {
        $fileName = $file.Name
        $fullPath = $file.FullName
        
        Write-Host "📄 ファイル名: $fileName" -ForegroundColor White
        Write-Host "📍 パス: $fullPath" -ForegroundColor Gray
        Write-Host ""
        Write-Host "🚀 デプロイコマンド例:" -ForegroundColor Yellow
        Write-Host ".\deploy.ps1 -KeyFile `"$fullPath`" -EC2User `"ec2-user`"" -ForegroundColor White
        Write-Host ""
        Write-Host "─────────────────────────────────────" -ForegroundColor Gray
        Write-Host ""
    }
}

Write-Host "🔗 参考リンク:" -ForegroundColor Cyan
Write-Host "AWS EC2キーペア管理: https://console.aws.amazon.com/ec2/home#KeyPairs:"