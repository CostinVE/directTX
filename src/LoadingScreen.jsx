import React, { useEffect, useRef } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Animated,} from "react-native";
import { SvgXml } from 'react-native-svg';

import { LoadingTopSvgXml } from '../assets/LoadingTopSvg';
import { LoadingBottomSvgXml } from '../assets/LoadingBottomSvg';
import { logoSvgXml } from '../assets/LogoSvg';

export const LoadingScreen = () => {

    const translateX = useRef(new Animated.Value(300)).current;
  const opacity = useRef(new Animated.Value(1)).current;



  const animateLoading = () => {
    Animated.sequence([
      // Move from right to left
      Animated.timing(translateX, {
        toValue: -300,
        duration: 1500,
        useNativeDriver: true,
      }),
      // Disappear
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // Move from left to right
      Animated.timing(translateX, {
        toValue: 300,
        duration: 0,
        useNativeDriver: true,
      }),
      // Appear again
      Animated.timing(opacity, {
        toValue: 4,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After the sequence completes, call animateLoading again recursively
      animateLoading();
    });
  };
  
  useEffect(() => {
    animateLoading(); // Start the animation loop
  }, []); // Run only once when component mounts

  const translateXTop = useRef(new Animated.Value(-300)).current;
  const opacityTop = useRef(new Animated.Value(1)).current;

const animateLoadingTop = () => {
  Animated.sequence([
    // Move from left to right
    Animated.timing(translateXTop, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: true,
    }),
    // Disappear
    Animated.timing(opacityTop, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
    // Move back to left
    Animated.timing(translateXTop, {
      toValue: -300,
      duration: 0,
      useNativeDriver: true,
    }),
    // Appear again
    Animated.timing(opacityTop, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }),
  ]).start(() => {
    // After the sequence completes, call animateLoadingTop again recursively
    animateLoadingTop();
  });
};

useEffect(() => {
  animateLoadingTop(); // Start the animation loop for LoadingTopSvgXml
}, []); // Run only once when component mounts

  return (
    <View style={{backgroundColor: '#20232a', flex: 1, justifyContent: "flex-end", alignItems:"center"}}>
    <StatusBar style='auto' />
    <View flex={1} width={300} style={{overflow:"hidden"}}>
      <SvgXml xml={logoSvgXml} width={300} height={180} />
      <Animated.View
  style={{
    transform: [{ translateX: translateXTop }], // Use translateXTop for LoadingTopSvgXml animation
    opacity: opacityTop, // Use opacityTop for LoadingTopSvgXml animation
  }}
>
  <SvgXml xml={LoadingTopSvgXml} width={300} height={60} />
</Animated.View>
      <Animated.View
        style={{
          transform: [{ translateX }],
          opacity,
        }}
      >
        <SvgXml xml={LoadingBottomSvgXml} width={300} height={60} />
      </Animated.View>
      </View>
    </View>
  )
}
