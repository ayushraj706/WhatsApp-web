import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// BaseKey Neural Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUTiD3_BZf5Hl5slqCFfYdNjaivdc-WQk",
  authDomain: "instagram-2e3dc.firebaseapp.com",
  projectId: "instagram-2e3dc",
  storageBucket: "instagram-2e3dc.firebasestorage.app",
  messagingSenderId: "1039690381653",
  appId: "1:1039690381653:web:adc1b2822bd8d8c4bbd7dc",
  measurementId: "G-BGM7V6N3Z6"
};

// Initialize Firebase for Client (Preventing multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default db;
