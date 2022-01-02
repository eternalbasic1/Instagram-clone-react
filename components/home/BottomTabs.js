import React,{ useState } from 'react'
import { View,StyleSheet,Image,TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'

export const bottomtabicons = [
    {
        name:"Home",
        active :'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        inactive : 'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png'
    },
    {
        name:"Search",
        active :'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive : 'https://img.icons8.com/ios/500/ffffff/search--v1.png'
    },
    {
        name:"Reels",
        active :'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
        inactive : 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png'

    },
    {
        name:"Shop",
        active :'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
        inactive : 'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png'

    },
    {
        name:"Profile",
        active :'https://images.unsplash.com/photo-1518793903-5137f565f6ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGxvdmVyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        inactive : 'https://images.unsplash.com/photo-1518793903-5137f565f6ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGxvdmVyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60s'
    },


]


const BottomTabs = ({icons}) => {
    const [activeTab,setActiveTab] = useState('Home')
    
    const Icon = ({icon}) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image source ={{uri: activeTab === icon.name? icon.active : icon.inactive}} 
            style = {[
                styles.icon, 
                icon.name ==='Profile' ? styles.profilePic() : null,
                activeTab === 'Profile' && icon.name === activeTab ? styles.profilePic(activeTab) : null,
        ]}
        />
        </TouchableOpacity>
    )
    
  return (
      <View style = {styles.wrapper}>
          <Divider width={1} orientation='vertical'/>
          <View style = {styles.container}>
            {icons.map((icon,index)=>(
                <Icon key={index} icon = {icon}/>
            ))}
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        bottom:'0%',
        zIndex:999,
        backgroundColor:'#000',

    },

    container :{
        flexDirection:"row",
        justifyContent:'space-around',
        height:45,
        paddingTop:10,
    },

    icon:{
      width :30,
      height:30,  
    },
    profilePic: (activeTab ='') => ({
        borderRadius:50,
        borderWidth : activeTab === 'Profile'? 2 : 0,
        borderColor:'#fff', 
    }),
    
    
})

export default BottomTabs
