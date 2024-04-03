import React, {useState, useEffect} from 'react'
import { View, KeyboardAvoidingView, TextInput, Dimensions, Alert} from "react-native";
import { Text, Button,} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { initialState } from '../../redux-store/store';


export const ChatActive = () => {

    const [loading, setLoading] = useState(true);
    const  dmPartner = useSelector(state => state.ChatPartner);

    const AvatarSvgXml=`
    <?xml version="1.0" encoding="UTF-8"?>
    <svg fill=none stroke="white" stroke-width=5px viewBox="0 -40 70 140">
    <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
    <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
    </svg>`

    const { width: screenWidth } = Dimensions.get('window');

    useEffect(() => {
      Alert.alert('Initial State', JSON.stringify(initialState));
    }, []); // Empty dependency array to run only once when the component mounts

 
      return (
        <View style={{ width: '100%', flex: 8, backgroundColor: '#20232a'}}>
              <View style={{position:"fixed",  flexDirection:"row", marginTop:"6%", justifyContent:"space-between"}}>
                <View style={{flexDirection:"row"}}>
              <Button icon={({ color, size }) => (
    <Icon name="arrow-left" color="white" size={25}  />
  )} />
   <View style={{ width: 32, height: 30, backgroundColor: "#20232a", marginTop:"4%", borderRadius: 50, borderColor: "white", borderWidth: 1 ,}}>
    <SvgXml xml={AvatarSvgXml} width="25" height="25" style={{ backgroundColor: "transparent"}} />
   </View>
    <Text variant='titleMedium' style={{ color: 'white', marginTop: '4%' }}>{dmPartner}</Text>
  </View>
     <View style={{flexDirection:"row"}}>
     <Button icon={({ color, size }) => (
    <Icon name="phone-in-talk" color="white" size={20} backgroundColor="#343a47" style={{borderRadius:20, padding:4}} />
  )} />
  <Button icon={({ color, size }) => (
    <Icon name="video" color="white" size={20} backgroundColor="#343a47" style={{borderRadius:20, padding:4}} />
  )} />
     </View>
              </View>
              <View style={{flex:1, flexDirection:"column", overflow:"scroll"}}></View>
              <View style={{ height: '6%', width: screenWidth, flexDirection: 'row', justifyContent: 'center' }}>
              <Button icon={({ color, size }) => (
    <Icon name="plus" color="white" size={35} backgroundColor="#343a47" style={{borderRadius:40, padding:4, marginRight:-25, marginLeft:20}} />
  )} /> 
  <Button icon={({ color, size }) => (
    <Icon name="emoticon-happy" color="white" size={45} />
  )} /> 
   <TextInput placeholder='  Message @username' placeholderTextColor='#a7aab0' textColor='white'  backgroundColor="#343a47" style={{width:"55%", alignSelf:"center", color:"white",  borderRadius: 20, padding:6, textAlign:"center", marginLeft:-20}}></TextInput>
   <Button icon={({ color, size }) => (
    <Icon name="microphone" color="white" size={35} backgroundColor="#343a47" style={{borderRadius:40, padding:4, marginRight:20}} />
  )} /> 
              </View>
              
        </View>
      )
    }