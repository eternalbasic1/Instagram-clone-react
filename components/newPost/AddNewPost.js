import React from 'react'
import { Alert } from 'react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text ,Image } from 'react-native'
import FormikPostUploader from './FormikPostUploader'



const AddNewPost = ({navigation}) => (
    
    <View style = {styles.container}>
        <Header navigation = {navigation}/>
        <FormikPostUploader navigation = {navigation}/>
    </View>
)

const Header = ({navigation}) =>(
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress = {()=> navigation.goBack()}>
        <Image 
        source={{uri : 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}}
        style={{width:30,height:30,marginTop:20}}
        /> 
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW POST</Text>
    <Text></Text>
    </View>
)


const styles = StyleSheet.create({

    container:{
        marginTop:17,
        marginHorizontal:10
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center', 

    },
    headerText:{
        color:'#fff',
        fontWeight:'700',
        fontSize:20,
        marginRight:27.5,
        top:9,
    }
})

export default AddNewPost
