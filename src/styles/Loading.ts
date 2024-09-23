import { keyframes, styled } from '../stitches.config';

const spin = keyframes({
    '0%': {
        transform: 'rotate(0deg)',
    },

    '100%': {
        transform: 'rotate(360deg)',
    },
});

export const Loading = styled('div', {
    border: '5px solid',
    borderTop: '5px solid',
    borderColor: '$normal_border',
    borderTopColor: '$grass_text_low_contrast',
    borderRadius: '50%',
    size: '$40',
    animation: `${spin} 2s linear infinite`,

    variants: {
        speed: {
            s0: {
                animation: `${spin} .3s linear infinite`,
            },
            s1: {
                animation: `${spin} .5s linear infinite`,
            },
            s2: {
                animation: `${spin} .75s linear infinite`,
            },
            s3: {
                animation: `${spin} 1s linear infinite`,
            },
        },
    },
});
