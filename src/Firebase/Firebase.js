import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const {REACT_APP_API_KEY, 
  REACT_APP_AUTHDOMAIN,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_APPID} = process.env

const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTHDOMAIN,
    projectId: REACT_APP_PROJECTID,
    storageBucket: REACT_APP_STORAGEBUCKET,
    messagingSenderId: REACT_APP_MESSAGINGSENDERID,
    appId: REACT_APP_APPID,
  };
  
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export {db}
