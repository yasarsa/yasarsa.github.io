import { useEffect, useState } from "react";
import type { FeatsType } from "../types";

interface UseFeatsProps {
    characterFeats: FeatsType[];
    defaultSelectedFeats?: FeatsType[];
}

export const useFeats = ({ characterFeats, defaultSelectedFeats }: UseFeatsProps) => {
    const [availableFeats, setAvailableFeats] = useState<FeatsType[]>(characterFeats);
    const [selectedFeats, setSelectedFeats] = useState<FeatsType[]>(defaultSelectedFeats || characterFeats);

    // Update available feats when character feats change
    useEffect(() => {
        setAvailableFeats(characterFeats);
        // If a feat is removed from character, also remove it from selected feats
        setSelectedFeats(prev => prev.filter(feat => characterFeats.includes(feat)));
    }, [characterFeats]);

    const toggleFeat = (feat: FeatsType) => {
        setSelectedFeats(prev =>
            prev.includes(feat)
                ? prev.filter(f => f !== feat)
                : [...prev, feat]
        );
    };

    const isSelected = (feat: FeatsType) => selectedFeats.includes(feat);

    return {
        availableFeats,
        selectedFeats,
        toggleFeat,
        isSelected
    };
};