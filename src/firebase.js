import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDglCESAksVVABMYE2kD09TwAS4wbBNt9U",
  authDomain: "teesbah-project.firebaseapp.com",
  projectId: "teesbah-project",
  storageBucket: "teesbah-project.firebasestorage.app",
  messagingSenderId: "341210801201",
  appId: "1:341210801201:web:03107c91c3f6e65e11a110",
  measurementId: "G-4P6DHLVL3M"
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);