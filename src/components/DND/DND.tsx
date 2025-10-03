import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import useCharacter from '../../utils/hooks/useCharacter';
import { AddAttackPopup } from '../AddAttackPopup/AddAttackPopup';
import { AddCharacterPopup } from '../AddCharacterPopup/AddCharacterPopup';
import AttackList from '../AttackList/AttackList';
import CharacterList from '../CharacterList/CharacterList';
import DeleteConfirmPopup from '../DeleteConfirmPopup/DeleteConfirmPopup';
import ImportPopup from '../ImportPopup/ImportPopup';
import Sidebar from '../Sidebar/Sidebar';
import styles from './DND.module.css';


export default function DND() {

    const { getCharacters } = useCharacter()

    const { showAddAttackPopup, showDeleteConfirmPopup, showAddCharacterPopup, showSidebar, showImportPopup } = useSelector((state: RootState) => state.popup);
    const { selectedCharacter } = useSelector((state: RootState) => state.data);

    const isCharacterSelected = selectedCharacter.name ? true : false

    useEffect(() => {
        getCharacters()
    }, [getCharacters])

    return (
        <div className={styles.DND}>
            {isCharacterSelected ? (
                <AttackList />
            ) : (
                <CharacterList />
            )}

            {showAddAttackPopup && (
                <AddAttackPopup />
            )}

            {showDeleteConfirmPopup && (
                <DeleteConfirmPopup />
            )}

            {showAddCharacterPopup && (
                <AddCharacterPopup />
            )}

            {showSidebar && (
                <Sidebar />
            )}

            {showImportPopup && (
                <ImportPopup />
            )}
        </div >

    )
}