import { describe, test, expect } from 'vitest';
import { THEMES, Theme, ThemeColors } from './contextTypes';

describe('Theme and ThemeColors', () => {
    test('light theme colors are correct', () => {
        const lightThemeColors = THEMES['light'];
        const expectedLightThemeColors: {
            '--secondary': string;
            '--border': string;
            '--details-bg': string;
            '--text': string;
            '--primary': string;
            '--background': string;
            '--transparent': string;
            '--main-bg': string;
            '--header': string;
        } = {
            '--primary': '#A3E635',
            '--secondary': '#FF6F61',
            '--header': '#FF6F61',
            '--text': '#000000',
            '--background': '#D1D5DB',
            '--border': '#3B82F6',
            '--main-bg': 'url(../../../public/images/white-background.png)',
            '--details-bg':
                'url(../../../public/images/details-white-background.png)',
            '--transparent': 'rgba(255, 255, 255, 0.3)',
        };
        expect(lightThemeColors).toEqual(expectedLightThemeColors);
    });

    test('dark theme colors are correct', () => {
        const darkThemeColors = THEMES['dark'];
        const expectedDarkThemeColors: {
            '--secondary': string;
            '--border': string;
            '--details-bg': string;
            '--text': string;
            '--primary': string;
            '--background': string;
            '--transparent': string;
            '--main-bg': string;
            '--header': string;
        } = {
            '--primary': '#1976D2',
            '--secondary': '#FBC02D',
            '--header': '#D32F2F',
            '--text': '#E0E0E0',
            '--background': '#212121',
            '--border': '#388E3C',
            '--main-bg': 'url(../../../public/images/black-background.png)',
            '--details-bg':
                'url(../../../public/images/details-black-background.png)',
            '--transparent': 'rgba(0, 0, 0, 0.5)',
        };
        expect(darkThemeColors).toEqual(expectedDarkThemeColors);
    });

    test('theme keys are correct', () => {
        const themes = Object.keys(THEMES) as Theme[];
        expect(themes).toEqual(['light', 'dark']);
    });
});
