import type { MtgCard } from '../../adapters/toMtgCards';
import MTGCard from '../../components/MTGCard/MTGCard';
import styles from './CardGallery.module.css';

interface Props {
    cards: MtgCard[];
    onSelect: (index: number) => void;
}

export default function CardGallery({ cards, onSelect }: Props) {
    if (cards.length === 0) {
        return <p className={styles.Empty}>No cards match the current filters.</p>;
    }

    return (
        <ul className={styles.CardGallery}>
            {cards.map((card, index) => (
                <li key={card.key} className={styles.Item}>
                    <MTGCard card={card} onMoreInfo={() => onSelect(index)} />
                </li>
            ))}
        </ul>
    );
}
