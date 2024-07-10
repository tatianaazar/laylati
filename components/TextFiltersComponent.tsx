import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';


type Props = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};


const textFilters = ['Catering', 'Venues', 'Entertainment', 'Decor', 'Photo/Videography'];


const TextFiltersComponent: React.FC<Props> = ({ activeFilter, setActiveFilter }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
      {textFilters.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => setActiveFilter(filter)}
          style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}>
          <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
            {filter}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilterButton: {
    backgroundColor: 'purple',
    borderColor: 'purple',
  },
  filterText: {
    color: 'black',
  },
  activeFilterText: {
    color: 'white',
  },
});


export default TextFiltersComponent;


