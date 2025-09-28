import { useRef, useState } from "react";
import chevron from '../../assets/chevron-down.svg';
import cross from '../../assets/cross.svg';
import trash from '../../assets/trash.svg';
import styles from "./Accordion.module.css";

interface Props {
    title: string;
    onDelete: () => void;
    children: React.ReactNode;
}
export default function Accordion({ title, onDelete, children }: Props) {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [startPos, setStartPos] = useState<number | null>(null)
    const [endPos, setEndPos] = useState<number | null>(null)
    const [showDelete, setShowDelete] = useState(false)
    const minSwipeDistance = 50

    const timerRef = useRef<number | undefined>(undefined);
    const [isMoved, setIsMoved] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleLongPress = () => {
        setShowDelete(true)
    };

    const startPress = () => {
        if (!showDelete) {
            timerRef.current = setTimeout(handleLongPress, 500);
        }
    };

    const endPress = () => {
        clearTimeout(timerRef.current);
    };

    // Touch Events
    const onTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setEndPos(null)
        setStartPos(e.targetTouches[0].clientX)
        setIsMoved(false)
        startPress()
    }

    const onTouchMove = (e: React.TouchEvent) => {
        e.stopPropagation();
        e.preventDefault();
        // Sadece yeterli hareket varsa moved olarak işaretle
        if (Math.abs(e.targetTouches[0].clientX - (startPos || 0)) > 5) {
            setIsMoved(true)
            setEndPos(e.targetTouches[0].clientX)
        }
    }

    const onTouchEnd = (e: React.TouchEvent) => {
        e.stopPropagation();
        e.preventDefault();
        // Kısa bir gecikme ile işle
        setTimeout(() => handleInteractionEnd(), 50);
    }

    // Mouse Events
    const onMouseDown = (e: React.MouseEvent) => {
        setEndPos(null)
        setStartPos(e.clientX)
        setIsMoved(false)
        setIsMouseDown(true)
        startPress()
    }

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown) return
        setIsMoved(true)
        setEndPos(e.clientX)
    }

    const onMouseUp = () => {
        setIsMouseDown(false)
        handleInteractionEnd();
    }

    const onMouseLeave = () => {
        if (isMouseDown) {
            setIsMouseDown(false)
            handleInteractionEnd();
        }
    }

    const handleInteractionEnd = () => {


        endPress()

        if (!startPos) {
            return;
        }

        // Eğer endPos yoksa ve hareket olmadıysa, bu bir tap/click olayıdır
        if (!endPos) {
            if (!isMoved) {
                setTimeout(() => handleAccordionClick(), 100);
            }
            return;
        }

        const distance = startPos - endPos
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance


        if (isLeftSwipe || isRightSwipe) {
            if (isRightSwipe) setShowDelete(false)
            if (isLeftSwipe) setShowDelete(true)
        } else if (!isMoved) {
            setTimeout(() => handleAccordionClick(), 100);
        }
    }
    const handleAccordionClick = () => {
        if (!showDelete) {
            setIsCollapsed((prev) => {
                return !prev;
            });
        }
    }

    const handleDelete = () => {
        onDelete()
    }

    return (
        <div className={styles.Accordion}>
            <div
                className={styles.TitleContainer}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}>

                <p>{title}</p>
                {showDelete ? (
                    <div className={styles.SwipeButtonContainer}
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}>
                        <img
                            src={trash}
                            className={styles.IconButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleDelete();
                            }}
                        />
                        <img
                            src={cross}
                            className={styles.IconButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowDelete(false);
                            }}
                        />
                    </div>
                ) : (
                    <img src={chevron} style={{ transform: isCollapsed ? "none" : "rotate(180deg)" }} alt="Collapse" />
                )}
            </div>
            <div className={`${styles.CollapsedContent} ${!isCollapsed ? styles.ExpandedContent : ''}`}>
                {children}
            </div>
        </div>
    )
}