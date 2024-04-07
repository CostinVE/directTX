import React, { useState, useEffect } from "react";
import {View,KeyboardAvoidingView,TextInput,Dimensions,Keyboard, Alert, } from "react-native";
import { Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "../../redux-store/store";

import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import DMsMessageList from "./DMsMessageList";



export const ChatActive = () => {


  const userID = auth.currentUser.uid

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); // State to track if user is typing
  const dmPartner = useSelector((state) => state.ChatPartner);
  const dispatch = useDispatch();

  const RoomID = useSelector((state) => state.RoomID);

  const chatRoomRef = doc(db, 'Chats', RoomID);
  
  // Reference to the "Messages" subcollection
  const messagesCollectionRef = collection(chatRoomRef, 'Messages');

  const AvatarSvgXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg fill=none stroke="white" stroke-width=5px viewBox="0 -40 70 140">
    <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
    <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
    </svg>`;

  const { width: screenWidth } = Dimensions.get("window");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsTyping(true); // Set isTyping to true when keyboard is opened
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsTyping(false); // Set isTyping to false when keyboard is closed
      }
    );return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    const trimmedMessage = message.trim(); // Trim the message
  
    if (typeof trimmedMessage === "string" && trimmedMessage !== "" && RoomID !== "") {
      try {

        const newMessageRef = await addDoc(messagesCollectionRef, {
          Text: trimmedMessage,
          Timestamp: serverTimestamp(),
          User: userID // Assuming userID is available in your Redux store
        });
  
        // Clear the input field after submitting the message
        setMessage('');
        // Reset isTyping state
        setIsTyping(false);
  
        console.log("Message added successfully with ID: ", newMessageRef.id);
      } catch (error) {
        console.error("Error adding message:", error);
      }
    }
  };

  
  

  return (
    <View style={{ width: "100%", flex: 8, backgroundColor: "#20232a" }}>
      <View style={{position: "fixed",flexDirection: "row",marginTop: "6%",justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
<Button
  icon={({ color, size }) => (
    <Icon name="arrow-left" color="white" size={25} />
  )}
/>
<View
  style={{width: 32,height: 30,backgroundColor: "#20232a",marginTop: "4%",borderRadius: 50,borderColor: "white",borderWidth: 1,}}>
  <SvgXml xml={AvatarSvgXml} width="25" height="25" style={{ backgroundColor: "transparent" }}/>
</View>
<Text
  variant="titleMedium"
  style={{ color: "white", marginTop: "4%" }}
>
  {dmPartner}
</Text>
</View>
<View style={{ flexDirection: "row" }}>
<Button
  icon={({ color, size }) => (
    <Icon name="phone-in-talk" color="white" size={20} backgroundColor="#343a47" style={{ borderRadius: 20, padding: 4 }}
    />
  )}
/>
<Button
  icon={({ color, size }) => (
    <Icon name="video" color="white" size={20} backgroundColor="#343a47" style={{ borderRadius: 20, padding: 4 }}
    />
  )}
/>
</View>
      </View>
      <View style={{ flex: 1, flexDirection: "column", overflow: "scroll" }}>
     <DMsMessageList/>
      </View>
      <View style={{height: isTyping ? "calc(6% + 8%)" : "6%", flexDirection: "row",justifyContent: "center",marginBottom: isTyping ? "8%" : "0%", }}>
        {/* Render different button based on isTyping state */}
        {isTyping ? (
<Button
  icon={({ color, size }) => ( <Icon   name="send"   color="white"   size={35}   backgroundColor="#343a47"   style={{ borderRadius: 50, padding: 5, marginRight: -25, marginLeft: 20,   }} />
  )}
  onPress={handleSubmit}
/>
        ) : (
<Button
  icon={({ color, size }) => (<Icon  name="plus"  color="white"  size={35}  backgroundColor="#343a47"  style={{borderRadius: 40,padding: 4,marginRight: -25,marginLeft: 20,  }}/>
  )}
  onPress={() => {
    // Functionality when "plus" button is pressed
  }}
/>
        )}
        <Button
icon={({ color, size }) => (
  <Icon name="emoticon-happy" color="white" size={45} />
)}
        />
        <TextInput
value={message}
onChangeText={(text) => setMessage(text)}
onFocus={() => setIsTyping(true)} // Set isTyping to true when TextInput is focused (keyboard is opened)
onBlur={() => setIsTyping(false)} // Set isTyping to false when TextInput loses focus (keyboard is closed)
onSubmitEditing={handleSubmit} // Submit message when "send" button is pressed
placeholder="Message @username"
placeholderTextColor="#a7aab0"
style={{ color: "white", backgroundColor: "#343a47", borderRadius: 20, padding: 6, textAlign: "center",}}/>

        <Button
icon={({ color, size }) => (
  <Icon
    name="microphone"
    color="white"
    size={35}
    backgroundColor="#343a47"
    style={{ borderRadius: 40, padding: 4, marginRight: 20 }}
  />
)}
        />
      </View>
    </View>
  );
};
