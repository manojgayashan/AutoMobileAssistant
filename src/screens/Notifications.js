import { View, Text } from 'react-native'
import React ,{useEffect} from 'react'
import styles from '../shared/styles'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

export default function Notifications() {
    const navigation = useNavigation()
    useEffect(() => {
        const subscriber = firestore()
          .collection('Users')
          .onSnapshot(QuerySnapshot => {
            console.log(QuerySnapshot);
          });
    
        // Stop listening for updates when no longer required
        return () => subscriber();
      }, []);
    
  return (
    <View style={styles.mainContainer}>
        <Header 
        title={'Notifications'} 
        leftIcon={'arrowleft'}
        leftIconOnpress={()=>navigation.goBack()}
        />
      {/* <Text>Notifications</Text> */}
    </View>
  )
}