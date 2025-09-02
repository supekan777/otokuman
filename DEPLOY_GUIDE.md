# デプロイ手順書 - 失敗しないお得マン！

## 🚀 クイックデプロイ手順

### 1. 基本デプロイ（最も一般的）

```bash
# 1. プロジェクトディレクトリに移動
cd "C:/Users/chun7/OneDrive/デスクトップ/studyWorld/家電特化サイト"

# 2. デプロイスクリプト実行
bash deploy.sh
```

**これだけで完了！** 約3-5分でデプロイされます。

### 2. デプロイ前チェック項目

✅ EC2インスタンス起動中  
✅ PEMファイル存在確認: `C:/Users/chun7/Downloads/otokuman.pem`  
✅ インターネット接続確認  

### 3. デプロイ成功の確認

- ブラウザで http://16.176.167.244 にアクセス
- トップページが正常表示されればOK
- robots.txt, sitemap.xml も確認可能

## 📋 詳細デプロイ手順

### ステップ1: 事前準備
```bash
# 現在のディレクトリ確認
pwd
# 出力: /c/Users/chun7/OneDrive/デスクトップ/studyWorld/家電特化サイト

# PEMファイル確認
ls -la "C:/Users/chun7/Downloads/otokuman.pem"
```

### ステップ2: デプロイスクリプト実行
```bash
bash deploy.sh
```

### ステップ3: 実行ログの確認
以下のメッセージが表示されれば成功：
```
🎉 デプロイ完了！
• サイトURL: http://16.176.167.244
• 記事数: 46記事
• 完了時刻: [実行日時]
```

## 🔧 設定ファイル詳細

### deploy.sh の重要設定
```bash
EC2_IP="16.176.167.244"
KEY_FILE="C:/Users/chun7/Downloads/otokuman.pem"
EC2_USER="ubuntu"
```

### デプロイされるファイル
- `*.html` - 全HTMLファイル
- `css/` - スタイルシート
- `js/` - JavaScript
- `articles/` - 記事ファイル  
- `pages/` - 固定ページ
- `robots.txt`, `sitemap.xml`
- `images/`, `admin/`, `data/` (存在する場合)

## ⚠️ よくあるエラーと対処法

### エラー1: PEMファイル権限エラー
```
chmod: changing permissions of 'C:/Users/chun7/Downloads/otokuman.pem': Permission denied
```
**対処**: 無視してOK（WindowsのためのPermission denied、実際の接続には影響なし）

### エラー2: EC2接続失敗
```
EC2への接続に失敗しました
```
**対処**:
1. EC2インスタンス起動確認
2. セキュリティグループでSSH(22)許可確認
3. PEMファイルパス確認

### エラー3: Apache設定エラー
```
Apacheのセットアップに失敗
```
**対処**: Ubuntuのパッケージ更新
```bash
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 "sudo apt-get update"
```

### エラー4: ファイル転送失敗
**対処**: ネットワーク接続確認、再実行

## 🔍 デプロイ状況の確認方法

### 1. サイトアクセス確認
```bash
curl -I http://16.176.167.244
# HTTP/1.1 200 OK が返ればOK
```

### 2. Apache ログ確認
```bash
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 'sudo tail -n 20 /var/log/apache2/access.log'
```

### 3. エラーログ確認
```bash
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 'sudo tail -n 20 /var/log/apache2/error.log'
```

## 🎯 部分デプロイ（特定ファイルのみ）

### HTMLファイルのみ更新
```bash
scp -i "C:/Users/chun7/Downloads/otokuman.pem" *.html ubuntu@16.176.167.244:/tmp/
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 "sudo mv /tmp/*.html /var/www/html/"
```

### CSSファイルのみ更新  
```bash
scp -i "C:/Users/chun7/Downloads/otokuman.pem" -r css/ ubuntu@16.176.167.244:/tmp/
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 "sudo cp -r /tmp/css /var/www/html/"
```

## 📊 デプロイ完了後の必須確認項目

### 1. 基本ページ確認
- [ ] http://16.176.167.244 (トップページ)
- [ ] http://16.176.167.244/pages/humidifier.html
- [ ] http://16.176.167.244/pages/air-purifier.html  
- [ ] http://16.176.167.244/pages/vacuum.html

### 2. SEOファイル確認
- [ ] http://16.176.167.244/robots.txt
- [ ] http://16.176.167.244/sitemap.xml

### 3. 記事ページ確認（サンプル）
- [ ] http://16.176.167.244/articles/humidifier-guide-2025.html
- [ ] http://16.176.167.244/articles/air-purifier-guide-2025.html

## 🚨 緊急時の対処法

### Apache再起動
```bash
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 'sudo systemctl restart apache2'
```

### 設定ファイル復旧（バックアップから）
```bash
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 'sudo cp -r /var/www/html_backup/* /var/www/html/'
```

### 権限修復
```bash
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 'sudo chown -R www-data:www-data /var/www/html/ && sudo chmod -R 755 /var/www/html/'
```

## 📈 パフォーマンス監視

### アクセス数確認
```bash
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 'sudo awk "{print \$1}" /var/log/apache2/access.log | sort | uniq -c | sort -nr | head -10'
```

### レスポンス時間確認
```bash
curl -w "@curl-format.txt" -o /dev/null -s http://16.176.167.244
```

## 🔄 継続運用のベストプラクティス

### 1. 定期バックアップ
月1回、EC2のスナップショット作成推奨

### 2. ログローテーション  
Apacheログが大きくなりすぎる前に定期確認

### 3. セキュリティアップデート
```bash  
ssh -i "C:/Users/chun7/Downloads/otokuman.pem" ubuntu@16.176.167.244 'sudo apt-get update && sudo apt-get upgrade -y'
```

---

**このファイルを必ずブックマークして、デプロイ時は必ず参照すること**