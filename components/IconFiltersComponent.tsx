// components/IconFiltersComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


type Filter = {
  label: string;
  icon: keyof typeof FontAwesome.glyphMap;
  navigateTo?: string;
};


const iconFilters: Filter[] = [
  { label: 'Budget', icon: 'money', navigateTo: 'Budget' },
  { label: 'Location', icon: 'map-marker', navigateTo: 'LocationStack' },
  { label: 'Event Type', icon: 'birthday-cake', navigateTo: 'Event Type' },
];


const IconFiltersComponent = () => {
  const navigation = useNavigation();


  const handleIconPress = (filter: Filter) => {
    if (filter.navigateTo) {
      navigation.navigate(filter.navigateTo);
    }
  };


  return (
    <View style={styles.filterIconsContainer}>
      {iconFilters.map((filter) => (
        <TouchableOpacity key={filter.label} onPress={() => handleIconPress(filter)}>
          <View style={styles.filterIcon}>
            <FontAwesome name={filter.icon} size={40} color="black" />
            <Text style={styles.filterLabel}>{filter.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  filterIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  filterIcon: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginLeft: 30
  },
  filterLabel: {
    marginTop: 8,
    fontSize: 14,
    color: 'black',
  },
});


export default IconFiltersComponent;


