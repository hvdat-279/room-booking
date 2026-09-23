import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDcij6VV2yG_w6uJn0WGLR-Ux2jD1_kdnY",
  authDomain: "miniproject2-35fa8.firebaseapp.com",
  projectId: "miniproject2-35fa8",
  storageBucket: "miniproject2-35fa8.firebasestorage.app",
  messagingSenderId: "1025863644735",
  appId: "1:1025863644735:web:af299980f067d779586a8a",
  measurementId: "G-X9P9ZXW49M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
