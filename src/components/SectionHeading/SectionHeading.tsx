import styles from './SectionHeading.module.css';

interface Props {
    index: number;
    id: string;
    children: string;
}

/** "01 / games", numbered like the options of a game menu. */
export default function SectionHeading({ index, id, children }: Props) {
    return (
        <h2 id={id} className={styles.SectionHeading}>
            <span className={styles.Index} aria-hidden="true">{String(index).padStart(2, '0')} /</span> {children}
        </h2>
    );
}
