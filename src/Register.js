import React, { useState } from 'react'
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Text } from 'react-native-paper';
import { Button } from "react-native-paper";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleCreateAccount = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }
};



  return (
    <View style={{backgroundColor: '#20232a', flex: 1, justifyContent: "space-between", alignItems:"center"}}>
      <StatusBar style='auto' />
      <View style={{flex: 0.2, justifyContent:'flex-end', alignItems:"center"}}>
        
      </View>
      <View style={{width: "100%", justifyContent:"center", alignItems:"center"}}>
      <Text variant="headlineMedium" style={{color:"white", fontWeight:"700", marginBottom:"5%"}}>Enter your credentials</Text>
      <TextInput placeholder="Email Address" value={email} backgroundColor="white"   style={{ marginBottom: 10 , marginTop: 10, width:"90%", padding: 12, borderRadius: 14  }} onChangeText={(text) => setEmail(text)}/>
      <TextInput placeholder="Password" value={password} backgroundColor="white"   style={{ marginBottom: 10 , marginTop: 10, width:"90%", padding: 12, borderRadius: 14 }} onChangeText={(text) => setPassword(text)}/>
      <TextInput placeholder="Username" value={username} backgroundColor="white"   style={{ marginBottom: 10 , marginTop: 10, width:"90%", padding: 12, borderRadius: 14  }} onChangeText={(text) => setUsername(text)}/>
      </View> 
      <Button mode="elevated" textColor="black" buttonColor="#66ff66"  contentStyle={{ padding: 4,}}  style={{ marginBottom: 10 , width:"90%"}} onPress={handleCreateAccount}  >
    Create Account
  </Button>
    </View>
  )
}
