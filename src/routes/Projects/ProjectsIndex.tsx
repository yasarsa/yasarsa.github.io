import { PROJECTS } from '../../data/projects';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ProjectGrid from '../../components/ProjectGrid/ProjectGrid';
import SplitReveal from '../../components/fx/SplitReveal';
import styles from './ProjectsIndex.module.css';

export default function ProjectsIndex() {
    useDocumentTitle(
        'Projects — Yaşar Anıl Sansak',
        'A curated list of projects, including two playable apps built into this site.'
    );

    return (
        <div className={styles.ProjectsIndex}>
            <header className={styles.Header}>
                <p className="eyebrow">(Selected works — {PROJECTS.filter((p) => p.status !== 'todo').length} shipped)</p>
                <SplitReveal as="h1" className={styles.Title} by="chars" start="top 95%">
                    Projects
                </SplitReveal>
                <p className={styles.Lede}>A few things I've built. The first two are playable right here — no screenshots needed.</p>
            </header>
            <ProjectGrid projects={PROJECTS} />
        </div>
    );
}
