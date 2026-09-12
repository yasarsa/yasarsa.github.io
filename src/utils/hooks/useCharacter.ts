import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { addCharacterData, removeCharacterData, setCharacters, setSelectedCharacter, updateCharacterData } from "../../slices/dataSlice"
import { setDeleteCharacterIndex } from "../../slices/popupSlice"
import { data } from "../constants"
import type { ICharacter } from "../types"

export default function useCharacter() {

    const dispatch = useDispatch()

    const cleanFeatures = useCallback((character: ICharacter) => {
        // Work out which features apply to this character
        const validFeatures = character.selectedFeatures?.filter(feature => {
            // Find the class the feature belongs to
            return character.characterClass.some(classInfo => {
                const classData = data[(classInfo.characterClass as string).toLocaleLowerCase() as keyof typeof data];
                // Check the class grants this feature and the level is high enough
                return classData?.features.some(f =>
                    f.name === feature.name &&
                    f.unlockedLevel <= classInfo.level
                );
            });
        }) || [];

        return {
            ...character,
            selectedFeatures: validFeatures
        };
    }, [])

    const getCharacters = useCallback(() => {
        try {
            const characters = localStorage.getItem("characters")
            if (characters) {
                const parsed = JSON.parse(characters)
                if (!Array.isArray(parsed)) {
                    console.warn("localStorage 'characters' is not an array, resetting.")
                    dispatch(setCharacters([]))
                    return
                }
                const parsedCharacters = parsed as ICharacter[];
                const cleanedCharacters = parsedCharacters.map(char => cleanFeatures(char));
                dispatch(setCharacters(cleanedCharacters))
            }
        } catch (error) {
            console.error("Failed to parse characters from localStorage:", error)
            dispatch(setCharacters([]))
        }
    }, [cleanFeatures, dispatch])

    const addCharacter = useCallback((character: ICharacter) => {
        // Clean up features when adding a new character
        const cleanedCharacter = cleanFeatures(character);
        dispatch(addCharacterData(cleanedCharacter))
    }, [cleanFeatures, dispatch])

    const deleteCharacter = useCallback((index: number) => {
        dispatch(removeCharacterData(index))
        dispatch(setDeleteCharacterIndex(undefined))
    }, [dispatch])

    const updateCharacter = useCallback((index: number, updatedCharacter: ICharacter) => {
        const cleanedCharacter = cleanFeatures(updatedCharacter);
        dispatch(updateCharacterData({ index, updatedCharacter: cleanedCharacter }))
    }, [cleanFeatures, dispatch])

    const selectCharacter = useCallback((index: number | undefined) => {
        dispatch(setSelectedCharacter(index))
    }, [dispatch])

    const importCharacters = useCallback((characters: ICharacter[]) => {
        // Clean up features on imported characters
        const cleanedCharacters = characters.map(char => cleanFeatures(char));
        dispatch(setCharacters(cleanedCharacters))
    }, [cleanFeatures, dispatch])

    return { getCharacters, addCharacter, deleteCharacter, updateCharacter, selectCharacter, importCharacters }
}