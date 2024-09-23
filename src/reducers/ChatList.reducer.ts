import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ChatElement, ChatList, UserStatus } from '../types';
const app = window.require('electron');
const ipcRenderer = app.ipcRenderer;
const initialState: ChatList = {};
const ChatListSlice = createSlice({
  name: 'ChatList',
  initialState,
  reducers: {
    setChatList(state, action: PayloadAction<ChatElement>) {
      const { receiverid } = action.payload;
      return {
        ...state,
        [receiverid]: action.payload,
      };
    },

    setIsOnline(state, action: PayloadAction<UserStatus>) {
      const { id, group } = action.payload;

      function isValidDate(d: Date) {
        return d instanceof Date && !isNaN(d.valueOf());
      }

      if (Object.hasOwn(state, id)) {
        let userDevicesStates: string = '';

        for (const device of group) {
          userDevicesStates = userDevicesStates + device.state.toLowerCase();
        }

        if (userDevicesStates.includes('online')) {
          state[id].isOnline = 'Online';
        } else if (userDevicesStates.includes('0')) {
          let absentTimes = group.filter((item) => {
            return isValidDate(new Date(item.state)) === true;
          });

          absentTimes.sort((first, second) => {
            if (first === undefined) {
              return -1;
            }
            if (second === undefined) {
              return -1;
            }
            if (new Date(first.state) < new Date(second.state)) {
              return 1;
            } else {
              return -1;
            }
          });

          state[id].isOnline = absentTimes[0].state;
        }
      }
    },

    setIsWriting(
      state,
      action: PayloadAction<Pick<ChatElement, 'isWriting' | 'receiverid'>>
    ) {
      const { receiverid, isWriting } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        let chatElement = state[receiverid];
        chatElement.isWriting = isWriting;
      }
    },

    updateLastMessage(
      state,
      action: PayloadAction<
        Pick<ChatElement, 'lastmessage' | 'lastmessagedate' | 'receiverid'>
      >
    ) {
      const { lastmessage, lastmessagedate, receiverid } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        let chatElement = state[receiverid];
        chatElement.lastmessage = lastmessage;
        chatElement.lastmessagedate = lastmessagedate;
      }
    },

    updateMessageCount(
      state,
      action: PayloadAction<Pick<ChatElement, 'receiverid' | 'messagecount'>>
    ) {
      const { receiverid, messagecount } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        let chatElement = state[receiverid];
        if (messagecount === -1) {
          chatElement.messagecount = 0;
        } else {
          chatElement.messagecount = chatElement.messagecount + messagecount;
        }
      }
      const chatList = Object.values(state);
      let messageCount = 0;
      for (const chatItem of chatList) {
        messageCount = messageCount + chatItem.messagecount;
      }
      ipcRenderer.sendSync(
        'update-badge',
        messageCount <= 0 ? null : messageCount
      );
    },

    updateMessageText(
      state,
      action: PayloadAction<Pick<ChatElement, 'receiverid' | 'messageText'>>
    ) {
      const { receiverid, messageText } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        let chatElement = state[receiverid];
        chatElement.messageText = messageText;
      }
    },

    clearChatList(state) {
      state = {};
    },
  },
});

export const {
  clearChatList,
  setChatList,
  setIsOnline,
  setIsWriting,
  updateMessageCount,
  updateLastMessage,
  updateMessageText,
} = ChatListSlice.actions;
export default ChatListSlice.reducer;
