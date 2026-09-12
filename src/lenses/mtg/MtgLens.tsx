import { useMemo, useState } from 'react';
import { cv } from '../../data/cv';
import { toMtgCards } from '../../adapters/toMtgCards';
import type { MtgRarity } from '../../data/mtgMeta';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import FilterBar, { type FacetFilter } from './FilterBar';
import CardGallery from './CardGallery';
import CardDetail from './CardDetail';
import styles from './MtgLens.module.css';
import './mtgIsland.css';

const allCards = toMtgCards(cv);

export default function MtgLens() {
    useDocumentTitle('CV — MTG Card Set — Yaşar Anıl Sansak', 'Career and education presented as a set of Magic: The Gathering-style trading cards.');

    const [facet, setFacet] = useState<FacetFilter>('all');
    const [rarity, setRarity] = useState<MtgRarity | 'all'>('all');
    const [detailIndex, setDetailIndex] = useState<number | null>(null);

    const filteredCards = useMemo(() => {
        return allCards.filter((card) => {
            if (facet !== 'all' && card.facet !== facet) return false;
            if (rarity !== 'all' && card.rarity !== rarity) return false;
            return true;
        });
    }, [facet, rarity]);

    return (
        <div className={`${styles.MtgLens} mtgIsland`}>
            <header className={styles.Header}>
                <h1 className={styles.Title}>{cv.basics.name}: The Career</h1>
                <p className={styles.Subtitle}>A set of {allCards.length} cards — one legendary creature, six enchantments and creatures from the job market, three sorceries from academia. Tap "More info" on any card for the full text.</p>
            </header>

            <FilterBar
                facet={facet}
                onFacetChange={setFacet}
                rarity={rarity}
                onRarityChange={setRarity}
            />

            <CardGallery cards={filteredCards} onSelect={setDetailIndex} />

            <CardDetail
                cards={filteredCards}
                index={detailIndex}
                onClose={() => setDetailIndex(null)}
                onNavigate={setDetailIndex}
            />
        </div>
    );
}
