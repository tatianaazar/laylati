import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types/types';

const EventTypeScreen = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();

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
    setIsSaved(false); // Reset saved state when a new event type is selected
  };

  const handleSavePress = () => {
    setIsSaved(true);
    console.log('Event type saved:', selectedEvent);
    navigation.navigate('Main', { isEventTypeSaved: true });
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
      <TouchableOpacity
        style={[styles.saveButton, isSaved && styles.savedButton]}
        onPress={handleSavePress}
        disabled={!selectedEvent}
      >
        <Text style={styles.saveButtonText}>{isSaved ? 'Saved!' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  eventButton: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    width: 233,
    height: 71,
    alignSelf: 'center',
  },
  selectedEventButton: {
    backgroundColor: '#E6CBF6',
  },
  eventButtonText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Montserrat_400Regular',
  },
  selectedEventButtonText: {
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '100%',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
  },
  savedButton: {
    backgroundColor: '#35383F',
  },
});

export default EventTypeScreen;
