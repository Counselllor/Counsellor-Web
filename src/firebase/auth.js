// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import dotenv from "dotenv";
// dotenv.config();

// CounsellorWeb: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: process.env.YOUR_API_KEY,
//   authDomain: process.env.YOUR_AUTH_DOMAIN,
//   databaseURL: process.env.YOUR_DATABASE_URL,
//   projectId: process.env.YOUR_PROJECT_ID,
//   storageBucket: process.env.YOUR_STORAGE_BUCKET,
//   messagingSenderId: process.env.YOUR_MASSAGING_SENDER_ID,
//   appId: process.env.YOUR_APP_ID,
//   measurementId: process.env.YOUR_MEASUREMENT_ID
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();