import { keyframes, styled } from '../../../stitches.config';

export const ChatListElementContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderBottom: 'solid',
  borderWidth: '$small',
  cursor: 'pointer',

  borderColor: '$normal_border',

  '&:hover': {
    backgroundColor: '$hover_state',
  },

  variants: {
    color: {
      active: {
        backgroundColor: '$active_state',
      },
    },

    userType: {
      cliente: {
        minHeight: '$80',
      },
      suporte: {
        minHeight: '$100',
      },
    },
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
// <====================== Conteudo da Ultima Mensagem Inicio ======================>

export const Content = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '$10',
  gap: '$5',
  minWidth: 0,
  width: '100%',
});

export const LastMessageContent = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const ChatName = styled('span', {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '$normal',
  color: '$text_high_constrast',
  maxWidth: '80%',
});

export const LastMessageArea = styled('span', {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '$small',
  color: '$text_low_contrast',
  maxWidth: '80%',
});

export const LastMessageDate = styled('span', {
  fontSize: '$extrasmall',
  color: '$text_low_contrast',
});
export const LastMessageText = styled('span', {});

export const NewMessageNotification = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$full',

  backgroundColor: '$tomato_solid_background',

  variants: {
    countWrapperSize: {
      1: {
        '> *': {
          fontSize: 12,
        },
        size: 20,
        padding: 5,
      },
      2: {
        '> *': {
          fontSize: 12,
        },
        size: 25,
        padding: 5,
      },
      3: {
        '> *': {
          fontSize: 10,
        },
        size: 25,
        padding: 5,
      },
      4: {
        '> *': {
          fontSize: 10,
        },
        size: 25,
        padding: 5,
      },
      5: {
        '> *': {
          fontSize: 8,
        },
        size: 25,
        padding: 5,
      },
    },
  },
});

export const NewMessageCount = styled('div', {
  color: '#fff',
});

export const IsWriting = styled('span', {
  color: '$grass_text_low_contrast',
  fontWeight: 'bold',
  fontStyle: 'italic',
});

// <====================== Conteudo da Ultima Mensagem Fim ======================>

// <====================== Area do Suporte Inicio ======================>

export const SuportArea = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});
export const CompanyName = styled('span', {
  color: '$grass_text_low_contrast',
  fontSize: '$extrasmall',
  maxWidth: '85%',
  maxHeight: 30,
  overflow: 'auto',
});
export const ClientId = styled('span', {
  color: '$blue_text_low_contrast',
  fontSize: '$extrasmall',
  alignSelf: 'center',
});

// <====================== Area do Suporte Fim ======================>
