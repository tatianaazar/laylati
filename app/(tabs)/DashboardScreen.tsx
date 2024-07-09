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
      <View>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDetails}>{item.type} - {item.date.toDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
        <FontAwesome name="ellipsis-v" size={24} color="black" />
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
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />
            <TextInput
              style={styles.input}
              placeholder="Event Type"
              value={eventType}
              onChangeText={setEventType}
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
    left: 16,
    top: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addEventButtonText: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
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
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 14,
    color: 'gray',
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default DashboardScreen;
