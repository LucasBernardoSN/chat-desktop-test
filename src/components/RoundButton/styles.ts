import { keyframes, styled } from '../../stitches.config';

// <====================== RoundButton Start ======================>

const fadeIn = keyframes({
  '0%': { transform: 'scale(0.75)' },
  '100%': { transform: 'scale(1)' },
});

export const Container = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  size: '$40',
  marginX: '$10',
  borderRadius: '$full',

  boxShadow: '$normal',

  cursor: 'pointer',
  border: 'none',

  color: '#fff',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  variants: {
    fixed: {
      true: {
        position: 'absolute',
        zIndex: '$alwaysOnTop',
      },
    },
    size: {
      large: {
        size: '$80',
        '> *': {
          size: '$40',
        },
      },
    },

    scrollButton: {
      true: {
        bottom: '100px',
        right: '$20',
        position: 'absolute',
      },
    },

    color: {
      slate: {
        backgroundColor: '$solid_background',

        '&:hover': {
          backgroundColor: '$solid_focused',
        },

        '&:active': {
          backgroundColor: '$text_low_contrast',
        },
      },

      grass: {
        backgroundColor: '$grass_solid_background',

        '&:hover': {
          backgroundColor: '$grass_solid_focused',
        },

        '&:active': {
          backgroundColor: '$grass_text_low_contrast',
        },
      },
    },
  },

  '> *': {
    size: '$20',
  },
});

// <====================== RoundButton End ======================>
