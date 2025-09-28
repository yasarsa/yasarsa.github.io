import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addAttackData, removeAttackData, updateAttackData } from "../../slices/dataSlice";
import type { IAttack } from "../types";

export default function useAttack() {
    const dispatch = useDispatch();

    const addAttack = useCallback((attack: IAttack) => {
        dispatch(addAttackData(attack))
    }, [dispatch]);

    const deleteAttack = useCallback((index: number) => {
        dispatch(removeAttackData(index))
    }, [dispatch]);

    const updateAttack = useCallback((index: number, updatedAttack: IAttack) => {
        dispatch(updateAttackData({ index, updatedAttack }))
    }, [dispatch]);


    return { addAttack, deleteAttack, updateAttack };
}