import { useState } from 'react';
import styles from './DND.module.css';

export default function DND() {

    const [attackResult, setAttackResult] = useState<string | null>(null);
    const [damageResult, setDamageResult] = useState<string | null>(null);

    const handleAttack = () => {

        const atkBonus = 10

        const roll = Math.floor(Math.random() * 20) + 1;
        if (roll >= 19) {
            handleDamage(true);
            return;
        } else if (roll === 1) {
            setAttackResult("Critical Miss!");
            return;
        } else {
            handleDamage()
        }

        setAttackResult(`You rolled a ${roll + atkBonus} (${roll} + ${atkBonus})`);
    }

    const handleDamage = (isDoubled?: boolean) => {
        const dmgDie = 6
        let dieCount = 4
        if (isDoubled) dieCount *= 2
        const dmgBonus = 5

        let totalDamage = 0;
        for (let i = 0; i < dieCount; i++) {
            totalDamage += Math.floor(Math.random() * dmgDie) + 1;
        }
        totalDamage += dmgBonus;

        setDamageResult(`You dealt ${totalDamage} damage! (${dieCount}d${dmgDie} + ${dmgBonus})`);
    }

    return (
        <div className={styles.DND}>
            <div className={styles.Container}>
                <div className={styles.InputContainer}>
                    <label>Attack Bonus: </label>
                    <input type="number" defaultValue={10} />
                </div>

                <button onClick={handleAttack}>Attack!</button>
                <p>{attackResult}</p>
            </div>
            <div className={styles.Container}>
                <div className={styles.InputContainer}>
                    <label>Damage: </label>
                    <input type="number" defaultValue={4} />
                    <span>d</span>
                    <input type="number" defaultValue={6} />
                    <span> + </span>
                    <input type="number" defaultValue={5} />
                </div>
                <button onClick={() => handleDamage()}>Damage!</button>
                <p>{damageResult}</p>
            </div>
        </div>
    )
}