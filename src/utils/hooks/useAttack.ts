import { useDispatch } from "react-redux";
import { addAttackData } from "../../slices/dataSlice";
import type { IAttack } from "../types";

export default function useAttack() {
    const dispatch = useDispatch();

    const addAttack = (attack: IAttack) => {
        dispatch(addAttackData(attack));
    }

    return { addAttack };
}