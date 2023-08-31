import { View, Text, TouchableOpacity, Image,BackHandler } from 'react-native'
import React, { useContext, useState,useEffect } from 'react'
import i18n from 'i18n-js';

import { AMAContext } from '../context/AMAContext';
import { useNavigation } from '@react-navigation/native';

import en from '../../localization/en.json';
import si from '../../localization/si.json';
import { session } from '../shared/sessions';
import styles from '../shared/styles';
import MainButton from '../components/MainButton';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LanguageSelect() {
    
    const navigation = useNavigation();
    const context = useContext(AMAContext)
    const [lang, setLang] = useState('en');
    const [key, setKey] = useState(1);

    
    i18n.locale = context.language;
    i18n.fallbacks = true;
    i18n.translations = { en, si };

    const changeLanguage = async (value) => {
        session("language",value)
        setKey(key + 1)
        setLang(value)
        context.setLanguage(value)

    }

    useEffect(() => {
      session("language").then((lang)=>
      // console.log(lang)
      lang?setLang(lang):null
      // 
      )      
    }, [])
    
    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    }, [])
    
  return (
    <View style={styles.mainContainer}>
      <Header 
      headerImage={require('../assets/images/language.png')} 
      title={i18n.t('lang.title')} 
      subtitle={i18n.t('lang.subtitle')}
      />
      <View style={styles.container} key={key}>
        {/* <View style={styles.innerView}> */}
          <View>
        <MainButton
        accent='white'
        title='English'
        onPress={()=>changeLanguage('en')}
        buttonType='rectangle-round'
        image={require('../assets/images/en.png')}
        selected={lang=='en'}
        >
        </MainButton>
        
        <MainButton
        accent='white'
        title='සිංහල'
        onPress={()=>changeLanguage('si')}
        buttonType='rectangle-round'
        image={require('../assets/images/si.png')}
        selected={lang=='si'}>
        </MainButton>

          </View>

        {/* </View> */}
      <MainButton
      accent='blue'
      width={45}
      icon={'arrowright'}
      onPress={()=>{navigation.navigate('Login',{from:'LanguageSelect'})}}
      buttonType='round'
      />
      <Footer/>
      </View>
    </View>
  )
}