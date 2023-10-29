import {useState, useEffect, useCallback} from 'react'
import { Text, SafeAreaView, FlatList, ActivityIndicator, View } from 'react-native'
import { Stack, useRouter, useSearchParams,useFocusEffect } from 'expo-router'
import { ScreenHeaderBtn,NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import { fetchFavoriteItems } from '../../firebase'
import { useAuth } from '../../context/auth'
import useFetchMultiple from '../../hook/useFetchMultiple'
import styles from '../../styles/search'


const savedJobs = () => {
  const router = useRouter()
  const [favs, setFavs] = useState([])
  const [details, setDetails] = useState([])
  const {user} = useAuth();
  const [empty, setEmpty] = useState(false)

  
  useEffect(() => {
     const fetchFavIds = async() => {
      return await fetchFavoriteItems(user?.uid)
     }
     fetchFavIds().then( ids => {
        console.log("Ids(savedJobs):", ids)
        if(ids.length == 0)
          setEmpty(true)
        else
          setEmpty(false)
        setFavs(ids)
       }
     )

     return () => {
      setFavs([])
      setDetails([])
     }
  },[])


 
  
  useEffect(()=>{
    console.log("Favs(savedJobs):",favs)
  },[favs])

  const {data,error,isLoading,refetch} = useFetchMultiple('job-details','job_id',favs)
  

  useEffect(()=>{
    console.log("Data(savedJobs): ",data)
    setDetails(data)
  },[favs])

  useEffect(()=>{
    console.log("Details(savedJobs):",details)
  },[details])

  // useFocusEffect(()=>{
  //   console.log("Focused")
  // })

  //To refetch jobs if navigated back
  useFocusEffect(
    useCallback(()=>{
      const fetchFavIds = async() => {
        return await fetchFavoriteItems(user?.uid)
       }
       fetchFavIds().then( ids => {
          console.log("Ids(savedJobs):", ids)
          if(ids.length == 0)
            setEmpty(true)
          else
            setEmpty(false)
          setFavs(ids)
         }
       ).then(
        refetch()
       )
    },[])
  )


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

            {/* <View style={styles.cardsContainer}>
              {isLoading?(
                <ActivityIndicator size='large' colors={COLORS.primary}/>
              ): error ? (
                <Text>Something went wrong!</Text>
              ): (
               data.map(item => <Text>Compnay:{item.employer_name}</Text>)
              )}
            </View> */}
            
            <FlatList
       
              data={data}
              renderItem={({ item }) => (
                    <NearbyJobCard
                        job={item}
                        handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                    />
                )}
              keyExtractor={(item) => item.job_id}
              contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
              ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>Saved Jobs</Text>
                            {/* <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text> */}
                        </View>
                        <View style={styles.loaderContainer}>
                            {isLoading ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : error ? (
                                <Text>Oops something went wrong</Text>
                            ) : empty && (
                                <Text>Nothing on the list!</Text>)
                            }

                        </View>
                    </>
                )}
            />


        

            

    </SafeAreaView>
  )
}

export default savedJobs