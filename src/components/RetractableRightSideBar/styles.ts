import { styled } from '../../stitches.config';

export const Container = styled('aside', {
  transition: 'ease-in-out 0.2s',
  boxShadow: '$normal',
  backgroundColor: '$element',
  borderLeft: '2px solid',
  borderColor: '$normal_border',
  maxWidth: 200,
  minWidth: 200,
  right: '0',
  position: 'fixed',

  '@extrasmall': {
    position: 'inherit',
    maxWidth: 150,
    minWidth: 150,
  },

  '@medium': {
    maxWidth: 180,
    minWidth: 150,
  },

  '@large': {
    maxWidth: 300,
    minWidth: 300,
  },

  '@extralarge': {
    maxWidth: 400,
    minWidth: 400,
  },
});

export const Header = styled('header', {
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  borderBottom: '2px solid',
  borderColor: '$normal_border',
  backgroundColor: '$active_state',
});
export const HeaderTitle = styled('h1', {
  fontSize: '$small',
  '@large': {
    fontSize: '$extralarge',
  },
  color: '$text_high_constrast',
});

export const SearchContainer = styled('div', {
  paddingY: '$10',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '2px solid',
  borderColor: '$normal_border',
  color: '$grass_solid_background',
  backgroundColor: '$element',

  '> *': {
    backgroundColor: '$main',
  },
});

export const SearchArea = styled('div', {
  width: 150,
  '@medium': {
    width: '90%',
  },
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
  '&::placeholder': {
    fontSize: 12,
  },
});

export const MessagesContainer = styled('div', {
  backgroundColor: '$element',
  maxHeight: 'calc(100vh - 145px)',
  minHeight: 'calc(100vh - 145px)',
  overflowY: 'auto',
  // display: 'flex',
  // justifyContent: 'center',
});

export const TextMessage = styled('span', {
  marginLeft: 10,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '$normal',
});

export const Message = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderBottom: 'solid',
  borderWidth: '$small',
  cursor: 'pointer',

  borderColor: '$normal_border',
  color: '$text_high_contrast',

  '&:hover': {
    backgroundColor: '$hover_state',
  },

  height: '50px',
});

export const DateMessage = styled('span', {
  display: 'block',
  fontSize: 'small',
  color: '$text_low_contrast',
});
