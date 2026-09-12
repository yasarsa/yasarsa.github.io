import type { CharacterSheet } from '../../adapters/toCharacterSheet';
import styles from './Backstory.module.css';

interface Props {
    sheet: CharacterSheet;
}

export default function Backstory({ sheet }: Props) {
    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Backstory</h2>
            <p className={styles.Text}>{sheet.backstory}</p>
        </div>
    );
}
