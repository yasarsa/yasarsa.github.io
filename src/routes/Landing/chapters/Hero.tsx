import { useLayoutEffect, useRef } from 'react';
import { cv } from '../../../data/cv';
import { gsap, MQ, SplitText } from '../../../lib/gsap';
import { useGsap } from '../../../hooks/useGsap';
import Picture from '../../../components/Picture/Picture';
import D20 from '../../../components/fx/D20';
import styles from './Hero.module.css';

const ROLES = ['Software Architect', 'Team Lead', 'Game Dev at Heart', 'Planeswalker', 'Servant of the Throne', 'Dungeon Master'];

const [first, middle, last] = cv.basics.name.split(' ').map((w) => w.toLocaleUpperCase('tr'));

interface Props {
    /** Flips true when the preloader starts wiping away (or immediately). */
    ready: boolean;
}

export default function Hero({ ready }: Props) {
    const nameRef = useRef<HTMLHeadingElement>(null);

    // Scroll-driven exit: the three name lines drift apart, portrait sinks.
    const ref = useGsap<HTMLElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
            });
            tl.to('[data-line="0"]', { xPercent: -22 }, 0)
                .to('[data-line="1"]', { xPercent: 14 }, 0)
                .to('[data-line="2"]', { xPercent: -10 }, 0)
                .to('[data-portrait]', { scale: 1.25, rotate: -6 }, 0)
                .to('[data-hero-meta]', { autoAlpha: 0, y: -60 }, 0)
                .to('[data-glow]', { yPercent: 45, scale: 1.3 }, 0)
                .to('[data-big-die]', { rotate: 220, yPercent: 40 }, 0);

            // Rotating role ticker.
            const col = root.querySelector<HTMLElement>('[data-roles]')!;
            const n = ROLES.length;
            const roles = gsap.timeline({ repeat: -1, delay: 1.2 });
            for (let i = 1; i <= n; i++) {
                roles.to(col, { yPercent: (-100 * i) / (n + 1), duration: 0.7, ease: 'expo.inOut' }, `+=1.4`);
            }
            roles.set(col, { yPercent: 0 });
        });
        return () => mm.revert();
    });

    // Intro: masked chars rise in once the curtain lifts.
    useLayoutEffect(() => {
        if (!ready || !nameRef.current) return;
        const root = ref.current!;
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            const split = SplitText.create(root.querySelectorAll('[data-word]'), { type: 'chars', mask: 'chars' });
            const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
            tl.from(split.chars, { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.035 })
                .from('[data-portrait]', { clipPath: 'inset(50% 50% 50% 50% round 999px)', scale: 0.6, duration: 1.4 }, 0.35)
                .from('[data-hero-fade]', { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.08 }, 0.6)
                .from('[data-glow]', { autoAlpha: 0, scale: 0.6, duration: 2.4, ease: 'power2.out' }, 0);
            return () => split.revert();
        }, root);
        return () => mm.revert();
    }, [ready, ref]);

    return (
        <section ref={ref} className={styles.Hero} id="top" data-hud="00 / Hello" aria-labelledby="hero-name">
            <div className={styles.Glows} aria-hidden="true">
                <span className={styles.GlowEmber} data-glow />
                <span className={styles.GlowArcane} data-glow />
            </div>
            <div className={styles.BigDie} data-big-die aria-hidden="true">
                <D20 face="" strokeWidth={0.6} />
            </div>

            <div className={styles.Top} data-hero-meta>
                <p className="eyebrow" data-hero-fade>(Portfolio ©{new Date().getFullYear()})</p>
                <p className="eyebrow" data-hero-fade>{cv.basics.location.city}, Türkiye — 38.42° N, 27.14° E</p>
            </div>

            <h1 ref={nameRef} id="hero-name" className={styles.Name} aria-label={cv.basics.name}>
                <span className={styles.Line} data-line="0" aria-hidden="true">
                    <span data-word>{first}</span>
                </span>
                <span className={`${styles.Line} ${styles.LineIndent}`} data-line="1" aria-hidden="true">
                    <span className={styles.Portrait} data-portrait>
                        <Picture
                            srcBase="/portrait/yasar-anil-sansak"
                            widths={[400, 800]}
                            alt=""
                            width={400}
                            height={400}
                            sizes="(min-width: 768px) 320px, 40vw"
                            priority
                            className={styles.PortraitImg}
                        />
                    </span>
                    <span data-word>{middle}</span>
                </span>
                <span className={`${styles.Line} ${styles.LineEnd}`} data-line="2" aria-hidden="true">
                    <span data-word>{last}</span>
                </span>
            </h1>

            <div className={styles.Bottom} data-hero-meta>
                <p className={styles.Intro} data-hero-fade>
                    Software Architect &amp; Team Lead at <strong>Vestel</strong>. I build interfaces for a living
                    and worlds for fun — Magic, Warhammer, D&amp;D and games.
                </p>
                <div className={styles.Playing} data-hero-fade>
                    <span className="eyebrow">Currently playing as</span>
                    <span className={styles.RoleMask}>
                        <span className={styles.Roles} data-roles>
                            {[...ROLES, ROLES[0]].map((role, i) => (
                                <span key={i} className={styles.Role} aria-hidden={i > 0 || undefined}>{role}</span>
                            ))}
                        </span>
                    </span>
                </div>
                <div className={styles.ScrollCue} data-hero-fade aria-hidden="true">
                    <D20 className={styles.CueDie} face="" strokeWidth={3} />
                    <span className="eyebrow">Scroll to roll</span>
                </div>
            </div>
        </section>
    );
}
