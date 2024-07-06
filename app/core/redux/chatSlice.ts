import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, saveChats, getChats, saveChatsToStorage } from '../services/chatService';

export interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
      saveChats(state.chats);
      saveChatsToStorage(state.chats);
    },
    updateChat: (state, action: PayloadAction<Chat>) => {
      const index = state.chats.findIndex(chat => chat.id === action.payload.id);
      if (index !== -1) {
        state.chats[index] = action.payload;
        saveChats(state.chats);
        saveChatsToStorage(state.chats);
      }
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter(chat => chat.id !== action.payload);
      saveChats(state.chats);
      saveChatsToStorage(state.chats);
    },
    renameChat: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const chat = state.chats.find(chat => chat.id === action.payload.id);
      if (chat) {
        chat.name = action.payload.newName;
        saveChats(state.chats);
        saveChatsToStorage(state.chats);
      }
    },
    addMessage: (state, action: PayloadAction<{ chatId: string; message: string }>) => {
      const chat = state.chats.find(chat => chat.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        saveChats(state.chats);
        saveChatsToStorage(state.chats);
      }
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    loadChatsFromStorage: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
  },
});

export const { addChat, updateChat, deleteChat, renameChat, addMessage, setChats, loadChatsFromStorage } = chatSlice.actions;
export default chatSlice.reducer;
