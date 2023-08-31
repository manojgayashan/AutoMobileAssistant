import { View, Text,Image } from 'react-native'
import React from 'react'
import styles from '../shared/styles'
import colors from '../shared/colors'

export default function EmptyScreen({
    title,
    subtitle,
    image
}) {
  return (
    <View style={[styles.centeredView,{backgroundColor:colors.primary_black_500}]}>
        {
            image?<Image source={image} style={[styles.mediumImage,{tintColor:colors.primary_black_400}]}/>:null
        }
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptySubTitle}>{subtitle}</Text>
  </View>
  )
}