import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBOZxD61FFMXBscDzQihhxexMvD-cHhabw",
  authDomain: "skillrush-3adaf.firebaseapp.com",
  projectId: "skillrush-3adaf",
  storageBucket: "skillrush-3adaf.firebasestorage.app",
  messagingSenderId: "273943175463",
  appId: "1:273943175463:web:ad134f4d1a13b567fe4902",
  measurementId: "G-WKHYQ00ML5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// npm install -g firebase-tools
// npm install firebase
// firebase login, firebase init, firebase deploy
