import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { cv } from '../../../data/cv';
import { toGameProgress } from '../../../adapters/toGameProgress';
import { gsap, MQ, ScrollTrigger } from '../../../lib/gsap';
import { useGsap } from '../../../hooks/useGsap';
import Chapter from '../../../components/fx/Chapter';
import PixelIcon from './PixelIcon';
import styles from './GameDevChapter.module.css';

const game = toGameProgress(cv);
const [firstName] = cv.basics.name.toLocaleUpperCase('tr').split(' ');

// Stage coordinates on a 1000×400 map (oldest → newest).
const POINTS: [number, number][] = [
    [70, 270],
    [240, 120],
    [410, 260],
    [590, 115],
    [760, 255],
    [925, 110],
];
const PATH = POINTS.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = POINTS[i - 1];
    const mx = (px + x) / 2;
    return `${d} C${mx} ${py} ${mx} ${y} ${x} ${y}`;
}, '');

export default function GameDevChapter() {
    const stageRef = useGsap<HTMLDivElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add({ desktop: `${MQ.desktop} and ${MQ.motion}`, mobile: `${MQ.mobile} and ${MQ.motion}` }, (c) => {
            const { desktop } = c.conditions as { desktop: boolean };
            const lvl = root.querySelector<HTMLElement>('[data-lvl]')!;
            const counter = { v: 1 };
            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: desktop
                    ? { trigger: root, start: 'top top', end: '+=170%', pin: true, scrub: 0.6 }
                    : { trigger: '[data-crt]', start: 'top 70%', once: true },
            });

            // CRT power-on.
            tl.fromTo('[data-screen]', { scaleY: 0.004, scaleX: 0.6, filter: 'brightness(4)' }, { scaleY: 1, scaleX: 1, filter: 'brightness(1)', duration: 0.8, ease: 'expo.out' })
                .from('[data-hud-item]', { autoAlpha: 0, y: -10, stagger: 0.08, duration: 0.3 }, '-=0.3');

            if (desktop) {
                const path = root.querySelector<SVGPathElement>('[data-path]')!;
                const len = path.getTotalLength();
                const drawDur = 4;
                tl.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: drawDur }, 'draw')
                    .to(counter, {
                        v: game.level,
                        duration: drawDur,
                        onUpdate: () => {
                            lvl.textContent = String(Math.round(counter.v)).padStart(2, '0');
                        },
                    }, 'draw');
                gsap.utils.toArray<HTMLElement>('[data-node]', root).forEach((node, i, all) => {
                    tl.from(node, { scale: 0, autoAlpha: 0, duration: 0.35, ease: 'back.out(3)' }, `draw+=${(i / (all.length - 1)) * drawDur * 0.96}`);
                });
            } else {
                lvl.textContent = String(game.level).padStart(2, '0');
                tl.from('[data-node]', { x: -30, autoAlpha: 0, stagger: 0.12, duration: 0.5, ease: 'expo.out' });
            }
            tl.fromTo('[data-xp]', { scaleX: 0 }, { scaleX: game.xp, duration: 0.8, ease: 'power2.out' })
                .from('[data-press-start]', { autoAlpha: 0, duration: 0.2 });
        });
        return () => mm.revert();
    });

    const extrasRef = useGsap<HTMLDivElement>(() => {
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            gsap.set('[data-achievement]', { autoAlpha: 0, scale: 0.7, rotate: -4 });
            ScrollTrigger.batch('[data-achievement]', {
                start: 'top 88%',
                once: true,
                onEnter: (batch) =>
                    gsap.to(batch, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2.2)', stagger: 0.09 }),
            });
            gsap.from('[data-cart]', {
                y: 80,
                rotate: (i: number) => (i % 2 ? 6 : -6),
                autoAlpha: 0,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.12,
                scrollTrigger: { trigger: '[data-carts]', start: 'top 85%', once: true },
            });
        });
        return () => mm.revert();
    });

    return (
        <Chapter id="gamedev" hud="02 / Game Dev" watermark="1UP" className={styles.Chapter} labelledBy="gamedev-title">
            <div ref={stageRef} className={styles.Stage}>
                <header className={styles.Header}>
                    <p className={styles.Eyebrow}>02 — Game Development</p>
                    <h2 id="gamedev-title" className={styles.Title}>CAREER.EXE</h2>
                    <p className={styles.Lede}>
                        Games are how I think about systems — loops, feedback, progression. So here is my career as one:
                        five stages cleared, one in progress.
                    </p>
                </header>

                <div className={styles.Crt} data-crt>
                    <div className={styles.Screen} data-screen>
                        <div className={styles.Hud}>
                            <span data-hud-item>P1 · {firstName}</span>
                            <span data-hud-item>
                                LVL <b data-lvl>{String(game.level).padStart(2, '0')}</b>
                            </span>
                            <span className={styles.XpWrap} data-hud-item>
                                XP
                                <span className={styles.XpTrack} role="img" aria-label={game.xpLabel}>
                                    <span className={styles.XpFill} data-xp style={{ transform: `scaleX(${game.xp})` }} />
                                </span>
                            </span>
                            <span data-hud-item className={styles.HudRight}>
                                ★ {game.achievements.length}/{game.achievements.length}
                            </span>
                        </div>

                        <div className={styles.Map}>
                            <svg className={styles.MapSvg} viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
                                <path d={PATH} className={styles.PathGhost} />
                                <path d={PATH} className={styles.Path} data-path />
                            </svg>
                            <ol className={styles.Nodes} aria-label="Career stages, oldest first">
                                {game.stages.map((s, i) => {
                                    const [x, y] = POINTS[i] ?? [0, 0];
                                    return (
                                        <li
                                            key={s.key}
                                            className={`${styles.Node} ${s.current ? styles.Current : ''} ${y < 200 ? styles.LabelAbove : ''}`}
                                            style={{ '--x': `${x / 10}%`, '--y': `${y / 4}%` } as CSSProperties}
                                            data-node
                                        >
                                            <span className={styles.Pip} aria-hidden="true">{s.number}</span>
                                            <span className={styles.NodeLabel}>
                                                <span className={styles.StageName}>
                                                    {s.current && <span className={styles.Here}>▼ YOU ARE HERE</span>}
                                                    {s.stage}
                                                </span>
                                                <span className={styles.StageRole}>{s.title} · {s.company}</span>
                                                <span className={styles.StageYears}>{s.years}{s.current ? ' · IN PROGRESS' : ' · CLEARED'}</span>
                                            </span>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>

                        <p className={styles.PressStart} data-press-start aria-hidden="true">— PRESS START TO CONTINUE —</p>
                    </div>
                </div>
            </div>

            <div ref={extrasRef} className={styles.Extras}>
                <div className={styles.AchHeader}>
                    <h3 className={styles.SubTitle}>Achievements</h3>
                    <p className={styles.AchCount}>{game.achievements.length}/{game.achievements.length} unlocked</p>
                </div>
                <ul className={styles.Achievements}>
                    {game.achievements.map((a) => (
                        <li key={a.id} className={styles.Achievement} data-rarity={a.rarity} data-achievement>
                            <PixelIcon icon={a.icon} className={styles.AchIcon} />
                            <div className={styles.AchText}>
                                <span className={styles.AchUnlocked}>Achievement unlocked · {a.year}</span>
                                <span className={styles.AchTitle}>{a.title}</span>
                                <span className={styles.AchDesc}>{a.description}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <h3 className={styles.SubTitle}>Released titles</h3>
                <p className={styles.ReleasesLede}>Built for my own tabletop nights — playable right here in the browser.</p>
                <ul className={styles.Carts} data-carts>
                    {game.releases.map((r, i) => (
                        <li key={r.id} data-cart>
                            <Link to={r.href} className={styles.Cart} data-cursor="Play">
                                <span className={styles.CartNotch} aria-hidden="true" />
                                <span className={styles.CartLabel}>
                                    <span className={styles.CartNo}>CART-0{i + 1}</span>
                                    <span className={styles.CartTitle}>{r.title}</span>
                                    <span className={styles.CartBlurb}>{r.blurb}</span>
                                </span>
                                <span className={styles.CartPlay}>▶ Play now</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Chapter>
    );
}
