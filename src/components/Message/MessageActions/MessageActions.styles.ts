import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '5px',
  padding: '5px',
});

export const ActionButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  size: 24,
  borderRadius: '50%',
  cursor: 'pointer',

  backgroundColor: '$hover_state',
  '&:hover': {
    backgroundColor: '$normal_border',
  },
  '&:active': {
    backgroundColor: '$solid_background',
  },

  variants: {
    color: {
      tomato: {
        backgroundColor: '$tomato_hover_state',
        '&:hover': {
          backgroundColor: '$tomato_normal_border',
        },
        '&:active': {
          backgroundColor: '$tomato_solid_background',
        },
        '> * ': {
          color: '$tomato_text_low_contrast',
        },
      },
      blue: {
        backgroundColor: '$blue_hover_state',
        '&:hover': {
          backgroundColor: '$blue_normal_border',
        },
        '&:active': {
          backgroundColor: '$blue_solid_background',
        },
        '> * ': {
          color: '$blue_text_low_contrast',
        },
      },
      amber: {
        backgroundColor: '$amber_hover_state',
        '&:hover': {
          backgroundColor: '$amber_normal_border',
        },
        '&:active': {
          backgroundColor: '$amber_solid_background',
        },
        '> * ': {
          color: '$amber_text_low_contrast',
        },
      },
    },
  },

  '> * ': {
    size: 18,
    userSelect: 'none',
  },
});
