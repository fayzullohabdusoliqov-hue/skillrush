// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOZxD61FFMXBscDzQihhxexMvD-cHhabw",
  authDomain: "skillrush-3adaf.firebaseapp.com",
  projectId: "skillrush-3adaf",
  storageBucket: "skillrush-3adaf.firebasestorage.app",
  messagingSenderId: "273943175463",
  appId: "1:273943175463:web:ad134f4d1a13b567fe4902",
  measurementId: "G-WKHYQ00ML5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// npm install -g firebase-tools
// npm install firebase
// firebase login, firebase init, firebase deploy
