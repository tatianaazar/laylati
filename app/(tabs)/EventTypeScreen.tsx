import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


const EventTypeScreen = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);


  const eventTypes = [
    'Wedding',
    'Engagement',
    'Baby Shower',
    'Conference',
    'Birthday Party',
    'Other',
  ];


  const handleEventPress = (eventType: string) => {
    setSelectedEvent(eventType);
  };


  const handleSavePress = () => {
    // Handle save action here
    console.log('Selected Event Type:', selectedEvent);
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {eventTypes.map((eventType) => (
          <TouchableOpacity
            key={eventType}
            style={[
              styles.eventButton,
              selectedEvent === eventType && styles.selectedEventButton,
            ]}
            onPress={() => handleEventPress(eventType)}
          >
            <Text
              style={[
                styles.eventButtonText,
                selectedEvent === eventType && styles.selectedEventButtonText,
              ]}
            >
              {eventType}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
    backgroundColor: 'white',
    justifyContent: 'center',  // Center vertically
    marginTop: -60
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  eventButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 25,  // Increased padding for larger buttons
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedEventButton: {
    backgroundColor: '#e0e0e0',
  },
  eventButtonText: {
    fontSize: 18,
    color: 'purple',
  },
  selectedEventButtonText: {
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: -25,
    width: '150%',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
  },
});


export default EventTypeScreen;
