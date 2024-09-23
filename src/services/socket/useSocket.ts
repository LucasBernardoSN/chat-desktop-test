import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket, io } from 'socket.io-client';

import {
  RootState,
  setIsOnline,
  setIsWriting,
  userLogout,
} from '../../reducers';
import {
  ChatElement,
  DevicesTypes,
  MessageElement,
  SyncAction,
  UpdateMessageStatusProps,
  UserStatus,
} from '../../types';
import { DEVICE, SOCKET_URL } from '../config';
import { useSocketHandler } from './index';

var socketDeFora: Socket;

interface SocketState {
  updateStage?: (stageId: number, value: boolean) => void;
}

export default function useSocket(props: SocketState) {
  const app = window.require('electron');
  const ipcRenderer = app.ipcRenderer;
  const { token } = useSelector((state: RootState) => state.Auth);
  const socketTransportOptions = {
    transportOptions: {
      polling: {
        extraHeaders: {
          authorization: token,
          id_termmony: DEVICE,
        },
      },
    },
  };

  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessageList, setNewMessageList] = useState<MessageElement[]>([]);

  const handleSocketIO = useCallback(() => {
    const socketConnection = io(SOCKET_URL, socketTransportOptions);
    socketDeFora = socketConnection;
    setSocket(socketConnection);
  }, []);

  const dispatch = useDispatch();
  const {
    handleNewMessagesList,
    handleSyncActions,
    handleSyncSentMessages,
    handleUpdateMessageStatus,
  } = useSocketHandler();

  useEffect(() => {
    async function handleAsyncSocketMessage() {
      if (newMessageList.length) {
        await handleNewMessagesList(newMessageList);
        setNewMessageList([]);
        sendRead();
      }
    }
    handleAsyncSocketMessage();
  }, [newMessageList]);

  useEffect(() => {
    if (socket) {
      sendRead();
      sendReadUpdate();

      socket.on('connect', () => {
        if (props.updateStage) props.updateStage(7, true);
        // setIsLoading(false);
      });

      socket.on(
        'update_messages_status',
        async (response: UpdateMessageStatusProps[]) => {
          // console.log('UPDATE_MESSAGES_STATUS', response);
          response && handleUpdateMessageStatus(response);
          sendReadUpdate();
        }
      );

      socket.on('new_messages', (response: MessageElement[]) => {
        // console.log('NEW_MESSAGES', response);
        if (response.length) {
          setNewMessageList(response);
        }
      });

      socket.on('action_notification', (response: SyncAction) => {
        // console.log('ACTION_NOTIFICATION', response);
        response && handleSyncActions(response); ////
      });

      socket.on('actins_new_message', (response: MessageElement) => {
        // console.log('ACTINS_NEW_MESSAGE', response);
        response && handleSyncSentMessages(response); ////
      });

      socket.on('user_status', (response: UserStatus) => {
        // console.log('USER_STATUS', response);
        response && dispatch(setIsOnline(response));
      });

      socket.on(
        'writing',
        (response: Pick<ChatElement, 'isWriting' | 'receiverid'>) => {
          // console.log('WRITING', response);
          response && dispatch(setIsWriting(response));
        }
      );

      socket.on('connect_error', () => {
        // console.log('CONNECT_ERROR');
        setTimeout(() => socket.connect(), 1000);
      });

      socket.on('force_update', () => {
        console.log('FORCE_UPDATE');
        ipcRenderer.send('check-updates');
      });

      socket.on('disconnect', (response) => {
        // console.log('DISCONNECT - MOTIVO: ', response);
      });

      socket.on('reset_cache', (response) => {
        // console.log('RESET_CACHE', response);
      });

      socket.on('error', (response) => {
        // console.log('ERROR', response);
      });

      socket.on('close_user', (response) => {
        // console.log('CLOSE_USER', response);
        dispatch(userLogout());
      });
    }
  }, [socket]);

  function sendWriting(receiverid: number, isWriting: boolean) {
    // console.log('SEND_WRITING: ', isWriting + " - ", receiverid);
    socketDeFora &&
      socketDeFora.emit('send_writing', {
        receiverid,
        isWriting,
      });
  }

  function sendActionNotification(
    SyncActionData: Pick<SyncAction, 'actionData' | 'typeAction'>
  ) {
    // console.log('SEND_ACTION_NOTIFICATION', SyncActionData);
    const { actionData, typeAction } = SyncActionData;
    socketDeFora &&
      socketDeFora.emit('action_notification', {
        device: DEVICE,
        actionData,
        typeAction,
      });
  }

  function sendChat(receiverid: number) {
    // console.log('SEND_CHAT');
    socketDeFora &&
      socketDeFora.emit('send_chat', {
        active_user: receiverid,
      });
  }

  function sendRead() {
    // console.log('SEND_READ');
    socketDeFora && socketDeFora.emit('send_read', true);
  }

  function sendReadUpdate() {
    // console.log('SEND_READ_UPDATE');
    socketDeFora && socketDeFora.emit('send_read_update', true);
  }

  function sendSetUserStatus(
    state: 'Online' | string | '',
    id_termmony: DevicesTypes
  ) {
    // console.log('SET_USER_STATUS');
    socketDeFora &&
      socketDeFora.emit('set_user_status', { state, id_termmony });
  }
  function sendGetUserStatus(id: number) {
    // console.log('SEND_GET_USER_STATUS');
    socketDeFora && socketDeFora.emit('get_user_status', { id });
  }

  function disconnectSocket() {
    // console.log('USER_DISCONNECT');
    socketDeFora && socketDeFora.close();
    socketDeFora.disconnect();
    socketDeFora.removeAllListeners();
  }

  function sendForceUpdate(receiverid: number) {
    socketDeFora && socketDeFora.emit('force_update', { receiverid });
  }

  return {
    sendReadUpdate,
    sendRead,
    disconnectSocket,
    sendChat,
    sendActionNotification,
    sendWriting,
    sendSetUserStatus,
    handleSocketIO,
    sendGetUserStatus,
    sendForceUpdate,
  };
}
