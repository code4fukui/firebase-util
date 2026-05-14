# firebase-util

Firebaseのウェブ設定オブジェクトを、Next.jsなどのフレームワークで利用できるように環境変数をエクスポートするシェルスクリプトに変換するDenoスクリプトです。

## 機能

- Firebaseの設定スニペットを直接 `export` 文に変換します。
- Next.js互換の `NEXT_PUBLIC_` プレフィックスが付いた環境変数名を生成します。
- `databaseURL` や `measurementId` を含む、すべての標準的なFirebase設定キーをサポートします。

## 必要条件

- [Deno](https://deno.land/) ランタイム

## 使い方

1. **設定の取得:** Firebaseプロジェクトのコンソールから `firebaseConfig` オブジェクトをコピーします。

2. **スクリプトの実行:** Denoで `makeenv.js` スクリプトを実行し、設定オブジェクト全体を1つの文字列引数として渡します。

3. **出力の利用:** スクリプトは `export` コマンドを標準出力に出力します。これをファイル（例: `.env.local`）にリダイレクトしてアプリケーションで使用したり、シェルで `source` したりできます。

    ```bash
    # Next.jsなどのフレームワークが自動読み込みできるようファイルに保存
    deno run https://code4fukui.github.io/firebase-util/makeenv.js '...' > .env.local

    # または、現在のシェルセッションに直接エクスポート
    source <(deno run https://code4fukui.github.io/firebase-util/makeenv.js '...')
    ```

## 例

### コマンド

```bash
deno run https://code4fukui.github.io/firebase-util/makeenv.js 'const firebaseConfig = {
  apiKey: "AIzaSy...XXX",
  authDomain: "my-project.firebaseapp.com",
  databaseURL: "https://my-project-default-rtdb.firebaseio.com",
  projectId: "my-project",
  storageBucket: "my-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:..."
};'
```

### 出力

スクリプトは以下の出力を生成します。`measurementId` が入力で提供されていない場合は空になります。

```shell
export NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy...XXX"
export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="my-project.firebaseapp.com"
export NEXT_PUBLIC_FIREBASE_PROJECT_ID="my-project"
export NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="my-project.appspot.com"
export NEXT_PUBLIC_FIRBASE_MESSAGING_SENDER_ID="1234567890"
export NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:..."
export NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
export NEXT_PUBLIC_FIREBASE_DATABASE_URL="https://my-project-default-rtdb.firebaseio.com"
```

**注意:** 生成される `messagingSenderId` の変数名にタイポがあります（`FIREBASE` ではなく `FIRBASE` となっています）。コード内でこの変数を使用する際はこの点にご注意ください。

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
