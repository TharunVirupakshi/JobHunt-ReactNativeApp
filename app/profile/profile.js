import { View, Text, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import {Stack,useRouter, useSearchParams} from 'expo-router' 
import {useState, useCallback, useEffect} from 'react'
import{COLORS, icons, SIZES} from '../../constants'
import { ScreenHeaderBtn,ProfileCard } from '../../components'
import { useAuth } from "../../context/auth";
import { readUserData } from '../../firebase'



const profile = () => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false)
    const { user, handleLogout, userInfo } = useAuth();
    const [ userData, setUserData] = useState(null)

    useEffect(() => {
      const fetchData = async (uid) => {
        try {
          const data = await readUserData(uid);
          setUserData(data);
          console.log('User info received (profile):', data);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      };
    
      fetchData(user?.uid);
    }, []);
    
    

    const onRefresh = useCallback(()=>{
        setRefreshing(true)
        refetch()
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
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, padding: SIZES.medium}}>
                <ProfileCard name={user?.displayName} email={user?.email} info={userData}/> 
            </View>
            </ScrollView>
        </>
   </SafeAreaView>
  )
}

export default profile