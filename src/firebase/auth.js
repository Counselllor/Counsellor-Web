import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyCL_bwyE7_rwnAbuEJl5Vr7FD1_e_cOZxw",
  // authDomain: "counsellor-web-e81b7.firebaseapp.com",
  // databaseURL: "https://counsellor-web-e81b7-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "counsellor-web-e81b7",
  // storageBucket: "counsellor-web-e81b7.appspot.com",
  // messagingSenderId: "1055143292636",
  // appId: "1:1055143292636:web:1397f7974a27bd486e0e19",
  // measurementId: "G-MJST0MPDZ3"

  apiKey: "AIzaSyA4NTAh8c0RsJp7Nxh6nnBgo4_gVElrC6s",
  authDomain: "counselor-web.firebaseapp.com",
  projectId: "counselor-web",
  storageBucket: "counselor-web.appspot.com",
  messagingSenderId: "417914818263",
  appId: "1:417914818263:web:35f0cadde168b5ae052a92",
  measurementId: "G-68D1EM7658"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
