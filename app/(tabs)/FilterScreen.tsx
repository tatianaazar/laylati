import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import ShoppingCartSvg from '../../assets/images/bag.svg'; // Your SVG file
import TextFiltersComponent from '../../components/TextFiltersComponent'; // Ensure this path is correct
import StarRatingPicker from './StarRatingPicker'; // Adjust the path as necessary

const FilterScreen = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [starRating, setStarRating] = useState<string | null>(null);
  const navigation = useNavigation();

  const priceOptions = [
    { label: 'Highest to lowest', value: 'highest' },
    { label: 'Lowest to highest', value: 'lowest' },
  ];

  const handleShoppingCartPress = () => {
    navigation.navigate('ShoppingCart');
  };

  const handleLocationPress = () => {
    navigation.navigate('Location');
  };

  // Adding the custom header button only for this screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShoppingCartPress}>
          <ShoppingCartSvg width={24} height={24} style={styles.shoppingCart} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Ensure the TextFiltersComponent is rendered correctly */}
      <View style={styles.textFiltersWrapper}>
        <TextFiltersComponent
          activeFilter={navigation.getState().routes[navigation.getState().index]?.params?.activeFilter || 'featured'}
          setActiveFilter={(filter) => navigation.setParams({ activeFilter: filter })}
        />
      </View>

      <View style={styles.filterContainer}>
        <View style={styles.filterOption}>
          <Text style={styles.filterLabel}>Price</Text>
          <RNPickerSelect
            onValueChange={(value) => setPrice(value)}
            items={priceOptions}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select Price', value: null }}
            Icon={() => <AntDesign name="down" size={16} color="black" />}
          />
        </View>

        <View style={styles.filterOption}>
  <Text style={styles.filterLabel}>Quality</Text>
  <View style={styles.starRatingContainer}>
  <StarRatingPicker
    selectedValue={starRating}
    onValueChange={setStarRating} // Assuming this triggers your star picker logic
  />
  </View>
</View>


        <View style={styles.filterOption}>
          <Text style={styles.filterLabel}>Location</Text>
          <TouchableOpacity style={styles.locationField} onPress={handleLocationPress}>
            <Text style={styles.locationText}>Configure Location</Text>
            <AntDesign name="down" size={16} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  shoppingCart: {
    marginRight: 16,
  },
  textFiltersWrapper: {
    paddingHorizontal: 10, // Adjust as necessary
    marginVertical: 10, // Adjust spacing
    flexDirection: 'row',
    justifyContent: 'center', // Center the component horizontally
  },
  filterContainer: {
    flex: 1,
    paddingTop: 16,
  },
  filterOption: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25, // Rounded edges to match the desired style
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationText: {
    fontSize: 16,
    color: 'black',
  },
  starRatingContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25, // Rounded edges to match other fields
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android shadow
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starRatingText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25, // Match button style with rounded edges
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25, // Match button style with rounded edges
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25, // Rounded edges to match the desired style
    backgroundColor: '#fff',
    color: 'black',
    paddingRight: 30, // to ensure the text is not behind the icon
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius for a softer shadow
    elevation: 3, // Elevation for Android shadow
  },
  inputAndroid: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25, // Rounded edges to match the desired style
    backgroundColor: '#fff',
    color: 'black',
    paddingRight: 30, // to ensure the text is not behind the icon
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius for a softer shadow
    elevation: 3, // Elevation for Android shadow
  },
  iconContainer: {
    top: Platform.OS === 'ios' ? 10 : 15,
    right: 12,
  },
});

export default FilterScreen;
