import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { DAMAGE_TYPE_COLORS } from '../../utils/constants';
import useAttack from '../../utils/hooks/useAttack';
import { useFeats } from '../../utils/hooks/useFeats';
import { useFeatures } from '../../utils/hooks/useFeatures';
import usePopup from '../../utils/hooks/usePopup';
import type { IAttack } from '../../utils/types';
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
    const [damageDieCount, setDamageDieCount] = useState(attack.damageDieCount);
    const [damageDieType, setDamageDieType] = useState(attack.damageDieType);
    const [damageBonus, setDamageBonus] = useState(attack.damageBonus);
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
        let dieCount = damageDieCount
        if (isCrit) dieCount *= critMultiplier

        let totalDamage = 0;
        let dmgDieArray: number[] = []
        for (let i = 0; i < dieCount; i++) {
            let r = Math.floor(Math.random() * damageDieType) + 1;
            if (selectedFeats.includes('Great Weapon Fighting') && r < 3) {
                r = 3
            }
            dmgDieArray.push(r);
            totalDamage += r;
        }

        if (selectedFeats.includes('Savage Attacker')) {
            let totalDamage2 = 0;
            const dmgDieArray2 = []
            for (let i = 0; i < dieCount; i++) {
                let r = Math.floor(Math.random() * damageDieType) + 1;
                if (selectedFeats.includes('Great Weapon Fighting') && r < 3) {
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
        // Add base damage bonus
        totalDamage += damageBonus;

        // Add proficiency bonus only if Great Weapon Master is selected and enabled
        if (selectedFeats.includes('Great Weapon Master') && includeProficiencyBonus) {
            totalDamage += proficiencyBonus;
        }

        // Add feature-based damage
        const featureDamageDetails: string[] = [];
        selectedFeatures.forEach(feature => {
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
                featureDamageDetails.push(
                    `${feature.name}: [${featureDieRolls.join(', ')}]${feature.extraDamageBonus ? ` + ${feature.extraDamageBonus}` : ''}`
                );
            }
        });

        setDamageResult(`${totalDamage}`);
        const weaponDamageDetails = `Base Weapon Damage Rolls: [${dmgDieArray.join(", ")}] + ${damageBonus}`;
        let details = (
            <Tooltip content={weaponDamageDetails}>
                <span>[{dmgDieArray.reduce((a, b) => a + b, 0) + damageBonus}]</span>
            </Tooltip>
        );
        if (selectedFeats.includes('Great Weapon Master') && includeProficiencyBonus) {
            const gwmDetail = (
                <Tooltip content={`Great Weapon Master: +${proficiencyBonus}`}>
                    <span> + [{proficiencyBonus}]</span>
                </Tooltip>
            );
            details = (
                <>
                    {details}
                    {gwmDetail}
                </>
            );
        }
        if (featureDamageDetails.length > 0) {
            const featureElements = featureDamageDetails.map((detail, index) => {
                const [featureName, damageRolls] = detail.split(': ');
                const total = damageRolls.match(/\d+/g)?.reduce((sum, num) => sum + parseInt(num, 10), 0) || 0;

                // Find the matching feature to get its damage type
                const feature = selectedFeatures.find(f => f.name === featureName);
                const damageType = feature?.extraDamageType;
                const damageColor = damageType ?
                    DAMAGE_TYPE_COLORS[damageType as keyof typeof DAMAGE_TYPE_COLORS] || '#000000' :
                    '#000000';

                return (
                    <Tooltip key={index} content={`${featureName}: ${damageRolls}${damageType ? ` (${damageType} damage)` : ''}`}>
                        <span style={{ color: damageColor }}> + [{total}]</span>
                    </Tooltip>
                );
            });
            details = (
                <>
                    {details}
                    {featureElements}
                </>
            );
        }
        setDamageDetails(details);
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
            critMultiplier,
            selectedFeats,
            selectedFeatures
        }

        updateAttack(index, updatedAttack)
    }, [name, attackBonus, damageDieCount, damageDieType, damageBonus, critRange, selectedFeats, selectedFeatures, proficiencyBonus, updateAttack, index, critMultiplier])

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
                <label>Proficiency Bonus(+{proficiencyBonus}):</label>
                <input
                    type="checkbox"
                    checked={includeProficiencyBonus}
                    onChange={() => setIncludeProficiencyBonus(prev => !prev)}
                />
            </div>
            <div className={styles.FeatsContainer}>
                {availableFeats.length > 0 && (
                    <label>Available Feats:</label>
                )}
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
            <div className={styles.FeaturesContainer}>
                {availableFeatures.length > 0 && (
                    <label>Available Features:</label>
                )}
                {availableFeatures.map((feature) => (
                    <div key={`${feature.name}-${feature.unlockedLevel}`} className={styles.InputContainer}>
                        <label>{feature.name} (Level {feature.unlockedLevel}):</label>
                        <input
                            type="checkbox"
                            checked={isFeatureSelected(feature)}
                            onChange={() => toggleFeature(feature)}
                        />
                        {feature.extraDamageDieCount && feature.extraDamageDieType && (
                            <span className={styles.FeatureDetail}>
                                Extra Damage: {feature.extraDamageDieCount}d{feature.extraDamageDieType}
                                {feature.extraDamageBonus ? ` + ${feature.extraDamageBonus}` : ''}
                                {feature.extraDamageType ? ` ${feature.extraDamageType}` : ''}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            {/* Proficiency bonus is now calculated automatically based on character level */}
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