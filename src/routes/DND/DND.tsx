import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AddAttackPopup } from '../../components/AddAttackPopup/AddAttackPopup';
import type { RootState } from '../../store';
import useCharacter from '../../utils/hooks/useCharacter';

import { AddCharacterPopup } from '../../components/AddCharacterPopup/AddCharacterPopup';
import AttackList from '../../components/AttackList/AttackList';
import CharacterList from '../../components/CharacterList/CharacterList';
import DeleteConfirmPopup from '../../components/DeleteConfirmPopup/DeleteConfirmPopup';
import ImportPopup from '../../components/ImportPopup/ImportPopup';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './DND.module.css';


export default function DND() {

    const { getCharacters } = useCharacter()

    const { showAddAttackPopup, showDeleteConfirmPopup, showAddCharacterPopup, showSidebar, showImportPopup } = useSelector((state: RootState) => state.popup);
    const { selectedCharacter } = useSelector((state: RootState) => state.data);

    const isCharacterSelected = selectedCharacter !== null

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