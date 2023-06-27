import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { Stack } from "expo-router";


const LoginBox = ({handleSignIn, handleSignUp, setEmail, setPassword, setName, setPhoneNumber}) => { 
  const [isSignUpBox, setIsSignUpBox] = useState(false) 
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pass, setPass] = useState('')   

  return (
      <View style={styles.authBox}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>JobHunt</Text>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
          />
        </View>
        {isSignUpBox ? (<>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={text => setPhoneNumber(text)}
          />
        </View>
        </>
        ): (null)
        }
       

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => {setPassword(text); setPass(text)}}
            secureTextEntry
          />
        </View>

        {isSignUpBox ? ( 
              <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholder=" Confirm Password"
                      onChangeText={text => setConfirmPassword(text)}
                      secureTextEntry
                  />
              </View>
        ) : (null)}
         
        
          {!isSignUpBox ? (
              <View style={styles.btnsContainer}>

                  <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
                      <Text style={styles.btnTxt}>Log In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsSignUpBox(true)} style={[styles.btn]} >
                      <Text style={[styles.btnTxt]}>Sign Up</Text>
                  </TouchableOpacity>
              </View>
          ):(   
                
                <View style={styles.btnsContainer}>
                    <TouchableOpacity onPress={()=>setIsSignUpBox(false)} style={styles.btn}>
                        <Text style={styles.btnTxt}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pass==confirmPassword?handleSignUp:() =>alert("Password and Confirm Password did not match")} style={[styles.btn]} >
                        <Text style={[styles.btnTxt]}>Sign Up</Text>
                    </TouchableOpacity>
                </View> 
          )}
          
       
        
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
  btn2: {
    backgroundColor: COLORS.gray,
    borderWidth: .7,
    borderColor: COLORS.white,
  },
  btnTxt:{ 
    textAlign: 'center' , 
    color: COLORS.white,
    fontFamily: FONT.bold
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