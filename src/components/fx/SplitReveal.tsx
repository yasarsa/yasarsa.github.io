import type { ElementType, ReactNode } from 'react';
import { gsap, MQ, SplitText } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';

interface Props {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    id?: string;
    /** Split granularity: masked lines slide up, or words/chars stagger. */
    by?: 'lines' | 'words' | 'chars';
    delay?: number;
    /** Where in the viewport the reveal fires. */
    start?: string;
}

/**
 * Heading/paragraph that reveals line-by-line (or word/char) as it
 * scrolls into view. SplitText keeps an aria-label on the parent so
 * screen readers read the sentence, not the fragments.
 */
export default function SplitReveal({ as: Tag = 'h2', children, className, id, by = 'lines', delay = 0, start = 'top 85%' }: Props) {
    const ref = useGsap<HTMLElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            const split = SplitText.create(root, {
                type: by === 'lines' ? 'lines' : by === 'chars' ? 'lines,words,chars' : 'lines,words',
                mask: 'lines',
                linesClass: 'split-line',
                autoSplit: true,
                onSplit(self) {
                    const targets = by === 'lines' ? self.lines : by === 'words' ? self.words : self.chars;
                    return gsap.from(targets, {
                        yPercent: 115,
                        rotate: by === 'chars' ? 8 : 2,
                        duration: 1.1,
                        ease: 'expo.out',
                        stagger: by === 'chars' ? 0.02 : by === 'words' ? 0.04 : 0.1,
                        delay,
                        scrollTrigger: { trigger: root, start, once: true },
                    });
                },
            });
            return () => split.revert();
        });
        return () => mm.revert();
    });

    return (
        <Tag ref={ref} className={className} id={id}>
            {children}
        </Tag>
    );
}
