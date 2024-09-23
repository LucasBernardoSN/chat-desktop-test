import { styled } from '../../stitches.config';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as SwitchPrimitive from '@radix-ui/react-switch';

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
});

export const ProfileImageWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '$20',
});

export const UserName = styled('h1', {
    textTransform: 'uppercase',

    color: '$grass_text_low_contrast',
});

export const Separator = styled(SeparatorPrimitive.Root, {
    marginX: 'auto',
    '&[data-orientation=horizontal]': { height: 1, width: '90%' },
    '&[data-orientation=vertical]': { height: '100%', width: 1 },

    backgroundColor: '$normal_border',
});

export const UserProfileItem = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '$40',
    width: '85%',
    marginX: 'auto',

    variants: {
        color: {
            logout: {
                '> *': {
                    color: '$tomato_text_low_contrast',
                },
            },
        },
    },
});

export const ItemLeftSide = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '$5',
});

export const ItemTitle = styled('span', {
    color: '$text_high_constrast',
});

export const IconWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '$5',
    variants: {
        color: {
            dark: {
                '> *': {
                    color: '$solid_background',
                },
            },
            light: {
                '> *': {
                    color: '$amber_solid_background',
                },
            },
        },
    },
    '> *': {
        size: '$1',
    },
});

export const UserProfileButton = styled('button', {
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    paddingX: '$10',
    paddingY: '$5',
    borderRadius: '$small',
    gap: '$5',
    fontWeight: 'bold',
    boxShadow: '$normal',

    backgroundColor: '$normal_state',
    color: '$text_low_contrast',

    '&:hover': {
        backgroundColor: '$hover_state',
    },

    '&:active': {
        backgroundColor: '$active_state',
    },

    variants: {
        color: {
            logout: {
                backgroundColor: '$tomato_normal_state',

                '&:hover': {
                    backgroundColor: '$tomato_hover_state',
                },

                '&:active': {
                    backgroundColor: '$tomato_active_state',
                },
            },

            normal: {
                '> *': {
                    color: '$text_high_constrast',
                },
            },
        },
    },
});

export const Switch = styled(SwitchPrimitive.Root, {
    all: 'unset',
    width: 40,
    height: 20,
    backgroundColor: '$solid_background',
    boxShadow: '$normal',
    borderRadius: '$large',
    position: 'relative',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&:focus': { boxShadow: `0 0 0 2px black` },
    '&[data-state="checked"]': { backgroundColor: '$grass_solid_background' },
});

export const SwitchThumb = styled(SwitchPrimitive.Thumb, {
    display: 'block',
    width: 18,
    height: 18,
    backgroundColor: '$main',
    borderRadius: '$large',
    boxShadow: '$small',
    transition: 'transform 100ms',
    transform: 'translateX(2px)',
    willChange: 'transform',
    '&[data-state="checked"]': { transform: 'translateX(19px)' },
});
