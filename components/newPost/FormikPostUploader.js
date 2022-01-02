import React,{useState,useEffect} from 'react'
import { View, Text,TextInput,Image } from 'react-native'
import * as Yup from 'yup' 
import { Formik } from 'formik'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { Button } from 'react-native-elements/dist/buttons/Button'
import validUrl from 'valid-url'
import {db,firebase} from '../../firebase'

const PLACEHOLDER_IMG = 'https://icon-library.com/images/image-placeholder-icon/image-placeholder-icon-6.jpg'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200,'Caption has reached the character limit.')
})

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl,setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser,setCurrentLoggedInUser] = useState(null)
     
    const getUsername = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db.collection('users').where('owner_uid','==',user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture,
                })
            })
        )
        return unsubscribe
    }

    useEffect(()=>{
        getUsername()
    },[])

    const uploadPostToFirebase = (imageUrl,caption)=>{
        const unsubscribe = 
        db.collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('posts')
        .add({
            imageUrl:imageUrl,
            user:currentLoggedInUser.username,
            profilePicture:currentLoggedInUser.profilePicture,
            owner_uid:firebase.auth().currentUser.uid,
            owner_email:firebase.auth().currentUser.email,
            caption:caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users:[],
            comments:[],
        })
        .then(()=>navigation.goBack())
    
        return unsubscribe
    }
    
    
    return (
        <Formik 
        initialValues={{caption:'',imageUrl:''}}
        onSubmit = {values=>{
            uploadPostToFirebase(values.imageUrl,values.caption)
        }}
        validationSchema = {uploadPostSchema}
        validateOnMount = {true}
        >
            {/* caption , url , basically a form , 2inputfeilds*/}
            {({handleBlur,handleChange,handleSubmit,values,errors,isValid})=> 
                <>
                    <View style={{margin:15,justifyContent:'space-between',flexDirection:'row'}}>
                        <Image source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG}} style={{width:100,height:100}}/>
                        <View style ={{flex:1,marginLeft:12 }}>
                            <TextInput 
                            style = {{color:'white',fontSize:19}}
                            placeholder=' Write a caption...' 
                            placeholderTextColor='gray'
                            multiline={true}
                            onChangeText={handleChange('caption')}
                            onBlur={handleBlur('caption')}
                            value={values.caption}
                            /> 
                        </View> 
                    </View>
                    <Divider width={0.2} orientation='vertical'/>
                    <TextInput
                    onChange={(e)=>setThumbnailUrl(e.nativeEvent.text)} 
                    placeholder='Enter Image Url' 
                    placeholderTextColor='gray'
                    onChangeText={handleChange('imageUrl')}
                    onBlur={handleBlur('imageUrl')}
                    value={values.imageUrl}
                    style = {{color:'white',fontSize:17,}}
                    />
                    {errors.imageUrl && (
                        <Text style={{fontSize:10,color:'red'}}>
                            {errors.imageUrl}
                        </Text>
                    )}
                    <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                </>
            }

        </Formik>
    )
}

export default FormikPostUploader
