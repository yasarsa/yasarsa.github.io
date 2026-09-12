import type { AbilityBlockData } from '../../adapters/toCharacterSheet';
import styles from './AbilityBlock.module.css';

interface Props {
    data: AbilityBlockData;
}

export default function AbilityBlock({ data }: Props) {
    const modLabel = data.modifier >= 0 ? `+${data.modifier}` : `${data.modifier}`;
    const labelId = `ability-${data.ability}`;

    return (
        <div className={`sheetAbility ${styles.AbilityBlock}`} role="group" aria-labelledby={labelId}>
            <span id={labelId} className={styles.Label}>{data.ability}</span>
            <span className={styles.Score}>{data.score}</span>
            <span className={styles.Mod} aria-hidden="true">{modLabel}</span>
            <span className="visually-hidden">score {data.score}, modifier {data.modifier >= 0 ? 'plus' : 'minus'} {Math.abs(data.modifier)}</span>
            <details className={styles.Rationale}>
                <summary>why</summary>
                <p>{data.rationale}</p>
            </details>
        </div>
    );
}
