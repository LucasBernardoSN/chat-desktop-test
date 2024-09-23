import { styled } from '../../stitches.config';

export const SearchArea = styled('div', {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    paddingX: '$5',
    paddingY: '$10',
    borderRadius: '$large',
    boxShadow: '$small',
    '> *': {
        marginX: '$5',
    },
});

export const SearchInput = styled('input', {
    border: 'none',
    outline: 'none',
    fontSize: '$small',

    backgroundColor: '$main',
    color: '$text_high_constrast',
});
