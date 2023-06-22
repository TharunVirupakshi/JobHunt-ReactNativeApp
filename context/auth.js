import { useRouter, useSegments } from "expo-router";
import React, { useState } from "react";
import { auth } from "../firebase";

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
      console.log(user.email)
      router.replace("/");
    }
  }, [user, segments]);
}

export function Provider(props) {
  const [user, setAuth] = React.useState(null);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useProtectedRoute(user);

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCreds =>{
      setAuth(userCreds.user)
      console.log('Registered: '+ userCreds.user.email)
    })
    .catch(error => alert(error.message))
  }
  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCreds => {
      setAuth(userCreds.user)
      console.log('Logged in with: '+userCreds.user.email)
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



  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignUp,
        handleLogin,
        handleLogout,
        setEmail,
        setPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}