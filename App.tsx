import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLayout from './app/_layout'; // Adjust the path if necessary
import AppLoading from 'expo-app-loading';
import { useFonts, JosefinSans_400Regular, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { SavedStateProvider } from './app/(tabs)/SavedStateContext';

const App = () => {
  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SavedStateProvider>
    <NavigationContainer>
      <AppLayout />
    </NavigationContainer>
    </SavedStateProvider>
  );
}
