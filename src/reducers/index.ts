import { setAuth, userLogout } from './Auth.reducer';
import {
  clearChatList,
  setChatList,
  setIsOnline,
  setIsWriting,
  updateLastMessage,
  updateMessageCount,
  updateMessageText,
} from './ChatList.reducer';
import { clearContactList, setContactList } from './ContacttList.reducer';
import {
  addActiveUser,
  clearCurrentChat,
  setCurrentChatId,
  updateSearchMessageIndex,
  updateSearchMessage,
  setReference,
  clearReference,
  setForwardedMessage,
} from './CurrentChat.reducer';
import {
  addMessages,
  clearMessageList,
  setMessageList,
  updateHasMoreMessages,
  updateMessageStatus,
} from './MessageList.reducer';
import {
  includeMessagesToBeFetched,
  setMessageToBeFetchedDone,
} from './MessagesToBeFetched.reducer';
import {
  addMessageToUpdateStatus,
  createListMessagesToUpdateStatus,
  removeListMessagesToUpdateStatus,
} from './MessagesToUpdateStatus.reducer';
import { RootState, useAppDispatch, useAppSelector } from './store';
import { toggleTheme } from './Theme.reducer';
import {
  setPersistedCredentials,
  setUser,
  toggleEnableNotificantionSound,
  updateUserImageProfile,
  toggleIsUpdatedVersion,
} from './User.reducer';
import { toggleUserInterfaceProp } from './UserInterface.reducer';

export type { RootState };

export {
  addActiveUser,
  addMessageToUpdateStatus,
  addMessages,
  clearChatList,
  clearContactList,
  clearCurrentChat,
  clearMessageList,
  createListMessagesToUpdateStatus,
  includeMessagesToBeFetched,
  removeListMessagesToUpdateStatus,
  setAuth,
  setChatList,
  setContactList,
  setCurrentChatId,
  setIsOnline,
  setIsWriting,
  setMessageList,
  setMessageToBeFetchedDone,
  setPersistedCredentials,
  setUser,
  toggleEnableNotificantionSound,
  toggleTheme,
  toggleUserInterfaceProp,
  updateHasMoreMessages,
  updateLastMessage,
  updateMessageCount,
  updateMessageStatus,
  updateMessageText,
  updateUserImageProfile,
  clearReference,
  useAppDispatch,
  useAppSelector,
  userLogout,
  toggleIsUpdatedVersion,
  updateSearchMessage,
  updateSearchMessageIndex,
  setReference,
  setForwardedMessage,
};
