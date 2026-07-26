# test2 — 転職サーチ

求人検索Webアプリ（Express + バニラJS、Vercel デプロイ対応）

## ローカル起動

```bash
npm install
node server.js
# http://localhost:3000
```

## API

| エンドポイント | 説明 |
|---|---|
| `GET /api/jobs` | 求人検索（キーワード・条件絞り込み・ページング） |
| `GET /api/jobs/:id` | 求人詳細 |
| `GET /api/indeed-jobs` | Indeed キャッシュデータの検索 |
| `GET /api/linkedin/status` | LinkedIn連携が有効かどうか |
| `GET /api/linkedin/auth` | LinkedIn 認証画面へリダイレクト |
| `GET /api/linkedin/callback` | LinkedIn OAuth コールバック |

---

## LinkedIn連携のセットアップ

LinkedIn連携は2つの機能で構成されています。

- **シェア** — 各求人の「シェア」ボタン。APIキー不要で**設定なしでも動作します**。
- **ログイン** — LinkedIn OAuth 2.0（OpenID Connect）でのサインイン。下記の設定が必要です。

環境変数が未設定の場合、ログインボタンは自動的に非表示になります（シェアは動作し続けます）。

### 1. LinkedIn アプリを作成

1. https://www.linkedin.com/developers/apps で **Create app**
2. LinkedIn ページ（会社ページ）の紐付けが必要です。無ければ無料で作成できます
3. **Products** タブで **Sign In with LinkedIn using OpenID Connect** を追加
4. **Auth** タブの *Authorized redirect URLs* に以下を登録
   - `https://<your-vercel-domain>/api/linkedin/callback`
   - `http://localhost:3000/api/linkedin/callback` （ローカル開発用）
5. **Auth** タブから Client ID / Client Secret をコピー

### 2. 環境変数を設定

Vercel の Project Settings → Environment Variables、またはローカルの `.env`:

```
LINKEDIN_CLIENT_ID=<Client ID>
LINKEDIN_CLIENT_SECRET=<Client Secret>
LINKEDIN_REDIRECT_URI=https://<your-vercel-domain>/api/linkedin/callback
```

`LINKEDIN_REDIRECT_URI` は LinkedIn 側に登録した URL と**完全に一致**させてください。
ローカルで試す場合は `http://localhost:3000/api/linkedin/callback` を指定します。

設定後に再デプロイすると、ヘッダーに「LinkedInでログイン」ボタンが表示されます。

### 実装メモ

- 共通ロジック: `lib/linkedin.js`（ローカルの `server.js` と Vercel の `api/linkedin/*.js` で共有）
- scope は `openid profile email`（新しい LinkedIn アプリでは旧 `r_liteprofile` は使用不可）
- プロフィールは `https://api.linkedin.com/v2/userinfo` から取得
- CSRF 対策として `state` を httpOnly Cookie に保存し、コールバックで照合
- セッションストアは持たず、取得した表示名・アイコンをフロントの localStorage に保存
