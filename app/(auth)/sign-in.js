import { Text, View, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from "react-native";
import { useAuth, useRouter } from "../../context/auth";
import { COLORS, FONT, SIZES } from "../../constants";
import { Stack } from "expo-router";
import { LoginBox } from "../../components";
import { LinearGradient } from 'expo-linear-gradient'
import backgroundImg from '../../assets/images/pexels-fauxels-3184287.jpg'
const SignIn = () => {
  const { signIn } = useAuth();
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.secondary }}> 
      <Stack.Screen options={{
        headerShown: false
      }} />
    <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.bgImage}>
      <View style={styles.overlay}></View>
    </ImageBackground>
     
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', 'black']}
          style={styles.background}
        />
        <LoginBox handleSignIn={signIn} handleSignUp={()=>{}} />
    </View>
  );
}

export default SignIn

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: '100%',
    width: '100%',
    opacity: .9
  }
})