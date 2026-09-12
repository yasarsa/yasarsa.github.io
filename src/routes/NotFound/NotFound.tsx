import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './NotFound.module.css';

export default function NotFound() {
    useDocumentTitle('Page not found — Yaşar Anıl Sansak', 'The page you were looking for does not exist.');

    return (
        <div className={styles.NotFound}>
            <p className={styles.Code}>404</p>
            <h1>This page doesn't exist.</h1>
            <p>The route you followed has no destination.</p>
            <Link to="/" className={styles.Link}>← Back to the homepage</Link>
        </div>
    );
}
