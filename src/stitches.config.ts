import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      background: '#fbfcfd', //slate1
      main: '#f8f9fa', //slate2
      element: '#f1f3f5', //slate3
      normal_state: '#eceef0', //slate4
      hover_state: '#e6e8eb', //slate5
      active_state: '#dfe3e6', //slate6
      normal_border: '#d7dbdf', //slate7
      active_border: '#c1c8cd', //slate8
      solid_background: '#889096', //slate9
      solid_focused: '#7e868c', //slate10
      text_low_contrast: '#687076', //slate11
      text_high_constrast: '#11181c', //slate12

      grass_background: '#fbfefb',
      grass_main: '#f3fcf3',
      grass_normal_state: '#dff3df',
      grass_hover_state: '#ceebcf',
      grass_active_state: '#b7dfba',
      grass_normal_border: '#97cf9c',
      grass_active_border: '#65ba75',
      grass_solid_background: '#46a758',
      grass_solid_focused: '#3d9a50',
      grass_text_low_contrast: '#297c3b',
      grass_text_high_constrast: '#1b311e',

      tomato_background: '#fffcfc',
      tomato_main: '#fff8f7',
      tomato_element: '#fff0ee',
      tomato_normal_state: '#ffe6e2',
      tomato_hover_state: '#fdd8d3',
      tomato_active_state: '#fac7be',
      tomato_normal_border: '#f3b0a2',
      tomato_active_border: '#ea9280',
      tomato_solid_background: '#e54d2e',
      tomato_solid_focused: '#db4324',
      tomato_text_low_contrast: '#ca3214',
      tomato_text_high_constrast: '#341711',

      blue_background: '#fbfdff',
      blue_main: '#f5faff',
      blue_element: '#edf6ff',
      blue_normal_state: '#e1f0ff',
      blue_hover_state: '#cee7fe',
      blue_active_state: '#b7d9f8',
      blue_normal_border: '#96c7f2',
      blue_active_border: '#5eb0ef',
      blue_solid_background: '#0091ff',
      blue_solid_focused: '#0081f1',
      blue_text_low_contrast: '#006adc',
      blue_text_high_constrast: '#00254d',

      amber_background: '#fefdfb',
      amber_main: '#fff9ed',
      amber_element: '#fff4d5',
      amber_normal_state: '#ffecbc',
      amber_hover_state: '#ffe3a2',
      amber_active_state: '#ffd386',
      amber_normal_border: '#f3ba63',
      amber_active_border: '#ee9d2b',
      amber_solid_background: '#ffb224',
      amber_solid_focused: '#ffa01c',
      amber_text_low_contrast: '#ad5700',
      amber_text_high_constrast: '#4e2009',
    },

    space: {
      5: '0.3125rem',
      10: '0.625rem',
      20: '1.25rem',
      40: '2.5rem',
      25: '1.5625rem',
      50: '3.125rem',
      80: '5rem',
      100: '6.25rem',
      250: '15.625rem',
      500: '31.25rem',
    },

    sizes: {
      5: '0.3125rem',
      10: '0.625rem',
      20: '1.25rem',
      25: '1.5625rem',
      40: '2.5rem',
      50: '3.125rem',
      80: '5rem',
      100: '6.25rem',
      250: '15.625rem',
      500: '31.25rem',
    },

    borderWidths: {
      small: '1px',
      normal: '2px',
      large: '4px',
    },
    fontSizes: {
      extrasmall: '0.75rem',
      small: '0.875rem',
      normal: '1rem',
      medium: '1.125rem',
      large: '1.25rem',
      extralarge: '1.5rem',
      extra5large: '2.25rem',
    },

    shadows: {
      large: ' 3px 3px 10px 3px #00000045',
      dark: ' 3px 3px 10px 3px #00000045',
      normal: ' 1px 1px 5px 1px #00000045',
      small: ' 0.5px 0.5px 3px 0.5px #00000045',
      bottom: '0px 3px 7px -3px rgba(0,0,0,0.5)',
    },

    radii: {
      small: '5px',
      normal: '10px',
      large: '20px',
      full: '50%',
    },

    zIndices: {
      alwaysOnTop: 9999999,
      top: 10,
      middle: 5,
      under: 1,
    },
  },

  media: {
    extra3small: '(min-width: 320px)',
    extra2small: '(min-width: 384px)',
    extrasmall: '(min-width: 512px)',
    small: '(min-width: 640px)',
    medium: '(min-width: 768px)',
    large: '(min-width: 1024px)',
    extralarge: '(min-width: 1280px)',
    extra2large: '(min-width: 1536px)',
    extra3large: '(min-width: 2048px)',
    maxheight: '(max-height: 625px)',
  },

  utils: {
    size: (value: any) => ({ width: value, height: value }),
    marginX: (value: any) => ({ marginLeft: value, marginRight: value }),
    marginY: (value: any) => ({ marginTop: value, marginBottom: value }),
    paddingX: (value: any) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (value: any) => ({ paddingTop: value, paddingBottom: value }),
    borderRadiusLeft: (value: any) => ({
      borderTopLeftRadius: value,
      borderBottomLeftRadius: value,
    }),
    borderRadiusRight: (value: any) => ({
      borderTopRightRadius: value,
      borderBottomRightRadiuss: value,
    }),
    borderRadiusTop: (value: any) => ({
      borderTopRightRadius: value,
      borderTopLeftRadius: value,
    }),
    borderRadiusBottom: (value: any) => ({
      borderBottomRightRadius: value,
      borderBottomLeftRadius: value,
    }),
  },
});

export const darkTheme = createTheme('dark-theme', {
  shadows: {
    dark: ' 3px 3px 10px 3px #00000099',
  },
  colors: {
    background: '#151718', //slate1
    main: '#1a1d1e', //slate2
    element: '#202425', //slate3
    normal_state: '#26292b', //slate4
    hover_state: '#2b2f31', //slate5
    active_state: '#313538', //slate6
    normal_border: '#3a3f42', //slate7
    active_border: '#4c5155', //slate8
    solid_background: '#697177', //slate9
    solid_focused: '#787f85', //slate10
    text_low_contrast: '#9ba1a6', //slate11
    text_high_constrast: '#ecedee', //slate12

    grass_background: '#0d1912',
    grass_app_main: '#0f1e13',
    grass_normal_state: '#16301d',
    grass_hover_state: '#193921',
    grass_active_state: '#1d4427',
    grass_normal_border: '#245530',
    grass_active_border: '#2f6e3b',
    grass_solid_background: '#46a758',
    grass_solid_focused: '#55b467',
    grass_text_low_contrast: '#63c174',
    grass_text_high_constrast: '#e5fbeb',

    tomato_background: '#1d1412',
    tomato_main: '#2a1410',
    tomato_element: '#3b1813',
    tomato_normal_state: '#481a14',
    tomato_hover_state: '#541c15',
    tomato_active_state: '#652016',
    tomato_normal_border: '#7f2315',
    tomato_active_border: '#a42a12',
    tomato_solid_background: '#e54d2e',
    tomato_solid_focused: '#ec5e41',
    tomato_text_low_contrast: '#f16a50',
    tomato_text_high_constrast: '#feefec',

    blue_background: '#0f1720',
    blue_main: '#0f1b2d',
    blue_element: '#10243e',
    blue_normal_state: '#102a4c',
    blue_hover_state: '#0f3058',
    blue_active_state: '#0d3868',
    blue_normal_border: '#0a4481',
    blue_active_border: '#0954a5',
    blue_solid_background: '#0091ff',
    blue_solid_focused: '#369eff',
    blue_text_low_contrast: '#52a9ff',
    blue_text_high_constrast: '#eaf6ff',

    amber_background: '#1f1300',
    amber_main: '#271700',
    amber_element: '#341c00',
    amber_normal_state: '#3f2200',
    amber_hover_state: '#4a2900',
    amber_active_state: '#573300',
    amber_normal_border: '#693f05',
    amber_active_border: '#824e00',
    amber_solid_background: '#ffb224',
    amber_solid_focused: '#ffcb47',
    amber_text_low_contrast: '#f1a10d',
    amber_text_high_constrast: '#fef3dd',
  },
});
