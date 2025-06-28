# プロジェクトの追加方法

このドキュメントでは、ポートフォリオサイトに新しいプロジェクトを追加する方法を説明します。

## プロジェクトタイプ

以下のプロジェクトタイプをサポートしています：

- **web-app**: Webアプリケーション 🌐
- **mobile-app**: モバイルアプリ 📱
- **desktop-app**: デスクトップアプリ 🖥️
- **competition**: コンペティション・競技会 🏆
- **oss-contribution**: オープンソース貢献 🤝
- **research**: 研究・論文 📚
- **data-analysis**: データ分析プロジェクト 📊
- **other**: その他 ✨

## プロジェクトデータ構造

### 基本的な例

```json
{
  "id": "project-unique-id",
  "title": "プロジェクト名",
  "type": "web-app",
  "description": "短い説明（一覧表示用）",
  "longDescription": "詳細な説明（詳細ページ用）",
  "skills": ["使用技術1", "使用技術2"],
  "achievements": [],
  "links": {
    "demo": "https://example.com/",
    "github": "https://github.com/username/repo",
    "article": null
  },
  "media": {
    "thumbnail": null,
    "screenshots": [],
    "video": null
  },
  "date": "2024-06-01",
  "featured": false,
  "status": "active"
}
```

### フィールド説明

| フィールド | 必須 | 説明 |
|-----------|------|------|
| id | ✓ | プロジェクトの一意な識別子（英数字とハイフン） |
| title | ✓ | プロジェクト名 |
| type | ✓ | プロジェクトタイプ（上記リストから選択） |
| description | ✓ | 短い説明（100文字程度） |
| longDescription |  | 詳細な説明 |
| skills | ✓ | 使用した技術・スキルの配列 |
| achievements |  | 実績・受賞歴の配列 |
| links | ✓ | 関連リンク（demo, github, article） |
| media |  | メディアファイル（thumbnail, screenshots, video） |
| date | ✓ | YYYY-MM-DD形式の日付 |
| featured |  | 注目プロジェクトとして表示（デフォルト: false） |
| status |  | active, completed, ongoing のいずれか |

### achievements（実績）の例

```json
// コンペティションのメダル
{
  "type": "medal",
  "value": "Silver Medal",
  "detail": "Top 5% (123/2,500 teams)"
}

// その他の賞
{
  "type": "award",
  "value": "Best Innovation Award",
  "detail": "Hackathon 2024"
}
```

## 手順

### 1. プロジェクトデータの追加

`data/projects.json` を編集し、`projects` 配列に新しいプロジェクトを追加します。

### 2. プロジェクト追加の例

```json
{
  "id": "my-new-project",
  "title": "革新的なプロジェクト",
  "type": "web-app",
  "description": "ユーザー体験を革新するWebアプリケーション",
  "longDescription": "詳しい説明をここに記載...",
  "skills": ["React", "Node.js", "PostgreSQL"],
  "achievements": [],
  "links": {
    "demo": "https://my-project.com/",
    "github": "https://github.com/nk2t/my-project",
    "article": null
  },
  "media": {
    "thumbnail": null,
    "screenshots": [],
    "video": null
  },
  "date": "2024-06-28",
  "featured": false,
  "status": "active"
}
```

### 3. コミットとデプロイ

```bash
git add data/projects.json
git commit -m "Add new project: [プロジェクト名]"
git push origin main
```

GitHub Actionsが自動的にサイトをビルド・デプロイします。

## プロジェクトタイプ別の推奨事項

### Web/モバイル/デスクトップアプリ
- デモリンクまたはダウンロードリンクを提供
- 使用した技術スタックを明確に記載
- スクリーンショットで実際の画面を見せる

### コンペティション
- achievements に順位・メダル情報を必ず含める
- 解法の記事があればリンクを追加
- 使用したアルゴリズムや手法を skills に含める

## ベストプラクティス

1. **一貫性のあるタグ付け**
   - 同じ技術は同じ表記で統一（例: "JavaScript" not "JS"）
   - 一般的に認知されている名称を使用

2. **説明文の書き方**
   - description: 一目で内容が分かる簡潔な説明
   - longDescription: 技術的な詳細や成果を含む説明

3. **日付の重要性**
   - 新しいプロジェクトが上位に表示される
   - featured フラグで重要なプロジェクトを固定可能

## トラブルシューティング

### JSONの検証
```bash
python -m json.tool data/projects.json
```

### ローカルテスト
```bash
python -m http.server 8000
# http://localhost:8000 で確認
```

### よくある問題
- JSONの構文エラー（カンマ、引用符）
- 必須フィールドの欠落
- 日付形式の誤り（YYYY-MM-DD形式を使用）