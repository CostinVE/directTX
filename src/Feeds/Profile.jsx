import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Image, ActivityIndicator,} from "react-native";
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';


export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [memberSinceDate, setMemberSinceDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading indicator

        // Simulate data fetching delay
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a 3-second delay

        // Set fetched data to state
        const fetchedDate = new Date().toDateString(); // Example: Get current date as a string
        setMemberSinceDate(fetchedDate);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []);

  const userName = useSelector(state => state.userName);

  const Bio = useSelector(state => state.Bio)

  const UserNameComponent = () => {
    return (
      <Text variant='titleLarge' style={{ color: "white" }}>{userName}</Text>
    );
  };

  const BioDisplay = () => {
    return (
      <Text variant='bodyMedium' style={{color:"#9292ad"}}>{Bio}</Text>
    )
  }

  const DateDisplay = () => {
    const dateCreated = useSelector(state => state.DateJoined);
  

  
     // Function to format the date to dd/mm/yy
    const formatDate = (timestamp) => {
    const date = new Date(timestamp.toDate());

    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = String(date.getFullYear()).slice(-2); // Extracting the last two digits of the year

    return `${day}/${month}/${year}`;
  };
  
 
    return (
      <Text variant='bodyMedium' style={{ color: "white" }}>{formatDate(dateCreated)}</Text>
    );
  };

    const AvatarSvgXml=`
    <?xml version="1.0" encoding="UTF-8"?>
    <svg fill=none stroke="#9292ad" stroke-width=5px viewBox="0 -30 80 140">
    <ellipse class="cls-1" cx="45.58" cy="26.04" rx="25.66" ry="24.54"/>
    <path class="cls-1" d="m86.74,58.99H5.92c-.47.4-4.24,3.77-4.41,9.76-.18,6.49,3.34,28.44,3.71,28.76h82.59s6.35-38.51-1.06-38.51Z"/>
    </svg>`

    return (
      <View style={{ width: '100%', flex: 8, backgroundColor: '#20232a'}}>
        <View style={{ height:"18%", flexDirection:"row", backgroundColor: "#66ff66", zIndex:20, marginBottom:"25%" }}>
        <View style={{ position: "relative", width: 100, height: 100, backgroundColor: "#20232a", borderRadius: 50, borderColor: "white", borderWidth: 2 , position: "absolute", bottom: -65, marginLeft: 20}}>
    <SvgXml xml={AvatarSvgXml} width="90" height="90" style={{ backgroundColor: "transparent"}} />
  </View>
        </View>
        <View style={{ height:"22%", width: '90%', padding: 20, backgroundColor: "#343a47",  alignSelf:"center", borderRadius:12, marginBottom:"10%" }}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <UserNameComponent />
            <TouchableOpacity onPress={() => copyToClipboard()}><Text variant='titleMedium' style={{color:"#a7aab0",}}>#1234 </Text></TouchableOpacity>
            </View>
            <BioDisplay />
        </View>
        <View style={{ height: "10%", width: '90%', padding: 16, backgroundColor: "#343a47", alignSelf: "center", borderRadius: 12, marginBottom: "15%" }}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" /> // Display loading spinner while data is being fetched
      ) : (
        <>
          <Text variant='titleSmall' style={{ color: "#9292ad" }}>DirectTX Member Since</Text>
          <DateDisplay />
        </>
      )}
    </View>
            <View style={{ height:"8%", width: '90%', flexDirection:"row", justifyContent:"space-between", padding: 16, backgroundColor: "#343a47",  alignSelf:"center", borderRadius:12 }}>
                <Text variant='bodyLarge' style={{color:"#9292ad"}}>Your friends</Text>
                <Button icon={({ color, size }) => (
  <Icon name="alert-circle" color="white" size={15} />
)} />


            </View>
      </View>
    )
  }
  
  
