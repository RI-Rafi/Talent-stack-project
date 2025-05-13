// Update your imports to use the modular approach.
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAbVGsGonMb49AVu8NLS-Ao_2ER475yqRU",
  authDomain: "talent-stack-3a2ab.firebaseapp.com",
  projectId: "talent-stack-3a2ab",
  storageBucket: "talent-stack-3a2ab.firebasestorage.app",
  messagingSenderId: "728976899951",
  appId: "1:728976899951:web:aa8a9787e26bbdd274f29a",
  measurementId: "G-34T4G7TBC4"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Set up Firestore and Analytics
export const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export necessary Firebase features
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
