import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useAuth, useRouter } from "../../context/auth";
import { COLORS, FONT, SIZES } from "../../constants";
import { Stack } from "expo-router";
import { LoginBox } from "../../components";
const SignIn = () => {
  const { signIn } = useAuth();
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.secondary }}>
      <Stack.Screen options={{
        headerShown: false
      }} />

      <LoginBox handleSignIn={signIn} handleSignUp={()=>{}}/>
    </View>
  );
}

export default SignIn