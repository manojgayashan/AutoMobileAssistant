import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../shared/styles';
import colors from '../shared/colors';

export default function SettingTitle({
    title,
    icon
}) {
  return (
    <View style={styles.settingsTitleView}>        
        {icon?<FontAwesome name={icon} size={15} color={colors.primary_black_100} />:null}
      <Text style={[styles.h1,{marginLeft:icon?10:0}]}>{title}</Text>
    </View>
  )
}