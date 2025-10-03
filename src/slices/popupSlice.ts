import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ItemType } from '../utils/types'

export interface PopupState {
    showAddAttackPopup: boolean
    showDeleteConfirmPopup: boolean
    deleteAttackIndex?: number
    deleteCharacterIndex?: number
    showAddCharacterPopup: boolean
    deleteActionType: ItemType
    showSidebar: boolean
    showImportPopup: boolean
}

const initialState: PopupState = {
    showAddAttackPopup: false,
    showDeleteConfirmPopup: false,
    deleteAttackIndex: undefined,
    deleteCharacterIndex: undefined,
    showAddCharacterPopup: false,
    deleteActionType: undefined,
    showSidebar: false,
    showImportPopup: false,
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setShowAddAttackPopup: (state, action: PayloadAction<boolean>) => {
            state.showAddAttackPopup = action.payload
        },
        setShowDeleteConfirmPopup: (state, action: PayloadAction<{ show: boolean, itemType: ItemType }>) => {
            state.showDeleteConfirmPopup = action.payload.show
            state.deleteActionType = action.payload.itemType
        },
        setDeleteAttackIndex: (state, action: PayloadAction<number | undefined>) => {
            state.deleteAttackIndex = action.payload
        },
        setDeleteCharacterIndex: (state, action: PayloadAction<number | undefined>) => {
            state.deleteCharacterIndex = action.payload
        },
        setShowAddCharacterPopup: (state, action: PayloadAction<boolean>) => {
            state.showAddCharacterPopup = action.payload
        },
        setShowSidebar: (state, action: PayloadAction<boolean>) => {
            state.showSidebar = action.payload
        },
        setShowImportPopup: (state, action: PayloadAction<boolean>) => {
            state.showImportPopup = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setShowAddAttackPopup, setDeleteAttackIndex, setDeleteCharacterIndex, setShowAddCharacterPopup, setShowImportPopup, setShowDeleteConfirmPopup
    , setShowSidebar
} = popupSlice.actions

export default popupSlice.reducer