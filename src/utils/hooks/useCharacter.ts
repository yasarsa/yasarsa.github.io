import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { addCharacterData, setCharacters, setSelectedCharacter } from "../../slices/dataSlice"
import { setDeleteCharacterIndex } from "../../slices/popupSlice"
import type { ICharacter } from "../types"

export default function useCharacter() {

    const dispatch = useDispatch()

    const setAllCharacters = useCallback((characters: ICharacter[]) => {
        dispatch(setCharacters(characters))
    }, [dispatch])

    const getCharacters = useCallback(() => {
        const characters = localStorage.getItem("characters")
        if (characters) {
            setAllCharacters(JSON.parse(characters) as ICharacter[])
        }
        return
    }, [setAllCharacters])

    const addCharacter = useCallback((character: ICharacter) => {
        dispatch(addCharacterData(character))
    }, [dispatch])

    const deleteCharacter = useCallback((index: number) => {
        const characters = localStorage.getItem("characters");
        if (characters) {
            const charArray = JSON.parse(characters) as ICharacter[];
            charArray.splice(index, 1)
            setAllCharacters(charArray)
            dispatch(setDeleteCharacterIndex(undefined))
        }
    }, [dispatch, setAllCharacters])

    const updateCharacter = useCallback((index: number, updatedCharacter: ICharacter) => {
        const characters = localStorage.getItem("characters");
        if (characters) {
            const charArray = JSON.parse(characters) as ICharacter[];
            charArray[index] = updatedCharacter;
            setAllCharacters(charArray)
        }
    }, [setAllCharacters])

    const selectCharacter = useCallback((index: number) => {
        const characters = localStorage.getItem("characters");
        if (characters) {
            const charArray = JSON.parse(characters) as ICharacter[];
            dispatch(setSelectedCharacter(charArray[index]))
        }
    }, [dispatch])

    return { getCharacters, addCharacter, deleteCharacter, setAllCharacters, updateCharacter, selectCharacter }
}