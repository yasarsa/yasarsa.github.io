interface Props {
    /** Public-folder base path without extension, e.g. "/portrait/yasar-anil-sansak" */
    srcBase: string;
    widths: number[];
    alt: string;
    width: number;
    height: number;
    sizes?: string;
    priority?: boolean;
    className?: string;
}

function srcSet(srcBase: string, widths: number[], ext: string): string {
    return widths.map((w) => `${srcBase}-${w}.${ext} ${w}w`).join(', ');
}

export default function Picture({ srcBase, widths, alt, width, height, sizes, priority, className }: Props) {
    const fallbackWidth = widths[widths.length - 1];

    return (
        <picture>
            <source srcSet={srcSet(srcBase, widths, 'avif')} sizes={sizes} type="image/avif" />
            <source srcSet={srcSet(srcBase, widths, 'webp')} sizes={sizes} type="image/webp" />
            <img
                src={`${srcBase}-${fallbackWidth}.png`}
                width={width}
                height={height}
                alt={alt}
                className={className}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={priority ? 'high' : undefined}
            />
        </picture>
    );
}
