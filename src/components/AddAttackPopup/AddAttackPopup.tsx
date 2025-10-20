import { useState } from 'react';
import crossImg from '../../assets/cross.svg';
import { DamageTypes } from '../../utils/constants';
import useAttack from '../../utils/hooks/useAttack';
import usePopup from '../../utils/hooks/usePopup';
import type { DamageType, IAttack } from '../../utils/types';
import styles from './AddAttackPopup.module.css';

export const AddAttackPopup = () => {
    const { hideAddAttackPopup } = usePopup()
    const { addAttack } = useAttack()

    const [name, setName] = useState('');
    const [attackBonus, setAttackBonus] = useState("");
    const [critRange, setCritRange] = useState("");
    const [critMultiplier, setCritMultiplier] = useState("");
    const [damages, setDamages] = useState([{
        damageDieCount: 1,
        damageDieType: 6,
        damageBonus: 0,
        damageType: "Slashing" as DamageType
    }]);

    const handleClose = () => {
        hideAddAttackPopup()
    }

    const handleAddAttack = () => {
        if (!name || attackBonus === "") {
            alert("Please fill all required fields before adding the attack.");
            return;
        } else {
            const attack: IAttack = {
                name,
                attackBonus: Number(attackBonus),
                critRange: Number(critRange) || 20,
                critMultiplier: Number(critMultiplier) || 2,
                damages
            };

            addAttack(attack);
            setName('');
            setAttackBonus("");
            setCritRange("");
            setCritMultiplier("");
            setDamages([{
                damageDieCount: 1,
                damageDieType: 6,
                damageBonus: 0,
                damageType: "Slashing"
            }]);

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
                    <input type="number" placeholder='Crit Multiplier' value={critMultiplier} onChange={(e) => setCritMultiplier(e.target.value)} />
                    {damages.map((damage, idx) => (
                        <div key={idx} className={styles.DamageContainer}>
                            <p>Damage Type {idx + 1}</p>
                            <div>
                                <input
                                    type="number"
                                    placeholder='Die Count'
                                    value={damage.damageDieCount}
                                    onChange={(e) => {
                                        const newDamages = [...damages];
                                        newDamages[idx] = { ...damage, damageDieCount: Number(e.target.value) || 0 };
                                        setDamages(newDamages);
                                    }}
                                />
                                <span>d</span>
                                <input
                                    type="number"
                                    placeholder='Die Type'
                                    value={damage.damageDieType}
                                    onChange={(e) => {
                                        const newDamages = [...damages];
                                        newDamages[idx] = { ...damage, damageDieType: Number(e.target.value) || 0 };
                                        setDamages(newDamages);
                                    }}
                                />
                                <span>+</span>
                                <input
                                    type="number"
                                    placeholder='Bonus'
                                    value={damage.damageBonus}
                                    onChange={(e) => {
                                        const newDamages = [...damages];
                                        newDamages[idx] = { ...damage, damageBonus: Number(e.target.value) || 0 };
                                        setDamages(newDamages);
                                    }}
                                />
                                <select
                                    value={damage.damageType}
                                    onChange={(e) => {
                                        const newDamages = [...damages];
                                        newDamages[idx] = { ...damage, damageType: e.target.value as DamageType };
                                        setDamages(newDamages);
                                    }}
                                >
                                    {DamageTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {damages.length > 1 && (
                                    <button
                                        className={styles.RemoveDamageButton}
                                        onClick={() => {
                                            setDamages(damages.filter((_, i) => i !== idx));
                                        }}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => {
                            setDamages([...damages, {
                                damageDieCount: 1,
                                damageDieType: 6,
                                damageBonus: 0,
                                damageType: "Slashing"
                            }]);
                        }}
                    >
                        Add Another Damage Type
                    </button>

                    <button className={styles.AddButton} onClick={handleAddAttack}>Add Attack</button>
                </div>
            </div>
        </div>
    );
}