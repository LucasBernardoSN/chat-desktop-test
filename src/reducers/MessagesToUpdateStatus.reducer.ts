import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  ChatElement,
  ListOfMessagesToUpdateStatus,
  MessageElement,
  MessagesToUpdateStatus,
} from '../types';
import { MESSAGESTATUS, MessageStatus } from '../utils';

const initialState: MessagesToUpdateStatus = {};

const MessagesToUpdateStatusSlice = createSlice({
  name: 'MessagesToUpdateStatus',
  initialState,
  reducers: {
    createListMessagesToUpdateStatus(
      state,
      action: PayloadAction<Pick<ChatElement, 'receiverid'>>
    ) {
      const { receiverid } = action.payload;

      if (Object.hasOwn(state, receiverid) === false) {
        return {
          ...state,
          [receiverid]: {
            receiverid,
            listOfReadMessages: [],
            listOfReceivedMessages: [],
            listOfDeleteMessages: [],
          },
        };
      }
    },

    addMessageToUpdateStatus(
      state,
      action: PayloadAction<
        Pick<ChatElement, 'receiverid'> &
          Pick<MessageElement, 'id'> & { status: MessageStatus }
      >
    ) {
      const { receiverid, id, status } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        if (status === MESSAGESTATUS.RECEIVED) {
          state[receiverid].listOfReceivedMessages.push(id);
        } else if (status === MESSAGESTATUS.READ) {
          state[receiverid].listOfReadMessages.push(id);
        } else if (status === MESSAGESTATUS.DELETED) {
          state[receiverid].listOfDeleteMessages.push(id);
        }
      }
    },

    removeListMessagesToUpdateStatus(
      state,
      action: PayloadAction<
        Pick<ChatElement, 'receiverid'> &
          Pick<
            ListOfMessagesToUpdateStatus,
            | 'listOfReadMessages'
            | 'listOfReceivedMessages'
            | 'listOfDeleteMessages'
          >
      >
    ) {
      const {
        receiverid,
        listOfReadMessages,
        listOfReceivedMessages,
        listOfDeleteMessages,
      } = action.payload;

      if (Object.hasOwn(state, receiverid)) {
        for (const id of listOfReceivedMessages) {
          let idIndex = state[receiverid].listOfReceivedMessages.indexOf(id);
          if (idIndex > -1) {
            state[receiverid].listOfReceivedMessages.splice(idIndex, 1);
          }
        }

        for (const id of listOfReadMessages) {
          let idIndex = state[receiverid].listOfReadMessages.indexOf(id);
          if (idIndex > -1) {
            state[receiverid].listOfReadMessages.splice(idIndex, 1);
          }
        }
        for (const id of listOfDeleteMessages) {
          let idIndex = state[receiverid].listOfDeleteMessages.indexOf(id);
          if (idIndex > -1) {
            state[receiverid].listOfDeleteMessages.splice(idIndex, 1);
          }
        }
      }
    },
  },
});

export const {
  createListMessagesToUpdateStatus,
  removeListMessagesToUpdateStatus,
  addMessageToUpdateStatus,
} = MessagesToUpdateStatusSlice.actions;
export default MessagesToUpdateStatusSlice.reducer;
