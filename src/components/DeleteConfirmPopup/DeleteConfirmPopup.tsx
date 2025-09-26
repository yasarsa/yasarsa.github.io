import { useSelector } from 'react-redux';
import crossImg from '../../assets/cross.svg';
import type { RootState } from '../../store';
import useAttack from '../../utils/hooks/useAttack';
import usePopup from '../../utils/hooks/usePopup';
import styles from './DeleteConfirmPopup.module.css';

export default function DeleteConfirmPopup() {

    const { hideDeleteConfirmPopup } = usePopup()
    const { deleteAttack } = useAttack();
    const { attacks } = useSelector((state: RootState) => state.data)
    const { deleteAttackIndex } = useSelector((state: RootState) => state.popup)

    const attackToBeDeleted = attacks[deleteAttackIndex ?? -1]

    const handleClose = () => {
        hideDeleteConfirmPopup()
    }

    const handleNo = () => {
        hideDeleteConfirmPopup()
    }

    const handleYes = () => {
        deleteAttack(deleteAttackIndex ?? -1);
        hideDeleteConfirmPopup()
    }


    return (
        <div className={styles.Overlay}>
            <div className={styles.DeleteConfirmPopup}>
                <div className={styles.TitleContainer}>
                    <p>Are you sure you want to delete {attackToBeDeleted.name}?</p>
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