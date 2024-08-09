import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ChatIcon from '../../assets/images/chatVendor.svg'; // Replace with your SVG file path

type Chat = {
  id: string;
  name: string;
  image: string;
};

const ChatsScreen = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
       // const response = await fetch('https://your-backend-url.com/api/chats'); // Replace with your API endpoint
       // const data = await response.json();
       // setChats(data);
      } catch (error) {
     //   console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const renderItem = ({ item }: { item: Chat }) => (
    <View style={styles.chatItem}>
      <Image source={{ uri: item.image }} style={styles.chatImage} />
      <Text style={styles.chatName}>{item.name}</Text>
      <TouchableOpacity style={styles.chatIcon}>
        <ChatIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <FontAwesome name="bars" size={24} color="black" style={styles.menuIcon} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : chats.length === 0 ? (
        <View style={styles.noChatsContainer}>
          <Text style={styles.noChatsText}>Oops, it looks like you don’t have any chats</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Monserrat', // Ensure you have this font loaded
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    opacity: 0.6, // Matches the faded appearance in the UpdatesScreen
    width: 276,
    height: 72,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: 24.4,
  },
  chatList: {
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatName: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat_400Regular', // Ensure you have this font loaded
    flex: 1,
  },
  menuIcon: {
    position: 'absolute',
    left: 30, // Position the menu icon
    top: 40, // Position the menu icon
  },
  chatIcon: {
    padding: 10,
  },
});

export default ChatsScreen;
