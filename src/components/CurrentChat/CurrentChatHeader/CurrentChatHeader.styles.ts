import { keyframes, styled } from '../../../stitches.config';

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

export const CurrentChatHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '$80',
  maxHeight: '$80',
  borderBottom: '2px solid',

  borderColor: '$normal_border',
  backgroundColor: '$element',
});

export const HeaderTextArea = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const ChatName = styled('span', {
  fontSize: '$normal',
  color: '$text_high_constrast',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  width: 120,
  '@medium': {
    textOverflow: 'inherit',
    whiteSpace: 'inherit',
    overflow: 'inherit',
    width: '100%',
  },
});

export const ChatStatus = styled('span', {
  fontSize: '$small',
  animation: `${popUpMessage} 1s ease-out`,

  color: '$text_low_contrast',
});

export const IsWriting = styled('span', {
  fontWeight: 'bold',
  fontStyle: 'italic',

  color: '$grass_text_low_contrast',
});

export const ChatHeaderActions = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  paddingX: 10,
  paddingY: 10,
  fontWeight: 'normal',
  fontSize: '$extrasmall',
  borderRadius: '$full',
  color: 'white',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  span: {
    display: 'none',
  },

  '@medium': {
    span: {
      marginLeft: 5,
      display: 'inherit',
    },
    borderRadius: '$normal',
    fontWeight: 'bold',
    fontSize: '$extrasmall',
  },

  backgroundColor: '$grass_solid_background',

  '&:hover': {
    backgroundColor: '$grass_solid_focused',
  },

  '&:active': {
    backgroundColor: '$grass_text_low_contrast',
  },

  '> #search-icon': {
    size: '$20',
  },
  '> #cross-icon': {
    size: '$20',
  },
});
