import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../../data/projects';
import { techLabel } from '../../../data/tech';
import { gsap, MQ } from '../../../lib/gsap';
import SplitReveal from '../../../components/fx/SplitReveal';
import styles from './ProjectsList.module.css';

const projects = PROJECTS.filter((p) => p.status !== 'todo');

export default function ProjectsList() {
    const listRef = useRef<HTMLOListElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<number | null>(null);

    // Cursor-following preview card (fine pointers only).
    useEffect(() => {
        const list = listRef.current;
        const preview = previewRef.current;
        if (!list || !preview || !window.matchMedia(`${MQ.fine} and ${MQ.motion}`).matches) return;
        const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
        const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });
        const rTo = gsap.quickTo(preview, 'rotate', { duration: 0.8, ease: 'power3' });
        let lastX = 0;
        const onMove = (e: PointerEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
            lastX = e.clientX;
        };
        list.addEventListener('pointermove', onMove);
        return () => list.removeEventListener('pointermove', onMove);
    }, []);

    useEffect(() => {
        const preview = previewRef.current;
        if (!preview) return;
        gsap.to(preview, { scale: active === null ? 0 : 1, autoAlpha: active === null ? 0 : 1, duration: 0.45, ease: 'expo.out' });
    }, [active]);

    return (
        <section className={styles.Projects} id="projects" data-hud="06 / Projects" aria-labelledby="projects-title">
            <div className={styles.Head}>
                <p className="eyebrow">(Selected works)</p>
                <SplitReveal as="h2" id="projects-title" className={styles.Title}>
                    Things I've built
                </SplitReveal>
            </div>

            <ol ref={listRef} className={styles.List} onPointerLeave={() => setActive(null)}>
                {projects.map((p, i) => {
                    const internal = p.kind === 'internal';
                    const content = (
                        <>
                            <span className={styles.Index}>{String(i + 1).padStart(2, '0')}</span>
                            <span className={styles.Name}>{p.title}</span>
                            <span className={styles.Meta}>
                                <span>{p.tech.map(techLabel).join(' · ')}</span>
                                <span>{p.year}</span>
                            </span>
                            <span className={styles.Blurb}>{p.blurb}</span>
                            <span className={styles.Arrow} aria-hidden="true">{internal ? '→' : '↗'}</span>
                        </>
                    );
                    return (
                        <li key={p.id} className={styles.Item} onPointerEnter={() => setActive(i)}>
                            {internal ? (
                                <Link to={p.href} className={styles.Row} data-cursor="Play">{content}</Link>
                            ) : (
                                <a href={p.href} target="_blank" rel="noopener noreferrer" className={styles.Row} data-cursor="Code">
                                    {content}
                                    <span className="visually-hidden"> (opens in a new tab)</span>
                                </a>
                            )}
                        </li>
                    );
                })}
            </ol>

            <div className={styles.Foot}>
                <Link to="/projects" className={styles.All}>All projects →</Link>
            </div>

            <div ref={previewRef} className={styles.Preview} aria-hidden="true">
                {projects.map((p, i) => (
                    <div key={p.id} className={styles.PreviewCard} style={{ background: p.art, opacity: active === i ? 1 : 0 }}>
                        <span>{p.title}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
