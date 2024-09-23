import React from 'react';
import { useSelector } from 'react-redux';

import app from '../../../package.json';
import { RootState } from '../../reducers';
import { FetchMessageProps } from '../../types/services.types';
import { MessageStatus } from '../../utils';
import { AUTH_URL, BASE_IMAGE_URL, MAIN_URL } from '../config';
import { apiRequestHandler } from './apiRequestHandler';

export default function useApi() {
  const { token } = useSelector((state: RootState) => state.Auth);
  const headers = { Authorization: `Bearer ${token}` };

  async function handleUserLogin(credentials: string) {
    return await apiRequestHandler('userLogin', {
      baseUrl: AUTH_URL,
      params: `/auth`,
      method: 'POST',
      headers: { Authorization: `${credentials}` },
      requestName: 'User Login',
    });
  }

  async function handleSendMessage(
    message: URLSearchParams,
    receiverid: number
  ) {
    return await apiRequestHandler('sendMessage', {
      baseUrl: MAIN_URL,
      params: `/message/${receiverid}`,
      method: 'POST',
      data: message,
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      requestName: 'Send Message',
    });
  }

  async function handleSendFile(message: FormData, receiverid: number) {
    return await apiRequestHandler('sendMessage', {
      baseUrl: MAIN_URL,
      params: `/message/${receiverid}/file`,
      method: 'POST',
      data: message,
      headers: {
        ...headers,
        'Content-Type':
          'multipart/form-data; boundary=<calculated when request is sent>',
      },
      requestName: 'Send Message',
    });
  }

  async function handleCreateNewChat(receiverid: number) {
    return await apiRequestHandler('noResponseData', {
      baseUrl: MAIN_URL,
      params: `/chat/${receiverid}`,
      method: 'POST',
      headers,
      requestName: 'Create New Chat',
    });
  }

  async function handleCreateUpdateUser() {
    return await apiRequestHandler('createUpdateUser', {
      baseUrl: MAIN_URL,
      params: `/user`,
      method: 'PUT',
      headers: { ...headers, appversion: app.version },
      requestName: 'Create/Update User',
    });
  }

  async function handleUpdateStatusMessage(
    messagestoupdate: string[],
    receiverid: number,
    status: MessageStatus
  ) {
    let newMessagestoupdate = new URLSearchParams();
    newMessagestoupdate.append(
      'messagestoupdate',
      `${JSON.stringify(messagestoupdate)}`
    );

    return await apiRequestHandler('noResponseData', {
      baseUrl: MAIN_URL,
      params: `/message/${receiverid}`,
      method: 'PUT',
      data: newMessagestoupdate,
      headers: {
        ...headers,
        status,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      requestName: 'Update Message Status',
    });
  }

  async function handleUpdateStatusOfAllMessages(receiverid: number) {
    return await apiRequestHandler('noResponseData', {
      baseUrl: MAIN_URL,
      params: `/message/${receiverid}/all`,
      method: 'PUT',
      headers,
      requestName: 'Update All Message Status',
    });
  }

  async function handleTokenValidation() {
    return await apiRequestHandler('noResponseData', {
      baseUrl: AUTH_URL,
      params: `/validar-token`,
      method: 'GET',
      headers,
      requestName: 'Token Validation',
    });
  }

  async function handleFetchOneChat(receiverid: number) {
    return await apiRequestHandler('fetchOneChat', {
      baseUrl: MAIN_URL,
      params: `/chat/${receiverid}`,
      method: 'GET',
      headers,
      requestName: 'Fetch One Chat',
    });
  }

  async function handleFetchChatList() {
    return await apiRequestHandler('fetchChatList', {
      baseUrl: MAIN_URL,
      params: `/chats`,
      method: 'GET',
      headers,
      requestName: 'Fetch Chat List',
    });
  }

  async function handleFetchContactList() {
    return await apiRequestHandler('fetchContactList', {
      baseUrl: MAIN_URL,
      params: `/users`,
      method: 'GET',
      headers,
      requestName: 'Fetch Contact List',
    });
  }

  async function handleFetchMessageList(
    receiverid: number,
    fetchMessageProps:
      | FetchMessageProps['onClick']
      | FetchMessageProps['onScroll']
  ) {
    return await apiRequestHandler('fetchMessageList', {
      baseUrl: MAIN_URL,
      params: `/messages/${receiverid}`,
      method: 'GET',
      headers: { ...headers, ...fetchMessageProps },
      requestName: 'Fetch Message List',
    });
  }

  async function handleServerPing() {
    return await apiRequestHandler('noResponseData', {
      baseUrl: MAIN_URL,
      params: `/`,
      method: 'GET',
      headers,
      requestName: 'Server Ping',
    });
  }

  async function handleValidateUserImage(filepath: string) {
    return await apiRequestHandler('validateUserImage', {
      baseUrl: BASE_IMAGE_URL,
      params: `/thereisfile`,
      method: 'GET',
      headers: { ...headers, filepath },
      requestName: 'Validate User Image',
    });
  }

  async function handleUpdateProfileImage(file: File) {
    let newUserProfileImage = new FormData();
    newUserProfileImage.append('file', file);

    return await apiRequestHandler('noResponseData', {
      baseUrl: MAIN_URL,
      params: `/user/profile`,
      method: 'POST',
      data: newUserProfileImage,
      headers,
      requestName: 'Update Profile Image',
    });
  }

  async function handleFetchSearchMessages(receiverid: number, search: string) {
    return await apiRequestHandler('fetchSearchMessages', {
      baseUrl: MAIN_URL,
      params: `/message/${receiverid}/search?search=${search}`,
      method: 'GET',
      headers,
      requestName: 'Fetch Search Messages',
    });
  }

  return {
    handleCreateNewChat,
    handleCreateUpdateUser,
    handleFetchChatList,
    handleFetchContactList,
    handleFetchMessageList,
    handleFetchOneChat,
    handleSendFile,
    handleSendMessage,
    handleServerPing,
    handleTokenValidation,
    handleUpdateProfileImage,
    handleUpdateStatusMessage,
    handleUpdateStatusOfAllMessages,
    handleUserLogin,
    handleValidateUserImage,
    handleFetchSearchMessages,
  };
}
