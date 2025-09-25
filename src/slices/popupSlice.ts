import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface PopupState {
    showAddPopup: boolean
    showDeleteConfirmPopup: boolean
}

const initialState: PopupState = {
    showAddPopup: false,
    showDeleteConfirmPopup: false
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setShowAddPopup: (state, action: PayloadAction<boolean>) => {
            state.showAddPopup = action.payload
        },
        setShowDeleteConfirmPopup: (state, action: PayloadAction<boolean>) => {
            state.showDeleteConfirmPopup = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setShowAddPopup, setShowDeleteConfirmPopup } = popupSlice.actions

export default popupSlice.reducer