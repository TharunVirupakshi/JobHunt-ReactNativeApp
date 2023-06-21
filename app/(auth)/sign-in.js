import { Text, View, TouchableOpacity } from "react-native";
import { useAuth, useRouter } from "../../context/auth";
import { COLORS } from "../../constants";
import { Stack } from "expo-router";
export default function SignIn() {
  const { signIn } = useAuth();
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Stack.Screen options={{
      headerShown:false
    }}/>
       <TouchableOpacity onPress={() => signIn()} style={{padding: 10, backgroundColor: COLORS.primary, width: 80, marginTop: 10, borderRadius: 50}}>
          <Text style={{color: COLORS.white, textAlign: 'center'}}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}