import { DividerHorizontalIcon } from '@radix-ui/react-icons';

import { keyframes, styled } from '../../stitches.config';

export const AppContainer = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',

  backgroundColor: '$background',
});

export const Wrapper = styled('div', { display: 'flex' });

// <====================== SideBar Inicio ======================>

export const SideBar = styled('aside', {
  gridArea: 'sidebar',
  display: 'grid',
  width: '100%',
  gridTemplateRows: '80px 60px calc(100vh - 140px)',
  borderRight: '2px solid',
  transition: 'ease-in-out 0.3s',

  borderColor: '$normal_border',
  backgroundColor: '$main',

  variants: {
    active: {
      false: {
        '@small': {
          transform: 'translateX(-250px)',
        },
        '@medium': {
          transform: 'translateX(-300px)',
        },
        display: 'none',
      },
    },
  },

  '@small': {
    width: 250,
  },
  '@medium': {
    width: 300,
  },
});

export const SideBarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 80,
  borderBottom: '2px solid',

  borderColor: '$normal_border',
  backgroundColor: '$element',
});

export const SearchContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '2px solid',

  borderColor: '$normal_border',
  color: '$grass_solid_background', // cor do icone
  backgroundColor: '$element',

  '> *': {
    backgroundColor: '$main',
  },
});

// <====================== SideBar Fim ======================>

// <====================== ChatArea Inicio ======================>

export const ChatArea = styled('div', {
  flex: 1,

  backgroundColor: '$background',

  variants: {
    hide: {
      true: {
        display: 'none',
        '@small': {
          display: 'inline',
        },
      },
    },
  },
});

// <====================== ChatArea Fim ======================>
