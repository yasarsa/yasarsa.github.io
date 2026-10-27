import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import RouteSkeleton from './RouteSkeleton';
import { useRouteFocus } from '../../hooks/useRouteFocus';
import { jumpTo } from './jumpTo';
import styles from './SiteLayout.module.css';

export default function SiteLayout() {
    const { mainRef, announcement } = useRouteFocus();

    return (
        <div className={styles.SiteLayout}>
            <a href="#main" className="skip-link" onClick={jumpTo('main')}>Skip to content</a>
            <SiteHeader />
            <main id="main" tabIndex={-1} ref={mainRef} className={styles.Main}>
                <Suspense fallback={<RouteSkeleton />}>
                    <Outlet />
                </Suspense>
            </main>
            <SiteFooter />
            <ScrollRestoration getKey={(location) => location.pathname} />
            <div aria-live="polite" className="visually-hidden">{announcement}</div>
        </div>
    );
}
