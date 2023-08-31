import { View, Text, Dimensions, ScrollView, StyleSheet, Image,TouchableOpacity, StatusBar ,BackHandler} from 'react-native'
import React, {useRef,useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../shared/colors'
import OnboardingData from '../assets/data/OnboardingData'
import MainButton from '../components/MainButton'
import styles from '../shared/styles'
import { session } from '../shared/sessions'
import LogoScreen from './LogoScreen'
import SplashScreen from 'react-native-splash-screen'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Onboarding() {

    const navigation = useNavigation()
    const scrollView = useRef();
    const [current, setCurrent] = useState(0);
    const [logo, setLogo] = useState(true);
    const [onboarded, setOnboarded] = useState();

    useEffect(() => {        
        SplashScreen.hide()
      setTimeout(() => {
        setLogo(false)
      }, 4000);
    }, [])
    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    }, [])
    // const getStorage = async () => {
    //   const onboarded = await AsyncStorage.getItem('ONBOARDED');
    //   if(onboarded=='true'){
    //     navigation.navigate('BottomTabs')
    //   }
    //   setTimeout(() => {
    //     SplashScreen.hide()
    //   }, 300);
    // };

    const goNext = () => {
        var total = 2;
        if (current < total) {
          scrollView.current.scrollTo({ x: windowWidth * (current + 1) });
          setCurrent(current + 1);
        } else {
          setCurrent(0);
          scrollView.current.scrollTo({ x: 0 });
        }
      };

      const goBack = () => {
        console.log('current', current);
        var total = 2;
        if (current > 0) {
          scrollView.current.scrollTo({ x: windowWidth * (current - 1) });
          setCurrent(current - 1);
        } else {
          setCurrent(total);
          scrollView.current.scrollTo({ x: windowWidth * total });
        }
      };

      const onPressFinish = async () => {
        // await AsyncStorage.setItem('ONBOARDED', 'true');
        session('onboading','true')
        navigation.navigate('LanguageSelect')
      };

  return (
    <View style={style.mainContainer}>
        <LogoScreen show={logo} />
      <StatusBar backgroundColor={colors.primary_white_100} barStyle={'dark-content'}/>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={style.caroasalScroll}
        contentContainerStyle={style.caroasalScrollContent}
        ref={scrollView}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          var position = event.nativeEvent.contentOffset.x;
          var val = Math.round(position / windowWidth);
          var rowval = position / windowWidth
          if (val >= 0) {
            setCurrent(val);
          }
          
        //   console.log(current)

        }}
      >
        <View style={style.caroasalItemsView}>
          {
            OnboardingData.map((data,index)=>{
                return (
                    <View key={index} style={style.itemView}>
                        <Text style={style.titleText}>{data.title}</Text>
                        <Image source={data.image} style={style.itemImage} />
                        <Text style={style.descText}>{data.desc}</Text>
                    </View>
                )
            })
          }

        </View>

      </ScrollView>
      
      <View
          style={style.indicaterView}
        >
          {OnboardingData.map((d, index) => (
            <View
              key={index}
              style={index == current ? style.filledCircle : [style.filledCircle, { backgroundColor: colors.primary_black_300,width:8 }]}
            />
          ))}
        </View>

        
      <View style={styles.indicaterView}>
          {current<= 1?
          <MainButton
          title='Next' 
          onPress={()=>goNext()}
          accent={'blue'}
          width={'100%'}
          buttonType='rectangle-round'
          />
        //   <TouchableOpacity style={styles.blueButton} onPress={()=>goNext()}>
        //     <Text style={styles.buttonText}>Next</Text>
        //     </TouchableOpacity>
            :
            
          <MainButton
          title='Done' 
          onPress={()=>onPressFinish()}
          accent={'blue'}
          width={'100%'}
          buttonType='rectangle-round'
          />
            // <TouchableOpacity style={styles.blueButton} onPress={()=>onPressFinish()}>
            // <Text style={styles.buttonText}>Done</Text>
            // </TouchableOpacity>
            }
        </View>

            <Text onPress={()=>onPressFinish()} style={style.skipText}>Skip for Now</Text>
    </View>
  )
}

const style = StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      backgroundColor:colors.primary_white_100,
      flex:1,
      justifyContent:'center',
      paddingBottom:50
    },
    caroasalScroll: {
      width: windowWidth,
    },
    caroasalScrollContent: {
      alignItems: "center",
      justifyContent: "center",
    },
    caroasalItemsView:{ 
        flexDirection: "row", 
        width: windowWidth * 3, 
        justifyContent: 'space-around',
        height:windowHeight/2,
        alignItems:'center' 
    },
    itemView:{
        alignItems:'center',
        width:windowWidth-100,
        justifyContent:'space-between',
        // backgroundColor:'red',
        height:windowHeight/2
    },
    itemImage:{
        width:150,
        height:150
    },
    titleText:{
        color:colors.primary_blue,
        fontWeight:'600',
        fontSize:18
    },
    descText:{
        color:colors.primary_black_100,
        fontSize:14,
        textAlign:'center',
        lineHeight:22
    },
    indicaterView: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    filledCircle: {
      borderRadius: 18,
      width: 18,
      height: 8,
      backgroundColor: colors.primary_blue,
      margin: 5,
      opacity: 1
    },
    blueButton:{
        backgroundColor:colors.primary_blue_500,
        borderColor:colors.primary_blue_100,
        borderWidth:1,
        borderRadius:4,
        paddingHorizontal:48,
        paddingVertical:12,
        marginVertical:22
    },
    buttonText:{
        color:colors.primary_blue,
        fontSize:14,
        fontWeight:'600'
    },
    skipText:{
        color:colors.primary_blue,
        fontSize:12,
        fontWeight:'500'
        
    }
  });