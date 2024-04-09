import React, { useState, useEffect } from "react";
import { View, StatusBar, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";


export const CallActive= () => {

    const RoomID = useSelector((state) => state.RoomID);

    const ChatPartner= useSelector((state) => state.ChatPartner)
  
   

    const AvatarSvgXml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <svg fill=none stroke="white" stroke-width=5px viewBox="0 -40 90 140">
      <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
      <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
      </svg>`;
  
   
    
  
    return (
        <View style={{ flex:1, backgroundColor: '#20232a'}}>
        {/* Hide the status bar */}
        <StatusBar hidden />
  
        {/* Your custom view */}
          <View style={{ flexDirection: 'row', padding: 10, marginTop:15, width:'95%', justifyContent:"space-between", alignSelf:"center", backgroundColor: "#181b21", borderRadius:20 }}>
            <View style={{flexDirection:"row"}}><Button icon={({ color, size }) => (
  <Icon name="chevron-down" color="white" size={25} />
)} />
            <Text variant="titleMedium" style={{ color: "white", marginTop: 8 }}>{ChatPartner}</Text>
            </View>
            <View><Button icon={({ color, size }) => (
  <Icon name="volume-high" color="white" size={25} />
)} />
</View>
  </View>
  <View style={{ marginTop:"10%" }}>
  <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: "#181b21", height:'40%', borderRadius: 10, marginHorizontal: 10 }}>
    <SvgXml xml={AvatarSvgXml} width="75" height="100" style={{ backgroundColor: "transparent" }} />
  </View>
  <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: "#181b21", height:'40%', borderRadius: 10, marginHorizontal: 10, marginTop: 10 }}>
    <SvgXml xml={AvatarSvgXml} width="75" height="100" style={{ backgroundColor: "transparent" }} />
  </View>
</View>
<View style={{ flexDirection: 'row', padding: 10, marginTop:-30, width:'95%', justifyContent:"space-evenly", alignSelf:"center", backgroundColor: "#181b21", borderRadius:20 }}>
<Button icon={({ color, size }) => (
  <Icon name="video-off" color="white" size={35} style={{marginTop:5, backgroundColor:"#343a47", padding:5, borderRadius:40}} />
)} />
<Button icon={({ color, size }) => (
  <Icon name="microphone" color="black" size={35} style={{marginTop:5, backgroundColor:"white", padding:5, borderRadius:40}} />
)} />
<Button icon={({ color, size }) => (
  <Icon name="chat" color="#a5a5c2" size={35} style={{marginTop:5, backgroundColor:"#343a47", padding:5, borderRadius:40}} />
)} />
<Button icon={({ color, size }) => (
  <Icon name="phone-hangup" color="white" size={35} style={{marginTop:5, backgroundColor:"red", padding:5, borderRadius:40}} />
)} />
</View>
      </View>
    );
  };

  export default CallActive