// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
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

export { auth }