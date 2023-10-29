import {useState, useEffect} from 'react'
import { Text, SafeAreaView, FlatList, ActivityIndicator, View } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { ScreenHeaderBtn } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import { fetchFavoriteItems } from '../../firebase'
import { useAuth } from '../../context/auth'
import useFetchMultiple from '../../hook/useFetchMultiple'
import PopularJobCard from '../../components/common/cards/popular/PopularJobCard'
import styles from '../../components/home/popular/popularjobs.style'

const savedJobs = () => {
  const router = useRouter()
  const [favs, setFavs] = useState([])
  const [details, setDetails] = useState([])
  const {user} = useAuth();


  
  useEffect(() => {
     const fetchFavIds = async() => {
      return await fetchFavoriteItems(user?.uid)
     }
     fetchFavIds().then( ids => {
        console.log("Ids(savedJobs):", ids)
        setFavs(ids)
       }
     )
  },[])

  useEffect(()=>{
    console.log("Favs(savedJobs):",favs)
  },[favs])

  const {data,error,isLoading} = useFetchMultiple('job-details','job_id',favs)
  

  useEffect(()=>{
    console.log("Data(savedJobs): ",data)
    setDetails(data)
  },[favs])

  useEffect(()=>{
    console.log("Details(savedJobs):",details)
  },[details])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <View style={styles.cardsContainer}>
              {isLoading?(
                <ActivityIndicator size='large' colors={COLORS.primary}/>
              ): error ? (
                <Text>Something went wrong!</Text>
              ): (
               data.map(item => <Text>Compnay:{item.employer_name}</Text>)
              )}
            </View>

            

    </SafeAreaView>
  )
}

export default savedJobs