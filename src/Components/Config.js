import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
 apiKey: "AIzaSyDo_aVCvzdkvfTtcea1OnxoTzfbm2hzdBo",
  authDomain: "holidayplanners-7d56c.firebaseapp.com",
  projectId: "holidayplanners-7d56c",
  storageBucket: "holidayplanners-7d56c.firebasestorage.app",
  messagingSenderId: "828536658159",
  appId: "1:828536658159:web:182e2e6d31d75f1a63e31a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);
export {app,db,analytics}