import yasarImg from "../../assets/yasar_anil_sansak.jpg";
import styles from "./MTGCard.module.css";

interface Props {
    name: string;
    manaCost?: string; // Your experience years could be represented as mana cost
    image: string;
    type: string; // Like "Legendary Professional - Software Engineer"
    skills: string[]; // Array of skills/abilities
    description: string;
    flavorText?: string; // A quote or motto
    power?: string; // Could represent years of experience
    toughness?: string; // Could represent number of completed projects
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
    toughness
}: Props) {
    return (
        <div className={styles.MTGCard}>
            <div className={styles.CardContainer}>
                <div className={styles.CardHeader}>
                    <h1 className={styles.Name}>{name}</h1>
                    {manaCost && <div className={styles.ManaCost}>{manaCost}</div>}
                </div>

                <div className={styles.ImageContainer}>
                    {name === "Yaşar Anıl Sansak" ? (
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