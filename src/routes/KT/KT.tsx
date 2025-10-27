import { useSelector } from "react-redux";
import KTOperative from "../../components/KTOperative/KTOperative";
import type { RootState } from "../../store";
import styles from "./KT.module.css";

export default function KT() {
    const { operators } = useSelector((state: RootState) => state.kt)

    return (
        <div className={styles.KT}>

            {operators.map((operator) => {
                return <KTOperative key={operator.name} operator={operator} />
            })}
        </div>
    )
}