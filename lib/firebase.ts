import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJxOAwvAdqmih9_s-vxL5U9jeuaeX5Qz4",
    authDomain: "genially-geo.firebaseapp.com",
    projectId: "genially-geo",
    storageBucket: "genially-geo.firebasestorage.app",
    messagingSenderId: "1017175794089",
    appId: "1:1017175794089:web:9752d998dbaac35e6e64b8"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
