import { Dispatch, SetStateAction } from 'react';

export type Theme = 'light' | 'dark';

enum LightSideColor {
    RED = '#FF6F61',
    YELLOW = '#FFE066',
    GREEN = '#A3E635',
    BLUE = '#3B82F6',
    WHITE = '#FFFFFF',
    BLACK = '#000000',
    GRAY = '#D1D5DB',
}

enum DarkSideColor {
    RED = '#D32F2F',
    YELLOW = '#FBC02D',
    GREEN = '#388E3C',
    BLUE = '#1976D2',
    WHITE = '#E0E0E0',
    BLACK = '#212121',
    GRAY = '#424242',
}

type Color = LightSideColor | DarkSideColor;

export type ThemeColors = {
    '--primary': Color;
    '--secondary': Color;
    '--header': Color;
    '--text': Color;
    '--background': Color;
    '--border': Color;
    '--main-bg': string;
    '--details-bg': string;
    '--transparent': string;
};

export type ThemeContextProps = {
    theme: Theme;
    themeColors: ThemeColors;
    setTheme: Dispatch<SetStateAction<Theme>>;
};

export const THEMES: Record<Theme, ThemeColors> = {
    light: {
        '--primary': LightSideColor.GREEN,
        '--secondary': LightSideColor.RED,
        '--header': LightSideColor.RED,
        '--text': LightSideColor.BLACK,
        '--background': LightSideColor.GRAY,
        '--border': LightSideColor.BLUE,
        '--main-bg': 'url(images/white-background.png)',
        '--details-bg':
            'url(images/details-white-background.png)',
        '--transparent': 'rgba(255, 255, 255, 0.3)',
    },
    dark: {
        '--primary': DarkSideColor.BLUE,
        '--secondary': DarkSideColor.YELLOW,
        '--header': DarkSideColor.RED,
        '--text': DarkSideColor.WHITE,
        '--background': DarkSideColor.BLACK,
        '--border': DarkSideColor.GREEN,
        '--main-bg': 'url(images/black-background.png)',
        '--details-bg':
            'url(images/details-black-background.png)',
        '--transparent': 'rgba(0, 0, 0, 0.5)',
    },
};
