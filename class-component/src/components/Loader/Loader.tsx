import React from 'react';
import styles from './Loader.module.css'; // Предполагается, что здесь будут ваши стили для анимации

const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Loader;
