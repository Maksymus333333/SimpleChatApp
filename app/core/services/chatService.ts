import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Chat {
  id: string;
  name: string;
  messages: string[];
}

const STORAGE_KEY = '@chats';

export const saveChatsToStorage = async (chats: Chat[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Error saving chats to AsyncStorage:', error);
  }
};

export const getChats = async (): Promise<Chat[]> => {
  try {
    const chatsJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (chatsJson) {
      return JSON.parse(chatsJson);
    } else {
      return [
        { id: '1', name: 'General', messages: ['Welcome to General chat!'] },
        { id: '2', name: 'Random', messages: ['Random chat started!'] },
      ];
    }
  } catch (error) {
    console.error('Error fetching chats from AsyncStorage:', error);
    return [];
  }
};

export const createChat = async (name: string): Promise<Chat> => {
  try {
    const newChat: Chat = {
      id: Date.now().toString(),
      name,
      messages: [], 
    };
    const chats = await getChats();
    chats.push(newChat);
    await saveChatsToStorage(chats);
    return newChat;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

export const deleteChatService = async (id: string): Promise<void> => {
  try {
    const chats = await getChats();
    const updatedChats = chats.filter(chat => chat.id !== id);
    await saveChatsToStorage(updatedChats);
  } catch (error) {
    console.error('Error deleting chat from AsyncStorage:', error);
    throw error;
  }
};

export const renameChatService = async (id: string, newName: string): Promise<void> => {
  try {
    const chats = await getChats();
    const chatIndex = chats.findIndex(chat => chat.id === id);
    if (chatIndex !== -1) {
      chats[chatIndex].name = newName;
      await saveChatsToStorage(chats);
    }
  } catch (error) {
    console.error('Error renaming chat:', error);
    throw error;
  }
};

export const addMessageService = async (chatId: string, message: string): Promise<void> => {
  try {
    const chats = await getChats();
    const chatIndex = chats.findIndex(chat => chat.id === chatId);
    if (chatIndex !== -1) {
      if (!chats[chatIndex].messages) {
        chats[chatIndex].messages = [];
      }
      chats[chatIndex].messages.push(message);
      await saveChatsToStorage(chats);  
    } else {
      console.error(`Chat with id ${chatId} not found`);
    }
  } catch (error) {
    console.error('Error adding message to chat:', error);
    throw error;
  }
};
 
export const saveChats = (chats: Chat[]) => {
  saveChatsToStorage(chats);
};
function generateUniqueId(): string {
  throw new Error('Function not implemented.');
}

