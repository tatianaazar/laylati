import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Update = {
  id: string;
  text: string;
};

const UpdatesScreen = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
      //  const response = await fetch('https://your-backend-url.com/api/updates'); // Replace with your API endpoint
    //    const data = await response.json();
     //   setUpdates(data);
      } catch (error) {
     //   console.error('Error fetching updates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []); 

  const renderItem = ({ item }: { item: Update }) => (
    <View style={styles.updateItem}>
      <Text style={styles.updateText}>{item.text}</Text>
      <FontAwesome name="circle" size={10} color="orange" style={styles.icon} />
    </View>
  ); 

  return (
    <View style={styles.container}>
      <FontAwesome name="bars" size={24} color="black" style={styles.menuIcon} />
      <Text style={styles.title}>Updates</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : updates.length === 0 ? (
        <View style={styles.noUpdatesContainer}>
          <Text style={styles.noUpdatesText}>Oops, it looks like you don’t have any new updates</Text>
        </View>
      ) : (
        <FlatList
          data={updates}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40, // Adjusted for spacing similar to your example
  },
  menuIcon: {
    position: 'absolute',
    left: 30, // Position the menu icon
    top: 40, 
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20, // Adjusted for consistency with other screens
    fontFamily: 'Montserrat', // Ensure you have this font loaded
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUpdatesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUpdatesText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    opacity: 0.6, // Matches the faded appearance in the image
    width: 276,
    height: 72,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: 24.4,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: 10,
  },
  updateText: {
    fontSize: 16,
    color: '#4A4A4A',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
});

export default UpdatesScreen;
