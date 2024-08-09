import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Button, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Define the type for an event
type Event = {
  id: string;
  name: string;
  type: string;
  date: Date;
};

const DashboardScreen = () => {
  const [showAddEventButton, setShowAddEventButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const handleFabPress = () => {
    setShowAddEventButton(!showAddEventButton);
  };

  const handleAddEventPress = () => {
    setModalVisible(true);
  };

  const handleDateConfirm = (date: Date) => {
    setEventDate(date);
    setDatePickerVisibility(false);
  };

  const handleSaveEvent = () => {
    const newEvent: Event = {
      id: Math.random().toString(),
      name: eventName,
      type: eventType,
      date: eventDate,
    };
    setEvents([...events, newEvent]);
    setEventName('');
    setEventType('');
    setEventDate(new Date());
    setModalVisible(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setEvents(events.filter(event => event.id !== eventId));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDeleteEvent(item.id)} style={styles.iconContainer}>
        <View style={styles.verticalDots}>
          <View style={styles.dot} />
          <View style={[styles.dot, { marginVertical: 3 }]} />
          <View style={styles.dot} />
        </View>
      </TouchableOpacity>
    </View>
  );

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
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      {showAddEventButton && (
        <TouchableOpacity style={styles.addEventButton} onPress={handleAddEventPress}>
          <Text style={styles.addEventButtonText}>Add new event</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Event Name"
              value={eventName}
              onChangeText={setEventName}
              placeholderTextColor={'black'}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Event Type"
              value={eventType}
              onChangeText={setEventType}
              placeholderTextColor={'black'}
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
              <Button title="Save" onPress={handleSaveEvent} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 20,
    color: 'black',
    marginTop: 28,
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    width: 250,
    height: 100,
    position: 'absolute',
    top: 80,
    left: 50,
    gap: 0,
    opacity: 1, // Set to 1 so the text is visible
    fontFamily: 'Montserrat', // Ensure you have Montserrat font loaded in your project
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24.4,
    textAlign: 'center',
    color: '#A1A1A1', // Ensure the text color is set to black or the desired color
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
    width: 206 ,
    position: 'absolute',
    bottom: 100,
    right: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E6CBF6',
    backgroundColor: '#E6CBF6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addEventButtonText: {
    color: 'black',
    marginLeft: 24,
    alignItems: 'center',
    fontFamily: 'Montserrat',
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
    color: 'black',
    fontFamily: 'Montserrat',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    color: 'black',
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
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#A1A1A1',
    borderRadius: 50, // High border radius to make it fully rounded
    backgroundColor: '#ffffff',
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    
  },
  eventName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Montserrat',
  },
  eventDetails: {
    fontSize: 12,
    color: 'gray',
  },
  listContent: {
    paddingBottom: 100,
  },
  verticalDots: {
    justifyContent: 'center', // Center the dots vertically within the container
    alignItems: 'center',
    height: 24, // Adjust height to match the space between dots
  },
  dot: {
    width: 5, // Size of each dot
    height: 5,
    borderRadius: 9, // Make the dots round
    backgroundColor: '#4A4A4A', // Black color for the dots
  },
});

export default DashboardScreen;
