import type { MtgCard } from '../../adapters/toMtgCards';
import type { MtgRarity } from '../../data/mtgMeta';
import styles from './FilterBar.module.css';

export type FacetFilter = 'all' | MtgCard['facet'];

interface Props {
    facet: FacetFilter;
    onFacetChange: (facet: FacetFilter) => void;
    rarity: MtgRarity | 'all';
    onRarityChange: (rarity: MtgRarity | 'all') => void;
}

const FACETS: { value: FacetFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'experience', label: 'Experience' },
    { value: 'education', label: 'Education' },
];

const RARITIES: { value: MtgRarity | 'all'; label: string }[] = [
    { value: 'all', label: 'Any rarity' },
    { value: 'common', label: 'Common' },
    { value: 'uncommon', label: 'Uncommon' },
    { value: 'rare', label: 'Rare' },
    { value: 'mythic', label: 'Mythic' },
];

export default function FilterBar({ facet, onFacetChange, rarity, onRarityChange }: Props) {
    return (
        <div className={styles.FilterBar} role="group" aria-label="Filter cards">
            <div className={styles.Group}>
                {FACETS.map((f) => (
                    <button
                        key={f.value}
                        type="button"
                        className={`${styles.Chip} ${facet === f.value ? styles.ChipActive : ''}`}
                        aria-pressed={facet === f.value}
                        onClick={() => onFacetChange(f.value)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <select
                className={styles.Select}
                value={rarity}
                onChange={(e) => onRarityChange(e.target.value as MtgRarity | 'all')}
                aria-label="Filter by rarity"
            >
                {RARITIES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                ))}
            </select>
        </div>
    );
}
