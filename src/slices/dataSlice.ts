import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { IAttack, ICharacter } from '../utils/types'

export interface DataState {
    characters: ICharacter[]
    attacks: IAttack[]
    selectedCharacter: ICharacter
}

const initialState: DataState = {
    characters: [],
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
    ],
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCharacters: (state, action: PayloadAction<ICharacter[]>) => {
            state.characters = action.payload;
            localStorage.setItem("characters", JSON.stringify(action.payload))
            if (state.selectedCharacter && state.selectedCharacter.id) {
                state.attacks = state.characters[state.selectedCharacter.id - 1].attacks ?? []
            }
        },
        addCharacterData: (state, action: PayloadAction<ICharacter>) => {
            state.characters.push(action.payload);
            localStorage.setItem("characters", JSON.stringify(state.characters))
            if (state.selectedCharacter && state.selectedCharacter.id) {
                state.attacks = state.characters[state.selectedCharacter.id - 1].attacks ?? []
            }
        },
        setSelectedCharacter: (state, action: PayloadAction<ICharacter>) => {
            state.selectedCharacter = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCharacters, addCharacterData, setSelectedCharacter } = dataSlice.actions

export default dataSlice.reducer