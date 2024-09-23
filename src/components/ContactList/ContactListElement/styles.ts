import { styled } from '../../../stitches.config';

export const ChatListElementContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  variants: {
    userType: {
      cliente: {
        minHeight: 80,
      },
      suporte: {
        minHeight: 100,
      },
    },
  },

  '&:hover': {
    backgroundColor: '$hover_state',
  },

  '&:active': {
    backgroundColor: '$active_state',
  },
});

// <====================== Conteudo da Ultima Mensagem Inicio ======================>

export const Content = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  paddingRight: '$10',
  gap: '$5',
});

export const ChatName = styled('span', {
  fontSize: '$normal',
  maxWidth: '80%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  color: '$text_high_constrast',
});

// <====================== Conteudo da Ultima Mensagem Fim ======================>

// <====================== Area do Suporte Inicio ======================>

export const SuportArea = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '$5',
});
export const CompanyName = styled('span', {
  color: '$grass_text_low_contrast',
  fontSize: '$small',
  maxHeight: 40,
  overflow: 'auto',
});
export const ClientId = styled('span', {
  color: '$blue_text_low_contrast',
  fontSize: '$small',
});

export const ButtonUpdate = styled('button', {
  backgroundColor: '$blue_text_low_contrast',
  border: 'none',
  outline: 'none',
  borderRadius: 4,
  color: '#ffffff',
  marginX: 2,
  cursor: 'pointer',
});

// <====================== Area do Suporte Fim ======================>
