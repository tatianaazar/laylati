import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        if (!email) {
            Alert.alert('Error', 'Email is required.');
            return;
        }
        if (!password) {
            Alert.alert('Error', 'Password is required.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.250:5000/api/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Logged in successfully');
                navigation.replace('Main'); // Navigate to the main screen
            }
        } catch (error) {
            console.log('Error Response:', error.response);
    
            if (error.response) {
                const { status, data } = error.response;
    
                if (status === 400 || status === 401) {
                    Alert.alert('Error', data.msg || 'Invalid credentials.');
                } else {
                    Alert.alert('Error', data.msg || 'An error occurred. Please try again.');
                }
            } else if (error.request) {
                console.log('Error Request:', error.request);
                Alert.alert('Error', 'No response from server. Please try again later.');
            } else {
                console.log('Error Message:', error.message);
                Alert.alert('Error', 'An error occurred. Please try again.');
            }
        }
    };

    const goToSignIn = () => {
        navigation.navigate('SignUp');
    };

    // Function to handle Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            // Insert Google Sign-In logic here
            const googleToken = 'your-google-token'; // Replace with actual token
            const response = await axios.post('http://192.168.1.250:3000/api/auth/google', { tokenId: googleToken });
            if (response.data.success) {
                Alert.alert('Success', 'Logged in with Google');
                // Handle successful Google login
            } else {
                Alert.alert('Error', 'Google login failed');
            }
        } catch (error) {
            Alert.alert('Error', 'Google login failed');
        }
    };

    // Function to handle Facebook Login
    const handleFacebookSignIn = async () => {
        try {
            // Insert Facebook Sign-In logic here
            const facebookToken = 'your-facebook-token'; // Replace with actual token
            const response = await axios.post('http://192.168.1.250:3000/api/auth/facebook', { accessToken: facebookToken });
            if (response.data.success) {
                Alert.alert('Success', 'Logged in with Facebook');
                // Handle successful Facebook login
            } else {
                Alert.alert('Error', 'Facebook login failed');
            }
        } catch (error) {
            Alert.alert('Error', 'Facebook login failed');
        }
    };

    // Function to handle Apple Sign-In
    const handleAppleSignIn = async () => {
        try {
            // Insert Apple Sign-In logic here
            const appleToken = 'your-apple-token'; // Replace with actual token
            const response = await axios.post('http://192.168.1.250:3000/api/auth/apple', { identityToken: appleToken });
            if (response.data.success) {
                Alert.alert('Success', 'Logged in with Apple');
                // Handle successful Apple login
            } else {
                Alert.alert('Error', 'Apple login failed');
            }
        } catch (error) {
            Alert.alert('Error', 'Apple login failed');
        }
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
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.socialIconsContainer}>
                <TouchableOpacity onPress={handleGoogleSignIn}>
                    <Image
                        source={require('../../assets/images/googlelogo.png')} // Replace with your Google icon path
                        style={styles.socialIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebookSignIn}>
                    <Image
                        source={require('../../assets/images/facebooklogo.png')} // Replace with your Facebook icon path
                        style={styles.socialIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAppleSignIn}>
                    <Image
                        source={require('../../assets/images/applelogo.png')} // Replace with your Apple icon path
                        style={styles.socialIcon}
                    />
                </TouchableOpacity>
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
    socialIcon: {
        width: 60,
        height: 60,
        marginHorizontal: 10,
    },
    signUpText: {
        color: '#000000',
        marginTop: 70,
    },
});

export default LoginScreen;
