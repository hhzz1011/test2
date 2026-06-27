# Tokyo Club Discount App

東京ナイトクラブのゲストディスカウント情報を検索・管理するWebアプリです。
クラブオーナー・スタッフが割引情報を一元管理し、ゲストリスト登録を効率化します。

## 機能

- **ディスカウント検索** — エリア・ジャンル・割引タイプで絞り込み
- **クラブ詳細表示** — 営業情報・割引条件・タグ情報
- **お気に入り管理** — ローカルストレージで保存
- **ゲストリスト登録** — クラブへの事前登録フォーム

## 技術スタック

- **フロントエンド**: HTML / CSS / Vanilla JavaScript
- **バックエンド**: Node.js + Express

## セットアップ

```bash
npm install
npm start
# http://localhost:3000 でアクセス
```

## API エンドポイント

| Method | Path | 説明 |
|--------|------|------|
| GET | /api/clubs | クラブ一覧（フィルタ対応） |
| GET | /api/clubs/:id | クラブ詳細 |
| GET | /api/areas | エリア一覧 |
| GET | /api/genres | ジャンル一覧 |
| POST | /api/guestlist | ゲストリスト登録 |

### 検索パラメータ

- `keyword` — フリーワード
- `area` — エリア（渋谷・六本木 など）
- `genre` — ジャンル（テクノ・ハウス など）
- `discountType` — 割引タイプ（ゲストリスト・女性割引 など）
