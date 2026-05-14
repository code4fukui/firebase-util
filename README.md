# firebase-util

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A Deno script to convert a Firebase web configuration object into a shell script that exports environment variables, formatted for use with frameworks like Next.js.

## Features

-   Converts your Firebase config snippet directly into `export` statements.
-   Generates Next.js-compatible `NEXT_PUBLIC_` environment variable names.
-   Supports all standard Firebase configuration keys, including `databaseURL` and `measurementId`.

## Requirements

-   [Deno](https://deno.land/) runtime

## Usage

1.  **Get your config:** Copy the `firebaseConfig` object from your Firebase project console.

2.  **Run the script:** Execute the `makeenv.js` script with Deno, passing the entire configuration object as a single string argument.

3.  **Use the output:** The script prints `export` commands to standard output. You can redirect this into a file (e.g., `.env.local`) to be used by your application or `source` it in your shell.

    ```bash
    # Save to a file for frameworks like Next.js to auto-load
    deno run https://code4fukui.github.io/firebase-util/makeenv.js '...' > .env.local

    # Or, export directly into your current shell session
    source <(deno run https://code4fukui.github.io/firebase-util/makeenv.js '...')
    ```

## Example

### Command

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

### Output

The script will generate the following output. Note that `measurementId` will be empty if not provided in the input.

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

**Note:** There is a typo in the generated variable for `messagingSenderId` (`FIRBASE` instead of `FIREBASE`). Please be aware of this when using the variable in your code.

## License

MIT License — see [LICENSE](LICENSE).