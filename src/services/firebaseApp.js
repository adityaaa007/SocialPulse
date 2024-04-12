import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import conf from "../conf/config";

const firebaseConfig = {
  apiKey: conf.apiKey,
  authDomain: conf.authDomain,
  databaseURL: conf.databaseUrl,
  projectId: conf.projectId,
  storageBucket: conf.storageBucket,
  messagingSenderId: conf.messagingSenderId,
  appId: conf.appId,
  measurementId: conf.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
export default app;
