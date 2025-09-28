import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { IAttack, ICharacter } from '../utils/types'

export interface DataState {
    characters: ICharacter[]
    attacks: IAttack[]
    selectedCharacter: ICharacter
}

const initialState: DataState = {
    characters: [] as ICharacter[],
    selectedCharacter: {} as ICharacter,
    attacks: [
        // {
        //     name: 'Vicious Greatsword',
        //     damageDieCount: 4,
        //     damageDieType: 6,
        //     damageBonus: 5,
        //     attackBonus: 10,
        //     critRange: 19,
        //     isSavageAttacker: true,
        //     isGreatWeaponFighting: true,
        //     isGreatWeaponMaster: true,
        //     proficiencyBonus: 5,
        // },
        // {
        //     name: 'Returning Handaxe',
        //     damageDieCount: 1,
        //     damageDieType: 6,
        //     damageBonus: 6,
        //     attackBonus: 11,
        //     critRange: 20,
        //     isSavageAttacker: true,
        //     isGreatWeaponFighting: false,
        //     isGreatWeaponMaster: false,
        //     proficiencyBonus: 5,
        // }
    ] as IAttack[],
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCharacters: (state, action: PayloadAction<ICharacter[]>) => {
            state.characters = action.payload;
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        setSelectedCharacter: (state, action: PayloadAction<number>) => {
            state.selectedCharacter = state.characters[action.payload];
            state.attacks = state.selectedCharacter.attacks ?? []
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
            state.characters[state.selectedCharacter.id - 1].attacks = state.attacks
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        removeAttackData: (state, action: PayloadAction<number>) => {
            state.attacks.splice(action.payload, 1);
            state.characters[state.selectedCharacter.id - 1].attacks = state.attacks
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
        updateAttackData: (state, action: PayloadAction<{ index: number, updatedAttack: IAttack }>) => {
            const { index, updatedAttack } = action.payload;
            state.attacks[index] = updatedAttack;
            state.characters[state.selectedCharacter.id - 1].attacks = state.attacks
            localStorage.setItem("characters", JSON.stringify(state.characters))
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCharacters, addCharacterData, setSelectedCharacter, addAttackData, removeCharacterData, updateCharacterData, removeAttackData, updateAttackData } = dataSlice.actions

export default dataSlice.reducer