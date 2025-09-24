import crossImg from '../../assets/cross.svg';
import usePopup from '../../utils/hooks/usePopup';
import styles from './AddAttackPopup.module.css';

export const AddAttackPopup = () => {
    const { hideAddPopup } = usePopup()

    const handleClose = () => {
        hideAddPopup()
    }

    return (
        <div className={styles.AddAttackPopup}>
            <div className={styles.TitleContainer}>
                <p>Add a new Attack</p>
                <img src={crossImg} alt="Close" onClick={handleClose} />
            </div>
            <div className={styles.Container}>
                <p>This feature is coming soon!</p>
            </div>
        </div>
    );
}