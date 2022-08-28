const s = Deno.args[0].trim();
const PRE = "const firebaseConfig = ";
const s2 = s.substring(PRE.length, s.length - 1);
const s3 = s2.replace(/  /g, '"').replace(/: /g, '": ');
const config = JSON.parse(s3);
const map = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "NEXT_PUBLIC_FIRBASE_MESSAGING_SENDER_ID",
  appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
  measurementId: "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
  databaseURL: "NEXT_PUBLIC_FIREBASE_DATABASE_URL",
};
const ss = [];
for (const name in map) {
  ss.push(`export ${map[name]}="${config[name] || ""}"`);
}
console.log(ss.join("\n"));
