import React, { CSSProperties } from 'react';
import { useTheme } from '@/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
    const { theme, themeColors, setTheme } = useTheme();

    return (
        <header
            className={styles.header}
            style={{ ...(themeColors as CSSProperties) }}
        >
            <button
                className={styles['toggle-theme-button']}
                onClick={setTheme}
            >
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
            </button>
        </header>
    );
};

export default Header;
