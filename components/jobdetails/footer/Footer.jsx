import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'
import { openURL } from 'expo-linking'
import { addFavoriteItem, fetchFavoriteItems } from '../../../firebase'
import { useAuth } from '../../../context/auth'
import { updateDoc } from 'firebase/firestore'

const Footer = ({url, id}) => {
  console.log("Job id in footer: ",id)
  const [state, setState] = useState(false)
  const [favs, setFavs] = useState([])
  const handlePress = () =>{
     addToFav();
     setState(!state)
  }
 


  
  const {user} = useAuth()
  const fetchFav = async()=>{
    console.log("Saved-jobs:",await fetchFavoriteItems(user?.uid))
    const list = await fetchFavoriteItems(user?.uid)
    if(list.includes(id))
      setState(true)
    else
      setState(false)
  }

  const updateState = async()=>{
    const list = await fetchFavoriteItems(user?.uid)
    if(list.includes(id))
      setState(true)
    else
      setState(false) 
  }
   
  useEffect(() => {
    fetchFav()
  }, [state]);

  const addToFav = () =>{
    addFavoriteItem(user?.uid, id)
    console.log("User Saved jobs: ", fetchFav())

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn(state)} onPress={handlePress} >
        <Image 
          source={state ? icons.heart : icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage(state)}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyBtn} onPress={()=> Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer