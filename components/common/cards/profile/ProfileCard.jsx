import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native'
import {useState, useEffect} from 'react'
import{COLORS, icons, SIZES, SHADOWS, images, FONT} from '../../../../constants'
import { checkImageURL } from '../../../../utils'
import {Formik} from "formik"



const ProfileCard = ({name, email, info, onSave}) => {

  const [userInfo, setUserInfo] = useState(null)
  const [isEdit, setIsEdit] = useState(false)



  useEffect(() => {
    setUserInfo(info)
    console.log("User info in card: ",info)
  }, [info])
  
  const handleEdit = () => {
    if(!isEdit) setIsEdit(true)
    else        setIsEdit(false)
  }
  


  
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
      {!isEdit ? ( 
        <View style={styles.shortDetails}>
        <Text style={styles.profileName}>{name? name : 'No Name'}</Text>
        <Text style={styles.subText}>{userInfo?.role? userInfo.role : 'Add Role'}</Text>
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
                    <TouchableOpacity onPress={handleEdit} style={[styles.btn]} >
                        <Text style={[styles.btnTxt]}>Discard</Text>
                    </TouchableOpacity>
                </View> 

           
          </>
        )}
      </Formik>
      )}
   
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
    backgroundColor: COLORS.gray,
    borderWidth: .7,
    borderColor: COLORS.white,
  },
  btnTxt:{ 
    textAlign: 'center' , 
    color: COLORS.white,
    fontFamily: FONT.bold
    },

  btnsContainer: {
    // backgroundColor: 'blue',
    gap: SIZES.xSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    margin: SIZES.small,
  },

})