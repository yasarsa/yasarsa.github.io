import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { DAMAGE_TYPE_COLORS, DamageTypes } from '../../utils/constants';
import useAttack from '../../utils/hooks/useAttack';
import { useFeats } from '../../utils/hooks/useFeats';
import { useFeatures } from '../../utils/hooks/useFeatures';
import usePopup from '../../utils/hooks/usePopup';
import type { DamageType, IAttack } from '../../utils/types';
import Accordion from '../Accordion/Accordion';
import Tooltip from '../Tooltip/Tooltip';
import styles from './Attack.module.css';

interface Props {
    attack: IAttack;
    index: number;
}
export default function Attack({ attack, index }: Props) {

    const { showDeleteConfirmPopup } = usePopup()
    const { updateAttack } = useAttack()

    const { selectedCharacter } = useSelector((state: RootState) => state.data)

    const [attackResult, setAttackResult] = useState<string | null>(null);
    const [attackDetails, setAttackDetails] = useState<string | null>(null);
    const [damageResult, setDamageResult] = useState<string | null>(null);
    const [damageDetails, setDamageDetails] = useState<React.ReactNode | null>(null);

    const [name, setName] = useState(attack.name)
    const [attackBonus, setAttackBonus] = useState(attack.attackBonus);
    const [damages, setDamages] = useState(attack.damages || [{
        damageDieCount: 1,
        damageDieType: 6,
        damageBonus: 0,
        damageType: "Slashing"
    }]);
    const [critRange, setCritRange] = useState(attack.critRange);
    const [critMultiplier, setCritMultiplier] = useState(attack.critMultiplier ?? 2);
    const [rollType, setRollType] = useState<"normal" | "advantage" | "disadvantage">("normal");
    const { availableFeats, selectedFeats, toggleFeat, isSelected } = useFeats({
        characterFeats: selectedCharacter.feats || [],
        defaultSelectedFeats: attack.selectedFeats || selectedCharacter.feats || []
    });

    const { availableFeatures, selectedFeatures, toggleFeature, isSelected: isFeatureSelected } = useFeatures({
        characterFeatures: selectedCharacter.selectedFeatures || [],
        defaultSelectedFeatures: attack.selectedFeatures || selectedCharacter.selectedFeatures || []
    });
    const [includeProficiencyBonus, setIncludeProficiencyBonus] = useState(true);

    const proficiencyBonus = useMemo(() => Math.floor((selectedCharacter.level - 1) / 4) + 2, [selectedCharacter.level])


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
        let totalDamage = 0;
        const allDamageDetails: React.ReactNode[] = [];

        // Her bir hasar tipi için zar atışı yap
        damages.forEach((damage, damageIndex) => {
            let dieCount = damage.damageDieCount;
            if (isCrit) dieCount *= critMultiplier;

            let currentDamage = 0;
            const dmgDieArray: number[] = [];

            // Zar atışlarını yap
            for (let i = 0; i < dieCount; i++) {
                let r = Math.floor(Math.random() * damage.damageDieType) + 1;
                if (selectedFeats.includes('Elemental Adept') && r === 1) {
                    r = 2;
                }
                if (selectedFeats.includes('Great Weapon Fighting') && r < 3) {
                    r = 3;
                }
                dmgDieArray.push(r);
                currentDamage += r;
            }

            // Savage Attacker özelliği için ikinci atış
            if (damageIndex === 0 && selectedFeats.includes('Savage Attacker')) {
                let totalDamage2 = 0;
                const dmgDieArray2 = [];
                for (let i = 0; i < dieCount; i++) {
                    let r = Math.floor(Math.random() * damage.damageDieType) + 1;
                    if (selectedFeats.includes('Elemental Adept') && r === 1) {
                        r = 2;
                    }
                    if (selectedFeats.includes('Great Weapon Fighting') && r < 3) {
                        r = 3;
                    }
                    dmgDieArray2.push(r);
                    totalDamage2 += r;
                }
                if (totalDamage2 > currentDamage) {
                    currentDamage = totalDamage2;
                }
            }

            // Hasar bonusunu ekle
            currentDamage += damage.damageBonus;
            totalDamage += currentDamage;

            // Hasar detaylarını oluştur
            const damageDetails = `${damage.damageDieCount}d${damage.damageDieType} (${damage.damageType}): [${dmgDieArray.join(", ")}] + ${damage.damageBonus}`;
            allDamageDetails.push(
                <Tooltip key={damageIndex} content={damageDetails}>
                    <span style={{ color: DAMAGE_TYPE_COLORS[damage.damageType as keyof typeof DAMAGE_TYPE_COLORS] || '#000000' }}>
                        [{currentDamage}]
                    </span>
                </Tooltip>
            );
        });

        // Great Weapon Master özelliği için proficiency bonusunu ekle
        if (selectedFeats.includes('Great Weapon Master') && includeProficiencyBonus) {
            totalDamage += proficiencyBonus;
            allDamageDetails.push(
                <Tooltip key="gwm" content={`Great Weapon Master: +${proficiencyBonus}`}>
                    <span> + [{proficiencyBonus}]</span>
                </Tooltip>
            );
        }

        // Feature'lardan gelen ekstra hasarları ekle
        selectedFeatures.forEach((feature, index) => {
            if (feature.extraDamageDieCount && feature.extraDamageDieType) {
                let featureDieCount = feature.extraDamageDieCount;
                if (isCrit) featureDieCount *= critMultiplier;

                let featureDamage = 0;
                const featureDieRolls: number[] = [];

                for (let i = 0; i < featureDieCount; i++) {
                    const roll = Math.floor(Math.random() * feature.extraDamageDieType) + 1;
                    featureDieRolls.push(roll);
                    featureDamage += roll;
                }

                if (feature.extraDamageBonus) {
                    featureDamage += feature.extraDamageBonus;
                }

                totalDamage += featureDamage;

                const featureDetails = `${feature.name}: ${featureDieRolls.join(', ')}${feature.extraDamageBonus ? ` + ${feature.extraDamageBonus}` : ''}`;
                allDamageDetails.push(
                    <Tooltip key={`feature-${index}`} content={featureDetails}>
                        <span style={{ color: feature.extraDamageType ? DAMAGE_TYPE_COLORS[feature.extraDamageType as keyof typeof DAMAGE_TYPE_COLORS] : '#000000' }}>
                            + [{featureDamage}]
                        </span>
                    </Tooltip>
                );
            }
        });

        setDamageResult(`${totalDamage}`);
        setDamageDetails(<>{allDamageDetails}</>);
    }


    const handleDelete = () => {
        showDeleteConfirmPopup(index, "attack")
    }

    useEffect(() => {
        const updatedAttack: IAttack = {
            name,
            attackBonus,
            damages,
            critRange,
            critMultiplier,
            selectedFeats,
            selectedFeatures
        }

        updateAttack(index, updatedAttack)
    }, [name, attackBonus, damages, critRange, selectedFeats, selectedFeatures, updateAttack, index, critMultiplier])

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
                <div className={styles.DetailsText}>{attackDetails}</div>
            )}
        </div>
        <div className={styles.Container}>
            {damages.map((damage, idx) => (
                <div key={idx}>
                    <div className={styles.InputContainer}>
                        <input
                            type="number"
                            value={damage.damageDieCount}
                            onChange={(e) => {
                                const newDamages = [...damages];
                                newDamages[idx] = { ...damage, damageDieCount: parseInt(e.target.value) || 0 };
                                setDamages(newDamages);
                            }}
                        />
                        <span>d</span>
                        <input
                            type="number"
                            value={damage.damageDieType}
                            onChange={(e) => {
                                const newDamages = [...damages];
                                newDamages[idx] = { ...damage, damageDieType: parseInt(e.target.value) || 0 };
                                setDamages(newDamages);
                            }}
                        />
                        <span> + </span>
                        <input
                            type="number"
                            value={damage.damageBonus}
                            onChange={(e) => {
                                const newDamages = [...damages];
                                newDamages[idx] = { ...damage, damageBonus: parseInt(e.target.value) || 0 };
                                setDamages(newDamages);
                            }}
                        />
                    </div>
                    <div className={styles.InputContainer}>
                        <select
                            value={damage.damageType as string}
                            onChange={(e) => {
                                const newDamages = [...damages];
                                newDamages[idx] = { ...damage, damageType: e.target.value as DamageType };
                                setDamages(newDamages);
                            }}
                        >
                            {DamageTypes.map((dt) => (
                                <option key={dt} value={dt}>{dt}</option>
                            ))}
                        </select>
                        {damages.length > 1 && (
                            <button
                                onClick={() => {
                                    setDamages(damages.filter((_, i) => i !== idx));
                                }}
                                className={styles.RemoveClassButton}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <button
                className={styles.AddClassButton}
                onClick={() => {
                    setDamages([...damages, {
                        damageDieCount: 1,
                        damageDieType: 6,
                        damageBonus: 0,
                        damageType: "Slashing"
                    }]);
                }}
            >
                + Damage Type
            </button>
            <div className={styles.InputContainer}>
                <label>Proficiency Bonus(+{proficiencyBonus}):</label>
                <input
                    type="checkbox"
                    checked={includeProficiencyBonus}
                    onChange={() => setIncludeProficiencyBonus(prev => !prev)}
                />
            </div>
            {availableFeats.length > 0 && (
                <div className={styles.FeatsContainer}>
                    <label>Available Feats:</label>

                    {availableFeats.map((feat) => (
                        <div key={feat as string} className={styles.InputContainer}>
                            <label>{feat as string}:</label>
                            <input
                                type="checkbox"
                                checked={isSelected(feat)}
                                onChange={() => toggleFeat(feat)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {availableFeatures.length > 0 && (
                <div className={styles.FeaturesContainer}>
                    <label>Available Features:</label>

                    {availableFeatures.map((feature) => (
                        <div key={`${feature.name}-${feature.unlockedLevel}`} className={styles.InputContainer}>
                            {/* <label>{feature.name} (Lv {feature.unlockedLevel}):</label> */}
                            <label>{feature.name} (<span className={styles.FeatureDetail}>
                                <span style={{ color: feature.extraDamageType ? DAMAGE_TYPE_COLORS[feature.extraDamageType as keyof typeof DAMAGE_TYPE_COLORS] : 'inherit' }}>
                                    {feature.extraDamageDieCount}d{feature.extraDamageDieType}
                                    {feature.extraDamageBonus ? ` + ${feature.extraDamageBonus}` : ''}
                                </span>
                            </span>):</label>

                            <input
                                type="checkbox"
                                checked={isFeatureSelected(feature)}
                                onChange={() => toggleFeature(feature)}
                            />
                            {/* {feature.extraDamageDieCount && feature.extraDamageDieType && (
                                <span className={styles.FeatureDetail}>
                                    Extra Damage: {feature.extraDamageDieCount}d{feature.extraDamageDieType}
                                    {feature.extraDamageBonus ? ` + ${feature.extraDamageBonus}` : ''}
                                    {feature.extraDamageType ? ` ${feature.extraDamageType}` : ''}
                                </span>
                            )} */}
                        </div>
                    ))}
                </div>
            )}
            {/* Proficiency bonus is now calculated automatically based on character level */}
            <div className={styles.ButtonContainer}>
                <button onClick={() => handleDamage()}>Damage!</button>
            </div>
            {damageResult && (
                <p className={styles.ResultText}>You dealt <span>{damageResult}</span> damage.</p>
            )}
            {damageDetails && (
                <div className={styles.DetailsText}>{damageDetails}</div>
            )}
        </div></>


    return (
        <div className={styles.Attack}>
            <Accordion title={name} onDelete={handleDelete} children={children} />
        </div>
    )
}