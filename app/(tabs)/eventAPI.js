import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your backend URL
const API_URL = 'http://192.168.1.250:5000/api/events'; // Update with your backend URL

// Get the token from AsyncStorage
const getToken = async () => {
    return await AsyncStorage.getItem('token'); // Ensure token is stored in AsyncStorage after login
  };
  
  // Create Event API call
  export const createEventAPI = async (name, category, date, location) => {
    const token = await getToken();
    if (!token) throw new Error('No token found');
  
    try {
      const response = await axios.post(
        `${API_URL}/events/create`, 
        { name, category, date, location },
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error creating event');
    }
  };