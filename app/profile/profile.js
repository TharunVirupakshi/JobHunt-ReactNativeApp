import { View, Text, TextInput, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator,Modal, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {Stack,useRouter, useSearchParams} from 'expo-router' 
import {useState, useCallback, useEffect} from 'react'
import{COLORS, icons, SIZES, SHADOWS, FONT} from '../../constants'
import { ScreenHeaderBtn,ProfileCard, BasicCard, NearbyJobCard } from '../../components'
import { useAuth } from "../../context/auth";
import { readUserData, updateUserDoc, handleDeleteAccount, deletePhoto } from '../../firebase'
import { Formik } from 'formik'
import styles from './profile.styles'



const profile = () => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false)
    const { user, handleLogout, handleReAuth, handleUpdatePassword } = useAuth();
    const [ userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [pswdModalVisible, setPswdModalVisible] = useState(false)
    const [delAccModalVisible, setDelAccModalVisible] = useState(false)
    const [isPswdValid, setIsPswdValid] = useState(false)
    const [isCorrectLength, setIsCorrectLength] = useState(false)
    const [curPswd, setCurPswd] = useState('')
    const [newPswd, setNewPswd] = useState('')
    const [confPswd, setConfPswd] = useState('')
    const [loading, setLoading] = useState(false)
    

    const fetchData = async (uid) => {
      try {
        setIsLoading(true)
        const data = await readUserData(uid);
        setUserData(data);
        console.log('User info received (profile):', data);
      } catch (error) {
        console.log('Error fetching user data:', error);
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    };

    useEffect(() => {
      fetchData(user?.uid);
      // console.log('User Photo (profile)', user)
    }, []);

    useEffect(()=>{
      setIsPswdValid(false)
      setIsCorrectLength(false)
    },[pswdModalVisible])
    
    const updateUserInfo = async(newData) => {
      await updateUserDoc(user?.uid, newData)
      fetchData(user?.uid)
    }
    
    const handleUpdate = useCallback(async(newData) => {
      // console.log('New Data (profie.js):', newData)
      await updateUserInfo(newData)
      onRefresh()
    })

    const removePhoto = async() => {
      try{
        console.log("Url for deleting", userData?.imgPath)
        await deletePhoto(userData?.imgPath)
        onRefresh()
      }catch(err){
        console.log("(profile) Error deleting photo", err)
      }finally{
        onRefresh()
      }
    }

    const onRefresh = useCallback(()=>{
        setRefreshing(true)
        fetchData(user?.uid) //Refetch
        setRefreshing(false)
      },[])

    //Password Change
    const handlePswdClick = () => {
      setPswdModalVisible(true)
    }
    
    const handleCurrentPswdChange = (pswd) => {
      setIsCorrectLength(false)
      setIsPswdValid(false)
      if(pswd.length > 6){
        handleReAuth(pswd).then(()=>{
          console.log("(Profile) Password verified")
          setIsPswdValid(true)
          setIsCorrectLength(true)
        }
        ).catch((error) => {
          setIsPswdValid(false)
          setIsCorrectLength(true)
          console.log("(Profile) Error:", error)
        })
      }else{
        setIsCorrectLength(false)
        setIsPswdValid(false)
      } 
    }

    const handleUpdatePswd = async() => {
      if(newPswd.length != 0 || confPswd.length != 0){
        if(newPswd === confPswd){
          try {
            setLoading(true)
            const { success, error } = await handleUpdatePassword(curPswd, newPswd);
            if (success) {
              setLoading(false)
              console.log("(Profile) Password Updated!");
              alert("Password Updated!");
              setPswdModalVisible(false);
            } else {
              setLoading(false)
              console.log("(Profile) Error: ", error);
              alert("Something went wrong!");
              setPswdModalVisible(false);
            }
          } catch (error) {
            setLoading(false)
            console.error("Unhandled promise rejection:", error);
            // Handle the error appropriately, such as showing an error message to the user.
          }finally{
            setLoading(false)
          }
        }else{
          setLoading(false)
          alert("New password and confirm Password did not match!")
        }
      }
      
    }

    //Delete Acc
    const handleDeleteAccClick = () => {
      setDelAccModalVisible(true)
    }

    const handleDelAcc = async() => {
      try {
        setLoading(true)
        const {success, error} = await handleDeleteAccount(curPswd)
        if(success){
          setLoading(false)
          console.log("(Profile) Deleted acc")
          alert("Your account has been deleted")
          handleLogout()
          setDelAccModalVisible(false)
        }else{
          setLoading(false)
          console.log("(Profile) Error deleting", error)
          alert("Something went wrong")
          setDelAccModalVisible(false)
        }
        
      } catch (error) {
        setLoading(false)
        console.error("Unhandled promise rejection:", error); 
      }finally{
        setLoading(false)
      }
      
    }

  return (
   <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen options={{
          headerTitle: '',
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: ()=>(
            <ScreenHeaderBtn 
              iconUrl={icons.left}
              dimension='60%'
              handlePress={()=> router.back()}
            />
          ),
          headerRight: ()=>(
            <ScreenHeaderBtn 
              iconUrl={icons.logout}
              handlePress={handleLogout}
              dimension='60%'
            />
          )
        }}/>

        <>
        {/* Modal for Change Password */}
        <Modal
        animationType="fade"
        transparent={true}
        visible={pswdModalVisible}
        onRequestClose={() => {
          setPswdModalVisible(false);
          setIsPswdValid(false);
          setIsCorrectLength(false);
        }}
        statusBarTranslucent={true}
      >
      <View style={styles.popupOverlay}>
      <View style={styles.popupCardContainer}>

     
        <View style={styles.popupCard}>
          {loading && 
          <ActivityIndicator 
            size="large" color={'black'} 
            style={styles.loading}/>
            }    
      
                
            <View style={styles.feild}>
              <Text style={styles.label}>Current Password</Text>
              <View style={[styles.inputWrapper, styles.borderStyle(isPswdValid, isCorrectLength)]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your current password"
                  onChangeText={pswd => {handleCurrentPswdChange(pswd); setCurPswd(pswd)}}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.feild}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your new password"
                  onChangeText={newPswd => setNewPswd(newPswd)}
                  editable={isPswdValid}
                  selectTextOnFocus={isPswdValid}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.feild}>
              {/* <Text style={styles.label}>Retype New Password</Text> */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Re enter your new password"
                  onChangeText={newPswd => setConfPswd(newPswd)}
                  editable={isPswdValid}
                  selectTextOnFocus={isPswdValid}
                  secureTextEntry
                />
              </View>
            </View>

            

            <View style={styles.btnsContainer}>
              <TouchableOpacity 
                  onPress={handleUpdatePswd} 
                  style={styles.btn}>
                  <Text style={styles.btnTxt}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setPswdModalVisible(false)
                setIsPswdValid(false);
                setIsCorrectLength(false);
                }} 
                style={[styles.btn, styles.btn2]} >
                  <Text style={[styles.btnTxt2]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          
        </View>
      </View>
      </View>
      </Modal>

        {/* Modal for Delete Acc */}
        <Modal
        animationType="fade"
        transparent={true}
        visible={delAccModalVisible}
        onRequestClose={() => {
          setDelAccModalVisible(false);
          setIsPswdValid(false);
          setIsCorrectLength(false);
        }}
        statusBarTranslucent={true}
      >
      <View style={styles.popupOverlay}>
      <View style={styles.popupCardContainer}>

     
        <View style={styles.popupCard}>
          {loading && 
          <ActivityIndicator 
            size="large" color={'black'} 
            style={styles.loading}/>
            } 
            <View style={styles.popupImgContainer}>
              <Image
                source={icons.redBin}
                style={styles.popupImg}
              />
            </View>   
            <View>
              <Text style={styles.warningText}>
                Deleting your account deletes all the data associated with your account.
                Please proceed with caution.
              </Text>
            </View>
                
            <View style={styles.feild}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.inputWrapper, styles.borderStyle(isPswdValid, isCorrectLength)]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password to proceed"
                  onChangeText={pswd => {handleCurrentPswdChange(pswd); setCurPswd(pswd)}}
                  secureTextEntry
                />
              </View>
            </View>

            

            <View style={styles.btnsContainer}>
              <TouchableOpacity
                  disabled={!isPswdValid} 
                  onPress={handleDelAcc} 
                  style={[styles.btn, styles.warningBtn]}>
                  <Text style={[styles.btnTxt, styles.warningBtnTxt]}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setDelAccModalVisible(false)
                setIsPswdValid(false);
                setIsCorrectLength(false);
                }} 
                style={[styles.btn, styles.btn2]} >
                  <Text style={[styles.btnTxt2]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          
        </View>
      </View>
      </View>
      </Modal>
            <ScrollView ishowsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            {
              isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary}/>
            ) : error ? (
              <Text>Something went wrong!</Text>
            ) : !userData? (
              <Text>No data</Text>
            ) : 
            (
            <View style={{ flex: 1, padding: SIZES.medium, rowGap: 10}}>
                <ProfileCard 
                  name={user?.displayName} 
                  email={user?.email} 
                  info={userData} 
                  userPhoto={user?.photoURL} 
                  onSave={handleUpdate}
                  handleRemovePhoto={removePhoto} 
                  />
                
                <BasicCard iconUrl={icons.key} text='Change Password' handleClick={handlePswdClick}/>
                <BasicCard iconUrl={icons.bin} text='Delete Account' handleClick={handleDeleteAccClick}/>
                
                
            </View>
            )}
            </ScrollView>
        </>
   </SafeAreaView>
  )
}

export default profile

