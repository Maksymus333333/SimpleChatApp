import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../core/redux/store';
import { addMessage } from '../core/redux/chatSlice';
import { addMessageService } from '../core/services/chatService';

const Chat = ({ route }: { route: any }) => {
  const { chatId } = route.params;
  const chats = useSelector((state: RootState) => state.chat.chats);
  const chat = chats.find(chat => chat.id === chatId);
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');

 
  const initialMessages = [
    { id: '1', sender: 'other', message: 'Hello! Jhon Abraham' },
    { id: '2', sender: 'other', message: 'Hello! Nazrul How are you?' }, 
  ];
  
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = async () => {
    if (chat && newMessage.trim()) {
      try {
        await addMessageService(chatId, newMessage);
        dispatch(addMessage({ chatId, message: newMessage }));
        setMessages(prevMessages => [...prevMessages, { id: String(prevMessages.length + 1), sender: 'me', message: newMessage }]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        Alert.alert('Error', 'Failed to send message');
      }
    } else if (!chat) {
      Alert.alert('Error', 'Chat not found');
    }
  };

  const renderMessage = ({ item }: { item: string }) => {
    const isOutgoing = true;
    const messageContainerStyle = isOutgoing ? styles.outgoingMessage : styles.incomingMessage;
    const messageTextStyle = isOutgoing ? styles.outgoingMessageText : styles.incomingMessageText;

    return (
      <View style={[styles.messageContainer, messageContainerStyle]}>
        <Text style={messageTextStyle}>{item}</Text>
      </View>
    );
  };

  const renderInput = () => {
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../assets/Clip, Attachment.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Write your message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../assets/camera 01.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../assets/Group 68.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {chat ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>{chat.name}</Text>
          </View>
          <FlatList
             data={chat.messages}
            renderItem  = {renderMessage}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.messageList}
          />
          {renderInput()}
        </>
      ) : (
        <Text style={styles.notFound}>Chat not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center', 
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageList: {
    paddingHorizontal: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  incomingMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1FFC7',
  },
  incomingMessageText: {
    color: '#000',
  },
  outgoingMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  outgoingMessageText: {
    color: '#000',
  },
  notFound: {
    fontSize: 18,
    color: 'red',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chat;