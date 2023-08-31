import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import colors from '../shared/colors';
import styles from '../shared/styles';

export default function FloatingButton({
    text,
    icon,
    onPress
}) {
  return (
    <TouchableOpacity style={[styles.floatingButtonView,styles.elevationView]} onPress={onPress}>
        {icon?<Feather name={icon} size={15} color={colors.primary_blue} />:null}
      <Text style={[styles.floatingButtonText,{marginLeft:icon?7:0}]}>{text}</Text>
    </TouchableOpacity>
  )
}