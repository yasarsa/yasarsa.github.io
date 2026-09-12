import { Link } from 'react-router-dom';
import styles from './LensTile.module.css';

interface Props {
    to: string;
    icon: string;
    title: string;
    description: string;
    accent: string;
}

export default function LensTile({ to, icon, title, description, accent }: Props) {
    return (
        <Link
            to={to}
            viewTransition
            className={styles.LensTile}
            style={{ '--tile-accent': accent } as React.CSSProperties}
        >
            <span className={styles.Icon} aria-hidden="true">{icon}</span>
            <span className={styles.Title}>{title}</span>
            <span className={styles.Description}>{description}</span>
        </Link>
    );
}
