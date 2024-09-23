import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AuthReducer from './Auth.reducer';
import ChatListReducer from './ChatList.reducer';
import ContacttListReducer from './ContacttList.reducer';
import CurrentChatReducer from './CurrentChat.reducer';
import MessageListReducer from './MessageList.reducer';
import MessagesToBeFetchedReducer from './MessagesToBeFetched.reducer';
import MessagesToUpdateStatusReducer from './MessagesToUpdateStatus.reducer';
import ThemeReducer from './Theme.reducer';
import UserReducer from './User.reducer';
import UserInterfaceReducer from './UserInterface.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['Theme', 'Auth', 'User'],
};

const rootReducer = combineReducers({
    Auth: AuthReducer,
    ChatList: ChatListReducer,
    ContactList: ContacttListReducer,
    CurrentChat: CurrentChatReducer,
    MessageList: MessageListReducer,
    MessagesToBeFetched: MessagesToBeFetchedReducer,
    MessagesToUpdate: MessagesToUpdateStatusReducer,
    Theme: ThemeReducer,
    User: UserReducer,
    UserInterface: UserInterfaceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
