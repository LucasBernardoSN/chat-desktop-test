import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  ChatElement,
  MessageElement,
  MessageList,
  MessageListStatus,
} from '../types';

const initialState: MessageList = {};

const MessageListSlice = createSlice({
  name: 'MessageList',
  initialState,
  reducers: {
    setMessageList(state, action: PayloadAction<MessageList>) {
      return { ...state, ...action.payload };
    },

    addMessages(
      state,
      action: PayloadAction<
        Pick<MessageListStatus, 'messages'> &
          Pick<ChatElement, 'receiverid'> & {
            addBelow?: boolean;
          }
      >
    ) {
      const { receiverid, addBelow, messages } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        for (const message of messages) {
          if (
            state[receiverid].messages.filter(function (e) {
              return e.id === message.id;
            }).length > 0
          ) {
            // console.error('ID DUPLICADO');
          } else {
            if (addBelow) {
              state[receiverid].messages = [
                message,
                ...state[receiverid].messages,
              ];
            } else {
              state[receiverid].messages = [
                ...state[receiverid].messages,
                message,
              ];
            }
          }
        }
      }
    },

    updateMessageStatus(
      state,
      action: PayloadAction<
        Pick<MessageElement, 'id' | 'messagereadstatus'> &
          Pick<ChatElement, 'receiverid'>
      >
    ) {
      const { id, messagereadstatus, receiverid } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        const messageList = state[receiverid].messages;

        let messageToUpdate = messageList.find((message) => {
          return message.id === id;
        });

        if (messageToUpdate) {
          messageToUpdate.messagereadstatus = messagereadstatus;
        }
      }
    },

    updateMessageIndex(
      state,
      action: PayloadAction<
        Pick<MessageElement, 'id' | 'index'> & Pick<ChatElement, 'receiverid'>
      >
    ) {
      const { id, index, receiverid } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        const messageList = state[receiverid].messages;

        let messageToUpdate = messageList.find((message) => {
          return message.id === id;
        });

        if (messageToUpdate) {
          messageToUpdate.index = index;
        }
      }
    },

    updateHasMoreMessages(
      state,
      action: PayloadAction<
        Pick<ChatElement, 'receiverid'> & Partial<MessageListStatus>
      >
    ) {
      const { receiverid } = action.payload;
      if (receiverid) {
        if (Object.hasOwn(state, receiverid)) {
          state[receiverid] = {
            ...state[receiverid],
            ...action.payload,
          };
        }
      }
    },

    clearMessageList(
      state,
      action: PayloadAction<Pick<ChatElement, 'receiverid'>>
    ) {
      const { receiverid } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        state[receiverid].messages = [];
      }
    },
  },
});

export const {
  addMessages,
  clearMessageList,
  setMessageList,
  updateHasMoreMessages,
  updateMessageStatus,
  updateMessageIndex,
} = MessageListSlice.actions;

export default MessageListSlice.reducer;
