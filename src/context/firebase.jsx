import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const FireBaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyDjtp-1KJNFxC8AhAvoOrzdscPpqdHsgdg",
    authDomain: "fir-task-13605.firebaseapp.com",
    projectId: "fir-task-13605",
    storageBucket: "fir-task-13605.appspot.com",
    messagingSenderId: "234431325615",
    appId: "1:234431325615:web:ca11787f55fb5218667b5a"
};

export const useFirebase = () => useContext(FireBaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FireBaseProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user)=>{
           if (user) setUser(user);
           else setUser(null);
        });
    }, [])

    //custom function for register
    const signupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password); 

    //custom function for login
    const signinWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);  

    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    // console.log("this is user details",user);
    const handleUpdateProfile = async (name, phone , occ) => {
      return await addDoc(collection(firestore, 'profile'), {
        name,
        phone,
        occ,
        userID: user.uid,
        userEmail: user.email, 
        timestap: Date.now(),
      })

    }


    const listAllBooks = () => {
      return getDocs(collection(firestore, 'profile'));
    };

    const logout = async () => {
      await signOut(firebaseAuth);
      setUser(null);
      };
    

    const isLoggedIn = user ? true : false;


  return (
    <FireBaseContext.Provider value={{ signupUserWithEmailAndPassword, signinWithEmailAndPassword, signinWithGoogle, handleUpdateProfile, listAllBooks, logout, isLoggedIn, user}}>
      {props.children}
    </FireBaseContext.Provider>
  );
};
