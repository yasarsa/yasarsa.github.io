import { useDispatch } from "react-redux";
import { setShowAddPopup } from "../../slices/popupSlice";

export default function usePopup() {
    const dispatch = useDispatch();

    const showAddPopup = () => {
        dispatch(setShowAddPopup(true));
    }
    const hideAddPopup = () => {
        dispatch(setShowAddPopup(false));
    }

    return { showAddPopup, hideAddPopup };
}