import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuList.module.css';

export interface MenuItem {
    id: string;
    title: ReactNode;
    description?: ReactNode;
    /** Right-aligned metadata, e.g. a year or "2022 – now". */
    meta?: ReactNode;
    /** Internal paths use the router; anything else opens in a new tab. */
    href?: string;
}

interface Props {
    items: MenuItem[];
    label?: string;
}

/**
 * A list styled like a game menu: the hovered or focused row gets a ▸
 * cursor. Rows with an href are links; rows without one are plain text.
 */
export default function MenuList({ items, label }: Props) {
    return (
        <ul className={styles.MenuList} aria-label={label}>
            {items.map((item) => {
                const body = (
                    <>
                        <span className={styles.Cursor} aria-hidden="true">▸</span>
                        <span className={styles.Main}>
                            <span className={styles.Title}>{item.title}</span>
                            {item.description && <span className={styles.Description}>{item.description}</span>}
                        </span>
                        {item.meta && <span className={styles.Meta}>{item.meta}</span>}
                    </>
                );
                const internal = item.href?.startsWith('/') && !item.href.startsWith('//');
                return (
                    <li key={item.id}>
                        {!item.href ? (
                            <div className={styles.Row}>{body}</div>
                        ) : internal ? (
                            <Link to={item.href} className={`${styles.Row} ${styles.Interactive}`}>{body}</Link>
                        ) : (
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${styles.Row} ${styles.Interactive}`}>
                                {body}
                                <span className="visually-hidden"> (opens in a new tab)</span>
                            </a>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
