import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import TextFiltersComponent from '../../components/TextFiltersComponent';
import axios from 'axios';

const VendorListScreen = () => {
  const [activeFilter, setActiveFilter] = useState('catering');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (activeFilter) {
      fetchVendorsByCategory(activeFilter);
    }
  }, [activeFilter]);

  const fetchVendorsByCategory = async (category) => {
    try {
      console.log(`Fetching vendors for category: ${category}`);
      const response = await axios.get(`https://powerful-wave-76932-d627c476e9a0.herokuapp.com/api/vendors/${category}`);
      console.log('Vendors fetched:', response.data);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextFiltersComponent activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <ScrollView style={styles.vendorList}>
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <View key={vendor._id} style={styles.vendorItem}>
              <Image
                source={{ uri: vendor.details?.image || 'default_image_url_here' }}
                style={styles.vendorImage}
              />
              <View style={styles.vendorInfo}>
                <Text style={styles.vendorName}>{vendor.name}</Text>
                <Text style={styles.vendorDescription}>{vendor.details?.description || 'No description available'}</Text>
                <Text style={styles.vendorRating}>Rating: {vendor.rating}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No vendors found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  vendorList: {
    marginTop: 16,
  },
  vendorItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  vendorImage: {
    width: 100,
    height: 100,
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
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_600SemiBold',
  },
});

export default VendorListScreen;
