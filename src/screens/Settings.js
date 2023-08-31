import { View, Text,ScrollView } from 'react-native'
import React ,{useState,useContext,useEffect} from 'react'
import styles from '../shared/styles'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native';
import MainButton from '../components/MainButton';
import en from '../../localization/en.json';
import si from '../../localization/si.json';
import i18n from 'i18n-js';
import { AMAContext } from '../context/AMAContext';
import { session } from '../shared/sessions';
import AccordianList from '../components/AccordianList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SettingTitle from '../components/SettingTitle';

export default function Settings() {  

  const context = useContext(AMAContext)
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false)

  const [lang, setLang] = useState(context.language);
  const [key, setKey] = useState(1);


    useEffect(() => {
      session("language").then((lang)=>setLang(lang))      
    }, [])

  const changeLanguage = async (value) => {
    session("language",value)
    setKey(key + 1)
    setLang(value)
    context.setLanguage(value)

}
  
  i18n.locale = context.language;
  i18n.fallbacks = true;
  i18n.translations = { en, si };

  const toggleMenu =()=>{
    // setToggle(!toggle)
    navigation.toggleDrawer()
  }
  return (
    <View style={styles.mainContainer}>
      <Header title={i18n.t('settings.title')} leftIcon={'menuunfold'} leftIconOnpress={()=>navigation.toggleDrawer()}/>
      <ScrollView contentContainerStyle={{padding:15}}>

        {/* <MainButton 
        accent='white'
        title="Language"
        // onPress={()=>navigation.navigate('LanguageSelect')}
        /> */}
        <SettingTitle 
        title={i18n.t('settings.menu1')}
        icon={'user-circle-o'}
        />
        <AccordianList 
        title={i18n.t('settings.menu1Title')}
        expand={false}
        expandContent={
          <View>
            
        <MainButton
        accent='white'
        title='English'
        onPress={()=>changeLanguage('en')}
        buttonType='rectangle-round'
        image={require('../assets/images/en.png')}
        selected={lang=='en'}
        width="100%"
        >
        </MainButton>
        
        <MainButton
        accent='white'
        title='සිංහල'
        onPress={()=>changeLanguage('si')}
        buttonType='rectangle-round'
        image={require('../assets/images/si.png')}
        selected={lang=='si'}
        width="100%">
        </MainButton>
          </View>
      }
        />
        
        {/* <AccordianList 
        title={'Language'}
        expand={false}
        expandContent={
          <View>
            
        <MainButton
        accent='white'
        title='English'
        onPress={()=>changeLanguage('en')}
        buttonType='rectangle-round'
        image={require('../assets/images/en.png')}
        selected={lang=='en'}
        width="100%"
        >
        </MainButton>
        
        <MainButton
        accent='white'
        title='සිංහල'
        onPress={()=>changeLanguage('si')}
        buttonType='rectangle-round'
        image={require('../assets/images/si.png')}
        selected={lang=='si'}
        width="100%">
        </MainButton>
          </View>
      }
        /> */}

      </ScrollView>
      {/* <Text>Settings</Text> */}
    </View>
  )
}