import { View, StatusBar } from 'react-native'
import React,{useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/routes/StackNavigator';
import { AMAProvider } from './src/context/AMAContext';
import colors from './src/shared/colors';
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  
  return (
    <AMAProvider>
      <StatusBar backgroundColor={colors.primary_white_100} barStyle={'dark-content'} />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AMAProvider>
  )
}