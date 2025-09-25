import { useDispatch } from "react-redux";
import { setDeleteAttackIndex, setShowAddPopup, setShowDeleteConfirmPopup } from "../../slices/popupSlice";

export default function usePopup() {
    const dispatch = useDispatch();

    const showAddPopup = () => {
        dispatch(setShowAddPopup(true));
    }
    const hideAddPopup = () => {
        dispatch(setShowAddPopup(false));
    }

    const showDeleteConfirmPopup = (index: number) => {
        dispatch(setShowDeleteConfirmPopup(true));
        dispatch(setDeleteAttackIndex(index));
    }
    const hideDeleteConfirmPopup = () => {
        dispatch(setShowDeleteConfirmPopup(false));
    }

    return { showAddPopup, hideAddPopup, showDeleteConfirmPopup, hideDeleteConfirmPopup };
}