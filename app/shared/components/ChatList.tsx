import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Chat } from '../../core/services/chatService';

const ChatList = ({ chats, navigation }: { chats: Chat[], navigation: any }) => {
  const handlePress = (chatId: string) => {
    navigation.navigate('Chat', { chatId });
  };

  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.chatItem}>
          <Text style={styles.chatName}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatName: {
    fontSize: 18,
  },
});

export default ChatList;
