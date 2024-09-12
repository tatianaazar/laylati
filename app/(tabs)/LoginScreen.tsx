import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../../context/CartContext';
const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state to store error messages 
  const [loading, setLoading] = useState(true)

  // Store the token in AsyncStorage
  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const handleSignIn = async () => {
    if (!email) {
      setErrorMessage('Email is required.');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    setLoading(true); // Set loading to true when starting the login process

    try {
      const response = await axios.post('http://192.168.1.250:5000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;

        if (token) {
          await storeToken(token);
          navigation.navigate('Main'); // Navigate to the main screen
        } else {
          setErrorMessage('Token not received.');
        }
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 || status === 401) {
          setErrorMessage(data.msg || 'Invalid credentials.');
        } else {
          setErrorMessage(data.msg || 'An error occurred. Please try again.');
        }
      } else if (error.request) {
        setErrorMessage('No response from server. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading once the request is completed
    }
  };

  const goToSignIn = () => {
    navigation.navigate('SignUp');
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
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage(''); // Clear error message when user starts typing
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#999"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage(''); // Clear error message when user starts typing
          }}
        />

        {/* Display the error message if it exists */}
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialIconsContainer}>
        {/* Social login buttons here */}
      </View>
      <TouchableOpacity onPress={goToSignIn}>
        <Text style={styles.signUpText}>Don't have an account? Sign up.</Text>
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
  forgotPasswordText: {
    textAlign: 'right',
    marginBottom: 30,
    color: '#79747E',
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
  signUpText: {
    color: '#000000',
    marginTop: 70,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
});

export default LoginScreen;
