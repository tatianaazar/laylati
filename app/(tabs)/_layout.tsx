
import ChatsScreen from './ChatsScreen';
import TabBarIcon from '../../components/TabBarIcon';

import VendorIconActive from '../../assets/images/VendorActive.svg';
import VendorIconInactive from '../../assets/images/VendorInactive.svg';
import DashboardIconActive from '../../assets/images/DashboardActive.svg';
import DashboardIconInactive from '../../assets/images/DashboardInactive.svg';
import UpdatesIconActive from '../../assets/images/UpdatesActive.svg';
import UpdatesIconInactive from '../../assets/images/UpdatesInactive.svg';
import ChatsIconActive from '../../assets/images/ChatsActive.svg';
import ChatsIconInactive from '../../assets/images/ChatsInactive.svg';
import { SvgProps } from 'react-native-svg';
import { useFonts, JosefinSans_400Regular, JosefinSans_600SemiBold, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { RootStackParamList } from './types/types';

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
import VendorListScreen from './VendorListScreen';
import VendorDetailsScreen from './VendorDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent: React.FC<SvgProps>;
          if (route.name === 'Vendors') {
            IconComponent = focused ? VendorIconActive : VendorIconInactive;
          } else if (route.name === 'Dashboard') {
            IconComponent = focused ? DashboardIconActive : DashboardIconInactive;
          } else if (route.name === 'Updates') {
            IconComponent = focused ? UpdatesIconActive : UpdatesIconInactive;
          } else if (route.name === 'Chats') {
            IconComponent = focused ? ChatsIconActive : ChatsIconInactive;
          }

          return <TabBarIcon IconComponent={IconComponent} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#580A88',
        tabBarInactiveTintColor: '#35383F',
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
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function Layout() {

  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_600SemiBold,
    JosefinSans_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
        options={({ route }) => ({
          title: 'Total Budget',
          headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: 'black',
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Montserrat_500Medium',
            fontWeight: 'bold',
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
        })}
      />
      
      <Stack.Screen
        name="EventType"
        component={EventTypeScreen}
        options={({ route }) => ({
          title: 'Choose Your Event Type',
          headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: route.params?.isSaved ? 'green' : 'black',
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Montserrat_500Medium',
            fontWeight: 'bold',
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
        })}
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
        name="ShoppingCart"
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
        name="Location"
        component={LocationScreen}
        options={{
          title: 'Location',
          headerBackTitle: ' ',
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'josefin sans',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="VendorList"
        component={VendorListScreen}
        options={{
          title: ' ',
          headerBackTitle: ' ',
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
          },
        }}
      />
    

<Stack.Screen
name="VendorDetails"
component={VendorDetailsScreen}
options={{
  title: ' ',
  headerBackTitle: ' ',
  headerBackTitleStyle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
}}
/>
</Stack.Navigator>
  );
}