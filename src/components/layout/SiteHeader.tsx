import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cv } from '../../data/cv';
import { gsap, lockScroll, MQ } from '../../lib/gsap';
import { REALMS } from '../../routes/Landing/realms';
import styles from './SiteHeader.module.css';

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/cv', label: 'Full CV' },
    { to: '/projects', label: 'Projects' },
    { to: '/dnd', label: 'D&D Calculator' },
    { to: '/kt', label: 'Kill Team' },
];

export default function SiteHeader() {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const location = useLocation();

    const close = useCallback(() => setOpen(false), []);

    // Hide on scroll down, reveal on scroll up.
    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setHidden(y > 160 && y > lastY);
            lastY = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close whenever the route (or hash) changes.
    useEffect(() => {
        close();
    }, [location.pathname, location.hash, close]);

    // Build the open/close timeline once.
    useLayoutEffect(() => {
        const overlay = overlayRef.current!;
        const ctx = gsap.context(() => {
            const reduced = window.matchMedia(MQ.reduce).matches;
            const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.inOut' } });
            tl.set(overlay, { visibility: 'visible' })
                .fromTo(overlay, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: reduced ? 0.01 : 0.8 })
                .from('[data-menu-link]', { yPercent: 110, duration: reduced ? 0.01 : 0.9, ease: 'expo.out', stagger: 0.05 }, '-=0.35')
                .from('[data-menu-fade]', { autoAlpha: 0, y: 20, duration: reduced ? 0.01 : 0.6, ease: 'expo.out', stagger: 0.04 }, '<0.1');
            tlRef.current = tl;
        }, overlay);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const tl = tlRef.current;
        if (!tl) return;
        if (open) {
            lockScroll(true);
            tl.timeScale(1).play();
            overlayRef.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
        } else if (tl.progress() > 0) {
            tl.timeScale(1.6).reverse();
            lockScroll(false);
        }
    }, [open]);

    // Escape closes; Tab stays inside the dialog.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                buttonRef.current?.focus();
                return;
            }
            if (e.key !== 'Tab') return;
            const focusables = [buttonRef.current, ...Array.from(overlayRef.current?.querySelectorAll<HTMLElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <header className={styles.SiteHeader} data-site-header data-hidden={hidden && !open} data-open={open}>
            <div className={styles.Bar}>
                <Link to="/" className={styles.Brand} aria-label={`${cv.basics.name} — home`}>
                    <span className={styles.Mono}>YAS</span>
                    <span className={styles.BrandSub}>Software Architect · Izmir</span>
                </Link>

                <button
                    ref={buttonRef}
                    type="button"
                    className={styles.MenuButton}
                    aria-expanded={open}
                    aria-controls="site-menu"
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className={styles.MenuLabel}>{open ? 'Close' : 'Menu'}</span>
                    <span className={styles.Burger} aria-hidden="true"><i /><i /></span>
                </button>
            </div>

            <div
                ref={overlayRef}
                id="site-menu"
                className={styles.Overlay}
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                aria-hidden={!open}
                inert={!open}
            >
                <div className={styles.OverlayInner}>
                    <nav aria-label="Site" className={styles.Primary}>
                        <ol>
                            {NAV_LINKS.map((link, i) => (
                                <li key={link.to} className={styles.LinkMask}>
                                    <NavLink
                                        to={link.to}
                                        end={link.to === '/'}
                                        className={({ isActive }) => `${styles.BigLink} ${isActive ? styles.Active : ''}`}
                                        data-menu-link
                                        onClick={close}
                                    >
                                        <span className={styles.Num}>0{i + 1}</span>
                                        <span className={styles.LinkText}>{link.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className={styles.Side}>
                        <nav aria-label="CV realms" className={styles.Realms}>
                            <p className="eyebrow" data-menu-fade>Jump to a realm</p>
                            <ul>
                                {REALMS.map((r) => (
                                    <li key={r.id} data-menu-fade>
                                        <Link to={`/#${r.id}`} onClick={close}>
                                            <span>{r.number}</span> {r.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className={styles.Contact} data-menu-fade>
                            <p className="eyebrow">Say hello</p>
                            <a href={`mailto:${cv.basics.email}`}>{cv.basics.email}</a>
                            <div className={styles.Socials}>
                                {cv.basics.profiles.map((p) => (
                                    <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer">
                                        {p.network}
                                        <span className="visually-hidden"> (opens in a new tab)</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
