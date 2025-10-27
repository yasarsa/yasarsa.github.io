import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IKTOperator } from '../utils/types';

export interface KTState {
    operators: IKTOperator[];
}

const initialState: KTState = {
    operators: [
        {
            name: "Dire Avenger Exarch", apl: 3, move: 7, save: 3, wounds: 9, weapons: [
                { name: "Shuriken catapult", type: "ranged", atk: 4, hit: 3, normalDmg: 3, critDmg: 4, wr: ["Rending"] },
                { name: "Shuriken pistol", type: "ranged", atk: 4, hit: 3, normalDmg: 3, critDmg: 4, wr: ["Range 8", "Rending"] },
                { name: "Twin shuriken catapult", type: "ranged", atk: 4, hit: 3, normalDmg: 3, critDmg: 4, wr: ["Ceaseless", "Rending"] },
                { name: "Diresword", type: "melee", atk: 5, hit: 3, normalDmg: 4, critDmg: 5, wr: ["Lethal 5+", "Rending"] },
                { name: "Fists", type: "melee", atk: 4, hit: 3, normalDmg: 2, critDmg: 4, wr: ["-"] },
                { name: "Power weapon", type: "melee", atk: 5, hit: 3, normalDmg: 4, critDmg: 6, wr: ["Lethal 5+"] },
            ],
            abilities: [{
                name: "Defence Tactics", description: "Whenever this operative contests an objective marker or one of your mission markers, or whenever it’s shooting an enemy operative that does, this operative’s weapons have the <b>Balanced weapon</b> rule"
            }, {
                name: "Exarch",
                description: "This operative can perform two <b>Shoot</b> or two <b>Fight</b> actions during its activation"
            }, {
                name: "Shimmershield",
                description: "Whenever an operative is shooting a friendly BLADES OF KHAINE operative that’s visible to and within 2\" of this operative, ignore the Piercing weapon rule. This operative only has this rule if you select the shimmershield weapon option."
            }
            ]
        },

    ],
}

export const ktSlice = createSlice({
    name: 'kt',
    initialState,
    reducers: {
        setOperators: (state, action: PayloadAction<IKTOperator[]>) => {
            state.operators = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setOperators } = ktSlice.actions

export default ktSlice.reducer