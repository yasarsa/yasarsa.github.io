import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './ExternalLink.module.css';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
}

export default function ExternalLink({ children, className, ...rest }: Props) {
    return (
        <a {...rest} target="_blank" rel="noopener noreferrer" className={`${styles.ExternalLink} ${className ?? ''}`}>
            {children}
            <span aria-hidden="true" className={styles.Arrow}>↗</span>
            <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
    );
}
