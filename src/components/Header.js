import { View, Text,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../shared/styles'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../shared/colors';
import * as Animatable from 'react-native-animatable';

export default function Header({
    title,
    subtitle,
    headerImage,
    leftIcon,
    leftIconOnpress,
    rightIcon,
    rightIconOnpress,
    elevation,
    zindex
}) {
  return (
    <View style={[styles.header,elevation?styles.elevationView:null,{zIndex:zindex?null:2}]}>
      <View style={styles.row}>
        {
      leftIcon?
      <TouchableOpacity onPress={leftIconOnpress}>
        <AntDesign name={leftIcon} size={22} color={colors.primary_black_100} />
      </TouchableOpacity>
      :
      <View style={{height:22,width:22,backgroundColor:colors.primary_white_100}} />
    }
    
    {
      rightIcon?
      <TouchableOpacity onPress={rightIconOnpress}>
        <AntDesign name={rightIcon} size={22} color={colors.primary_black_100} />
      </TouchableOpacity>
      :
      <View style={{height:22,width:22,backgroundColor:colors.primary_white_100}} />
    }
      </View>
    
      {title?<Animatable.Text animation={'fadeIn'} style={styles.headerTitle}>{title}</Animatable.Text>:null}
      {subtitle?<Animatable.Text animation={'fadeIn'} style={styles.headerSubTitle}>{subtitle}</Animatable.Text>:null}
        {
            headerImage?<Animatable.Image animation={'zoomIn'} source={headerImage} style={styles.headerImage} /> :null
        }
    </View>
  )
}