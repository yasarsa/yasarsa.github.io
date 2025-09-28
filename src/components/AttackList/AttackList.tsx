import { useSelector } from "react-redux";
import backIcon from "../../assets/back.svg";
import type { RootState } from "../../store";
import useCharacter from "../../utils/hooks/useCharacter";
import { AddFAB } from "../AddFAB/AddFAB";
import Attack from "../Attack/Attack";
import styles from "./AttackList.module.css";

export default function AttackList() {
    const { selectCharacter } = useCharacter()
    const { attacks, selectedCharacter } = useSelector((state: RootState) => state.data);

    const handleBack = () => {
        selectCharacter(undefined)
    }

    return (
        <div className={styles.AttackList}>

            {attacks.length === 0 ? (
                <div className={styles.NoAttacksContainer}>
                    <p>No attacks added yet. Click the "+" button to add your first attack.</p>
                    <AddFAB isFloating={false} type="attack" />
                </div>
            ) : (
                <>
                    <div className={styles.TitleContainer}>
                        <img src={backIcon} onClick={handleBack} />
                        <p>{selectedCharacter.name}'s Attacks</p>
                    </div>
                    {attacks.map((attack, index) => (
                        <Attack key={index} attack={attack} index={index} />
                    ))}
                    <AddFAB isFloating={true} type="attack" />
                </>
            )}
        </div>
    )
}