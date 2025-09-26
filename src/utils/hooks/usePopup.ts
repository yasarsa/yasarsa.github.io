import { useDispatch } from "react-redux";
import { setDeleteAttackIndex, setShowAddPopup, setShowDeleteConfirmPopup } from "../../slices/popupSlice";

export default function usePopup() {
    const dispatch = useDispatch();

    const showAddPopup = () => {
        document.body.classList.add('no-scroll');
        dispatch(setShowAddPopup(true));
    }
    const hideAddPopup = () => {
        document.body.classList.remove('no-scroll');
        dispatch(setShowAddPopup(false));
    }

    const showDeleteConfirmPopup = (index: number) => {
        document.body.classList.add('no-scroll');
        dispatch(setShowDeleteConfirmPopup(true));
        dispatch(setDeleteAttackIndex(index));
    }
    const hideDeleteConfirmPopup = () => {
        document.body.classList.remove('no-scroll');
        dispatch(setShowDeleteConfirmPopup(false));
    }

    return { showAddPopup, hideAddPopup, showDeleteConfirmPopup, hideDeleteConfirmPopup };
}