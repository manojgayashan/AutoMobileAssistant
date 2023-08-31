import { View, TouchableOpacity,Text, Keyboard,ScrollView } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import styles from '../shared/styles'
import i18n from 'i18n-js';
import Header from '../components/Header';
import MainButton from '../components/MainButton';
import MainTextInput from '../components/MainTextInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../shared/colors';
import Footer from '../components/Footer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from '../components/Toast';
import { session } from '../shared/sessions';
import { AMAContext } from '../context/AMAContext';

export default function Login() {

    const navigation = useNavigation();
    const route = useRoute()
    const context = useContext(AMAContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHideassword] = useState(true)
    
    const [errorText, setErrorText] = useState('')
    const [toastText, setToastText] = useState('')
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [error4, setError4] = useState(false)

    const [loging, setLoging] = useState(false)
    
    const [key1, setKey1] = useState(1)
    const [key2, setKey2] = useState(1000)
    const [key3, setKey3] = useState(100000)
    const [key4, setKey4] = useState(100000000)

    const [showToast, setShowToast] = useState(false)

    const SignIn=()=>{ 
      Keyboard.dismiss()      
        setLoging(true)
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              // navigation.navigate('Home')
              setError2(false)
              setError3(false)
              setErrorText('')
              setKey4(key4+1)
              setToastText(i18n.t('login.loginsuccess'))
              setShowToast(true)
              setLoging(false)
              setTimeout(() => {
                navigation.navigate('Drawer')
              }, 1000);
              setEmail('')
              setPassword('')
              getUser(email)
            })            
            .catch(error => {
              setLoging(false)
              // setCreating(false)
              if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
              setError2(true)
              setError3(false)
              setKey1(key1+1)
              setErrorText(i18n.t('register.emailError'))
              }

              if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
              setError2(true)
              setError3(false)
              setKey1(key1+1)
              setErrorText(i18n.t('register.emailError2'))
              }
              if (error.code === 'auth/weak-password') {
              setError2(false)
              setError3(true)
              setKey2(key2+1)
              setErrorText(i18n.t('register.passwordError2'))
              }
              if (error.code === 'auth/user-not-found') {
              setError2(true)
              setError3(true)
              setKey2(key2+1)
              setKey1(key1+1)
              setKey4(key4+1)
              setToastText(i18n.t('login.loginerror1'))
              setErrorText(i18n.t('login.loginerror1'))
              setShowToast(true)
              }
              if (error.code === 'auth/wrong-password') {
              setError2(false)
              setError3(true)
              setKey2(key2+1)
              setKey1(key1+1)
              // setToastText(i18n.t('login.loginerror2'))
              setErrorText(i18n.t('login.loginerror2'))
              // setShowToast(true)
              }

              console.log(error.code);
          });

    }

    const getUser=(e)=>{
      firestore()
      .collection('Users')
      .where('email', '==', e)
      .get()
      .then(querySnapshot  => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          session("user",JSON.stringify(documentSnapshot.data()))
          context.setUser(documentSnapshot.data())
        });
      });
    }

    useEffect(() => {
      
    }, [])
    
  return (
    <View style={styles.mainContainer}>
      
      <Toast key={key4} error={error2 || error3} show={showToast} message={toastText}/>
    
    {
      route.params?.from == 'LanguageSelect'?
    <Header 
    headerImage={require('../assets/images/login.png')} 
    title={i18n.t('login.title')} 
    subtitle={i18n.t('login.subtitle')}    
    leftIcon={'arrowleft'}
    leftIconOnpress={()=>navigation.goBack()}
    />
    :    
    <Header 
    headerImage={require('../assets/images/login.png')} 
    title={i18n.t('login.title')} 
    subtitle={i18n.t('login.subtitle')}    
    />
  }
    <View style={styles.container}>
        <View style={{alignItems:'center'}}>
            
        <MainTextInput
            value={email}
            onChangeText={setEmail}
            placeholder={i18n.t('login.email')}
            error={error2}
            key={key1}
        />
        <MainTextInput
            value={password}
            onChangeText={setPassword}
            placeholder={i18n.t('login.password')}
            secureTextEntry={hidePassword}
            rightIcon={hidePassword?<TouchableOpacity onPress={()=>setHideassword(false)}><Feather name={'eye'} size={22} color={colors.primary_black_200} /></TouchableOpacity>:<TouchableOpacity  onPress={()=>setHideassword(true)}><Feather name={'eye-off'} size={22} color={colors.primary_black_200} /></TouchableOpacity>}
            error={error3}
            key={key2}
        />
        
        <Text style={styles.errorText}>{errorText}</Text>
      <MainButton
      accent='blue'
      title={i18n.t('login.button')}
      onPress={()=>{SignIn()}}
      buttonType='rectangle-round'
      width={'100%'}
      disabled={email == '' || password == '' || loging}
      />
      {/* <Text style={styles.mediumText}>{i18n.t('login.or')}</Text> */}
        </View>
        <View style={[styles.row,{marginTop:20}]}>
          <Text style={styles.normalText}>{i18n.t('login.register')}</Text>
          <TouchableOpacity style={{zIndex:5}} onPress={()=>{navigation.navigate('Register')}} >
            <Text style={[styles.normalText,{textDecorationLine:'underline'}]}>{i18n.t('login.register2')}</Text>
          </TouchableOpacity>
        </View>
      
        <Footer/>
    </View>
    </View>
  )
}