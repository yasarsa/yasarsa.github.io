import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addAttackData, setAttacks } from "../../slices/dataSlice";
import type { IAttack } from "../types";

export default function useAttack() {
    const dispatch = useDispatch();

    const addAttack = useCallback((attack: IAttack) => {
        dispatch(addAttackData(attack));
    }, [dispatch]);

    const setAllAttacks = useCallback((attacks: IAttack[]) => {
        dispatch(setAttacks(attacks));
    }, [dispatch]);

    const getAttacks = useCallback(() => {
        const attacks = localStorage.getItem('attacks');
        if (attacks) {
            setAllAttacks(JSON.parse(attacks) as IAttack[]);
        }
    }, [setAllAttacks]);

    const deleteAttack = useCallback((index: number) => {
        const attacks = localStorage.getItem('attacks');
        if (attacks) {
            const attacksArray = JSON.parse(attacks) as IAttack[];
            attacksArray.splice(index, 1);
            setAllAttacks(attacksArray);
        }
    }, [setAllAttacks]);

    return { addAttack, getAttacks, setAllAttacks, deleteAttack };
}