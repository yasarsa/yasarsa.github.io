import { useSelector } from 'react-redux';
import crossImg from '../../assets/cross.svg';
import type { RootState } from '../../store';
import useAttack from '../../utils/hooks/useAttack';
import useCharacter from '../../utils/hooks/useCharacter';
import usePopup from '../../utils/hooks/usePopup';
import styles from './DeleteConfirmPopup.module.css';

export default function DeleteConfirmPopup() {

    const { hideDeleteConfirmPopup } = usePopup()
    const { deleteAttack } = useAttack();
    const { deleteCharacter } = useCharacter();
    const { attacks, characters } = useSelector((state: RootState) => state.data)
    const { deleteAttackIndex, deleteCharacterIndex, deleteActionType } = useSelector((state: RootState) => state.popup)

    const itemToBeDeleted = deleteActionType === "attack" ? attacks[deleteAttackIndex ?? -1] : characters[deleteCharacterIndex ?? -1]

    const handleClose = () => {
        hideDeleteConfirmPopup()
    }

    const handleNo = () => {
        hideDeleteConfirmPopup()
    }

    const handleYes = () => {
        hideDeleteConfirmPopup()

        if (deleteActionType === "attack") {
            deleteAttack(deleteAttackIndex ?? -1);
        }

        if (deleteActionType === "character") {
            deleteCharacter(deleteCharacterIndex ?? -1)
        }

    }


    return (
        <div className={styles.Overlay}>
            <div className={styles.DeleteConfirmPopup}>
                <div className={styles.TitleContainer}>
                    <p>Are you sure you want to delete {itemToBeDeleted.name}?</p>
                    <img src={crossImg} alt="Close" onClick={handleClose} />
                </div>
                <div className={styles.ButtonContainer}>
                    <button onClick={handleYes}>Yes</button>
                    <button onClick={handleNo}>No</button>
                </div>
            </div>
        </div>
    )
}