// import React, { createContext, useContext, useEffect, useState } from 'react';
// import {
//     createUserWithEmailAndPassword,
//     onAuthStateChanged
// } from "firebase/auth"
// import { auth } from '../firebase-config';

// const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//     const [currentUser, setCurrentUser] = useState();

//     function signup(email, password) {
//         return auth.createUserWithEmailAndPassword(email, password);
//     }

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanges(user => setCurrentUser(user));
//         return unsubscribe;
//     }, [])

//     const value = { currentUser, signup }
//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
