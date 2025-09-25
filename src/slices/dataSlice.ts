import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { IAttack } from '../utils/types'

export interface DataState {
    attacks: IAttack[]
}

const initialState: DataState = {
    attacks: [
        {
            name: 'Vicious Greatsword',
            damageDieCount: 4,
            damageDieType: 6,
            damageBonus: 5,
            attackBonus: 10,
            critRange: 19,
            isSavageAttacker: true,
            isGreatWeaponFighting: true,
            isGreatWeaponMaster: true,
            proficiencyBonus: 5,
        },
        {
            name: 'Returning Handaxe',
            damageDieCount: 1,
            damageDieType: 6,
            damageBonus: 6,
            attackBonus: 11,
            critRange: 20,
            isSavageAttacker: true,
            isGreatWeaponFighting: false,
            isGreatWeaponMaster: false,
            proficiencyBonus: 5,
        }
    ],
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setAttacks: (state, action: PayloadAction<IAttack[]>) => {
            state.attacks = action.payload;
            localStorage.setItem('attacks', JSON.stringify(action.payload));
        },
        addAttackData: (state, action: PayloadAction<IAttack>) => {
            state.attacks.push(action.payload);
            localStorage.setItem('attacks', JSON.stringify(state.attacks));
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAttacks, addAttackData } = dataSlice.actions

export default dataSlice.reducer