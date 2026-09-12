import { PROJECTS } from '../../data/projects';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useReveal } from '../../hooks/useReveal';
import ProjectGrid from '../../components/ProjectGrid/ProjectGrid';
import styles from './ProjectsIndex.module.css';

export default function ProjectsIndex() {
    useDocumentTitle(
        'Projects — Yaşar Anıl Sansak',
        'A curated list of projects, including two playable apps built into this site.'
    );
    const revealRef = useReveal<HTMLDivElement>();

    return (
        <div className={styles.ProjectsIndex}>
            <header className={styles.Header} ref={revealRef} data-reveal>
                <h1>Projects</h1>
                <p>A few things I've built. The first two are playable right here — no screenshots needed.</p>
            </header>
            <ProjectGrid projects={PROJECTS} />
        </div>
    );
}
