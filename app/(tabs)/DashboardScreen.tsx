import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Define the type for an event
type Event = {
  _id: string;
  name: string;
  category: string;
  date: string;
  location: string;
};

const DashboardScreen = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddEventButton, setShowAddEventButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventLocation, setEventLocation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No token found, please log in again.');
          return;
        }

        const response = await axios.get('http://192.168.1.250:5000/api/events', {
          headers: {
            'x-auth-token': token,
          },
        });

        if (response.status === 200) {
          setEvents(response.data); // Set events from the backend
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        Alert.alert('Error', 'Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to handle the "Add Event" floating action button
  const handleFabPress = () => {
    setShowAddEventButton(!showAddEventButton);
  };

  const handleDateConfirm = (date: Date) => {
    setEventDate(date);
    setDatePickerVisibility(false);
  };

  // Function to create or update an event
  const handleSaveEvent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found, please log in again.');
        return;
      }

      console.log(editingEvent); // Add this to ensure the ID is present

      if (editingEvent) {
        // Update existing event
        console.log('Editing event ID:', editingEvent._id);
        const response = await axios.put(
          `http://192.168.1.250:5000/api/events/${editingEvent._id}`,
          {
            name: eventName,
            category: eventCategory,
            date: eventDate,
            location: eventLocation,
          },
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );

        if (response.status === 200) {
          setEvents(events.map(event => (event._id === editingEvent._id ? response.data : event)));
          Alert.alert('Success', 'Event updated successfully');
        }
      } else {
        // Create new event
        const response = await axios.post(
          'http://192.168.1.250:5000/api/events/create',
          {
            name: eventName,
            category: eventCategory,
            date: eventDate,
            location: eventLocation,
          },
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );

        if (response.status === 200) {
          setEvents([...events, response.data]); // Add new event to the list
          Alert.alert('Success', 'Event created successfully');
        }
      }

      setModalVisible(false);
      setEventName('');
      setEventCategory('');
      setEventDate(new Date());
      setEventLocation('');
      setEditingEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
      Alert.alert('Error', 'Failed to save event.');
    }
  };

  // Function to delete an event
  const handleDeleteEvent = async (eventId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found, please log in again.');
        return;
      }

      const response = await axios.delete(`http://192.168.1.250:5000/api/events/${eventId}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      if (response.status === 200) {
        setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
        Alert.alert('Success', 'Event deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Failed to delete event.');
    }
  };

  // Function to handle 3 dots menu click
  const handleEventOptions = (event: Event) => {
    Alert.alert(
      'Event Options',
      'What would you like to do?',
      [
        { text: 'Edit', onPress: () => editEvent(event) },
        { text: 'Delete', onPress: () => handleDeleteEvent(event._id), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  // Function to handle event edit
  const editEvent = (event: Event) => {
    console.log("Editing event ID:", event._id);
    setEditingEvent(event);
    setEventName(event.name);
    setEventCategory(event.category);
    setEventDate(new Date(event.date));
    setEventLocation(event.location);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDetails}>{item.category}</Text>
      <Text style={styles.eventDetails}>{new Date(item.date).toDateString()}</Text>
      <TouchableOpacity onPress={() => handleEventOptions(item)} style={styles.iconContainer}>
        <FontAwesome name="ellipsis-v" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="bars" size={24} color="black" style={styles.menuIcon} />
        <Text style={styles.title}>Dashboard</Text>
      </View>

      {events.length === 0 ? (
        <View style={styles.content}>
          <Text style={styles.message}>Oops, it looks like you haven’t created any new events</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
        />
      )}

      {showAddEventButton && (
        <TouchableOpacity style={styles.addEventButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addEventButtonText}>Add new event</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal for adding/editing an event */}
      {modalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{editingEvent ? 'Edit Event' : 'Add New Event'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Event Name"
              value={eventName}
              onChangeText={setEventName}
              placeholderTextColor="black"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Event Category"
              value={eventCategory}
              onChangeText={setEventCategory}
              placeholderTextColor="black"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Event Location"
              value={eventLocation}
              onChangeText={setEventLocation}
              placeholderTextColor="black"
            />
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.datePicker}>
              <Text style={styles.datePickerText}>
                {eventDate ? eventDate.toDateString() : 'Select Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 16,
  },
  menuIcon: {
    position: 'absolute',
    left: 14,
    top: 24,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginTop: 28,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    width: 276,
    height: 72,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24.4,
    textAlign: 'center',
    opacity: 0.6,
    color: 'gray',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addEventButton: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#E6CBF6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addEventButtonText: {
    color: 'black',
    marginLeft: 24,
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  datePicker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    width: '100%',
  },
  datePickerText: {
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E6CBF6',
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'black',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: 'white',
  },
  eventItem: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 14,
    color: 'gray',
  },
  listContent: {
    paddingBottom: -50,  // Add some padding to prevent content from being cut off
  },
});

export default DashboardScreen;
