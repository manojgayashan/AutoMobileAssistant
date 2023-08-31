import { View, Text,ScrollView ,Dimensions,TextInput,Keyboard,Switch} from 'react-native'
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
import AccordianList from '../components/AccordianList';
import colors from '../shared/colors';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function SingleService() {
    const context = useContext(AMAContext)
  
    const navigation = useNavigation();
    const route = useRoute()
    const [vehicle, setVehicle] = useState(route.params?.vehicle)
    const [routeService, setRouteService] = useState(route.params?.service)
    const [service, setService] = useState('')
    const [milage, setMilage] = useState('')
    const [nextMilage, setNextMilage] = useState('')
    const [serviceList, setServiceList] = useState(null)
    const [date, setDate] = useState(new Date())
    const [remind, setRemind] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(0)
    const [headerElevation, setHeaderElevation] = useState(false)

 // ref
 const bottomSheetRef = useRef();

 // variables
 const snapPoints = useMemo(() => [windowHeight/1.5,windowHeight/1.2,windowHeight], []);

 // callbacks
 const handleSheetChanges = useCallback((index) => {
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
        
      Keyboard.dismiss()
    let serviceId = route.params?.vehicle.id
    
    console.log(serviceId)

    firestore()
  .collection('UserServices')
  .doc(serviceId)
  .get()
  .then(documentSnapshot => {
if (documentSnapshot.exists) {
  let serviceData = documentSnapshot.data()
    if (serviceData[route.params?.service.id]) {
      // console.log('User data: ', documentSnapshot.data());
      
      updateVehicle(serviceData[route.params?.service.id],serviceId,false)
    }
    else{
      updateVehicle(serviceData[route.params?.service.id],serviceId,true)
    }
  
  }
    else{
      addVehicle(serviceId)
    }

  });

      }


      const addVehicle=(sid)=>{
        firestore()
        .collection('UserServices')
        .doc(sid)
        .set({
          [route.params?.service.id]:[{
                createdAt: moment(date).format('YYYY-MM-DD'),
                remind:remind,
                nextMilage:nextMilage,
                serviceId:routeService.id
          }]
    
        })
        .then(() => {
          console.log('User added!');
          bottomSheetRef.current.close()
          setService('')
          setNextMilage('')
          setDate(new Date())
          setRemind(false)
        });
    
      }


  const updateVehicle=(sdata,sid,newColumn)=>{
    console.log(newColumn)
    let serviceArray = newColumn?[]:sdata
    let data = {  
        createdAt: moment(date).format('YYYY-MM-DD'),
        remind:remind,
        nextMilage:nextMilage,
        serviceId:routeService.id
    }
    serviceArray.push(data)
    // console.log(vehicleArray)

    firestore()
    .collection('UserServices')
    .doc(sid)
    .update({
      [route.params?.service.id]:serviceArray

    })
    .then(() => {
      console.log('User added!');
      bottomSheetRef.current.close()
      setService('')
      setNextMilage('')
      setDate(new Date())
      setRemind(false)
    });
  }

  const openEditSheet =(data,index)=>{
    console.log(serviceList[index])
    setEditIndex(index)
    setNextMilage(data.nextMilage)
    setDate(new Date(new Date(data.createdAt)))
    setRemind(data.remind)
    setEdit(true)
    OpenBottomSheet()
  }

  
  const editService=()=>{
    let serviceId = route.params?.vehicle.id
    // let serviceArray = []
    let data = {  
        createdAt: moment(date).format('YYYY-MM-DD'),
        remind:remind,
        nextMilage:nextMilage,
        serviceId:routeService.id
    }
    serviceList[editIndex]=data
    // serviceArray.push(data)
    // console.log(vehicleArray)

    firestore()
    .collection('UserServices')
    .doc(serviceId)
    .update({
      [route.params?.service.id]:serviceList

    })
    .then(() => {
      console.log('User added!');
      bottomSheetRef.current.close()
      setService('')
      setNextMilage('')
      setDate(new Date())
      setEdit(false)
      setRemind(false)
    });
  }

  
  const deleteService=(index)=>{
    
    let serviceId = route.params?.vehicle.id

    let serviceArray = serviceList

    serviceArray.splice(index, 1)

    console.log(serviceArray)
    // vehicleArray.push(data)
    // console.log(vehicleArray)

    firestore()
    .collection('UserServices')
    .doc(serviceId)
    .update({
      [route.params?.service.id]:serviceList
    })
    .then(() => {
      console.log('Deleted');
    });
  }


  useEffect(() => {
    context.setLoading(true)
    // console.log(route.params)
      
    let serviceId = route.params?.vehicle.id
    let fiealdName = route.params?.service.id

    const subscriber = 
    firestore()
    .collection('UserServices')
      .doc(serviceId)
      .onSnapshot(documentSnapshot => {
        context.setLoading(false)
        let data = documentSnapshot.data()
        // console.log('User data: ', documentSnapshot.data());
        if (documentSnapshot.exists) {
        setServiceList(data[route.params?.service.id])
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
    
  }, []);

  

//   const getDefaultServices =()=>{
//     const vId = route.params?.vehicle.typeId
//     let array = []
//     firestore()
//   .collection('Services')
//   .where('vehicle_id','==',vId)
//   .get()
//   .then(querySnapshot => {
//     console.log('Total users: ', querySnapshot.size);

//     querySnapshot.forEach(documentSnapshot => {
//       // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//       array.push(documentSnapshot.data())
//     });
//     setServiceList(array)
//   });

//   }
  return (
    <View style={styles.mainContainer}>
        

 
      <Header 
        elevation={headerElevation}
        leftIcon={'arrowleft'}
        leftIconOnpress={() => navigation.goBack()}
        title={context.language=='si'?routeService.title_si:routeService.title_en}
        zindex={true}
      />
 <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVerticle:15,marginHorizontal:15,flex:1 }}>
 {serviceList==null?
      // null
   <EmptyScreen 
            image={require('../assets/images/logo.png')}
            title={i18n.t('singleservices.emptyTitle')}
            subtitle={i18n.t('singleservices.emptysubtitle')}
            />
            :
            serviceList.map((service,index)=>{
            // console.log(service)
            return(
            <View key={index}>
                <SwipeableButton
                righticon={'edit'}
                righticon2={'trash'}
                title3={service.createdAt}
                subtitle={i18n.t('singleservices.next')+service.nextMilage +"Km" }
                bottomicon={service.remind?'bell':'bell-off'}
                onRightButtonPress={()=>openEditSheet(service,index)}
                onRightButton2Press={()=>deleteService(index)}
                />
              {/* <MainButton 
              accent={'white'}
              title={context.language=='si'?service.title_si:service.title_en}
              // date={service.date}
              onPress={()=>navigation.navigate('SingleService',{vehicle:route.params?.vehicle,service:service})}
              /> */}
            </View>

            )}
            )


 }


 </ScrollView>
 
 <FloatingButton
      text={i18n.t('singleservices.button')}
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
          {/* <Text style={styles.h1}>Select your vehicle first</Text> */}
          

          {/* <View style={styles.row}>
            <Text style={styles.h1}>Current milage</Text>
            <View style={[styles.input,{width:windowWidth/2,height:40,marginBottom:5}]}>
              <TextInput
              style={styles.textInput}
              placeholder='Current milage'
              value={milage}
              onChangeText={setMilage}
            />
                
            </View>
          </View> */}
          
          <View>
            <AccordianList 
            title={i18n.t('singleservices.bttitle1')+moment(date).format('YYYY-MM-DD')} 
            expand={true} 
            h1={true}
            expandContent={<DatePicker 
            date={date} 
            onDateChange={date => setDate(date)}
             mode={'date'}
              />}
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
          
          <View style={styles.row}>
            <Text style={[styles.h1,{width:'45%'}]}>{i18n.t('singleservices.bttitle2')}</Text>
            <View style={[styles.input,{width:windowWidth/2,height:40,marginTop:5}]}>
              <TextInput
              style={styles.textInput}
              placeholder={i18n.t('singleservices.bttitle2')}
              value={nextMilage}
              onChangeText={setNextMilage}
            />
                
            </View>
          </View>
          
          <View style={styles.row}>
            <Text style={[styles.h1,{width:'45%'}]}>{i18n.t('singleservices.bttitle3')}</Text>
            <Switch
        trackColor={{false: colors.primary_black_400, true: colors.primary_blue}}
        thumbColor={colors.primary_white_100}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>setRemind(!remind)}
        value={remind}
      />
            {/* <View style={[styles.input,{width:windowWidth/2,height:40,marginTop:5}]}> */}
              {/* <TextInput
              style={styles.textInput}
              placeholder={i18n.t('singleservices.bttitle2')}
              value={nextMilage}
              onChangeText={setNextMilage}
            /> */}
                
            {/* </View> */}
          </View>
          

<View style={{alignSelf:'flex-end'}}>
          <MainButton
                  accent='blue'
                  width={45}
                  icon={'arrowright'}
                  onPress={edit?()=>editService():()=>{saveService()}}
                  buttonType='round'
                  disabled={nextMilage ==''  || date==''}                
                  />
          </View>
        </View>
      </BottomSheet>
      {/* <Text>{vehicle.vehicleNumber}</Text> */}
    </View>
  )
}