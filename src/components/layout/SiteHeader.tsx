import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { jumpTo } from './jumpTo';
import styles from './SiteHeader.module.css';

const NAV_LINKS = [
    { to: '/projects', label: 'projects' },
    { to: '/cv', label: 'cv' },
];

// The footer (id="contact") is on every page.
function ContactLink({ onClick }: { onClick?: () => void }) {
    return (
        <a href="#contact" className={styles.NavLink} onClick={jumpTo('contact', onClick)}>
            <span className={styles.Cursor} aria-hidden="true">▸</span>
            contact
        </a>
    );
}

export default function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname, hash } = useLocation();
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => setMenuOpen(false), [pathname, hash]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            setMenuOpen(false);
            menuButtonRef.current?.focus();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [menuOpen]);

    const linkClass = ({ isActive }: { isActive: boolean }) => `${styles.NavLink} ${isActive ? styles.NavLinkActive : ''}`;

    return (
        <header className={styles.SiteHeader} data-site-header>
            <div className={styles.Inner}>
                <NavLink to="/" className={styles.Brand}>
                    <span className={styles.Prompt} aria-hidden="true">~/</span>yasar
                    <span className="visually-hidden">, home</span>
                </NavLink>

                <nav className={styles.DesktopNav} aria-label="Site">
                    {NAV_LINKS.map((link) => (
                        <NavLink key={link.to} to={link.to} className={linkClass}>
                            <span className={styles.Cursor} aria-hidden="true">▸</span>
                            {link.label}
                        </NavLink>
                    ))}
                    <ContactLink />
                </nav>

                <button
                    ref={menuButtonRef}
                    type="button"
                    className={styles.MenuButton}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-nav"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    {menuOpen ? 'close' : 'menu'}
                </button>
            </div>

            {menuOpen && (
                <nav id="mobile-nav" className={styles.MobileNav} aria-label="Site (mobile)">
                    {[{ to: '/', label: 'home' }, ...NAV_LINKS].map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                            <span className={styles.Cursor} aria-hidden="true">▸</span>
                            {link.label}
                        </NavLink>
                    ))}
                    <ContactLink onClick={() => setMenuOpen(false)} />
                </nav>
            )}
        </header>
    );
}
