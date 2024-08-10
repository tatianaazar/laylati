import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StarRatingPicker = ({ selectedValue, onValueChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePress = () => {
    setIsOpen(true);
  };

  const handleSelect = (value) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={handlePress}>
        <Text style={styles.inputText}>
          {selectedValue ? `${selectedValue} Stars` : 'Choose Star Rating'}
        </Text>
        <AntDesign name="down" size={16} color="black" />
      </TouchableOpacity>

      {/* Star Rating Modal */}
      <Modal
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {['1', '2', '3', '4', '5'].map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.modalItem}
                onPress={() => handleSelect(star)}
              >
                <Text style={styles.modalText}>{star} Stars</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Ensure it takes full width
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25, // Rounded edges
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 50, // Adjust height to match other inputs
  },
  inputText: {
    fontSize: 16,
    color: '#555',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default StarRatingPicker;
