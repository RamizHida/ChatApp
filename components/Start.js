import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  // Set the background of the chatScreen
  const [background, setBackground] = useState('#fff');

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        // navigate to Chat component, passing along object with three properties
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name,
          background,
        });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to Sign In');
      });
  };

  // Possible background colors of Chat Screen
  const backgroundColors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/BackGround.png')}
    >
      <Text style={styles.title}>Chat App</Text>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        <Text style={styles.chooseColorText}>Choose Background Color.</Text>
        <View style={styles.availableColors}>
          {backgroundColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.circles,
                { backgroundColor: color },
                //  if user clicks one of the color buttons, add styling to color button
                background === color && styles.selectedColor,
              ]}
              onPress={() => setBackground(color)}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          // onPress={() =>
          //   navigation.navigate('Chat', { name: name, background: background })
          // }
          onPress={signInUser}
        >
          <Text style={styles.btnText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
      {/* if on ios, add component so bottom part of start screen isn't covered by keyboard*/}
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          style={{ marginBottom: 100 }}
          behavior="padding"
        />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contentContainer: {
    width: '88%',
    backgroundColor: '#fff',
    height: '44%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textInput: {
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#757083',
    alignItems: 'center',
    padding: 20,
    width: '88%',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  availableColors: {
    flexDirection: 'row',
  },
  circles: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    margin: 5,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: '300',
    opacity: 1,
    color: '#757083',
  },
});

export default Start;
