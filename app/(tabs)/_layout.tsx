import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import TabOneScreen from './TabOneScreen';
import BudgetScreen from './BudgetScreen';
import DashboardScreen from './DashboardScreen';
import EventTypeScreen from './EventTypeScreen';
import FilterScreen from './FilterScreen';
import LocationScreen from './LocationScreen';
import ShoppingCartScreen from './ShoppingCartScreen';
import UpdatesScreen from './UpdatesScreen';
import LocationDetailsScreen from './LocationDetailsScreen';
import LocationNavigator from './LocationNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof FontAwesome>['name'];
          if (route.name === 'Vendors') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Updates') {
            iconName = 'bell';
          } else {
            iconName = 'circle';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Vendors"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Updates"
        component={UpdatesScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function Layout() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          title: ' ',
          headerBackTitle: 'Total Budget',
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'josefin sans',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="LocationStack"
        component={LocationNavigator}
        options={{
          title: ' ',
        }}
      />
      <Stack.Screen
        name="Event Type"
        component={EventTypeScreen}
        options={{
          title: ' ',
          headerBackTitle: 'Event Type',
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'josefin sans',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          title: ' ',
          headerBackTitle: 'Filters',
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'josefin sans',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Shopping Cart"
        component={ShoppingCartScreen}
        options={{
          title: ' ',
          headerBackTitle: 'Your Cart',
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'josefin sans',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Location Details"
        component={LocationDetailsScreen}
        options={{
          title: ' ',
          headerBackTitle: 'Your Cart',
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'josefin sans',
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}
