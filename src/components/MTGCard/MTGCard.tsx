import type { MtgCard } from "../../adapters/toMtgCards";
import styles from "./MTGCard.module.css";

interface Props {
    card: MtgCard;
    onMoreInfo?: () => void;
}

export default function MTGCard({ card, onMoreInfo }: Props) {
    const { name, typeLine, footerLine, summary, techLine, art, power, toughness, rarity } = card;
    const tags = techLine ? techLine.split(' • ').slice(0, 3) : [];

    return (
        <div className={styles.MTGCard} data-rarity={rarity}>
            <div className={styles.CardContainer}>
                <div className={styles.CardHeader}>
                    <h3 className={styles.Name}>{name}</h3>
                </div>

                <div className={styles.ImageContainer}>
                    {art.kind === "gradient" ? (
                        <div className={styles.Image} style={{ background: art.value }} />
                    ) : (
                        <img src={art.src} alt={art.alt} className={styles.Image} loading="lazy" />
                    )}
                </div>

                <div className={styles.TypeLine}>
                    <div className={styles.Type}>{typeLine}</div>
                </div>

                <div className={styles.TextBox}>
                    {summary && <p className={styles.Summary}>{summary}</p>}

                    {tags.length > 0 && (
                        <ul className={styles.TagRow}>
                            {tags.map((tag) => (
                                <li key={tag} className={styles.Tag}>{tag}</li>
                            ))}
                        </ul>
                    )}

                    <div className={styles.Footer}>
                        <span className={styles.Description}>{footerLine}</span>
                        {onMoreInfo && (
                            <button type="button" className={styles.MoreInfo} onClick={onMoreInfo}>
                                More info <span aria-hidden="true">→</span>
                            </button>
                        )}
                    </div>
                </div>

                {(power !== undefined || toughness !== undefined) && (
                    <div className={styles.PowerToughness}>
                        {power}/{toughness}
                    </div>
                )}
            </div>
        </div>
    )
}
