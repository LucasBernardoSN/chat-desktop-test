import CryptoJS from 'crypto-js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  addMessages,
  clearReference,
  updateLastMessage,
  updateMessageCount,
} from '../../reducers';
import {
  clearMessageList,
  updateMessageIndex,
} from '../../reducers/MessageList.reducer';
import { MessageElement } from '../../types';
import { SECRET } from '../config';
import useApi from './useApi';
import useAsyncApiCall from './useAsyncApiCall';
import useFetchMessages from './useFetchMessages';
import useHasNetworkConnection from './useHasNetworkConnection';

export default function useTransmissionMessage() {
  const dispatch = useDispatch();
  const { handleSendMessage, handleUpdateStatusOfAllMessages } = useApi();
  const { checkConnectionWithServer } = useHasNetworkConnection();
  const { setTextMessagesPostFailed } = useAsyncApiCall();
  const { handleFetchMessages } = useFetchMessages();
  const messageList = useSelector((state: RootState) => state.MessageList);
  const currentChatId = useSelector(
    (state: RootState) => state.CurrentChat.currentChatId
  );

  async function transmissionMessage(
    newMessage: MessageElement,
    receiverid: number
  ) {
    let message = new URLSearchParams();

    const incriptedMessage = {
      ...newMessage,
      body: CryptoJS.AES.encrypt(
        JSON.stringify(newMessage.body),
        SECRET
      ).toString(),
      index: 0,
    };

    const {
      author,
      body,
      chats,
      datemessage,
      device,
      id,
      messagereadstatus,
      reference,
      typemessage,
    } = incriptedMessage;

    if (Object.hasOwn(messageList, receiverid)) {
      const { hasMessagesBelow } = messageList[receiverid];

      if (hasMessagesBelow && receiverid) {
        if (await checkConnectionWithServer()) {
          dispatch(clearMessageList({ receiverid }));

          const { failed } = await handleUpdateStatusOfAllMessages(receiverid);

          if (failed) {
            window.location.reload();
          } else {
            dispatch(
              updateMessageCount({
                messagecount: -1,
                receiverid,
              })
            );
            const { FetchMessageFailed } = await handleFetchMessages(
              receiverid,
              'onScrollAll',
              {
                firstfetch: true,
                messagecount: 0,
              }
            );

            FetchMessageFailed && window.location.reload();
          }
        }
      }
    }

    message.append(`id`, `${id}`);
    message.append(`typemessage`, `${typemessage}`);
    message.append(`body`, `${body}`);
    message.append(`datemessage`, `${datemessage}`);
    message.append(`messagereadstatus`, `${messagereadstatus}`);
    message.append(`device`, `${device}`);
    message.append(`author`, `${author}`);
    message.append(`chats`, `${chats}`);
    message.append(`reference`, `${reference}`);

    if (Object.hasOwn(messageList, receiverid)) {
      dispatch(
        addMessages({
          messages: [incriptedMessage],
          receiverid,
          addBelow: true,
        })
      );
    }

    dispatch(
      updateLastMessage({
        lastmessage: body,
        lastmessagedate: datemessage,
        receiverid: receiverid,
      })
    );

    dispatch(clearReference());

    if (await checkConnectionWithServer()) {
      const { failed, data } = await handleSendMessage(message, receiverid);
      if (failed) {
        setTextMessagesPostFailed((curr) => [
          ...curr,
          { file: message, receiverid },
        ]);
      } else {
        dispatch(updateMessageIndex({ id, index: data.index, receiverid }));
      }
    } else {
      setTextMessagesPostFailed((curr) => [
        ...curr,
        { file: message, receiverid },
      ]);
    }
  }

  return { transmissionMessage };
}
