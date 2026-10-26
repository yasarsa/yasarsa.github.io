import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useRouteFocus() {
    const location = useLocation();
    const mainRef = useRef<HTMLElement | null>(null);
    const [announcement, setAnnouncement] = useState('');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        mainRef.current?.focus();
        setAnnouncement(document.title);
    }, [location.pathname]);

    return { mainRef, announcement };
}
