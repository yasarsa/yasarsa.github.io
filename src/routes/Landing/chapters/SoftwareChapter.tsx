import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cv } from '../../../data/cv';
import { toDevLog } from '../../../adapters/toDevLog';
import { gsap, MQ } from '../../../lib/gsap';
import { useGsap } from '../../../hooks/useGsap';
import Chapter from '../../../components/fx/Chapter';
import SplitReveal from '../../../components/fx/SplitReveal';
import styles from './SoftwareChapter.module.css';

const log = toDevLog(cv);

type Line = { kind: 'cmd' | 'out'; content: ReactNode; length: number };

const cmd = (text: string): Line => ({
    kind: 'cmd',
    length: text.length,
    content: (
        <>
            <span className={styles.Prompt}>~/{log.handle.split('-')[0]}</span> <span className={styles.Dollar}>$</span> {text}
        </>
    ),
});
const out = (content: ReactNode): Line => ({ kind: 'out', content, length: 1 });

const LINES: Line[] = [
    cmd('whoami'),
    out(<span className={styles.Bright}>{log.whoami}</span>),
    cmd('git log --oneline --graph career'),
    ...log.commits.map((c) =>
        out(
            <>
                <span className={styles.Graph}>*</span> <span className={styles.Hash}>{c.hash}</span>{' '}
                {c.isHead && <span className={styles.Head}>(HEAD → main) </span>}
                <span className={styles.Muted}>{c.years.padEnd(9, ' ')}</span> {c.message}
            </>
        )
    ),
    cmd('jq .dependencies package.json'),
    out(<span className={styles.Punct}>{'{'}</span>),
    ...log.dependencies.map((d, i) =>
        out(
            <>
                {'  '}
                <span className={styles.Key}>"{d.name}"</span>
                <span className={styles.Punct}>: </span>
                <span className={styles.Str}>"{d.version}"</span>
                {i < log.dependencies.length - 1 && <span className={styles.Punct}>,</span>}
            </>
        )
    ),
    out(<span className={styles.Punct}>{'}'}</span>),
    cmd('ls ./education'),
    out(
        <span className={styles.Files}>
            {log.education.map((f) => (
                <span key={f}>{f}</span>
            ))}
        </span>
    ),
];

export default function SoftwareChapter() {
    const ref = useGsap<HTMLDivElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add({ desktop: `${MQ.desktop} and ${MQ.motion}`, mobile: `${MQ.mobile} and ${MQ.motion}` }, (c) => {
            const { desktop } = c.conditions as { desktop: boolean };
            const lines = gsap.utils.toArray<HTMLElement>('[data-term-line]', root);
            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: desktop
                    ? { trigger: root, start: 'top top', end: '+=220%', pin: true, scrub: 0.6 }
                    : { trigger: '[data-ide]', start: 'top 75%', once: true },
            });
            tl.from('[data-ide]', { y: 80, rotateX: 18, autoAlpha: 0, duration: 1.2, ease: 'expo.out' });
            lines.forEach((line) => {
                const isCmd = line.dataset.kind === 'cmd';
                const len = Number(line.dataset.len);
                if (isCmd) {
                    tl.fromTo(
                        line,
                        { clipPath: 'inset(0 100% 0 0)' },
                        { clipPath: 'inset(0 0% 0 0)', duration: 0.12 + len * 0.035, ease: `steps(${len + 6})` },
                        '+=0.2'
                    );
                } else {
                    tl.fromTo(line, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, '+=0.06');
                }
            });
            tl.fromTo('[data-caret-line]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 });
            if (!desktop) tl.timeScale(4);
        });
        return () => mm.revert();
    });

    return (
        <Chapter id="software" hud="01 / Software" watermark={"</>"} className={styles.Chapter} labelledBy="software-title">
            <div ref={ref} className={styles.Stage}>
                <div className={styles.Copy}>
                    <p className={styles.Eyebrow}>01 — Software Development</p>
                    <SplitReveal as="h2" id="software-title" className={styles.Title}>
                        I ship interfaces &amp; lead the people who build them.
                    </SplitReveal>
                    <p className={styles.Lede}>
                        {log.totalYears}+ years across IoT, EV charging, AI, special-education apps and the web. React and
                        TypeScript on the front, AWS and .NET behind it — and a team to grow around it all.
                    </p>
                    <ul className={styles.Chips} aria-label="Core stack">
                        {log.dependencies.slice(0, 5).map((d) => (
                            <li key={d.name}>{d.name}</li>
                        ))}
                    </ul>
                    <Link to="/cv/json" className={styles.Cta} data-cursor="Open">
                        <span>Open cv.json</span> <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <div className={styles.Ide} data-ide>
                    <div className={styles.TitleBar}>
                        <span className={styles.Dots} aria-hidden="true"><i /><i /><i /></span>
                        <span className={styles.Tab}>zsh — ~/{log.handle}</span>
                    </div>
                    <div className={styles.Term} role="log" aria-label="Career as a terminal session">
                        {LINES.map((line, i) => (
                            <div
                                key={i}
                                className={`${styles.TermLine} ${line.kind === 'cmd' ? styles.Cmd : ''}`}
                                data-term-line
                                data-kind={line.kind}
                                data-len={line.length}
                            >
                                {line.content}
                            </div>
                        ))}
                        <div className={styles.TermLine} data-caret-line>
                            <span className={styles.Prompt}>~/{log.handle.split('-')[0]}</span> <span className={styles.Dollar}>$</span>{' '}
                            <span className={styles.Caret} aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>
        </Chapter>
    );
}
