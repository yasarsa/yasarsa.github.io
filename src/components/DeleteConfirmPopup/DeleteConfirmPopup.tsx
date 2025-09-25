import crossImg from '../../assets/cross.svg';
import usePopup from '../../utils/hooks/usePopup';
import styles from './DeleteConfirmPopup.module.css';

export default function DeleteConfirmPopup() {

    const { hideDeleteConfirmPopup } = usePopup()
    const handleClose = () => {
        hideDeleteConfirmPopup()
    }
    return (
        <div className={styles.DeleteConfirmPopup}>
            <div className={styles.TitleContainer}>
                <p>Are you sure you want to delete this attack?</p>
                <img src={crossImg} alt="Close" onClick={handleClose} />
            </div>
            <div>
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>
    )
}