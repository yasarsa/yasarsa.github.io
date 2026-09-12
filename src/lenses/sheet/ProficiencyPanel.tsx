import type { CharacterSheet } from '../../adapters/toCharacterSheet';
import styles from './ProficiencyPanel.module.css';

interface Props {
    sheet: CharacterSheet;
}

export default function ProficiencyPanel({ sheet }: Props) {
    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Proficiencies</h2>
            <dl className={styles.List}>
                <div className={styles.Row}>
                    <dt>Common Tongues</dt>
                    <dd>{sheet.commonTongues}</dd>
                </div>
                <div className={styles.Row}>
                    <dt>Exotic Tongues</dt>
                    <dd>{sheet.exoticTongues}</dd>
                </div>
                <div className={styles.Row}>
                    <dt>Tools</dt>
                    <dd>{sheet.toolProficiencies}</dd>
                </div>
                <div className={styles.Row}>
                    <dt>Armor</dt>
                    <dd>{sheet.armorName}</dd>
                </div>
            </dl>
        </div>
    );
}
