import { View, Text, ScrollView, Dimensions, TextInput,Keyboard,TouchableOpacity,BackHandler } from 'react-native'
import React, { useState, useEffect, useRef, useMemo, useCallback , useContext} from 'react'
import styles from '../shared/styles'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import colors from '../shared/colors';
import EmptyScreen from '../components/EmptyScreen';
import FloatingButton from '../components/FloatingButton';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import MainButton from '../components/MainButton';
import { session } from '../shared/sessions';
import { AMAContext } from '../context/AMAContext';
import SwipeableButton from '../components/SwipeableButton';
import i18n from 'i18n-js';
import SplashScreen from 'react-native-splash-screen'
import AccordianList from '../components/AccordianList';
import MilageUpdateTimes from '../assets/data/MilageUpdateTimes'
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const vehiclesCollection = firestore().collection('Vehicles');
const userVehiclesCollection = firestore().collection('UserVehicles');

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Home() {

  
  const context = useContext(AMAContext)

  const navigation = useNavigation();
  const [vehicleNo, setVehicleNo] = useState('')
  const [nickname, setNickname] = useState('')
  const [milage, setMilage] = useState('')
  const [updateTime, setUpdateTime] = useState(MilageUpdateTimes[0].days)
  const [updateTimeText, setUpdateTimeText] = useState(context.lang=='en'?MilageUpdateTimes[0].time_en:MilageUpdateTimes[0].time_si)
  const [vehicles, setVehicles] = useState(null)
  const [userVehicles, setUserVehicles] = useState(null)
  const [headerElevation, setHeaderElevation] = useState(false)
  const [selected, setSelected] = useState(null)
  const [show, setShow] = useState(false)

  const [bottomSheetKey, setBottomSheetKey] = useState(1)

 // ref
 const bottomSheetRef = useRef();

 // variables
 const snapPoints = useMemo(() => [windowHeight/1.8,windowHeight/1.5], []);

 // callbacks
 const handleSheetChanges = useCallback((index) => {
   console.log('handleSheetChanges', index);
 }, []);

  const OpenBottomSheet =()=>{
    bottomSheetRef.current.snapToIndex(0)
  }
  const toggleMenu = () => {
    navigation.toggleDrawer()
  }

  useEffect(() => {    
    SplashScreen.hide()
    getVehicles()
  }, []);

  useEffect(() => {
    context.setLoading(true)
    session('user').then((user)=>{
    const subscriber = userVehiclesCollection
      .doc(JSON.parse(user).email)
      .onSnapshot(documentSnapshot => {
        let data = documentSnapshot.data()
        // console.log('User data: ', documentSnapshot.data());
        if (documentSnapshot.exists) {
          context.setLoading(false)
          console.log(user)
          if(data.vehicles.length == 0){
            setUserVehicles(null)
          }
          else{
            setUserVehicles(data.vehicles)
          }
        
        }
        else{
          
          context.setLoading(false)
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }
    )
  }, [context.user]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const getVehicles = () => {
    let array = []
    vehiclesCollection
    .where('permission', '==', true)
    // .orderBy('title', 'asc')
    .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          array.push(documentSnapshot.data())
          // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
          setVehicles(array)
      });
  }

  const saveVehicle=()=>{
    let vehicleId = vehicleNo.toUpperCase()+new Date().getTime()
    // let docId =  context.user.email
    let userId = context.user.id
    console.log(vehicleId)

    firestore()
  .collection('UserVehicles')
  .doc(context.user.email)
  .get()
  .then(documentSnapshot => {
    bottomSheetRef.current.close()

    if (documentSnapshot.exists) {
      // console.log('User data: ', documentSnapshot.data());
      let vehicleData = documentSnapshot.data()
      updateVehicle(vehicleData,vehicleId,userId)
    }
    else{
      addVehicle(vehicleId,userId)
    }
  });

  }

  const addVehicle=(vid,uid)=>{
    firestore()
    .collection('UserVehicles')
    .doc(context.user.email)
    .set({
      vehicles:[{
            id:vid,
            nickName: nickname,
            vehicleNumber: vehicleNo.toUpperCase(),
            type: selected.title,
            typeId:selected.id, 
            typeImage:selected.image, 
            mileage:milage,
            mileageUpdateTime:updateTime,
            updatedAt:moment().format('YYYY-MM-DD')
      }]

    })
    .then(() => {
      console.log('User added!');
      bottomSheetRef.current.close()
      setVehicleNo('')
      setNickname('')
      setSelected(null)
      setMilage('')
      setUpdateTimeText(context.lang=='en'?MilageUpdateTimes[0].time_en:MilageUpdateTimes[0].time_si)
      setUpdateTime(MilageUpdateTimes[0].days)
      Keyboard.dismiss()
    });

  }
  const updateVehicle=(vdata,vid,uid)=>{
    let vehicleArray = vdata.vehicles
    let data = {  
      id:vid,
      nickName: nickname,          
      vehicleNumber: vehicleNo.toUpperCase(),
      type: selected.title,
      typeId:selected.id, 
      typeImage:selected.image, 
      mileage:milage,
      mileageUpdateTime:updateTime,
      updatedAt:moment().format('YYYY-MM-DD')
    }
    vehicleArray.push(data)
    // console.log(vehicleArray)

    firestore()
    .collection('UserVehicles')
    .doc(context.user.email)
    .update({
      vehicles:vehicleArray

    })
    .then(() => {
      console.log('User added!');
      setVehicleNo('')
      setNickname('')
      setSelected(null)
      setMilage('')
      setUpdateTimeText(context.lang=='en'?MilageUpdateTimes[0].time_en:MilageUpdateTimes[0].time_si)
      setUpdateTime(MilageUpdateTimes[0].days)
      Keyboard.dismiss()
    });
  }

  const deleteVehicle=(index)=>{
    
    let vehicleId = context.user.email
    let vehicleArray = userVehicles

    vehicleArray.splice(index, 1)

    console.log(vehicleArray)
    // vehicleArray.push(data)
    // console.log(vehicleArray)

    firestore()
    .collection('UserVehicles')
    .doc(vehicleId)
    .update({
      vehicles:vehicleArray
    })
    .then(() => {
      console.log('Deleted');
    });
  }


  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.3}
      />
    ),
    []
  );

  return (
    <View style={styles.mainContainer}>
      <Header 
      title={i18n.t('home.title')}
        elevation={headerElevation}
        leftIcon={'menuunfold'}
        leftIconOnpress={() => toggleMenu()}
        rightIcon={'bells'}
        rightIconOnpress={() => { navigation.navigate('Notifications') }}
        zindex={true}
      />
      <ScrollView contentContainerStyle={{ flex: 1,margin:15 }}>
        {
          userVehicles == null ?
            <EmptyScreen 
            image={require('../assets/images/logo.png')}
            title={i18n.t('home.emptytitle')}
            subtitle={i18n.t('home.emptysubtitle')}
            />
            :
            userVehicles.map((uvehicle,index)=>
              <View key={index}>
                <SwipeableButton 
                righticon={'trash'}
                onRightButtonPress={()=>deleteVehicle(index)}
                onPress={()=>navigation.navigate('Services',{vehicle:uvehicle,vehicleIndex:index})}
                title={uvehicle.vehicleNumber}
                isVehicle={true}
                image={{uri:uvehicle.typeImage}}
                title2={uvehicle.nickName}
                />
              </View>
            )
        }
      </ScrollView>
      <FloatingButton
      text={i18n.t('home.button')}
      icon={'plus'}
      onPress={()=>OpenBottomSheet()}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.bottomSheetView}>
          <Text style={styles.h1}>{i18n.t('home.bttitle1')}</Text>
          <View style={styles.flexWrapView}>
          {
            vehicles == null?null:
            vehicles.map((vehicle,index)=>
              <View key={index} style={{marginRight:5}}>
                <MainButton
                 key={index} 
                title={vehicle.title} 
                width={(windowWidth/2)-20}
                accent='white'
                buttonType='rectangle-round'
                bigImage={{uri:vehicle.image}}
                selected={selected==vehicle}
                onPress={()=>setSelected(vehicle)}
                />
                {/* <Text>{vehicle.title}</Text> */}
              </View>
            )
          }
          </View>
          <View style={styles.row}>
            <Text style={[styles.h1,{width:'45%'}]}>{i18n.t('home.bttitle2')}</Text>
            <View style={[styles.input,{width:windowWidth/2,height:40,marginBottom:7}]}>
              <TextInput
              style={styles.textInput}
              placeholder='XXX0000'
              value={vehicleNo}
              onChangeText={setVehicleNo}
            />
                
            </View>
          </View>
          
          <View style={styles.row}>
            <Text style={[styles.h1,{width:'45%'}]}>{i18n.t('home.bttitle4')}</Text>
            <View style={[styles.input,{width:windowWidth/2,height:40,marginBottom:5}]}>
              <TextInput
              style={styles.textInput}
              placeholder={i18n.t('home.bttitle4')}
              value={milage}
              onChangeText={setMilage}
            />
                
            </View>
          </View>

          {/* <View>
            <AccordianList title={'Milage updating duration'} h1={true} expand={true} expandContent={
              MilageUpdateTimes.map((times,index)=>
              <MainButton width={'100%'} key={index} title={times.time} />
              )
            }/>
          </View> */}
          
          <View style={styles.row}>
            <Text style={[styles.h1,{width:'45%'}]}>{i18n.t('home.bttitle5')}</Text>
            <View style={[styles.input,{zIndex:6,width:windowWidth/2,height:40,marginBottom:0,paddingRight:0}]}>
              <TouchableOpacity onPress={()=>setShow(!show)}>
                <View style={[styles.row,{justifyContent:'space-between',paddingHorizontal:10,width:windowWidth/2}]}>
                  <Text>{updateTimeText}</Text>
                  <AntDesign name={show?'up':'down'} size={15} color={colors.primary_black_100} />
                </View>
              </TouchableOpacity>
              {
                show?
                <View style={[styles.elevationView,styles.pickerView]}>
                {MilageUpdateTimes.map((data,index)=>
                <MainButton selected={data.days == updateTime} onPress={()=>{setUpdateTime(data.days);setShow(false);setUpdateTimeText(context.lang=='en'?data.time_en:data.time_si)}} width={'100%'} key={index} title={context.lang=='en'?data.time_en:data.time_si} accent="white" />)}
                </View>
                
                :
                null
              }
                
            </View>
          </View>


          <View style={styles.row}>
            <Text style={[styles.h1,{width:'45%'}]}>{i18n.t('home.bttitle3')}</Text>
            <View style={[styles.input,{width:windowWidth/2,height:40,marginBottom:0}]}>
              <TextInput
              style={styles.textInput}
              placeholder={i18n.t('home.bttitle3')}
              value={nickname}
              onChangeText={setNickname}
            />
                
            </View>
          </View>


<View style={{alignSelf:'flex-end'}}>
          <MainButton
                  accent='blue'
                  width={45}
                  icon={'arrowright'}
                  onPress={()=>{saveVehicle()}}
                  buttonType='round'
                  disabled={vehicleNo =='' || selected==null || milage==''}                
                  />
          </View>
        </View>
      </BottomSheet>

    </View>
  )
}