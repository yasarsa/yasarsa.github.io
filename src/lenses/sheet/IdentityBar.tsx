import type { CharacterSheet } from '../../adapters/toCharacterSheet';
import styles from './IdentityBar.module.css';

interface Props {
    sheet: CharacterSheet;
}

export default function IdentityBar({ sheet }: Props) {
    const classLine = sheet.classes.map((c) => `${c.name} (${c.subclass}) ${c.level}`).join(' / ');

    return (
        <div className={`sheetPanel ${styles.IdentityBar}`}>
            <div>
                <h1 className={styles.Name}>{sheet.name}</h1>
                <p className={styles.ClassLine}>{classLine} — Level {sheet.level}</p>
                <p className={styles.SubLine}>Human (Anatolian) · Guild Artisan · Lawful Good</p>
            </div>
            <div className={styles.XpWrap}>
                <span className={styles.XpLabel}>Progress to next level</span>
                <div className={styles.XpBar}>
                    <div className={styles.XpFill} style={{ width: `${Math.round(sheet.xpProgress * 100)}%` }} />
                </div>
            </div>
        </div>
    );
}
