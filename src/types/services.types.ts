import { AxiosRequestHeaders } from 'axios';

import { SearchedMessages } from '../components/RetractableRightSideBar';
import { MessageStatus } from '../utils';
import { ChatElement, ContactElement, MessageElement } from './reducers.types';

export type ResponseData = {
  noResponseData: {
    data: {};
  };

  userLogin: {
    data: { token: string };
  };

  createUpdateUser: {
    data: {
      updateversion: boolean;
    };
  };

  fetchOneChat: {
    data: ChatElement;
  };

  fetchChatList: {
    data: ChatElement[];
  };

  fetchContactList: {
    data: ContactElement[];
  };

  fetchMessageList: {
    data: {
      messages: MessageElement[];
    };
  };

  validateUserImage: {
    data: {
      status: boolean;
    };
  };

  fetchSearchMessages: {
    data: SearchedMessages[];
  };

  sendMessage: {
    data: MessageElement;
  };
};

export type ResponseProps = {
  failed: boolean;
  status: number | string | null;
};

export type ApiRequestProps = {
  baseUrl: string;
  params?: string;
  headers?: AxiosRequestHeaders;
  data?: any;
  requestName?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

export type FetchMessageProps = {
  onClick: {
    firstfetch: boolean;
    messagecount: number;
  };
  onScroll: {
    indexmessage: number;
    upwards: boolean;
  };
  searchMessage: {
    indexmessage: number;
    upwards: boolean;
    search: boolean;
  };
  onScrollAll: {
    firstfetch: boolean;
    messagecount: number;
  };
};

export type UpdateMessageStatusProps = {
  messagestoupdate: string[];
  receiverid: number;
  status: MessageStatus;
};

export type SyncAction = {
  originatingDevice: 'web' | 'application' | 'mobile';
  typeAction: 'ReadMessages' | 'UpdateUserProfile';
  actionData: {
    ReadMessages: UpdateMessageStatusProps[];
    UpdateUserProfile: boolean;
  };
};

export type UserStatus = {
  id: number;
  group: { id_termmony: string; state: string }[];
};
