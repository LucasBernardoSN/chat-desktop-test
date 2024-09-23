import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { styled } from '../../stitches.config';

// ! <=============== DragMain ===============>

export const DragContainer = styled('div', {
    display: 'grid',
    placeItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'auto',
    zIndex: 100,
    backgroundColor: '$main',
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
// ! <=============== DragMain ===============>

// ! <=============== Preview ===============>

export const CloseModalButton = styled('button', {
    display: 'grid',
    placeItems: 'center',
    position: 'absolute',
    right: 0,
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
        size: '$20',
    },
});

export const Separator = styled(SeparatorPrimitive.Root, {
    marginX: 'auto',
    '&[data-orientation=horizontal]': { height: 2, width: '90%' },
    '&[data-orientation=vertical]': { height: '100%', width: 2 },
    backgroundColor: '$normal_border',
});

export const PreviewContainer = styled('div', {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'calc(100vh - 162px) 2px 160px',
    backgroundColor: '$main',
});

export const WrapperPreview = styled('div', {
    display: 'grid',
    placeItems: 'center',
    width: '100%',
    height: '100%',
    paddingX: '5%',
});

export const PreviewImage = styled('img', {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: 'calc(100vh - 200px)',
    minWidth: '10%',
    objectFit: 'contain',
    boxShadow: '$normal',
});

export const PreviewFile = styled('img', {
    width: 'auto',
    height: '20vh',
    padding: '$20',
    objectFit: 'contain',
    boxShadow: '$normal',
    borderRadius: '$normal',
    backgroundColor: '$element',
});

export const PreviewFileWrapper = styled('div', {
    display: 'grid',
    placeItems: 'center',
    gap: '$40',
    padding: '5%',
});

export const FileInfo = styled('h1', {
    margin: 0,
    color: '$text_high_constrast',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',

    variants: {
        text: {
            title: {
                fontSize: '$extralarge',
                '@medium': {
                    fontSize: '$extra5large',
                },
            },
            sub: {
                fontSize: '$medium',
                '@medium': {
                    fontSize: '$large',
                },
            },
        },
    },
});

// * <--------------- Controler --------------->

export const PreviewControler = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    overflowX: 'auto',
});
export const WrapperControler = styled('div', {
    width: '100%',
    overflowX: 'auto',
    marginLeft: '$10',
    paddingX: '$20',
    paddingY: '$10',
    borderRadius: '$normal',
    backgroundColor: '$element',
});

export const ControlerContent = styled('div', {
    display: 'flex',
    width: '100%',
    gap: '$5',
    padding: '$10',
    overflowX: 'auto',
});

export const FileControlerContainer = styled('div', {
    minWidth: '$80',
    maxWidth: '$80',
    height: '$80',
    position: 'relative',
    backgroundColor: '$solid_background',
    borderRadius: '$small',
});

export const ControlerImage = styled('img', {
    width: '100%',
    height: '$80',
    objectFit: 'cover',
    borderRadius: '$small',
    border: '4px solid',

    variants: {
        validefile: {
            false: {
                borderColor: '$grass_solid_background',
            },
            true: {
                borderColor: '$tomato_solid_background',
            },
        },
    },
});

export const ControlerFile = styled('img', {
    width: '100%',
    height: 'auto',
    padding: '$10',
    objectFit: 'contain',
    borderRadius: '$small',
    border: '4px solid',

    variants: {
        validefile: {
            false: {
                borderColor: '$grass_solid_background',
            },
            true: {
                borderColor: '$tomato_solid_background',
            },
        },
    },
});

export const SendIconWrapper = styled('div', {
    display: 'grid',
    placeItems: 'center',
    marginX: '$10',
});

export const RemoveFileButton = styled('button', {
    width: '$20',
    height: '$20',
    position: 'absolute',
    transform: 'translateX(-85px) translateY(-5px)',
    border: 'none',
    backgroundColor: '$tomato_solid_background',
    color: '$tomato_text_high_constrast',
    borderRadius: '$full',
    cursor: 'pointer',
    fontWeight: 'bold',
});

// * <--------------- Controler --------------->

// ! <=============== Preview ===============>
