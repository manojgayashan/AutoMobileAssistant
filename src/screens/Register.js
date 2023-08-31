import { View, TouchableOpacity, Text, Keyboard, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from '../shared/styles'
import i18n from 'i18n-js';
import Header from '../components/Header';
import MainButton from '../components/MainButton';
import MainTextInput from '../components/MainTextInput';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../shared/colors';
import Footer from '../components/Footer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from '../components/Toast';
import { session } from '../shared/sessions';
import { AMAContext } from '../context/AMAContext';

export default function Register() {
    const context = useContext(AMAContext)
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [hidePassword, setHidepassword] = useState(true)
    const [hideRePassword, setHideRepassword] = useState(true)
    
    const [errorText, setErrorText] = useState('')
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [error4, setError4] = useState(false)

    const [creating, setCreating] = useState(false)
    const [registered, setRegistered] = useState(false)
    
    const [showToast, setShowToast] = useState(false)

    const [key1, setKey1] = useState(1)
    const [key2, setKey2] = useState(1000)
    const [key3, setKey3] = useState(100000)
    const [key4, setKey4] = useState(100000000)

    const usersCollection = firestore().collection('Users');

    const SignUp = () => {
        Keyboard.dismiss()
        setCreating(true)
        // navigation.navigate('Home')
        if(password == repassword){
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                setError2(false)
                setError3(false)
                setError4(false)
                setErrorText('')
                console.log('User account created & signed in!');
                
                usersCollection.add({
                    name: name,
                    email: email,
                    password:password
                })
                .then((documentSnapshot ) => {
                    console.log('User added!');
                    setShowToast(true)
                    setKey4(key4+1)
                    setCreating(false)
                    getUser(email)
                    console.log(documentSnapshot.id )
                    usersCollection
                    .doc(documentSnapshot.id)
                    .update({
                        id: documentSnapshot.id
                    })
                    .then(()=>navigation.navigate('Welcome'))
                    // setTimeout(() => {
                    //     navigation.navigate('Welcome')
                    // }, 1000);
                });
            })
            .catch(error => {
                setCreating(false)
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                setError2(true)
                setError3(false)
                setError4(false)
                setKey1(key1+1)
                setErrorText(i18n.t('register.emailError'))
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                setError2(true)
                setError3(false)
                setError4(false)
                setKey1(key1+1)
                setErrorText(i18n.t('register.emailError2'))
                }
                if (error.code === 'auth/weak-password') {
                console.log('That email address is invalid!');
                setError2(false)
                setError3(true)
                setError4(false)
                setKey2(key2+1)
                setErrorText(i18n.t('register.passwordError2'))
                }

                console.log(error.code);
            });
            
        }
        else{
            setError2(false)
            setError3(true)
            setError4(true)
            setKey2(key2+1)            
            setKey3(key3+1)
            setErrorText(i18n.t('register.passwordError'))
            setCreating(false)

        }


        // usersCollection.get()
        //     .then(querySnapshot => {
        //         console.log('Total users: ', querySnapshot.size);

        //         querySnapshot.forEach(documentSnapshot => {
        //             console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        //         });
        //     });
    }

    const getUser=(e)=>{
        firestore()
        .collection('Users')
        .where('email', '==', e)
        .get()
        .then(querySnapshot  => {
          console.log('Total users: ', querySnapshot.size);
  
          querySnapshot.forEach(documentSnapshot => {
            // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            session("user",JSON.stringify(documentSnapshot.data()))
            context.setUser(documentSnapshot.data())
          });
        });
      }

    return (
        <View style={styles.mainContainer}>
            <Toast key={key4} show={showToast} message={i18n.t('register.success')}/>
            <Header
                headerImage={require('../assets/images/login.png')}
                title={i18n.t('register.title')}
                subtitle={i18n.t('register.subtitle')}
                leftIcon={'arrowleft'}
                leftIconOnpress={() => navigation.goBack()}
            />
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>

                    <MainTextInput
                        value={name}
                        onChangeText={setName}
                        placeholder={i18n.t('register.name')}
                        // error={error1}
                    />
                    <MainTextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder={i18n.t('register.email')}
                        error={error2}
                        key={key1}
                    />
                    <MainTextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder={i18n.t('register.password')}
                        secureTextEntry={hidePassword}
                        rightIcon={hidePassword ? <TouchableOpacity onPress={() => setHidepassword(false)}><Feather name={'eye'} size={22} color={colors.primary_black_200} /></TouchableOpacity> : <TouchableOpacity onPress={() => setHidepassword(true)}><Feather name={'eye-off'} size={22} color={colors.primary_black_200} /></TouchableOpacity>}
                        error={error3}
                        key={key2}
                    />
                    <MainTextInput
                        value={repassword}
                        onChangeText={setRePassword}
                        placeholder={i18n.t('register.repassword')}
                        secureTextEntry={hideRePassword}
                        rightIcon={hidePassword ? <TouchableOpacity onPress={() => setHideRepassword(false)}><Feather name={'eye'} size={22} color={colors.primary_black_200} /></TouchableOpacity> : <TouchableOpacity onPress={() => setHideRepassword(true)}><Feather name={'eye-off'} size={22} color={colors.primary_black_200} /></TouchableOpacity>}
                        error={error4}
                        key={key3}
                    />
                    <Text style={styles.errorText}>{errorText}</Text>
                    <MainButton
                        accent='blue'
                        title={creating?i18n.t('register.button2'):registered?i18n.t('register.button3'):i18n.t('register.button')}
                        onPress={() => { SignUp() }}
                        buttonType='rectangle-round'
                        width={'100%'}
                        disabled={email == '' || password == '' || name == '' || repassword == ''|| registered}
                    />
                    {/* {
                      registered?
                    <MainButton
                        accent='blue'
                        title={i18n.t('login.button')}
                        onPress={() => { navigation.navigate('Login')}}
                        buttonType='rectangle-round'
                        width={'100%'}
                    />  
                    :
                    null
                    } */}

                    {/* <Text style={styles.mediumText}>{i18n.t('login.or')}</Text> */}
                </View>
                {/* <View style={styles.row}>
          <Text style={styles.normalText}>{i18n.t('login.register')}</Text>
          <TouchableOpacity style={{zIndex:5}} onPress={()=>{}} >
            <Text style={[styles.normalText,{textDecorationLine:'underline'}]}>{i18n.t('login.register2')}</Text>
          </TouchableOpacity>
        </View> */}

                <Footer />
            </View>
        </View>
    )
}

// now - 99900 100100
// update - 00100

// 99900 > 99999
// wadi nm - "1"+"00100"

