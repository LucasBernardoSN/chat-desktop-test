import { styled } from '../../../stitches.config';

export const FileMEssageContainer = styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    border: 'none',
    boxShadow: '$small',
    width: '60vw',
    padding: '$10',
    gap: '$5',
    margin: '2px 0px 20px 2px',

    borderRadius: '$small   ',

    cursor: 'pointer',
    userSelect: 'none',

    variants: {
        userIsAuthor: {
            true: {
                backgroundColor: '$solid_background',
                color: '#fff',
                '&:active': {
                    backgroundColor: '$solid_focused',
                },
            },
            false: {
                backgroundColor: '$grass_solid_background',
                color: '#fff',
                '&:active': {
                    backgroundColor: '$grass_solid_focused',
                },
            },
        },
    },

    '@medium': {
        width: '20vw',
        borderRadius: '$normal',
    },

    '@small': {
        width: '30vw',
        borderRadius: '$normal',
    },
});

export const FileMessage = styled('div', {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: 'small',

    '@medium': {
        fontSize: '$normal',
    },
});

export const IconWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    '> *': {
        size: '$20',
    },

    '@medium': {
        '> *': {
            size: 30,
        },
    },
});

export const FlexWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '80%',
    gap: '$5',
});

export const FileIcon = styled('img', {
    size: '$20',
    '@medium': {
        size: '$40',
    },
});

export const DownloadProgressContainer = styled('div', {
    size: 40,
});
