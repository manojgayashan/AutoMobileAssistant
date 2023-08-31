import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import styles from '../shared/styles'
import { Image } from 'react-native-animatable'
import { session } from '../shared/sessions'
import { useNavigation } from '@react-navigation/native'

export default function Splash() {

    const navigation = useNavigation()

    useEffect(() => {
        session(['user','onboading']).then((response) => {
            console.log(response.onboading)
            if (response.user!=null) {
                navigation.navigate('Drawer')
            }
            else {
                if(response.onboading!='true'){
                    navigation.navigate('Onboarding')
                }
                else{
                    navigation.navigate('LanguageSelect')
                }
                
            }
        })
        // .then(()=>{SplashScreen.hide()})
    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.centeredView}>
                {/* <Image style={styles.mediumImage} source={require('../assets/images/drawerIcon.png')} /> */}
            </View>
        </View>
    )
}