import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { IAttack, ICharacter } from '../utils/types'

export interface DataState {
    characters: ICharacter[]
    attacks: IAttack[]
    selectedCharacter: ICharacter | null
}

const initialState: DataState = {
    characters: [] as ICharacter[],
    selectedCharacter: null,
    attacks: [] as IAttack[],
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCharacters: (state, action: PayloadAction<ICharacter[]>) => {
            state.characters = action.payload;
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        setSelectedCharacter: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload === undefined) {
                state.selectedCharacter = null;
                state.attacks = []
                return
            }
            state.selectedCharacter = state.characters[action.payload] ?? null;
            state.attacks = state.selectedCharacter?.attacks ?? []
        },
        addCharacterData: (state, action: PayloadAction<ICharacter>) => {
            state.characters.push(action.payload);
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        removeCharacterData: (state, action: PayloadAction<number>) => {
            state.characters.splice(action.payload, 1);
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        updateCharacterData: (state, action: PayloadAction<{ index: number, updatedCharacter: ICharacter }>) => {
            const { index, updatedCharacter } = action.payload;
            state.characters[index] = updatedCharacter;
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        addAttackData: (state, action: PayloadAction<IAttack>) => {
            state.attacks.push(action.payload);
            if (state.selectedCharacter) {
                const charIndex = state.characters.findIndex(c => c.id === state.selectedCharacter!.id)
                if (charIndex !== -1) state.characters[charIndex].attacks = state.attacks
            }
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        removeAttackData: (state, action: PayloadAction<number>) => {
            state.attacks.splice(action.payload, 1);
            if (state.selectedCharacter) {
                const charIndex = state.characters.findIndex(c => c.id === state.selectedCharacter!.id)
                if (charIndex !== -1) state.characters[charIndex].attacks = state.attacks
            }
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        updateAttackData: (state, action: PayloadAction<{ index: number, updatedAttack: IAttack }>) => {
            const { index, updatedAttack } = action.payload;
            state.attacks[index] = updatedAttack;
            if (state.selectedCharacter) {
                const charIndex = state.characters.findIndex(c => c.id === state.selectedCharacter!.id)
                if (charIndex !== -1) state.characters[charIndex].attacks = state.attacks
            }
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCharacters, addCharacterData, setSelectedCharacter, addAttackData, removeCharacterData, updateCharacterData, removeAttackData, updateAttackData } = dataSlice.actions

export default dataSlice.reducer