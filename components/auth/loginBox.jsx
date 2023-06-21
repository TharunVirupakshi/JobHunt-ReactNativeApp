import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import { Stack } from "expo-router";

const LoginBox = ({handleSignIn, handleSignUp}) => { 

  return (
      <View style={styles.authBox}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>JobHunt</Text>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Username"
          />
        </View>
       
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
          />
        </View>
         
        <View style={styles.btnsContainer}>
          <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
            <Text style={{ textAlign: 'center' , color: COLORS.white}}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp} style={styles.btn} >
            <Text style={{ textAlign: 'center' , color: COLORS.white}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        
      </View>
   
  );
}


export default LoginBox

const styles = StyleSheet.create({
  authBox: {
    // backgroundColor: COLORS.gray2,
    width: '80%',
  },
  btn: {
    // margin: SIZES.small,
    // marginTop: 5,
    flex: 1,
    height: 50,
    backgroundColor: 'black',
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  btnsContainer: {
    // backgroundColor: 'blue',
    gap: SIZES.xSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    margin: SIZES.small,
  },
  input: {
    fontFamily: FONT.regular,
    width: "100%",
    height: '100%',
    paddingHorizontal: SIZES.medium,
  },
  inputWrapper: {
    backgroundColor: COLORS.white,
    margin: SIZES.small,
    height: 50,
  
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  logoWrapper: {
    marginLeft: SIZES.xLarge,
    // paddingLeft: SIZES.xSmall
  },
  logoText: {
    fontSize: 40,
    fontFamily: FONT.bold,
    color: COLORS.white,
  },
  
})