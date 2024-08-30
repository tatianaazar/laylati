import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface CartItem {
  id: string;
  name: string;
}

const cartItems: CartItem[] = []; // Empty array to simulate an empty cart

const ShoppingCartScreen = () => {
  const renderEmptyCartMessage = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Oops, it looks like your cart is empty</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        renderEmptyCartMessage()
      ) : (
        <FlatList
          data={cartItems}
          renderItem={() => null} // Do not render item names
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
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
  list: {
    flex: 1,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    opacity: 0.6,
    marginTop: -60
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
