
import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ( {

  apiKey: "AIzaSyBuwfmmjvnE-R4NdfCdQsPfUC4O_klW6JM",
  authDomain: "unitchat-4f0a6.firebaseapp.com",
  projectId: "unitchat-4f0a6",
  storageBucket: "unitchat-4f0a6.appspot.com",
  messagingSenderId: "929384700116",
  appId: "1:929384700116:web:4a8be889271c1631ef4341"
  
  }).auth();