import { keyframes, styled } from "../../../stitches.config";

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
  margin: '$5',
  justifyContent: 'flex-end',
  animation: `${popUpMessage} 1s ease-out`,
  '@large': {
    marginX: '$20',
  },
});

export const MessageContainer = styled('div', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  borderRadiusBottom: '$normal',
  padding: '$5',
  maxWidth: '70vw',
  '@large': {
    maxWidth: '50vw',
  },
  borderTopLeftRadius: '$normal',
  backgroundColor: '$normal_border',
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
  color: '$text_high_constrast',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  fontFamily: '$Poppins',
  margin: '$5',
});

export const FileMessage = styled('div', {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '90%',
});

export const ImageMessage = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 200,
  borderRadius: '$normal',
  backgroundColor: '$element',
});

export const FileMessageContainer = styled('button', {
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
  backgroundColor: '$solid_background',
  color: '#fff',
  '&:active': {
    backgroundColor: '$solid_focused',
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
