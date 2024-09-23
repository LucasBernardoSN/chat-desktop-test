import { formatFileType } from './formatFileType';

export const formatMessageType = (typemessage: string): string => {
    let formatedType: string = '';

    if (formatFileType(typemessage) === 'thumb') {
        formatedType = 'thumb';
    } else if (typemessage === 'text') {
        formatedType = 'text';
    } else {
        formatedType = 'file';
    }

    return formatedType;
};
