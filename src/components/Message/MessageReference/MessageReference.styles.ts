import { styled } from '../../../stitches.config';

export const ReferenceContainer = styled('div', {
  borderRadius: '$normal',
  margin: 2,
  marginBottom: 10,
  padding: 6,
  display: 'flex',
  alignItems: 'center',
  borderBottom: 'solid',
  borderWidth: '$small',
  cursor: 'pointer',

  borderColor: '$normal_border',
  color: '$text_high_contrast',

  height: '30px',

  variants: {
    userIsAuthor: {
      true: {
        borderTopLeftRadius: '$normal',
        backgroundColor: '$grass_solid_background',
        '&:hover': {
          backgroundColor: '$grass_solid_focused',
        },
      },

      false: {
        borderTopRightRadius: '$normal',
        backgroundColor: '$grass_solid_background',
        '&:hover': {
          backgroundColor: '$grass_solid_focused',
        },
      },
    },
  },
});

export const ReferenceText = styled('span', {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '$small',
  color: 'white',
  maxWidth: '20vw',
  '@large': {
    maxWidth: '50vw',
  },
});
