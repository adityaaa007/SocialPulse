const conf = {
  apiKey: String(import.meta.env.VITE_APIKEY),
  authDomain: String(import.meta.env.VITE_AUTHDOMAIN),
  databaseUrl: String(import.meta.env.VITE_DATABASEURL),
  projectId: String(import.meta.env.VITE_PROJECTID),
  storageBucket: String(import.meta.env.VITE_STORAGEBUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGGINGSENDERID),
  appId: String(import.meta.env.VITE_APPID),
  measurementId: String(import.meta.env.VITE_MEASUREMENTID),
}

export default conf;