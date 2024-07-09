import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Update = {
  id: string;
  text: string;
};

const UpdatesScreen = () => {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    // Simulate fetching updates from a backend
    const fetchedUpdates: Update[] = [
      { id: '1', text: 'Your service request has been sent to AL-BAIK' },
      { id: '2', text: 'Your service request has been sent to GRAND OASIS HALL' },
      { id: '3', text: 'Your service request has been sent to ENCHANTED EVENTS' },
      { id: '4', text: 'Your service request has been sent to PALM GARDEN ESTATE' },
    ];
    setUpdates(fetchedUpdates);
  }, []);

  const renderItem = ({ item }: { item: Update }) => (
    <View style={styles.updateItem}>
      <Text style={styles.updateText}>{item.text}</Text>
      <FontAwesome name="circle" size={10} color="orange" style={styles.icon} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Updates</Text>
      {updates.length === 0 ? (
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
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noUpdatesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUpdatesText: {
    fontSize: 16,
    color: 'gray',
  },
  listContent: {
    paddingBottom: 100,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  updateText: {
    fontSize: 18,
  },
  icon: {
    marginLeft: 10,
  },
});

export default UpdatesScreen;
