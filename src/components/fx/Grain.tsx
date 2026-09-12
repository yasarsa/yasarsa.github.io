import styles from './Grain.module.css';

/** Full-screen film grain. Pure CSS + an inline SVG noise tile. */
export default function Grain() {
    return <div className={styles.Grain} aria-hidden="true" />;
}
