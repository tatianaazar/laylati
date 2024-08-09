// src/components/TextFiltersComponent.tsx
import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, JosefinSans_400Regular, JosefinSans_600SemiBold, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

type Props = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const textFilters = ['Featured', 'Venues', 'Catering', 'Entertainment', 'Decor', 'Photo/Videography'];

const TextFiltersComponent: React.FC<Props> = ({ activeFilter, setActiveFilter }) => {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_600SemiBold,
    JosefinSans_700Bold,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
      {textFilters.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => setActiveFilter(filter.toLowerCase())} // Ensure the category matches backend data format
          style={[styles.filterButton, activeFilter === filter.toLowerCase() && styles.activeFilterButton]}>
          <Text style={[styles.filterText, activeFilter === filter.toLowerCase() && styles.activeFilterText]}>
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
    backgroundColor: '#E6CBF6',
    borderColor: '#E6CBF6',
  },
  filterText: {
    color: 'black',
    fontFamily: 'Montserrat_400Regular', // Use fontFamily for font style
    fontSize: 12,
  },
  activeFilterText: {
    color: 'black',
  },
});

export default TextFiltersComponent;
