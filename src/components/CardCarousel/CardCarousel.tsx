import { useCallback, useEffect, useRef, useState } from "react";
import MTGCard from "../MTGCard/MTGCard";
import type { CVCardData } from "../../utils/cvData";
import styles from "./CardCarousel.module.css";

interface Props {
    cards: CVCardData[];
}

export default function CardCarousel({ cards }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const goTo = useCallback((index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 350);
    }, [currentIndex, isTransitioning]);

    const goNext = useCallback(() => {
        goTo((currentIndex + 1) % cards.length);
    }, [currentIndex, cards.length, goTo]);

    const goPrev = useCallback(() => {
        goTo((currentIndex - 1 + cards.length) % cards.length);
    }, [currentIndex, cards.length, goTo]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") goPrev();
            else if (e.key === "ArrowRight") goNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev]);

    // Touch swipe
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;

        // Only trigger if horizontal swipe is dominant
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) goNext();
            else goPrev();
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    if (cards.length === 0) return null;

    return (
        <div className={styles.Carousel}>
            <div
                className={styles.Viewport}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <button
                    className={`${styles.ArrowButton} ${styles.ArrowLeft}`}
                    onClick={goPrev}
                    aria-label="Previous card"
                >
                    ‹
                </button>
                <button
                    className={`${styles.ArrowButton} ${styles.ArrowRight}`}
                    onClick={goNext}
                    aria-label="Next card"
                >
                    ›
                </button>
                <div
                    className={styles.Track}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {cards.map((card, i) => (
                        <div key={i} className={styles.Slide}>
                            <MTGCard
                                name={card.name}
                                manaCost={card.manaCost}
                                image=""
                                type={card.type}
                                skills={card.skills}
                                description={card.description}
                                flavorText={card.flavorText}
                                power={card.power}
                                toughness={card.toughness}
                                gradient={card.gradient}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.Dots}>
                {cards.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.Dot} ${i === currentIndex ? styles.DotActive : ""}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to card ${i + 1}`}
                    />
                ))}
            </div>

            <div className={styles.Counter}>
                {currentIndex + 1} / {cards.length}
            </div>
        </div>
    );
}
