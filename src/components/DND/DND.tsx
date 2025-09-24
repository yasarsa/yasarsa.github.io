import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { AddAttackFAB } from '../AddAttackFAB/AddAttackFAB';
import { AddAttackPopup } from '../AddAttackPopup/AddAttackPopup';
import Attack from '../Attack/Attack';
import styles from './DND.module.css';

export default function DND() {

    const { showAddPopup } = useSelector((state: RootState) => state.popup);

    const { attacks } = useSelector((state: RootState) => state.data);

    return (
        <div className={styles.DND}>
            {attacks.map((attack, index) => (
                <Attack key={index} name={attack.name} attack={attack} />
            ))}
            <AddAttackFAB />

            {showAddPopup && (
                <AddAttackPopup />
            )}
        </div>
    )
}