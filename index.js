// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getDatabase,ref } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMKc5C40fOlnWECz0zzzZn6y8QHNQFV_o",
  authDomain: "backend-nst-hackathon.firebaseapp.com",
  projectId: "backend-nst-hackathon",
  storageBucket: "backend-nst-hackathon.firebasestorage.app",
  messagingSenderId: "1035682383162",
  appId: "1:1035682383162:web:b7c93e40492ac992ddbc03",
  measurementId: "G-GC3SKFQTL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// doing something
const database = getDatabase(app);
export const taskref = ref(database,'Tasks');

