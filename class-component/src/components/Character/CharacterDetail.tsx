import React from 'react';

type CharacterDetailProps = {
    label: string;
    value: string;
};

const CharacterDetail: React.FC<CharacterDetailProps> = ({ label, value }) => {
    return (
        <p>
            <strong>{label}:</strong> {value}
        </p>
    );
};

export default CharacterDetail;
