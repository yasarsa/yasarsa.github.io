import { useSelector } from "react-redux";
import hamburgerImg from "../../assets/hamburger.svg";
import importImg from '../../assets/import.svg';
import type { RootState } from '../../store';
import usePopup from "../../utils/hooks/usePopup";
import { AddFAB } from "../AddFAB/AddFAB";
import Character from "../Character/Character";
import styles from "./CharacterList.module.css";


export default function CharacterList() {
    const { showImportPopup, openSidebar } = usePopup()
    const { characters } = useSelector((state: RootState) => state.data);

    const handleMenu = () => {
        openSidebar()
    }

    const handleImport = () => {
        showImportPopup()
    }

    return (
        <div className={styles.CharacterList}>
            {characters.length === 0 ? (
                <div className={styles.NoCharactersContainer}>
                    <p>No character added yet. Click the "+" button to add your first character.</p>
                    <AddFAB isFloating={false} type='character' />
                    <p>or</p>
                    <p>Import your characters</p>
                    <div className={styles.ImportContainer}>
                        <img src={importImg} onClick={handleImport} alt="Import" />
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.TitleContainer}>
                        <img src={hamburgerImg} onClick={handleMenu} alt="Menu" />
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