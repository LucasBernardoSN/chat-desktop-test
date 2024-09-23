import { globalCss } from './stitches.config';

export const globalStyles = globalCss({
  '@font-face': {
    fontFamily: 'Roboto',
    src: 'url("https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBBc4.woff2")',
  },

  '*': { boxSizing: 'border-box' },

  html: {
    height: '100%',

    backgroundColor: '$background',

    '::-webkit-scrollbar': {
      backgroundColor: '$element',
      width: 8,
      height: 8,
    },

    '::-webkit-scrollbar-thumb': {
      backgroundColor: '$normal_border',
      borderRadius: 4,
    },

    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '$active_border',
    },
  },

  body: {
    margin: 0,
    padding: 0,
    height: '100%',
    fontFamily: 'Roboto, sans-serif',

    '> div': {
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    },
  },
});
