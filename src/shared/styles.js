import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import colors from './colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:colors.primary_black_500,
        flex:1,
    },
    container:{
        flex:1,
        padding:15,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:colors.primary_white_100,
        // backgroundColor:'red',
        position:'absolute',
        bottom:0,
        height:'65%',
        zIndex:2
    },
    header:{
        width:windowWidth,
        padding:15,
        backgroundColor:colors.primary_white_100,
        zIndex:2,
    },
    headerTitle:{
        fontSize:22,
        fontWeight:'700',
        color:colors.primary_black_100,
        paddingTop:15
    },
    headerSubTitle:{
        fontSize:12,
        color:colors.primary_black_200
    },
    headerImage:{
        width: 120,
        height: 120,
        marginVertical:10,
        tintColor:colors.primary_black_300
    },
    innerView:{
        flex:1,
        justifyContent:'center',
        width:windowWidth-40
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    input:{
        borderWidth:1,
        borderColor:colors.primary_black_300,
        borderRadius:5,
        width:windowWidth-30,
        marginBottom:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:10,
        backgroundColor:colors.primary_white_100,
        zIndex:2
    },
    textInput:{
        paddingHorizontal:10,
        fontSize:14,
        color:colors.primary_black_100
    },
    normalText:{
        color:colors.primary_black_100,
        fontSize:14,
        zIndex:5
    },
    mediumText:{
        color:colors.primary_black_100,
        fontSize:12
    },
    smallText:{
        color:colors.primary_black_100,
        fontSize:11
    },
    errorText:{
        color:colors.primary_red_100,
        fontSize:10,
        textAlign:'left',
        width:windowWidth-30
    },
    footerView:{
        position:'absolute',
        bottom:-windowWidth/5,
        right:-windowWidth/5,
        zIndex:1
    },
    footerImage:{
        width:windowWidth,
        height:windowWidth,
        tintColor:colors.primary_blue_dark,
        opacity:0.1,
        zIndex:1
    },
    toastView:{
        width:windowWidth-30,
        paddingHorizontal:15,
        paddingVertical:7,
        borderRadius:4,
        position:'absolute',
        top:15,
        zIndex:50,
        // backgroundColor:'red',
        left:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        flexDirection:'row'
    },
    toastText:{
        color:colors.primary_white_100,
        // fontSize:14,
        textAlign:'center',
        fontWeight:'700',
        marginLeft:10
    },
    centeredView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    mediumImage:{
        width:windowWidth/3,
        height:windowWidth/3
    },
    emptyTitle:{
        fontSize:16,
        color:colors.primary_black_300,
        fontWeight:'bold',
        marginTop:15,
        textAlign:'center'
    },
    emptySubTitle:{
        fontSize:14,
        color:colors.primary_black_300,
        paddingHorizontal:30,
        textAlign:'center'
    },
    elevationView:{        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    floatingButtonView:{
        flexDirection:'row',
        backgroundColor:colors.primary_white_100,
        // width:'100%',
        paddingVertical:7,
        paddingHorizontal:10,
        borderRadius:20,
        position:'absolute',
        // zIndex:5,
        bottom:15,
        right:15,
        alignItems:'center',
    },
    floatingButtonText:{
        color:colors.primary_blue,
        fontSize:15,
        fontWeight:'400'
    },
    bottomSheetView:{
        padding:15
    },
    flexWrapView:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    h1:{
        lineHeight:22,
        fontSize:16,
        fontWeight:'700',
        color:colors.primary_black_100
    },
    h2:{
        lineHeight:20,
        fontSize:15,
        fontWeight:'600',
        color:colors.primary_black_100
    },
    h3:{
        lineHeight:18,
        fontSize:14,
        fontWeight:'600',
        color:colors.primary_black_100
    },
    accordianMainView:{
        backgroundColor:colors.primary_white_100,
        borderWidth:1,
        borderColor:colors.primary_black_400,
        borderRadius:5
    },
    accordianView:{
        // marginVertical:10,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:0.8,
        borderColor:colors.primary_black_500
    },
    expandView:{
        paddingLeft:25,
        paddingBottom:10,
        paddingRight:10
    },
    settingsTitleView:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex:10,
        alignItems:'center',
        justifyContent:'center'
      },
      pickerView:{
        position:'absolute',
        top:40,
        left:0,
        backgroundColor:colors.primary_white_100,
        width:'100%',
        paddingHorizontal:10,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
      },
      odometer:{
        position:'absolute',
        top:15,
        right:15,
        zIndex:12,
        backgroundColor:colors.primary_black_200,
        borderWidth:1,
        borderColor:colors.primary_black_400,
        borderRadius:5,
        padding:5,
        paddingHorizontal:10
      },
      whiteText:{
        color:colors.primary_white_100,
        fontSize:16,
        fontWeight:'bold'
      }
})

export default styles