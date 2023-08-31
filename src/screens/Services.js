import { View, Text,ScrollView ,Dimensions,TextInput,Keyboard} from 'react-native'
import React, {useContext,useState,useRef,useMemo,useCallback,useEffect} from 'react'
import styles from '../shared/styles'
import Header from '../components/Header'
import { useNavigation,useRoute } from '@react-navigation/native';
import { AMAContext } from '../context/AMAContext';
import FloatingButton from '../components/FloatingButton';
import EmptyScreen from '../components/EmptyScreen';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import MainButton from '../components/MainButton';
import firestore from '@react-native-firebase/firestore';
import { session } from '../shared/sessions';
import SwipeableButton from '../components/SwipeableButton';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import i18n from 'i18n-js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Services() {
    const context = useContext(AMAContext)
  
    const navigation = useNavigation();
    const route = useRoute()
    const [vehicle, setVehicleNo] = useState(route.params?.vehicle)
    const [vehiclemilage, setVehicleMilage] = useState(route.params?.vehicle.mileage)
    const [service, setService] = useState('')
    const [milage, setMilage] = useState('')
    const [serviceList, setServiceList] = useState(null)
    const [date, setDate] = useState(new Date())
    const [stringDate, setStringDate] = useState('')
    const [headerElevation, setHeaderElevation] = useState(false)

 // ref
 const bottomSheetRef = useRef();
 const bottomSheetRef2 = useRef();

 // variables
 const snapPoints = useMemo(() => [windowHeight/2,windowHeight/1.3,windowHeight], []);
 const snapPoints2 = useMemo(() => [windowHeight/2,windowHeight/1.3,windowHeight], []);

 // callbacks
 const handleSheetChanges = useCallback((index) => {
   console.log('handleSheetChanges', index);
 }, []); // callbacks
 const handleSheetChanges2= useCallback((index) => {
   console.log('handleSheetChanges', index);
 }, []);

  const OpenBottomSheet =()=>{
    bottomSheetRef.current.snapToIndex(0)
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


      const saveService=()=>{
        
    let vehicleId = context.user.email
    let serviceId = vehicleId+vehicle.vehicleNumber
    console.log(serviceId)

    firestore()
  .collection('vehicleServices')
  .doc(serviceId)
  .get()
  .then(documentSnapshot => {

    if (documentSnapshot.exists) {
      // console.log('User data: ', documentSnapshot.data());
      let serviceData = documentSnapshot.data()
      updateVehicle(serviceData,serviceId)
    }
    else{
      addVehicle(serviceId)
    }
  });
      }

    const updateVehicle=()=>{
      // currentIndex=route.params?.vehicle.vehicleIndex
      // firestore()
      //   .collection('vehicleServices')
      //   .doc(context.user.email)
      //   .get()
      //   .set({
      //     services:[{
      //           service: service,
      //           date: moment(date).format('YYYY-MM-DD')
      //     }]
    
      //   })
      //   .then(() => {
      //     console.log('User added!');
      //     bottomSheetRef.current.close()
      //     setService('')
      //     setDate(new Date())
      //     Keyboard.dismiss()
      //   });
    }
      // const addVehicle=(sid)=>{
      //   firestore()
      //   .collection('vehicleServices')
      //   .doc(sid)
      //   .set({
      //     services:[{
      //           service: service,
      //           date: moment(date).format('YYYY-MM-DD')
      //     }]
    
      //   })
      //   .then(() => {
      //     console.log('User added!');
      //     bottomSheetRef.current.close()
      //     setService('')
      //     setDate(new Date())
      //     Keyboard.dismiss()
      //   });
    
      // }

      
  // const updateVehicle=(sdata,sid)=>{
  //   let serviceArray = sdata.services
  //   let data = {  
  //     service:service, 
  //     date: moment(date).format('YYYY-MM-DD')
  //   }
  //   serviceArray.push(data)
  //   // console.log(vehicleArray)

  //   firestore()
  //   .collection('vehicleServices')
  //   .doc(sid)
  //   .update({
  //     services:serviceArray

  //   })
  //   .then(() => {
  //     console.log('User added!');
  //     bottomSheetRef.current.close()
  //     setService('')
  //     setDate(new Date())
  //     Keyboard.dismiss()
  //   });
  // }

  
  useEffect(() => {
    console.log(route.params)
    mileageDate()
    getDefaultServices()
  //   session('user').then((user)=>{
      
  //   let vehicleId = JSON.parse(user).email
  //   let serviceId = vehicleId+vehicle.vehicleNumber

  //   const subscriber = 
  //   firestore()
  //   .collection('UserServices')
  //     .doc(serviceId)
  //     .onSnapshot(documentSnapshot => {
  //       let data = documentSnapshot.data()
  //       console.log('User data: ', documentSnapshot.data());
  //       if (documentSnapshot.exists) {
  //       setServiceList(data.services)
  //       }
  //     });

  //   // Stop listening for updates when no longer required
  //   return () => subscriber();
  // }
    // )
  }, []);

  const getDefaultServices =()=>{
    context.setLoading(true)
    const vId = route.params?.vehicle.typeId
    let array = []
    firestore()
  .collection('Services')
  .where('vehicle_id','==',vId)
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);
    context.setLoading(false)

    querySnapshot.forEach(documentSnapshot => {
      // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      array.push(documentSnapshot.data())
    });
    setServiceList(array)
  });

  }
  
  const mileageDate=()=>{
    var date = new Date(route.params?.vehicle.updatedAt);
    date.setDate(date.getDate() + route.params?.vehicle.mileageUpdateTime);

    console.log(route.params?.vehicleIndex)
    if(moment(date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
      console.log('today')
      bottomSheetRef2.current.snapToIndex(0)
    }

  }
  return (
    <View style={styles.mainContainer}>
        

        <View style={styles.odometer}>
<Text style={styles.whiteText}>{vehiclemilage} KM</Text>
</View>
 
      <Header 
        elevation={headerElevation}
        leftIcon={'arrowleft'}
        leftIconOnpress={() => navigation.goBack()}
        title={vehicle.nickName?vehicle.nickName:i18n.t('services.title')+vehicle.vehicleNumber}
        zindex={true}
      />
 <ScrollView contentContainerStyle={{padding:15 }}>
 {serviceList==null?
      null
  //  <EmptyScreen 
  //           image={require('../assets/images/logo.png')}
  //           title={'No services listed yet'}
  //           subtitle={'Please add a service that your vehicle need to do'}
  //           />
            :
            serviceList.map((service,index)=>
            <View key={index}>
              <MainButton 
              accent={'white'}
              title={context.language=='si'?service.title_si:service.title_en}
              // date={service.date}
              onPress={()=>navigation.navigate('SingleService',{vehicle:route.params?.vehicle,service:service})}
              />
            </View>
            )


 }


 </ScrollView>
 
 {/* <FloatingButton
      text="Add Service"
      icon={'plus'}
      onPress={()=>OpenBottomSheet()}
      /> */}
<BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        
      >
        <View style={styles.bottomSheetView}>
          {/* <Text style={styles.h1}>Select your vehicle first</Text> */}
          
          <View style={styles.row}>
            <Text style={styles.h1}>Service Name</Text>
            <View style={[styles.input,{width:windowWidth/2,height:40,marginBottom:5}]}>
              <TextInput
              style={styles.textInput}
              placeholder='Service Name'
              value={service}
              onChangeText={setService}
            />
                
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.h1}>Mileage</Text>
            <View style={[styles.input,{width:windowWidth/2,height:40,marginBottom:5}]}>
              <TextInput
              style={styles.textInput}
              placeholder='Milage'
              value={milage}
              onChangeText={setMilage}
            />
                
            </View>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.h1}>Done Date</Text>
            <DatePicker 
            date={date} 
            onDateChange={date => setDate(date)}
             mode={'date'}
              />
            {/* <View style={[styles.input,{width:windowWidth/2,height:40,marginBottom:0}]}>
              <TextInput
              style={styles.textInput}
              placeholder='Date'
              value={date}
              onChangeText={setDate}
            />
                
            </View> */}
          </View>

<View style={{alignSelf:'flex-end'}}>
          <MainButton
                  accent='blue'
                  width={45}
                  icon={'arrowright'}
                  onPress={()=>{saveService()}}
                  buttonType='round'
                  disabled={service =='' || date==''}                
                  />
          </View>
        </View>
      </BottomSheet>

      
<BottomSheet
        ref={bottomSheetRef2}
        snapPoints={snapPoints2}
        onChange={handleSheetChanges2}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        
      >
        <View style={styles.bottomSheetView}>
        <View style={styles.row}>
            <Text style={styles.h1}>Current mileage</Text>
            <View style={[styles.input,{width:windowWidth/2,height:40,marginBottom:5}]}>
              <TextInput
              style={styles.textInput}
              placeholder='Current milage'
              value={milage}
              onChangeText={setMilage}
            />
                
            </View>
          </View>
          <View style={{alignSelf:'flex-end'}}>
          <MainButton
                  accent='blue'
                  width={45}
                  icon={'arrowright'}
                  onPress={()=>{updateVehicle()}}
                  buttonType='round'
                  disabled={milage ==''}                
                  />
          </View>
        </View>
      </BottomSheet>

      {/* <Text>{vehicle.vehicleNumber}</Text> */}
    </View>
  )
}