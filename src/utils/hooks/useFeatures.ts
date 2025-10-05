import { useEffect, useState } from "react";
import type { ICharacterClassFeature } from "../types";

interface UseFeaturesProps {
    characterFeatures: ICharacterClassFeature[];
    defaultSelectedFeatures?: ICharacterClassFeature[];
}

export const useFeatures = ({ characterFeatures, defaultSelectedFeatures }: UseFeaturesProps) => {
    const [availableFeatures, setAvailableFeatures] = useState<ICharacterClassFeature[]>(characterFeatures);
    const [selectedFeatures, setSelectedFeatures] = useState<ICharacterClassFeature[]>(defaultSelectedFeatures || characterFeatures);

    // Update available features when character features change
    useEffect(() => {
        setAvailableFeatures(characterFeatures);
        // If a feature is removed from character, also remove it from selected features
        setSelectedFeatures(prev => prev.filter(feature =>
            characterFeatures.some(f => f.name === feature.name && f.unlockedLevel === feature.unlockedLevel)
        ));
    }, [characterFeatures]);

    const toggleFeature = (feature: ICharacterClassFeature) => {
        setSelectedFeatures(prev => {
            const isFeatureSelected = prev.some(f =>
                f.name === feature.name && f.unlockedLevel === feature.unlockedLevel
            );
            if (isFeatureSelected) {
                return prev.filter(f => !(f.name === feature.name && f.unlockedLevel === feature.unlockedLevel));
            } else {
                return [...prev, feature];
            }
        });
    };

    const isSelected = (feature: ICharacterClassFeature) =>
        selectedFeatures.some(f => f.name === feature.name && f.unlockedLevel === feature.unlockedLevel);

    return {
        availableFeatures,
        selectedFeatures,
        toggleFeature,
        isSelected
    };
};