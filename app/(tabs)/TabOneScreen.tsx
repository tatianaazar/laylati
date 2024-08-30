import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
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
import TextFiltersComponent from '../../components/TextFiltersComponent';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const offers = [   // curated packages 
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/451259821_7788921487867873_1095001975505129054_n.heic?stp=dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=hG3mRTmozG4Q7kNvgGDuoOf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYCMK60UAniPa1xCNBBDWWQb_DpgXNavfa8i1Uw6lmcT1Q&oe=66BEC2B4' },
  { image: 'https://scontent.cdninstagram.com/v/t39.30808-6/449317614_18448894225015202_866105669833284246_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=9V_XVvbzlb0Q7kNvgEyo1dp&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYBctwyz5fKZb5acNOOrxmWr2bsnjuYyOHknpzIs0d3D-A&oe=66BEC066' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/450085600_512793154649088_4520722286097473083_n.heic?stp=dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=lUXxgttZX1AQ7kNvgG9e0_8&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYCQlIomH-3pQIsYyXRjARpW7ZzOJPaA10UPqgCQT_uvQw&oe=66BECC8D' },
];

const offers2 = [   // featured venues
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/454248020_994822892372456_6927639998739371543_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=CBWoTg42pccQ7kNvgGS3EK0&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYBCiwq1S36ETdKsKomiiv8SbGjIAGlLVtLyOHdGUUKayA&oe=66BEABAF' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/454822420_425011313883987_7649671426601536086_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=rF9orSqLCUMQ7kNvgGRYo71&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYBLCUI1VGS4VDQpYS8sBsi2VHCEHzULT5zY3Y2asKzHtQ&oe=66BED5D7' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/424949584_766628705376293_3271934173311293179_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=3MQNPc6tKvEQ7kNvgHmYpjJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYCeunHzDwRyHNQnf5lqI1I5XalEhupc09v7BQ4UEj3zUw&oe=66BED342' },
];

const offers3 = [    // featured catering
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/436635149_8000459839988392_4928873632298959202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=gIeXAOINXV4Q7kNvgGTkBtZ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYB9ULjc9JAKPdwtsE85idCJBFkrwXwygx0xh2AfPANECQ&oe=66BECA08' },
  { image: 'https://scontent.cdninstagram.com/v/t39.30808-6/450858762_18446753305002502_173449581087494009_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_ohc=ms4RIf685F4Q7kNvgHMWNVW&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYAcynXEijk6bFjy19V-p-tCq2MrJf1G6BDWQH6110xJog&oe=66BECE14' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/452488216_370718339387636_823224444060701122_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=5rHVjhxts5gQ7kNvgE_gWu6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYC3gy4o6qpS-YJJfgqbV7BR7ezww7EPGxe5m-o2Ow8-cQ&oe=66BEB2D4' },
];

const offers4 = [      // featured entertainment 
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/254773116_259174496175890_8975929748244057692_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=vK0CMbpxUygQ7kNvgHkzCOH&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYCc284cHo7J_bUDb0pdopmq3lPLaY7xYpHcC-pYg4glxQ&oe=66BEA0D4' },
  { image: 'https://scontent.cdninstagram.com/v/t39.30808-6/418834119_953643332879061_5821798841666301798_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=ilay5QBeslgQ7kNvgHlu1fl&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYB0mKV4JXhf2YmbXxHr_ndlWRMkE6Ib7bTTCK95-oHb9w&oe=66BEAE2F' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/240509516_521710878921088_257894744008857296_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=18de74&_nc_ohc=ENC5Jye8ZKQQ7kNvgH45Um7&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYC2xUwiVqCQ1U6K7A-xoS_3zxK6UVFB4hH-6K2Sq_i6AA&oe=66BEAEBF' },
];

const offers5 = [   // featured decor
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/442434934_1564873697419249_8329280367919833894_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=YFUqAE4HmyEQ7kNvgHCwIbL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYDxgI0ZEbjXxmkk5ozsEAlNo7qoJgeqJmzlXOPi_UbF-Q&oe=66BEB647' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/451122619_483129657661290_1553673564985319515_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_ohc=BqZWH0GRYuUQ7kNvgGnDbu_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYB1O60QgfWFmpmxM2tjT8ZiQ2aXmh5sSxYsuyGx70enDQ&oe=66BEAA34' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/454087880_1942808286184875_416445640175808872_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=qnWhgFdj_vIQ7kNvgFeXPjY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYCKAi7peo-e-PyqSwRH77KrVImHDZCc2gDJ_zZvOim5eQ&oe=66BE9DE1' },
];

const offers6 = [     // featured photography
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/448132557_1160473365270284_2143723002196308036_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=18de74&_nc_ohc=ipaXU7HYk-kQ7kNvgEMmpJL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYAiLNEYDnGw5mfX-l07n--sG-6vm01lIOzouupdb2lbwA&oe=66BE8C65' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/447951346_2186151148432824_331835993273727431_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=mblBAz_yGYsQ7kNvgGTIMtY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYBzKVp-xv6Rji34ca17rXpjCARDIutmmwMzOtWsanW2SA&oe=66BEA250' },
  { image: 'https://scontent.cdninstagram.com/v/t51.29350-15/357746373_1451458375604178_1820610638086475576_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=rLkVFApBX2wQ7kNvgEhXP2e&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AYDNdB51BR-_PtXpxE-4DjMAqXz3WmWWRtKSiEDLOcdCrg&oe=66BEBC51' },
];

type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

const TabOneScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MainScreenRouteProp>();
  const [activeFilter, setActiveFilter] = useState(route.params?.activeFilter || 'featured'); // Initialize with a category if needed
  const [vendors, setVendors] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [activeSlide3, setActiveSlide3] = useState(0);
  const [activeSlide4, setActiveSlide4] = useState(0);
  const [activeSlide5, setActiveSlide5] = useState(0);
  const [activeSlide6, setActiveSlide6] = useState(0);
  const carouselRef = useRef(null);
  const carouselRef2 = useRef(null);
  const carouselRef3 = useRef(null);
  const carouselRef4 = useRef(null);
  const carouselRef5 = useRef(null);
  const carouselRef6 = useRef(null);
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
    if (activeFilter && activeFilter !== 'featured') {
      fetchVendorsByCategory(activeFilter);
    }
  }, [activeFilter]);

  useEffect(() => {
    if (route.params?.activeFilter) {
      setActiveFilter(route.params.activeFilter);
    }
  }, [route.params?.activeFilter]);
  

  useEffect(() => {
    if (route.params?.isEventTypeSaved !== undefined) {
      setIsEventTypeSaved(route.params.isEventTypeSaved);
    }
    if (route.params?.isBudgetSaved !== undefined) {
      setIsBudgetSaved(route.params.isBudgetSaved);
    }
  }, [route.params]);

  const fetchVendorsByCategory = async (category) => {
    try {
      const response = await axios.get(`https://powerful-wave-76932-d627c476e9a0.herokuapp.com/api/vendors/${category}`); // Replace with your API endpoint
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error.response ? error.response.data : error.message);
    }
  };

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.offerImage} />
  );

  const renderPagination = (offers, activeSlide) => (
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
  );

  const renderVenueItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('VendorDetails', { vendor: item })}>
      <View style={styles.venueContainer}>
        <Image source={{ uri: item.details?.image }} style={styles.venueImage} />
        <View style={styles.venueInfo}>
          <Text style={styles.venueName}>{item.name}</Text>
          <Text style={styles.venueDescription}>{item.details?.description}</Text>
          <Text style={styles.venueRating}>Rating: {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderVendorItem = ({ item }) => (
    <TouchableOpacity key={item._id} onPress={() => navigateToDetails(item)}>
      <View style={styles.vendorItem}>
        <Image source={{ uri: item.details?.image }} style={styles.vendorImage} />
        <View style={styles.vendorInfo}>
          <Text style={styles.vendorName}>{item.name}</Text>
          <Text style={styles.vendorDescription}>{item.details?.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const navigateToDetails = (vendor) => {
    navigation.navigate('VendorDetails', { vendor });
  };

  const navigateToFilter = () => {
    navigation.navigate('Filter', { activeFilter });
  };
  

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {(activeFilter !== 'featured') && (
        <View style={styles.fixedFilterBar2}>
          <View style={styles.iconContainer2}>
            <TouchableOpacity style={styles.icon2} onPress={navigateToFilter}>
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

{activeFilter === 'venues' && (
        <FlatList
          data={vendors}
          renderItem={renderVenueItem}
          keyExtractor={(item) => item._id}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={screenHeight - 80} // Adjust for header and footer
          contentContainerStyle={{ paddingTop: activeFilter === 'venues' ? 110 : 0 }} // Adjust the padding
        />
      )}

      {activeFilter !== 'venues' && activeFilter !== 'featured' && (
        <FlatList
          data={vendors}
          renderItem={renderVendorItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingTop: 130 }} // Add padding to push the content down
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeFilter === 'featured' && (
        <ScrollView>
          <View style={styles.header}>
          <FontAwesome name="bars" size={24} color="black" style={styles.menuIcon} />
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
          </View>


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
            {renderPagination(offers, activeSlide)}
          </View>

          <View style={styles.carouselSection}>
            <Text style={styles.carouselTitle}>Featured Venues</Text>
            <Carousel
              ref={carouselRef2}
              data={offers2}
              renderItem={renderItem}
              width={screenWidth}
              height={150}
              onSnapToItem={(index) => setActiveSlide2(index)}
            />
            {renderPagination(offers2, activeSlide2)}
          </View>

          <View style={styles.carouselSection}>
            <Text style={styles.carouselTitle}>Featured Catering</Text>
            <Carousel
              ref={carouselRef}
              data={offers3}
              renderItem={renderItem}
              width={screenWidth}
              height={150}
              onSnapToItem={(index) => setActiveSlide3(index)}
            />
            {renderPagination(offers3, activeSlide3)}
          </View>

          <View style={styles.carouselSection}>
            <Text style={styles.carouselTitle}>Featured Entertainment</Text>
            <Carousel
              ref={carouselRef}
              data={offers4}
              renderItem={renderItem}
              width={screenWidth}
              height={150}
              onSnapToItem={(index) => setActiveSlide4(index)}
            />
            {renderPagination(offers4, activeSlide4)}
          </View>

          <View style={styles.carouselSection}>
            <Text style={styles.carouselTitle}>Featured Decor</Text>
            <Carousel
              ref={carouselRef}
              data={offers5}
              renderItem={renderItem}
              width={screenWidth}
              height={150}
              onSnapToItem={(index) => setActiveSlide5(index)}
            />
            {renderPagination(offers5, activeSlide5)}
          </View>

          <View style={styles.carouselSection}>
            <Text style={styles.carouselTitle}>Featured Photography</Text>
            <Carousel
              ref={carouselRef}
              data={offers6}
              renderItem={renderItem}
              width={screenWidth}
              height={150}
              onSnapToItem={(index) => setActiveSlide6(index)}
            />
            {renderPagination(offers6, activeSlide6)}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fixedFilterBar2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom: 5,
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  iconContainer2: {
    flexDirection: 'row', // Ensure icons are aligned horizontally
    justifyContent: 'space-between', // Ensure the icons are spaced correctly
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 14,
    marginTop: 20,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
    marginVertical: 38,
    fontFamily: 'JosefinSans_700Bold',
    marginBottom: 14,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    position: 'absolute',
    left: 30,
    top: 40,
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
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '22%',
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
    width: screenWidth - 28, // Adjust the width to fit the screen with some padding
    height: 118,
    borderRadius: 8,
    alignSelf: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 0,
    marginTop: -25,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#E6CBF6',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FF5719',
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
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 4,
  },
  vendorDescription: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Montserrat_400Regular',
  },
  vendorRating: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_600SemiBold',
  },
  vendorContainer: {
    width: screenWidth,
    height: screenHeight - 80, // Adjust for header and footer
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  venueContainer: {
    width: screenWidth,
    height: screenHeight - 80, // Adjust for header and footer
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  venueImage: {
    width: screenWidth - 32,
    height: 450,
    borderRadius: 16,
    marginBottom: 30,
    
  },
  venueInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: -120
  },
  venueName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 4,
    color: 'black',
  },
  venueDescription: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Montserrat_400Regular',
    color: '#555',
  },
  venueRating: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_600SemiBold',
    color: 'black',
  },
});

export default TabOneScreen;
