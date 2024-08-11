import React, { CSSProperties } from 'react';
import { useTheme } from '../../ThemeContext.tsx';
import styles from './Footer.module.css';

const Footer = () => {
    const { themeColors } = useTheme();

    return (
        <footer
            className={styles.footer}
            style={{ ...(themeColors as CSSProperties) }}
        >
            <a
                className={styles.link}
                href="https://github.com/Karzhen"
                target="_blank"
                rel="noopener noreferrer"
            >
                My GitHub
            </a>
            <span className={styles.text}>&copy; 2024</span>
            <a
                className={styles.link}
                href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/redux.md"
                target="_blank"
                rel="noopener noreferrer"
            >
                Task description
            </a>
        </footer>
    );
};

export default Footer;
