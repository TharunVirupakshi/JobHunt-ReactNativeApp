import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native'
import { SIZES , COLORS, FONT} from '../../../constants'
import { checkImageURL } from '../../../utils'

const Sidebar = ({userPhoto, userName, appRoutes}) => {

  const {goToSavedJobs} = appRoutes;

  return (
    <SafeAreaView style={{
        flex: 1,
        paddingVertical: SIZES.xSmall
        }}>
      <View style={styles.sidebarContainer}>

        {/* Profile Image */}
       
    

          <TouchableOpacity style={styles.imageContainer}>
            <Image 
                source={{uri: checkImageURL(userPhoto) ? userPhoto : "https://internwisecouk.s3.eu-west-2.amazonaws.com/all_uploads/default_company.png"}}
                resizeMode='cover'
                style={
                  styles.profileImage
                }
              />
          </TouchableOpacity>
  

        <Text style={styles.profileName}>
          {userName ? userName : 'Name'}
        </Text>


        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.btn} onPress={()=>goToSavedJobs()}>
            <Text style={styles.btnTxt}>
              Saved Jobs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>
              Interviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>
              Your Skills
            </Text>
          </TouchableOpacity>
        </View>
      </View>  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  //Sidebar Container

  sidebarContainer:{
    // backgroundColor: 'white',
    padding: SIZES.xxLarge
  },

  //Profile Image
  profileImage: {
    height: "100%",
    width: "100%",
    borderRadius: SIZES.medium,

    
  },
  imageContainer: {
    width: 110,
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },

  profileName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: 'white',
    paddingVertical: SIZES.xSmall
  },

  //Tabs
  btn:{
    paddingVertical: 8
  },  
  btnTxt:{
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.large
  },
  buttonsContainer:{
    paddingVertical: SIZES.small
  }

})

export default Sidebar
