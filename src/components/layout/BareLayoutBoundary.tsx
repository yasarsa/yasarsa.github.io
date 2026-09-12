import { lazy, Suspense } from 'react';

const BareLayout = lazy(() => import('./BareLayout'));

export default function BareLayoutBoundary() {
    return (
        <Suspense fallback={null}>
            <BareLayout />
        </Suspense>
    );
}
