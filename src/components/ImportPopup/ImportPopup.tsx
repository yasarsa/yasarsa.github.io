import React, { useRef } from 'react';
import closeImg from '../../assets/cross.svg';
import useCharacter from '../../utils/hooks/useCharacter';
import usePopup from '../../utils/hooks/usePopup';
import styles from './ImportPopup.module.css';

export default function ImportPopup() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { closeImportPopup } = usePopup();
    const { importCharacters } = useCharacter()

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeImportPopup();
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const json = JSON.parse(event.target?.result as string);
                    if (Array.isArray(json)) {
                        importCharacters(json);
                        closeImportPopup();
                    } else {
                        alert('Invalid JSON format. Expected an array of characters.');
                    }
                } catch (error) {
                    alert('Error parsing JSON file.');
                    console.error(error);
                }
            };
            reader.readAsText(file);
        }
    }

    const handleImportClick = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className={styles.Overlay} onClick={handleOverlayClick}>
            <div className={styles.ImportPopup}>
                <div className={styles.Header}>
                    <h2>Import Characters</h2>
                    <img src={closeImg} alt="Close" onClick={closeImportPopup} />
                </div>
                <div className={styles.Content}>
                    <p>Select a JSON file to import your characters.</p>
                    <button onClick={handleImportClick}>Choose File</button>
                    <input
                        type="file"
                        accept=".json,application/json"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </div>
    );
}