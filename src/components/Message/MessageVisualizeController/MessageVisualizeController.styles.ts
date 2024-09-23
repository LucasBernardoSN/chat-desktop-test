import { keyframes, styled } from '../../../stitches.config';

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

export const MessageVisualizeControllerContainer = styled('div', {});

export const LoadingContainer = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export const NewMessagesWarningArea = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  animation: `${popUpMessage} 1s ease-out`,
});
export const NewMessagesWarningText = styled('div', {
  display: 'grid',
  placeItems: 'center',
  paddingX: '$20',
  paddingY: '$5',
  borderRadius: '$normal',
  fontSize: '$small',
  border: '2px solid',
  borderColor: '$normal_border',
  backgroundColor: '$normal_state',
  color: '$text_low_contrast',
});
