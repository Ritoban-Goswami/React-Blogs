import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyARKzD2YdkRMV7zN2Y2G32RPEtTKIwcZjU",
    authDomain: "react-blogs-12953.firebaseapp.com",
    projectId: "react-blogs-12953",
    storageBucket: "react-blogs-12953.appspot.com",
    messagingSenderId: "833800085554",
    appId: "1:833800085554:web:205518c5bdb76e24c5dc2b",
    databaseURL: "https://react-blogs-12953-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: 'gs://react-blogs-12953.appspot.com'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);