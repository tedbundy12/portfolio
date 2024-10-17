import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDYfyj8XiT6uXpXHr2i45pDSFWpM_RE2L0",
  authDomain: "portfolio-2d92b.firebaseapp.com",
  projectId: "portfolio-2d92b",
  storageBucket: "portfolio-2d92b.appspot.com",
  messagingSenderId: "695763317832",
  appId: "1:695763317832:web:e7ede45dd810bda434547d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Добавляем Firestore
