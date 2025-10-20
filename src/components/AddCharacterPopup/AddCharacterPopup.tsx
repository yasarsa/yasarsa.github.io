import { useState } from 'react';
import { useSelector } from 'react-redux';
import crossImg from '../../assets/cross.svg';
import type { RootState } from '../../store';
import { CharacterClasses } from '../../utils/constants';
import useCharacter from '../../utils/hooks/useCharacter';
import usePopup from '../../utils/hooks/usePopup';
import type { CharacterClassType, ICharacterClassDefinition } from '../../utils/types';
import styles from './AddCharacterPopup.module.css';

export const AddCharacterPopup = () => {
    const { hideAddCharacterPopup } = usePopup()
    const { addCharacter } = useCharacter()

    const { characters } = useSelector((state: RootState) => state.data)

    const [name, setName] = useState('');
    const [level, setLevel] = useState("")
    const [characterClasses, setCharacterClasses] = useState<ICharacterClassDefinition[]>([{ characterClass: CharacterClasses[0], level: 1 } as ICharacterClassDefinition]);

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
                characterClass: characterClasses,
                selectedFeatures: []
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
                    {characterClasses.map((charClassDef, idx) => (
                        <div key={idx} className={styles.InputContainer}>
                            <select name="classes" id="classes" value={charClassDef.characterClass as string} onChange={(e) => {
                                const updatedClasses = [...characterClasses];
                                updatedClasses[idx].characterClass = e.target.value as CharacterClassType;
                                setCharacterClasses(updatedClasses);
                            }}>
                                {CharacterClasses.map((charClass) => (
                                    <option key={charClass} value={charClass} >{charClass}</option>
                                ))}
                            </select>
                            <input type="number" placeholder='Level' value={charClassDef.level} onChange={(e) => {
                                const updatedClasses = [...characterClasses];
                                updatedClasses[idx].level = Number(e.target.value);
                                setCharacterClasses(updatedClasses);
                            }} />
                            {characterClasses.length > 1 && (
                                <button className={styles.RemoveClassButton} onClick={() => {
                                    const updatedClasses = characterClasses.filter((_, classIdx) => classIdx !== idx);
                                    setCharacterClasses(updatedClasses);
                                }}>Remove</button>
                            )}
                        </div>
                    ))}
                    <button className={styles.AddClassButton} onClick={() => {
                        setCharacterClasses([...characterClasses, { characterClass: CharacterClasses[0], level: 1 } as ICharacterClassDefinition]);
                    }}>+ Class</button>
                    <button className={styles.AddButton} onClick={handleAddCharacter}>Add Character</button>

                </div>
            </div>
        </div>
    );
}