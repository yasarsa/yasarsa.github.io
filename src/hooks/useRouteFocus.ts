import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useRouteFocus() {
    const location = useLocation();
    const mainRef = useRef<HTMLElement | null>(null);
    const [announcement, setAnnouncement] = useState('');
    // Compare against the previous path rather than a "first render" flag:
    // StrictMode runs effects twice, which would steal focus on page load.
    const previousPath = useRef(location.pathname);

    useEffect(() => {
        if (previousPath.current === location.pathname) return;
        previousPath.current = location.pathname;
        mainRef.current?.focus();
        setAnnouncement(document.title);
    }, [location.pathname]);

    return { mainRef, announcement };
}
