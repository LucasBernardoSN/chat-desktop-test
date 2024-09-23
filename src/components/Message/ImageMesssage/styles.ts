import { styled } from '../../../stitches.config';

export const ImageMessageContainer = styled('div', {
    display: 'grid',
    placeItems: 'center',
    width: 200,
    height: 180,
    margin: '2px 0px 20px 2px',
    boxShadow: '$normal',
    borderRadius: '$small',

    cursor: 'pointer',
    userSelect: 'none',
    background: 'none',

    '@medium': {
        borderRadius: '$small',
        width: 250,
        height: 220,
    },
});

export const Image = styled('img', {
    width: 200,
    height: 180,
    objectFit: 'cover',
    borderRadius: '$small',
    '@medium': {
        width: 250,
        height: 220,
    },
});
