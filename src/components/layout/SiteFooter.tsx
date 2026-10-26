import { cv } from '../../data/cv';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.SiteFooter} data-site-footer id="contact">
            <div className={styles.Inner}>
                <p className={styles.Lead}>
                    <span className={styles.Prompt} aria-hidden="true">&gt;</span> Want to build something, or talk about games?
                </p>
                <div className={styles.Contact}>
                    <a href={`mailto:${cv.basics.email}`} className={styles.Link}>{cv.basics.email}</a>
                    {cv.basics.profiles.map((p) => (
                        <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.Link}>
                            {p.network}
                            <span className="visually-hidden"> (opens in a new tab)</span>
                        </a>
                    ))}
                    <a href="/cv.json" download className={styles.Link}>cv.json</a>
                </div>
                <p className={styles.Meta}>
                    © {year} {cv.basics.name}.
                </p>
            </div>
        </footer>
    );
}
