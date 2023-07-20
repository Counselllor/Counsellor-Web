import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA16OPiu-AU9kymLmeyfIbScEt6UIXVd3c",
  authDomain: "test-419c2.firebaseapp.com",
  projectId: "test-419c2",
  storageBucket: "test-419c2.appspot.com",
  messagingSenderId: "903258556629",
  appId: "1:903258556629:web:91c83e13de877b26247a5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();