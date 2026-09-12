import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './CvLayout.module.css';

const LENS_STORAGE_KEY = 'cv-lens';

const LENSES = [
    { to: '/cv/json', label: 'Software · JSON' },
    { to: '/cv/mtg', label: 'Magic · Card set' },
    { to: '/cv/sheet', label: 'D&D · Character sheet' },
];

// The other two realms live only on the homepage.
const HOME_REALMS = [
    { to: '/#gamedev', label: 'Game Dev' },
    { to: '/#warhammer', label: 'Warhammer' },
];

export default function CvLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/cv' || location.pathname === '/cv/') {
            let last: string | null = null;
            try {
                last = localStorage.getItem(LENS_STORAGE_KEY);
            } catch {
                // ignore
            }
            navigate(last && LENSES.some((l) => l.to === last) ? last : '/cv/mtg', { replace: true });
            return;
        }
        try {
            localStorage.setItem(LENS_STORAGE_KEY, location.pathname);
        } catch {
            // ignore
        }
    }, [location.pathname, navigate]);

    return (
        <div className={styles.CvLayout}>
            <nav className={styles.LensNav} aria-label="CV format" data-lens-switcher>
                {LENSES.map((lens) => (
                    <NavLink
                        key={lens.to}
                        to={lens.to}
                        viewTransition
                        className={({ isActive }) => `${styles.LensLink} ${isActive ? styles.LensLinkActive : ''}`}
                    >
                        {lens.label}
                    </NavLink>
                ))}
                <span className={styles.Divider} aria-hidden="true" />
                {HOME_REALMS.map((realm) => (
                    <Link key={realm.to} to={realm.to} className={styles.LensLink}>
                        {realm.label} <span aria-hidden="true">↗</span>
                    </Link>
                ))}
            </nav>
            <div className={styles.LensBody}>
                <Outlet />
            </div>
        </div>
    );
}
