import React,{useEffect,useState} from 'react'
import { View, Text,SafeAreaView,StyleSheet, ScrollView ,Image} from 'react-native'
import BottomTabs, { bottomtabicons } from '../components/home/BottomTabs'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
import { POSTS } from '../data/posts'
import {db} from '../firebase'

const HomeScreen = ({navigation}) => {
    const [posts,setPosts] = useState([])

    useEffect(() => {
        db.collectionGroup('posts')
        .orderBy('createdAt','desc')
        .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(post => (
            {id: post.id, ...post.data()})))
        })
    }, []) 

    return (
        <SafeAreaView style = {Styles.container}>
           <Header navigation={navigation}/>
           <Stories/>
           {/* <Post/> */}
           <ScrollView>
               {/* <Image source={{uri: POSTS.user}}/> */}
                {posts.map((post,index)=>(
                    <Post post={post} key={index}/> 
                ))}
                {/* <Post/> */}
           </ScrollView>
           <BottomTabs icons = {bottomtabicons}/>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex:1
    }
})

export default HomeScreen
