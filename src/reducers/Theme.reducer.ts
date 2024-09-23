import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Theme } from '../types';

const initialState: Theme = {
    isDarkTheme: false,
};

const ThemeSlice = createSlice({
    name: 'Theme',
    initialState,
    reducers: {
        toggleTheme(state, action: PayloadAction<Theme>) {
            const { isDarkTheme } = action.payload;
            state.isDarkTheme = isDarkTheme;
        },
    },
});

export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
