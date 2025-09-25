import { useDispatch } from "react-redux";
import { setShowAddPopup, setShowDeleteConfirmPopup } from "../../slices/popupSlice";

export default function usePopup() {
    const dispatch = useDispatch();

    const showAddPopup = () => {
        dispatch(setShowAddPopup(true));
    }
    const hideAddPopup = () => {
        dispatch(setShowAddPopup(false));
    }

    const showDeleteConfirmPopup = () => {
        dispatch(setShowDeleteConfirmPopup(true));
    }
    const hideDeleteConfirmPopup = () => {
        dispatch(setShowDeleteConfirmPopup(false));
    }

    return { showAddPopup, hideAddPopup, showDeleteConfirmPopup, hideDeleteConfirmPopup };
}