import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './basicCard.style'

const BasicCard = ({iconUrl, text, handleClick}) => {
  return (
    <TouchableOpacity 
     style={styles.container}
     onPress={handleClick}
    >
        <View style={styles.logoContainer}>
        <Image 
          source={iconUrl}
          resizeMode='contain'
          style={
            styles.logoImage
          }
        />
      </View>
        <Text style={styles.jobName}>{text}</Text>
    </TouchableOpacity>
  )
}

export default BasicCard