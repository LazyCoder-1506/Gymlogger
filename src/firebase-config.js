import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBSE_API_KEY,
  authDomain: "gymlogger-c1e67.firebaseapp.com",
  projectId: "gymlogger-c1e67",
  storageBucket: "gymlogger-c1e67.appspot.com",
  messagingSenderId: "27926039938",
  appId: "1:27926039938:web:b72999393c47044241139b",
  measurementId: "G-7WQN5T3YQ2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);