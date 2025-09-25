import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import useAttack from '../../utils/hooks/useAttack';
import { AddAttackFAB } from '../AddAttackFAB/AddAttackFAB';
import { AddAttackPopup } from '../AddAttackPopup/AddAttackPopup';
import Attack from '../Attack/Attack';
import DeleteConfirmPopup from '../DeleteConfirmPopup/DeleteConfirmPopup';
import styles from './DND.module.css';

export default function DND() {

    const { getAttacks } = useAttack()

    const { showAddPopup, showDeleteConfirmPopup } = useSelector((state: RootState) => state.popup);

    const { attacks } = useSelector((state: RootState) => state.data);

    useEffect(() => {
        getAttacks()
    }, [getAttacks])

    return (
        <div className={styles.DND}>
            {attacks.map((attack, index) => (
                <Attack key={index} name={attack.name} attack={attack} index={index} />
            ))}
            <AddAttackFAB />

            {showAddPopup && (
                <AddAttackPopup />
            )}

            {showDeleteConfirmPopup && (
                <DeleteConfirmPopup />
            )}
        </div>
    )
}