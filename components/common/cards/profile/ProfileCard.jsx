import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {useState, useEffect} from 'react'
import{COLORS, icons, SIZES, SHADOWS, images, FONT} from '../../../../constants'
import { checkImageURL } from '../../../../utils'



const ProfileCard = ({name, email, info}) => {

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    setUserInfo(info)
    console.log("User info in card: ",info)
  }, [info])
  


  return (
    <View style={styles.cardContainer}>
    <View style={styles.shortDetailsContainer}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image 
            // source={{uri: checkImageURL() ? item.employer_logo : "https://internwisecouk.s3.eu-west-2.amazonaws.com/all_uploads/default_company.png"}}
            source={images.profile}
            resizeMode='cover'
            style={
              styles.profileImage
            }
          />
      </TouchableOpacity>

      <View style={styles.shortDetails}>
        <Text style={styles.profileName}>{name? name : 'No Name'}</Text>
        <Text style={styles.subText}>{userInfo?.role? userInfo.role : 'Add Role'}</Text>
        <Text style={styles.subText2}>{email?email: 'N/A'}</Text>
      </View>
      <TouchableOpacity style={styles.editIconWrapper}>
            <Image 
              source={icons.edit2}
              resizeMode='contain'
              style={styles.editIcon }
            />
      </TouchableOpacity>      

    </View>

    <View style={styles.addtionalDetails}>
      <Text style={styles.subText}>Bio:</Text>
      <Text numberOfLines={2}>{userInfo?.bio? userInfo.bio : 'Add bio...'}</Text>
      <View style={styles.locationBox}>
            <Image 
              source={icons.location}
              resizeMode='contain'
              style={styles.locationImage }
            />
            <Text style={styles.locationName}>{userInfo?.location? userInfo.location : 'N/A'}</Text>
      </View>
    </View>
    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  cardContainer: {
  
    gap: SIZES.medium,
    backgroundColor: 'white',
    borderRadius: SIZES.medium,
    // height: 250,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    padding: SIZES.xLarge,
  },
  shortDetailsContainer:{
    flexDirection: 'row',
    gap: SIZES.medium,
    // backgroundColor: 'blue'
  },
  profileImage: {
    height: "100%",
    width: "100%",
    borderRadius: SIZES.medium,
  },
  profileName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
  },
  subText:{
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
  subText2:{
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular, 
  },
  shortDetails: {
    height: 100,
    // alignItems: 'center',
    // backgroundColor: 'blue',
    justifyContent: 'center'
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  locationBox: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: 'flex-end',
    // backgroundColor: 'blue',
    paddingTop: SIZES.small

  },
  locationImage: {
    width: 14,
    height: 14,
    marginLeft: -2,
    tintColor: COLORS.gray,
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginLeft: 2,
  },
  editIconWrapper: {
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'flex-end'
  },
  editIcon: {
    height: 20,
    width: 20
  }

})