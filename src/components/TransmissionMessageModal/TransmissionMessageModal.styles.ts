import { styled } from '../../stitches.config';

export const Checkbox = styled('input', {
  margin: 10,
  width: 18,
  height: 18,
  cursor: 'pointer',
  '&:disabled': {
    cursor: 'inherit',
  },
});

export const Label = styled('label', {
  margin: 0,
  padding: 0,
  cursor: 'pointer',
  userSelect: 'none',
  color: '$text_high_constrast',
  variants: {
    disabled: {
      true: {
        cursor: 'inherit',
      },
    },
  },
});

export const CheckboxWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
});

export const Modal = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'grid',
  placeItems: 'center',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'fixed',
  zIndex: 1,
});

export const ModalBackground = styled('div', {
  width: '100%',
  height: ' 100%',
  top: 0,
  left: 0,
  backgroundColor: '#171717ec',
  position: 'fixed',
});

export const Container = styled('div', {
  width: '90%',
  height: '95%',
  backgroundColor: '$background',
  borderRadius: '$small',
  position: 'fixed',
  display: 'grid',
  gridTemplateRows: '40px calc(100% - 40px)',
  '@medium': {
    gridTemplateRows: '60px calc(100% - 60px)',
  },
});

export const ModalTitle = styled('div', {
  backgroundColor: '$grass_solid_background',
  borderTopLeftRadius: '$small',
  borderTopRightRadius: '$small',
  display: 'grid',
  placeItems: 'center',
  color: 'white',
  fontSize: '$normal',
  '@medium': {
    fontSize: '$extralarge',
  },
});

export const Content = styled('div', {
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateRows: '40% 1fr',
  '@medium': {
    gridTemplateRows: '100%',
    gridTemplateColumns: '300px 1fr',
  },
});

export const CloseModalButton = styled('button', {
  display: 'grid',
  placeItems: 'center',
  position: 'absolute',
  borderRadius: '$full',
  cursor: 'pointer',
  size: 30,
  margin: '$5',
  padding: 0,
  right: 0,

  border: 'none',
  background: 'none',

  color: 'white',

  '&:hover': {
    backgroundColor: '$grass_solid_focused',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },

  '>*': {
    size: '$20',
  },
});

export const TransmissionChatsContainer = styled('div', {
  backgroundColor: '$element',
  display: 'grid',
  gridTemplateRows: '60px 60px 1fr',
});

export const TransmissionChats = styled('div', {
  overflowY: 'auto',
});

export const TransmissionMessageContainer = styled('div', {
  backgroundColor: '$main',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
});

export const SearchContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$grass_solid_background',
  '> *': {
    backgroundColor: '$main',
  },
});

export const SearchArea = styled('div', {
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  paddingX: '$5',
  paddingY: '$10',
  borderRadius: '$large',
  boxShadow: '$small',
  '> *': {
    marginX: '$5',
  },
});

export const SearchInput = styled('input', {
  width: '90%',
  border: 'none',
  outline: 'none',
  fontSize: '$small',
  backgroundColor: '$main',
  color: '$text_high_constrast',
});
