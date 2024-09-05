import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a loading time of 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to the login screen after the splash screen
    }, 5000);

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/laylati-logo.png')} // Replace with your image path
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.7, // Adjust the width as necessary
    height: height * 0.15, // Adjust the height as necessary
    marginBottom: height * 0.15,
  },
});

export default SplashScreen;
