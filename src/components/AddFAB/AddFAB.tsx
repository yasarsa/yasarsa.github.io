import plusImage from '../../assets/plus.svg';
import usePopup from '../../utils/hooks/usePopup';
import styles from './AddFAB.module.css';

interface Props {
    isFloating?: boolean;
    type: "attack" | "character"
}
export const AddFAB = ({ isFloating, type }: Props) => {
    const { showAddAttackPopup, showAddCharacterPopup } = usePopup();

    const handleClick = () => {
        if (type === "attack") {
            showAddAttackPopup();
        }

        if (type === "character") {
            showAddCharacterPopup()
        }
    }

    return (
        <div className={styles.AddFAB} style={{ position: isFloating ? "fixed" : "initial" }} role='button' onClick={handleClick}>
            <img src={plusImage} alt="Add" />
        </div>
    );
}