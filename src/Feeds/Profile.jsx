import React, {useState, useEffect} from 'react'
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Image} from "react-native";
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { SvgXml } from 'react-native-svg';


export const Profile = () => {
    const AvatarSvgXml=`
    <?xml version="1.0" encoding="UTF-8"?>
    <svg fill=none stroke="#9292ad" stroke-width=5px viewBox="0 -20 80 140">
    <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
    <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
    </svg>`

    return (
      <View style={{ width: '100%', flex: 8, backgroundColor: '#20232a'}}>
        <View style={{ height:"18%", flexDirection:"row", backgroundColor: "#66ff66", zIndex:20, marginBottom:"15%" }}>
        <SvgXml xml={AvatarSvgXml} width="90" height="90" style={{ backgroundColor:"#20232a", borderRadius:50, borderColor:"white", borderWidth:2, position: "absolute", bottom: -25, marginLeft: 20 }} />
        </View>
        <View style={{ height:"18%", width: '80%', padding: 20, backgroundColor: "#343a47",  alignSelf:"center", borderRadius:12, marginBottom:"10%" }}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text variant='titleLarge' style={{color:"white"}}>Username </Text> 
            <TouchableOpacity onPress={() => copyToClipboard()}><Text variant='titleMedium' style={{color:"#a7aab0",}}>#1234 </Text></TouchableOpacity>
            </View>
            <Text variant='bodyMedium' style={{color:"#9292ad"}}>Bio</Text>
        </View>
        <View style={{ height:"10%", width: '80%', padding: 16, backgroundColor: "#343a47",  alignSelf:"center", borderRadius:12, marginBottom:"15%" }}>
        <Text variant='titleSmall' style={{color:"#9292ad"}}>DirectTX Member Since</Text>
        <Text variant='titleSmall' style={{color:"white"}}>Date</Text>
            </View>
            <View style={{ height:"8%", width: '80%', flexDirection:"row", justifyContent:"space-between", padding: 16, backgroundColor: "#343a47",  alignSelf:"center", borderRadius:12 }}>
                <Text variant='bodyLarge' style={{color:"#9292ad"}}>Your friends</Text>
                <Button icon={({ color, size }) => (
  <Icon name="chevron-right" color="white" size={15} />
)} />


            </View>
      </View>
    )
  }
  
  
