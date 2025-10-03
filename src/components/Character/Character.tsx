import { useEffect, useState } from "react";
import { CharacterClasses, data } from "../../utils/contants";
import useCharacter from "../../utils/hooks/useCharacter";
import usePopup from "../../utils/hooks/usePopup";
import type { CharacterClassType, ICharacter, ICharacterClassDefinition, ICharacterClassFeature } from "../../utils/types";
import Accordion from "../Accordion/Accordion";
import styles from "./Character.module.css";

interface Props {
    character: ICharacter
    index: number;
}
export default function Character({ character, index }: Props) {
    const { showDeleteConfirmPopup } = usePopup()
    const { updateCharacter, selectCharacter } = useCharacter()

    const [name, setName] = useState(character.name)
    const [level, setLevel] = useState(character.level)
    const [characterClasses, setCharacterClasses] = useState<ICharacterClassDefinition[]>(character.characterClass)
    const [selectedFeatures, setSelectedFeatures] = useState<ICharacterClassFeature[]>(character.selectedFeatures || [])

    const handleDelete = () => {
        showDeleteConfirmPopup(index, "character")
    }

    const handleSelect = () => {
        selectCharacter(index)
    }

    useEffect(() => {
        const updatedCharacter: ICharacter = {
            ...character,
            name: name,
            level: level,
            characterClass: characterClasses,
            selectedFeatures: selectedFeatures
        };

        if (character.name !== name ||
            character.level !== level ||
            character.characterClass !== characterClasses ||
            JSON.stringify(character.selectedFeatures) !== JSON.stringify(selectedFeatures)) {
            updateCharacter(index, updatedCharacter)
        }

    }, [name, level, updateCharacter, character, index, characterClasses, selectedFeatures])

    const children = <>
        <div className={styles.Container}>
            <div className={styles.InputContainer}>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.InputContainer}>
                <label>Level: </label>
                <input type="number" value={level} onChange={(e) => setLevel(parseInt(e.target.value))} />
            </div>
            {characterClasses.length > 0 && characterClasses.map((charClassDef, idx) => (
                <div key={idx} className={styles.InputContainer}>
                    <label>Class {idx + 1}: </label>
                    <select name={`class-${idx}`} id={`class-${idx}`} value={charClassDef.characterClass as string} onChange={(e) => {
                        const updatedClasses = [...characterClasses];
                        updatedClasses[idx] = { ...updatedClasses[idx], characterClass: e.target.value as CharacterClassType };
                        setCharacterClasses(updatedClasses);
                    }}>
                        {CharacterClasses.map((charClass) => (
                            <option key={charClass} value={charClass} >{charClass}</option>
                        ))}
                    </select>
                    <input type="number" min={1} value={charClassDef.level} onChange={(e) => {
                        const updatedClasses = [...characterClasses];
                        updatedClasses[idx] = { ...updatedClasses[idx], level: parseInt(e.target.value) };
                        setCharacterClasses(updatedClasses);
                    }} />
                    {characterClasses.length > 1 && (
                        <button className={styles.RemoveClassButton} onClick={() => {
                            const updatedClasses = characterClasses.filter((_, classIdx) => classIdx !== idx);
                            setCharacterClasses(updatedClasses);
                        }}>Remove Class</button>
                    )}
                </div>
            ))}
            {characterClasses.length < 3 && (
                <button className={styles.AddClassButton} onClick={() => {
                    setCharacterClasses([...characterClasses, { characterClass: "Barbarian", level: 1 }]);
                }}>Add Another Class</button>
            )}


            {characterClasses.length > 0 && characterClasses.map((charClassDef, idx) => (
                <div className={styles.FeatureContainer} key={idx}>
                    <label>Class Features: </label>
                    <div className={styles.Features}>
                        {typeof charClassDef.characterClass === "string" && data[charClassDef.characterClass.toLowerCase() as keyof typeof data]?.features
                            .filter(feature => feature.unlockedLevel <= level)
                            .map((feature, idx, arr) => {
                                // Check if feature has a damage property and if there are multiple levels for the same feature
                                const handleFeatureToggle = (feature: ICharacterClassFeature) => {
                                    setSelectedFeatures(prev => {
                                        const isFeatureSelected = prev.some(f => f.name === feature.name && f.unlockedLevel === feature.unlockedLevel);
                                        if (isFeatureSelected) {
                                            return prev.filter(f => !(f.name === feature.name && f.unlockedLevel === feature.unlockedLevel));
                                        } else {
                                            return [...prev, feature];
                                        }
                                    });
                                };

                                if (feature.extraDamageDieCount || feature.extraDamageDieType || feature.extraDamageBonus) {
                                    const highestLevelFeature = arr
                                        .filter(f => f.name === feature.name && f.unlockedLevel <= level)
                                        .reduce((prev, curr) => (curr.unlockedLevel > prev.unlockedLevel ? curr : prev), feature);

                                    if (feature.unlockedLevel === highestLevelFeature.unlockedLevel) {
                                        return (
                                            <div key={idx} className={styles.Feature}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFeatures.some(f => f.name === feature.name && f.unlockedLevel === feature.unlockedLevel)}
                                                    onChange={() => handleFeatureToggle(feature)}
                                                />
                                                {feature.name} (Level {feature.unlockedLevel}) - Damage: {feature.extraDamageDieCount}d{feature.extraDamageDieType}{feature.extraDamageBonus ? ` + ${feature.extraDamageBonus}` : ""}
                                            </div>
                                        );
                                    }
                                    return null;
                                }
                                return (
                                    <div key={idx} className={styles.Feature}>
                                        <input
                                            type="checkbox"
                                            checked={selectedFeatures.some(f => f.name === feature.name && f.unlockedLevel === feature.unlockedLevel)}
                                            onChange={() => handleFeatureToggle(feature)}
                                        />
                                        {feature.name} (Level {feature.unlockedLevel})
                                    </div>
                                );
                            })}
                        {typeof charClassDef.characterClass === "string" && data[charClassDef.characterClass.toLowerCase() as keyof typeof data]?.features
                            .filter(feature => feature.unlockedLevel <= level).length === 0 && (
                                <div className={styles.NoFeature}>No features unlocked yet.</div>
                            )}
                    </div>
                </div>
            )
            )}

            <div className={styles.ButtonContainer}>
                <button onClick={handleSelect}>Select</button>
            </div>
        </div>
    </>

    return (
        <div className={styles.Character}>
            <Accordion title={character.name} extraTitle={`Level ${character.level} ${character.characterClass}`} onDelete={handleDelete} children={children} />
        </div>
    )
}