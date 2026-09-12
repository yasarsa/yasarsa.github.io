import { cv } from '../../data/cv';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.SiteFooter} data-site-footer>
            <div className={styles.Inner}>
                <div className={styles.Contact}>
                    <a href={`mailto:${cv.basics.email}`} className={styles.Link}>{cv.basics.email}</a>
                    {cv.basics.profiles.map((p) => (
                        <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.Link}>
                            {p.network}
                            <span className="visually-hidden"> (opens in a new tab)</span>
                        </a>
                    ))}
                    <a href="/cv.json" download className={styles.Link}>Download CV JSON</a>
                </div>
                <p className={styles.Meta}>
                    © {year} {cv.basics.name}. Ability names, skill names, and class names used under the 5e SRD 5.1 (CC BY 4.0).
                </p>
            </div>
        </footer>
    );
}
