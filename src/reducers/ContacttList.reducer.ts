import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ContactElement, ContactList } from '../types';

const initialState: ContactList = {};

const ContactListSlice = createSlice({
    name: 'ContactList',
    initialState,
    reducers: {
        setContactList(state, action: PayloadAction<ContactElement>) {
            const { id } = action.payload;
            return {
                ...state,
                [id]: action.payload,
            };
        },

        clearContactList(state) {
            state = {};
        },
    },
});

export const { setContactList, clearContactList } = ContactListSlice.actions;
export default ContactListSlice.reducer;
