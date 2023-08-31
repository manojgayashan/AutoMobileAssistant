import { View, Text } from 'react-native'
import React from 'react'
import styles from '../shared/styles'
import LottieView from 'lottie-react-native';

export default function LoadingScreen({
  show
}) {
  return (
    show==true?
    <View style={styles.loadingContainer}>
      {/* <Text>loading</Text> */}
      <LottieView source={require('../assets/animations/white_loading_screen.json')} autoPlay loop style={{zIndex:11,width:150,height:150}}/>
    </View>
    : 
    null
  )
}