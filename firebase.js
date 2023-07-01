// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getFirestore, doc, setDoc ,getDoc, collection, updateDoc} from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL, u} from 'firebase/storage'
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
const storage = getStorage(app)

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

const updateUserDoc = async(userId, newData) => {
  try {
    const {photoUrl, ...cleanedData} = newData
    if(newData?.name) auth.currentUser.updateProfile({displayName: `${newData.name}`})
    if(photoUrl){
      console.log('Photo uri received(firebase): ',photoUrl)
      const downloadUrl = await uploadPhoto(photoUrl) 
      auth.currentUser.updateProfile({photoURL: downloadUrl})
    }
    const userRef = doc(collection(firestore, 'users'), userId);
    await updateDoc(userRef, cleanedData);
    console.log('Document updated successfully');
  } catch (error) {
    console.log("Error updating",error)
  }

}

const uploadPhoto = async(uri) => {
  
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  try {
    const storageRef = ref(storage, `Image/image-${Date.now()}`)
    // if (storageRef instanceof Object) {
    //   // Storage reference is valid
    //   console.log('Storage reference is valid:', storageRef);
    // } else {
    //   // Storage reference is not valid
    //   console.log('Invalid storage reference');
    // }
    const result = await uploadBytes(storageRef, blob)
    blob.close()
    console.log("Photo Uploaded Successfully (firebase)")
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.log('Error Uploading Phott: ',error)
  }

  
}




export { auth, createUserDoc, readUserData, updateUserDoc}