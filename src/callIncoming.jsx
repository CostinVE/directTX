import React, { useState, useEffect } from "react";
import { View, StatusBar, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../redux-store/actions";
import { useNavigation } from "@react-navigation/native";

import {ref,set,
  get,
  child,
  orderByChild,
  equalTo,
  query,
  getDatabase,
  } from 'firebase/database';
  

export const CallIncoming = () => {

    const ChatPartner = useSelector((state) => state.ChatPartner);

    const database = getDatabase()
    
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const handleCallRequest = async () => {
      try {
        // Reference to the 'Users' node in the Realtime Database
        const usersRef = ref(database, 'Users');
    
        // Query the database to find the user with the matching username
        const q = query(usersRef, orderByChild('username'), equalTo(dmPartner));
    
        // Execute the query and get the result
        const snapshot = await get(q);
    
        if (snapshot.exists()) {
          // User object found, extract the userID
          const userData = snapshot.val();
          const userKey = Object.keys(userData)[0]; // Assuming there's only one matching user
          const userID = userData[userKey].userID;
    
          // Reference to the 'Calls' node in the Realtime Database
          const callsRef = ref(database, 'Calls');
    
          // Create a new object within the 'Calls' node with RoomID as the name
          await set(child(callsRef, RoomID), {
            // Add any initial properties you want for the room
            participants: {
              [userID]: true, // Add the user who initiated the call
            },
            // Add more properties as needed
          });
    
          console.log(`Call room created with ID: ${RoomID}`);
    
          // Navigate to the call screen
          navigation.navigate('CallActive');
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    const handleCall = async () => {
      // Call handleCallRequest to get the userID
      handleCallRequest();
      
      // Navigate to the CallActive screen
      navigation.navigate('CallActive');
    };

    const closeCall = () => {
       dispatch(updateUserData({ isCalled: false }));
    }
     

    const AvatarSvgXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg fill=none stroke="white" stroke-width=5px viewBox="0 -40 70 160">
  <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
  <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
  </svg>`;

  return (
    <View style={{flexDirection:"row", padding:5, borderRadius:20, top:"5%", alignSelf:"center", backgroundColor:"#343a47", opacity:0.8, zIndex:20, width:"95%", justifyContent:"space-evenly", position:"absolute"}}>
         <SvgXml xml={AvatarSvgXml} width="50" height="50" style={{ backgroundColor: "transparent" }} />
         <Text variant="titleSmall" style={{color:"white"}}>{ChatPartner}</Text>
         <Button onPress={handleCall} icon={({ color, size }) => (
  <Icon name="phone-check" color="white" size={35} style={{marginTop:5, backgroundColor:"green", padding:5, borderRadius:40}} />
)} />
         <Button onPress={closeCall} icon={({ color, size }) => (
  <Icon name="phone-hangup" color="white" size={35} style={{marginTop:5, backgroundColor:"red", padding:5, borderRadius:40}} />
)} />
    </View>
  )
}
