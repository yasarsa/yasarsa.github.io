import { Link } from 'react-router-dom';
import { cv } from '../../data/cv';
import type { CharacterSheet } from '../../adapters/toCharacterSheet';
import type { EntryKey } from '../../data/cv.types';
import styles from './EntryList.module.css';

interface Props {
    sheet: CharacterSheet;
}

function unlockedByLabel(key: EntryKey): string {
    if (key === 'person') return 'Yaşar Anıl Sansak';
    const [kind, id] = key.split(':');
    if (kind === 'work') return cv.work.find((w) => w.id === id)?.title ?? key;
    return cv.education.find((e) => e.id === id)?.area ?? key;
}

export default function FeatsPanel({ sheet }: Props) {
    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Feats</h2>
            <ul className={`sheetList ${styles.List}`}>
                {sheet.feats.map((f) => (
                    <li key={f.name} className={styles.Entry}>
                        <div className={styles.EntryHead}>
                            <span>{f.name}</span>
                            <Link to="/cv/mtg" className={styles.EntryMeta}>
                                unlocked by {unlockedByLabel(f.unlockedBy)} →
                            </Link>
                        </div>
                        <p className={styles.EntryBody}>{f.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
