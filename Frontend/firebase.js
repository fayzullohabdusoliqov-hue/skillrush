import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";

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