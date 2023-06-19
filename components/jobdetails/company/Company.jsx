import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './company.style'
import { icons } from '../../../constants'
import { checkImageURL } from '../../../utils'

const Company = ({companyLogo, companyName, jobTitle, location}) => {
  return (
    <View style={styles.container}>
       <View style={styles.logoBox}>
        <Image 
          source={{
            uri: checkImageURL(companyLogo) ? companyLogo :  "https://internwisecouk.s3.eu-west-2.amazonaws.com/all_uploads/default_company.png"
            }}
          style={styles.logoImage}
          resizeMode='contain'  
        />
       </View>
       
       <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
       </View>

       <View style={styles.companyInfoBox}>
          <Text style={styles.companyName}>{companyName} / </Text>
          <View style={styles.locationBox}>
            <Image 
              source={icons.location}
              resizeMode='contain'
              style={styles.locationImage }
            />
            <Text style={styles.locationName}>{location}</Text>
          </View>
       </View>
    </View>
  )
}

export default Company