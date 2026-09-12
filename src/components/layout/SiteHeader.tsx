import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './SiteHeader.module.css';

const NAV_LINKS = [
    { to: '/cv', label: 'CV' },
    { to: '/projects', label: 'Projects' },
    { to: '/dnd', label: 'D&D Calculator' },
    { to: '/kt', label: 'Kill Team' },
];

export default function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.SiteHeader} data-site-header>
            <div className={styles.Inner}>
                <NavLink to="/" className={styles.Brand} onClick={() => setMenuOpen(false)}>
                    Yaşar Anıl Sansak
                </NavLink>

                <nav className={styles.DesktopNav} aria-label="Site">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => `${styles.NavLink} ${isActive ? styles.NavLinkActive : ''}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className={styles.Actions}>
                    <ThemeToggle />
                    <button
                        type="button"
                        className={styles.MenuButton}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav id="mobile-nav" className={styles.MobileNav} aria-label="Site (mobile)">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={styles.MobileNavLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    );
}
