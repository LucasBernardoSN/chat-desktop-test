import { keyframes, styled } from '../../stitches.config';

export const HomeContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '100%',
});

export const HomeText = styled('h1', {
    color: '$grass_solid_background',
    marginY: '$20',
    fontSize: '$extra5large',

    variants: {
        textType: {
            subtitle: {
                fontSize: '$extralarge',
            },
        },
    },
});

export const ContainerFigure = styled('div', {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

export const Logo = styled('img', {
    size: '80px',
});

export const LoginFigure = styled('img', {
    size: '$250',
});

export const NewVersionContainer = styled('div', {

})

export const NewVersionContent = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '$20',
    padding: '$40',
    boxShadow: '$normal',
    color: '$grass_text_low_contrast',
    borderRadius: '$large',
    backgroundColor: '$element',
    maxWidth: '80%',
    maxHeight: '60%',
    overflowY: 'auto',
});
const textclip = keyframes({
    'to': {
        backgroundPosition: '200% center'
    },
});
export const NewVersionTitle = styled('h1', {
    backgroundImage: 'linear-gradient(-270deg,#297c3b 0%,#65ba75 50%,#297c3b 100%)',
    backgroundSize: '200% auto',
    color: '#fff',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${textclip} 1.5s linear infinite`,
    textAlign: 'center',
    display: 'inline-block',
    fontSize: '$large',

    '@small': {
        fontSize: '$extralarge',
        backgroundColor: 'red'
    },
    '@medium': {
        fontSize: "$extra5large",
        backgroundColor: 'blue'
    },
})

