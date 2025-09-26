import plusImage from '../../assets/plus.svg';
import usePopup from '../../utils/hooks/usePopup';
import styles from './AddAttackFAB.module.css';

interface Props {
    isFloating?: boolean;
}
export const AddAttackFAB = ({ isFloating }: Props) => {
    const { showAddPopup } = usePopup();

    const handleClick = () => {
        showAddPopup();
    }

    return (
        <div className={styles.AddAttackFAB} style={{ position: isFloating ? "fixed" : "initial" }} role='button' onClick={handleClick}>
            <img src={plusImage} alt="Add" />
        </div>
    );
}