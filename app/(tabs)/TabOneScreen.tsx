import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import TextFiltersComponent from '../../components/TextFiltersComponent';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import { RootStackParamList } from './types/types';
import AppLoading from 'expo-app-loading';
import { useFonts, JosefinSans_400Regular, JosefinSans_600SemiBold, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import SearchIcon from '../../assets/images/Search.svg';
import EventTypeIcon from '../../assets/images/cake.svg';
import EventTypeIconSaved from '../../assets/images/cakeSelected.svg';
import BudgetIcon from '../../assets/images/dollar-square.svg';
import BudgetIconSaved from '../../assets/images/dollar-square-saved.svg';
import LocationIcon from '../../assets/images/location.svg';
import FilterIcon from '../../assets/images/filter.svg';
import ShoppingCartIcon from '../../assets/images/bag.svg';

const { width: screenWidth } = Dimensions.get('window');

const offers = [
  { image: 'https://www.infinity-weddingsandevents.com/wp-content/uploads/2020/01/luxury-tables-setting-lebanese-wedding.jpg' },
  { image: 'https://cdn0.weddingwire.com/vendor/389027/3_2/960/jpg/1446925641782-slide5.jpeg' },
  { image: 'https://th.bing.com/th/id/OPEC.mPOLoikr2JOSQg474C474?w=200&h=220&rs=1&o=5&dpr=1.3&pid=21.1' },
];

const TabOneScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Main'>>();
  const [activeFilter, setActiveFilter] = useState('featured'); // Initialize with a category if needed
  const [vendors, setVendors] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const [isEventTypeSaved, setIsEventTypeSaved] = useState(route.params?.isEventTypeSaved || false);
  const [isBudgetSaved, setIsBudgetSaved] = useState(route.params?.isBudgetSaved || false);
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_600SemiBold,
    JosefinSans_700Bold,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (activeFilter && activeFilter !== 'featured' && activeFilter !== 'venues') {
      fetchVendorsByCategory(activeFilter);
    }
  }, [activeFilter]);

  useEffect(() => {
    console.log('Params:', route.params);
    if (route.params?.isEventTypeSaved !== undefined) {
      setIsEventTypeSaved(route.params.isEventTypeSaved);
    }
    if (route.params?.isBudgetSaved !== undefined) {
      setIsBudgetSaved(route.params.isBudgetSaved);
    }
  }, [route.params]);

  const fetchVendorsByCategory = async (category) => {
    try {
      console.log(`Fetching vendors for category: ${category}`);
      const response = await axios.get(`http://192.168.0.3:3000/api/vendors/${category}`);
      console.log("Response:", response.data);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error.response ? error.response.data : error.message);
    }
  };

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.offerImage} />
  );

  const navigateToDetails = (vendor) => {
    navigation.navigate('VendorDetails', { vendor });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {activeFilter !== 'featured' && activeFilter !== 'venues' && (
        <View style={styles.fixedFilterBar2}>
          <View style={styles.iconContainer2}>
            <TouchableOpacity style={styles.icon2} onPress={() => navigation.navigate('Filter')}>
              <FilterIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon2} onPress={() => navigation.navigate('ShoppingCart')}>
              <ShoppingCartIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
          <TextFiltersComponent
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </View>
      )}
      <ScrollView>
        <View style={styles.header}>
          {(activeFilter === 'featured' || activeFilter === 'venues') && (
            <>
              <Text style={styles.title}>LAYLATI</Text>
              <View style={styles.searchWrapper}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#79747E"
                  />
                </View>
                <SearchIcon width={30} height={32} style={styles.searchIcon} />
              </View>
              <View style={styles.createEventContainer}>
                <Text style={styles.createEventTitle}>Create Event</Text>
                <View style={styles.iconsRow}>
                  <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('EventType')}>
                    {isEventTypeSaved ? <EventTypeIconSaved width={30} height={30} /> : <EventTypeIcon width={30} height={30} />}
                    <Text style={styles.iconLabel}>Event Type</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Budget')}>
                    {isBudgetSaved ? <BudgetIconSaved width={30} height={30} /> : <BudgetIcon width={30} height={30} />}
                    <Text style={styles.iconLabel}>Budget</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Location')}>
                    <LocationIcon width={30} height={30} />
                    <Text style={styles.iconLabel}>Location</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TextFiltersComponent
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
              <View style={styles.horizontalLine} />
            </>
          )}
          {(activeFilter !== 'featured' && activeFilter !== 'venues') && (
            <>
              <ScrollView>
      {vendors.map((vendor) => (
        <TouchableOpacity key={vendor._id} onPress={() => navigateToDetails(vendor)}>
          <View style={styles.vendorItem}>
            <Image source={{ uri: vendor.details?.image }} style={styles.vendorImage} />
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorName}>{vendor.name}</Text>
              <Text style={styles.vendorDescription}>{vendor.details?.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
            </>
          )}

          {activeFilter === 'featured' && (
            <View>
              <View style={styles.carouselSection}>
                <Text style={styles.carouselTitle}>Curated Packages</Text>
                <Carousel
                  ref={carouselRef}
                  data={offers}
                  renderItem={renderItem}
                  width={screenWidth}
                  height={150}
                  onSnapToItem={(index) => setActiveSlide(index)}
                />
                <View style={styles.paginationContainer}>
                  {offers.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        activeSlide === index && styles.paginationDotActive,
                      ]}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.carouselSection}>
                <Text style={styles.carouselTitle}>Featured Catering</Text>
                <Carousel
                  ref={carouselRef}
                  data={offers}
                  renderItem={renderItem}
                  width={screenWidth}
                  height={150}
                  onSnapToItem={(index) => setActiveSlide(index)}
                />
                <View style={styles.paginationContainer}>
                  {offers.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        activeSlide === index && styles.paginationDotActive,
                      ]}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.carouselSection}>
                <Text style={styles.carouselTitle}>Featured Venues</Text>
                <Carousel
                  ref={carouselRef}
                  data={offers}
                  renderItem={renderItem}
                  width={screenWidth}
                  height={150}
                  onSnapToItem={(index) => setActiveSlide(index)}
                />
                <View style={styles.paginationContainer}>
                  {offers.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        activeSlide === index && styles.paginationDotActive,
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          )}

          {activeFilter === 'venues' && (
            <View>
              {/* Implement the custom logic for the Venues category here */}
              <Text style={styles.customVenuesText}>Custom content for Venues category</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fixedFilterBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  fixedFilterBar2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'column', // Change to column to stack items vertically
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '22%',
  },
  topIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  icon: {
    paddingHorizontal: 10,
    marginTop: 30,
  },
  iconContainer2: {
    flexDirection: 'row', // Ensure icons are aligned horizontally
    justifyContent: 'space-between', // Ensure the icons are spaced correctly
    alignItems: 'center',
    width: '100%', // Adjust as needed, previously 100% which hid the TextFiltersComponent
    paddingHorizontal: 10,
    marginTop: 20,
  },
  icon2: {
    paddingHorizontal: 10,
    marginTop: 0,
  },
  topIcon: {
    paddingHorizontal: 10,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
    marginVertical: 26,
    fontFamily: 'JosefinSans_700Bold',
    marginBottom: 14,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#79747E',
    borderRadius: 16,
    width: 314,
    height: 32,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#79747E',
    fontFamily: 'Montserrat_400Regular',
  },
  searchIcon: {
    marginLeft: 8,
  },
  createEventContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  createEventTitle: {
    fontSize: 12,
    marginVertical: 0,
    marginBottom: 20,
    fontFamily: 'Montserrat_400Regular',
    alignItems: 'center',
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 10,
    fontFamily: 'Montserrat_400Regular',
  },
  separator: {
    width: 1,
    height: 60,
    backgroundColor: '#79747E',
    marginHorizontal: 16,
  },
  horizontalLine: {
    height: 0.3,
    backgroundColor: '#79747E',
    marginVertical: 16,
    marginHorizontal: 16,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
  },
  carouselSection: {
    marginVertical: 10,
  },
  carouselTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  offerImage: {
    width: screenWidth - 32, // Adjust the width to fit the screen with some padding
    height: 118,
    borderRadius: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 0,
    marginTop: -20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E6CBF6',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FF5719',
  },
  card: {
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  vendorList: {
    marginTop: 16,
  },
  vendorItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  vendorImage: {
    width: 123,
    height: 123,
    borderRadius: 8,
    marginRight: 16,
  },
  vendorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 4,
  },
  vendorDescription: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Montserrat_400Regular',
  },
  vendorRating: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_600SemiBold',
  },
  customVenuesText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default TabOneScreen;
