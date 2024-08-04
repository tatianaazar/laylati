import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';
import TextFiltersComponent from '../../components/TextFiltersComponent';
import IconFiltersComponent from '../../components/IconFiltersComponent';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const offers = [
  { image: 'https://www.infinity-weddingsandevents.com/wp-content/uploads/2020/01/luxury-tables-setting-lebanese-wedding.jpg' },
  { image: 'https://cdn0.weddingwire.com/vendor/389027/3_2/960/jpg/1446925641782-slide5.jpeg' },
  { image: 'https://th.bing.com/th/id/OPEC.mPOLoikr2JOSQg474C474?w=200&h=220&rs=1&o=5&dpr=1.3&pid=21.1' },
];

const TabOneScreen = () => {
  const navigation = useNavigation();
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [activeFilter, setActiveFilter] = useState('catering'); // Initialize with a category if needed
  const [vendors, setVendors] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (activeFilter) {
      fetchVendorsByCategory(activeFilter);
    }
  }, [activeFilter]);

  const fetchVendorsByCategory = async (category) => {
    try {
      console.log(`Fetching vendors for category: ${category}`);
      const response = await axios.get(`http://192.168.1.133:3000/api/vendors/${category}`);
      console.log("Response:", response.data);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error.response ? error.response.data : error.message);
    }
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowFilterBar(offsetY > 455);
  };

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.offerImage} />
  );

  return (
    <View style={styles.container}>
      {showFilterBar && (
        <View style={styles.fixedFilterBar}>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Filter')}>
              <FontAwesome name="filter" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('ShoppingCart')}>
              <FontAwesome name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TextFiltersComponent
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </View>
      )}
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.header}>
          <Text style={styles.title}>LAYLATI</Text>
          <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="black" />
            <FontAwesome name="search" size={24} color="black" />
          </View>
          <Text style={styles.offersTitle}>Offers of The Week</Text>
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
          <Text style={styles.filtersTitle}>Filters</Text>
          <IconFiltersComponent />
          <TextFiltersComponent
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <FontAwesome name="caret-down" size={24} color="black" style={styles.arrowIcon} />
        </View>
        {vendors.map((vendor) => (
          <Card key={vendor._id} style={styles.card}>
            <Card.Cover source={{ uri: vendor.details?.image || 'default_image_url_here' }} />
            <Card.Content>
              <Title>{vendor.name}</Title>
              <Paragraph>{vendor.details?.description || 'No description available'}</Paragraph>
              {vendor.rating && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Rating: {vendor.rating}</Text>
                  <View style={styles.starsContainer}>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesome
                        key={i}
                        name="star"
                        size={20}
                        color={i < vendor.rating ? "orange" : "gray"}
                      />
                    ))}
                  </View>
                </View>
              )}
            </Card.Content>
          </Card>
        ))}
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
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  icon: {
    paddingHorizontal: 10,
    marginTop: 30,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 100,
  },
  offerImage: {
    width: '92%',
    height: 150,
    borderRadius: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'orange',
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 154,
  },
  arrowIcon: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  card: {
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
});

export default TabOneScreen;
