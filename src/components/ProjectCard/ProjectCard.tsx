import { Link } from 'react-router-dom';
import type { Project } from '../../data/projects';
import TechTag from '../TechTag/TechTag';
import styles from './ProjectCard.module.css';

interface Props {
    project: Project;
}

const STATUS_LABEL: Record<Project['status'], string> = {
    active: 'Active',
    archived: 'Archived',
    todo: 'Coming soon',
};

export default function ProjectCard({ project }: Props) {
    const isInternal = project.kind === 'internal';
    const isTodo = project.status === 'todo';

    return (
        <article className={styles.ProjectCard} data-status={project.status}>
            <div className={styles.Art} style={{ background: project.art }} aria-hidden="true" />
            <div className={styles.Body}>
                <div className={styles.TitleRow}>
                    <h3 className={styles.Title}>
                        {isTodo ? (
                            project.title
                        ) : isInternal ? (
                            <Link to={project.href} className={styles.StretchedLink}>
                                {project.title}
                            </Link>
                        ) : (
                            <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.StretchedLink}>
                                {project.title}
                                <span className="visually-hidden"> (opens in a new tab)</span>
                            </a>
                        )}
                    </h3>
                    <span className={styles.Status}>{STATUS_LABEL[project.status]}</span>
                </div>

                <p className={styles.Blurb}>{project.blurb}</p>

                {project.tech.length > 0 && (
                    <div className={styles.Tech}>
                        {project.tech.map((id) => <TechTag key={id} id={id} />)}
                    </div>
                )}

                {!isTodo && (
                    <div className={styles.LinkRow}>
                        {isInternal ? 'Try it here →' : 'View on GitHub ↗'}
                    </div>
                )}
            </div>
        </article>
    );
}
