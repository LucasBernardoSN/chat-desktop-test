import { styled } from '../../stitches.config';

export const Container = styled('aside', {
  height: '100vh',
  width: '100vw',
  left: '-100vw',
  position: 'absolute',
  transition: 'ease-in-out 0.2s',
  zIndex: 20,
  boxShadow: '$normal',

  backgroundColor: '$background',

  '@small': {
    width: 200,
    left: -200,
  },
  '@medium': {
    width: 300,
    left: -300,
  },
  variants: {
    active: {
      true: {
        transform: 'translateX(100vw)',

        '@small': {
          transform: 'translateX(200px)',
        },
        '@medium': {
          transform: 'translateX(300px)',
        },
      },
    },
  },
});

export const Header = styled('header', {
  height: 80,
  display: 'flex',
  alignItems: 'center',
  boxShadow: '$bottom',

  backgroundColor: '$element',
});
export const HeaderTitle = styled('h1', {
  fontSize: '$large',

  color: '$grass_text_low_contrast',
});
