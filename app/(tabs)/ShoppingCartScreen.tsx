import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface CartItem {
  id: string;
  name: string;
}

const cartItems: CartItem[] = [
  { id: '1', name: 'AL-BAIK' },
  { id: '2', name: 'GRAND OASIS HALL' },
  { id: '3', name: 'ENCHANTED EVENTS' },
  { id: '4', name: 'PALM GARDEN ESTATE' },
];

const ShoppingCartScreen = () => {
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <TouchableOpacity style={styles.checkbox}>
        <Text style={styles.checkboxText}>O</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Request Services</Text>
      </TouchableOpacity>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 18,
    color: '#ddd',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShoppingCartScreen;
