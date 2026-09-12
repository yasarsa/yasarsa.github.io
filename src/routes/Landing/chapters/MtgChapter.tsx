import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cv } from '../../../data/cv';
import { toMtgCards } from '../../../adapters/toMtgCards';
import type { EntryKey } from '../../../data/cv.types';
import { gsap, MQ } from '../../../lib/gsap';
import { useGsap } from '../../../hooks/useGsap';
import Chapter from '../../../components/fx/Chapter';
import SplitReveal from '../../../components/fx/SplitReveal';
import MTGCard from '../../../components/MTGCard/MTGCard';
import styles from './MtgChapter.module.css';

const HAND: EntryKey[] = ['work:vestel-senior', 'work:vestel-architect', 'person', 'education:msc-ted', 'education:bsc-iue'];
const allCards = toMtgCards(cv);
const hand = HAND.map((key) => allCards.find((c) => c.key === key)!).filter(Boolean);
const MANA = ['w', 'u', 'b', 'r', 'g'] as const;

/** Pointer tilt + holo-foil position for one card (fine pointers only). */
function useTilt<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el || !window.matchMedia(`${MQ.fine} and ${MQ.motion}`).matches) return;
        const inner = el.querySelector<HTMLElement>('[data-tilt]')!;
        const rx = gsap.quickTo(inner, 'rotateX', { duration: 0.5, ease: 'power3' });
        const ry = gsap.quickTo(inner, 'rotateY', { duration: 0.5, ease: 'power3' });
        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            ry((px - 0.5) * 22);
            rx((0.5 - py) * 22);
            inner.style.setProperty('--foil-x', `${px * 100}%`);
            inner.style.setProperty('--foil-y', `${py * 100}%`);
        };
        const onLeave = () => {
            rx(0);
            ry(0);
        };
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
        };
    }, []);
    return ref;
}

function HandCard({ index }: { index: number }) {
    const card = hand[index];
    const ref = useTilt<HTMLLIElement>();
    return (
        <li ref={ref} className={styles.Slot} data-slot={index}>
            <Link to="/cv/mtg" className={styles.CardLink} aria-label={`${card.name} — open the full MTG card set`} data-cursor="View set">
                <div className={styles.Flip} data-flip>
                    <div className={styles.Face} data-tilt>
                        <MTGCard card={card} />
                        <span className={styles.Foil} aria-hidden="true" />
                    </div>
                    <div className={styles.Back} aria-hidden="true">
                        <span className={styles.BackRing}>
                            <span className={styles.BackMark}>YAS</span>
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default function MtgChapter() {
    const ref = useGsap<HTMLDivElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
            const slots = gsap.utils.toArray<HTMLElement>('[data-slot]', root);
            const mid = (slots.length - 1) / 2;
            const spacing = () => Math.min(window.innerWidth * 0.15, 250);
            const tl = gsap.timeline({
                defaults: { ease: 'power2.inOut' },
                scrollTrigger: { trigger: root, start: 'top top', end: '+=160%', pin: true, scrub: 0.8, invalidateOnRefresh: true },
            });
            slots.forEach((slot, i) => {
                const off = i - mid;
                tl.fromTo(
                    slot,
                    { x: 0, y: () => window.innerHeight * 0.55 - i * 4, rotate: (i - mid) * 2 },
                    { x: () => off * spacing(), y: () => Math.abs(off) * 34, rotate: off * 7, duration: 1 },
                    i * 0.12
                );
                tl.fromTo(slot.querySelector('[data-flip]'), { rotateY: 180 }, { rotateY: 0, duration: 0.7, ease: 'power3.inOut' }, 0.35 + i * 0.12);
            });
            tl.from('[data-mana]', { scale: 0, autoAlpha: 0, stagger: 0.06, duration: 0.3, ease: 'back.out(3)' }, 0);
            tl.to({}, { duration: 0.4 });
        });
        return () => mm.revert();
    });

    return (
        <Chapter id="mtg" hud="04 / Magic" watermark="MTG" className={styles.Chapter} labelledBy="mtg-title">
            <div ref={ref} className={styles.Stage}>
                <header className={styles.Header}>
                    <p className={styles.Eyebrow}>04 — Magic: The Gathering</p>
                    <SplitReveal as="h2" id="mtg-title" className={styles.Title}>
                        A career in five cards.
                    </SplitReveal>
                    <p className={styles.Lede}>
                        Jobs are creatures and enchantments, degrees are sorceries, and I'm the legendary one in the middle.
                        Tap any card to browse the full ten-card set.
                    </p>
                    <ul className={styles.Mana} aria-hidden="true">
                        {MANA.map((m) => <li key={m} className={styles[`mana_${m}`]} data-mana />)}
                    </ul>
                </header>

                <ol className={styles.Hand} aria-label="Five cards from the career set">
                    {hand.map((card, i) => <HandCard key={card.key} index={i} />)}
                </ol>
            </div>
        </Chapter>
    );
}
