import { styled } from '../../stitches.config';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

// <====================== Imagem de Perfil Inicio ======================>

export const AvatarContainer = styled('div', {
    display: 'flex',
    marginX: '$10',
});

export const Avatar = styled(AvatarPrimitive.Root, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    userSelect: 'none',
    size: '$50',
    borderRadius: '$full',
    boxShadow: '$normal',
    fontSize: '$extralarge',

    backgroundColor: '$grass_normal_state',

    variants: {
        size: {
            small: {
                size: '$40',
                '> *': {
                    fontSize: '$large',
                },
            },
            large: {
                size: '$80',
                '> *': {
                    fontSize: '$extra5large',
                },
            },
        },
        clickable: {
            true: {
                cursor: 'pointer',
            },
        },
    },
});

export const ProfileImageImage = styled(AvatarPrimitive.Image, {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
});

export const ProfileImageFallback = styled(AvatarPrimitive.Fallback, {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    fontWeight: 'bold',

    color: '$grass_text_low_contrast',
    backgroundColor: '$grass_normal_state',
});

// <====================== Imagem de Perfil Fim ======================>
