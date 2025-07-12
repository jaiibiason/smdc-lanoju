// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkztWz383CNxeLOikF459o5cQbQQIK5uU",
  authDomain: "dmdc-freelance.firebaseapp.com",
  projectId: "dmdc-freelance",
  storageBucket: "dmdc-freelance.firebasestorage.app",
  messagingSenderId: "482320757035",
  appId: "1:482320757035:web:da24ad19fc1da0ee37156e",
  measurementId: "G-L3S11XDG8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const rtdb = getDatabase(app, "https://dmdc-freelance-default-rtdb.firebaseio.com/");