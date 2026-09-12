import { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './CvLayout.module.css';

const LENS_STORAGE_KEY = 'cv-lens';

const LENSES = [
    { to: '/cv/mtg', label: 'MTG Cards' },
    { to: '/cv/sheet', label: 'Character Sheet' },
    { to: '/cv/json', label: 'JSON' },
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
            </nav>
            <div className={styles.LensBody}>
                <Outlet />
            </div>
        </div>
    );
}
