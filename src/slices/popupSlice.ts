import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface PopupState {
    showAddPopup: boolean
}

const initialState: PopupState = {
    showAddPopup: false,
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setShowAddPopup: (state, action: PayloadAction<boolean>) => {
            state.showAddPopup = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setShowAddPopup } = popupSlice.actions

export default popupSlice.reducer