import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingCartScreen = () => {
  const { cartItems, events, removeFromCart, requestServices } = useCart();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventLocation, setEventLocation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchUserEvents } = useCart();
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Events data:", events); // Debugging: Log events data
  }, [events]);

  
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserEvents();
      setLoading(false);  // Set loading to false after fetching events
    };
    fetchData();
  }, []);

  const handleRequestServices = () => {
    setEventModalVisible(true);
  };

  const renderEmptyCartMessage = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Oops, it looks like your cart is empty</Text>
    </View>
  );

  const confirmRemoveVendor = () => {
    if (selectedVendor) {
      removeFromCart(selectedVendor.vendor);
      setModalVisible(false);
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.vendor.details.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemTextContainer}>
        <Text style={styles.cartItemVendorName}>{item.vendor.name}</Text>
        <Text style={styles.cartItemPackage}>Package {item.package}</Text>
      </View>
      <TouchableOpacity style={styles.actionButton} onPress={() => {
        setSelectedVendor(item);
        setModalVisible(true);
      }}>
        <Text style={styles.actionButtonText}>-</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEventSelection = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Which event would you like to request these services for?</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id} // Ensure a unique key for each event
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => {
              console.log(`Selected event: ${item.name}, ID: ${item._id}`); // Debugging: Log selected event
              setEventModalVisible(false); // Close modal
              requestServices(item); // Call requestServices with the selected event
              console.log(`Requesting services for event: ${item.name}`);
            }}
          >
            <Text style={styles.eventItemText}>{item.name || 'Unnamed Event'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderNoEvents = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Oops, it looks like you haven’t created any new events</Text>
      <TouchableOpacity style={styles.addEventButton} onPress={() => {
        setEventModalVisible(false);
      //  navigation.navigate('CreateEvent');
      }}>
        <Text style={styles.addEventText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        renderEmptyCartMessage()
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.vendor._id} // Ensure unique key for each cart item
          style={styles.list}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleRequestServices}>
        <Text style={styles.buttonText}>Request Services</Text>
      </TouchableOpacity>

      {/* Event selection modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={eventModalVisible}
        onRequestClose={() => setEventModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {events.length > 0 ? renderEventSelection() : renderNoEvents()}
          </View>
        </View>
      </Modal>

      {/* Vendor removal confirmation modal */}
      {selectedVendor && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Do you wish to remove {selectedVendor.vendor.name} from your cart?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButtonYes} onPress={confirmRemoveVendor}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonNo} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  list: {
    flex: 1,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cartItemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemVendorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cartItemPackage: {
    fontSize: 14,
    color: 'gray',
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  actionButton: {
    padding: 10,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 20,
    color: 'black',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonYes: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonNo: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  eventItemText: {
    fontSize: 16,
  },
  addEventButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#580A88',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addEventText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ShoppingCartScreen;
