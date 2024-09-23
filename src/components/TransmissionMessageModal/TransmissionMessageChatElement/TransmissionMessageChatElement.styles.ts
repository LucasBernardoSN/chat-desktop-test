import { styled } from '../../../stitches.config';

export const ChatListElementContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  minHeight: 80,
});


export const Checkbox = styled('input', {
  margin: 10,
  marginRight: 0,
  width: 20,
  height: 20,
  cursor: 'pointer',
  '&:disabled': {
    cursor: 'inherit',
  }
})

// <====================== Conteudo da Ultima Mensagem Inicio ======================>

export const Content = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  paddingRight: '$10',
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
});
export const CompanyName = styled('span', {
  color: '$grass_text_low_contrast',
  fontSize: '$extrasmall',
  maxHeight: 40,
  overflow: 'auto',
});

// <====================== Area do Suporte Fim ======================>

