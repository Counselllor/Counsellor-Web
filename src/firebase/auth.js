import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCL_bwyE7_rwnAbuEJl5Vr7FD1_e_cOZxw",
//   authDomain: "counsellor-web-e81b7.firebaseapp.com",
//   databaseURL:
//     "https://counsellor-web-e81b7-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "counsellor-web-e81b7",
//   storageBucket: "counsellor-web-e81b7.appspot.com",
//   messagingSenderId: "1055143292636",
//   appId: "1:1055143292636:web:1397f7974a27bd486e0e19",
//   measurementId: "G-MJST0MPDZ3",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBf9H-AsC-nAL_6jiLDwnDD89f2H5ONRa0",
  authDomain: "counsellor-web.firebaseapp.com",
  databaseURL:
    "https://counsellor-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "counsellor-web",
  storageBucket: "counsellor-web.appspot.com",
  messagingSenderId: "208629482006",
  appId: "1:208629482006:web:3f789e26b05ab0c061ab37",
  measurementId: "G-0TY5KRZ5TW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
