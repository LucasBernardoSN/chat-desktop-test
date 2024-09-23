import { styled } from '../../stitches.config';

export const ChatList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 140px)',
    width: '100%',
    overflowY: 'auto',
});

export const Title = styled('span', {
    color: '$grass_text_low_contrast',
    paddingX: '$10',
    paddingY: '$20',
    fontSize: '$large',
});

export const Text = styled('span', {
    color: '$text_high_constrast',
    margin: '20px auto',
});
