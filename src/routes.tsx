import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import Landing from './routes/Landing/Landing';
import ProjectsIndex from './routes/Projects/ProjectsIndex';
import NotFound from './routes/NotFound/NotFound';

const JsonLens = lazy(() => import('./lenses/json/JsonLens'));

export const router = createBrowserRouter([
    {
        element: <SiteLayout />,
        children: [
            { path: '/', element: <Landing /> },
            { path: '/projects', element: <ProjectsIndex /> },
            { path: '/cv', element: <JsonLens /> },
            // Old CV URL: keep shared links working.
            { path: '/cv/json', element: <Navigate to="/cv" replace /> },
            { path: '*', element: <NotFound /> },
        ],
    },
], { basename: '/' });
