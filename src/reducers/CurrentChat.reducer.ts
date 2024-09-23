import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ChatElement, CurrentChat, MessageElement } from '../types';

const initialState: CurrentChat = {
  currentChatId: undefined,
  activeUsers: [],
  searchMessage: '',
  searchMessageIndex: undefined,
  currentReference: undefined,
  forwardedMessage: '',
};

const CurrentChatSlice = createSlice({
  name: 'CurrentChat',
  initialState,
  reducers: {
    setCurrentChatId(
      state,
      action: PayloadAction<Pick<CurrentChat, 'currentChatId'>>
    ) {
      return { ...state, ...action.payload };
    },

    addActiveUser(
      state,
      action: PayloadAction<Pick<ChatElement, 'receiverid'>>
    ) {
      const { receiverid } = action.payload;

      const newActiveUsers = [...state.activeUsers, receiverid];
      state.activeUsers = newActiveUsers;
    },

    updateSearchMessage(state, action: PayloadAction<string>) {
      state.searchMessage = action.payload;
    },

    updateSearchMessageIndex(state, action: PayloadAction<number>) {
      state.searchMessageIndex = action.payload;
    },

    clearReference(state) {
      state.currentReference = undefined;
    },

    setReference(state, action: PayloadAction<MessageElement>) {
      state.currentReference = action.payload;
    },

    setForwardedMessage(state, action: PayloadAction<string>) {
      state.forwardedMessage = action.payload;
    },

    clearCurrentChat(state) {
      state = {
        currentChatId: 0,
        activeUsers: [],
        searchMessage: '',
        searchMessageIndex: undefined,
        currentReference: undefined,
        forwardedMessage: '',
      };
    },
  },
});

export const {
  setCurrentChatId,
  setReference,
  updateSearchMessageIndex,
  addActiveUser,
  clearCurrentChat,
  updateSearchMessage,
  clearReference,
  setForwardedMessage,
} = CurrentChatSlice.actions;
export default CurrentChatSlice.reducer;
