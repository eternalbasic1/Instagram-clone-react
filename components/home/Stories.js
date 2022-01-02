import React from 'react'
import { View, Text , ScrollView, Image,StyleSheet } from 'react-native'
import { users } from '../../data/users'

const Stories = () => {
    return (
    <View style={{marginTop:20}}>
            <ScrollView
                horizontal 
                showsHorizontalScrollIndicator={false}
            > 
                {users.map((story,index)=>(
                    <View key = {index} style={{alignItems:"center"}}>
                    <Image source={{uri: story.image}}
                    style={styles.story}/>
                    <Text style={{color:'white'}}>{
                    story.user.length>8?story.user.slice(0,7).toLowerCase()+'..':story.user.toLowerCase()

                     
                    }</Text>
                    </View>
                ))}
                
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    story:{
        width:65,
        height:65,
        borderRadius:50,
        marginLeft: 5,
        borderWidth:3,
        borderColor:'#ff8501'

    },
})

export default Stories
