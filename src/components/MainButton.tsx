import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import colors from '../shared/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type accentType = 'blue' | 'green' | 'red' | 'white'| 'black';
type buttonTypesType = 'rectangle-round' | 'round' | 'rectangle';

type PropsTypes = {
    title: string;
    accent: accentType;
    onPress: any;
    icon:any;
    image:any;
    bigImage:any;
    disabled:boolean;
    selected:boolean;
    width:number;
    buttonType:buttonTypesType
};

export default function MainButton(props: PropsTypes) {

    const accentColor =
        props.accent == 'blue' ? colors.primary_blue :
            props.accent == 'green' ? colors.primary_green_100 :
                props.accent == 'red' ? colors.primary_red_100 :
                props.accent == 'white' ? colors.primary_white_100 :
                    colors.primary_black_500

    const borderColor =
        props.accent == 'blue' ? colors.primary_blue :
            props.accent == 'green' ? colors.primary_green_100 :
                props.accent == 'red' ? colors.primary_red_100 :
                props.accent == 'white' ? colors.primary_black_400 :
                    colors.primary_black_100

    const textColor =
        props.accent == 'white' ? colors.primary_black_100 :
            colors.primary_white_100

    const buttonWidth = 
        props.width? props.width:(windowWidth)-30

    const buttonRadius =
        props.buttonType == 'rectangle-round'?5:
        props.buttonType == 'round'?50:
            0
    const styles = StyleSheet.create({
        buttonView: {
            backgroundColor: props.selected?colors.primary_blue:accentColor,
            borderWidth: 1,
            borderColor: borderColor,
            borderRadius: buttonRadius,
            width: buttonWidth,
            paddingHorizontal: props.bigImage?0:props.title?15:10,
            paddingVertical:props.bigImage?0:10,
            alignItems: 'center',
            marginVertical:5,
            flexDirection:'row',
            zIndex:5,
            justifyContent:props.bigImage?'space-between':'flex-start'
        },
        disabledButtonView: {
            backgroundColor: colors.primary_black_300,
            borderWidth: 1,
            borderColor: colors.primary_black_300,
            borderRadius: buttonRadius,
            width: buttonWidth,
            paddingHorizontal: props.title?15:10,
            paddingVertical:10,
            alignItems: 'center',
            marginVertical:5,
            flexDirection:'row',
            zIndex:5
            // justifyContent:'center'
        },
        buttonText: {
            color: props.disabled?colors.primary_white_100:props.selected?colors.primary_white_100:textColor,
            fontSize: 14,
            fontWeight: '600',
            marginLeft:props.image?10:props.bigImage?15:0,
            // textAlign:props.image?'left':'center',
            textAlign:'center'
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
        
    })

    
    return (
        <TouchableOpacity disabled={props.disabled} style={props.disabled?styles.disabledButtonView:styles.buttonView} onPress={props.onPress}>
            {
                props.image?
                <Image source={props.image} style={styles.icon} />:
                null
            }
            {props.title?<Text style={styles.buttonText}>{props.title}</Text>:null}
            {props.icon?<AntDesign name={props.icon} size={22} color={textColor} />:null}
            {
                props.bigImage?
                <Image source={props.bigImage} style={styles.bigicon} />:
                null
            }
        </TouchableOpacity>
    )
}
