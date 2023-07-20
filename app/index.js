import {View, Text, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES} from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components'
import { useAuth } from "../context/auth";
import SignIn from "./(auth)/sign-in";
import { checkImageURL } from "../utils";

const Home = () => {
    const router = useRouter();
    const { user, handleLogout } = useAuth();
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      console.log('Photo URL (home): ',user?.photoURL)
    }, [])
    

    const goToProfile = () => {
        router.push('./profile/profile')
    }

    return ( 
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite,}}>
             <Stack.Screen 
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%'/>
                    ),
                    headerRight: () => (

                        <ScreenHeaderBtn iconUrl={{uri: checkImageURL(user?.photoURL) ? user?.photoURL : "https://internwisecouk.s3.eu-west-2.amazonaws.com/all_uploads/default_company.png"}} dimension='100%' username={'Name'} handlePress={goToProfile}/>
                    
                    ),
                    headerTitle: " ",
                }}
             />
             <ScrollView showsVerticalScrollIndicator={false}>
                <View   
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}>
                    
                    <Welcome
                        userName={user? user.displayName : ''}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={()=>{
                            if(searchTerm){
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                  
                    {/* <Popularjobs/> */}
                    {/* <Nearbyjobs/>     */}
                    {/* <TouchableOpacity onPress={handleLogout} style={{padding: 10, backgroundColor: COLORS.primary, width: 80, marginTop: 10, borderRadius: 50}}>
                        <Text style={{color: COLORS.white, textAlign: 'center'}}>Sign Out</Text>
                    </TouchableOpacity> */}
                </View>
             </ScrollView>
        </SafeAreaView>
    )
}


export default Home;
