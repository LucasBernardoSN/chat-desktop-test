import React from 'react';

import useApi from '../services/api/useApi';
import { PROFILE_IMAGE_URL } from '../services/config';
import { ChatElement } from '../types';

export default function useCreateChatElement() {
    const { handleValidateUserImage } = useApi();
    async function createChatElement(chatElementProps?: Partial<ChatElement>) {
        const receiverid = chatElementProps ? chatElementProps.receiverid : '';
        const imageProfileUrl = `${PROFILE_IMAGE_URL}/${receiverid}.png`;
        const { data } = await handleValidateUserImage(imageProfileUrl);

        return {
            id: '',
            company: '',
            name: '',
            chat: '',
            receiverid: 0,
            lastmessagedate: '',
            lastmessage: '',
            lastindex: 0,
            messagecount: 0,
            messageText: '',
            isWriting: false,
            isOnline: "",
            showSendFilesModal: false,
            filesToSend: [],
            imageProfileUrl: data.status ? imageProfileUrl : '',
            ...chatElementProps,
        } as ChatElement;
    }

    return { createChatElement };
}
