// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import 'firebase/compat/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "jobhunt-app.firebaseapp.com",
  projectId: "jobhunt-app",
  storageBucket: "jobhunt-app.appspot.com",
  messagingSenderId: "***REMOVED***",
  appId: "***REMOVED***"
};

// Initialize Firebase

let app
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
    
} else {
    app = firebase.app()

}

const auth = firebase.auth()
const firestore = getFirestore()

const createUserDoc = (user, data) => {
    // Access the newly created user objec

    // Store additional user information in Firestore
    setDoc(doc(firestore, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      phone: data?.phone,
    })
      .then(() => {
        console.log('User signed up and additional information stored successfully!');
      })
      .catch((error) => {
        console.log('Error storing additional user information:', error);
      });

}
 

export { auth, createUserDoc}