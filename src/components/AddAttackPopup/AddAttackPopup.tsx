import { useState } from 'react';
import crossImg from '../../assets/cross.svg';
import useAttack from '../../utils/hooks/useAttack';
import usePopup from '../../utils/hooks/usePopup';
import styles from './AddAttackPopup.module.css';

export const AddAttackPopup = () => {
    const { hideAddAttackPopup } = usePopup()
    const { addAttack } = useAttack()

    const [name, setName] = useState('');
    const [attackBonus, setAttackBonus] = useState("");
    const [critRange, setCritRange] = useState("");
    const [damageDieCount, setDamageDieCount] = useState("");
    const [damageDieType, setDamageDieType] = useState("");
    const [damageBonus, setDamageBonus] = useState("");

    const handleClose = () => {
        hideAddAttackPopup()
    }

    const handleAddAttack = () => {
        if (!name || attackBonus === undefined || critRange === undefined || damageDieCount === undefined || damageDieType === undefined || damageBonus === undefined) {
            alert("Please fill all fields before adding the attack.");
            return;
        } else {
            addAttack({
                name,
                attackBonus: Number(attackBonus),
                critRange: Number(critRange),
                damageDieCount: Number(damageDieCount),
                damageDieType: Number(damageDieType),
                damageBonus: Number(damageBonus),
                isSavageAttacker: false,
                isGreatWeaponFighting: false,
                isGreatWeaponMaster: false,
                proficiencyBonus: 0
            });

            setName('');
            setAttackBonus("");
            setCritRange("");
            setDamageDieCount("");
            setDamageDieType("");
            setDamageBonus("");

            hideAddAttackPopup();
        }
    }

    return (
        <div className={styles.Overlay}>
            <div className={styles.AddAttackPopup}>
                <div className={styles.TitleContainer}>
                    <p>Add a new Attack</p>
                    <img src={crossImg} alt="Close" onClick={handleClose} />
                </div>
                <div className={styles.Container}>
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="number" placeholder='Attack Bonus' value={attackBonus} onChange={(e) => setAttackBonus(e.target.value)} />
                    <input type="number" placeholder='Crit Range' value={critRange} onChange={(e) => setCritRange(e.target.value)} />
                    <input type="number" placeholder='Damage Die Count' value={damageDieCount} onChange={(e) => setDamageDieCount(e.target.value)} />
                    <input type="number" placeholder='Damage Die Type' value={damageDieType} onChange={(e) => setDamageDieType(e.target.value)} />
                    <input type="number" placeholder='Damage Bonus' value={damageBonus} onChange={(e) => setDamageBonus(e.target.value)} />
                    <button className={styles.AddButton} onClick={handleAddAttack}>Add Attack</button>
                </div>
            </div>
        </div>
    );
}