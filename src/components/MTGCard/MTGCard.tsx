import styles from "./MTGCard.module.css";

export default function MTGCard() {
    return (
        <div className={styles.MTGCard}>
            <div className={styles.CardContainer}>
                <div className={styles.Title}>
                    <p>Card Title</p>
                </div>
                <div className={styles.Image}>
                    <p>Image</p>
                </div>
                <div className={styles.Type}>
                    <p>Type</p>
                </div>
                <div className={styles.TextBox}>
                    <p>Text Box</p>
                </div>
                <div className={styles.PowerToughness}>
                    <p>Power/Toughness</p>
                </div>
            </div>
        </div>
    )
}