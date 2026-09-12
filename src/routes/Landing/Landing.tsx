import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cv } from '../../data/cv';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ScrollTrigger, scrollToTarget } from '../../lib/gsap';
import JsonLd from '../../components/JsonLd/JsonLd';
import Preloader from '../../components/fx/Preloader';
import { shouldShowPreloader } from '../../components/fx/preloaderState';
import ScrollHud from '../../components/fx/ScrollHud';
import Hero from './chapters/Hero';
import Manifesto from './chapters/Manifesto';
import RealmIndex from './chapters/RealmIndex';
import SoftwareChapter from './chapters/SoftwareChapter';
import GameDevChapter from './chapters/GameDevChapter';
import WarhammerChapter from './chapters/WarhammerChapter';
import MtgChapter from './chapters/MtgChapter';
import DndChapter from './chapters/DndChapter';
import ProjectsList from './chapters/ProjectsList';
import Contact from './chapters/Contact';
import styles from './Landing.module.css';

export default function Landing() {
    useDocumentTitle('Yaşar Anıl Sansak — Software Architect & Team Lead', cv.basics.summary);
    const { hash } = useLocation();
    const [showPreloader, setShowPreloader] = useState(shouldShowPreloader);
    const [ready, setReady] = useState(!showPreloader);

    // Every chapter has registered its triggers by now (child layout
    // effects run first) — measure once, and again when fonts swap in.
    useEffect(() => {
        ScrollTrigger.refresh();
        let cancelled = false;
        document.fonts?.ready.then(() => {
            if (!cancelled) ScrollTrigger.refresh();
        });
        return () => {
            cancelled = true;
        };
    }, []);

    // Deep links like /#warhammer (from the menu or a shared URL).
    useEffect(() => {
        if (!hash) return;
        const id = window.setTimeout(() => scrollToTarget(hash, !ready), 60);
        return () => window.clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash]);

    return (
        <div className={styles.Landing}>
            <JsonLd />
            {showPreloader && <Preloader onReveal={() => setReady(true)} onDone={() => setShowPreloader(false)} />}
            <ScrollHud />
            <Hero ready={ready} />
            <Manifesto />
            <RealmIndex />
            <SoftwareChapter />
            <GameDevChapter />
            <WarhammerChapter />
            <MtgChapter />
            <DndChapter />
            <ProjectsList />
            <Contact />
        </div>
    );
}
