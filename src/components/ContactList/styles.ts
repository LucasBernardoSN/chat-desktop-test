import { styled } from '../../stitches.config';

export const ContactListContainer = styled('aside', {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 140px)',
    width: '100%',
    overflowY: 'auto',
});

export const SearchContainer = styled('div', {
    width: '100%',
    paddingY: '$10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: '$grass_solid_background',
    backgroundColor: '$element',

    '> *': {
        backgroundColor: '$main',
    },
});

export const Text = styled('span', {
    color: '$text_high_constrast',
    margin: '20px auto',
});
