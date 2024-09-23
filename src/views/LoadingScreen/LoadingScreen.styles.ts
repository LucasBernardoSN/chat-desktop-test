import { keyframes, styled } from '../../stitches.config';

export const LoadingScreenWindow = styled('div', {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  backgroundColor: '$background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const CardsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$10',
  '@medium': {
    gap: '$20',
  },
});

export const Image = styled('img', {
  display: 'none',
  boxShadow: '$dark',
  borderRadius: '$full',

  size: '$80',
  margin: '$5',

  '@medium': {
    size: '$100',
    margin: '$20',
  },

  '@extra3small': {
    display: 'inherit',
  },
});
const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },

  '100%': {
    transform: 'rotate(360deg)',
  },
});
export const Text = styled('div', {
  color: '$grass_solid_background',
  fontSize: '$large',
  display: 'flex',
  alignItems: 'center',
  '@medium': {
    fontSize: '$extralarge',
  },

  '> #update, #ok, #error': {
    size: 40,
  },

  '> #error': {
    color: '$tomato_solid_background',
  },
  '> #update': {
    color: '$solid_background',
    animation: `${spin} 2s linear infinite`,
  },

  variants: {
    textAlign: {
      left: {
        justifyContent: 'left',
      },
      right: {
        justifyContent: 'right',
      },
    },
  },
});

export const ConectionStagesContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  width: '90%',
  maxWidth: '500px',
});
