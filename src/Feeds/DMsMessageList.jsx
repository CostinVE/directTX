import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const DmsMessageList = () => {
  const RoomID = useSelector((state) => state.RoomID);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatRoomRef = doc(getFirestore(), 'Chats', RoomID);
    const messagesCollectionRef = collection(chatRoomRef, 'Messages');

    const unsubscribe = onSnapshot(messagesCollectionRef, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push(doc.data());
      });
      setMessages(fetchedMessages);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
    };
  }, [RoomID]);

  return (
    <View>
      <Text>Message List:</Text>
      {messages.map((message, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 10 }}>Text: {message.Text}</Text>
          <Text style={{ marginRight: 10 }}>Timestamp: {message.Timestamp?.toDate().toLocaleString()}</Text>
          <Text>User: {message.User}</Text>
        </View>
      ))}
    </View>
  );
};

export default DmsMessageList;
