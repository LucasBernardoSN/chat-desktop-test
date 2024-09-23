import React from 'react';

import useApi from '../services/api/useApi';
import { PROFILE_IMAGE_URL } from '../services/config';
import { ContactElement } from '../types';

export default function useCreateContactElement() {
    const { handleValidateUserImage } = useApi();
    async function createContactElement(
        ContactElementProps?: Partial<ContactElement>
    ) {
        const receiverid = ContactElementProps ? ContactElementProps.id : '';
        const imageProfileUrl = `${PROFILE_IMAGE_URL}/${receiverid}.png`;
        const { data } = await handleValidateUserImage(imageProfileUrl);

        return {
            id: 0,
            company: '',
            name: '',
            imageProfileUrl: data.status ? imageProfileUrl : '',
            ...ContactElementProps,
        } as ContactElement;
    }

    return { createContactElement };
}
