import chatReducer, { addChat, ChatState } from './chatSlice';
import { Chat } from '../services/chatService';

describe('chat reducer', () => {
  const initialState: ChatState = { chats: [] };

  it('should handle addChat', () => {
    const chat: Chat = { id: '1', name: 'Test Chat', messages: [] };
    const newState = chatReducer(initialState, addChat(chat));
    expect(newState.chats).toEqual([chat]);
  });
});
