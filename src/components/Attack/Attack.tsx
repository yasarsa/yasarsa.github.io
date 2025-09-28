import { useEffect, useState } from 'react';
import useAttack from '../../utils/hooks/useAttack';
import usePopup from '../../utils/hooks/usePopup';
import type { IAttack } from '../../utils/types';
import Accordion from '../Accordion/Accordion';
import styles from './Attack.module.css';

interface Props {
    attack: IAttack;
    index: number;
}
export default function Attack({ attack, index }: Props) {

    const { showDeleteConfirmPopup } = usePopup()
    const { updateAttack } = useAttack()

    const [attackResult, setAttackResult] = useState<string | null>(null);
    const [attackDetails, setAttackDetails] = useState<string | null>(null);
    const [damageResult, setDamageResult] = useState<string | null>(null);
    const [damageDetails, setDamageDetails] = useState<string | null>(null);

    const [name, setName] = useState(attack.name)
    const [attackBonus, setAttackBonus] = useState(attack.attackBonus);
    const [damageDieCount, setDamageDieCount] = useState(attack.damageDieCount);
    const [damageDieType, setDamageDieType] = useState(attack.damageDieType);
    const [damageBonus, setDamageBonus] = useState(attack.damageBonus);
    const [critRange, setCritRange] = useState(attack.critRange);
    const [critMultiplier, setCritMultiplier] = useState(attack.critMultiplier ?? 2);
    const [rollType, setRollType] = useState<"normal" | "advantage" | "disadvantage">("normal");
    const [isSavageAttacker, setSavageAttacker] = useState(attack.isSavageAttacker);
    const [isGreatWeaponFighting, setGreatWeaponFighting] = useState(attack.isGreatWeaponFighting);
    const [isGreatWeaponMaster, setGreatWeaponMaster] = useState(attack.isGreatWeaponMaster);
    const [proficiencyBonus, setProficiencyBonus] = useState(attack.proficiencyBonus);



    const handleAttack = () => {
        let roll = Math.floor(Math.random() * 20) + 1;

        if (rollType === "advantage") {
            const roll2 = Math.floor(Math.random() * 20) + 1;
            console.log(`Advantage Roll: ${roll2} vs ${roll}`);
            if (roll2 > roll) {
                roll = roll2;
            }
        } else if (rollType === "disadvantage") {
            const roll2 = Math.floor(Math.random() * 20) + 1;
            console.log(`Disadvantage Roll: ${roll2} vs ${roll}`);
            if (roll2 < roll) {
                roll = roll2;
            }
        }


        if (roll >= critRange) {
            handleDamage(true);
            setAttackResult(`Critical Hit!`);
            setAttackDetails("")
            return
        } else if (roll === 1) {
            setAttackResult("Critical Miss!");
            setAttackDetails("")
            return;
        } else {
            handleDamage()
        }

        setAttackResult(`${roll + attackBonus}`);
        setAttackDetails(`(${roll} + ${attackBonus})`);
    }

    const handleDamage = (isCrit?: boolean) => {
        let dieCount = damageDieCount
        if (isCrit) dieCount *= critMultiplier

        let totalDamage = 0;
        let dmgDieArray: number[] = []
        for (let i = 0; i < dieCount; i++) {
            let r = Math.floor(Math.random() * damageDieType) + 1;
            if (isGreatWeaponFighting && r < 3) {
                r = 3
            }
            dmgDieArray.push(r);
            totalDamage += r;
        }

        if (isSavageAttacker) {
            let totalDamage2 = 0;
            const dmgDieArray2 = []
            for (let i = 0; i < dieCount; i++) {
                let r = Math.floor(Math.random() * damageDieType) + 1;
                if (isGreatWeaponFighting && r < 3) {
                    r = 3
                }
                dmgDieArray2.push(r);
                totalDamage2 += r;
            }
            if (totalDamage2 > totalDamage) {
                dmgDieArray = [...dmgDieArray2];
            }
            totalDamage = Math.max(totalDamage, totalDamage2);
            console.log(`Savage Attacker Roll: ${totalDamage2} vs ${totalDamage}`);
        }
        totalDamage += damageBonus;
        if (isGreatWeaponMaster) {
            totalDamage += proficiencyBonus;
        }

        setDamageResult(`${totalDamage}`);
        setDamageDetails(`([${dmgDieArray.join(", ")}] + ${damageBonus}) ${isGreatWeaponMaster ? `+ ${proficiencyBonus}` : ""}`);
    }


    const handleDelete = () => {
        showDeleteConfirmPopup(index, "attack")
    }

    useEffect(() => {
        const updatedAttack: IAttack = {
            name,
            attackBonus,
            damageDieCount,
            damageDieType,
            damageBonus,
            critRange,
            isSavageAttacker,
            isGreatWeaponFighting,
            isGreatWeaponMaster,
            proficiencyBonus,
            critMultiplier
        }

        updateAttack(index, updatedAttack)
    }, [name, attackBonus, damageDieCount, damageDieType, damageBonus, critRange, isSavageAttacker, isGreatWeaponFighting, isGreatWeaponMaster, proficiencyBonus, updateAttack, index, critMultiplier])

    const children = <>
        <div className={styles.Container}>
            <div className={styles.InputContainer}>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.InputContainer}>
                <label>Attack Bonus: </label>
                <input type="number" value={attackBonus} onChange={(e) => setAttackBonus(parseInt(e.target.value))} />
            </div>
            <div className={styles.InputContainer}>
                <label>Crit range(starting value): </label>
                <input type="number" min={0} value={critRange} onChange={(e) => setCritRange(parseInt(e.target.value))} />
            </div>
            <div className={styles.InputContainer}>
                <label>Crit Multiplier: </label>
                <input type="number" min={1} value={critMultiplier} onChange={(e) => setCritMultiplier(parseInt(e.target.value))} />
            </div>
            <div className={styles.RadioContainer}>
                <label>Roll Type: </label>
                <label>
                    <input
                        type="radio"
                        name="rollType"
                        value="normal"
                        defaultChecked
                        onChange={() => { setRollType("normal") }}
                    />
                    Normal
                </label>
                <label>
                    <input
                        type="radio"
                        name="rollType"
                        value="advantage"
                        onChange={() => { setRollType("advantage") }}
                    />
                    Advantage
                </label>
                <label>
                    <input
                        type="radio"
                        name="rollType"
                        value="disadvantage"
                        onChange={() => { setRollType("disadvantage") }}
                    />
                    Disadvantage
                </label>
            </div>
            <div className={styles.ButtonContainer}>
                <button onClick={handleAttack}>Attack!</button>
            </div>
            {attackResult && (
                <p className={styles.ResultText}>Result: <span>{attackResult}</span></p>
            )}
            {attackDetails && (
                <p className={styles.DetailsText}>{attackDetails}</p>
            )}
        </div>
        <div className={styles.Container}>
            <div className={styles.InputContainer}>
                <label>Damage: </label>
                <input type="number" value={damageDieCount} onChange={(e) => setDamageDieCount(parseInt(e.target.value))} />
                <span>d</span>
                <input type="number" value={damageDieType} onChange={(e) => setDamageDieType(parseInt(e.target.value))} />
                <span> + </span>
                <input type="number" value={damageBonus} onChange={(e) => setDamageBonus(parseInt(e.target.value))} />
            </div>
            <div className={styles.InputContainer}>
                <label>Savage Attacker:</label>
                <input type="checkbox" checked={isSavageAttacker} onChange={() => setSavageAttacker((prev) => !prev)} />
            </div>
            <div className={styles.InputContainer}>
                <label>Great Weapon Fighting:</label>
                <input type="checkbox" checked={isGreatWeaponFighting} onChange={() => setGreatWeaponFighting((prev) => !prev)} />
            </div>
            <div className={styles.InputContainer}>
                <label>Great Weapon Master:</label>
                <input type="checkbox" checked={isGreatWeaponMaster} onChange={() => setGreatWeaponMaster((prev) => !prev)} />
            </div>
            {isGreatWeaponMaster && (
                <div className={styles.InputContainer}>
                    <label>Proficiency Bonus:</label>
                    <input type="number" value={proficiencyBonus} onChange={(e) => setProficiencyBonus(parseInt(e.target.value))} />
                </div>
            )}
            <div className={styles.ButtonContainer}>
                <button onClick={() => handleDamage()}>Damage!</button>
            </div>
            {damageResult && (
                <p className={styles.ResultText}>You dealt <span>{damageResult}</span> damage.</p>
            )}
            {damageDetails && (
                <p className={styles.DetailsText}>{damageDetails}</p>
            )}
        </div></>


    return (
        <div className={styles.Attack}>
            <Accordion title={name} onDelete={handleDelete} children={children} />
        </div>
    )
}