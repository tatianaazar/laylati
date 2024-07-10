// LocationNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocationScreen from './LocationScreen';
import LocationDetailsScreen from './LocationDetailsScreen';

const Stack = createStackNavigator();

export default function LocationNavigator() {
  return (
    <Stack.Navigator initialRouteName="LocationHome">
      <Stack.Screen name="LocationHome" component={LocationScreen} options={{
          title: ' ',
          headerShown: false,
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'josefin sans',
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} options={{
          title: ' ',
          headerBackTitle: 'Location',
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'josefin sans',
            fontWeight: 'bold',
          },
        }} />
    </Stack.Navigator>
  );
}
