import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import D20 from '../../components/fx/D20';
import styles from './NotFound.module.css';

export default function NotFound() {
    useDocumentTitle('Page not found — Yaşar Anıl Sansak', 'The page you were looking for does not exist.');

    return (
        <div className={styles.NotFound}>
            <D20 className={styles.Die} face={1} strokeWidth={1.5} />
            <p className={styles.Code}>404 · Critical fail</p>
            <h1 className={styles.Title}>You rolled a 1.</h1>
            <p className={styles.Text}>This page doesn't exist — the route you followed has no destination.</p>
            <Link to="/" className={styles.Link}>← Return to the tavern</Link>
        </div>
    );
}
