import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCL_bwyE7_rwnAbuEJl5Vr7FD1_e_cOZxw",
  authDomain: "counsellor-web-e81b7.firebaseapp.com",
  databaseURL: "https://counsellor-web-e81b7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "counsellor-web-e81b7",
  storageBucket: "counsellor-web-e81b7.appspot.com",
  messagingSenderId: "1055143292636",
  appId: "1:1055143292636:web:1397f7974a27bd486e0e19",
  measurementId: "G-MJST0MPDZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();
