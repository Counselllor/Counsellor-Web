import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDPhcXaBHNZvVyiAuM-E7QZwHj88XlquQE",
  authDomain: "smart-road-394307.firebaseapp.com",
  projectId: "smart-road-394307",
  storageBucket: "smart-road-394307.appspot.com",
  messagingSenderId: "688615482410",
  appId: "1:688615482410:web:c5fbfdbd3c30bf66f74f53",
  measurementId: "G-C98GEJ8GFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();