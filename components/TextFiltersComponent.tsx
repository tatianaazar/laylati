import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TextFiltersComponentProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const filters = ['Catering', 'Music', 'Decorations', 'Photography'];

const TextFiltersComponent: React.FC<TextFiltersComponentProps> = ({ activeFilter, setActiveFilter }) => {
  return (
    <View style={styles.filterContainer}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            activeFilter === filter && styles.activeFilterButton,
          ]}
          onPress={() => setActiveFilter(filter)}
        >
          <Text style={[
            styles.filterButtonText,
            activeFilter === filter && styles.activeFilterButtonText,
          ]}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilterButton: {
    backgroundColor: 'purple',
  },
  filterButtonText: {
    color: 'black',
  },
  activeFilterButtonText: {
    color: 'white',
  },
});

export default TextFiltersComponent;
