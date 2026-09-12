import type { CharacterSheet } from '../../adapters/toCharacterSheet';
import styles from './EntryList.module.css';

interface Props {
    sheet: CharacterSheet;
}

export default function FeaturesPanel({ sheet }: Props) {
    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Class Features</h2>
            <ul className={`sheetList ${styles.List}`}>
                {sheet.features.map((f) => (
                    <li key={f.name} className={styles.Entry}>
                        <div className={styles.EntryHead}>
                            <span>{f.name}</span>
                            <span className={styles.EntryMeta}>Level {f.level}</span>
                        </div>
                        <p className={styles.EntryBody}>{f.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
