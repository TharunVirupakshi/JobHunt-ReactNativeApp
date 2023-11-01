import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput, Alert, Modal, ActivityIndicator } from 'react-native'
import {useState, useEffect} from 'react'
import{COLORS, icons, SIZES, SHADOWS, images, FONT} from '../../../../constants'
import { checkImageURL } from '../../../../utils'
import {Formik} from "formik"
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../../../firebase'





const ProfileCard = ({name, email, info, onSave, userPhoto, setRefreshing}) => {

  const [userInfo, setUserInfo] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isImageEdit, setIsImageEdit] = useState(false)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [loading, setLoading] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false)
  

  useEffect(() => {
    setUserInfo(info)
    // console.log('Photo Url (ProfileCard):',userPhoto)
    // console.log("User info in card: ",info)
  }, [info])
  
  const handleEdit = () => {
    if(!isEdit) setIsEdit(true)
    else        setIsEdit(false)
  }

  const createTwoButtonAlert = (title, msg, btnText1, btnText2, arg) =>{
    Alert.alert(title,msg, [
      {
        text: btnText1,
        onPress: async() => {
          onSave({photoUrl: arg})
        },
      },
      {text: btnText2, 
        onPress: () => {return false}
      },
      
    ]
    );
  }

  
  const uploadPhoto = async () => {
    try {
      setIsImageEdit(true)
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library denied');
        return;
      }
  
      let imagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.6,
      });

      if(!imagePickerResult.canceled){
        setPhotoUrl(imagePickerResult.assets[0].uri)
        // console.log('Image Picker (ProfileCard):',photoUrl)
        // createTwoButtonAlert('Upload Photo?',null,'Upload','Discard',imagePickerResult.assets[0].uri)
        setModalVisible(true)
        console.log(imagePickerResult.assets[0].uri)
      }else{
        setPhotoUrl(null)
        setModalVisible(false)
      }
    
    } catch (error) {
      console.error('Error Selecting photo (ProfileCard):', error);
      alert("Error uploading:")
    } finally {
      setIsImageEdit(false)
    }
  };
  

  
  return (<>
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        statusBarTranslucent={true}
      >
      <View style={styles.popupOverlay}>
        
        <View style={styles.popupCard}>
          <View style={styles.popupImgContainer}>
            <Image
              source={{uri: photoUrl}}
              resizeMode='cover'
              style={styles.popupImg}
            />
            {loading && 
            <ActivityIndicator 
              size="large" color={COLORS.white} 
              style={styles.loading}/>}
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity 
                onPress={
                  async () => {
                    try {
                      setLoading(true)
                      await onSave({ photoUrl: photoUrl });
                    } catch (error) {
                      // Handle the error here or log it for debugging purposes
                      console.error("Error in onSave:", error);
                    } finally{
                      setLoading(false)
                    }
                  }} 
                style={styles.btn}>
                <Text style={styles.btnTxt}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setModalVisible(!modalVisible)
              }} 
              style={[styles.btn, styles.btn2]} >
                <Text style={[styles.btnTxt2]}>Cancel</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
      </Modal>
    <View style={styles.cardContainer}>
    <View style={styles.shortDetailsContainer}>
    
      <TouchableOpacity style={styles.imageContainer} onPress={uploadPhoto}>
        <Image 
            source={checkImageURL(userPhoto) ? {uri : userPhoto} : images.profilePic}
            resizeMode='cover'
            style={
              styles.profileImage
            }
          />
      </TouchableOpacity>
      {!isEdit ? ( 
        <View style={styles.shortDetails}>
        <Text style={styles.profileName}>{name? name : 'No Name'}</Text>
        <Text style={styles.subText} >{userInfo?.role? userInfo.role : 'Add Role'}</Text>
        <Text style={styles.subText2}>{email?email: 'N/A'}</Text>
      </View>) : (
        <View style={styles.shortDetails}>
          <Text style={styles.profileName}>Edit Profile</Text>
      </View>
      )}
      
      <TouchableOpacity style={styles.editIconWrapper} onPress={handleEdit}>
            <Image 
              source={icons.edit2}
              resizeMode='contain'
              style={styles.editIcon }
            />
      </TouchableOpacity>      

    </View>
    {!isEdit ? ( <View style={styles.addtionalDetails}>
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
     
    </View>) : (

      //EDIT FORM
      <Formik
        initialValues={{
          name: name,
          bio: userInfo?.bio, 
          role: userInfo?.role, 
          location: userInfo?.location,
        }}

        onSubmit={(values) => {
          if(photoUrl)  values.photoUrl = photoUrl
          console.log('Formik',values)
          onSave(values)
        }}
      >
        {(props)=>(
          <>
            
            <View style={styles.feild}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                />
              </View>
            </View>

            <View style={styles.feild}>
              <Text style={styles.label}>Bio:</Text>
              <View style={[styles.inputWrapper,{height: 150}]}>
                <TextInput
                  style={[styles.input, {textAlignVertical: 'top', paddingTop: SIZES.medium}]}
                  placeholder="Enter your bio"
                  onChangeText={props.handleChange('bio')}
                  value={props.values.bio}
                  numberOfLines={4}
                  multiline
                />
              </View>
            </View>

            <View style={styles.feild}>
              <Text style={styles.label}>Role</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your role"
                  onChangeText={props.handleChange('role')}
                  value={props.values.role}
                />
              </View>
            </View>

           
            <View style={styles.feild}>
              <Text style={styles.label}>Location</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your location"
                  onChangeText={props.handleChange('location')}
                  value={props.values.location}
                />
              </View>
            </View>

            <View style={styles.btnsContainer}>
                    <TouchableOpacity onPress={props.handleSubmit} style={styles.btn}>
                        <Text style={styles.btnTxt}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEdit} style={[styles.btn, styles.btn2]} >
                        <Text style={[styles.btnTxt2]}>Discard</Text>
                    </TouchableOpacity>
                </View> 

           
          </>
        )}
      </Formik>
      )}
   
    </View>
    </>
  )
}

export default ProfileCard



const styles = StyleSheet.create({

  loading:{
    position: 'absolute',
    zIndex: 99999,
    width: 100,
    height: 100,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'transparent'
  },  
  popupOverlay:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center' 
  },
  popupCard:{
    width: '85%',
    aspectRatio: .8,
    backgroundColor: 'white',
    borderRadius: SIZES.medium,
    // height: 250,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    padding: SIZES.xLarge,
    justifyContent: 'space-between',
    // margin:SIZES.large,
  },
  popupImg:{
    width: "100%",
    height: "100%",
  },
  popupImgContainer:{
    width: "100%",
    aspectRatio: 1,
    // position: 'relative',
    // backgroundColor: 'black',
    borderRadius: SIZES.medium,
    overflow: 'hidden',
  },
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
    // flexWrap: 'wrap'
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
    flex: 1,
    height: 100,
    // width: 200,
    // alignItems: 'center',
    // backgroundColor: 'blue',
    justifyContent: 'center',

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
    alignItems: 'flex-end'
  },
  editIcon: {
    height: 20,
    width: 20
  },
  input: {
    fontFamily: FONT.medium,
    width: "100%",
    height: '100%',
    paddingHorizontal: SIZES.medium,
  },
  inputWrapper: {
    backgroundColor: COLORS.white,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
   
  },
  feild: {
    // backgroundColor: COLORS.secondary
  },
  label:{
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    fontFamily: FONT.bold,
  },
  btn: {
    // margin: SIZES.small,
    // marginTop: 5,
    flex: 1,
    height: 50,
    backgroundColor: 'black',
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    backgroundColor: 'lightgray',
    borderWidth: .7,
    borderColor: COLORS.white,
  },
  btnTxt:{ 
    textAlign: 'center' , 
    color: COLORS.white,
    fontFamily: FONT.bold
    },
  btnTxt2:{ 
  textAlign: 'center' , 
  color: 'black',
  fontFamily: FONT.bold
  }, 

  btnsContainer: {
    // backgroundColor: 'blue',
    gap: SIZES.xSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    // margin: SIZES.small,
  },

})