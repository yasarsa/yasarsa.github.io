import type { CharacterSheet } from '../../adapters/toCharacterSheet';
import styles from './EntryList.module.css';

interface Props {
    sheet: CharacterSheet;
}

export default function InventoryPanel({ sheet }: Props) {
    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Inventory</h2>
            <ul className={`sheetList ${styles.List}`}>
                {sheet.inventory.map((item) => (
                    <li key={item.name} className={styles.Entry}>
                        <div className={styles.EntryHead}>
                            <span>{item.name}</span>
                        </div>
                        <p className={styles.EntryBody}>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
