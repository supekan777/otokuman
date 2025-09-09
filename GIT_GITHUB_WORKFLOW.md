# Git & GitHub自動化ワークフロー

## 基本情報
- **リポジトリURL**: https://github.com/supekan777/otokuman
- **作業ディレクトリ**: C:\Users\chun7
- **SSH鍵ファイル**: C:/Users/chun7/otokuman_key.pem
- **デプロイ先サーバー**: ubuntu@13.238.219.164:/var/www/html/articles/

## 自動実行手順

### 1. 作業完了時の自動Git処理
```bash
# ステップ1: 現在の状況確認
git status
git diff
git log --oneline -5

# ステップ2: 変更ファイルの追加
git add "OneDrive/デスクトップ/studyWorld/家電特化サイト/articles/"
git add air-purifier-*.html humidifier*.html single-living-*.html baby-child-*.html bedroom-*.html odor-*.html

# ステップ3: コミット作成
git commit -m "$(cat <<'EOF'
[作業内容の要約]

- [具体的な変更点1]
- [具体的な変更点2]  
- [具体的な変更点3]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# ステップ4: プッシュ実行
git push origin master
```

### 2. 初回セットアップ時の処理
```bash
# 既存のリモート削除（必要に応じて）
git remote remove origin

# 正しいリモート追加
git remote add origin https://github.com/supekan777/otokuman.git

# 競合解決のためのプル
git pull origin master --allow-unrelated-histories

# 競合ファイル対処
mv index.html index_local_backup.html  # 必要に応じて

# 再度プル
git pull origin master --allow-unrelated-histories

# プッシュ
git push origin master
```

### 3. 一般的なトラブルシューティング

#### 埋め込まれたリポジトリエラー
```bash
git rm --cached -f "OneDrive/デスクトップ/studyWorld/家電特化サイト"
```

#### 競合ファイルの対処
```bash
mv [競合ファイル名] [競合ファイル名]_backup.html
git pull origin master --allow-unrelated-histories
```

#### GitHub認証エラー
```bash
gh auth login --web
# ブラウザでワンタイムコードを入力
```

## 自動化すべきタスク

### A. 記事更新完了時
1. **自動Git処理実行**
   - 変更ファイルの自動検出と追加
   - 適切なコミットメッセージ生成
   - GitHub自動プッシュ

2. **実行コマンド例**
```bash
# 家電サイト記事の変更を自動コミット・プッシュ
git add "OneDrive/デスクトップ/studyWorld/家電特化サイト/articles/*.html"
git commit -m "Update humidifier mold cleaning guide with compact layout design"
git push origin master
```

### B. 大規模更新時
1. **バッチ処理**
```bash
# 複数記事の一括更新
git add air-purifier-*.html humidifier*.html
git commit -m "Enhance multiple appliance guides with responsive design and affiliate integration"
git push origin master
```

## 重要な注意点

### ファイルパス
- **日本語パス対応**: `"OneDrive/デスクトップ/studyWorld/家電特化サイト/"`
- **エスケープ不要**: ダブルクォートで囲む
- **相対パス使用**: 作業ディレクトリからの相対パス

### コミットメッセージ標準化
```bash
git commit -m "$(cat <<'EOF'
[Action] [Target] with [Enhancement]

- Specific change 1
- Specific change 2
- Specific change 3

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### エラー回避
1. **必ず`git status`で状況確認**
2. **競合時は`--allow-unrelated-histories`使用**
3. **埋め込みリポジトリは`git rm --cached -f`で削除**
4. **認証エラー時は`gh auth login --web`で再認証**

## 毎回実行すべきチェックリスト

### ✅ 作業前
- [ ] `git status`で現在の状況確認
- [ ] リモートリポジトリ接続確認

### ✅ 作業後
- [ ] 変更ファイルを`git add`で追加
- [ ] 適切なコミットメッセージでコミット
- [ ] `git push origin master`でプッシュ
- [ ] GitHub上で反映確認

### ✅ トラブル時
- [ ] 競合ファイルのバックアップ作成
- [ ] `--allow-unrelated-histories`でマージ
- [ ] 埋め込みリポジトリの削除
- [ ] 認証状況の再確認

## 成功パターンの記録

**今回成功したワークフロー:**
1. `git add`で家電記事ファイルを追加
2. 埋め込みリポジトリエラーを`git rm --cached -f`で解決
3. 競合ファイル(`index.html`)を`mv`でバックアップ
4. `git pull origin master --allow-unrelated-histories`でマージ
5. `git push origin master`で完了

このワークフローを次回から自動実行する。