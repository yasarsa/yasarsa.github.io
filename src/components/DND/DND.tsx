import { useState } from 'react';
import styles from './DND.module.css';

export default function DND() {

    const [attackResult, setAttackResult] = useState<string | null>(null);
    const [damageResult, setDamageResult] = useState<string | null>(null);

    const [attackBonus, setAttackBonus] = useState(10);
    const [damageDieCount, setDamageDieCount] = useState(4);
    const [damageDieType, setDamageDieType] = useState(6);
    const [damageBonus, setDamageBonus] = useState(5);
    const [critRange, setCritRange] = useState(19);

    const handleAttack = () => {
        const roll = Math.floor(Math.random() * 20) + 1;

        if (roll >= critRange) {
            handleDamage(true);
            setAttackResult(`Critical Hit! (${roll} + ${attackBonus})`);
            return
        } else if (roll === 1) {
            setAttackResult("Critical Miss!");
            return;
        } else {
            handleDamage()
        }

        setAttackResult(`Result: ${roll + attackBonus} (${roll} + ${attackBonus})`);
    }

    const handleDamage = (isDoubled?: boolean) => {
        let dieCount = damageDieCount
        if (isDoubled) dieCount *= 2

        let totalDamage = 0;
        for (let i = 0; i < dieCount; i++) {
            totalDamage += Math.floor(Math.random() * damageDieType) + 1;
        }
        totalDamage += damageBonus;

        setDamageResult(`You dealt ${totalDamage} damage! (${dieCount}d${damageDieType} + ${damageBonus})`);
    }

    return (
        <div className={styles.DND}>
            <div className={styles.Container}>
                <div className={styles.InputContainer}>
                    <label>Attack Bonus: </label>
                    <input type="number" defaultValue={10} value={attackBonus} onChange={(e) => setAttackBonus(parseInt(e.target.value))} />
                </div>
                <div className={styles.InputContainer}>
                    <label>Crit range(starting value): </label>
                    <input type="number" defaultValue={19} value={critRange} onChange={(e) => setCritRange(parseInt(e.target.value))} />
                </div>

                <button onClick={handleAttack}>Attack!</button>
                <p>{attackResult}</p>
            </div>
            <div className={styles.Container}>
                <div className={styles.InputContainer}>
                    <label>Damage: </label>
                    <input type="number" defaultValue={4} value={damageDieCount} onChange={(e) => setDamageDieCount(parseInt(e.target.value))} />
                    <span>d</span>
                    <input type="number" defaultValue={6} value={damageDieType} onChange={(e) => setDamageDieType(parseInt(e.target.value))} />
                    <span> + </span>
                    <input type="number" defaultValue={5} value={damageBonus} onChange={(e) => setDamageBonus(parseInt(e.target.value))} />
                </div>
                <button onClick={() => handleDamage()}>Damage!</button>
                <p>{damageResult}</p>
            </div>
        </div>
    )
}