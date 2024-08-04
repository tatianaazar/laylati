import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import StarRatingPicker from './StarRatingPicker'; // Adjust the path as necessary
import { useNavigation } from '@react-navigation/native';

const FilterScreen = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [starRating, setStarRating] = useState<string | null>(null);
  const [eventType, setEventType] = useState<string | null>(null);
  const navigation = useNavigation();

  const priceOptions = [
    { label: 'Highest to lowest', value: 'highest' },
    { label: 'Lowest to highest', value: 'lowest' },
  ];

  const eventTypeOptions = [
    { label: 'Wedding', value: 'wedding' },
    { label: 'Engagement', value: 'engagement' },
    { label: 'Baby Shower', value: 'baby_shower' },
    { label: 'Conference', value: 'conference' },
    { label: 'Birthday Party', value: 'birthday_party' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.filterOption}>
        <Text style={styles.filterLabel}>Price</Text>
        <RNPickerSelect
          onValueChange={(value) => setPrice(value)}
          items={priceOptions}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select Price', value: null }}
          Icon={() => <FontAwesome name="caret-down" size={16} color="black" />}
        />
        <Text style={styles.advancedFilters}>Advanced Filters</Text>
      </View>

      <View style={styles.filterOption}>
        <Text style={styles.filterLabel}>Quality</Text>
        <StarRatingPicker selectedValue={starRating} onValueChange={setStarRating} />
      </View>

      <View style={styles.filterOption}>
        <Text style={styles.filterLabel}>Location</Text>
        <TouchableOpacity style={styles.filterDropdown} onPress={() => navigation.navigate('LocationStack')}>
          <Text style={styles.filterDropdownText}>Configure Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterOption}>
        <Text style={styles.filterLabel}>Type</Text>
        <RNPickerSelect
          onValueChange={(value) => setEventType(value)}
          items={eventTypeOptions}
          style={pickerSelectStyles}
          placeholder={{ label: 'Choose Event Type', value: null }}
          Icon={() => <FontAwesome name="caret-down" size={16} color="black" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  filterOption: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  filterDropdownText: {
    fontSize: 16,
  },
  advancedFilters: {
    marginTop: 8,
    fontSize: 12,
    color: 'gray',
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    color: 'black',
    paddingRight: 30, // to ensure the text is not behind the icon
  },
  inputAndroid: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    color: 'black',
    paddingRight: 30, // to ensure the text is not behind the icon
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

export default FilterScreen;
