import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDipCbgQbpSRYpxo-p_9vVdLc0Kl_JBYyk",
  authDomain: "gssoc-24-cousellor.firebaseapp.com",
  databaseURL: "https://gssoc-24-cousellor-default-rtdb.firebaseio.com",
  projectId: "gssoc-24-cousellor",
  storageBucket: "gssoc-24-cousellor.appspot.com",
  messagingSenderId: "419613641249",
  appId: "1:419613641249:web:4c59c6f84f7837227ff160",
  measurementId: "G-LSDBZ4E76F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
