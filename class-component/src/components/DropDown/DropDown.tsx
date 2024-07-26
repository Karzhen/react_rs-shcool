import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { clearCharacters } from '../../redux/selectedCharactersSlice';
import styles from './Dropdown.module.css';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const Dropdown: React.FC = () => {
    const dispatch = useDispatch();
    const selectedCharacters = useSelector(
        (state: RootState) => state.selectedCharacters.selected,
    );

    if (selectedCharacters.length === 0) {
        return null;
    }

    const handleLoad = () => {
        const csv = Papa.unparse(selectedCharacters);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const date = new Date();
        const formattedDate = date
            .toISOString()
            .replace(/:/g, '-')
            .replace(/\.\d{3}Z$/, ''); // заменяем двоеточия и удаляем миллисекунды и 'Z'
        const fileName = `${selectedCharacters.length}_characters_${formattedDate}.csv`;

        saveAs(blob, fileName);
    };

    return (
        <div className={styles.dropdown}>
            <p>Selected Characters: {selectedCharacters.length}</p>
            <button onClick={() => dispatch(clearCharacters())}>
                Clear All
            </button>
            <button onClick={handleLoad}>Load</button>
        </div>
    );
};

export default Dropdown;
