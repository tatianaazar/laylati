import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) {
            Alert.alert('Error', 'Please enter a search term.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(`http://192.168.1.250:3000/api/search?query=${query}`);

            if (response.status === 200) {
                setVendors(response.data); // Set vendors to the search results
            }
        } catch (error) {
            console.error(error.message);
            Alert.alert('Error', 'An error occurred while searching. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderVendor = ({ item }) => (
        <TouchableOpacity style={styles.vendorContainer}>
            <Text style={styles.vendorName}>{item.name}</Text>
            <Text style={styles.vendorCategory}>{item.category}</Text>
            <Text style={styles.vendorDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search vendors..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <FlatList
                    data={vendors}
                    keyExtractor={(item) => item._id}
                    renderItem={renderVendor}
                    ListEmptyComponent={<Text style={styles.noResultsText}>No results found.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    vendorContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    vendorName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    vendorCategory: {
        fontSize: 16,
        color: '#555',
    },
    vendorDescription: {
        fontSize: 14,
        color: '#777',
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#888',
    },
});

export default SearchScreen;
