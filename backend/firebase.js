import { initializeApp } from "firebase/app";
import{
    getAuth,
    GoogleAuthProvider,
    getStorage,
    getFirestore,
    collection,
    doc,
    setDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbVGsGonMb49AVu8NLS-Ao_2ER475yqRU",
  authDomain: "talent-stack-3a2ab.firebaseapp.com",
  projectId: "talent-stack-3a2ab",
  storageBucket: "talent-stack-3a2ab.firebasestorage.app",
  messagingSenderId: "728976899951",
  appId: "1:728976899951:web:aa8a9787e26bbdd274f29a",
  measurementId: "G-34T4G7TBC4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth =getAuth(app);
export const googleProvider= new GoogleAuthProvider();