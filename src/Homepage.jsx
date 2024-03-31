import React, {useState, useEffect} from 'react'
import { StatusBar } from "expo-status-bar";
import { View, Text, Button, TouchableOpacity} from "react-native";


import { Path, Ellipse} from 'react-native-svg';
import Svg, { Xml, SvgXml} from 'react-native-svg';
import CommunitySvg from '../assets/Community.svg'; //
import { LoadingScreen } from './LoadingScreen';
import { Profile } from './Feeds/Profile';




export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('You');

  const handleClick = (option) => {
    switch (option) {
      case 'You':
        setSelectedTab('You');
        break;
      case 'Notifications':
        setSelectedTab('Notifications');
        break;
      case 'Messages':
        setSelectedTab('Messages');
        break;
      case 'Communities':
        setSelectedTab('Communities');
        break;
      default:
        break;
    }
  };
  

  const communitySvgXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg fill="#9292ad" viewBox="0 0 160 100">
      <ellipse class="cls-1" cx="128.59" cy="23.7" rx="17.9" ry="16.94"/>
      <ellipse class="cls-1" cx="24.53" cy="23.7" rx="17.9" ry="16.94"/>
      <path class="cls-1" d="m143.59,50.28c-9.98-7.28-24.61-8.19-35.06-.26-4.73,3.59-8.08,8.6-9.83,14.2-13.02-6.4-29.24-6.86-42.57.25-2.15-5.23-5.71-9.82-10.46-13.09-10.18-7-24.83-7.51-35.06.71C-.6,61.1-3.52,78.16,4.72,91.62l30.24-.98c-3.91,12.83-2.48,27.61,5.3,40.36l79.34-.65c6.42-13.58,6.6-28.47,1.74-41.08l31.07-.15c6.83-13.85,2.81-30.36-8.82-38.84Z"/>
      <ellipse class="cls-1" cx="76.56" cy="26.64" rx="28.15" ry="26.64"/>
    </svg>
  `;

  const BellSvgXml=`
  <?xml version="1.0" encoding="UTF-8"?>
  <svg fill="#9292ad" viewBox="0 0 80 100">
  <path class="cls-1" d="m83.1,66.93c-7.48-13.11,7.32-26.13,2.5-39.72-3.68-10.37-16.84-15.66-28.29-17.73-.11-1.5-.51-3.16-1.53-4.69-3.75-5.62-13.85-6.54-18.32-1.45-1.37,1.56-2.36,3.86-2.44,6.07-13.18,2.33-26.39,8.7-29.15,18.76-3.25,11.84,10.25,20.44,5.53,33.75-3.36,9.46-12.35,11.26-11.33,15.33.96,3.81,9.63,5.35,44.15,5.24,40.87-.13,47.54-2.33,48.1-5.28.55-2.93-5.48-3.7-9.23-10.28Z"/>
  <path class="cls-1" d="m48.4,106.29c8.6-1.37,15.66-9.26,16.24-19.06l-38.82.71c1.4,11.98,12.27,19.99,22.59,18.35Z"/>
  </svg>
  `

  const MessagesSvgXml=`
  <?xml version="1.0" encoding="UTF-8"?>
  <svg fill="#9292ad" viewBox="0 0 40 40">
  <path class="cls-1" d="m23.2,0C12.63,0,4.07,7.84,4.07,17.52c0,4.02,1.48,7.73,3.97,10.68.27.32.56.63.85.94h0s-2.43,4.1-8.88,6.73l17.05-1.76s0,0,0,0c1.93.6,4,.92,6.15.92,10.57,0,19.13-7.84,19.13-17.52S33.76,0,23.2,0Z"/>
  </svg>
  `

  const AvatarSvgXml=`
  <?xml version="1.0" encoding="UTF-8"?>
  <svg fill=none stroke="#9292ad" stroke-width=5px viewBox="0 0 85 90">
  <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
  <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
  </svg>
  `

  useEffect(() => {
    // Simulate data loading delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={{ flex: 1, backgroundColor: '#20232a' }}>
        {/* Profile Component */}
        <View style={{ flex: 11, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Profile />
        </View>
    
          <View style={{ backgroundColor: '#35344a', flex: 1.5, flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            {/* Navigation bar */}
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', padding: 0 }}
              onPress={() => handleClick('Communities')}
            >
              <SvgXml xml={communitySvgXml} width={80} height={25} fill={selectedTab === 'Communities' ? '#fff' : '#9292ad'} />
              <Text style={{ color: selectedTab === 'Communities' ? '#fff' : '#9292ad', marginTop: 10 }}>Communities</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', padding: 0 }}
              onPress={() => handleClick('Messages')}
            >
               <SvgXml xml={MessagesSvgXml} width={80} height={25} fill={selectedTab === 'Messages' ? '#fff' : '#9292ad'}/>
              <Text style={{ color: selectedTab === 'Messages' ? '#fff' : '#9292ad', marginTop: 10 }}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', padding: 0 }}
              onPress={() => handleClick('Notifications')}
            >
              <SvgXml xml={BellSvgXml} width={80} height={25} fill={selectedTab === 'Notifications' ? '#fff' : '#9292ad'}/>
              <Text style={{ color: selectedTab === 'Notifications' ? '#fff' : '#9292ad', marginTop: 10, marginLeft: 5 }}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', padding: 0 }}
              onPress={() => handleClick('You')}
            >
              <SvgXml xml={AvatarSvgXml} width={80} height={25} stroke={selectedTab === 'You' ? '#fff' : '#9292ad'} />
              <Text style={{ color: selectedTab === 'You' ? '#fff' : '#9292ad', marginTop: 10 }}>You</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};