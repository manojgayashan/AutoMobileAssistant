import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import styles from '../shared/styles'
import colors from '../shared/colors'
import LottieView from 'lottie-react-native';

// export default function LogoScreen() {
//   return (
//     <View style={[styles.centeredView,{backgroundColor:colors.primary_white_100}]}>
//         <StatusBar barStyle={'light-content'}/>
//         <LottieView source={require('../assets/animations/mui_animation.json')} autoPlay loop={false} style={{zIndex:11,width:'100%',height:'100%'}}/>
//       {/* <Text>LogoScreen</Text> */}
//     </View>
//   )
// }
// import { View, Text } from 'react-native'
// import React from 'react'
// import styles from '../shared/styles'
// import LottieView from 'lottie-react-native';

export default function LogoScreen({
  show
}) {
  return (
    show==true?
    <View style={[styles.loadingContainer,{backgroundColor:colors.primary_white_100}]}>
        <StatusBar barStyle={'light-content'}/>
      {/* <Text>loading</Text> */}
      <LottieView source={require('../assets/animations/mui_animation.json')} autoPlay loop={false} style={{zIndex:11,width:'100%',height:'100%'}}/>
    </View>
    : 
    null
  )
}