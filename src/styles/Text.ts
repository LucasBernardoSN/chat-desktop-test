import { styled } from '../stitches.config';

export const Text = styled('span', {
    variants: {
        color: {
            grass: {
                color: '$grass_text_low_contrast',
            },
            tomato: {
                color: '$tomato_text_low_contrast',
            },
            blue: {
                color: '$blue_text_low_contrast',
            },
            amber: {
                color: '$amber_text_low_contrast',
            },
            default: {
                color: '$text_low_contrast',
            },
        },

        highcContrast: {
            true: {},
        },

        size: {
            largetitle: {
                fontSize: '$extra5large',
                margin: '$25',
            },
            title: {
                fontSize: '$extralarge',
                margin: '$20',
            },

            smalltitle: {
                fontSize: 'large',
                margin: '$10',
            },

            smalltext: {
                fontSize: '$small',
            },
            tinytext: {
                fontSize: '$extrasmall',
            },
        },
    },

    compoundVariants: [
        {
            color: 'grass',
            highcContrast: true,
            css: {
                color: '$grass_text_high_constrast',
            },
        },
        {
            color: 'tomato',
            highcContrast: true,
            css: {
                color: '$tomato_text_high_constrast',
            },
        },
        {
            color: 'blue',
            highcContrast: true,
            css: {
                color: '$blue_text_high_constrast',
            },
        },
        {
            color: 'amber',
            highcContrast: true,
            css: {
                color: '$amber_text_high_constrast',
            },
        },
        {
            color: 'default',
            highcContrast: true,
            css: {
                color: '$text_high_constrast',
            },
        },
    ],

    defaultVariants: {
        color: 'default',
        highcContrast: 'false',
    },
});
