import plusImage from '../../assets/plus.svg';
import usePopup from '../../utils/hooks/usePopup';
import styles from './AddAttackFAB.module.css';

export const AddAttackFAB = () => {
    const { showAddPopup } = usePopup();

    const handleClick = () => {
        showAddPopup();
    }

    return (
        <div className={styles.AddAttackFAB} onClick={handleClick}>
            <img src={plusImage} alt="Add" />
        </div>
    );
}