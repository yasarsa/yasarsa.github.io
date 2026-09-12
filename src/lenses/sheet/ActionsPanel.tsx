import type { CharacterSheet } from '../../adapters/toCharacterSheet';
import styles from './EntryList.module.css';

interface Props {
    sheet: CharacterSheet;
}

export default function ActionsPanel({ sheet }: Props) {
    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Actions</h2>
            <ul className={`sheetList ${styles.List}`}>
                {sheet.actions.map((action) => (
                    <li key={action.name} className={styles.Entry}>
                        <div className={styles.EntryHead}>
                            <span>{action.name}</span>
                            <span className={styles.EntryMeta}>{action.kind}</span>
                        </div>
                        <p className={styles.EntryBody}>{action.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
