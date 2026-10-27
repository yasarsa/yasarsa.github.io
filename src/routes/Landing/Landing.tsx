import { cv } from '../../data/cv';
import { PROJECTS } from '../../data/projects';
import { GAMES } from '../../data/games';
import { techLabel } from '../../data/tech';
import type { TechId } from '../../data/cv.types';
import { monthsBetween } from '../../adapters/dates';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useReveal } from '../../hooks/useReveal';
import JsonLd from '../../components/JsonLd/JsonLd';
import Keycap from '../../components/Keycap/Keycap';
import MenuList, { type MenuItem } from '../../components/MenuList/MenuList';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const years = Math.floor(monthsBetween(cv.careerStart) / 12);

const github = cv.basics.profiles.find((p) => p.network === 'GitHub');
const linkedin = cv.basics.profiles.find((p) => p.network === 'LinkedIn');

const gameItems: MenuItem[] = GAMES.map((g) => ({
    id: g.id,
    title: g.title,
    description: g.blurb,
    meta: [g.engine, g.platforms.join(' / '), g.year].filter(Boolean).join(' · '),
    href: g.href,
}));

const projectItems: MenuItem[] = PROJECTS.filter((p) => p.status !== 'todo').map((p) => ({
    id: p.id,
    title: p.title,
    description: p.blurb,
    meta: [p.tech.map(techLabel).join(' · '), p.year].filter(Boolean).join(' · '),
    href: p.href,
}));

const yearOf = (ym: string | null) => (ym ? ym.slice(0, 4) : 'now');
const experienceItems: MenuItem[] = cv.work.map((w) => ({
    id: w.id,
    title: w.title,
    description: w.team ? `${w.company} · ${w.team}` : w.company,
    meta: yearOf(w.startDate) === yearOf(w.endDate) ? yearOf(w.startDate) : `${yearOf(w.startDate)} – ${yearOf(w.endDate)}`,
}));

// Curated, in display order.
const STACK: TechId[] = [
    'javascript', 'typescript', 'react', 'css', 'html', 'aws', 'nodejs',
    'git', 'figma', 'dotnet', 'csharp', 'python', 'godot', 'gdscript',
];
const stack = STACK.map(techLabel);

export default function Landing() {
    useDocumentTitle(
        'Yaşar Anıl Sansak | Software Architect & Game Developer',
        'Software Architect & Team Lead at Vestel. Front-end engineer by day, Godot game developer by night.',
    );
    const gamesRef = useReveal<HTMLElement>();
    const projectsRef = useReveal<HTMLElement>();
    const experienceRef = useReveal<HTMLElement>();
    const stackRef = useReveal<HTMLElement>();

    return (
        <div className={styles.Landing}>
            <JsonLd />

            <section className={styles.Hero} aria-labelledby="hero-title">
                <p className="label">İZMİR, TR</p>
                <h1 id="hero-title" className={styles.Name}>
                    {cv.basics.name.toLocaleLowerCase('tr')}
                    <span className="cursor" aria-hidden="true" />
                </h1>
                <p className={styles.Role}>
                    Software Architect · Team Lead @ {cv.work[0]?.company}
                </p>
                <p className={styles.Intro}>
                    I build interfaces for a living and games for fun. {years}+ years of front-end engineering
                    (React, TypeScript, AWS) and a growing shelf of mobile games made with Godot.
                </p>

                <div className={styles.Actions}>
                    <Keycap keyLabel="↵" href={`mailto:${cv.basics.email}`} primary>Email</Keycap>
                    {github && (
                        <Keycap keyLabel="G" href={github.url} target="_blank" rel="noopener noreferrer">
                            GitHub<span className="visually-hidden"> (opens in a new tab)</span>
                        </Keycap>
                    )}
                    {linkedin && (
                        <Keycap keyLabel="L" href={linkedin.url} target="_blank" rel="noopener noreferrer">
                            LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
                        </Keycap>
                    )}
                </div>
            </section>

            <section ref={experienceRef} data-reveal className={styles.Section} aria-labelledby="experience">
                <SectionHeading index={1} id="experience">experience</SectionHeading>
                <MenuList items={experienceItems} />
                <p className={styles.After}>
                    <Link to="/cv" className={styles.TextLink}>Full CV →</Link>
                </p>
            </section>

            <section ref={gamesRef} data-reveal className={styles.Section} aria-labelledby="games">
                <SectionHeading index={2} id="games">games</SectionHeading>
                {gameItems.length ? <MenuList items={gameItems} /> : <p className={styles.Muted}>Nothing announced yet.</p>}
            </section>

            <section ref={projectsRef} data-reveal className={styles.Section} aria-labelledby="projects">
                <SectionHeading index={3} id="projects">projects</SectionHeading>
                <MenuList items={projectItems} />
            </section>

            <section ref={stackRef} data-reveal className={styles.Section} aria-labelledby="stack">
                <SectionHeading index={4} id="stack">stack</SectionHeading>
                <ul className={styles.Stack}>
                    {stack.map((t) => <li key={t}>{t}</li>)}
                </ul>
            </section>
        </div>
    );
}
