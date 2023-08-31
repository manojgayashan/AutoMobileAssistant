import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../shared/colors';
import styles from '../shared/styles';
import Login from '../screens/Login';
import auth from '@react-native-firebase/auth';
import { session } from '../shared/sessions';
import { AMAContext } from '../context/AMAContext';
import i18n from 'i18n-js';

function CustomDrawerContent(props) {
  // const [first, setfirst] = useState(second)

  const context = React.useContext(AMAContext)
  
  const logout =()=>{
    auth()
    .signOut()
    .then(() =>{
      props.navigation.navigate('Login',{from:'Drawer'})
      session("user",'')
      props.navigation.closeDrawer()
    });
  }
//   React.useEffect(() => {
  
    
// }, [])

  return (
    <DrawerContentScrollView contentContainerStyle={{justifyContent:'space-between',flex:1}} style={{backgroundColor:'rgba(12, 106, 242,0.2)'}} {...props}>
        <View>
            <Image source={require('../assets/images/drawerIcon.png')} style={[styles.headerImage,{tintColor:null}]}/>
            <View style={{padding:15}}>
            <Text style={styles.h1}>{context.user.name}</Text>
            <Text style={styles.smallText}>{context.user.email}</Text>
            </View>
            <View style={{backgroundColor:colors.primary_black_300,height:1,width:'95%',marginLeft:'2.5%',marginVertical:5}}/>
      <DrawerItemList {...props} />
      </View>
      <DrawerItem icon={({focused, size})=><AntDesign name={'logout'} size={22} color={focused?colors.primary_blue_dark:colors.primary_blue} />} labelStyle={{color:colors.primary_blue}} label={i18n.t('drawer.logout')} onPress={() => logout()} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown:false,
        drawerType:'slide',
        overlayColor:'transparent',
        unmountOnBlur:true,
        drawerActiveTintColor:colors.primary_blue_dark,
        drawerInactiveTintColor:colors.primary_blue,
        drawerActiveBackgroundColor:'rgba(255, 255, 255,0.6)'
      }}
      
    >
      <Drawer.Screen name="Home" component={Home} options={{
        title:"test",
        drawerLabel:({focused, size})=><Text style={{color:focused?colors.primary_blue_dark:colors.primary_blue,fontWeight:'600'}}>{i18n.t('drawer.home')}</Text>,
        drawerIcon:({focused, size})=><AntDesign name={'home'} size={22} color={focused?colors.primary_blue_dark:colors.primary_blue} />
      }} />
      <Drawer.Screen name="Settings" component={Settings} options={{
        drawerLabel:({focused, size})=><Text style={{color:focused?colors.primary_blue_dark:colors.primary_blue,fontWeight:'600'}}>{i18n.t('drawer.settings')}</Text>,
        drawerIcon:({focused, size})=><AntDesign name={'setting'} size={22} color={focused?colors.primary_blue_dark:colors.primary_blue} />
      }}/>
      {/* <Drawer.Screen name="Logout" component={Login} options={{
        drawerIcon:({focused, size})=><AntDesign name={'logout'} size={22} color={focused?colors.primary_blue_dark:colors.primary_blue} />
      }}/> */}
    </Drawer.Navigator>
  );
}

export default function DrawerNavigator() {
  return (
    // <NavigationContainer>
      <MyDrawer />
    // </NavigationContainer>
  );
}