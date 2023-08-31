import { View, Text } from 'react-native'
import React from 'react'
import styles from '../shared/styles'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import MainButton from '../components/MainButton'

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <Header
                headerImage={require('../assets/images/welcome.png')}
                title={i18n.t('welcome.title')}
                subtitle={i18n.t('welcome.subtitle')}
                // leftIcon={'arrowleft'}
                // leftIconOnpress={() => navigation.goBack()}
            />
            <Footer />
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                <Text style={[styles.normalText,{textAlign:'center',marginBottom:10,paddingHorizontal:30,lineHeight:22}]}>{i18n.t('welcome.text')}</Text>
                <MainButton
                    accent='blue'
                    title={i18n.t('welcome.button')}
                    onPress={() => {navigation.navigate('Drawer')}}
                    buttonType='rectangle-round'
                    width={'100%'}
                />
            </View>
            </View>
        </View>
    )
}