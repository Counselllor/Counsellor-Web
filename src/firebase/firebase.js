import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPZJ9_OSL-kqjKtH2FR6LadlBhy9HSm-w",
  authDomain: "counsellor-4371c.firebaseapp.com",
  projectId: "counsellor-4371c",
  storageBucket: "counsellor-4371c.appspot.com",
  messagingSenderId: "659288911685",
  appId: "1:659288911685:web:5062a7267b45b6e3eb182c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };