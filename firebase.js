// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getFirestore, doc, setDoc ,getDoc, collection, updateDoc, getDocs, deleteDoc} from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject, } from 'firebase/storage'
import 'firebase/compat/auth';
// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "jobhunt-app.firebaseapp.com",
  projectId: "jobhunt-app",
  storageBucket: "jobhunt-app.appspot.com",
  messagingSenderId: process.env.FIREBASE_MSG_SNDR_ID,
  appId: process.env.FIREBASE_APP_ID
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

const deleteUserDoc = async(userId) => {
  try{
    const userRef = doc(collection(firestore, 'users'), userId);
    const userDoc = await getDoc(userRef);
    let data = userDoc.data()

    //Delete sub collection
    await getDocs(collection(firestore, 'users', userId, 'saved-jobs'))
    .then((querySnapshot) => {
      
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref).then(
          console.log("Removed fav job")
        ).catch((error)=>{
          console.log("Error removing: ",error)
        })
      });
      console.log("(Firebase) Deleted saved-jobs:")
    })
    .catch((error) => {
      console.log('(Firebase) Error deleting saved jobs:', error);
      // return [];
    });
   //Delete user photo
   await deletePhoto(data?.imgPath? data.imgPath : '')
    //Delete user Doc
   await deleteDoc(userRef).then(
      console.log("(Firebase)Deleted user Document")
    ).catch(err => { console.log("(Firebase)Error deleteing user doc", err)})
  
    
  }catch(error){
    console.log("Error deleting user details", error)
  }
}

const updateUserDoc = async(userId, newData) => {
  try {
    const {photoUrl, ...remainderData} = newData
    const {bio, name, role, location, imgPath} = remainderData;

    const newDoc = {
      bio: bio ?? "",
      role: role ?? "",
      location: location ?? "",
      imgPath: imgPath ?? ""
    }

    
    if(name) auth.currentUser.updateProfile({displayName: `${newData.name}`})
    if(photoUrl){
      console.log('Photo uri received(firebase): ',photoUrl)
      
      const path = await uploadPhoto(photoUrl)
      console.log("path: "+ path)
      newDoc.imgPath = path
    
    } else {
      console.log('Photo uri NOT received(firebase)')
    }
    // Filter out fields with empty values
    const filteredDoc = Object.entries(newDoc).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
    const userRef = doc(collection(firestore, 'users'), userId);
    await updateDoc(userRef, filteredDoc);
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
    const path = `Image/image-${Date.now()}`
    const storageRef = ref(storage, path)
    // if (storageRef instanceof Object) {
    //   // Storage reference is valid
    //   console.log('Storage reference is valid:', storageRef);
    // } else {
    //   // Storage reference is not valid
    //   console.log('Invalid storage reference');
    // }
    
    const result = await uploadBytes(storageRef, blob)
    blob.close()
    const userRef = doc(collection(firestore, 'users'), auth.currentUser.uid);
    const userDoc = await getDoc(userRef);
    let data = userDoc.data()
    await deletePhoto(data?.imgPath? data.imgPath : '')
    console.log("Photo Uploaded Successfully (firebase)")
    console.log("Path: ",path)
    const url = await getDownloadURL(storageRef)
    auth.currentUser.updateProfile({photoURL: url})
    console.log("Download url", url)

    return path
  } catch (error) {
    console.log('Error Uploading Phott: ',error)
  }

  
}

const deletePhoto = async(url) => {
  console.log("(Firebase) Url to delete:", url)
  const path = url
  const fileRef = ref(storage, path)

  // console.log("(Firebase) Does file exist? ", fileRef.exists())
  try{
    const userRef = doc(collection(firestore, 'users'), auth.currentUser.uid);
    auth.currentUser.updateProfile({photoURL: ''});
    deleteObject(fileRef)
      .then(()=>
      console.log("Removed file"))
      .catch(err => console.log("Error deleting", err))
    await updateDoc(userRef, {imgPath: null});
  }catch(err){
    console.log("(Firebase) Error deleting photo", err)
  }
  

  // console.log("(Firebase) Does file exist? ", fileRef.exists())
}

const addFavoriteItem = (id, favoriteItemID) => {
  console.log("ADD FAV:",favoriteItemID);

  if (!favoriteItemID) {
    console.log('Favorite item ID is missing.');
    return;
  }
  // Access the user object
  // Add the favorite item to the user's "favorites" subcollection in Firestore
  setDoc(doc(firestore, 'users', id, 'saved-jobs', favoriteItemID), {
    [favoriteItemID]: true,
  })
    .then(() => {
      console.log('Favorite item added successfully!');
    })
    .catch((error) => {
      console.log('Error adding favorite item:', error);
    });
}

const fetchFavoriteItems = async(id) => {
  // Access the user object
  if(!id){
    console.log("No id")
    return
  } 
  const favoriteItems = [];
  return getDocs(collection(firestore, 'users', id, 'saved-jobs'))
    .then((querySnapshot) => {
      
      querySnapshot.forEach((doc) => {
        favoriteItems.push(doc.id); // This will give you the favorite item ID
      });
      console.log("Favs(Firebase):",favoriteItems)
      return favoriteItems
    })
    .catch((error) => {
      console.log('Error fetching favorite items:', error);
      // return [];
    });
    
}

const deleteFavoriteItem = async(id, favoriteItemID) =>{
  console.log("Removing Fav item: ",favoriteItemID)
  if (!favoriteItemID) {
    console.log('Favorite item ID is missing.');
    return;
  }
  await deleteDoc(doc(firestore, "users", id, "saved-jobs", favoriteItemID)).then(
    console.log("Removed successfully")
  ).catch((error)=>{
    console.log("Error removing: ",error)
  })
}

const handleReAuth = (currentPswd) =>{
    const user = auth.currentUser
    const cred = firebase.auth.EmailAuthProvider.credential(user.email,currentPswd)

    return user.reauthenticateWithCredential(cred)
  }

const handleDeleteAccount = async (currentPswd) => {
    let success, error;
  
    try {
      await handleReAuth(currentPswd);
      const user = auth.currentUser;
      await deleteUserDoc(user?.uid);
      auth.signOut()
      await user.delete()
      console.log("(auth) User Deleted");
      // alert("Your account has been deleted successfully!")
      success = true;
      error = null;
    } catch (err) {
      console.log("(auth) Error deleting user: ", err);
      success = false;
      error = err;
    }
  
    return { success, error };
  };





export { 
  auth, 
  createUserDoc, 
  readUserData, 
  updateUserDoc, 
  addFavoriteItem, 
  fetchFavoriteItems,
  deleteFavoriteItem,
  handleDeleteAccount,
  deletePhoto
}