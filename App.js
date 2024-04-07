import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';


import { Welcome } from './src/Welcome';
import {Register} from './src/Register'; // Import Register component without curly braces
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SignIn } from './src/SignIn';
import { Homepage } from './src/Homepage';

import { Provider as StoreProvider} from 'react-redux';
import store from './redux-store/store';
import { ChatActive } from './src/Feeds/ChatActive';
import { useDispatch, useSelector} from 'react-redux'
import { updateUserData } from './redux-store/actions';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{
          headerShown: false // Hide the header for the SignIn screen
}}/>
      <Stack.Screen name="Register" component={Register} options={{
          headerShown: false // Hide the header for the SignIn screen
}}/>
<Stack.Screen name="SignIn" component={SignIn} options={{
          headerShown: false // Hide the header for the SignIn screen
}}/>
<Stack.Screen name="Homepage" component={Homepage} options={{
          headerShown: false // Hide the header for the SignIn screen
}}/>
<Stack.Screen name="ChatActive" component={ChatActive} options={{
          headerShown: false // Hide the header for the SignIn screen
}}/>
    </Stack.Navigator>
  );
}

export default function App() {

 
  return (
    <StoreProvider store={store}>
    <PaperProvider>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </PaperProvider>
    </StoreProvider>
  );
}


