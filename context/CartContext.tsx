import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CartItem = {
  vendor: any;
  package: string;
};

type Event = {
  _id: string;  // Include _id as a string type
  name: string;
  category: string;
  date: string;
  location: string;
  // Include other fields as needed
};


interface CartContextType {
  cartItems: CartItem[];
  addToCart: (vendor: any, packageName: string) => void;
  requestServices: (event: any) => void; // Accepts event parameter
  removeFromCart: (vendorId: string) => void;
  events: any[]; // Added events type
  fetchUserEvents: () => void; // Fetch user events
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const fetchUserEvents = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        setEvents([]);  // Ensure events state is reset if token is missing
        return;
      }
  
      const response = await axios.get('http://192.168.1.250:5000/api/events', {
        headers: {
          'x-auth-token': token,
        },
      });
  
      if (response.status === 200) {
        setEvents(response.data);  // Update the events in state
      } else {
        console.error('Failed to fetch events');
        setEvents([]);  // Reset the events in case of failure
      }
    } catch (error) {
      console.error('Error fetching user events:', error);
      setEvents([]);  // Ensure events are reset in case of an error
    }
  };
  
  

  // Store fetched events in AsyncStorage
const cacheEvents = async (events) => {
  await AsyncStorage.setItem('events', JSON.stringify(events));
};

// Load cached events before fetching fresh data
const loadCachedEvents = async () => {
  const cachedEvents = await AsyncStorage.getItem('events');
  if (cachedEvents) {
    setEvents(JSON.parse(cachedEvents)); // Set cached events in state
  }
};

useEffect(() => {
  loadCachedEvents();  // Load cached events when app starts
  fetchUserEvents();   // Then fetch fresh events from the API
}, []);

  

  useEffect(() => {
    if (!events.length) {  // Only fetch if there are no events loaded yet
      fetchUserEvents();
    }
  }, [events]);
  

  const addToCart = (vendor: any, packageName: string) => {
    const newCartItem = { vendor, package: packageName };
    setCartItems([...cartItems, newCartItem]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (vendorId: string) => {
    const updatedCart = cartItems.filter((item) => item.vendor._id !== vendorId);
    setCartItems(updatedCart);
  };

  // Function to request services for an event
const requestServices = async (selectedEvent: Event) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Ensure token is passed with the request

    const payload = {
      eventId: selectedEvent._id,
      vendors: cartItems.map((item) => ({
        vendorId: item.vendor._id,
        packageName: item.package,
      })),
    };

    console.log('Requesting services for event:', selectedEvent.name);
    console.log('Payload being sent:', payload);

    // Make the API request
    const response = await axios.post('http://192.168.1.250:5000/api/requests', payload, {
      headers: {
        'x-auth-token': token,  // Ensure the token is passed with the request
      },
    });

    // Handle the success response
    console.log('Services requested successfully:', response.data.msg);
    console.log('Request ID:', response.data.request._id);
    console.log('Event ID:', response.data.request.eventId);
    console.log('Services:', response.data.request.services);

    setCartItems([]); // Clear the cart after the request is successful
  } catch (error) {
    // Handle any errors
    console.error('Error requesting services:', error.response ? error.response.data : error);
  }
};

  
  
  
  
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, requestServices, events, fetchUserEvents }}>
      {children}
    </CartContext.Provider>
  );
};
