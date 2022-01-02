import React, {useEffect,useState} from 'react'
import { View, Text ,Image,StyleSheet, Touchable, TouchableOpacity} from 'react-native'
import { colors } from 'react-native-elements'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { color } from 'react-native-elements/dist/helpers'
import { db,firebase } from '../../firebase'


const postFooterIcons = [

    {
        name :'Like',
        imageUrl:'https://cdn-icons-png.flaticon.com/128/1216/1216575.png',
        likedImageUrl :'https://cdn-icons-png.flaticon.com/512/2107/2107845.png',
    },
    {
        name :'Comment',
        imageUrl:'https://img.icons8.com/ios/2x/topic.png',
    },
    {
        name :'Share',
        imageUrl:'https://cdn.iconscout.com/icon/premium/png-64-thumb/send-4373485-3633743.png',
    },
    {
        name :'Save',
        imageUrl:'https://cdn.iconscout.com/icon/free/png-64/save-3244517-2701888.png',
    },

]
const Post = ({post}) => {

    const handlelike = post => {
        const currentLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email 
        )

        db.collection('users')
        .doc(post.owner_email)
        .collection('posts')
        .doc(post.id)
        .update({
            likes_by_users: 
            currentLikeStatus 
            ?firebase.firestore.FieldValue.arrayUnion(
                firebase.auth().currentUser.email
                )
            :firebase.firestore.FieldValue.arrayRemove(
                firebase.auth().currentUser.email
                ),

        })
        .then(() => {
            console.log('✅ Document Successfully updated')
        })
        .catch(error => {
            console.error('Error Updating the document: ', error)
        })
    }

    return (
        <View style={{marginBottom:30,marginTop:2}}>
            <Divider width={1} orientation='vertical' />
            {/* <Text style={{color:'white'}}>POSTS</Text> */}
            <PostHeader post={post}/>
            <PostImage post = {post}/>
            <View style ={{marginHorizontal:15 , marginTop:10}}>
                <PostFooter post={post} handlelike={handlelike}/>
                <Likes post={post}/>
                <Caption post={post}/>
                <CommentSection post ={post}/>
                <Comments post = {post}/>
            </View>
            
        </View>
    )
}
const PostHeader = ({post})=>  (
    <View 
    style = {{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:5,
        alignItems:'center'}}
        >
        <View style={{flexDirection:'row',alignItems:"center"}}>
            <Image source={{uri: post.profilePicture}} style={styles.story}/>
            <Text style={{color:'white',marginLeft:5,fontWeight:'700'}}>{post.user}</Text>
        </View>
        <Text style={{color: 'white',fontWeight:'bold'}}>. . .</Text>
    </View>

)

const PostImage =({post}) =>(
    <View 
        style={{width:'100%',
                height:450,}}
    >
        <Image
        source={{uri: post.imageUrl}}
        style = {{height:'100%',resizeMode:'cover'}}
        />
    </View>
)

const PostFooter =({handlelike,post}) => {
    return (
    <View style={{flexDirection:'row', justifyContent:"space-between"}}>
        <View style={styles.leftFooterIconsContainer}>
            <TouchableOpacity onPress={() => handlelike(post)}>
                <Image 
                style = {styles.footerIcon} 
                source={{uri:post.likes_by_users.includes(
                    firebase.auth().currentUser.email
                    )? postFooterIcons[0].likedImageUrl :postFooterIcons[0].imageUrl}}/>
            </TouchableOpacity>
            {/* <Icon imgStyle={styles.footerIcon} imgurl={postFooterIcons[0].imageUrl}/> */}
            <Icon imgStyle={styles.footerIcon} imgurl={postFooterIcons[1].imageUrl}/>
            <Icon imgStyle={styles.footerIcon} imgurl={postFooterIcons[2].imageUrl}/>
        </View>
        <View>
        <Icon imgStyle={styles.footerIcon} imgurl={postFooterIcons[3].imageUrl}/>

        </View>
    </View>
    )
}


const Icon = ({imgStyle , imgurl}) => {
    return(
    <TouchableOpacity>
        <Image style = {imgStyle} source ={{uri :imgurl}}/>
    </TouchableOpacity>
    )
}


const Likes = ({post}) => {
    return(
    <View style={{flexDirection:'row',marginTop:4}}>
        <Text style={{color:'white' , fontWeight:"600"} }>
            {post.likes_by_users.length.toLocaleString('en')} likes
        </Text>
    
    </View>   
    )


}

const Caption =({post}) =>{
    return(
        <View style={{marginTop: 4}}>
            <Text style ={{color:'white'}}>
                <Text style={{fontWeight:'bold'}}>{post.user}</Text>
                <Text>  {post.caption}</Text>
                </Text>
        </View>
    )
}

const CommentSection =({post}) =>{
    return(
        <View style={{marginTop:5 , marginLeft:0}}>
            <Text  style={{color:'grey'}} > {post.comments.length>=1 ? <Text style={{color:'grey'}}>
                
            View{post.comments.length>1 ? ' all': ''} {post.comments.length}
                {post.comments.length >1 ? ' comments' : ' comment'}
            </Text> : ''}</Text>
        </View>
        )
    
    
}

const Comments = ({post}) => (
    <> 
        {post.comments.map((comment,index)=>(
            <View key = {index} style={{flexDirection:'row',marginTop : 5}}> 
                {/* <Text style={{color:'white'}}>{comment}</Text>  */}
                <Text style = {{color:'white'}}>
                <Text style={{fontWeight:'bold',color:'white'}} > Comment {index+1}  </Text>
                    {comment}
                </Text>
            </View>
        ))}
    </> 
)
const styles = StyleSheet.create({
    story:{
        width:35,
        height:35,
        borderRadius:50,
        marginLeft: 5,
        borderWidth:1.6,
        borderColor:'#ff8501'

    },
    footerIcon:{
        width:26,
        height:26,
        tintColor: "white",
        

    },
    leftFooterIconsContainer:{
        flexDirection:'row',
        width:"30%",
        justifyContent: 'space-between',
    }
})
 
export default Post
