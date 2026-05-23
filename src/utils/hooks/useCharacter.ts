import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { addCharacterData, removeCharacterData, setCharacters, setSelectedCharacter, updateCharacterData } from "../../slices/dataSlice"
import { setDeleteCharacterIndex } from "../../slices/popupSlice"
import { data } from "../constants"
import type { ICharacter } from "../types"

export default function useCharacter() {

    const dispatch = useDispatch()

    const cleanFeatures = useCallback((character: ICharacter) => {
        // Karakter için geçerli olan feature'ları belirle
        const validFeatures = character.selectedFeatures?.filter(feature => {
            // Feature'ın ait olduğu class'ı bul
            return character.characterClass.some(classInfo => {
                const classData = data[(classInfo.characterClass as string).toLocaleLowerCase() as keyof typeof data];
                // Class'ın feature'larında bu feature var mı ve level uygun mu kontrol et
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
        // Yeni karakter eklerken feature'ları temizle
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
        // Import edilen karakterlerin feature'larını temizle
        const cleanedCharacters = characters.map(char => cleanFeatures(char));
        dispatch(setCharacters(cleanedCharacters))
    }, [cleanFeatures, dispatch])

    return { getCharacters, addCharacter, deleteCharacter, updateCharacter, selectCharacter, importCharacters }
}