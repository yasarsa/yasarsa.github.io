import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { AddFAB } from "../AddFAB/AddFAB";
import Attack from "../Attack/Attack";
import styles from "./AttackList.module.css";

export default function AttackList() {
    const { attacks } = useSelector((state: RootState) => state.data);


    return (
        <div className={styles.AttackList}>
            {attacks.length === 0 ? (
                <div className={styles.NoAttacksContainer}>
                    <p>No attacks added yet. Click the "+" button to add your first attack.</p>
                    <AddFAB isFloating={false} type="attack" />
                </div>
            ) : (
                <>
                    {attacks.map((attack, index) => (
                        <Attack key={index} attack={attack} index={index} />
                    ))}
                    <AddFAB isFloating={true} type="attack" />
                </>
            )}
        </div>
    )
}