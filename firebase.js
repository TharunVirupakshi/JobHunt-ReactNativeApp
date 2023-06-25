// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getFirestore, doc, setDoc ,getDoc, collection} from 'firebase/firestore';
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
 
// Read user data based on user ID
const readUserData = async (userId) => {
  try {
    const userRef = doc(collection(firestore, 'users'), userId);
    const userDoc = await getDoc(userRef);
    let userInfo

    if (userDoc.exists()) {
      console.log('User data(firbase):', userDoc.data());
      userInfo =  userDoc.data()
      return userInfo
    } else {
      console.log('User not found');
    }

  
  } catch (error) {
    console.log('Error reading user data:', error);
  }
};


export { auth, createUserDoc, readUserData}