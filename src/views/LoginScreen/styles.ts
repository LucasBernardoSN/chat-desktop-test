import { styled } from '../../stitches.config';
import { keyframes } from '@stitches/react';

export const LoginWindow = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: '100vh',
    minHeight: 580,
    overflow: 'hidden',
    zIndex: -1,

    backgroundColor: '$background',

    '@extralarge': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr));',
        columnGap: '$normal',
        paddingX: '$normal',
    },
});

export const Wave = styled('img', {
    display: 'none',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '100%',
    zIndex: 1,

    '@extralarge': {
        display: 'flex',
    },
});

export const ContainerFigure = styled('div', {
    display: 'none',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 2,

    '@extralarge': {
        display: 'flex',
    },
});

export const LoginFigure = styled('img', {
    size: 500,
});

export const LoginContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    justifySelf: 'center',
    flex: 1,
    paddingX: '$50',
    zIndex: 2,
    minWidth: '$250',

    '@extralarge': {
        justifySelf: 'flex-start',
    },
});

export const ErosoftLogo = styled('img', {
    alignSelf: 'center',
    size: '$100',
});

export const LoginTitle = styled('h1', {
    textAlign: 'center',
    textTransform: 'uppercase',

    color: '$text_low_contrast',
});

export const InputWrapper = styled('div', {
    display: 'flex',
    position: 'relative',
    marginY: '$10',
    paddingY: '$5',
    borderBottom: `solid`,
    borderWidth: '$normal',
    transition: '0.3s ease-in-out',

    '&:hover': {
        borderColor: '$grass_active_border',

        div: {
            color: '$grass_active_border',
        },

        'div > h5': {
            top: -20,
        },
    },

    variants: {
        focus: {
            true: {
                borderColor: '$grass_active_border',

                div: {
                    color: '$grass_active_border',
                },

                'div > h5': {
                    top: -20,
                },
            },

            false: {
                borderColor: '$normal_border',
            },
        },
    },
});

export const LoginInputIcon = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    color: '$normal_border',

    '&:first-child': {
        transition: '0.3s',
    },
});

export const InputContainer = styled('div', {});

export const InputTitle = styled('h5', {
    position: 'absolute',
    left: '$50',
    top: '0%',
    fontSize: '$normal',
    transition: '0.3s',
    transform: 'translateY(-50%)',

    color: '$text_low_contrast',
});

export const LoginInput = styled('input', {
    width: '90%',
    height: '100%',
    paddingY: '$10',
    marginLeft: '$10',
    marginTop: '$5',
    background: 'none',
    outline: 'none',
    border: 'none',
    fontSize: '$large',

    color: '$text_high_constrast',

    '&:invalid': {
        color: '$tomato_text_low_contrast',
    },
});

export const LoginContainerFooter = styled('div', {
    marginTop: '$20',
    minHeight: '$50',
    width: '$250',
    display: 'grid',
    placeItems: 'center',
});

export const LoginButton = styled('button', {
    height: '$50',
    width: '$250',
    border: 'none',
    outline: 'none',
    borderRadius: '$normal',
    fontSize: '$extralarge',
    boxShadow: '$normal',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'pointer',

    color: '#fff',
    backgroundColor: '$grass_solid_background',

    '&:hover': {
        backgroundColor: '$grass_solid_focused',
    },

    '&:active': {
        backgroundColor: '$grass_text_low_contrast',
    },
});

const slide = keyframes({
    '0%': { transform: ' translateX(1000px)' },
});

export const ErroLogin = styled('div', {
    width: '$250',
    height: '$50',
    marginY: '$10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '$normal',
    fontWeight: 'bold',
    borderRadius: '$normal',
    animation: `${slide} .2s ease-in-out forwards`,
    border: '2px solid',

    borderColor: '$tomato_normal_border',
    backgroundColor: '$tomato_element',
    color: '$tomato_text_low_contrast',
});
