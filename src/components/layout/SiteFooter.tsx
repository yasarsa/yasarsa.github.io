import { Link } from 'react-router-dom';
import { cv } from '../../data/cv';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.SiteFooter} data-site-footer>
            <div className={styles.Inner}>
                <p className={styles.Sig}>
                    <span className={styles.Mono}>YAS✦</span> © {year} {cv.basics.name}
                </p>
                <nav className={styles.Links} aria-label="Footer">
                    <a href={`mailto:${cv.basics.email}`}>Email</a>
                    {cv.basics.profiles.map((p) => (
                        <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer">
                            {p.network}
                            <span className="visually-hidden"> (opens in a new tab)</span>
                        </a>
                    ))}
                    <Link to="/cv">Full CV</Link>
                    <a href="/cv.json" download>CV JSON</a>
                </nav>
                <p className={styles.Meta}>
                    Built with React &amp; GSAP. Ability, skill and class names used under the 5e SRD 5.1 (CC BY 4.0).
                    Warhammer 40,000 and Magic: The Gathering are trademarks of their respective owners — this is a
                    fan tribute, not an affiliated product.
                </p>
            </div>
        </footer>
    );
}
