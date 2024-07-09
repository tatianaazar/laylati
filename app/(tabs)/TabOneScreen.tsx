import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';
import TextFiltersComponent from '../../components/TextFiltersComponent';
import IconFiltersComponent from '../../components/IconFiltersComponent';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const vendors = [
  {
    name: 'JORDANIAN DELIGHTS',
    description: 'Jordanian Delights features a menu filled with classic Jordanian dishes, including mansaf, falafel, and more. Known for its generous portions and home-style cooking, this restaurant brings the essence of Jordanian hospitality to every meal.',
    rating: 4.5,
    image: 'https://via.placeholder.com/300x150.png?text=JORDANIAN+DELIGHTS',
  },
  // ...other vendors
];

const offers = [
  { image: 'https://via.placeholder.com/300x150.png?text=Offer+1' },
  { image: 'https://via.placeholder.com/300x150.png?text=Offer+2' },
  { image: 'https://via.placeholder.com/300x150.png?text=Offer+3' },
];

const TabOneScreen = () => {
  const navigation = useNavigation();
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Catering');
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 455) {
      setShowFilterBar(true);
    } else {
      setShowFilterBar(false);
    }
  };

  const renderItem = ({ item }: { item: { image: string } }) => (
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
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Shopping Cart')}>
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
            <TextInput style={styles.searchInput} placeholder="Search" />
            <FontAwesome name="search" size={24} color="black" />
          </View>
          <Text style={styles.offersTitle}>Offers of The Week</Text>
          <Carousel
            ref={carouselRef}
            data={offers}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
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
        {vendors.map((vendor, index) => (
          <Card key={index} style={styles.card}>
            <Card.Cover source={{ uri: vendor.image }} />
            <Card.Content>
              <Title>{vendor.name}</Title>
              <Paragraph>{vendor.description}</Paragraph>
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
    marginVertical: 16,
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
  },
  offersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  offerImage: {
    width: '100%',
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
});

export default TabOneScreen;
