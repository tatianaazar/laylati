import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './(tabs)/_layout'; // Adjust the path if necessary
import TabOneScreen from '(tabs)/TabOneScreen';

const Stack = createStackNavigator();

export default function AppLayout() {
  return (
    <Stack.Navigator initialRouteName="(tabs)">
      <Stack.Screen
        name="(tabs)"
        component={(Tabs)}
        options={{ headerShown: false }}
      />
      {/* Other Stack Screens */}
    </Stack.Navigator>
  );
}
