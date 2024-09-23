import { keyframes, styled } from '../../stitches.config';

const fadeIn = keyframes({
  '0%': { transform: 'scale(0.75)' },
  '100%': { transform: 'scale(1)' },
});

const popUpMessage = keyframes({
  '0%': {
    display: 'none',
    opacity: 0,
  },

  '1%': {
    display: 'block',
    opacity: 0,
  },

  '100%': {
    display: 'block',
    opacity: 1,
  },
});

export const MessageLine = styled('div', {
  display: 'flex',
  marginX: '$20',
  variants: {
    userIsAuthor: {
      true: {
        justifyContent: 'flex-end',
      },

      false: {
        justifyContent: 'flex-start',
      },
    },

    isVisible: {
      true: {
        backgroundColor: 'yellow',
      },
    },
  },
  animation: `${popUpMessage} 1s ease-out`,

  '@large': {
    marginX: '$40',
  },
});

export const DeleteMessage = styled('div', {
  paddingY: '$5',
  color: '$text_low_contrast',
  fontStyle: 'italic',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$5',
  userSelect: 'none',
  '> #block-icon': {
    size: 20,
  },
});

export const MessageContainer = styled('div', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  borderRadiusBottom: '$normal',
  padding: 6,
  maxWidth: '70vw',
  '@large': {
    maxWidth: '50vw',
  },

  variants: {
    userIsAuthor: {
      true: {
        borderTopLeftRadius: '$normal',
        backgroundColor: '$normal_border',
        '> #reset-icon': {
          position: 'absolute',
          bottom: 15,
          right: 5,
          size: 24,
          padding: 2,
          borderRadius: '$full',
          cursor: 'pointer',
          color: '$text_low_contrast',
          backgroundColor: '$normal_state',
          '&:hover': {
            backgroundColor: '$hover_state',
          },
          '&:active': {
            backgroundColor: '$active_state',
          },
        },
        '> #extenallink-icon': {
          position: 'absolute',
          bottom: 15,
          right: 35,
          size: 24,
          padding: 2,
          borderRadius: '$full',
          cursor: 'pointer',
          color: '$text_low_contrast',
          backgroundColor: '$normal_state',
          '&:hover': {
            backgroundColor: '$hover_state',
          },
          '&:active': {
            backgroundColor: '$active_state',
          },
        },
      },

      false: {
        borderTopRightRadius: '$normal',
        backgroundColor: '$grass_normal_border',
        '> #reset-icon': {
          position: 'absolute',
          bottom: 5,
          right: -40,
          size: 24,
          padding: 2,
          borderRadius: '$full',
          cursor: 'pointer',
          color: '$grass_text_low_contrast',
          backgroundColor: '$grass_normal_state',
          '&:hover': {
            backgroundColor: '$grass_hover_state',
          },
          '&:active': {
            backgroundColor: '$grass_active_state',
          },
        },
        '> #extenallink-icon': {
          position: 'absolute',
          bottom: 5,
          right: -10,
          size: 24,
          padding: 2,
          borderRadius: '$full',
          cursor: 'pointer',
          color: '$grass_text_low_contrast',
          backgroundColor: '$grass_normal_state',
          '&:hover': {
            backgroundColor: '$grass_hover_state',
          },
          '&:active': {
            backgroundColor: '$grass_active_state',
          },
        },
      },
    },

    includesSearch: {
      true: {
        backgroundColor: '$amber_active_border',
      },
    },
  },
});

export const ReadMoreButton = styled('button', {
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'underline',
  color: '$blue_solid_background',
  display: 'block',
  '&:hover': {
    color: '$blue_text_low_contrast',
    textDecoration: 'none',
  },
});

export const TextMessage = styled('pre', {
  fontSize: '$small',
  margin: '1px 0px 15px 1px',
  color: '$text_high_constrast',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  fontFamily: '$Poppins',
  variants: {
    userIsAuthor: {
      true: { marginRight: 70 },
      false: { marginRight: 60 },
    },
  },
});

export const FileMessage = styled('div', {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '90%',

  variants: {
    userIsAuthor: {
      true: {},

      false: {},
    },
  },
});

export const ImageMessage = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 200,
  borderRadius: '$normal',
  variants: {
    userIsAuthor: {
      true: {
        backgroundColor: '$element',
      },

      false: {
        backgroundColor: '$grass_solid_background',
      },
    },
  },
});

export const MessageInfoArea = styled('div', {
  fontSize: '$extrasmall',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  textAlign: 'right',
  height: '$5',
  marginTop: -10,

  color: '$text_low_contrast',

  variants: {
    userIsAuthor: {
      true: {},

      false: {},
    },
  },
});

export const MessageTime = styled('div', {
  marginRight: 1,
  variants: {
    userIsAuthor: {
      true: {},

      false: {},
    },
  },
});

export const MessageStatus = styled('div', {
  marginTop: -1,

  variants: {
    status: {
      0: {
        '> * ': {
          color: '$solid_background',
        },
      },

      1: {
        '> * ': {
          color: '$grass_solid_background',
        },
      },

      2: {
        '> * ': {
          color: '$grass_solid_background',
        },
      },

      3: {
        '> * ': {
          color: '$blue_solid_background',
        },
      },

      4: {},
    },
  },
});

export const FirstMessageDateArea = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginY: 20,
  animation: `${fadeIn} .5s ease`,
});
export const FirstMessageDateText = styled('div', {
  display: 'grid',
  placeItems: 'center',
  width: '$100',
  paddingY: '$5',
  borderRadius: '$large',
  textTransform: 'uppercase',
  fontSize: '$small',
  border: '2px solid',
  borderColor: '$grass_normal_border',
  backgroundColor: '$grass_normal_state',
  color: '$grass_text_low_contrast',
});
