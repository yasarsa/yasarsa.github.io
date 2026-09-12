import type { SavingThrowData } from '../../adapters/toCharacterSheet';
import styles from './SavingThrows.module.css';

interface Props {
    saves: SavingThrowData[];
}

export default function SavingThrows({ saves }: Props) {
    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Saving Throws</h2>
            <ul className={`sheetList ${styles.List}`}>
                {saves.map((s) => (
                    <li key={s.ability} className={styles.Row}>
                        <span className={styles.Dot} data-filled={s.proficient} aria-hidden="true" />
                        <span className={styles.Ability}>{s.ability}</span>
                        <span className={styles.Mod}>{s.modifier >= 0 ? `+${s.modifier}` : s.modifier}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
