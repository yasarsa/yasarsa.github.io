import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Keycap.module.css';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    /** The glyph printed on the key, e.g. "↵" or "G". */
    keyLabel: string;
    href: string;
    children: ReactNode;
    primary?: boolean;
}

/** A link that looks like a keyboard key plus its action: [↵] Email. */
export default function Keycap({ keyLabel, href, children, primary, className, ...rest }: Props) {
    const cls = `${styles.Keycap} ${primary ? styles.Primary : ''} ${className ?? ''}`;
    const content = (
        <>
            <kbd className={styles.Key} aria-hidden="true">{keyLabel}</kbd>
            <span>{children}</span>
        </>
    );
    if (href.startsWith('/') && !href.startsWith('//')) {
        return <Link to={href} className={cls} {...rest}>{content}</Link>;
    }
    return <a href={href} className={cls} {...rest}>{content}</a>;
}
