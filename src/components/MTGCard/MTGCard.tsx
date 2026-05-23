import yasarImg from "../../assets/yasar_anil_sansak.png";
import styles from "./MTGCard.module.css";

interface Props {
    name: string;
    manaCost?: string;
    image: string;
    type: string;
    skills: string[];
    description: string;
    flavorText?: string;
    power?: string;
    toughness?: string;
    /** CSS gradient string to use as card art instead of image */
    gradient?: string;
}

export default function MTGCard({
    name,
    manaCost,
    image,
    type,
    skills,
    description,
    flavorText,
    power,
    toughness,
    gradient,
}: Props) {
    return (
        <div className={styles.MTGCard}>
            <div className={styles.CardContainer}>
                <div className={styles.CardHeader}>
                    <h1 className={styles.Name}>{name}</h1>
                    {manaCost && <div className={styles.ManaCost}>{manaCost}</div>}
                </div>

                <div className={styles.ImageContainer}>
                    {gradient ? (
                        <div className={styles.Image} style={{ background: gradient }} />
                    ) : name === "Yaşar Anıl Sansak" ? (
                        <img src={yasarImg} alt={name} className={styles.Image} />
                    ) : (
                        <img src={image} alt={name} className={styles.Image} />
                    )}
                </div>

                <div className={styles.TypeLine}>
                    <div className={styles.Type}>{type}</div>
                </div>

                <div className={styles.TextBox}>
                    {skills.map((skill, index) => (
                        <div key={index} className={styles.SkillContainer}>
                            <div className={styles.SkillSymbol}>•</div>
                            <div className={styles.Skill}>{skill}</div>
                        </div>
                    ))}

                    <div className={styles.Description}>{description}</div>

                    {flavorText && (
                        <div className={styles.FlavorText}>
                            <i>{flavorText}</i>
                        </div>
                    )}
                </div>

                {(power || toughness) && (
                    <div className={styles.PowerToughness}>
                        {power}/{toughness}
                    </div>
                )}
            </div>
        </div>
    )
}