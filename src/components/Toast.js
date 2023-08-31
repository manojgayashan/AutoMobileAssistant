import { View, Text } from 'react-native'
import React ,{useEffect,useState} from 'react'
import styles from '../shared/styles'
import * as Animatable from 'react-native-animatable';
import colors from '../shared/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Toast({
    show,
    message,
    error
}) {

    const [play, setPlay] = useState(true)
    useEffect(() => {
      setTimeout(() => {
        setPlay(false)
      }, 5000);
    }, [])
    
    return (
        show ?
            <Animatable.View duration={1000} animation={play ? 'fadeInDown' : 'fadeOutUp'} style={[styles.toastView,{backgroundColor:error?colors.primary_red_100:colors.primary_green_100}]}>
                    
                    <AntDesign name={error?'closecircleo':'checkcircleo'} size={17} color={colors.primary_white_100} />
                
                <Text style={styles.toastText}>{message}</Text>
            </Animatable.View>
            :
            null
    )
}