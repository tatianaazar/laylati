import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import TextFiltersComponent from '../../components/TextFiltersComponent';
import axios from 'axios';

const VendorListScreen = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (activeFilter) {
      fetchVendorsByCategory(activeFilter);
    }
  }, [activeFilter]);

  const fetchVendorsByCategory = async (category) => {
    try {
      const response = await axios.get(`http://192.168.1.133:3000/api/vendors/${category}`);
      console.log('done');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextFiltersComponent activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <ScrollView style={styles.vendorList}>
        {vendors.map((vendor) => (
          <View key={vendor._id} style={styles.vendorItem}>
            <Image
              source={{ uri: vendor.details?.image || 'default_image_url_here' }}
              style={styles.vendorImage}
            />
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <Text style={styles.vendorDescription}>{vendor.details?.description || 'No description available'}</Text>
            <Text>{vendor.details.address}</Text>
            <Text>{vendor.details.phone}</Text>
            <Text>{vendor.details.email}</Text>
            <Text>{vendor.details.website}</Text>
            <Text style={styles.vendorRating}>Rating: {vendor.rating}</Text>
          </View>
        ))}
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
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  vendorImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vendorDescription: {
    fontSize: 16,
    marginVertical: 8,
  },
  vendorRating: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VendorListScreen;
