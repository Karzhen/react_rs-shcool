import React from 'react';
import { CharacterDetailProps } from '../../types.ts';

const CharacterDetail: React.FC<CharacterDetailProps> = ({ label, value }) => {
    return (
        <p>
            <strong>{label}:</strong> {value}
        </p>
    );
};

export default CharacterDetail;
