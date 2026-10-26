import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import Keycap from '../../components/Keycap/Keycap';
import styles from './NotFound.module.css';

export default function NotFound() {
    useDocumentTitle('Page not found | Yaşar Anıl Sansak', 'The page you were looking for does not exist.');

    return (
        <div className={styles.NotFound}>
            <p className="label">Error 404</p>
            <h1 className={styles.Title}>game over<span className="cursor" aria-hidden="true" /></h1>
            <p className={styles.Text}>This level doesn't exist. The route you followed has no destination.</p>
            <Keycap keyLabel="↵" href="/" primary>Continue</Keycap>
        </div>
    );
}
