// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9HX9u0O6_LrTJAu-Lvml4W--XadwzSDg",
  authDomain: "hackathon-reactjs.firebaseapp.com",
  projectId: "hackathon-reactjs",
  storageBucket: "hackathon-reactjs.appspot.com",
  messagingSenderId: "973988016276",
  appId: "1:973988016276:web:abae4fc8cc8586cbad8481",
  measurementId: "G-WNK11DKE38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
