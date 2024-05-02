import { createContext, useContext , useEffect, useState} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCSLuzpEeL5pRif6OJlaVmscTMsCgB71O8",
  authDomain: "bookify-5493c.firebaseapp.com",
  projectId: "bookify-5493c",
  storageBucket: "bookify-5493c.appspot.com",
  messagingSenderId: "789126305605",
  appId: "1:789126305605:web:ee2254543fbad42961102c",
};

//Create a hook
export const useFirebase = () => useContext(FirebaseContext);

//Instance of Firebase app.
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

//Create a provider
export const FirebaseProvider = (props) => {

    const [user,setUser]=useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user) => {
            if(user) setUser(user);
            else setUser(null);
        })
    },[]);

    const isLoggedIn = user ? true : false;

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  const signinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        isLoggedIn
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
