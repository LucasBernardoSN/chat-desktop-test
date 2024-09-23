import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserInterface } from '../types';

const initialState: UserInterface = {
  alertText: '',
  currentChatLoading: false,
  hasNetworkConnection: true,
  onFetchMoreMessagesLoading: false,
  showAlert: false,
  showChatList: true,
  showContactList: false,
  showMessageImageModal: false,
  showProfileImageChangeModal: false,
  showSendFilesModal: false,
  showUserProfile: false,
  showSearchMessageModal: false,
  showTransmissionMessageModal: false,
  showSendFilesModalTransmission: false,
};

const UserInterfaceSlice = createSlice({
  name: 'UserInterface',
  initialState,
  reducers: {
    toggleUserInterfaceProp(
      state,
      action: PayloadAction<Partial<UserInterface>>
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { toggleUserInterfaceProp } = UserInterfaceSlice.actions;

export default UserInterfaceSlice.reducer;
