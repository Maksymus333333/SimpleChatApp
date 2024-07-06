import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Image, Modal, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../core/redux/store';
import { addChat, deleteChat, renameChat, setChats } from '../core/redux/chatSlice';
import { createChat, getChats, deleteChatService, renameChatService, Chat } from '../core/services/chatService';

const Home = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats as Chat[]);
  const [newChatName, setNewChatName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState<Chat[]>(chats);
  const [showModal, setShowModal] = useState(false);
  const [groupInput, setGroupInput] = useState('');
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getChats();
      dispatch(setChats(chats));
      setFilteredChats(chats);
    };

    fetchChats();
  }, [dispatch]);

  useEffect(() => {
    setFilteredChats(
      chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, chats]);

  const handleCreateChat = async () => {
    if (!newChatName.trim()) {
      Alert.alert('Error', 'Chat name cannot be empty');
      return;
    }
    const newChat = await createChat(newChatName);
    dispatch(addChat(newChat));
    setNewChatName('');
  };

  const handleDeleteChat = async () => {
    if (selectedChatId) {
      await deleteChatService(selectedChatId);
      dispatch(deleteChat(selectedChatId));
      setSelectedChatId(null);
      setDeleteConfirmModal(false);
    }
  };

  const handleRenameChat = async (id: string, newName: string) => {
    await renameChatService(id, newName);
    dispatch(renameChat({ id, newName }));
  };

  const handleCreateGroup = async () => {
    if (!groupInput.trim()) {
      Alert.alert('Error', 'Group name cannot be empty');
      return;
    }
    const newGroup = await createChat(groupInput);
    dispatch(addChat(newGroup));
    setGroupInput('');
    setShowModal(false);
  };

  const openDeleteConfirmModal = (id: string) => {
    setSelectedChatId(id);
    setDeleteConfirmModal(true);
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId: item.id })} onLongPress={() => openDeleteConfirmModal(item.id)}>
      <View style={styles.chatItem}>
        <Image style={styles.chatAvatar} source={require('../../assets/chat-avatar.png')} />
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatTime}>12:00 PM</Text>
          </View>
          <Text style={styles.chatMessage}>Last message in chat...</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chat Application</Text>
        <TouchableOpacity style={styles.groupIconContainer} onPress={() => setShowModal(true)}>
          <Image style={styles.groupIcon} resizeMode="cover" source={require('../../assets/Group 371.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999999"
        />
        <Image style={styles.searchIcon} resizeMode="cover" source={require('../../assets/Group 370.png')} />
      </View>
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Group</Text>
            <TextInput
              style={[styles.input, { marginBottom: 16 }]}
              placeholder="Enter group name"
              value={groupInput}
              onChangeText={setGroupInput}
              placeholderTextColor="#999999"
            />
            <View style={styles.modalButtons}>
              <Button title="Create Group" onPress={handleCreateGroup} />
              <Button title="Cancel" onPress={() => setShowModal(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteConfirmModal}
        onRequestClose={() => setDeleteConfirmModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Chat</Text>
            <Text>Are you sure you want to delete this chat?</Text>
            <View style={styles.modalButtons}>
              <Button title="Delete" onPress={handleDeleteChat} color="red" />
              <Button title="Cancel" onPress={() => setDeleteConfirmModal(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <NavBarUihut />
    </View>
  );
};

const NavBarUihut = () => {
  return (
    <View style={styles.navBarUihut}>
      <View style={styles.navBarUihutChild}>
        <Image style={styles.messageIcon} resizeMode="cover" source={require('../../assets/Message.png')} />
        <Text style={styles.message}>Message</Text>
      </View>
      <View style={styles.navBarUihutChild}>
        <Image style={styles.callIcon} resizeMode="cover" source={require('../../assets/Call.png')} />
        <Text style={styles.calls}>Calls</Text>
      </View>
      <View style={styles.navBarUihutChild}>
        <Image style={styles.userIcon} resizeMode="cover" source={require('../../assets/user.png')} />
        <Text style={styles.calls}>Contacts</Text>
      </View>
      <View style={styles.navBarUihutChild}>
        <Image style={styles.settingsIcon} resizeMode="cover" source={require('../../assets/settings.png')} />
        <Text style={styles.calls}>Settings</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000e08",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#000000',
    marginLeft: 16,
    marginRight: 16,
  },
  groupIconContainer: {
    padding: 8,
  },
  groupIcon: {
    width: 44,
    height: 44,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    color: '#000',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8, 
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 12,
  },
  navBarUihut: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  navBarUihutChild: {
    flex: 1,
    alignItems: 'center',
  },
  messageIcon: {
    width: 28,
    height: 28,
  },
  message: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  callIcon: {
    width: 28,
    height: 28,
  },
  calls: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  userIcon: {
    width: 28,
    height: 28,
  },
  settingsIcon: {
    width: 28,
    height: 28,
  },
});

export default Home;
