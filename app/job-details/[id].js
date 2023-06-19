import {useCallback, useState} from 'react'
import { 
  SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, RefreshControlComponent
 } from 'react-native'
import {Stack,useRouter, useSearchParams} from 'expo-router' 
import{Company, JobAbout, ScreenHeaderBtn} from '../../components'
import{COLORS, icons} from '../../constants'
import useFetch from '../../hook/useFetch'

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const {data, isLoading, error, refetch} = useFetch('job-details', {job_id: params.id})
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {}


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
              iconUrl={icons.share}
              dimension='60%'
            />
          )
        }}/>

        <>
          <ScrollView showsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

          </ScrollView>
        </>

    </SafeAreaView>
  )
}

export default JobDetails
