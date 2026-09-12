import { useEffect, useRef } from 'react';
import type { MtgCard } from '../../adapters/toMtgCards';
import MTGCard from '../../components/MTGCard/MTGCard';
import styles from './CardDetail.module.css';

interface Props {
    cards: MtgCard[];
    index: number | null;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function CardDetail({ cards, index, onClose, onNavigate }: Props) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (index !== null && !dialog.open) {
            dialog.showModal();
        } else if (index === null && dialog.open) {
            dialog.close();
        }
    }, [index]);

    if (index === null) {
        return <dialog ref={dialogRef} className={styles.Dialog} onClose={onClose} />;
    }

    const card = cards[index];
    const prevIndex = (index - 1 + cards.length) % cards.length;
    const nextIndex = (index + 1) % cards.length;

    const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
        if (e.key === 'ArrowLeft') onNavigate(prevIndex);
        else if (e.key === 'ArrowRight') onNavigate(nextIndex);
    };

    return (
        <dialog
            ref={dialogRef}
            className={styles.Dialog}
            onClose={onClose}
            onKeyDown={onKeyDown}
            aria-label={`${card.name} — card detail`}
        >
            <button type="button" className={styles.CloseButton} onClick={onClose} aria-label="Close card detail">✕</button>
            <div className={styles.Content}>
                <div className={styles.CardPane}>
                    <MTGCard card={card} />
                </div>
                <div className={styles.InfoPane}>
                    <h2 className={styles.InfoTitle}>{card.name}</h2>
                    <p className={styles.InfoType}>{card.typeLine}</p>
                    <p className={styles.InfoFooter}>{card.footerLine}</p>

                    {card.rulesText.length > 0 && (
                        <ul className={styles.RulesList}>
                            {card.rulesText.map((line, i) => (
                                <li key={i}>{line}</li>
                            ))}
                        </ul>
                    )}

                    {card.techLine && (
                        <p className={styles.TechLine}>{card.techLine}</p>
                    )}

                    {card.flavorText && (
                        <p className={styles.FlavorText}><i>{card.flavorText}</i></p>
                    )}
                </div>
            </div>
            <div className={styles.NavRow}>
                <button type="button" onClick={() => onNavigate(prevIndex)} className={styles.NavButton} aria-label="Previous card">‹ Previous</button>
                <span className={styles.NavCounter}>{index + 1} / {cards.length}</span>
                <button type="button" onClick={() => onNavigate(nextIndex)} className={styles.NavButton} aria-label="Next card">Next ›</button>
            </div>
        </dialog>
    );
}
