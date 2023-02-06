// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARKzD2YdkRMV7zN2Y2G32RPEtTKIwcZjU",
    authDomain: "react-blogs-12953.firebaseapp.com",
    projectId: "react-blogs-12953",
    storageBucket: "react-blogs-12953.appspot.com",
    messagingSenderId: "833800085554",
    appId: "1:833800085554:web:205518c5bdb76e24c5dc2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);
// createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });
