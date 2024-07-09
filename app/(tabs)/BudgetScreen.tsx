import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CurrencyInput from 'react-native-currency-input';


const BudgetScreen = () => {
  const [budget, setBudget] = useState<number | null>(null);


  const handleSave = () => {
    // Handle the save action
    console.log('Budget saved:', budget);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Budget</Text>
      <CurrencyInput
        value={budget}
        onChangeValue={setBudget}
        prefix="$"
        delimiter=","
        separator="."
        precision={2}
        style={styles.input}
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
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontSize: 32,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  clearButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'black',
  },
  saveButtonText: {
    color: 'white',
  },
});


export default BudgetScreen;
