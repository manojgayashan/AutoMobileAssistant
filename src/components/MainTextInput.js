import { View, Text , TextInput,Dimensions} from 'react-native'
import React from 'react'
import styles from '../shared/styles'
import * as Animatable from 'react-native-animatable';
import colors from '../shared/colors';

const windowWidth = Dimensions.get('window').width;

export default function MainTextInput({
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    leftIcon,
    rightIcon,
    error
}) {
  return (
    <Animatable.View animation={error?"shake":null} style={[styles.input,{borderColor:error?colors.primary_red_100:colors.primary_black_300}]}>
      <TextInput  
    value={value}
    onChangeText={onChangeText}
    style={[styles.textInput,{width:rightIcon?windowWidth-80:windowWidth-30}]}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
/>  
{
    rightIcon?rightIcon:null
}
    </Animatable.View>

  )
}