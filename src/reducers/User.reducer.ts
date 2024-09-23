import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../types';

const initialState: User = {
  company: '',
  enableNotificantionSound: true,
  localTempUserImage: '',
  name: '',
  persistedDocument: '',
  persistedName: '',
  persistedPassword: '',
  userProfileImage: '',
  userid: 0,
  usertype: 'cliente',
  isUpdatedVersion: false,
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser(state, action) {
      // // Os dados que chegam da api de autenticação tem chaves diferentes!
      state.name = action.payload.nome;
      state.company = action.payload.nomeempresa;
      state.userid = +action.payload.jti;
      state.usertype = action.payload.tipousuario;
      state.userProfileImage = action.payload.userProfileImage;
      localStorage.setItem('erochat-empresa', action.payload.nomeempresa);
      localStorage.setItem('erochat-usuario', action.payload.jti);
      localStorage.setItem('erochat-cnpj', action.payload.cnpj);
    },

    setPersistedCredentials(
      state,
      action: PayloadAction<
        Pick<User, 'persistedDocument' | 'persistedName' | 'persistedPassword'>
      >
    ) {
      return { ...state, ...action.payload };
    },

    updateUserImageProfile(
      state,
      action: PayloadAction<
        Partial<Pick<User, 'userProfileImage' | 'localTempUserImage'>>
      >
    ) {
      return { ...state, ...action.payload };
    },

    toggleEnableNotificantionSound(
      state,
      action: PayloadAction<Pick<User, 'enableNotificantionSound'>>
    ) {
      return { ...state, ...action.payload };
    },

    toggleIsUpdatedVersion(state, action: PayloadAction<boolean>) {
      return { ...state, isUpdatedVersion: action.payload };
    },
  },
});

export const {
  setUser,
  setPersistedCredentials,
  updateUserImageProfile,
  toggleIsUpdatedVersion,
  toggleEnableNotificantionSound,
} = UserSlice.actions;
export default UserSlice.reducer;
