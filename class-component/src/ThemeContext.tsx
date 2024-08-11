import React, { createContext, useContext, useState } from 'react';
import { Theme, ThemeContextProps, THEMES } from './context/contextTypes.ts';

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    themeColors: THEMES['light'],
} as ThemeContextProps);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                themeColors: THEMES[theme],
                setTheme: toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
