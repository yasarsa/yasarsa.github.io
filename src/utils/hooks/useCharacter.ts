import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { addCharacterData, removeCharacterData, setCharacters, setSelectedCharacter, updateCharacterData } from "../../slices/dataSlice"
import { setDeleteCharacterIndex } from "../../slices/popupSlice"
import type { ICharacter } from "../types"

export default function useCharacter() {

    const dispatch = useDispatch()

    const getCharacters = useCallback(() => {
        const characters = localStorage.getItem("characters")
        if (characters) {
            console.debug(JSON.parse(characters))
            dispatch(setCharacters(JSON.parse(characters) as ICharacter[]))
        }
        return
    }, [dispatch])

    const addCharacter = useCallback((character: ICharacter) => {
        dispatch(addCharacterData(character))
    }, [dispatch])

    const deleteCharacter = useCallback((index: number) => {
        dispatch(removeCharacterData(index))
        dispatch(setDeleteCharacterIndex(undefined))
    }, [dispatch])

    const updateCharacter = useCallback((index: number, updatedCharacter: ICharacter) => {
        dispatch(updateCharacterData({ index, updatedCharacter }))
    }, [dispatch])

    const selectCharacter = useCallback((index: number | undefined) => {
        dispatch(setSelectedCharacter(index))
    }, [dispatch])

    return { getCharacters, addCharacter, deleteCharacter, updateCharacter, selectCharacter }
}