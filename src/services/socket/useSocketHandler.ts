import { getTime } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowFocus from 'use-window-focus';

import { useCreateChatElement } from '../../hooks';
import {
    RootState,
    addMessageToUpdateStatus,
    addMessages,
    createListMessagesToUpdateStatus,
    setChatList,
    updateLastMessage,
    updateMessageCount,
    updateMessageStatus,
} from '../../reducers';
import {
    MessageElement,
    SyncAction,
    UpdateMessageStatusProps,
} from '../../types';
import { MessageStatus } from '../../utils';
import { useApi } from '../api';
import { DEVICE } from '../config';

export default function useSocketHandler() {
    const app = window.require('electron');
    const ipcRenderer = app.ipcRenderer;
    const dispatch = useDispatch();

    const { enableNotificantionSound } = useSelector(
        (state: RootState) => state.User
    );
    const { activeUsers, currentChatId } = useSelector(
        (state: RootState) => state.CurrentChat
    );
    const chatList = useSelector((state: RootState) => state.ChatList);
    const messageList = useSelector((state: RootState) => state.MessageList);

    const windowFocused = useWindowFocus();

    const { createChatElement } = useCreateChatElement();
    const { handleFetchOneChat } = useApi();

    async function handleNewMessagesList(
        newMessageList: Array<MessageElement>
    ) {
        if (newMessageList.length) {
            ipcRenderer.send('newMessage');
            for (const newMessage of newMessageList) {
                const { author, datemessage, body, id, index } = newMessage;

                if (Object.hasOwn(chatList, author)) {
                    if (
                        chatList[author].lastindex < index ||
                        (Object.hasOwn(messageList, author) &&
                            messageList[author].messages.includes(
                                newMessage
                            ) === false)
                    ) {
                        dispatch(
                            updateLastMessage({
                                lastmessage: body,
                                lastmessagedate: datemessage,
                                receiverid: author,
                            })
                        );

                        if (activeUsers.includes(author)) {
                            dispatch(
                                addMessages({
                                    messages: [newMessage],
                                    receiverid: author,
                                    addBelow: true,
                                })
                            );
                        }

                        dispatch(
                            updateMessageCount({
                                receiverid: author,
                                messagecount: 1,
                            })
                        );
                    }
                } else {
                    const { failed, data } = await handleFetchOneChat(author);
                    if (failed) {
                        // //
                    } else {
                        dispatch(
                            setChatList(
                                await createChatElement({
                                    ...data,
                                    lastindex: index,
                                    lastmessage: body,
                                    lastmessagedate: datemessage,
                                    isOnline: 'Online',
                                    messagecount: 1,
                                })
                            )
                        );
                    }
                }

                if (enableNotificantionSound && !windowFocused) {
                    const audio = document.querySelector('audio');
                    audio && audio.play();
                }

                dispatch(
                    createListMessagesToUpdateStatus({ receiverid: author })
                );

                dispatch(
                    addMessageToUpdateStatus({
                        id,
                        receiverid: author,
                        status: 2,
                    })
                );
            }
        }
    }

    async function handleSyncActions({
        actionData,
        originatingDevice,
        typeAction,
    }: SyncAction) {
        if (originatingDevice !== DEVICE) {
            switch (typeAction) {
                case 'ReadMessages':
                    syncReadMessages(actionData[typeAction]);
                    break;

                case 'UpdateUserProfile':
                    break;
            }
        }
    }

    async function syncReadMessages(
        ReadMessagesToSync: UpdateMessageStatusProps[]
    ) {
        if (ReadMessagesToSync.length) {
            for (const iterator of ReadMessagesToSync) {
                const { messagestoupdate, receiverid, status } = iterator;

                if (activeUsers.includes(receiverid)) {
                    for (const messagesIdList of messagestoupdate) {
                        dispatch(
                            updateMessageStatus({
                                id: messagesIdList,
                                messagereadstatus: status,
                                receiverid,
                            })
                        );
                    }
                }

                dispatch(
                    updateMessageCount({
                        receiverid,
                        messagecount: -1,
                    })
                );
            }
        }
    }

    function handleUpdateMessageStatus(
        messagesToUpdate: UpdateMessageStatusProps[]
    ) {
        for (const updateMessageStatusList of messagesToUpdate) {
            const { messagestoupdate, status, receiverid } =
                updateMessageStatusList;
            for (const messagesIdList of messagestoupdate) {
                dispatch(
                    updateMessageStatus({
                        id: messagesIdList,
                        messagereadstatus: status,
                        receiverid,
                    })
                );
            }
        }
    }

    function handleSyncSentMessages(message: MessageElement) {
        const { chats, author, device } = message;
        if (DEVICE !== device) {
            let newChats = chats.replace(author.toString(), '');
            newChats = newChats.replace('.', '');
            const userActionReceiveirId = +newChats;

            dispatch(
                addMessages({
                    messages: [message],
                    receiverid: userActionReceiveirId,
                    addBelow: true,
                })
            );
        }
    }

    return {
        handleNewMessagesList,
        handleSyncActions,
        handleSyncSentMessages,
        handleUpdateMessageStatus,
    };
}
