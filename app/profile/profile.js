import { View, Text, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import {Stack,useRouter, useSearchParams} from 'expo-router' 
import {useState, useCallback, useEffect} from 'react'
import{COLORS, icons, SIZES} from '../../constants'
import { ScreenHeaderBtn,ProfileCard } from '../../components'
import { useAuth } from "../../context/auth";
import { readUserData, updateUserDoc } from '../../firebase'



const profile = () => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false)
    const { user, handleLogout, userInfo } = useAuth();
    const [ userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

   

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
    
    const updateUserInfo = async(newData) => {
      await updateUserDoc(user?.uid, newData)
      fetchData(user?.uid)
    }
    
    const handleUpdate = useCallback(async(newData) => {
      // console.log('New Data (profie.js):', newData)
      await updateUserInfo(newData)
      onRefresh()
    })

    const onRefresh = useCallback(()=>{
        setRefreshing(true)
        fetchData(user?.uid) //Refetch
        setRefreshing(false)
      },[])

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
            <ScrollView ishowsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary}/>
            ) : error ? (
              <Text>Something went wrong!</Text>
            ) : !userData? (
              <Text>No data</Text>
            ) : (
            <View style={{ flex: 1, padding: SIZES.medium}}>
                <ProfileCard name={user?.displayName} email={user?.email} info={userData} userPhoto={user?.photoURL} onSave={handleUpdate}/> 
            </View>
            )}
            </ScrollView>
        </>
   </SafeAreaView>
  )
}

export default profile