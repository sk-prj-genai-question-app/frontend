[English](./README.md) | [한국어](./README.ko.md) | [日本語](./README.ja.md)

---

# 🌐 JLPT問題生成学習ヘルパー - フロントエンド

[![React](https://img.shields.io/badge/React-19-blue.svg)](#-tech-stack--libraries)
[![Vite](https://img.shields.io/badge/Vite-7.0-purple.svg)](#-tech-stack--libraries)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-cyan.svg)](#-tech-stack--libraries)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

「生成AIによるJLPT問題生成学習ヘルパー」のユーザーインターフェース(UI)を担当するフロントエンドプロジェクトです。ReactとViteをベースに構築されており、ユーザーがJLPT問題を解き、AIと対話し、学習の進捗状況を視覚的に確認できるすべての画面を提供します。

<!-- 
![Project Screenshot](path/to/screenshot.png) 
-->

## ✨ 主な機能

- **🖥️ レスポンシブUI**: デスクトップ、タブレット、モバイルなど、さまざまなデバイスに最適化された画面。
- **👤 ユーザー認証**: 直感的な会員登録およびログインフォームを提供。
- **📝 問題解決**: AIが生成したJLPT問題を解き、正解を提出するインタラクティブなインターフェース。
- **📊 学習ダッシュボード**: Rechartsを活用した学習進捗率、正答率などの視覚的なデータチャートを提供。
- **🤖 AIチャットボット**: AIとリアルタイムで質問と回答をやり取りできるチャットUI。
- **⚙️ ルーティング**: React Router DOMを使用したスムーズなページ遷移。

## 🛠️ 技術スタックと主要ライブラリ

| 区分 | 技術 / ライブラリ | 説明 |
| :--- | :--- | :--- |
| **言語** | JavaScript (ES6+), TypeScript | |
| **フレームワーク** | React | v19.1 |
| **ビルドツール** | Vite | v7.0 |
| **スタイリング** | Tailwind CSS, PostCSS | |
| **状態管理** | React Hooks (useState, useContextなど) | |
| **ルーティング** | React Router DOM | v7.6 |
| **HTTP通信** | Axios | v1.10 |
| **チャート/視覚化**| Recharts, React Circular Progressbar | |
| **アイコン** | React Icons | |
| **コードリンティング** | ESLint | |

## 📂 プロジェクト構造

```
src/
├── api/              # バックエンドAPI連携 (Axiosインスタンス)
├── assets/           # 画像、フォントなどの静的アセット
├── components/       # 再利用可能な共通UIコンポーネント (ボタン、モーダルなど)
├── pages/            # 各ページを構成するメインコンポーネント (ログイン、ダッシュボードなど)
├── App.jsx           # アプリケーションの最上位コンポーネントとルーティング設定
└── main.jsx          # Reactアプリケーションのエントリーポイント
```

## 🚀 始め方

### 1. 事前要件

- Node.js (v18.x以上を推奨)
- npm

### 2. インストール

プロジェクトのルートディレクトリで以下のコマンドを実行し、依存関係をインストールします。
```bash
npm install
```

### 3. 環境設定

バックエンドAPIサーバーのアドレスを設定する必要があります。プロジェクトのルートに`.env.development`ファイルを作成し、以下のようにAPIサーバーのアドレスを入力してください。

```
# .env.development
VITE_API_BASE_URL=http://localhost:8080 
```
> **注意**: この変数は`src/api/axios.js`のようなファイルで`import.meta.env.VITE_API_BASE_URL`の形式で使用されます。

### 4. 開発サーバーの実行

以下のコマンドを実行すると、Vite開発サーバーが起動します。
```bash
npm run dev
```
サーバーが起動したら、`http://localhost:5173`アドレスにアクセスできます。

## 📜 主なNPMスクリプト

- `npm run dev`: 開発モードでViteサーバーを実行します。
- `npm run build`: 本番用にアプリケーションをビルドし、`dist`フォルダに結果を生成します。
- `npm run lint`: ESLintを使用してコードスタイルをチェックします。
- `npm run preview`: 本番ビルドの結果をローカルでプレビューします。

## 🐳 Dockerで本番環境を実行

このプロジェクトは、Nginxを使用して静的ファイルを提供するマルチステージDockerビルドをサポートしています。

1.  **Dockerイメージをビルド**
    ```bash
    docker build -t jlpt-frontend:latest .
    ```

2.  **Dockerコンテナを実行**
    ```bash
    docker run -p 80:80 jlpt-frontend:latest
    ```
    これで`http://localhost`アドレスにアクセスして、本番ビルドされたアプリケーションを確認できます。

## 🤝 貢献

貢献はいつでも大歓迎です！Issueを作成するか、Pull Requestを送ってください。

## 📄 ライセンス

このプロジェクトはMITライセンスに従います。詳細については`LICENSE`ファイルを参照してください。
