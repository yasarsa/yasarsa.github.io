import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import BareLayoutBoundary from './components/layout/BareLayoutBoundary';
import Landing from './routes/Landing/Landing';
import ProjectsIndex from './routes/Projects/ProjectsIndex';
import CvLayout from './routes/Cv/CvLayout';
import NotFound from './routes/NotFound/NotFound';

const DND = lazy(() => import('./routes/DND/DND'));
const KT = lazy(() => import('./routes/KT/KT'));
const MtgLens = lazy(() => import('./lenses/mtg/MtgLens'));
const SheetLens = lazy(() => import('./lenses/sheet/SheetLens'));
const JsonLens = lazy(() => import('./lenses/json/JsonLens'));

export const router = createBrowserRouter([
    {
        element: <SiteLayout />,
        children: [
            { path: '/', element: <Landing /> },
            { path: '/projects', element: <ProjectsIndex /> },
            {
                path: '/cv',
                element: <CvLayout />,
                children: [
                    { index: true, element: null },
                    { path: 'mtg', element: <MtgLens /> },
                    { path: 'sheet', element: <SheetLens /> },
                    { path: 'json', element: <JsonLens /> },
                ],
            },
            { path: '*', element: <NotFound /> },
        ],
    },
    {
        element: <BareLayoutBoundary />,
        children: [
            { path: '/dnd', element: <DND /> },
            { path: '/kt', element: <KT /> },
        ],
    },
], { basename: '/' });
