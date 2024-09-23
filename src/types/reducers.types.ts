import { FileElement } from '../components/SendFileModal';
import { MessageStatus } from '../utils/constants/MessageStatus';

export type Devices = 'web' | 'application' | 'mobile';

export type ChatElement = {
  id: string;
  company: string;
  name: string;
  receiverid: number;
  imageProfileUrl: string;
  lastmessagedate: string;
  lastmessage: string;
  lastindex: number;
  messagecount: number;
  messageText: string;
  isWriting: boolean;
  isOnline: 'Online' | '' | string;
  filesToSend: FileElement[];
  messagereadstatus: MessageStatus;
};

export type ChatList = {
  [key: string]: ChatElement;
};

export type ContactElement = {
  id: number;
  company: string;
  name: string;
  appversion: string;
  lastlogin: string;
  imageProfileUrl: string;
};

export type ContactList = {
  [key: string]: ContactElement;
};

export type MessageElement = {
  id: string;
  typemessage: string;
  body: string;
  datemessage: string;
  device: Devices;
  index: number;
  author: number;
  chats: string;
  reference: number;
  messagereadstatus: MessageStatus;
  file?: File;
  localTempFileURL?: string;
  objmessage: {
    body: string;
  } | null;
};

export type MessageListStatus = {
  messages: MessageElement[];
  hasMessagesAbove: boolean;
  hasMessagesBelow: boolean;
};

export type MessageList = {
  [key: string]: MessageListStatus;
};

export type CurrentChat = {
  currentChatId: number | undefined;
  activeUsers: number[];
  searchMessage: string;
  searchMessageIndex: number | undefined;
  currentReference: MessageElement | undefined;
  forwardedMessage: string;
};

export type UserInterface = {
  showChatList: boolean;
  showContactList: boolean;
  showProfileImageChangeModal: boolean;
  showUserProfile: boolean;
  showMessageImageModal: boolean;
  showSendFilesModal: boolean;
  showSendFilesModalTransmission: boolean;
  showAlert: boolean;
  alertText: string;
  hasNetworkConnection: boolean;
  onFetchMoreMessagesLoading: boolean;
  currentChatLoading: boolean;
  showSearchMessageModal: boolean;
  showTransmissionMessageModal: boolean;
};

export type User = {
  persistedName: string;
  persistedDocument: string;
  persistedPassword: string;
  name: string;
  company: string;
  usertype: 'cliente' | 'suporte';
  userid: number;
  localTempUserImage: string;
  enableNotificantionSound: boolean;
  userProfileImage: string;
  isUpdatedVersion: boolean;
};

export type Auth = {
  token: string;
  isLogged: boolean;
};

export type Theme = {
  isDarkTheme: boolean;
};

export type ListOfMessagesToUpdateStatus = {
  listOfReadMessages: string[];
  listOfReceivedMessages: string[];
  listOfDeleteMessages: string[];
  receiverid: number;
};

export type MessagesToUpdateStatus = {
  [key: string]: ListOfMessagesToUpdateStatus;
};

export type MessagesToBeFetched = {
  receiverid: number;
  messagecount: number;
  alreadyDone: boolean;
}[];

export type AsyncPostMessages = {
  asyncPostMessages: {
    receiverid: number;
    message: URLSearchParams;
  }[];
};
