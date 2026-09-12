interface Props {
    className?: string;
    /** Number printed on the front face. */
    face?: string | number;
    strokeWidth?: number;
}

/** Flat icosahedron (d20) outline. Decorative — always aria-hidden. */
export default function D20({ className, face = 20, strokeWidth = 2 }: Props) {
    return (
        <svg className={className} viewBox="0 0 100 110" fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
                <path d="M50 3 93 28v54L50 107 7 82V28z" />
                <path d="M50 3 27 45h46zM27 45 7 28M73 45l20-17M27 45 7 82M73 45l20 37M27 45l23 40 23-40M50 85v22M50 85 7 82M50 85l43-3" opacity=".55" />
            </g>
            <text
                x="50"
                y="64"
                textAnchor="middle"
                fill="currentColor"
                style={{ font: '700 17px var(--font-display)' }}
            >
                {face}
            </text>
        </svg>
    );
}
