import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import BackToSite from '../BackToSite/BackToSite';
import styles from './BareLayout.module.css';

export default function BareLayout() {
    return (
        <Provider store={store}>
            <div className={styles.BareLayout} data-theme="dark">
                <BackToSite />
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </div>
        </Provider>
    );
}
