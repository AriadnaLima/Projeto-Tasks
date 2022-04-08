import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDIpddFkpt8TiTL023UwehBZOLLmnpD0-c",
    authDomain: "my-tasks-cee1f.firebaseapp.com",
    projectId: "my-tasks-cee1f",
    storageBucket: "my-tasks-cee1f.appspot.com",
    messagingSenderId: "87597729357",
    appId: "1:87597729357:web:4fe3d122868038ba6bfe04"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export {db}
