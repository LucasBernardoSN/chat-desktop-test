import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Auth } from '../types';

const initialState: Auth = {
  token: '',
  isLogged: false,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Auth>) {
      const { isLogged, token } = action.payload;
      state.token = token;
      state.isLogged = isLogged;
    },

    userLogout(state) {
      state.token = '';
      state.isLogged = false;
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
  },
});

export const { setAuth, userLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
