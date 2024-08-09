import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Svg, { Path } from 'react-native-svg';

const LocationScreen = () => {
  const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Add a slight delay to ensure GPS data is accurate
        await new Promise(resolve => setTimeout(resolve, 1000));

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest, // Request the highest accuracy possible
          timeout: 10000, // Set a timeout to avoid hanging indefinitely
        });

        if (location) {
          console.log("Location fetched: ", location);
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } else {
          throw new Error('Unable to fetch location');
        }
      } catch (error) {
        console.error("Error fetching location: ", error);
        setErrorMsg('Failed to get your location. Please try again.');
        Alert.alert('Error', 'Failed to get your location. Please check your GPS settings or try again later.');
      }
    };

    getLocation();
  }, []);

  const handleMapPress = (e) => {
    setLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };

  const handleSavePress = () => {
    Alert.alert('Location Saved', 'Your location has been saved successfully.');
    // You can add more logic here, such as making an API call or storing the location elsewhere
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Drop pin to find vendors in the area</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.02,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.02,
        }}
        onPress={handleMapPress} // Move pin to the pressed location
        showsUserLocation={false} // Hide the default blue location pin
      >
        <Marker
          coordinate={location}
        >
          <Svg width="42" height="42" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M25.775 10.5625C24.4625 4.7875 19.425 2.1875 15 2.1875C15 2.1875 15 2.1875 14.9875 2.1875C10.575 2.1875 5.525 4.775 4.2125 10.55C2.75 17 6.7 22.4625 10.275 25.9C11.6 27.175 13.2875 29 14.9875 29C16.6875 29 18.4 27.175 19.7125 25.9C23.2875 22.4625 27.2375 17.0125 25.775 10.5625ZM15 16.825C12.825 16.825 11.0625 15.0625 11.0625 12.8875C11.0625 10.7125 12.825 8.95 15 8.95C17.175 8.95 18.9375 10.7125 18.9375 12.8875C18.9375 15.0625 17.175 16.825 15 16.825Z" fill="#FF5719"/>
          </Svg>
        </Marker>
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={() => setLocation(null)}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 584,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  clearButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
  },
  errorMsg: {
    marginTop: 20,
    color: 'red',
  },
});

export default LocationScreen;
