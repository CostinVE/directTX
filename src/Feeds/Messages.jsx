import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, query, orderByChild, equalTo, get, set} from 'firebase/database';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { auth, db } from "../../firebase"
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { SvgXml } from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../redux-store/actions';


// Get the Firebase Realtime Database reference from the existing Firebase configuration
const database = getDatabase();

export const Messages = ({ user }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userID = auth?.currentUser?.uid

  const RoomID = useSelector((state) => state.RoomID);

  const AvatarSvgXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg fill=none stroke="white" stroke-width=5px viewBox="0 -20 100 160">
      <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
      <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
    </svg>
  `;

  const handleSearch = async (text) => {
    try {
      // Update the search text
      setSearchText(text);
  
      // Reference to the 'users' node in the realtime database
      const usersRef = ref(database, 'Users');
      // Create a query to order the results by child 'username' and filter by 'searchText'
      const q = query(usersRef, orderByChild('username'), equalTo(text));
      // Execute the query and get the result
      const usersSnapshot = await get(q);
  
      if (usersSnapshot.exists()) {
        // Convert the snapshot to an array of user objects
        const usersData = usersSnapshot.val();
        const usersArray = Object.values(usersData);
        // Set the search results
        setSearchResults(usersArray);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  

  const displayResults = () => {
    if (searchResults.length > 0) {
      return searchResults.map((user, index) => (
        <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#343a47", padding: 10, width: "90%", alignSelf: "center", borderRadius: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => handleChat(user)}>
              <View style={{ width: 35, height: 35, backgroundColor: "#20232a", borderRadius: 50, borderColor: "white", borderWidth: 2 }}>
                <SvgXml xml={AvatarSvgXml} width="35" height="35" style={{ backgroundColor: "transparent" }} />
              </View>
            </TouchableOpacity>
            <Text style={{ color: "white", marginTop: "6%" }}>{user.username}</Text>
          </View>
        </View>
      ));
    } else {
      return <Text style={{ color: "white" }}>No matching usernames found</Text>;
    }
  };

  const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };


  const handleChat = async (user) => {
    try {
        if (!user) {
            console.error('Error: User object is undefined');
            return;
        }

        // Create a new RoomID
        const RoomID = generateRandomString(12); // Implement generateRandomString function to generate a random string

        // Reference to the 'Chats' collection in Firestore
        const chatsCollectionRef = collection(db, 'Chats');

        // Reference to the new document using RoomID as the document ID
        const newChatDocRef = doc(chatsCollectionRef, RoomID);

        const partnerID = user.userID

        // Set the chat room details to Firestore with RoomID as the document ID
        await setDoc(newChatDocRef, {
            RoomID: RoomID,
            ProfilePicA: '',
            ProfilePicB: '',
            UserA: userID,
            UserB: partnerID
        });

        // Update Redux state
        dispatch(updateUserData({ isChating: true, ChatPartner: user.username, RoomID: RoomID }));
        navigation.navigate('ChatActive')
    } catch (error) {
        console.error('Error creating chat room:', error);
    } 
};



  
  return (
    <View style={{ width: '100%', flex: 8, backgroundColor: '#20232a'}}>
      <View style={{ height:"10%", width: '95%', marginTop:"8%", flexDirection:"row", justifyContent:"space-between",  alignItems:"center", alignSelf:"center", borderRadius:12 }}>
        <View>
          <Text style={{color:"white", fontSize:20}}>Messages</Text>
        </View>
        <View style={{flexDirection:"row",  justifyContent:"center"}}>
          <Button icon={({ color, size }) => (
            <Icon name="email" color="white" size={20} style={{marginRight:-20}} />
          )} />
          <Button style={{backgroundColor:"#343a47", height:40}} icon={({ color, size }) => (
            <Icon name="account-plus-outline" color="white" size={20}  /> 
          )} > <Text style={{color:"white", fontSize:16,}}>Add Friends</Text></Button>
        </View>
      </View>
      <TextInput 
        placeholder='  Search' 
        placeholderTextColor='white' 
        textColor='white'  
        backgroundColor="#15161a" 
        style={{width:"95%", alignSelf:"center", color:"white",  borderRadius: 20, padding:6, marginBottom:"5%"}} 
        value={searchText} 
        onChangeText={(text) => handleSearch(text)} 
      />
      <View>{displayResults()}</View>
    </View>
  );
};
