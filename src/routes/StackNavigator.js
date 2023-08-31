import { View, Text } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import Settings from '../screens/Settings'
import Login from '../screens/Login'
import LanguageSelect from '../screens/LanguageSelect'
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register'
import Welcome from '../screens/Welcome'
import DrawerNavigator from './DrawerNavigator'
import Notifications from '../screens/Notifications'
import Splash from '../screens/Splash'
import Services from '../screens/Services'
import SingleService from '../screens/SingleService'
import LogoScreen from '../screens/LogoScreen'
import Onboarding from '../screens/Onboarding'

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}
    initialRouteName='Splash'
    >
      <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{freezeOnBlur:true}} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="SingleService" component={SingleService} />
      <Stack.Screen name="LogoScreen" component={LogoScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  )
}