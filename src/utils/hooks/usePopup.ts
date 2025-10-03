import { useDispatch } from "react-redux";
import { setDeleteAttackIndex, setDeleteCharacterIndex, setShowAddAttackPopup, setShowAddCharacterPopup, setShowDeleteConfirmPopup, setShowImportPopup, setShowSidebar } from "../../slices/popupSlice";
import type { ItemType } from "../types";

export default function usePopup() {
    const dispatch = useDispatch();

    const showAddAttackPopup = () => {
        document.body.classList.add('no-scroll');
        dispatch(setShowAddAttackPopup(true));
    }
    const hideAddAttackPopup = () => {
        document.body.classList.remove('no-scroll');
        dispatch(setShowAddAttackPopup(false));
    }

    const showDeleteConfirmPopup = (index: number, type: ItemType) => {
        document.body.classList.add('no-scroll');
        dispatch(setShowDeleteConfirmPopup({ show: true, itemType: type }));

        if (type === "attack") {
            dispatch(setDeleteAttackIndex(index));
        }

        if (type === "character") {
            dispatch(setDeleteCharacterIndex(index))

        }

    }
    const hideDeleteConfirmPopup = () => {
        document.body.classList.remove('no-scroll');
        dispatch(setShowDeleteConfirmPopup({ show: false, itemType: undefined }));
    }

    const showAddCharacterPopup = () => {
        document.body.classList.remove('no-scroll');
        dispatch(setShowAddCharacterPopup(true))
    }

    const hideAddCharacterPopup = () => {
        document.body.classList.remove('no-scroll');
        dispatch(setShowAddCharacterPopup(false))
    }

    const openSidebar = () => {
        dispatch(setShowSidebar(true))
    }

    const closeSidebar = () => {
        dispatch(setShowSidebar(false))
    }

    const showImportPopup = () => {
        document.body.classList.add('no-scroll');
        dispatch(setShowImportPopup(true));
    }

    const closeImportPopup = () => {
        document.body.classList.remove('no-scroll');
        dispatch(setShowImportPopup(false));
    }

    return { showAddAttackPopup, hideAddAttackPopup, showDeleteConfirmPopup, hideDeleteConfirmPopup, showAddCharacterPopup, hideAddCharacterPopup, openSidebar, closeSidebar, showImportPopup, closeImportPopup };
}