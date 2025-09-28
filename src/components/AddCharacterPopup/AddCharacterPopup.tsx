import { useState } from 'react';
import { useSelector } from 'react-redux';
import crossImg from '../../assets/cross.svg';
import type { RootState } from '../../store';
import { CharacterClasses } from '../../utils/contants';
import useCharacter from '../../utils/hooks/useCharacter';
import usePopup from '../../utils/hooks/usePopup';
import type { CharacterClassType } from '../../utils/types';
import styles from './AddCharacterPopup.module.css';

export const AddCharacterPopup = () => {
    const { hideAddCharacterPopup } = usePopup()
    const { addCharacter } = useCharacter()

    const { characters } = useSelector((state: RootState) => state.data)

    const [name, setName] = useState('');
    const [level, setLevel] = useState("")
    const [characterClass, setCharacterClass] = useState<CharacterClassType>("Barbarian");

    const handleClose = () => {
        hideAddCharacterPopup()
    }

    const handleAddCharacter = () => {

        if (!name || level === undefined) {
            alert("Please fill all fields before adding the character.");
            return;
        } else {
            addCharacter({
                id: characters.length + 1,
                name,
                level: Number(level),
                characterClass: characterClass,
            });

            setName('');
            setLevel("");

            hideAddCharacterPopup();
        }
    }

    return (
        <div className={styles.Overlay}>
            <div className={styles.AddCharacterPopup}>
                <div className={styles.TitleContainer}>
                    <p>Add a new character</p>
                    <img src={crossImg} alt="Close" onClick={handleClose} />
                </div>
                <div className={styles.Container}>
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="number" placeholder='Level' value={level} onChange={(e) => setLevel(e.target.value)} />
                    <div className={styles.InputContainer}>
                        <label>Class: </label>
                        <select name="classes" id="classes" value={characterClass as string} onChange={(e) => setCharacterClass(e.target.value as CharacterClassType)}>
                            {CharacterClasses.map((charClass) => (
                                <option key={charClass} value={charClass} >{charClass}</option>
                            ))}
                        </select>
                    </div>
                    <button className={styles.AddButton} onClick={handleAddCharacter}>Add Character</button>
                </div>
            </div>
        </div>
    );
}