
import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES,FONT } from "../../constants";

const styles = StyleSheet.create({
    //Activity Indicator
    loading:{
        position: 'absolute',
        zIndex: 99999,
      //   width: 100,
      //   height: 100,
        top: '50%',
        left: '50%',
        // transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'transparent'
      }, 

    popupCardContainer:{
        width: "85%",
        position: 'relative',
    },  

    //Modal
    popupOverlay:{
     
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center' 
    },
    popupCard:{
      
      width: '100%',
      aspectRatio: .8,
      backgroundColor: 'white',
      borderRadius: SIZES.medium,
      // height: 250,
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
      padding: SIZES.xLarge,
      justifyContent: 'space-between',
      alignItems: 'center'
      // margin:SIZES.large,
    },
    popupImg:{
      width: "100%",
      height: "100%",
    },
    popupImgContainer:{
      width: "40%",
      aspectRatio: 1,
      position: 'relative',
      // backgroundColor: 'black',
      borderRadius: SIZES.medium,
      overflow: 'hidden',
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
      width: "100%"
     
    },
    borderStyle: (state, length)=>({
      borderWidth: length ? 2 : 0,
      borderColor: state ? 'lightgreen' : 'red'

    }), 
    feild: {
      // backgroundColor: COLORS.secondary
      width: '100%'
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
    //Warning
    warningText: {
      color: 'red',
      textAlign: 'center'
    },
    warningBtn: {
      backgroundColor: '#f44336',
    },
    warningBtnTxt: {
      color: 'black'
    }
    
})

export default styles