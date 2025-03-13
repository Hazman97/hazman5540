import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyD1u9jVuJ2B9IAyZCvPvi2VFvEUXEL8EMw",
    authDomain: "photocollection-aaacb.firebaseapp.com",
    projectId: "photocollection-aaacb",
    storageBucket: "photocollection-aaacb.firebasestorage.app",
    messagingSenderId: "1098153185069",
    appId: "1:1098153185069:web:d3dfe08093d65662c88da4",
    measurementId: "G-RY04QP408L"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
