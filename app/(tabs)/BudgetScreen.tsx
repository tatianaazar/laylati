import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BudgetScreen = () => {
  const [budget, setBudget] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('budget', JSON.stringify(budget));
      console.log('Budget saved:', budget);
      setIsSaved(true);
      navigation.navigate('Main', { isBudgetSaved: true });
    } catch (e) {
      console.error('Failed to save the budget.', e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
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
          <Text style={styles.label}>Provide a total budget</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={() => setBudget(null)}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, isSaved && styles.savedButton]}
              onPress={handleSave}
              disabled={budget === null}
            >
              <Text style={styles.saveButtonText}>{isSaved ? 'Saved!' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  backButtonText: {
    fontSize: 24,
    color: 'black',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  input: {
    fontSize: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    width: 233, // 233px
    height: 71, // 71px
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: '#F1F1F1', // background color
    color: 'black', // Ensures the input text is black
  },
  label: {
    width: 168,
    height: 18,
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18.3,
    textAlign: 'left',
    color: '#000000',
    marginBottom: 500,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  clearButton: {
    width: 144,
    height: 36,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: 144,
    height: 36,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'black',
    fontSize: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  savedButton: {
    backgroundColor: '#35383F',
  },
});

export default BudgetScreen;
