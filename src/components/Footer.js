import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native-animatable'
import styles from '../shared/styles'

export default function Footer() {
  return (
    <View style={styles.footerView}>
      <Image source={require('../assets/images/logo.png')} style={styles.footerImage}/>
    </View>
  )
}