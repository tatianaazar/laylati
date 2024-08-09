import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import PackageIcon from '../../assets/images/packageBagTick.svg';
import ChatIcon from '../../assets/images/chatVendor.svg';
import BagIcon from '../../assets/images/bag.svg';


const { width: screenWidth } = Dimensions.get('window');

const VendorDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { vendor } = route.params;

  const [images, setImages] = useState([vendor.details?.image]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (vendor.details?.image) {
      setImages([vendor.details?.image, vendor.details?.image, vendor.details?.image, vendor.details?.image]);
    }
  }, [vendor]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.bagIconContainer}>
          <BagIcon width={24} height={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide ? styles.paginationDotActive : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.vendorName}>{vendor.name}</Text>

        <View style={styles.carouselContainer}>
          <Carousel
            data={images}
            renderItem={renderItem}
            width={338}  // Adjusted width
            height={367} // Adjusted height
            loop
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          {renderPagination()}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.vendorDescription}>{vendor.details?.description}</Text>

          <TouchableOpacity style={styles.packageButton}>
            <Text style={styles.buttonText}>Package A</Text>
            <PackageIcon width={20} height={20} style={styles.packageIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.packageButton}>
            <Text style={styles.buttonText}>Package B</Text>
            <PackageIcon width={20} height={20} style={styles.packageIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.packageButton}>
            <Text style={styles.buttonText}>Package C</Text>
            <PackageIcon width={20} height={20} style={styles.packageIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>Chat with vendor</Text>
            <ChatIcon width={20} height={20} style={styles.chatIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContent: {
      alignItems: 'center',
      paddingBottom: 16,
    },
    bagIconContainer: {
      marginRight: 16,
    },
    vendorName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 8,
      textAlign: 'center',
      marginTop: 16,
    },
    carouselContainer: {
      marginBottom: 16,
      position: 'relative',
      alignItems: 'center',
      width: 338, // Ensure this matches the width of the carousel
      height: 367, // Ensure this matches the height of the carousel
    },
    carouselImage: {
      width: 338,
      height: 367,
      borderRadius: 16,
    },
    paginationContainer: {
      position: 'absolute',
      bottom: 10, // Adjust this value to position the dots within the image
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1, // Ensure it stays on top of the image
    },
    paginationDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    paginationDotActive: {
      backgroundColor: '#FFD700',
    },
    paginationDotInactive: {
      backgroundColor: '#BDBDBD',
    },
    infoContainer: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 16,
    },
    vendorDescription: {
      width: '100%',
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 17.08,
      textAlign: 'left',
      marginTop: 16,
      marginBottom: 16,
    },
    packageButton: {
      width: '100%',
      height: 32,
      borderRadius: 6,
      backgroundColor: '#F0F0F0',
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    chatButton: {
      width: '100%',
      height: 32,
      borderRadius: 6,
      backgroundColor: '#FFD700',
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '400',
      color: '#000',
    },
    packageIcon: {
      position: 'absolute',
      top: 6,
      right: 10,
      opacity: 1,
    },
    chatIcon: {
      position: 'absolute',
      top: 6,
      right: 10,
      opacity: 1,
    },
  });
  

export default VendorDetailsScreen;
