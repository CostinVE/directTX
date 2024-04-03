import React, {useState, useEffect} from 'react'
import { StatusBar } from "expo-status-bar";
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, firestore } from 'firebase/auth';
import { collection, doc, getDoc, exists } from 'firebase/firestore';
import { View, TextInput, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setSignedIn, updateUserData } from '../redux-store/actions';
import { initialState } from '../redux-store/store';

export const SignIn = () => {
  
  const userID = auth?.currentUser?.uid

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();
  const isSigned = useSelector((state) => state.isSigned);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
      });

      return () => unsubscribe();
  }, []);


  const signIn = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch(setSignedIn());

        // Fetch user data from Firestore
        const userID = auth.currentUser.uid;
        const userDocRef = doc(collection(db, 'Users'), userID);
      
        // Get the document snapshot
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            // Update Redux state with user data
            dispatch(updateUserData(userData));

            // Alert to display the properties of InitialState
            const initialStateProperties = JSON.stringify(initialState, null, 2);
            Alert.alert('Initial State Properties', initialStateProperties);
        } else {
            Alert.alert('User not found', 'No matching user data found in Firestore.');
        }
    } catch (error) {
        Alert.alert('Sign in failed', 'Sign in failed: ' + error.message);
    }
};




  

  
    return (
      <View style={{backgroundColor: '#20232a', flex: 1, justifyContent: "space-between", alignItems:"center"}}>
        <StatusBar style='auto' />
        <View style={{flex: 0.2, justifyContent:'flex-end', alignItems:"center"}}>
          
        </View>
        <View style={{width: "100%", justifyContent:"center", alignItems:"center"}}>
        <Text variant="headlineMedium" style={{color:"white", fontWeight:"700", marginBottom:"5%"}}>Sign In to your account</Text>
        <TextInput placeholder="Email Address" value={email} backgroundColor="white"   style={{ marginBottom: 10 , marginTop: 10, width:"90%", padding: 12, borderRadius: 14  }} onChangeText={(text) => setEmail(text)}/>
        <TextInput placeholder="Password" value={password} backgroundColor="white" secureTextEntry  style={{ marginBottom: 10 , marginTop: 10, width:"90%", padding: 12, borderRadius: 14 }} onChangeText={(text) => setPassword(text)}/>
        
        </View> 
        <Button mode="elevated" textColor="black" buttonColor="#66ff66"  contentStyle={{ padding: 4,}}  style={{ marginBottom: 10 , width:"90%"}} onPress={signIn}  >
      Sign In
    </Button>
      </View>
    )
  }