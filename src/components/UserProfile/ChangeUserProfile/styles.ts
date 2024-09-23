// <====================== RoundButton Start ======================>

import { styled } from '../../../stitches.config';
import * as SliderPrimitive from '@radix-ui/react-slider';

export const Container = styled('div', {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'fixed',
    zIndex: 1,
});

export const Content = styled('div', {
    width: '100vw',
    height: '100vh',
    minHeight: '$500',
    display: 'grid',
    position: 'relative',
    backgroundColor: '$element',

    gridTemplateRows: '80% 20%',
});

export const DragContent = styled('div', {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
    width: '100%',

    textAlign: 'center',

    fontSize: '$extralarge',
    color: '$text_low_contrast',
});

export const CloseModalButton = styled('button', {
    display: 'grid',
    placeItems: 'center',
    position: 'fixed',
    borderRadius: '$full',
    cursor: 'pointer',

    margin: '$5',
    padding: '$5',

    border: 'none',
    background: 'none',

    color: '$text_high_constrast',

    '&:hover': {
        backgroundColor: '$hover_state',
    },

    '>*': {
        size: '$40',
    },
});

export const DragAndDropContainer = styled('div', {
    backgroundColor: '$main',
    width: '100%',
    height: '100%',
});

export const CropperWrapper = styled('div', {
    position: 'relative',
    margin: '$20',
    minHeight: '$100',
});
export const CrontrollerContainer = styled('div', {
    display: 'grid',
    minHeight: '$100',

    '@medium': {
        gridTemplateColumns: '50vw 50vw',
    },
});

export const StyledSlider = styled(SliderPrimitive.Root, {
    display: 'flex',
    alignItems: 'center',
    width: '$250',

    position: 'relative',

    touchAction: 'none',
    userSelect: 'none',

    '&[data-orientation="horizontal"]': {
        height: '$20',
    },

    '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        width: '$20',
        height: '$100',
    },
});

export const StyledTrack = styled(SliderPrimitive.Track, {
    backgroundColor: '$normal_border',
    position: 'relative',
    flexGrow: 1,
    borderRadius: '9999px',

    '&[data-orientation="horizontal"]': { height: '$5' },
    '&[data-orientation="vertical"]': { width: '$5' },
});

export const StyledRange = styled(SliderPrimitive.Range, {
    backgroundColor: '$grass_solid_background',
    position: 'absolute',
    borderRadius: '9999px',
    height: '100%',
});

export const StyledThumb = styled(SliderPrimitive.Thumb, {
    all: 'unset',
    display: 'block',
    width: '$20',
    height: '$20',
    backgroundColor: '$solid_background',
    borderRadius: 10,
    '&:hover': { backgroundColor: '$grass_solid_focused' },
    '&:focus': { boxShadow: `0 0 0 3px ${'#000000ef'}` },
});

export const Button = styled('div', {
    display: 'grid',
    placeItems: 'center',
    width: '$100',
    paddingY: '$10',
    borderRadius: '$small',
    cursor: 'pointer',
    boxShadow: '$normal',

    variants: {
        color: {
            ok: {
                color: '$grass_text_low_constrast',
                backgroundColor: '$grass_solid_background',
                '&:hover': {
                    backgroundColor: '$grass_solid_focused',
                },
            },
            cancel: {
                color: '$text_low_constrast',
                backgroundColor: '$solid_background',
                '&:hover': {
                    backgroundColor: '$solid_focused',
                },
            },
        },
    },
});

// <====================== RoundButton End ======================>
