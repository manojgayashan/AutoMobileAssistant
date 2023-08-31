import { View, Text,TouchableHighlight,StyleSheet,Dimensions, TouchableOpacity,Image } from 'react-native'
import React ,{useRef, useState} from 'react'
import Swipeable from 'react-native-swipeable';
import colors from '../shared/colors';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;

type PropsTypes = {
  title: string;
  subtitle: string;
  onPress:any;
  onRightButtonPress:any;
  onRightButton2Press:any;
  isVehicle:boolean;
  image:any;
  title2:string;
  title3:string;
  icon:string;
  righticon:string;
  righticon2:string;
  bottomicon:string;
};

export default function SwipeableButton(props: PropsTypes) {
  
    const leftContent = <Text>Pull to activate</Text>;
 
    const ref = useRef()
    
  const [margin, setMargin] = useState(-10)

    const styles = StyleSheet.create({
      buttonView: {
          backgroundColor: colors.primary_white_100,
          borderWidth: 1,
          borderColor: colors.primary_black_400 ,
          borderRadius: 5,
          width: windowWidth-30,
          // height:50,
          // paddingHorizontal: props.title?15:10,
          // paddingVertical:10,
          alignItems: 'center',
          marginVertical:2.5,
          // marginHorizontal:15,
          flexDirection:'row',
          // zIndex:5,
          justifyContent:'space-between'
      },
      disabledButtonView: {
          backgroundColor: colors.primary_black_300,
          borderWidth: 1,
          borderColor: colors.primary_black_300,
          borderRadius: 5,
          width: windowWidth-30,
          paddingHorizontal: props.title?15:10,
          paddingVertical:10,
          alignItems: 'center',
          marginVertical:2.5,
          flexDirection:'row',
          zIndex:5
          // justifyContent:'center'
      },
      buttonText: {
          color: colors.primary_black_200,
          fontSize: 18,
          fontWeight: '600',
          marginLeft:0,
          // textAlign:props.image?'left':'center',
          textAlign:'left',
          padding:2,
          fontFamily:'LicensePlate'
      },
      normalButtonText: {
          color: colors.primary_black_200,
          fontSize: 18,
          fontWeight: '600',
          marginLeft:0,
          // textAlign:props.image?'left':'center',
          textAlign:'left',
          padding:10,
      },
      icon:{
          width:25,
          height:25
      },
      bigicon:{
          width:60,
          height:50,
          objectFit:'contain',
          zIndex:1
      },
      deleteButton:{
        // backgroundColor:props.righticon=='trash'?colors.primary_red_100:props.righticon2=='trash'?colors.primary_red_100:colors.primary_blue,
        paddingHorizontal:15,
        flex:1,
        justifyContent:'center',
        borderRadius:5,
        margin:2.5,
        // alignItems:'center'
        // marginTop:-10,
        // paddingVertical:10
      },
      numberPlate:{
        borderWidth:2,
        borderColor:colors.primary_black_200,
        padding:3,
        // backgroundColor:'red',
        width:90,
        margin:10,
        marginLeft:15,
        borderRadius:5,
        flexDirection:'row'
      },
      silverDot:{
        width:5,
        height:5,
        marginHorizontal:3,
        backgroundColor:colors.primary_black_300,
        borderRadius:5
      },
      dateText:{
        fontSize:12,
        color:colors.primary_blue,
        paddingLeft:10,
        paddingBottom:10
      },
      row:{
        flexDirection:'row',
        justifyContent:'center',
        aliginItems:'center'
      }
  })
  
  const rightButtons = [
    <TouchableHighlight onPress={props.onRightButtonPress} onPressIn={()=>ref.current.recenter()} style={[styles.deleteButton,{backgroundColor:props.righticon=='trash'?colors.primary_red_100:colors.primary_blue}]}><Feather name={props.righticon} size={20} color={colors.primary_white_100} /></TouchableHighlight>
  ];
  const rightButtons2 = [
    <TouchableHighlight onPress={props.onRightButtonPress} onPressIn={()=>ref.current.recenter()} style={[styles.deleteButton,{backgroundColor:props.righticon=='trash'?colors.primary_red_100:colors.primary_blue}]}><Feather name={props.righticon} size={20} color={colors.primary_white_100} /></TouchableHighlight>,
    <TouchableHighlight onPress={props.onRightButton2Press} onPressIn={()=>ref.current.recenter()} style={[styles.deleteButton,{backgroundColor:props.righticon2=='trash'?colors.primary_red_100:colors.primary_blue,borderRadius:0}]}><Feather name={props.righticon2} size={20} color={colors.primary_white_100} /></TouchableHighlight>
  ];

  return (
    <Swipeable 
    ref={ref}
    onRightButtonsOpenRelease={()=>setMargin(5)}
    onRightButtonsCloseRelease={()=>setMargin(-10)}
    rightButtons={props.righticon2?rightButtons2:rightButtons}>
        <TouchableOpacity onPress={props.onPress} style={styles.buttonView} >
        {
          props.isVehicle?
          
        <View style={styles.numberPlate}>
        <Image source={require('../assets/images/lk.png')} style={{width:5,height:7,objectFit:'contain'}} />
        <View style={styles.silverDot}/>
        <Text style={styles.buttonText}>{props.title}</Text>
        </View>
        :
        null
        // <Text style={styles.normalButtonText}>{props.title}</Text>
        }
        {props.title2?<Text style={styles.normalButtonText}>{props.title2}</Text>:null} 
        <View>
        
        {props.title3?<Text style={styles.normalButtonText}>{props.title3}</Text>:null}
        {
          props.image?<Animatable.Image animation={'lightSpeedIn'} duration={600} source={props.image} style={{width:70,height:60,objectFit:'contain',marginRight:margin}} />:null
        }
        <View style={styles.row}>
          {props.subtitle?<Text style={[styles.dateText,{marginRight:10}]}>{props.subtitle}</Text>:null} 
          {props.bottomicon?<Feather name={props.bottomicon} size={14} color={colors.primary_blue} />:null} 
        </View>
        
        </View>
        </TouchableOpacity>
    </Swipeable>
  )
}