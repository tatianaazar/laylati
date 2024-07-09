import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './(tabs)/_layout'; // Adjust the path if necessary

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{ headerShown: false }}
        />
        {/* Other Stack Screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
