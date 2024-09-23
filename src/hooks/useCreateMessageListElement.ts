import React from 'react';

import { MessageListStatus } from '../types';

export default function useCreateMessageListElement() {
    function createMessageListElement(
        messageListElementParams?: Partial<MessageListStatus>
    ) {
        return {
            messages: [],
            totalpages: 1,
            topPage: 1,
            bottomPage: 0,
            ...messageListElementParams,
        } as MessageListStatus;
    }

    return { createMessageListElement };
}
