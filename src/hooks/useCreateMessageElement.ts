import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../reducers';
import { DEVICE } from '../services/config';
import { MessageElement } from '../types';
import { createHashMd5Id } from '../utils';

export default function useCreateMessageElement() {
    const { userid } = useSelector((state: RootState) => state.User);

    function createMessageElement(
        messageElementParams?: Partial<MessageElement>
    ) {
        return {
            id: createHashMd5Id(),
            typemessage: '',
            body: '',
            datemessage: new Date().toJSON(),
            reference: 0,
            messagereadstatus: 0,
            author: userid,
            chats: userid,
            device: DEVICE,
            ...messageElementParams,
        } as MessageElement;
    }

    return { createMessageElement };
}
