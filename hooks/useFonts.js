// hooks/useFonts.js
import * as Font from 'expo-font';
import {
  JosefinSans_400Regular,
  JosefinSans_700Bold,
} from '@expo-google-fonts/josefin-sans';
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export const useFonts = () => {
  const [fontsLoaded] = Font.useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  return fontsLoaded;
};
