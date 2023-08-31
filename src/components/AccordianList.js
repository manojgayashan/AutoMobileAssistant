import { View, Text, TouchableHighlight , TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import styles from '../shared/styles'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../shared/colors';

export default function AccordianList({
    title,
    onPress,
    rightIconOnPress,
    expand,
    expandContent,
    h1
}) {
    const [expanded, setExpanded] = useState(expand);
    return (
        <TouchableOpacity onPress={()=>setExpanded(!expanded)} style={styles.accordianMainView}>
        <View style={styles.accordianView}>
            <Text style={h1?styles.h1:styles.normalText}>{title}</Text>
            <TouchableOpacity onPress={()=>setExpanded(!expanded)}>              
            <AntDesign name={expanded?'up':'down'} size={15} color={colors.primary_black_100} />
            </TouchableOpacity>
        </View>

        {
                expanded?
                <View style={styles.expandView}>
                    {expandContent}
                </View>
                : null
            }
        </TouchableOpacity>
    )
}