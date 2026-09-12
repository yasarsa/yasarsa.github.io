import { Link } from 'react-router-dom';
import styles from './BackToSite.module.css';

export default function BackToSite() {
    return (
        <Link to="/" className={styles.BackToSite}>
            <span aria-hidden="true">←</span> yasarsa.github.io
        </Link>
    );
}
