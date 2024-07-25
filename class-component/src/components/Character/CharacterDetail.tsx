import React from 'react';
import { CharacterDetailProps } from '../../types.ts';
import styles from './CharacterCard.module.css';

const CharacterDetail: React.FC<CharacterDetailProps> = ({ label, value }) => {
    const Element = label ? 'p' : 'li';

    return (
        <Element className={styles.characterDetail}>
            {label && <strong>{label}:</strong>} {value || ''}
        </Element>
    );
};

export default CharacterDetail;
