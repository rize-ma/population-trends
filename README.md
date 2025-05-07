# 都道府県別人口推移グラフアプリ  
  
## サービスのURL
https://population-trends-six.vercel.app/

## 技術スタック
| Category              | Technology Stack                                                                      |
|:-----------           |:------------                                                                          |
| 言語                   | [TypeScript](https://www.typescriptlang.org/)                                         | 
| CSSフレームワーク        | [TailwindCSS](https://tailwindcss.com/)                                               | 
| コンポーネントライブラリ  | [MantineUI](https://mantine.dev/) (使用用途はグラフ描画とhooksのみ)                        | 
| ビルドツール            | [Vite](https://ja.vite.dev/)                                                           |
| テスト                 | [Vitest](https://vitest.dev/), [msw](https://mswjs.io/)                                |
| CI/CD                 | [GitHub Actions](https://docs.github.com/ja/actions), [Vercel](https://vercel.com/)    |

## 開発環境構築手順

### リポジトリクローン
```
git clone https://github.com/rize-ma/population-trends.git
```
### パッケージのインストール
```
npm install
```

### 環境変数設定
envファイルに以下を設定
```
VITE_API_KEY=<APIキー>
VITE_API_BASE_URL=<ベースURL>
```

### 開発サーバーの起動
```
npm dev
```


## ブランチモデル

| ブランチ名       | 派生元         | 説明                     |
|:-----------    |:------------  |:------------             |
| main           |  　　　　　　　　|リリースされたコードを管理する |
| develop        |               |開発中のコードを管理する      | 
| feat/*         |develop        |機能開発行う                 |
| fix/*          |main,develop   |バグ、不具合の修正を行う       |
| docs/*         |develop        |ドキュメント更新行う          |
| refactor/*     |develop        |コード改善(リファクタ)を行う   |
| perf/*         |develop        |パフォーマンス改善を行う       |
| test/*         |develop        |テストの実装を行う            |
| chore/*        |develop        |CI/CD等を行う         |
