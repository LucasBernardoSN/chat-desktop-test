import { styled } from '../../../stitches.config';

export const ImageModalContainer = styled('div', {
  height: '100%',
  width: '100%',
  display: 'grid',
  placeItems: 'center',
  zIndex: 999999,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'fixed',
});

export const ModalBackground = styled('div', {
  width: '100%',
  height: ' 100%',
  top: 0,
  left: 0,
  backgroundColor: '#171717fc',
  position: 'fixed',
});

export const Content = styled('div', {
  width: '100%',
  height: ' 100%',
  display: 'grid',
  gridTemplateRows: '80px calc(100vh - 80px)',
  placeItems: 'center',
  position: 'fixed',

  variants: {
    cursor: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});

export const ButtonsArea = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingX: '$20',
});

export const ModalButton = styled('button', {
  display: 'grid',
  placeItems: 'center',
  borderRadius: '$full',
  cursor: 'pointer',

  margin: '$10',
  padding: '$10',

  border: 'none',
  background: 'none',

  color: '#ecedee',

  '&:hover': {
    backgroundColor: '#2b2f31',
  },

  '>*': {
    size: '$20',
  },

  '@large': {
    '>*': {
      size: '$40',
    },
  },
});

export const ModalImage = styled('img', {
  width: 'auto',
  height: 'auto',
  maxWidth: '90%',
  maxHeight: '80vh',
  objectFit: 'contain',
  boxShadow: '$large',
  transition: '0.3s ease-out',

  variants: {
    cursor: {
      true: {
        cursor: 'zoom-out',
      },
      false: {
        cursor: 'zoom-in',
      },
    },
  },
});
