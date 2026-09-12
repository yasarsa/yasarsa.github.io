import type { Project } from '../../data/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectGrid.module.css';

interface Props {
    projects: Project[];
}

export default function ProjectGrid({ projects }: Props) {
    return (
        <div className={styles.ProjectGrid}>
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
    );
}
