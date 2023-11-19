// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import functions for Firestore initialization
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';

import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';

import { getStorage } from 'firebase/storage';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBBxguA5fQAhl1jWlIkK4vRueEV9KSuXoY',
    authDomain: 'chat-app-22428.firebaseapp.com',
    projectId: 'chat-app-22428',
    storageBucket: 'chat-app-22428.appspot.com',
    messagingSenderId: '684837575255',
    appId: '1:684837575255:web:46494c35f075a82218e112',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  //  implement a real-time network connectivity detection system
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      // disable firestore is not connected to network
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      // enable firestore if connected to network
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        {/* <Stack.Screen name="Chat" component={Chat} /> */}

        <Stack.Screen name="Chat">
          {/* pass database object to Chat component */}
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
