import type { CharacterSheet } from '../../adapters/toCharacterSheet';
import styles from './CombatStats.module.css';

interface Props {
    sheet: CharacterSheet;
}

export default function CombatStats({ sheet }: Props) {
    const stats = [
        { label: 'Armor Class', value: sheet.ac, sub: sheet.armorName },
        { label: 'Initiative', value: sheet.initiative >= 0 ? `+${sheet.initiative}` : sheet.initiative },
        { label: 'Speed', value: `${sheet.speed} ft` },
        { label: 'Hit Points', value: sheet.hp, sub: sheet.hitDiceLabel },
        { label: 'Proficiency Bonus', value: `+${sheet.proficiencyBonus}` },
        { label: 'Passive Perception', value: sheet.passivePerception },
    ];

    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Combat</h2>
            <div className={styles.Grid}>
                {stats.map((s) => (
                    <div key={s.label} className={styles.Stat}>
                        <span className={styles.Value}>{s.value}</span>
                        <span className={styles.Label}>{s.label}</span>
                        {s.sub && <span className={styles.Sub}>{s.sub}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
