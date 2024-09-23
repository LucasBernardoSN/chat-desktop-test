import { styled } from '../../../stitches.config';

export const FooterChat = styled('div', {
  display: 'flex',
  alignItems: 'center',
  minHeight: 80,
  justifyContent: 'space-evenly',
  borderTop: '2px solid',

  borderColor: '$normal_border',
  backgroundColor: '$element',
});

export const OnlyInput = styled('textarea', {
  width: '100%',
  paddingX: '$20',
  paddingY: '$10',
  minHeight: 40,
  maxHeight: 100,
  resize: 'vertical',
  border: 'none',
  outline: 'none',
  textDecoration: 'none',
  fontSize: '$normal',

  borderRadius: '$normal',

  color: '$text_high_constrast',
  backgroundColor: '$main',

  boxShadow: '$normal',
  cursor: 'text',
  fontFamily: '$Poppins',
});
export const InputContainer = styled('div', {
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '$20',

  '@large': {
    maxWidth: 700,
  },
  '@extralarge': {
    maxWidth: 900,
  },
});

export const ReferenceTextContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  paddingX: '$10',
});

export const ReferenceMessageName = styled('span', {
  color: '$grass_text_high_contrast',
  fontSize: '$small',
});

export const ReferenceContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$grass_solid_background',
  flex: '1',
  width: '95%',
  padding: '$5',
  borderRadiusTop: '$normal',
  '> #cross-icon': {
    color: 'white',
    size: 24,
    padding: 2,
    cursor: 'pointer',
    borderRadius: '$full',
    '&:hover': {
      backgroundColor: '$grass_solid_focused',
    },
    '&:active': {
      backgroundColor: '$grass_text_low_contrast',
    },
  },
});

export const ReferenceText = styled('div', {
  position: 'relative',
  color: 'white',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontSize: '$extrasmall',
  maxWidth: 50,
  '@extra3small': {
    maxWidth: 100,
  },
  '@extra2small': {
    maxWidth: 150,
  },
  '@extrasmall': {
    maxWidth: 100,
  },
  '@small': {
    maxWidth: 200,
  },
  '@medium': {
    maxWidth: 300,
  },
  '@large': {
    maxWidth: 400,
  },
  '@extralarge': {
    maxWidth: 500,
  },
});

export const StyledEmojiPickerBox = styled('div', {
  '& aside.emoji-picker-react': {
    background: '$normal_state',
    boxShadow: 'none',
    width: '100%',
    '.emoji-group .emoji': {
      paddingX: '16px',
      '&:hover': {
        backgroundColor: '$grass_solid_focused',
      },
      button: {
        backgroundColor: 'transparent !important',
      },
    },
    '.emoji-group .emoji button': {
      '&:hover': {
        background: 'none',
      },
    },
    '& .emoji-group:before': {
      background: '$element',
      paddingX: '16px',
    },
    '& .emoji-categories': {
      background: '$normal_border',
    },
  },
  '.emoji-picker-react .active-category-indicator-wrapper .active-category-indicator':
    {
      background: '$grass_solid_background',
      color: 'red',
    },
});
