import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { doc, getFirestore, onSnapshot , query, orderBy} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper'
import { SvgXml } from "react-native-svg";

import { ref, query as databaseQuery, orderByChild, equalTo, get, getDatabase } from 'firebase/database';

const DmsMessageList = () => {

  const database = getDatabase()
 
  const AvatarSvgXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg fill=none stroke="white" stroke-width=5px viewBox="0 -40 70 140">
  <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
  <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
  </svg>`;

  const RoomID = useSelector((state) => state.RoomID);
  const [ChatPartner, setChatPartner] = useState('');
  const [messages, setMessages] = useState([]);

  const chatRoomRef = doc(getFirestore(), 'Chats', RoomID);
  const messagesCollectionRef = collection(chatRoomRef, 'Messages');

  useEffect(() => {
    const handleSearch = async (userKey) => {
      try {
        // Reference to the 'Users' node in the Realtime Database
        const usersRef = ref(database, 'Users', userKey);
  
        // Retrieve the user object directly by its key
        const userSnapshot = await get(usersRef);
  
        if (userSnapshot.exists()) {
          // User object found, extract necessary data
          const userData = userSnapshot.val();
          const userObject = userData[userKey];
          const username = userObject ? userObject.username : null;
          setChatPartner(username)
        } else {
          console.log('No user found for the provided key');
        }
      } catch (error) {
        console.error('Error searching users:', error);
      }
    }
  
    // Log the RoomID to ensure it's correct
    console.log('RoomID:', RoomID);
  
    const unsubscribe = onSnapshot(
      query(messagesCollectionRef, orderBy('Timestamp', 'desc')), // Sort by Timestamp field in descending order
      async (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push(doc.data());
        });
        setMessages(fetchedMessages);
  
        // Find chat partner username
        if (fetchedMessages.length > 0) {
          const userFromMessage = fetchedMessages[0].User; // Assuming user is stored in message.User
          console.log('User from message:', userFromMessage);
          await handleSearch(userFromMessage);
        }
      }
    );
  
    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
    };
  }, [RoomID]);
  
  

  return (
    <ScrollView style={{ marginTop: 25, marginLeft: 10 }}>
  {messages.slice().reverse().map((message, index) => (
    <View>
    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <SvgXml xml={AvatarSvgXml} width="25" height="25" style={{ backgroundColor: "transparent" }} />
        <Text variant='titleMedium' style={{ color: "white", marginBottom: 3, marginTop:10 }}>  {ChatPartner}</Text>
      </View>
      <View style={{ flexDirection: 'column', alignSelf: 'flex-start', maxWidth: '90%', marginTop: 10, marginBottom: 5,  padding: 10, backgroundColor: "#343a47", borderRadius: 10 }}>
        <Text variant='bodyLarge' style={{ color: "white" }}>{message.Text}</Text>
      </View>
    </View>
  ))}
</ScrollView>


  
  );
};

export default DmsMessageList;
