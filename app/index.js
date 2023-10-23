import {View, Text,Image, Animated,ScrollView, SafeAreaView, TouchableOpacity, DrawerLayoutAndroid, StyleSheet, Button} from "react-native";
import { useState, useEffect , useRef} from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES} from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Sidebar} from '../components'
import { useAuth } from "../context/auth";
import SignIn from "./(auth)/sign-in";
import { checkImageURL } from "../utils";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import 'react-native-gesture-handler';
import { fetchFavoriteItems } from "../firebase";

const Drawer = createDrawerNavigator();

const Home = () => {
    const [showMenu, setShowMenu] = useState(false);
    // const drawer = useRef(null);
    const router = useRouter();
    const { user, handleLogout } = useAuth();
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [favs, setFavs] = useState([])
    
    const fetchFav = async()=>{
        console.log("Saved-jobs:",await fetchFavoriteItems(user?.uid))
        setFavs(await fetchFavoriteItems(user?.uid))
      }
     

    useEffect(() => {
      console.log('Photo URL (home): ',user?.photoURL)
      fetchFav()
      console.log("Fetched favs:", favs)
    }, [])
    


    const goToProfile = () => {
        router.push('./profile/profile')
    }

    // Animated Properties...

    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;  
    
    //Slide Animatin for the sidebar
    const slideAnimation = () => {
       // Do Actions Here....
                // Scaling the view...
                Animated.timing(scaleValue, {
                  toValue: showMenu ? 1 : 0.88,
                  duration: 300,
                  useNativeDriver: true
                  })
                  .start()
  
                  Animated.timing(offsetValue, {
                  // YOur Random Value...
                  toValue: showMenu ? 0 : 230,
                  duration: 300,
                  useNativeDriver: true
                  })
                  .start()
  
                  Animated.timing(closeButtonOffset, {
                  // YOur Random Value...
                  toValue: !showMenu ? -30 : 0,
                  duration: 300,
                  useNativeDriver: true
                  })
                  .start()
  
                  setShowMenu(!showMenu);
    }

    return (
        // <DrawerLayoutAndroid 
        //      ref={drawer}
        //      drawerWidth={300}
        //      drawerPosition={'left'}
        //      renderNavigationView={navigationView}
        //      >
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.primary,}}>

          <Sidebar userPhoto={user?.photoURL} userName={user?.displayName}/>

        {/* <LinearGradient
          // Background Linear Gradient
          colors={['transparent', 'black']}
          style={styles.background}
        /> */}
        <Animated.View style={{
                flexGrow: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 15,
                paddingVertical: 20,
                borderRadius: showMenu ? 15 : 0,
                // Transforming View...
                transform: [
                { scale: scaleValue },
                { translateX: offsetValue }
                ]
            }}>

              {/* Default header (Not used) */}
             <Stack.Screen 
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerShown: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' 
                        // handlePress={() => drawer.current.openDrawer()}
                        />
                    ),
                    headerRight: () => (

                        <ScreenHeaderBtn iconUrl={{uri: checkImageURL(user?.photoURL) ? user?.photoURL : "https://internwisecouk.s3.eu-west-2.amazonaws.com/all_uploads/default_company.png"}} dimension='100%' username={'Name'} handlePress={goToProfile}/>
                        
                    ),
                    headerTitle: " ",
                }}
             />

            {/* Custom Header */}
             <View 
              style={{
                // backgroundColor: 'gray',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: SIZES.small

              }}
             >
              <Animated.View>
                <ScreenHeaderBtn iconUrl={showMenu ? icons.chevronLeft : icons.menu} dimension='60%' 
                    handlePress={slideAnimation}
                />
              </Animated.View>

              <ScreenHeaderBtn iconUrl={{uri: checkImageURL(user?.photoURL) ? user?.photoURL : "https://internwisecouk.s3.eu-west-2.amazonaws.com/all_uploads/default_company.png"}} dimension='100%' username={'Name'} handlePress={goToProfile}/>
             </View>


             {/* Body */}
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

                    {/* <Popularjobs/>
                    <Nearbyjobs/>     */}
                    {/* <TouchableOpacity onPress={handleLogout} style={{padding: 10, backgroundColor: COLORS.primary, width: 80, marginTop: 10, borderRadius: 50}}>
                        <Text style={{color: COLORS.white, textAlign: 'center'}}>Sign Out</Text>
                    </TouchableOpacity> */}
                </View>
             </ScrollView>

        </Animated.View>
        </SafeAreaView>
        // </DrawerLayoutAndroid>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    navigationContainer: {
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      padding: 16,
      fontSize: 15,
      textAlign: 'center',
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 300,
    },
  });

export default Home;
