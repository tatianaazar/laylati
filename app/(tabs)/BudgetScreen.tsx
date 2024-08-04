import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

const BudgetScreen = () => {
  const [budget, setBudget] = useState<number | null>(null);

  const handleSave = () => {
    // Handle the save action
    console.log('Budget saved:', budget);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <CurrencyInput
        value={budget}
        onChangeValue={setBudget}
        prefix="$"
        delimiter=","
        separator="."
        precision={3}
        style={styles.input}
        placeholder="$0.000"
        placeholderTextColor="black"
      />
      <Text style={styles.label}>Provide a budget</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={() => setBudget(null)}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    fontSize: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    color: 'black', // Ensures the input text is black
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  clearButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'black',
    fontSize: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BudgetScreen;
