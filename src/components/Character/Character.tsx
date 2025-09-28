import { useEffect, useState } from "react";
import useCharacter from "../../utils/hooks/useCharacter";
import usePopup from "../../utils/hooks/usePopup";
import type { ICharacter } from "../../utils/types";
import Accordion from "../Accordion/Accordion";
import styles from "./Character.module.css";

interface Props {
    character: ICharacter
    index: number;
}
export default function Character({ character, index }: Props) {
    const { showDeleteConfirmPopup } = usePopup()
    const { updateCharacter, selectCharacter } = useCharacter()

    const [name, setName] = useState(character.name)
    const [level, setLevel] = useState(character.level)

    const handleDelete = () => {
        showDeleteConfirmPopup(index, "character")
    }

    const handleSelect = () => {
        selectCharacter(index)
    }

    useEffect(() => {
        const updatedCharacter: ICharacter = { ...character, name: name, level: level };

        if (character.name !== name || character.level !== level) {
            updateCharacter(index, updatedCharacter)
        }

    }, [name, level, updateCharacter, character, index])

    const children = <>
        <div className={styles.Container}>
            <div className={styles.InputContainer}>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.InputContainer}>
                <label>Level: </label>
                <input type="number" value={level} onChange={(e) => setLevel(parseInt(e.target.value))} />
            </div>
            <div className={styles.ButtonContainer}>
                <button onClick={handleSelect}>Select</button>
            </div>
        </div>
    </>

    return (
        <div className={styles.Character}>
            <Accordion title={character.name} onDelete={handleDelete} children={children} />
        </div>
    )
}