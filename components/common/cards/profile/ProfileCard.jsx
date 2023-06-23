import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import{COLORS, icons, SIZES, SHADOWS, images, FONT} from '../../../../constants'
import { checkImageURL } from '../../../../utils'

const ProfileCard = () => {
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
        <Text style={styles.profileName}>Alex Mark</Text>
        <Text style={styles.subText}>Designer</Text>
        <Text style={styles.subText2}>alexmark@mail.com</Text>
      </View>
    </View>

    <View style={styles.addtionalDetails}>
      <Text style={styles.subText}>Bio:</Text>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
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
    height: 250,
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
  }

})