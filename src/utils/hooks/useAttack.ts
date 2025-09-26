import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "../../slices/dataSlice";
import { setDeleteAttackIndex } from "../../slices/popupSlice";
import type { RootState } from "../../store";
import type { IAttack, ICharacter } from "../types";

export default function useAttack() {
    const dispatch = useDispatch();
    const { selectedCharacter } = useSelector((state: RootState) => state.data)

    const addAttack = useCallback((attack: IAttack) => {
        const characters = localStorage.getItem("characters")
        if (characters) {
            const charactersArray = JSON.parse(characters) as ICharacter[];
            if (selectedCharacter && selectedCharacter.id) {
                const attacks = selectedCharacter.attacks ?? [] as IAttack[]
                attacks.push(attack)
                charactersArray[selectedCharacter.id - 1].attacks = attacks
                dispatch(setCharacters(charactersArray))
            }
        }

    }, [dispatch, selectedCharacter]);


    const getAttacks = useCallback(() => {
        const characters = localStorage.getItem("characters")
        if (characters) {
            const charactersArray = JSON.parse(characters) as ICharacter[];
            if (selectedCharacter && selectedCharacter.id) {
                const attacks = selectedCharacter.attacks ?? [] as IAttack[]
                charactersArray[selectedCharacter.id - 1].attacks = attacks
                dispatch(setCharacters(charactersArray))
            }
        }
    }, [dispatch, selectedCharacter]);

    const deleteAttack = useCallback((index: number) => {
        const characters = localStorage.getItem("characters")
        if (characters) {
            const charactersArray = JSON.parse(characters) as ICharacter[];
            if (selectedCharacter && selectedCharacter.id) {
                const attacks = selectedCharacter.attacks ?? [] as IAttack[]
                attacks.splice(index, 1);
                charactersArray[selectedCharacter.id - 1].attacks = attacks
                dispatch(setCharacters(charactersArray))
                dispatch(setDeleteAttackIndex(undefined));

            }
        }
    }, [dispatch, selectedCharacter]);

    const updateAttack = useCallback((index: number, updatedAttack: IAttack) => {
        const characters = localStorage.getItem("characters")
        if (characters) {
            const charactersArray = JSON.parse(characters) as ICharacter[];
            if (selectedCharacter && selectedCharacter.id) {
                const attacks = selectedCharacter.attacks ?? [] as IAttack[]
                attacks[index] = updatedAttack;
                charactersArray[selectedCharacter.id - 1].attacks = attacks
                dispatch(setCharacters(charactersArray))
            }
        }

    }, [dispatch, selectedCharacter]);


    return { addAttack, getAttacks, deleteAttack, updateAttack };
}