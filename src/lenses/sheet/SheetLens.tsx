import { cv } from '../../data/cv';
import { toCharacterSheet } from '../../adapters/toCharacterSheet';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import IdentityBar from './IdentityBar';
import AbilityBlock from './AbilityBlock';
import SavingThrows from './SavingThrows';
import SkillList from './SkillList';
import CombatStats from './CombatStats';
import ProficiencyPanel from './ProficiencyPanel';
import FeaturesPanel from './FeaturesPanel';
import FeatsPanel from './FeatsPanel';
import InventoryPanel from './InventoryPanel';
import ActionsPanel from './ActionsPanel';
import Backstory from './Backstory';
import styles from './SheetLens.module.css';
import './sheetIsland.css';

const sheet = toCharacterSheet(cv);

export default function SheetLens() {
    useDocumentTitle('CV — Character Sheet — Yaşar Anıl Sansak', 'Career and education translated into a full D&D 5e character sheet.');

    return (
        <div className={`${styles.SheetLens} sheetIsland`}>
            <header className={styles.Header}>
                <h1 className={styles.Title}>Character Sheet</h1>
                <p className={styles.Subtitle}>Every number below is derived from the CV — class levels from years worked, saving throws from career track, skills from evidence in the job history. Only the six ability scores are hand-authored; expand "why" on each to see the reasoning.</p>
            </header>

            <div className={styles.Grid}>
                <div style={{ gridArea: 'identity' }}>
                    <IdentityBar sheet={sheet} />
                </div>
                <div style={{ gridArea: 'abilities' }} className="stack">
                    <div className={styles.AbilityGrid}>
                        {sheet.abilities.map((a) => <AbilityBlock key={a.ability} data={a} />)}
                    </div>
                    <div style={{ marginTop: 'var(--space-4)' }}>
                        <SavingThrows saves={sheet.savingThrows} />
                    </div>
                </div>
                <div style={{ gridArea: 'combat' }}>
                    <CombatStats sheet={sheet} />
                </div>
                <div style={{ gridArea: 'skills' }}>
                    <SkillList skills={sheet.skills} />
                </div>
                <div style={{ gridArea: 'prof' }}>
                    <ProficiencyPanel sheet={sheet} />
                </div>
                <div style={{ gridArea: 'features' }}>
                    <FeaturesPanel sheet={sheet} />
                </div>
                <div style={{ gridArea: 'feats' }}>
                    <FeatsPanel sheet={sheet} />
                </div>
                <div style={{ gridArea: 'inventory' }}>
                    <InventoryPanel sheet={sheet} />
                </div>
                <div style={{ gridArea: 'actions' }}>
                    <ActionsPanel sheet={sheet} />
                </div>
                <div style={{ gridArea: 'backstory' }}>
                    <Backstory sheet={sheet} />
                </div>
            </div>
        </div>
    );
}
