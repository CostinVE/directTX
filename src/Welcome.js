import React, { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { logoSvgXml } from '../assets/LogoSvg';
import { LoadingTopSvgXml } from '../assets/LoadingTopSvg';


export const Welcome = () => {
  const navigation = useNavigation();
  const isSigned = useSelector((state) => state.isSigned);

  

  useEffect(() => {
    if (isSigned) {
        const timeout = setTimeout(() => {
            navigation.navigate('Homepage');
        }, 3000);

        return () => clearTimeout(timeout);
    }
}, [isSigned, navigation]);


  const goToRegister = () => {
    navigation.navigate('Register'); // Navigate to the "Register" screen
  };

  const goToSignIn = () => {
    navigation.navigate('SignIn'); // Navigate to the "Register" screen
  };


  

  return (
    <View style={{backgroundColor: '#20232a', flex: 5, justifyContent: "flex-end", alignItems:"center"}}>
      <StatusBar style='auto' />
      <View style={{flex:1}}></View>
      <View style={{flex:3,}}>
      <SvgXml xml={logoSvgXml} width={300} height={200} />
      </View>
  <Button mode="elevated" textColor="black"  contentStyle={{ padding: 4,}}  style={{ marginBottom: 10 , width:"90%"}} onPress={goToRegister} >
    Register
  </Button>
  <Button mode="elevated" textColor="black" buttonColor="#66ff66"  contentStyle={{ padding: 4,}}  style={{ marginBottom: 10 , width:"90%"}} onPress={goToSignIn} >
    Login
  </Button>
    </View>
  );
};
