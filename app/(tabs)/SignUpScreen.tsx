import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';

const { width } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages

  const handleSignUp = async () => {
    setErrorMessage(''); // Clear error message before validation

    if (!name) {
      setErrorMessage('Name must not be empty!');
      return;
    }
    if (!email) {
      setErrorMessage('Email must not be empty!');
      return;
    }
    if (!phone_number) {
      setErrorMessage('Phone number must not be empty!');
      return;
    }
    if (!password) {
      setErrorMessage('Password must not be empty!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.250:5000/api/auth/register', {
        name,
        email,
        phone_number,
        password,
      });

      if (response.status === 201) {
        // Redirect to main screen if successful
        navigation.replace('Main'); // Navigate to the main screen
      } else {
        setErrorMessage('Something went wrong, please try again.');
      }
    } catch (error) {
      // Check for email already exists error
      if (error.response && error.response.status === 400) {
        setErrorMessage("There's already an existing LAYLATI account with this email!");
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const goToSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/laylati-logo.png')} // Replace with your image path
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          keyboardType="default"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
          value={phone_number} // Bind to the state variable
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#999"
          value={password} // Bind to the state variable
          onChangeText={setPassword}
        />
        
        {/* Display error message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialIconsContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/googlelogo.png')} // Replace with your Google icon path
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/facebooklogo.png')} // Replace with your Facebook icon path
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/applelogo.png')} // Replace with your Apple icon path
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={goToSignIn}>
        <Text style={styles.signUpText}>Already have an account? Sign in.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: 100,
    marginBottom: 50,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: '#F1F1F1',
  },
  signInButton: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E6CBF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signInButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialIcon: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
  signUpText: {
    color: '#000000',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SignUpScreen;
