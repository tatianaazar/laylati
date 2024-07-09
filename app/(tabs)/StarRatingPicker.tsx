import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type StarRatingOption = {
  label: string;
  value: string;
  key: number;
};

const starRatingOptions: StarRatingOption[] = [
  { label: '1 Star', value: '1', key: 1 },
  { label: '2 Stars', value: '2', key: 2 },
  { label: '3 Stars', value: '3', key: 3 },
  { label: '4 Stars', value: '4', key: 4 },
  { label: '5 Stars', value: '5', key: 5 },
];

const StarRatingPicker = ({ selectedValue, onValueChange }: { selectedValue: string | null, onValueChange: (value: string) => void }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterDropdown}>
        <Text style={styles.filterDropdownText}>
          {selectedValue ? `${selectedValue} Star${selectedValue > '1' ? 's' : ''}` : 'Choose Star Rating'}
        </Text>
        <FontAwesome name="caret-down" size={16} color="black" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={starRatingOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item.value)} style={styles.starRatingOption}>
                  <Text>{item.label}</Text>
                  <View style={styles.starsContainer}>
                    {[...Array(item.key)].map((_, index) => (
                      <FontAwesome key={index} name="star" size={16} color="orange" />
                    ))}
                    {[...Array(5 - item.key)].map((_, index) => (
                      <FontAwesome key={index} name="star" size={16} color="gray" />
                    ))}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  filterDropdownText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 16,
  },
  starRatingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
});

export default StarRatingPicker;
