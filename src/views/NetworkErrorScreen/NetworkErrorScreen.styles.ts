import { styled } from '../../stitches.config';

export const Container = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',

    backgroundColor: '$background',
});

export const Title = styled('h1', {
    color: '$text_high_constrast',
    textAlign: 'center',
    marginX: '$20',
    fontSize: '$extralarge',

    '@medium': {
        fontSize: '$extra5large',
        marginX: '$40',
    },
});

export const NetworkErrorIcon = styled('div', {
    '> *': {
        size: '$100',
        color: '$amber_solid_background',
    },
});
