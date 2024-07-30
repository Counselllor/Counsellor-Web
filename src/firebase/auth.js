import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEBhBv7AcPhmWS1JwfXijBEarDjsz16xM",
  authDomain: "lupo-7ba5f.firebaseapp.com",
  databaseURL: "https://lupo-7ba5f-default-rtdb.firebaseio.com",
  projectId: "lupo-7ba5f",
  storageBucket: "lupo-7ba5f.appspot.com",
  messagingSenderId: "418172032930",
  appId: "1:418172032930:web:b28842c67139e5c0e6c4fb",
  measurementId: "G-1NVNFSWR1M"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
