import { cv } from '../../data/cv';
import { PROJECTS } from '../../data/projects';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useReveal } from '../../hooks/useReveal';
import Picture from '../../components/Picture/Picture';
import LensTile from '../../components/LensTile/LensTile';
import ProjectGrid from '../../components/ProjectGrid/ProjectGrid';
import JsonLd from '../../components/JsonLd/JsonLd';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const LENSES = [
    { to: '/cv/mtg', icon: '🃏', title: 'MTG Card Set', description: 'Career and education as a set of Magic-style trading cards.', accent: '#2c5f9e' },
    { to: '/cv/sheet', icon: '📜', title: 'Character Sheet', description: 'The same CV, translated into a full D&D 5e character sheet.', accent: '#7a2b1e' },
    { to: '/cv/json', icon: '{ }', title: 'JSON Resume', description: 'The raw, machine-readable data — copy, download, or fetch /cv.json.', accent: '#4a7fc1' },
];

export default function Landing() {
    useDocumentTitle(
        'Yaşar Anıl Sansak — Software Architect & Team Lead',
        cv.basics.summary
    );
    const revealRef1 = useReveal<HTMLDivElement>();
    const revealRef2 = useReveal<HTMLDivElement>();
    const featured = PROJECTS.filter((p) => p.featured);

    return (
        <div className={styles.Landing}>
            <JsonLd />
            <section className={styles.Hero}>
                <div className={styles.HeroText}>
                    <p className={styles.Eyebrow}>{cv.basics.label}</p>
                    <h1 className={styles.Name}>{cv.basics.name}</h1>
                    <p className={styles.Summary}>{cv.basics.summary}</p>
                    <div className={styles.HeroActions}>
                        <a href={`mailto:${cv.basics.email}`} className={styles.PrimaryAction}>Get in touch</a>
                        {cv.basics.profiles.map((p) => (
                            <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.SecondaryAction}>
                                {p.network}
                                <span className="visually-hidden"> (opens in a new tab)</span>
                            </a>
                        ))}
                    </div>
                </div>
                <div className={styles.HeroPortrait}>
                    <Picture
                        srcBase="/portrait/yasar-anil-sansak"
                        widths={[400, 800]}
                        alt={cv.basics.name}
                        width={400}
                        height={400}
                        sizes="(min-width: 768px) 320px, 60vw"
                        priority
                        className={styles.PortraitImg}
                    />
                </div>
            </section>

            <section className={styles.Section} ref={revealRef1} data-reveal>
                <h2 className={styles.SectionTitle}>Three lenses, one CV</h2>
                <p className={styles.SectionLede}>The same career data, reshaped by three different adapters.</p>
                <div className={styles.LensGrid}>
                    {LENSES.map((lens) => <LensTile key={lens.to} {...lens} />)}
                </div>
            </section>

            <section className={styles.Section} ref={revealRef2} data-reveal>
                <div className={styles.SectionHeader}>
                    <div>
                        <h2 className={styles.SectionTitle}>Projects</h2>
                        <p className={styles.SectionLede}>A few things I've built — two of them playable right here.</p>
                    </div>
                    <Link to="/projects" className={styles.ViewAll}>View all projects →</Link>
                </div>
                <ProjectGrid projects={featured} />
            </section>
        </div>
    );
}
