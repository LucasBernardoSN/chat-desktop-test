import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ChatElement, MessagesToBeFetched } from '../types';

const initialState: MessagesToBeFetched = [];

const MessagesToBeFetchedSlice = createSlice({
    name: 'MessagesToBeFetched',
    initialState,
    reducers: {
        includeMessagesToBeFetched(
            state,
            action: PayloadAction<
                Pick<ChatElement, 'receiverid' | 'messagecount'> & {
                    alreadyDone: boolean;
                }
            >
        ) {
            const { receiverid } = action.payload;

            if (hasFetchElement(state, receiverid) !== undefined) {
                state = [...state, action.payload];
            }
        },

        setMessageToBeFetchedDone(
            state,
            action: PayloadAction<Pick<ChatElement, 'receiverid'>>
        ) {
            const { receiverid } = action.payload;

            let fetchedElement = hasFetchElement(state, receiverid);

            fetchedElement!.alreadyDone = true;
        },
    },
});

export const { includeMessagesToBeFetched, setMessageToBeFetchedDone } =
    MessagesToBeFetchedSlice.actions;
export default MessagesToBeFetchedSlice.reducer;

function hasFetchElement(
    MessagesToBeFetched: MessagesToBeFetched,
    receiverid: number
) {
    return MessagesToBeFetched.find((item) => item.receiverid === receiverid);
}
