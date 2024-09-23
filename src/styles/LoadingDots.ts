import { keyframes, styled } from '../stitches.config';

const grassLoading = keyframes({
    '0%': {
        transform: 'scale(1)',
    },

    '50%': {
        transform: 'scale(.5)',
        backgroundColor: '$grass_active_border',
    },

    '100%': {
        transform: 'scale(1)',
    },
});

const yellowLoading = keyframes({
    '0%': {
        transform: 'scale(1)',
    },

    '50%': {
        transform: 'scale(.5)',
        backgroundColor: '$amber_active_border',
    },

    '100%': {
        transform: 'scale(1)',
    },
});

export const AnimatedDotsContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    height: 50,
    ':nth-child(2)': {
        animationDelay: '.25s',
    },
    ':nth-child(3)': {
        animationDelay: '.5s',
    },
    ':nth-child(4)': {
        animationDelay: '.75s',
    },
    ':nth-child(5)': {
        animationDelay: '.5s',
    },
    ':nth-child(6)': {
        animationDelay: '.25s',
    },
    variants: {
        curved: {
            true: {
                ':nth-child(2)': {
                    marginBottom: 10,
                    animationDelay: '.25s',
                },
                ':nth-child(3)': {
                    marginBottom: 20,
                    animationDelay: '.5s',
                },
                ':nth-child(4)': {
                    marginBottom: 25,
                    animationDelay: '.75s',
                },
                ':nth-child(5)': {
                    marginBottom: 20,
                    animationDelay: '.5s',
                },
                ':nth-child(6)': {
                    marginBottom: 10,
                    animationDelay: '.25s',
                },
            },
        },
    },
});

export const AnimatedDots = styled('div', {
    borderRadius: '$full',
    animationDirection: 'alternate',

    size: '$10',

    '@medium': {
        size: '$20',
    },

    variants: {
        color: {
            grass: {
                backgroundColor: '$grass_normal_border',
                animation: `${grassLoading} 1.5s ease-in-out infinite`,
            },
            yellow: {
                backgroundColor: '$amber_normal_border',
                animation: `${yellowLoading} 1.5s ease-in-out infinite`,
            },
        },
    },
});
