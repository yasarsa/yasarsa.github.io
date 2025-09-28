import { useSelector } from "react-redux";
import type { RootState } from '../../store';
import { AddFAB } from "../AddFAB/AddFAB";
import Character from "../Character/Character";
import styles from "./CharacterList.module.css";


export default function CharacterList() {
    const { characters } = useSelector((state: RootState) => state.data);

    return (
        <div className={styles.CharacterList}>
            {characters.length === 0 ? (
                <div className={styles.NoCharactersContainer}>
                    <p>No character added yet. Click the "+" button to add your first character.</p>
                    <AddFAB isFloating={false} type='character' />
                </div>
            ) : (
                <>
                    <div className={styles.TitleContainer}>
                        <p>Your characters</p>
                    </div>
                    {characters.map((character, index) => (
                        <Character key={index} character={character} index={index} />
                    )
                    )}
                    <AddFAB isFloating={true} type="character" />
                </>

            )}
        </div>
    )
}