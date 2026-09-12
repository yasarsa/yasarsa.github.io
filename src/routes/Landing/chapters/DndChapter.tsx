import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { cv } from '../../../data/cv';
import { toCharacterSheet } from '../../../adapters/toCharacterSheet';
import { gsap, MQ, ScrollTrigger } from '../../../lib/gsap';
import { useGsap } from '../../../hooks/useGsap';
import Chapter from '../../../components/fx/Chapter';
import SplitReveal from '../../../components/fx/SplitReveal';
import D20 from '../../../components/fx/D20';
import styles from './DndChapter.module.css';

const sheet = toCharacterSheet(cv);
const signed = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

const VITALS = [
    { label: 'Hit points', value: String(sheet.hp), shape: 'heart' },
    { label: 'Armor class', value: String(sheet.ac), shape: 'shield' },
    { label: 'Proficiency', value: signed(sheet.proficiencyBonus), shape: 'gem' },
    { label: 'Initiative', value: signed(sheet.initiative), shape: 'gem' },
    { label: 'Speed', value: `${sheet.speed} ft`, shape: 'gem' },
] as const;

const EMBERS = Array.from({ length: 14 }, (_, i) => i);

export default function DndChapter() {
    const ref = useGsap<HTMLDivElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            gsap.to('[data-die]', {
                rotate: 720,
                ease: 'none',
                scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
            });
            gsap.fromTo(
                '[data-die-glow]',
                { scale: 0.6, opacity: 0.2 },
                { scale: 1.2, opacity: 0.9, ease: 'none', scrollTrigger: { trigger: root, start: 'top 60%', end: 'center center', scrub: true } }
            );

            root.querySelectorAll<HTMLElement>('[data-score]').forEach((el) => {
                const target = Number(el.dataset.score);
                const obj = { v: 1 };
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 95%',
                    once: true,
                    onEnter: () =>
                        gsap.to(obj, {
                            v: target,
                            duration: 1.4,
                            ease: 'power3.out',
                            onUpdate: () => {
                                el.textContent = String(Math.round(obj.v));
                            },
                        }),
                });
            });

            gsap.from('[data-block]', {
                y: 50,
                autoAlpha: 0,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: { trigger: '[data-blocks]', start: 'top 80%', once: true },
            });
        });
        return () => mm.revert();
    });

    return (
        <Chapter id="dnd" hud="05 / D&D" watermark="D20" className={styles.Chapter} labelledBy="dnd-title">
            <div className={styles.Embers} aria-hidden="true">
                {EMBERS.map((i) => <span key={i} style={{ '--i': i } as CSSProperties} />)}
            </div>
            <div ref={ref} className={styles.Layout}>
                <div className={styles.DieCol} aria-hidden="true">
                    <div className={styles.DieSticky}>
                        <span className={styles.DieGlow} data-die-glow />
                        <div className={styles.Die} data-die>
                            <D20 face={20} strokeWidth={1.4} />
                        </div>
                        <span className={styles.Nat}>Natural 20</span>
                    </div>
                </div>

                <div className={styles.Content}>
                    <p className={styles.Eyebrow}>05 — Dungeons &amp; Dragons</p>
                    <SplitReveal as="h2" id="dnd-title" className={styles.Title}>
                        Level {sheet.level} multiclass. Rolls with advantage.
                    </SplitReveal>
                    <p className={styles.Lede}>
                        Every number here is derived from the CV — class levels from years worked, armour from years
                        leading. Only the ability scores are hand-rolled.
                    </p>

                    <div className={styles.Blocks} data-blocks>
                        <section className={styles.Identity} data-block aria-label="Identity">
                            <p className={styles.CharName}>{sheet.name}</p>
                            <ul className={styles.Classes}>
                                {sheet.classes.map((c) => (
                                    <li key={c.name}>
                                        <strong>{c.name} {c.level}</strong> <span>{c.subclass}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <ul className={styles.Vitals} data-block aria-label="Vitals">
                            {VITALS.map((v) => (
                                <li key={v.label} className={styles.Vital} data-shape={v.shape}>
                                    <span className={styles.VitalValue}>{v.value}</span>
                                    <span className={styles.VitalLabel}>{v.label}</span>
                                </li>
                            ))}
                        </ul>

                        <ul className={styles.Abilities} data-block aria-label="Ability scores">
                            {sheet.abilities.map((a) => (
                                <li key={a.ability} className={styles.Ability} title={a.rationale}>
                                    <span className={styles.AbilityName}>{a.ability}</span>
                                    <span className={styles.AbilityScore} data-score={a.score}>{a.score}</span>
                                    <span className={styles.AbilityMod}>{signed(a.modifier)}</span>
                                </li>
                            ))}
                        </ul>

                        <section className={styles.Features} data-block aria-labelledby="dnd-features">
                            <h3 id="dnd-features" className={styles.BlockTitle}>Signature features</h3>
                            <ul>
                                {sheet.features.map((f) => (
                                    <li key={f.name}>
                                        <strong>{f.name}.</strong> {f.description}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <Link to="/cv/sheet" className={styles.Cta} data-block data-cursor="Open">
                            <span>Open the full character sheet</span> <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Chapter>
    );
}
