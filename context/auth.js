import { useRouter, useSegments } from "expo-router";
import React, { useState, useEffect } from "react";
import { auth, createUserDoc, readUserData } from "../firebase";
import firebase from 'firebase/compat/app'

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();
  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export function Provider(props) {
  const [user, setAuth] = React.useState(null); //Change the default state to {} to bypass auth
  // const [userInfo, setUserInfo] = useState(null)
  const [email, setEmail] = useState(null) 
  const [password, setPassword] = useState(null)
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(null)

  useProtectedRoute(user);

  

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password, name, phoneNumber)
    .then(userCreds =>{
      const user = userCreds.user
      const data = {phone : phoneNumber}
      console.log('Received Ph: '+phoneNumber)
      user.updateProfile({
        displayName: `${name}`,
      })
      .then(() => {
        createUserDoc(user, data)
        setAuth(user);
        console.log('Registered:', user.email);
       
      })
      .catch(error => {
        console.error('Failed to update user profile:', error);
        // Handle any error that occurred during profile update
      });
    })
    .catch(error => alert(error.message))
  }
  const handleLogin = () => {
     auth
    .signInWithEmailAndPassword(email,password)
    .then(async userCreds => {
      setAuth(userCreds.user)
      console.log('Logged in with: '+userCreds.user.email)
      // const data = await readUserData(userCreds.user.uid)
      // console.log('userdata (auth): ', data)
      // setUserInfo(data)
    }) 
    .catch(error => alert(error.message))
  }

  const handleLogout = () => {
    auth
    .signOut()
    .then(()=>{
      setAuth(null)
      console.log("Logged out")
    })
    .catch(error => alert(error.message))
  }

  const handleReAuth = (currentPswd) =>{
    const user = auth.currentUser
    const cred = firebase.auth.EmailAuthProvider.credential(user.email,currentPswd)

    return user.reauthenticateWithCredential(cred)
  }

  const handleUpdatePassword = async (currentPswd, newPassword) => {
    let success, error;
  
    try {
      await handleReAuth(currentPswd);
      const user = auth.currentUser;
      await user.updatePassword(newPassword);
      console.log("(auth) Password Updated");
      success = true;
      error = null;
    } catch (err) {
      console.log("(auth) Error: ", err);
      success = false;
      error = err;
    }
  
    return { success, error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setName,
        handleSignUp,
        handleLogin,
        handleLogout,
        setEmail,
        setPassword,
        setPhoneNumber,
        handleReAuth,
        handleUpdatePassword
        // userInfo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}