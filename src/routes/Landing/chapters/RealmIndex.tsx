import type { MouseEvent } from 'react';
import { gsap, MQ, scrollToTarget } from '../../../lib/gsap';
import { useGsap } from '../../../hooks/useGsap';
import SplitReveal from '../../../components/fx/SplitReveal';
import D20 from '../../../components/fx/D20';
import { REALMS } from '../realms';
import styles from './RealmIndex.module.css';

function jump(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    scrollToTarget(`#${id}`);
    history.replaceState(null, '', `#${id}`);
}

/** "One CV. Five realms." — a pinned, horizontally scrolling table of contents. */
export default function RealmIndex() {
    const ref = useGsap<HTMLElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
            const track = root.querySelector<HTMLElement>('[data-track]')!;
            const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
            const scroll = gsap.to(track, {
                x: () => -distance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: root,
                    start: 'top top',
                    end: () => `+=${distance()}`,
                    pin: true,
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            });
            // Cards tilt in as they travel across the viewport.
            gsap.utils.toArray<HTMLElement>('[data-realm-card]').forEach((card) => {
                gsap.fromTo(
                    card,
                    { rotate: 6, yPercent: 12 },
                    {
                        rotate: -2,
                        yPercent: -4,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scroll,
                            start: 'left right',
                            end: 'right left',
                            scrub: true,
                        },
                    }
                );
            });
        });
        mm.add(`${MQ.mobile} and ${MQ.motion}`, () => {
            gsap.utils.toArray<HTMLElement>('[data-realm-card]').forEach((card) => {
                gsap.from(card, {
                    y: 60,
                    autoAlpha: 0,
                    duration: 0.9,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: card, start: 'top 90%', once: true },
                });
            });
        });
        return () => mm.revert();
    });

    return (
        <section ref={ref} className={styles.RealmIndex} id="realms" data-hud="00 / Five realms" aria-labelledby="realms-title">
            <div className={styles.Track} data-track>
                <div className={styles.Intro}>
                    <p className="eyebrow">(Choose your realm)</p>
                    <SplitReveal as="h2" id="realms-title" className={styles.Title}>
                        One CV.<br />Five realms.
                    </SplitReveal>
                    <p className={styles.Lede}>
                        Same career, same facts — rendered through each of the worlds I love. Scroll on, or jump straight in.
                    </p>
                </div>

                <ol className={styles.Cards}>
                    {REALMS.map((realm) => (
                        <li key={realm.id} className={styles.CardItem}>
                            <a
                                href={`#${realm.id}`}
                                onClick={(e) => jump(e, realm.id)}
                                className={`${styles.Card} ${styles[realm.className]}`}
                                data-realm-card
                                data-cursor="Enter"
                            >
                                <span className={styles.CardNumber}>{realm.number}</span>
                                <span className={styles.Glyph} aria-hidden="true">
                                    {realm.glyph === 'd20' ? <D20 className={styles.GlyphDie} face="" strokeWidth={3} /> : realm.glyph}
                                </span>
                                <span className={styles.CardName}>{realm.name}</span>
                                <span className={styles.CardTag}>{realm.tagline}</span>
                                <span className={styles.CardCta} aria-hidden="true">Enter realm ↘</span>
                            </a>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
