import { PROJECTS } from '../../data/projects';
import { GAMES } from '../../data/games';
import { techLabel } from '../../data/tech';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import MenuList, { type MenuItem } from '../../components/MenuList/MenuList';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import styles from './ProjectsIndex.module.css';

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

export default function ProjectsIndex() {
    useDocumentTitle(
        'Projects | Yaşar Anıl Sansak',
        'Games in development and other things I have built.'
    );

    return (
        <div className={styles.ProjectsIndex}>
            <header className={styles.Header}>
                <p className="label">Select a project</p>
                <h1 className={styles.Title}>projects<span className="cursor" aria-hidden="true" /></h1>
            </header>

            <section aria-labelledby="games">
                <SectionHeading index={1} id="games">games</SectionHeading>
                {gameItems.length ? <MenuList items={gameItems} /> : <p className={styles.Muted}>Nothing announced yet.</p>}
            </section>

            <section aria-labelledby="software">
                <SectionHeading index={2} id="software">software</SectionHeading>
                <MenuList items={projectItems} />
            </section>
        </div>
    );
}
